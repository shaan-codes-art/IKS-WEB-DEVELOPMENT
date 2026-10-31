# Towards Verifiable and Explainable Natural Language Processing for Sanskrit
**A Pāṇinian Rule-Attribution Framework**

Research design paper · Research 1 · Explainable Sanskrit NLP (X-NLP)

**Status:** Working research proposal. The system and studies described below are proposed; no experiments, scholarly validation, or peer review are reported as completed.

**Authors:** College Research Initiative in Indian Knowledge Systems (IKS)  
**Affiliation:** Center for Computational Linguistics and Sanskrit Studies  
**Date:** 25 October 2026

## Abstract
This proposal studies how a Sanskrit analysis system can expose the evidence and rule applications behind its outputs. Sanskrit computational tools have addressed tasks including morphological analysis and generation; an explainability interface must therefore be evaluated in relation to existing tools, not against an assumed absence of prior work. The project-defined gap is narrower: for a carefully bounded set of analyses, how can a system connect candidate outputs to explicit rule references, input conditions, intermediate states, and uncertainty in a form that can be checked by readers?

The proposed workbench represents an analysis as a trace of states and operations, with each operation linked to a source record and an evidence status. A pilot would encode a small, edition-checked set of examples, make ambiguity and unsupported transitions visible, and compare trace inspection with output-only presentation. Evaluation would separately measure rule-reference correctness, state-transition agreement with independently prepared annotations, reviewer error detection, and task time. The proposal does not promise complete Aṣṭādhyāyī coverage, deterministic resolution of every grammatical conflict, or improved trust. It treats those as research questions whose answers depend on coverage, annotation quality, and user evaluation.

## Keywords
Explainable NLP; Sanskrit computational linguistics; Pāṇinian grammar; rule provenance; derivation traces; human-centered evaluation.

## 1. Introduction and background
Natural-language-processing systems may produce labels, analyses, or generated forms without making the supporting evidence easy for a human to inspect. Explanations can improve scrutiny only when they are faithful to the system’s actual operation and useful for a specified task; an attractive trace is not itself proof that the analysis is correct. Work on interpretable machine learning has emphasized defining the explanation target and evaluating explanation methods rather than treating interpretability as a single established property [2].

Sanskrit provides a distinctive setting for studying explicit linguistic reasoning. Its grammatical traditions include a compact technical metalanguage, rule references, and operations used in analyses of sound change and word formation. Computational Sanskrit linguistics is an established research area, represented, for example, by the edited proceedings of Huet, Kulkarni, and Scharf [1]. A contemporary project should compare its scope and methods with this body of work and with available tools before making novelty or coverage claims.

The existing THE PANINI PARSER website presents selected Sanskrit examples, sūtra references, and visible derivation steps. It is an educational and research prototype, not a comprehensive Sanskrit parser or an independently validated edition of Pāṇinian grammar. This proposal extends that bounded setting into a testable provenance workflow.

## 2. Problem statement
For a bounded computational Sanskrit analysis, users need to distinguish (a) the system’s output, (b) the operation or model that produced it, (c) the cited grammatical source, and (d) what has and has not been checked. If these are collapsed into a confident-looking explanation, users may mistake a heuristic, incomplete trace, or editorial gloss for a verified derivation. If no trace is exposed, reviewers may have difficulty locating which transition or reference requires correction.

The research problem is to design and evaluate an auditable representation of selected analysis traces without overstating source coverage or grammatical authority. The initial study will focus on examples for which input, expected output, and rule references can be reviewed against an explicitly identified edition or scholarly reference.

## 3. Exact research gap and significance
**Project-defined gap (Research 1):** A small, testable workflow is needed to connect selected Sanskrit analysis outputs to inspectable intermediate states, rule references, and evidence-status labels, and to evaluate whether those traces help qualified reviewers find errors. The project has not conducted a systematic survey establishing that no comparable framework exists. Claims of novelty, comprehensive coverage, or the absence of competing tools remain unverified and are not premises of this study.

The gap matters because a reference number alone does not establish that a rule applies, and a trace can be wrong or incomplete. Explicitly representing provenance and uncertainty could make review more precise, support correction of the example bank, and clarify the boundary between source-backed analysis and illustrative computation. Whether it actually improves review is an empirical question.

## 4. Literature review
Sanskrit computational linguistics includes published work on computational representations and language-processing tasks; the 2009 Springer proceedings provide a verifiable entry point to that research area [1]. The edited volume is cited for field context, not as evidence that this project’s proposed method is novel or that a particular benchmark is suitable.

Ribeiro, Singh, and Guestrin introduced LIME as a method for explaining individual classifier predictions and evaluating explanations through specific tests [2]. Their work motivates asking what a trace claims to explain and whether it reflects the underlying system; it does not establish that local feature explanations are appropriate for formal grammatical derivations. The proposed study therefore treats rule provenance as structured system evidence, not as a generic post-hoc explanation.

Doshi-Velez and Kim argued for more rigorous evaluation of interpretability and for matching evaluation methods to the explanation question [3]. This supports separating trace fidelity and reference correctness from user-facing outcomes such as error detection. The selected literature is intentionally brief. A formal review must search Sanskrit parsing, Pāṇinian formalization, provenance, and human-computer interaction systematically before making any comprehensive novelty statement.

## 5. Research questions
1. **RQ 1.1:** How can selected Aṣṭādhyāyī-based analysis steps be represented as a graph of auditable operations, intermediate states, and source references?
2. **RQ 2.1:** Under a stated and edition-checked scope, how reliably can explicitly encoded priority rules resolve cases in which more than one operation is eligible, and where must the system preserve ambiguity?
3. **RQ 3.1:** In a controlled review task, does presenting a provenance trace change qualified reviewers’ error-detection accuracy or time compared with presenting the same candidate output without a trace?

The third question concerns observable task performance and reviewer judgment. It does not presume that explanations increase trust; trust is not treated as a substitute for correctness.

## 6. Research objectives
1. Specify a trace schema for input, candidate analysis, intermediate state, operation, source reference, preconditions, alternatives, and evidence status.
2. Build an auditable prototype for a bounded set of examples, preserving multiple candidates or unresolved cases rather than forcing a single answer.
3. Prepare independently reviewed annotations and an error taxonomy before evaluating the interface.
4. Compare trace and output-only conditions on predefined review tasks, reporting uncertainty and limitations.
5. Publish the schema, permitted example data, evaluation protocol, and reproducible analysis where source and participant permissions allow.

## 7. Proposed conceptual framework
The framework separates five layers:

- **Input layer:** normalized token or short example, with script and normalization recorded.
- **Candidate layer:** one or more outputs proposed by the underlying analysis procedure; the system does not equate a candidate with a verified answer.
- **Operation layer:** a state transition with a machine-readable operation identifier, preconditions, and any competing eligible operation.
- **Evidence layer:** a source identifier, edition/page or stable digital location where available, exact scope of the claim, and review status.
- **Review layer:** user-visible trace, uncertainty indicator, and correction record.

The trace is a directed graph when alternatives branch; it is not assumed to be a directed acyclic graph for every future process. A deterministic ordering is applied only when its encoding and source warrant it. Otherwise the system records unresolved alternatives. The conceptual model treats provenance as an auditable record and treats correctness as a separate question answered by annotation and evaluation.

## 8. Proposed methodology and system design
The work will use iterative design science: define the research artifact, implement a limited prototype, evaluate it against explicit requirements, and revise it. The prototype will not encode all 3,959 rules or claim full inflectional coverage.

Each trace record will include stable example and operation identifiers, input and output states, rule label and source locator, precondition result, alternatives considered, confidence or review status, and an explanation of any normalization. Every citation must resolve to a catalogued source. Editorial English glosses will be marked as editorial unless checked against a named edition. Rule precedence will be represented as versioned, inspectable code and tested with positive, negative, and collision cases.

An expert review step will check the chosen examples and rule locators before they enter the evaluation set. A reviewer-facing interface will allow stepping through the trace, viewing alternatives, and flagging unsupported or incorrect transitions. System logging will capture only the events necessary for the usability study and will not include personal or sensitive linguistic data unless separately approved.

## 9. Data sources and collection plan
The initial dataset will be a project-created, bounded set of short examples selected from public scholarly sources or independently prepared with qualified reviewers. The exact edition, page or digital locator, transcription policy, and any reuse restrictions will be documented for each example. No corpus size or gold-standard set is claimed to exist at proposal stage.

If a public corpus or existing tool is used, its version, license, access conditions, sampling procedure, and task compatibility will be checked before inclusion. A dataset will not be described as a benchmark unless annotations, splits, and evaluation rules are documented and reviewed. The study will not reproduce copyrighted translations or commentary beyond the minimum quotation allowed for scholarly identification.

## 10. Proposed experimental procedure
**Phase A — scope and annotation:** perform a targeted literature/tool review; choose a limited task and examples; identify an edition; write annotation instructions; and conduct independent annotation with adjudication. Record disagreement rather than silently resolving it.

**Phase B — prototype:** implement the trace schema, evidence-status display, and a reviewer interface. Add automated checks for broken citations, missing operation fields, invalid state references, and inconsistent graph links. Freeze a version before the user comparison.

**Phase C — evaluation:** recruit eligible reviewers only after institutional ethics review where required. Randomly assign review items to trace-present and output-only conditions using counterbalanced item sets. Participants identify whether a candidate contains an error, locate the likely transition, and rate whether the displayed evidence is sufficient. A separate expert panel adjudicates correctness using the documented source protocol.

**Phase D — reporting:** publish the protocol, exclusions, missing data, inter-rater agreement, confidence intervals, and negative as well as positive results. Any post-hoc analysis will be labeled exploratory.

## 11. Evaluation metrics and comparison baselines
- **Reference accuracy:** proportion of displayed source locators and rule labels judged correct within the defined task.
- **Transition agreement:** agreement between system transitions and adjudicated annotations, with partial credit and unresolved cases reported separately.
- **Reviewer error detection:** accuracy, sensitivity, and false-alarm rate for detecting seeded or naturally occurring errors.
- **Localization performance:** proportion of detected errors for which the relevant trace step is correctly identified.
- **Review time:** time per task, reported with distribution and uncertainty; speed is not interpreted as quality by itself.
- **Reviewer agreement:** an appropriate agreement statistic selected for the annotation scale and number of raters, with its assumptions stated.
- **Trace completeness:** proportion of displayed transitions with the required provenance fields; this measures implementation conformance, not grammatical truth.

The primary baseline is the same candidate output with the provenance trace hidden. A secondary baseline may compare an existing rule-based or statistical tool only if its task, version, licensing, and input/output interface are sufficiently comparable. No numerical performance target is asserted in advance. Sample size will be justified by a prospective power or precision analysis after the task and primary outcome are fixed.

## 12. Expected contributions and outcomes
Expected deliverables are a versioned trace schema, a limited prototype, an annotated and permission-cleared example set if feasible, a documented error taxonomy, and an evaluation report. The project hypothesizes that explicit traces may make some errors easier to locate; this is not a predicted result or a claim of increased accuracy. An inconclusive or negative result would still inform which provenance elements are useful, confusing, or costly.

## 13. Limitations and risks
The pilot’s bounded example set will not represent the full variety of Sanskrit texts, genres, dialects, orthographies, or grammatical analyses. Rule selection and source interpretation may be contested. A trace can create false confidence, and an interface can faithfully expose an incorrect operation. Reviewer recruitment may be limited, and experts may disagree. A small study cannot establish broad impacts on trust or scholarly practice. These risks will be reported, not hidden behind a coverage percentage.

## 14. Ethical considerations
No human-participant evaluation will begin before required institutional approval and informed consent. Participation will be voluntary; data collection will be minimized, access-controlled, and retained only for a stated period. Publications will avoid identifying individuals without explicit consent. The system will not be represented as an authority for medical, legal, or other high-stakes Sanskrit interpretation. Public-domain status and license terms will be checked for all source material; uncertainty and editorial intervention will be visible.

## 15. Timeline and phased work plan
- **Months 1–2:** targeted literature and tool review; define scope, source editions, and annotation protocol.
- **Months 3–4:** prepare and adjudicate the example set; specify the trace model and tests.
- **Months 5–6:** implement the prototype and automated integrity checks.
- **Month 7:** usability pilot and refine task instructions; obtain any required ethics approval before formal study.
- **Months 8–9:** conduct the preregistered comparison if approvals and recruitment permit.
- **Months 10–11:** analyze results, document limitations, and prepare reusable materials.
- **Month 12:** write and disseminate a report; archive only materials permitted by source and participant agreements.

The schedule is a proposed plan, not evidence that work has been completed.

## 16. Conclusion
Research 1 is framed as a testable question about traceability and review for selected Sanskrit analyses, not as an established claim that no explainable Sanskrit systems exist. The proposed contribution is to make operations, sources, uncertainty, and reviewer corrections explicit and to evaluate the resulting interface against an output-only baseline. Claims about coverage, correctness, trust, or novelty will depend on source review, a systematic survey, and empirical results that have not yet been collected.

## References
1. Huet, G., Kulkarni, A., & Scharf, P. (Eds.). (2009). *Sanskrit Computational Linguistics: First and Second International Symposia*. Lecture Notes in Computer Science, 5402. Springer. https://doi.org/10.1007/978-3-642-00155-0. Bibliographic title, editors, year, and series record checked against Crossref; cited for field context.
2. Ribeiro, M. T., Singh, S., & Guestrin, C. (2016). “Why Should I Trust You?”: Explaining the Predictions of Any Classifier. *Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining*, 1135–1144. https://doi.org/10.1145/2939672.2939778. Bibliographic record checked against Crossref.
3. Doshi-Velez, F., & Kim, B. (2017). *Towards a Rigorous Science of Interpretable Machine Learning*. arXiv:1702.08608. https://arxiv.org/abs/1702.08608. Stable preprint record; not represented as peer-reviewed.
