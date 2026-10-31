# Computational Scaffolding for Pāṇinian Generative Grammar
**An Interactive Computer-Assisted Language Learning (CALL) Study**

Research design paper · Research 2 · Pāṇinian Grammar for Language Learning

**Status:** Working research proposal. The instructional intervention and evaluation described below are proposed; this website has not undergone the proposed learning study, and this paper is not peer-reviewed or institutionally approved.

**Authors:** College Research Initiative in Indian Knowledge Systems (IKS)  
**Affiliation:** Center for Computational Linguistics and Sanskrit Studies  
**Date:** 25 October 2026

## Abstract
This proposal investigates how interactive explanations of selected Pāṇinian grammatical operations might support novice Sanskrit learners. The Aṣṭādhyāyī uses a compact technical metalanguage; learners may need to coordinate a base form, sound-group notation, rule conditions, and successive operations. The project-defined gap is not a claim that no digital Sanskrit learning tools exist. It is the need for a carefully scoped, comparative study of whether stepwise visual scaffolding for selected concepts improves learner performance or retention over content-matched static explanations.

The proposed intervention combines a pratyāhāra exploration activity, a derivation stepper, and formative questions with feedback. A pilot would compare the interactive version with a static, content-matched presentation, using pre-specified learning tasks, an immediate post-test, and a delayed retention assessment. Outcomes would include conceptual accuracy, delayed retention, task completion, time, usability, and learner-reported cognitive effort. Prior cognitive-load and retrieval-practice research motivates the design but does not establish that this website or its Sanskrit lessons will be effective. Expected outputs are a teaching prototype, documented learning materials, and an evaluation report, including null or negative findings.

## Keywords
Computer-assisted language learning; Pāṇinian grammar; Sanskrit pedagogy; instructional scaffolding; formative assessment; interactive visualization.

## 1. Introduction and background
Pāṇinian grammatical descriptions use compact terminology and rule references. To work through a selected derivation, a learner may need to connect a base, a technical sound class, a rule condition, and a sequence of state changes. A static table can show a result but may leave those dependencies implicit; an animation can show sequence but may also add distraction or cognitive demand. The design question is therefore empirical rather than self-evident.

The existing THE PANINI PARSER website offers curated examples, visual derivation steps, learning lessons, and formative quiz activities. It is a prototype and has not established learning efficacy. This proposal retains the project’s focus on visualizing pratyāhāras and prakriyā-style steps while defining a comparison that can separate the effect of the interface from the effect of extra content or practice.

## 2. Problem statement
Novice learners may find it difficult to coordinate technical notation and rule-governed changes when explanations omit intermediate states or prerequisites. Conversely, adding colors, controls, or animation does not guarantee learning and may create extraneous load. The project lacks a controlled evaluation of whether its selected interactive scaffolds support learning relative to an equivalent static explanation.

The study will test a small, taught set of concepts with learners whose prior knowledge is measured. It will not claim to resolve broader challenges in Sanskrit education or replace instruction by qualified teachers.

## 3. Exact research gap and significance
**Project-defined gap (Research 2):** For selected introductory Pāṇinian concepts, the project needs a content-matched empirical comparison of stepwise interactive scaffolding and a static explanation, including an immediate measure and a delayed retention measure. The project has not conducted a systematic survey establishing that comparable digital tools are absent. The broad “acute absence” statement in earlier project material is therefore not treated as a verified literature finding.

The gap matters because design choices should be tested against learning outcomes, not inferred from visual appeal, engagement alone, or the existence of a working interface. A bounded study can inform which explanatory elements help learners, which are confusing, and what should be revised before wider classroom use.

## 4. Literature review
Sweller’s study on cognitive load during problem solving links problem-solving demands with learning and schema acquisition [1]. It motivates attention to the amount and sequencing of information, but its findings do not directly evaluate Sanskrit instruction or this website. The intervention should therefore measure learning and perceived effort rather than claim that a particular design has already reduced cognitive load.

Roediger and Karpicke report that retrieval testing can improve delayed retention for the materials and conditions they studied [2]. This supports including formative retrieval practice as a design element, while also requiring the two study conditions to receive equivalent practice if the aim is to isolate the interface effect.

The Huet, Kulkarni, and Scharf proceedings document an established computational Sanskrit linguistics research context [3]. They are not evidence of CALL efficacy. Hake’s analysis of interactive engagement concerns introductory mechanics courses and physics assessments [4]; it is included only to explain the origin of normalized gain as a proposed descriptive metric, not to assume that its reported outcomes transfer to Sanskrit learning. A full review should search Sanskrit pedagogy, digital humanities, CALL, and multimedia learning before any general novelty claim.

## 5. Research questions
1. **RQ 1.2:** How can selected concepts—such as it-markers, pratyāhāras, and rule-governed derivation steps—be scaffolded visually for novice learners without obscuring the grammatical conditions?
2. **RQ 2.2:** Compared with a content-matched static explanation, does step-by-step derivation playback change immediate conceptual performance or delayed retention on the selected tasks?
3. **RQ 3.2:** How do learners use the stepper, sound-group visualization, and color-coded boundaries, and which elements are associated with task success, errors, or reported difficulty?

These questions do not presuppose a positive effect. “Engagement” will not be used as a proxy for learning.

## 6. Research objectives
1. Select and source-check a small set of introductory concepts and examples suitable for instruction and assessment.
2. Design a tiered explanation with visible inputs, rule conditions, intermediate states, and concise terminology support.
3. Implement an accessible interactive prototype and a content-matched static comparison.
4. Develop and review learning assessments that measure conceptual understanding rather than recall of interface wording alone.
5. Conduct a pilot and report learning, retention, usability, and implementation findings with uncertainty and limitations.

## 7. Proposed conceptual framework
The instructional model links **prior knowledge**, **scaffold design**, **learner activity**, and **measured learning**. Prior knowledge and language experience are measured at baseline. The scaffold makes a selected operation visible through progressive disclosure: (a) the form and task, (b) relevant notation and conditions, (c) one intermediate change at a time, and (d) a short explanation and opportunity to retrieve the rule. The learner’s attempt and feedback are recorded only as required by the approved protocol.

The hypothesized mechanism is that making relevant dependencies easier to inspect may support construction of a usable mental model. This is a theoretical rationale, not an observed mechanism. Cognitive effort, navigation behavior, and open-ended feedback can help interpret outcome differences but cannot independently prove mediation.

## 8. Proposed methodology and system design
The study will use a randomized, content-matched pilot where feasible. One group receives the interactive stepper and visualized sound-group exploration; the comparison group receives the same examples, explanations, practice items, and time guidance in a static, accessible format. If random assignment is not feasible in the course setting, the study will be described as quasi-experimental and baseline differences will be reported.

The first prototype will cover a limited set of reviewed examples, not all Sanskrit morphology. Each step will identify the starting form, relevant condition, operation, resulting form, and source locator. Optional detail will let learners reveal technical terminology without forcing it into the initial view. Color will not be the sole carrier of meaning; labels, patterns, and text alternatives will be provided. Keyboard navigation, screen-reader labels, reduced-motion behavior, and mobile layout will be tested before participant use.

## 9. Data sources and collection plan
Instructional examples will be prepared from identified grammatical sources and checked by qualified reviewers. The paper will record the edition or digital locator and distinguish primary-source wording from project-authored explanation. Assessment items will be written independently of the interface wording where practical and reviewed for ambiguity, coverage, and answer-key accuracy.

Participant data may include a baseline knowledge check, immediate and delayed assessment responses, task completion and time, short usability items, and voluntary interview or open-ended feedback. Only data approved by the relevant institution will be collected. The study will not collect unnecessary identifiers, sensitive personal data, or user activity from the public website without explicit consent and appropriate review. No dataset, syllabus sample, or participant cohort is claimed to have been collected yet.

## 10. Proposed experimental procedure
**Phase A — instructional scope:** identify target concepts and sources; consult instructors; create learning objectives and a misconception map; review all examples and answer keys.

**Phase B — materials and pilot:** implement interactive and static conditions; use a small formative pilot to find unclear instructions and technical problems; revise before the main comparison. Pilot participants will not be included in the main analysis unless this is planned and approved in advance.

**Phase C — main comparison:** obtain ethics approval and consent; measure prior knowledge; allocate learners to the conditions; deliver the same lesson content and equivalent practice; administer an immediate assessment and learner-experience measures.

**Phase D — retention and analysis:** administer a delayed assessment at a pre-specified interval (proposed: approximately four weeks, subject to course scheduling); document attrition; analyze the pre-registered primary outcome; report all planned outcomes and deviations.

## 11. Evaluation metrics and comparison baselines
- **Primary learning outcome:** score on a source-reviewed conceptual assessment aligned to the stated objectives, adjusted for baseline where appropriate.
- **Delayed retention:** score on a parallel assessment after the pre-specified delay; report completion and attrition separately.
- **Normalized gain:** may be reported as a descriptive secondary measure with its formula and ceiling effects stated. Hake’s use of the measure in physics does not validate transfer to Sanskrit pedagogy [4].
- **Task performance:** completion, number and type of errors, and time for defined derivation tasks; time is not treated as learning by itself.
- **Usability:** task success, accessibility issues, and a named, consistently administered usability instrument if selected before data collection.
- **Learner experience:** self-reported difficulty and qualitative feedback, interpreted as experience rather than proof of cognitive mechanism.

The primary comparator is the static content-matched lesson. Analysis will report effect estimates, confidence intervals, missingness, and the pre-specified analysis plan. A sample-size justification will be prepared after the primary outcome and feasible recruitment pool are defined; the proposal does not invent a target effect or promise statistical significance.

## 12. Expected contributions and outcomes
Possible deliverables include an accessible interactive lesson prototype, reviewed instructional materials, an assessment blueprint, and a pilot evaluation report. The working hypothesis is that step-by-step presentation may help some learners inspect grammatical dependencies; it may have no effect or may increase effort for some users. No improvement in learning, retention, engagement, or usability is claimed before evaluation.

## 13. Limitations and risks
A small, single-course pilot may have limited statistical power and generalizability. Learners’ prior Sanskrit, script familiarity, language background, instructor, and time on task can affect outcomes. The comparison may not isolate individual interface features. A delayed test may suffer attrition. Assessment items may overrepresent the taught examples. These limitations will be stated; the system will not be described as a validated curriculum on the basis of a pilot.

## 14. Ethical considerations
The study requires institutional review where applicable, informed consent, voluntary participation, and clear separation between research participation and course grading. Participants may withdraw under the approved protocol. Data will be minimized, pseudonymized where possible, access-controlled, and retained according to institutional policy. Accessibility accommodations will be considered. Materials will distinguish traditional grammar sources from modern pedagogical framing and will not imply that one interface replaces teachers or established scholarly instruction.

## 15. Timeline and phased work plan
- **Months 1–2:** literature search, course-context consultation, define learning objectives and source review.
- **Months 3–4:** create examples, assessment blueprint, accessibility requirements, and matched learning materials.
- **Months 5–6:** build the interactive and static prototypes; conduct technical and formative checks.
- **Month 7:** submit ethics materials and revise the protocol; recruitment begins only after approval.
- **Months 8–9:** run the pilot comparison if approval, recruitment, and course scheduling permit.
- **Month 10:** administer the delayed assessment and document missingness.
- **Months 11–12:** analyze the pre-specified outcomes and prepare a transparent report and reusable materials.

The schedule is proposed and conditional; it does not imply that participant work has begun.

## 16. Conclusion
Research 2 is a proposal to evaluate interactive scaffolding for a defined set of Pāṇinian concepts, not a verified claim that digital Sanskrit-learning tools are absent or that visualization necessarily reduces cognitive load. A content-matched comparison, source-reviewed examples, accessible materials, and delayed assessment can help determine whether this particular design supports learning. Results may be positive, null, or negative; each would inform responsible revision of the website and its instructional claims.

## References
1. Sweller, J. (1988). Cognitive Load During Problem Solving: Effects on Learning. *Cognitive Science, 12*(2), 257–285. https://doi.org/10.1207/s15516709cog1202_4. Title, author, year, volume, issue, and pages checked against Crossref.
2. Roediger, H. L., III, & Karpicke, J. D. (2006). Test-Enhanced Learning. *Psychological Science, 17*(3), 249–255. https://doi.org/10.1111/j.1467-9280.2006.01693.x. Bibliographic record checked against Crossref.
3. Huet, G., Kulkarni, A., & Scharf, P. (Eds.). (2009). *Sanskrit Computational Linguistics: First and Second International Symposia*. Lecture Notes in Computer Science, 5402. Springer. https://doi.org/10.1007/978-3-642-00155-0. Bibliographic title, editors, year, and series record checked against Crossref.
4. Hake, R. R. (1998). Interactive-engagement versus traditional methods: A six-thousand-student survey of mechanics test data for introductory physics courses. *American Journal of Physics, 66*(1), 64–74. https://doi.org/10.1119/1.18809. Bibliographic record checked against Crossref; included only for the origin/context of a proposed descriptive metric, not as evidence of transfer to Sanskrit instruction.
