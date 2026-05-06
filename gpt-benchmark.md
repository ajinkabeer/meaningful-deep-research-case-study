 You are an independent research quality evaluator.
    Five AI tools were given the same research brief
    and produced the outputs below. Score each one on 6
     dimensions.

    THE BRIEF:
    The Loneliness Infrastructure Audit: 2010-2026. An
    investigation into how the physical and commercial
    environment has been optimized for efficiency at
    the expense of human connection. Covers: the
    drive-thru-ification of America, hostile
    architecture, the rise of parasocial relationships
    as community replacement, and the $406B economic
    cost of social isolation.

    SCORING DIMENSIONS (score each 1-10):
    1. Depth & Specificity: Does it surface new
    specific data not in the brief itself? Penalize
    outputs that only restate the brief's own
    statistics.
    2. Emergent Insights: Does it find non-obvious
    conclusions that would surprise someone who read
    the brief? Reward findings that only emerge from
    actual research.
    3. Structural Rigor: Does it include decision
    frameworks, weighted criteria tables, or phased
    plans? Penalize pure prose with no actionable
    structure.
    4. Citation Quality: Are sources cited as inline
    hyperlinks at the point of each claim? Penalize
    footnote lists, bracketed numbers, or no links.
    5. Evidentiary Honesty: Does it acknowledge
    limitations, causal gaps, or conflicting data?
    Penalize outputs that present everything with false
     confidence.
    6. Actionability: Does it produce specific
    implementable recommendations with timelines?
    Penalize vague category-level suggestions.

    Score each provider independently. Do not let one
    score influence another.

    Return a JSON object in exactly this format,
    nothing else:
    {
      "ChatGPT": {
        "Depth & Specificity": { "score": 0,
    "reasoning": "", "bestQuote": "" },
        "Emergent Insights": { "score": 0, "reasoning":
     "", "bestQuote": "" },
        "Structural Rigor": { "score": 0, "reasoning":
    "", "bestQuote": "" },
        "Citation Quality": { "score": 0, "reasoning":
    "", "bestQuote": "" },
        "Evidentiary Honesty": { "score": 0,
    "reasoning": "", "bestQuote": "" },
        "Actionability": { "score": 0, "reasoning": "",
     "bestQuote": "" }
      },
      "Perplexity": { ... },
      "Claude.ai": { ... },
      "Gemini": { ... },
      "Meaningful": { ... }
    }

    --- CHATGPT OUTPUT ---
    Read file: benchmark/chat-gpt.md

    --- PERPLEXITY OUTPUT ---
    Read file: benchmark/perplexity.md

    --- CLAUDE.AI OUTPUT ---
    Read file: benchmark/claude.md

    --- GEMINI OUTPUT ---
    Read file: benchmark/gemini.md

    --- MEANINGFUL OUTPUT ---
    Read file: benchmark/meaningful/synthesis.txt


• I’m reading the Perplexity output and then I’ll score all five in the same rubric, independently.

• {
  "ChatGPT": {
  "Depth & Specificity": {
  "score": 8,
  "reasoning": "It surfaces many concrete facts beyond the brief, including company prototypes, membership declines, platform usage, and the
  BrainHealth cost estimate. I deduct because several figures are estimates, interpolations, or lightly sourced.",
  "bestQuote": "Wingstop built a completely seatless prototype store in 2023 (100% digital ordering/delivery pickup)."
  },
  "Emergent Insights": {
  "score": 5,
  "reasoning": "The report assembles the brief's themes competently, but it rarely produces genuinely surprising conclusions that only emerge from
  research. Its best non-obvious moment is the Starbucks reversal as evidence that hyper-efficiency can damage the value proposition itself.",
  "bestQuote": "By 2025, the chain actually reversed course, announcing it would retire most such stores because they lacked the warmth and human
  connection of traditional cafes."
  },
  "Structural Rigor": {
  "score": 9,
  "reasoning": "This is one of its strongest dimensions. It includes comparative tables, a causal flowchart, and a prioritized intervention table
  with stakeholders, impact, cost, and priority, which makes it materially more decision-ready than pure prose.",
  "bestQuote": "Intervention | Category | Stakeholders | Estimated Impact | Rough Cost | Priority"
  },
  "Citation Quality": {
  "score": 2,
  "reasoning": "It uses opaque bracketed reference tokens in the body and a source list at the end, rather than inline hyperlinks attached to each
  claim. That is exactly the citation pattern the rubric penalizes.",
  "bestQuote": "drive-thrus and delivery-only models  "
  },
  "Evidentiary Honesty": {
  "score": 6,
  "reasoning": "It does acknowledge confounders, assumptions, and uncertainty in the causal story. I deduct because it still leans on speculative
  back-of-the-envelope attribution and sometimes presents inferred relationships with more confidence than the evidence warrants.",
  "bestQuote": "We assume relative weights but stress uncertainty: no single factor explains loneliness, but the infrastructure changes are plausible
  contributors."
  },
  "Actionability": {
  "score": 7,
  "reasoning": "The intervention table is concrete and names stakeholders, costs, and priorities, which is much better than generic advice. The
  deduction is for missing timelines, milestones, and implementation sequencing.",
  "bestQuote": "Zoning for Third Places: Require new commercial/residential developments to include communal seating."
  }
  },
  "Perplexity": {
  "Depth & Specificity": {
  "score": 7,
  "reasoning": "It introduces several specific facts beyond the brief, including ghost-kitchen counts, delivery-market size, platform usage, and
  church-membership decline. I deduct because the evidence base leans heavily on secondary, inconsistent, or weak sources, and some numbers are
  global rather than tightly matched to the brief.",
  "bestQuote": "IBISWorld estimates roughly 7,600 ghost-kitchen businesses operating in 2024-2025"
  },
  "Emergent Insights": {
  "score": 4,
  "reasoning": "Most of the output restates the brief's framing in smoother prose rather than generating surprising research-derived conclusions. The
  main synthesis is the idea that friction bundled with social presence has been decomposed and outsourced, but the report does not push far beyond
  that.",
  "bestQuote": "friction that once came bundled with social presence is being decomposed, automated, or externalized"
  },
  "Structural Rigor": {
  "score": 5,
  "reasoning": "It has clear sections and ends with a useful audit framework listing measurable axes, so it is not pure essay. But it does not
  include a weighted decision table, phased plan, or real prioritization logic.",
  "bestQuote": "If you wanted to operationalize this audit from 2010-2026, a few measurable axes follow directly from the patterns above:"
  },
  "Citation Quality": {
  "score": 3,
  "reasoning": "Claims are tagged with footnotes and the URLs appear in a reference block at the end, which is somewhat traceable. It still fails the
  rubric's requirement for inline hyperlinks at the point of each claim, and the source list includes many low-trust domains.",
  "bestQuote": "slow, low-value 'micro-interactions' that used to come bundled with everyday life.[^1][^2]"
  },
  "Evidentiary Honesty": {
  "score": 4,
  "reasoning": "It shows some nuance on intent and incentives, but it rarely names causal gaps, conflicting evidence, or what the data does not
  prove. The structural thesis is asserted more confidently than the sourcing justifies.",
  "bestQuote": "None of these changes is malicious in isolation-they are rational responses to incentives around efficiency, safety, scalability, and
  monetization"
  },
  "Actionability": {
  "score": 3,
  "reasoning": "It offers a decent measurement framework for running an audit, but it does not provide an intervention plan with timelines or
  implementation detail. This is more operationalization of research than action plan for decision-makers.",
  "bestQuote": "Physical third-place density and form: per-capita counts of cafes, pubs, parks, libraries, and community centers"
  }
  },
  "Claude.ai": {
  "Depth & Specificity": {
  "score": 9,
  "reasoning": "It repeatedly surfaces specific facts not in the brief, including Starbucks removing 30,000 seats, the 1,000-store remodel plan,
  ghost-kitchen market sizing, union-membership collapse, library-visit declines, and time-use shifts. It is clearly research-rich rather than merely
  brief-restating.",
  "bestQuote": "Starbucks removed roughly 30,000 seats from its U.S. cafes"
  },
  "Emergent Insights": {
  "score": 9,
  "reasoning": "This is Claude's standout strength. It generates genuinely fresh synthesis, especially the idea that optimization removed the
  byproducts that made social life work and that structural loss can outpace self-reported loneliness because people lose the reference point for
  comparison.",
  "bestQuote": "Friction wasn't waste. Friction was the product."
  },
  "Structural Rigor": {
  "score": 4,
  "reasoning": "The report is clearly organized, but it is still mostly a narrative essay. It lacks a decision matrix, weighted tradeoff table, or
  phased implementation plan, so the structure is interpretive rather than operational.",
  "bestQuote": "This report walks through the evidence across three research objectives - the proximity gap, the digital mirror, and the health-
  metric paradox."
  },
  "Citation Quality": {
  "score": 4,
  "reasoning": "The source list is detailed and specific, but citations are mostly collected in a bibliography at the end rather than linked inline
  at the point of each claim. That makes verification possible but cumbersome.",
  "bestQuote": "## Sources"
  },
  "Evidentiary Honesty": {
  "score": 10,
  "reasoning": "This is the best performance on the honesty dimension. It explicitly qualifies the $406B figure, includes a serious counterargument
  section, and distinguishes structural decline from subjective loneliness reporting instead of pretending the evidence is cleaner than it is.",
  "bestQuote": "a directional advocacy estimate, not a primary-source national accounts number"
  },
  "Actionability": {
  "score": 4,
  "reasoning": "It identifies sensible levers such as zoning, transit, libraries, workplace policy, and public-space redesign, but these remain
  category-level recommendations. There is no implementation timeline, prioritization framework, or owner-by-owner execution plan.",
  "bestQuote": "The most concrete near-term levers are zoning reform, investment in libraries and public transit, workplace policy that reduces
  social isolation among remote and hybrid workers, and redesign of public space."
  }
  },
  "Gemini": {
  "Depth & Specificity": {
  "score": 8,
  "reasoning": "It brings in many concrete details beyond the brief, including bowling and fraternal decline, Discord and Twitch scale, absenteeism
  costs, Medicare costs, and hostile-architecture examples. The deduction is for uneven source quality and occasional inflation of what those facts
  prove.",
  "bestQuote": "In the late 1970s, league bowling membership peaked at 9.8 million; by 2026, the United States Bowling Congress reported membership
  had fallen to under 1.5 million."
  },
  "Emergent Insights": {
  "score": 4,
  "reasoning": "A few angles are interesting, especially AI-mediated workplace loneliness and the economic paradox framing, but most of the report
  extends themes already present in the brief rather than surfacing surprising conclusions that clearly required research to discover.",
  "bestQuote": "Employees who frequently collaborate with AI systems report higher rates of loneliness"
  },
  "Structural Rigor": {
  "score": 7,
  "reasoning": "It uses several comparison tables and clearly segmented sections, which is more rigorous than pure prose. I deduct because it never
  develops a true decision framework, weighted criteria matrix, or phased implementation plan.",
  "bestQuote": "Design Element | Target Behavior | Impact on General Population"
  },
  "Citation Quality": {
  "score": 3,
  "reasoning": "It relies on numbered references and an end bibliography instead of inline hyperlinks attached to specific claims. That is better
  than no sourcing, but it still misses the exact citation standard in the rubric.",
  "bestQuote": "By 2026, the aggregate cost of social isolation and loneliness is projected to reach $406 billion annually in lost productivity and
  healthcare expenses.1"
  },
  "Evidentiary Honesty": {
  "score": 2,
  "reasoning": "The report overstates its case and seldom names what the evidence does not prove. It presents broad social trends as a fairly settled
  engineering outcome without adequately separating correlation, mechanism, and causation.",
  "bestQuote": "this state of isolation is an engineering outcome"
  },
  "Actionability": {
  "score": 4,
  "reasoning": "It proposes interventions, but they remain broad headings rather than implementable plans. Timelines, sequencing, measurable targets,
  and concrete policy mechanics are mostly absent.",
  "bestQuote": "Proposed interventions include: Social Infrastructure Investment, Abolishing Hostile Architecture, Promoting In-Person Communcation,
  Nudging for Connection."
  }
  },
  "Meaningful": {
  "Depth & Specificity": {
  "score": 10,
  "reasoning": "It consistently surfaces precise, research-derived facts that are far beyond the brief itself, including delivery-platform closure
  elasticity, delivery cannibalization rates, Discord mental-health outcomes, pub-closure survey effects, and explicit causal gaps in the
  literature.",
  "bestQuote": "each 1% increase in food-delivery platform penetration correlated with a roughly 1.6% increase in the likelihood of restaurant
  closure"
  },
  "Emergent Insights": {
  "score": 9,
  "reasoning": "It produces several genuinely non-obvious conclusions that emerge from synthesis rather than prompt restatement, especially the
  reciprocity threshold in digital communities, the complement-vs-substitute distinction, and the interaction effect between rent, labor, and
  delivery platforms.",
  "bestQuote": "the distinction is not between digital and physical, but between passive consumption and active, reciprocal participation"
  },
  "Structural Rigor": {
  "score": 10,
  "reasoning": "This is the strongest structure of the five. It includes explicit methodology, a causal-evidence section, an attribution table, an
  options matrix, and a phased 0-18 month / 18 month-5 year / 5+ year implementation path.",
  "bestQuote": "| Criterion | Option A: Zoning Reform | Option B: Platform Regulation | Option C: Public Investment | Option D: Digital
  Infrastructure |"
  },
  "Citation Quality": {
  "score": 9,
  "reasoning": "It usually cites claims with inline hyperlinks exactly where they appear, which matches the rubric well. I deduct slightly because
  not every claim is linked and some supporting sources are weaker than ideal.",
  "bestQuote": "58% of U.S. adults score as clinically lonely on standardized measures (Cigna/Morning Consult, 2023
  (https://newsroom.thecignagroup.com/all-stories?item=446))"
  },
  "Evidentiary Honesty": {
  "score": 9,
  "reasoning": "It is explicit about causal limits, clearly separates what is established from what is inferred, and repeatedly marks estimated
  weights as estimates. It pushes hard at times, but it does not hide the core evidentiary gap.",
  "bestQuote": "The honest answer is that the evidence is strongly convergent but not experimentally sealed."
  },
  "Actionability": {
  "score": 10,
  "reasoning": "It provides concrete interventions, responsible actors, and timelines, including commission caps, commissioned research, digital
  cohort programs, hostile-architecture audits, and zoning tools. This is fully aligned with the rubric's definition of implementable
  recommendations.",
  "bestQuote": "Phase 1: Immediate (0-18 months) - Stabilize the Digital and Regulatory Environment"
  }
  }
  }
