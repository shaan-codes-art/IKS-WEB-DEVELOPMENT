export interface LiteratureReference {
  id: string;
  referenceNumber: number;
  authors: string;
  year: number;
  title: string;
  venue: string;
  doiUrl: string;
  relevance: string;
}

export interface ResearchPaperData {
  gapNumber: number;
  gapCode: string;
  shortTitle: string;
  fullTitle: string;
  subtitle: string;
  authors: string;
  affiliation: string;
  abstract: string;
  keywords: string[];
  background: {
    title: string;
    paragraphs: string[];
  };
  researchGapStatement: string;
  researchQuestions: {
    id: string;
    code: string;
    question: string;
    rationale: string;
  }[];
  objectives: {
    id: string;
    title: string;
    description: string;
  }[];
  expectedOutcomes: {
    id: string;
    title: string;
    impact: string;
  }[];
  methodology: {
    phases: {
      phase: string;
      title: string;
      details: string[];
    }[];
  };
  evaluationPlan: {
    metrics: string[];
    benchmarkDatasets: string[];
    expertEvaluation: string;
  };
  literature: LiteratureReference[];
  downloadFileName: string;
}

export const RESEARCH_GAP_17_DATA: ResearchPaperData = {
  gapNumber: 17,
  gapCode: "Research 1",
  shortTitle: "Explainable Sanskrit NLP (X-NLP)",
  fullTitle: "Towards Verifiable and Explainable Natural Language Processing for Sanskrit: A Pāṇinian Rule-Attribution Framework",
  subtitle: "A Pāṇinian Rule-Attribution Framework",
  authors: "College Research Initiative in Indian Knowledge Systems (IKS)",
  affiliation: "Center for Computational Linguistics and Sanskrit Studies",
  abstract:
    "This proposal studies how a Sanskrit analysis system can expose the evidence and rule applications behind its outputs. The project-defined gap is a bounded workflow connecting selected analyses to inspectable intermediate states, rule references, and evidence-status labels, followed by evaluation of whether those traces help qualified reviewers find errors. The proposed workbench preserves alternatives and uncertainty rather than promising complete coverage or deterministic resolution of every grammatical conflict. A pilot would use source-checked examples and compare trace inspection with output-only presentation. Reference correctness, transition agreement, reviewer error detection, and task time would be reported separately. No experiments, scholarly validation, or peer review are claimed as completed.",
  keywords: [
    "Explainable AI (XAI)",
    "Sanskrit Computational Linguistics",
    "Pāṇinian Grammar",
    "Aṣṭādhyāyī",
    "Rule Provenance",
    "Morphological Derivation",
    "Conflict Resolution",
  ],
  background: {
    title: "The Epistemic Conflict: Statistical NLP vs. Generative Paninian Grammar",
    paragraphs: [
      "The Aṣṭādhyāyī is a compact grammatical work traditionally attributed to Pāṇini. Its concise rules and technical conventions have been compared with formal and generative descriptions of language; such comparisons are analytical analogies, not an assertion that the text is identical to a modern computational grammar. This website presents selected examples rather than a complete derivational system.",
      "Statistical NLP and transformer-based language models have been applied to many language tasks. Sanskrit's inflection, compounds, sandhi, and available-data constraints motivate careful task-specific evaluation; comparative claims about model performance require defined datasets and benchmarks and are not established by this project.",
      "For scholarly uses such as digital philology and terminology analysis, it is important to make evidence, uncertainty, and system limitations inspectable. A rule trace can support auditability, but it does not by itself prove that an analysis is correct.",
    ],
  },
  researchGapStatement:
    "A bounded, testable workflow is needed to connect selected Sanskrit analysis outputs to inspectable intermediate states, rule references, and evidence-status labels, and to evaluate whether those traces help qualified reviewers find errors. The project has not conducted a systematic survey establishing that no comparable framework exists.",
  researchQuestions: [
    {
      id: "rq1",
      code: "RQ 1.1",
      question: "How can selected Aṣṭādhyāyī-based analysis steps be represented as a graph of auditable operations, intermediate states, and source references?",
      rationale: "Requires defining trace fields and checking source references for a bounded set of reviewed examples.",
    },
    {
      id: "rq2",
      code: "RQ 2.1",
      question: "Under a stated and edition-checked scope, how reliably can explicitly encoded priority rules resolve cases in which more than one operation is eligible, and where must the system preserve ambiguity?",
      rationale: "Tests rule handling only where the applicable rule, source, and annotation protocol have been reviewed; unresolved cases remain visible.",
    },
    {
      id: "rq3",
      code: "RQ 3.1",
      question: "In a controlled review task, does presenting a provenance trace change qualified reviewers’ error-detection accuracy or time compared with presenting the same candidate output without a trace?",
      rationale: "Measures observable review performance; perceived trust is not treated as a substitute for correctness.",
    },
  ],
  objectives: [
    {
      id: "obj1",
      title: "Specify a Provenance Trace Schema",
      description: "Define records for intermediate states, operations, source locators, alternatives, and evidence status for a bounded example set.",
    },
    {
      id: "obj2",
      title: "Build a Bounded, Auditable Prototype",
      description: "Implement trace inspection for selected examples; preserve multiple candidates or unresolved cases rather than forcing unsupported decisions.",
    },
    {
      id: "obj3",
      title: "Evaluate the Reviewer Interface",
      description: "Compare trace-present and output-only review tasks after annotation, source checking, and any required ethics review.",
    },
  ],
  expectedOutcomes: [
    {
      id: "out1",
      title: "Auditable Trace Schema",
      impact: "A proposed schema for selected examples records intermediate states, source locators, alternatives, and evidence status. Its correctness must be evaluated.",
    },
    {
      id: "out2",
      title: "Reviewed Example Set and Error Taxonomy",
      impact: "A bounded example set and annotations may be released if source licensing, review, and permissions allow.",
    },
    {
      id: "out3",
      title: "Human-Centered Evaluation Report",
      impact: "A comparison of trace and output-only review, reporting uncertainty and negative or inconclusive findings as well as positive results.",
    },
  ],
  methodology: {
    phases: [
      {
        phase: "Phase I",
        title: "Scope, Sources & Trace Specification",
        details: [
          "Select a bounded set of examples and identify the exact edition or stable source locator for each rule reference.",
          "Specify trace fields, uncertainty labels, and annotation instructions; document unresolved interpretations.",
        ],
      },
      {
        phase: "Phase II",
        title: "Trace Prototype & Rule-Case Tests",
        details: [
          "Implement a trace viewer for selected examples, retaining multiple candidates when the evidence does not determine one answer.",
          "Encode only source-reviewed priority rules and add tests for applicable, inapplicable, and unresolved cases.",
        ],
      },
      {
        phase: "Phase III",
        title: "Annotation Review & Interface Evaluation",
        details: [
          "Compare selected transitions with independently prepared, edition-checked annotations and report reviewer disagreement.",
          "Evaluate reviewer error detection and task time against the same candidate output without a trace.",
        ],
      },
    ],
  },
  evaluationPlan: {
    metrics: [
      "Reference accuracy: correctness of displayed rule labels and source locators within the defined scope.",
      "Transition agreement: agreement with adjudicated annotations; report unresolved and disputed cases separately.",
      "Reviewer error detection and localization accuracy, compared with output-only review.",
      "Task time and reviewer agreement, with uncertainty and study limitations reported.",
    ],
    benchmarkDatasets: [
      "A project-created, source-checked sample of short examples, subject to edition and reuse review.",
      "Existing tools or corpora only where task comparability, version, license, and access conditions are established.",
    ],
    expertEvaluation: "Independent annotation and adjudication by qualified reviewers; recruitment and any human-participant study require appropriate approval.",
  },
  literature: [
    {
      id: "sanskrit-computational-linguistics-2009",
      referenceNumber: 2,
      authors: "Huet, Gérard; Kulkarni, Amba; Scharf, Peter (Eds.)",
      year: 2009,
      title: "Sanskrit Computational Linguistics: First and Second International Symposia",
      venue: "Lecture Notes in Computer Science, Vol. 5402. Springer",
      doiUrl: "https://doi.org/10.1007/978-3-642-00155-0",
      relevance: "An edited scholarly collection of work in Sanskrit computational linguistics; cited for the field context only.",
    },
  ],
  downloadFileName: "Research_Proposal_Gap17_Explainable_Sanskrit_NLP.md",
};

export const RESEARCH_GAP_20_DATA: ResearchPaperData = {
  gapNumber: 20,
  gapCode: "Research 2",
  shortTitle: "Pāṇinian Grammar for Language Learning (CALL)",
  fullTitle: "Computational Scaffolding for Pāṇinian Generative Grammar: An Interactive Computer-Assisted Language Learning (CALL) Paradigm",
  subtitle: "An Interactive Computer-Assisted Language Learning (CALL) Study",
  authors: "College Research Initiative in Indian Knowledge Systems (IKS)",
  affiliation: "Center for Computational Linguistics and Sanskrit Studies",
  abstract:
    "This proposal investigates how interactive explanations of selected Pāṇinian grammatical operations might support novice Sanskrit learners. The project-defined gap is a comparative study of stepwise visual scaffolding and content-matched static explanations, not a claim that digital Sanskrit-learning tools are absent. A proposed pilot would combine a pratyāhāra exploration activity, a derivation stepper, and formative questions, then measure immediate conceptual performance, delayed retention, task performance, usability, and learner-reported effort. Cognitive-load and retrieval-practice research motivate the design but do not establish that this website will be effective. No learning outcomes or experiments are claimed as completed.",
  keywords: [
    "Computer-Assisted Language Learning (CALL)",
    "Pāṇinian Pedagogy",
    "Aṣṭādhyāyī Visualization",
    "Cognitive Scaffolding",
    "Interactive Grammar",
    "Indian Knowledge Systems",
  ],
  background: {
    title: "The Pedagogical Barrier of Algorithmic Brevity",
    paragraphs: [
      "The Aṣṭādhyāyī uses compact technical terminology and rule references. This proposal treats the instructional consequences of that design as a question to investigate, not as a measured claim about all learners.",
      "Working through a selected rule may require learners to coordinate a form, a sound-group label, a condition, and successive operations. The project's examples and glosses require source review and are not presented here as an independently verified edition.",
      "Interactive steps may make dependencies easier to inspect, but additional controls or visual encoding may also add cognitive demand. A content-matched comparison is needed before claiming a learning benefit.",
    ],
  },
  researchGapStatement:
    "For selected introductory Pāṇinian concepts, the project needs a content-matched empirical comparison of stepwise interactive scaffolding and a static explanation, including immediate and delayed learning measures. The project has not conducted a systematic survey establishing that comparable digital tools are absent.",
  researchQuestions: [
    {
      id: "rq1_g20",
      code: "RQ 1.2",
      question: "How can selected concepts—such as it-markers, pratyāhāras, and rule-governed derivation steps—be scaffolded visually for novice learners without obscuring the grammatical conditions?",
      rationale: "Designs and reviews a bounded set of instructional representations before making claims about cognitive load or learning.",
    },
    {
      id: "rq2_g20",
      code: "RQ 2.2",
      question: "Compared with a content-matched static explanation, does step-by-step derivation playback change immediate conceptual performance or delayed retention on the selected tasks?",
      rationale: "Compares equivalent content and practice to evaluate the interface rather than assuming an effect.",
    },
    {
      id: "rq3_g20",
      code: "RQ 3.2",
      question: "How do learners use the stepper, sound-group visualization, and color-coded boundaries, and which elements are associated with task success, errors, or reported difficulty?",
      rationale: "Uses task outcomes and learner feedback to guide revision; engagement alone is not treated as evidence of learning.",
    },
  ],
  objectives: [
    {
      id: "obj1_g20",
      title: "Select and Source-Check Instructional Examples",
      description: "Prepare a limited set of reviewed introductory concepts, examples, and learning objectives.",
    },
    {
      id: "obj2_g20",
      title: "Build Matched Interactive and Static Materials",
      description: "Implement an accessible stepper and a content-matched static lesson with visible conditions and intermediate steps.",
    },
    {
      id: "obj3_g20",
      title: "Evaluate Learning and Retention",
      description: "Review assessment items and, after any required ethics approval, pilot immediate and delayed learning measures.",
    },
  ],
  expectedOutcomes: [
    {
      id: "out1_g20",
      title: "Accessible Interactive Lesson Prototype",
      impact: "A proposed lesson makes selected notation, conditions, and intermediate derivation steps inspectable.",
    },
    {
      id: "out2_g20",
      title: "Reviewed Instructional Materials",
      impact: "A source-reviewed set of examples, learning objectives, assessment items, and accessibility requirements.",
    },
    {
      id: "out3_g20",
      title: "Transparent Pilot Evaluation",
      impact: "A report of immediate and delayed performance, usability, limitations, and null or negative findings if observed.",
    },
  ],
  methodology: {
    phases: [
      {
        phase: "Phase I",
        title: "Instructional Scope & Source Review",
        details: [
          "Select and source-check a limited set of introductory concepts, examples, and learning objectives.",
          "Prepare a misconception map and review assessment items before testing.",
        ],
      },
      {
        phase: "Phase II",
        title: "Matched Interactive and Static Materials",
        details: [
          "Implement an accessible stepper and content-matched static lesson with visible conditions and intermediate steps.",
          "Test keyboard access, reduced motion, mobile layout, and task instructions before participant use.",
        ],
      },
      {
        phase: "Phase III",
        title: "Approved Pilot and Empirical Evaluation",
        details: [
          "Conduct a comparison only after any required institutional ethics review and informed consent.",
          "Measure immediate conceptual performance and a pre-specified delayed retention outcome.",
        ],
      },
    ],
  },
  evaluationPlan: {
    metrics: [
      "Primary outcome: source-reviewed conceptual assessment aligned to selected objectives, adjusted for baseline where appropriate.",
      "Delayed retention on a parallel assessment at a pre-specified interval; report attrition separately.",
      "Task completion, error types, and time; time is not interpreted as learning by itself.",
      "Usability and learner-reported difficulty, measured with preselected instruments and interpreted as experience.",
    ],
    benchmarkDatasets: [
      "Project-created, source-reviewed examples and assessments; no participant dataset is claimed to exist.",
      "A content-matched static lesson as the primary comparator for the interactive prototype.",
    ],
    expertEvaluation: "Review of examples and assessment items by qualified Sanskrit educators; any participant evaluation is contingent on required ethics approval.",
  },
  literature: [
    {
      id: "sanskrit-computational-linguistics-2009",
      referenceNumber: 2,
      authors: "Huet, Gérard; Kulkarni, Amba; Scharf, Peter (Eds.)",
      year: 2009,
      title: "Sanskrit Computational Linguistics: First and Second International Symposia",
      venue: "Lecture Notes in Computer Science, Vol. 5402. Springer",
      doiUrl: "https://doi.org/10.1007/978-3-642-00155-0",
      relevance: "An edited scholarly collection of work in Sanskrit computational linguistics; cited for the field context only.",
    },
    {
      id: "sweller-1988",
      referenceNumber: 3,
      authors: "Sweller, John",
      year: 1988,
      title: "Cognitive Load During Problem Solving: Effects on Learning",
      venue: "Cognitive Science, 12(2), 257-285",
      doiUrl: "https://doi.org/10.1207/s15516709cog1202_4",
      relevance: "Discusses cognitive processing capacity and schema acquisition during problem solving; it does not evaluate this website.",
    },
  ],
  downloadFileName: "Research_Proposal_Gap20_Paninian_CALL_Pedagogy.md",
};
