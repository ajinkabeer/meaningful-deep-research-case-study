import AnthropicBedrock from '@anthropic-ai/bedrock-sdk'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

function getAwsRegion(): string {
  return process.env.S3_REGION || process.env.AWS_REGION || 'eu-central-1'
}

function getModelId(): string {
  if (process.env.ANTHROPIC_MODEL && process.env.ANTHROPIC_MODEL !== 'default') {
    return process.env.ANTHROPIC_MODEL
  }
  const region = getAwsRegion()
  const prefix = region.startsWith('eu') ? 'eu' : region.startsWith('ap') ? 'apac' : 'us'
  return `${prefix}.anthropic.claude-sonnet-4-6`
}

const client = new AnthropicBedrock({ awsRegion: getAwsRegion() })
const MODEL = getModelId()
const BENCHMARK_DIR = __dirname
const MEANINGFUL_DIR = path.join(BENCHMARK_DIR, 'meaningful')

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DimensionScore {
  score: number
  reasoning: string
  bestQuote: string
}

interface ProviderScores {
  provider: string
  dimensions: Record<string, DimensionScore>
  total: number
  wordCount: number
  outputType: string
  processVisible: boolean
}

// ---------------------------------------------------------------------------
// Scoring dimensions
// ---------------------------------------------------------------------------

const DIMENSIONS: Record<string, string> = {
  'Depth & Specificity':
    'Does the output go beyond repeating statistics from the brief itself? Does it surface new specific data points, studies, or precise figures the brief did not mention? Penalize outputs that only restate what the brief provided.',
  'Emergent Insights':
    'Does the output surface non-obvious findings — conclusions that would surprise someone who read the brief? Does it identify tensions, paradoxes, or counter-intuitive dynamics? Reward findings that only emerge from actually doing research.',
  'Structural Rigor':
    'Is the output organized with a clear decision framework, weighted options, or a phased plan? Or is it just a flat narrative? Reward explicit frameworks (tables, weighted criteria, staged recommendations) over prose-only summaries.',
  'Citation Quality':
    'Are sources cited with live, specific URLs inline in the text? Or are they bracketed reference numbers, footnote-style, or absent? Reward inline hyperlinks to specific sources over vague reference lists.',
  'Evidentiary Honesty':
    'Does the output acknowledge limitations, evidentiary gaps, or conflicting data? Or does it present everything with false confidence? Reward outputs that explicitly name what the data does NOT yet prove.',
  'Actionability':
    'Does the output produce specific, implementable recommendations with concrete next steps? Or does it end with vague suggestions? Reward phased plans with specific interventions over generic advice.',
}

// ---------------------------------------------------------------------------
// File readers
// ---------------------------------------------------------------------------

function readFile(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8').trim()
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length
}

function readProviderOutputs(): Array<{ provider: string; content: string; outputType: string; processVisible: boolean }> {
  return [
    {
      provider: 'ChatGPT',
      content: readFile(path.join(BENCHMARK_DIR, 'chat-gpt.md')),
      outputType: 'Single response (structured report)',
      processVisible: false,
    },
    {
      provider: 'Perplexity',
      content: readFile(path.join(BENCHMARK_DIR, 'perplexity.md')),
      outputType: 'Single response',
      processVisible: false,
    },
    {
      provider: 'Claude.ai',
      content: readFile(path.join(BENCHMARK_DIR, 'claude.md')),
      outputType: 'Single response (long-form essay)',
      processVisible: false,
    },
    {
      provider: 'Gemini',
      content: readFile(path.join(BENCHMARK_DIR, 'gemini.md')),
      outputType: 'Single response (research brief format)',
      processVisible: false,
    },
  ]
}

function readMeaningfulOutput(): { provider: string; content: string; fullContent: string; outputType: string; processVisible: boolean } {
  const synthesis = readFile(path.join(MEANINGFUL_DIR, 'synthesis.txt'))
  const scout = readFile(path.join(MEANINGFUL_DIR, 'scout.txt'))
  const angle0 = readFile(path.join(MEANINGFUL_DIR, 'research_angle_0_Do_measurable_micro_interaction_losses_from_self_c.txt'))
  const angle1 = readFile(path.join(MEANINGFUL_DIR, 'research_angle_1_What_is_the_actual_closure_rate_of_independent_thi.txt'))
  const angle2 = readFile(path.join(MEANINGFUL_DIR, 'research_angle_2_Do_Discord_and_Twitch_communities_produce_quantifi.txt'))

  // For scoring, pass synthesis as the primary output with research trail appended
  const fullContent = `=== FINAL SYNTHESIS (primary deliverable) ===\n\n${synthesis}\n\n=== INTERMEDIATE RESEARCH TRAIL ===\n\n--- Scout (broad reconnaissance) ---\n${scout}\n\n--- Research Angle 1: Micro-interaction evidence ---\n${angle0}\n\n--- Research Angle 2: Third-place closure attribution ---\n${angle1}\n\n--- Research Angle 3: Discord/Twitch active vs. passive ---\n${angle2}`

  return {
    provider: 'Meaningful',
    content: synthesis,
    fullContent,
    outputType: 'Multi-phase pipeline (scout + 3 research angles + synthesis)',
    processVisible: true,
  }
}

// ---------------------------------------------------------------------------
// LLM judge
// ---------------------------------------------------------------------------

async function scoreOnDimension(
  provider: string,
  content: string,
  dimensionName: string,
  dimensionCriteria: string
): Promise<DimensionScore> {
  const prompt = `You are an independent research quality evaluator. You will score a research output on a single dimension.

DIMENSION: ${dimensionName}
CRITERIA: ${dimensionCriteria}

PROVIDER: ${provider}

RESEARCH OUTPUT:
---
${content}
---

Score this output on the dimension above from 1 to 10, where:
- 1-3: Fails to meet the criteria
- 4-6: Partially meets the criteria
- 7-9: Clearly meets the criteria with evidence
- 10: Exceptional — a benchmark example of this quality

Return ONLY valid JSON in this exact format, nothing else:
{
  "score": <integer 1-10>,
  "reasoning": "<2-3 sentences explaining why this score, referencing specific evidence from the output>",
  "bestQuote": "<the single most representative quote from the output that illustrates your score, max 200 chars>"
}`

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''

  try {
    // Extract JSON even if there's surrounding text
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON found in response')
    return JSON.parse(jsonMatch[0]) as DimensionScore
  } catch {
    console.error(`Failed to parse score for ${provider}/${dimensionName}:`, text)
    return { score: 5, reasoning: 'Parse error — manual review required', bestQuote: '' }
  }
}

async function scoreProvider(
  provider: string,
  content: string,
  outputType: string,
  processVisible: boolean,
  wordCount: number
): Promise<ProviderScores> {
  console.log(`  Scoring ${provider}...`)
  const dimensions: Record<string, DimensionScore> = {}

  for (const [name, criteria] of Object.entries(DIMENSIONS)) {
    process.stdout.write(`    ${name}... `)
    dimensions[name] = await scoreOnDimension(provider, content, name, criteria)
    console.log(`${dimensions[name].score}/10`)
  }

  const total = Object.values(dimensions).reduce((sum, d) => sum + d.score, 0)

  return { provider, dimensions, total, wordCount, outputType, processVisible }
}

// ---------------------------------------------------------------------------
// Blog post generator
// ---------------------------------------------------------------------------

async function generateBlogPost(allScores: ProviderScores[], outputs: Map<string, string>): Promise<string> {
  const scoreTable = allScores
    .sort((a, b) => b.total - a.total)
    .map(p => {
      const dims = Object.entries(p.dimensions)
        .map(([name, d]) => `| ${name} | ${d.score}/10 |`)
        .join('\n')
      return `### ${p.provider}\n${dims}\n| **Total** | **${p.total}/60** |`
    })
    .join('\n\n')

  const dimensionBreakdown = Object.keys(DIMENSIONS).map(dim => {
    const scores = allScores
      .sort((a, b) => b.dimensions[dim].score - a.dimensions[dim].score)
      .map(p => `**${p.provider}** (${p.dimensions[dim].score}/10): ${p.dimensions[dim].reasoning}${p.dimensions[dim].bestQuote ? `\n> "${p.dimensions[dim].bestQuote}"` : ''}`)
      .join('\n\n')
    return `### ${dim}\n${scores}`
  }).join('\n\n---\n\n')

  const scoresForPrompt = allScores.map(p => ({
    provider: p.provider,
    total: p.total,
    outputType: p.outputType,
    wordCount: p.wordCount,
    dimensions: Object.fromEntries(
      Object.entries(p.dimensions).map(([k, v]) => [k, { score: v.score, reasoning: v.reasoning }])
    )
  }))

  const blogPrompt = `You are writing a blog post for Meaningful, a company that built an AI research pipeline. The post should demonstrate, with evidence, that the Meaningful pipeline produces better research output than single-prompt responses from ChatGPT, Claude.ai, and Gemini.

The tone is: authoritative, data-driven, intellectually honest. Not arrogant. Not marketing fluff. The post should feel like it was written by someone who genuinely cares about research quality and found interesting results.

Here are the benchmark scores from an LLM-judge evaluation (Claude Sonnet 4.6) of all four outputs on the same brief:

${JSON.stringify(scoresForPrompt, null, 2)}

The brief was:
"The Loneliness Infrastructure Audit: 2010–2026 — an investigation into how the physical environment was optimized for efficiency and commerce rather than human connection, covering the drive-thru-ification of America, hostile architecture, parasocial relationships as community replacement, and the $406B economic cost of loneliness."

What makes Meaningful different:
- Multi-phase pipeline: scout (broad web reconnaissance) → explorer (identifies specific research gaps) → researcher (3 parallel targeted web research runs) → synthesizer (integrated consulting report)
- Users see the full research trail, not just the final answer
- Research angles are emergent from evidence, not templated — the pipeline reads what it found before deciding what to investigate next
- For this brief specifically, the pipeline surfaced: (1) a Wharton study showing 1.6% closure rate increase per 1% delivery app penetration, (2) the active vs. passive participation distinction in Discord/Twitch research, (3) an explicit evidentiary gap analysis showing what the data does NOT yet prove causally

Write a blog post with these sections:
1. Opening hook (2-3 sentences, starts with the key finding)
2. The Brief (1 paragraph describing what was researched)
3. What Each Tool Produced (short table: provider, output type, word count, process visible to user)
4. The Scores (embed the scoring table verbatim — I will insert it separately)
5. What the Scores Actually Mean — dimension-by-dimension narrative, with quotes from the outputs. Be specific. Name the findings that emerged. Name the gaps.
6. The Process Advantage — why showing your work matters for business research
7. Conclusion (3-4 sentences, no generic closing)

Important:
- Do not make up quotes — only reference what the scores describe
- Acknowledge where other tools did well (Claude.ai scored well on prose quality, for instance)
- The post should be 800-1200 words
- Write in markdown

Return only the blog post markdown, starting with the # heading.`

  console.log('\nGenerating blog post...')
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 4000,
    messages: [{ role: 'user', content: blogPrompt }],
  })

  const blogText = response.content[0].type === 'text' ? response.content[0].text : ''

  // Insert the actual score table and dimension breakdown
  const overallTable = buildOverallTable(allScores)
  const fullBlog = blogText
    .replace('(embed the scoring table verbatim — I will insert it separately)', overallTable)
    + '\n\n---\n\n## Full Dimension Breakdown\n\n' + dimensionBreakdown

  return fullBlog
}

function buildOverallTable(allScores: ProviderScores[]): string {
  const sorted = [...allScores].sort((a, b) => b.total - a.total)
  const header = `| Provider | ${Object.keys(DIMENSIONS).join(' | ')} | Total |`
  const divider = `| --- | ${Object.keys(DIMENSIONS).map(() => '---').join(' | ')} | --- |`
  const rows = sorted.map(p => {
    const dimScores = Object.values(p.dimensions).map(d => d.score).join(' | ')
    return `| ${p.provider} | ${dimScores} | **${p.total}/60** |`
  })
  return [header, divider, ...rows].join('\n')
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('Deep Research Benchmark\n')

  const providerOutputs = readProviderOutputs()
  const meaningfulOutput = readMeaningfulOutput()

  const allOutputs: Array<{ provider: string; content: string; outputType: string; processVisible: boolean }> = [
    ...providerOutputs,
    { provider: meaningfulOutput.provider, content: meaningfulOutput.fullContent, outputType: meaningfulOutput.outputType, processVisible: meaningfulOutput.processVisible },
  ]

  console.log('Scoring all providers...\n')
  const allScores: ProviderScores[] = []

  for (const output of allOutputs) {
    const wordCount = countWords(output.provider === 'Meaningful' ? meaningfulOutput.content : output.content)
    const scores = await scoreProvider(output.provider, output.content, output.outputType, output.processVisible, wordCount)
    allScores.push(scores)
  }

  console.log('\nScores summary:')
  allScores
    .sort((a, b) => b.total - a.total)
    .forEach(p => console.log(`  ${p.provider}: ${p.total}/60`))

  const outputMap = new Map(allOutputs.map(o => [o.provider, o.content]))
  const blogPost = await generateBlogPost(allScores, outputMap)

  const outPath = path.join(BENCHMARK_DIR, 'report.md')
  fs.writeFileSync(outPath, blogPost, 'utf-8')
  console.log(`\nReport written to: ${outPath}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
