export interface GrammarLesson {
  id: string;
  moduleNumber: number;
  titleDev: string;
  titleEng: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  estimatedMinutes: number;
  summary: string;
  keyConcepts: string[];
  coreSutras: {
    number: string;
    text: string;
    translation: string;
  }[];
  contentSections: {
    heading: string;
    body: string;
    sanskritCallout?: string;
  }[];
  practicalTakeaway: string;
  topic?: string;
  objectives?: string[];
  prerequisites?: string[];
  practiceActivity?: string;
  commonMistake?: string;
  lessonQuizCategory?: string;
}

interface SupplementaryLessonSeed {
  id: string;
  moduleNumber: number;
  titleDev: string;
  titleEng: string;
  topic: string;
  level: GrammarLesson["level"];
  estimatedMinutes: number;
  summary: string;
  objectives: string[];
  prerequisites: string[];
  keyConcepts: string[];
  explanation: string;
  workedExample: string;
  commonMistake: string;
  practiceActivity: string;
  practicalTakeaway: string;
  lessonQuizCategory: string;
}

function createSupplementaryLesson(seed: SupplementaryLessonSeed): GrammarLesson {
  return {
    ...seed,
    coreSutras: [],
    contentSections: [
      { heading: "Concept and method", body: seed.explanation },
      { heading: "Worked example or application", body: seed.workedExample },
    ],
  };
}

const supplementaryLessonSeeds: SupplementaryLessonSeed[] = [
  {
    id: "lesson-introduction", moduleNumber: 1, titleDev: "व्याकरणपरिचयः", titleEng: "Introduction to Sanskrit Grammar", topic: "Foundations", level: "Beginner", estimatedMinutes: 12,
    summary: "Build a first map of sounds, word forms, and sentence relations, and see how grammar connects them without treating every form as an isolated vocabulary item.",
    objectives: ["Distinguish sound, word-form, and sentence-level questions.", "Identify a stem and an inflected form in a simple example."], prerequisites: ["Basic familiarity with Devanāgarī is helpful, not required."],
    keyConcepts: ["phonology", "morphology", "syntax", "inflection"], explanation: "Grammar describes patterns in language. For Sanskrit, learners can ask how sounds meet, how bases take endings, and how forms participate in a sentence. These are related levels of analysis, not interchangeable labels.",
    workedExample: "रामः पठति (rāmaḥ paṭhati, ‘Rāma reads’) can be approached as two word forms: a nominal form and a finite verb. This is an introductory identification exercise, not a complete syntactic derivation.",
    commonMistake: "Do not equate a word's ending directly with its full meaning; grammatical form and context both matter.",
    practiceActivity: "For रामः पठति, identify the two written forms and label which one is nominal and which is verbal.", practicalTakeaway: "Name the level of the question before selecting a grammatical tool.", lessonQuizCategory: "Sanskrit foundations and terminology",
  },
  {
    id: "lesson-terminology", moduleNumber: 2, titleDev: "व्याकरणपारिभाषिकी", titleEng: "Sanskrit Grammatical Terminology", topic: "Foundations", level: "Beginner", estimatedMinutes: 15,
    summary: "Learn a working vocabulary for discussing roots, bases, affixes, endings, number, gender, and case.",
    objectives: ["Match common terms to their basic functions.", "Separate categories such as number, gender, person, and case."], prerequisites: ["Introduction to grammar."],
    keyConcepts: ["dhātu", "prātipadika", "pratyaya", "vibhakti"], explanation: "Technical terms are labels for distinct grammatical objects. Dhātu refers to a verbal root, prātipadika to a nominal base, and pratyaya to an affix; sup and tiṅ name important affix series. Exact definitions belong to the relevant rule context.",
    workedExample: "In a beginner's description of भवति (bhavati), √भू (√bhū) is the root and ति (ti) is associated with a personal ending. This label-level illustration does not show every intervening derivational operation.",
    commonMistake: "Do not use dhātu, stem, and inflected word as synonyms.",
    practiceActivity: "Create a two-column glossary for dhātu, prātipadika, pratyaya, vacana, liṅga, and vibhakti.", practicalTakeaway: "Precise terminology makes a derivation easier to audit.", lessonQuizCategory: "Sanskrit foundations and terminology",
  },
  {
    id: "lesson-panini", moduleNumber: 3, titleDev: "पाणिनिः अष्टाध्यायी च", titleEng: "Pāṇini and the Aṣṭādhyāyī", topic: "Sūtra system", level: "Beginner", estimatedMinutes: 15,
    summary: "Introduce Pāṇini's rule-based grammar and the Aṣṭādhyāyī as a compact technical work that describes Sanskrit forms.",
    objectives: ["Recognize the Aṣṭādhyāyī as an eight-chapter grammatical text.", "Explain what a sūtra reference identifies."], prerequisites: ["Basic Sanskrit terms."],
    keyConcepts: ["Pāṇini", "Aṣṭādhyāyī", "sūtra", "rule application"], explanation: "The Aṣṭādhyāyī is organized into eight adhyāyas, each conventionally divided into four pādas. Its concise rules rely on technical conventions and context; reading an isolated sūtra often requires those conventions and traditional interpretation.",
    workedExample: "A reference such as 6.1.77 identifies chapter 6, pāda 1, sūtra 77. The number locates a rule; it is not by itself a complete translation or account of its application.",
    commonMistake: "Do not assume every sūtra can be interpreted accurately without context, inherited terms, and commentary.",
    practiceActivity: "Decode the chapter and pāda in the references 1.3.9 and 6.1.77.", practicalTakeaway: "Treat each rule reference as a locator within an interconnected system.", lessonQuizCategory: "Pāṇinian grammar and Aṣṭādhyāyī concepts",
  },
  {
    id: "lesson-structure", moduleNumber: 4, titleDev: "अष्टाध्याय्याः संरचना", titleEng: "Structure and Organization of the Aṣṭādhyāyī", topic: "Sūtra system", level: "Intermediate", estimatedMinutes: 18,
    summary: "Understand the text's chapter-and-pāda address system and why rule sequence, headings, and carried context are important.",
    objectives: ["Read an Aṣṭādhyāyī address.", "Explain why sequence and context matter when following rules."], prerequisites: ["Introduction to Pāṇini and the Aṣṭādhyāyī."],
    keyConcepts: ["adhyāya", "pāda", "sūtra sequence", "context"], explanation: "Aṣṭādhyāyī references conventionally use chapter, pāda, and rule numbers. The text's sequence is part of its operation, but not every later-numbered rule simply applies after every earlier one; domain, conditions, and interpretive principles determine interactions.",
    workedExample: "For 6.1.77, read 6 as adhyāya, 1 as pāda, and 77 as the sūtra position. Use a source edition or a curated library entry to inspect the wording and context.",
    commonMistake: "Do not treat numeric order as a universal execution trace independent of rule conditions.",
    practiceActivity: "Locate three sūtra references in the library and record their chapter and pāda.", practicalTakeaway: "The address helps navigation; the grammatical context explains application.", lessonQuizCategory: "Pāṇinian grammar and Aṣṭādhyāyī concepts",
  },
  {
    id: "lesson-samjna", moduleNumber: 6, titleDev: "संज्ञाप्रकरणम्", titleEng: "Technical Terms and Saṃjñā Rules", topic: "Sūtra system", level: "Intermediate", estimatedMinutes: 18,
    summary: "Explore how technical designations let rules refer compactly to grammatical categories and sound groups.",
    objectives: ["Define saṃjñā as technical designation in grammatical description.", "Explain how a designation supports later rule statements."], prerequisites: ["Śiva Sūtras and basic grammatical terms."],
    keyConcepts: ["saṃjñā", "technical category", "definition", "rule scope"], explanation: "A saṃjñā rule establishes a technical designation used by other rules. This allows later statements to operate over a defined class rather than restating a long description each time.",
    workedExample: "A pratyāhāra such as अच् (ac) is a compact sound-class label formed through the Śiva Sūtra conventions and 1.1.71. The label is meaningful only when its boundary markers are interpreted correctly.",
    commonMistake: "Do not read a technical term as ordinary prose when the text assigns it a specialized meaning.",
    practiceActivity: "Choose a technical term from the Sūtra Library and identify the rule or convention that establishes its scope.", practicalTakeaway: "Always check how a technical label is defined before applying it.", lessonQuizCategory: "Pāṇinian grammar and Aṣṭādhyāyī concepts",
  },
  {
    id: "lesson-anuvrtti", moduleNumber: 8, titleDev: "अनुवृत्तिः अधिकारश्च", titleEng: "Anuvṛtti and Adhikāra", topic: "Sūtra system", level: "Advanced", estimatedMinutes: 20,
    summary: "Study two textual mechanisms used to understand how terms and topic scope may continue across concise rule statements.",
    objectives: ["Describe anuvṛtti as contextual carryover in rule reading.", "Recognize an adhikāra as a governing topic or scope."], prerequisites: ["Aṣṭādhyāyī structure and technical terminology."],
    keyConcepts: ["anuvṛtti", "adhikāra", "scope", "ellipsis"], explanation: "Because sūtras are highly compressed, interpreters use context to determine whether a term or governing topic continues. Anuvṛtti and adhikāra are analytical tools for reading sequences; the precise carried material should be checked in a reliable commentary or edition.",
    workedExample: "When a rule's wording is elliptical, compare neighboring rules and a scholarly explanation to determine whether a condition is inherited. Do not infer a specific inherited word from proximity alone.",
    commonMistake: "Do not silently insert inherited wording without identifying the source or interpretive basis.",
    practiceActivity: "Select a short sequence in a cited edition and note which words are explicit and which an editor or commentator supplies.", practicalTakeaway: "Separate the transmitted sūtra wording from contextual interpretation.", lessonQuizCategory: "Pāṇinian grammar and Aṣṭādhyāyī concepts",
  },
  {
    id: "lesson-interaction", moduleNumber: 9, titleDev: "सूत्रपरस्परसम्बन्धः", titleEng: "Rule Ordering and Rule Interaction", topic: "Sūtra system", level: "Advanced", estimatedMinutes: 22,
    summary: "Examine how eligibility, scope, and conflict principles shape the interaction of grammatical rules.",
    objectives: ["Identify rule conditions before assessing interaction.", "State the limited role of the conflict principle 1.4.2."], prerequisites: ["Aṣṭādhyāyī structure and anuvṛtti."],
    keyConcepts: ["rule eligibility", "vipratiṣedha", "scope", "derivational stage"], explanation: "Rule interaction is not a simple list walk. A rule must be eligible in context, and interpretive principles govern specific kinds of conflict. 1.4.2 is traditionally rendered as a rule about mutually conflicting operations; it should not be generalized to all ordering questions without commentary.",
    workedExample: "Before deciding which of two rules applies, write each rule's input, environment, and output. If their operations conflict, consult the source's stated conflict principle and interpretive tradition.",
    commonMistake: "Do not say that the numerically later rule always wins in every grammatical situation.",
    practiceActivity: "Compare two candidate rules from an example and make an eligibility table: condition met, domain, and proposed operation.", practicalTakeaway: "Describe eligibility and conflict separately.", lessonQuizCategory: "Pāṇinian grammar and Aṣṭādhyāyī concepts",
  },
  {
    id: "lesson-sup-vibhakti", moduleNumber: 12, titleDev: "सुप्प्रत्ययाः विभक्तयश्च", titleEng: "Sup Endings and Vibhakti", topic: "Nominal morphology", level: "Intermediate", estimatedMinutes: 20,
    summary: "Connect the traditional sup-affix series with the inflectional forms used to express number and case-related functions.",
    objectives: ["Recognize sup as the nominal-affix series.", "Distinguish grammatical case forms from semantic roles."], prerequisites: ["Basic terminology and subanta formation."],
    keyConcepts: ["sup", "vibhakti", "number", "nominal paradigm"], explanation: "The sup series is introduced at 4.1.2 and underlies nominal inflection. Paradigms distinguish singular, dual, and plural and traditionally enumerate case categories; the form's interpretation depends on syntax and lexical context.",
    workedExample: "Compare a learner-known nominal paradigm in a named grammar or reference table. Record the base, ending, number, and case label separately instead of treating the surface ending as a standalone gloss.",
    commonMistake: "Do not equate each vibhakti label with one fixed English preposition or semantic role.",
    practiceActivity: "Take three forms from a verified paradigm and label the base, number, and case as given by its source.", practicalTakeaway: "A paradigm organizes forms; context contributes to their interpretation.", lessonQuizCategory: "Sup, tiṅ, vibhakti, and kāraka",
  },
  {
    id: "lesson-karaka", moduleNumber: 13, titleDev: "कारकप्रकरणम्", titleEng: "Kāraka Theory", topic: "Syntax and roles", level: "Intermediate", estimatedMinutes: 20,
    summary: "Introduce kāraka as a grammatical account of participant relations and distinguish it from surface case marking.",
    objectives: ["Define kāraka as a relation in grammatical analysis.", "Explain why case and kāraka are related but not identical."], prerequisites: ["Nominal inflection and vibhakti."],
    keyConcepts: ["kāraka", "karman", "kartṛ", "case marking"], explanation: "Kāraka analysis describes relations between an action and participants in the traditional grammatical framework. A vibhakti ending is a morphological form; it can signal syntactic relations, but case and semantic role should not be collapsed into a one-to-one mapping.",
    workedExample: "In रामः फलम् खादति (rāmaḥ phalam khādati, ‘Rāma eats fruit’), a beginner may identify a likely agent and object role, while checking the form and construction in a grammar. The gloss is illustrative.",
    commonMistake: "Do not assume that a single case ending always identifies the same kāraka in every context.",
    practiceActivity: "For a cited example sentence, mark its verb, nominal forms, and the roles assigned by the source's analysis.", practicalTakeaway: "Analyze participant roles and morphology as connected layers.", lessonQuizCategory: "Sup, tiṅ, vibhakti, and kāraka",
  },
  {
    id: "lesson-samasa", moduleNumber: 14, titleDev: "समासप्रकरणम्", titleEng: "Samāsa: Major Compound Types", topic: "Word formation", level: "Intermediate", estimatedMinutes: 24,
    summary: "Survey the major traditional compound classifications and practice distinguishing compound structure from an ordinary phrase.",
    objectives: ["Name common compound classes.", "Explain how semantic relation helps interpret a compound."], prerequisites: ["Nominal bases and case relations."],
    keyConcepts: ["avyayībhāva", "tatpuruṣa", "dvandva", "bahuvrīhi"], explanation: "Traditional descriptions classify compounds by internal relation and interpretation, including avyayībhāva, tatpuruṣa, dvandva, and bahuvrīhi. A label should be based on the construction and a supported example rather than word shape alone.",
    workedExample: "Use a compound whose classification is supplied by a named grammar or lexicon. Write its members and paraphrase the relation; do not infer a type solely from a literal English translation.",
    commonMistake: "Do not label every multi-part Sanskrit word a tatpuruṣa compound.",
    practiceActivity: "Choose two sourced compounds, note their components, and compare the source's classification and paraphrase.", practicalTakeaway: "Compound classification depends on structure and interpretation together.", lessonQuizCategory: "Samāsa",
  },
  {
    id: "lesson-ting", moduleNumber: 16, titleDev: "तिङन्तं लकाराश्च", titleEng: "Tiṅ Endings and Lakāras", topic: "Verbal morphology", level: "Intermediate", estimatedMinutes: 22,
    summary: "Relate the tiṅ ending series to person and number, and introduce lakāra as a grammatical category in finite-verb formation.",
    objectives: ["Recognize tiṅ endings in the verbal system.", "Separate person/number from lakāra and voice."], prerequisites: ["Dhātu and verb classes."],
    keyConcepts: ["tiṅ", "lakāra", "person", "number"], explanation: "Aṣṭādhyāyī 3.4.78 introduces the personal endings conventionally called tiṅ. Lakāras are grammatical markers associated with finite verb categories; the surface form reflects the interaction of stem formation, voice, person, number, and other rules.",
    workedExample: "In a sourced present-tense paradigm, align each form with its root, lakāra, person, number, and ending. Avoid extracting a complete analysis from a final syllable without the paradigm context.",
    commonMistake: "Do not equate lakāra directly with English tense in every usage.",
    practiceActivity: "Annotate three forms from one cited verb paradigm for person and number, then identify their lakāra using the reference.",
    practicalTakeaway: "A finite form combines several grammatical dimensions.", lessonQuizCategory: "Dhātu, lakāra, and verb formation",
  },
  {
    id: "lesson-krt", moduleNumber: 17, titleDev: "कृत्प्रत्ययाः", titleEng: "Kṛt Pratyayas", topic: "Word formation", level: "Intermediate", estimatedMinutes: 20,
    summary: "Explore affixes used in derivation from verbal roots and the nominal or adjectival forms such derivations may produce.",
    objectives: ["Recognize kṛt as a family of root-related affixes.", "Describe a sourced derivation without overgeneralizing its meaning."], prerequisites: ["Dhātu, pratyaya, and basic prakriyā."],
    keyConcepts: ["kṛt affix", "root", "derivative", "stem"], explanation: "Kṛt affixes are introduced in the Aṣṭādhyāyī's derivational system and form nominal derivatives from verbal roots in defined environments. The result and its meaning depend on the selected affix, rule context, and lexicalization.",
    workedExample: "Follow a kṛdanta derivation only where an edition or scholarly grammar supplies the root, affix, and operations. Keep each attested step distinct from a simplified teaching representation.",
    commonMistake: "Do not assume a suffix has one invariant English meaning across every root and environment.",
    practiceActivity: "Use a referenced derivation and mark the root, kṛt affix, intermediate stages, and final form.", practicalTakeaway: "Affix choice and rule context shape the derivative.", lessonQuizCategory: "Pratyaya and word formation",
  },
  {
    id: "lesson-taddhita", moduleNumber: 18, titleDev: "तद्धितप्रत्ययाः", titleEng: "Taddhita Pratyayas", topic: "Word formation", level: "Advanced", estimatedMinutes: 22,
    summary: "Introduce secondary nominal derivation and the semantic conditions that govern taddhita affixes.",
    objectives: ["Distinguish taddhita derivation from root-based kṛt derivation.", "Identify the base and relation in a sourced example."], prerequisites: ["Prātipadika, pratyaya, and kṛt basics."],
    keyConcepts: ["secondary derivation", "base", "taddhita", "semantic condition"], explanation: "Taddhita affixes form secondary derivatives from nominal bases under specified semantic and grammatical conditions. The resulting relation may be relational, possessive, or otherwise category-specific; exact interpretation requires the rule context and a reference.",
    workedExample: "Choose an example from a cited grammar that explicitly identifies the base and affix. Record the source's stated relation rather than inventing an affix analysis for an arbitrary word.",
    commonMistake: "Do not treat every derivative related to a noun as taddhita without evidence.",
    practiceActivity: "For a sourced example, identify the base, affix, rule environment, and gloss; cite the passage used.", practicalTakeaway: "Secondary derivation is condition-sensitive.", lessonQuizCategory: "Pratyaya and word formation",
  },
  {
    id: "lesson-stri", moduleNumber: 19, titleDev: "स्त्रीप्रत्ययाः", titleEng: "Strī-Pratyayas and Gender Formation", topic: "Word formation", level: "Advanced", estimatedMinutes: 18,
    summary: "Review selected feminine-forming affixes and why gender formation depends on lexical class and rule conditions.",
    objectives: ["Recognize strī-pratyaya as feminine-affix terminology.", "Avoid deriving gender from a single universal ending rule."], prerequisites: ["Nominal stems and pratyaya."],
    keyConcepts: ["strī-pratyaya", "gender", "stem class", "affix"], explanation: "The Aṣṭādhyāyī describes feminine forms with affixes in specified environments. Gender and surface form are lexically and grammatically conditioned, so a concise pattern should not be applied indiscriminately.",
    workedExample: "Compare masculine and feminine forms in a sourced paradigm or grammar. Record the base and the cited formation rule; do not infer an unattested formation from analogy alone.",
    commonMistake: "Do not assume every feminine noun is formed by adding the same suffix.",
    practiceActivity: "Find a verified masculine/feminine pair and note the source's analysis of its stem and affix.", practicalTakeaway: "Use a documented paradigm when explaining gender-related formation.", lessonQuizCategory: "Pratyaya and word formation",
  },
  {
    id: "lesson-prakriya", moduleNumber: 20, titleDev: "प्रक्रियाप्रदर्शनम्", titleEng: "Practical Prakriyā: Step-by-Step Derivation", topic: "Derivation", level: "Advanced", estimatedMinutes: 25,
    summary: "Practice presenting a derivation as a sequence of sourced operations, with inputs, conditions, changes, and provenance.",
    objectives: ["Represent a derivation as explicit stages.", "Separate attested rule steps from editorial simplification."], prerequisites: ["Sūtra references, affixes, sandhi, and morphology."],
    keyConcepts: ["prakriyā", "input state", "rule step", "provenance"], explanation: "A prakriyā is a procedural account of how a form is derived. A clear account records the starting material, eligible operation, rule reference, intermediate state, and final result; different traditions or editions may present details differently.",
    workedExample: "Use one derivation from the site's curated Word Formation Explorer. Label it curated and compare the displayed stages against its cited source before treating them as a complete derivation.",
    commonMistake: "Do not present a simplified sequence as an independently verified, exhaustive derivation.",
    practiceActivity: "Write a four-column trace for one curated example: stage, form, operation, and cited authority or verification note.", practicalTakeaway: "A derivation is strongest when every step is inspectable.", lessonQuizCategory: "Pāṇinian grammar and Aṣṭādhyāyī concepts",
  },
  {
    id: "lesson-computational", moduleNumber: 22, titleDev: "संगणकव्याकरणपरिचयः", titleEng: "Introduction to Computational Sanskrit Grammar", topic: "Computational linguistics", level: "Advanced", estimatedMinutes: 20,
    summary: "Connect formal grammatical descriptions to data structures and computational procedures while distinguishing prototypes from complete analyzers.",
    objectives: ["Identify representations useful for computational grammar.", "Describe limits of curated rule-based demonstrations."], prerequisites: ["Basic grammar and stepwise derivations."],
    keyConcepts: ["finite data", "rules", "morphology", "evaluation"], explanation: "A computational grammar encodes linguistic information in representations and procedures. A small curated rule set can demonstrate selected phenomena, but it is not equivalent to a broad-coverage parser unless coverage, ambiguity handling, and evaluation are documented.",
    workedExample: "A lookup table can map a known form to a curated explanation. This demonstrates data-driven retrieval; it does not establish that unseen forms can be analyzed.",
    commonMistake: "Do not describe matching curated examples as general automated grammatical analysis.",
    practiceActivity: "For a tool on this site, list accepted input, represented phenomena, output, and explicit exclusions.", practicalTakeaway: "State computational scope alongside any demonstrated result.", lessonQuizCategory: "Computational linguistics, NLP, and explainability",
  },
  {
    id: "lesson-nlp", moduleNumber: 23, titleDev: "भाषासंसाधनस्य मूलतत्त्वानि", titleEng: "Tokenization, Morphology, Tagging, and Parsing", topic: "Computational linguistics", level: "Advanced", estimatedMinutes: 22,
    summary: "Distinguish common NLP tasks and the kinds of output each task provides for Sanskrit text.",
    objectives: ["Differentiate tokenization, morphological analysis, tagging, and parsing.", "Name one limitation for each task."], prerequisites: ["Introduction to computational grammar."],
    keyConcepts: ["tokenization", "morphological analysis", "tagging", "parsing"], explanation: "Tokenization segments text; morphological analysis proposes grammatical structure for forms; tagging assigns labels; parsing models relations across a sequence. Sanskrit sandhi, rich inflection, compounds, and ambiguity make these task boundaries important.",
    workedExample: "For a sentence, a token display might show segments only. A morphological tagger would add labels, while a parser would propose relations. Do not infer the latter outputs from segmentation alone.",
    commonMistake: "Do not use 'tokenization', 'morphology', and 'parsing' as interchangeable names for any text processing.",
    practiceActivity: "Classify three hypothetical tool outputs by task and state what evidence would be needed to evaluate each.", practicalTakeaway: "Name the task that a system actually performs.", lessonQuizCategory: "Computational linguistics, NLP, and explainability",
  },
  {
    id: "lesson-explainable", moduleNumber: 24, titleDev: "व्याख्येयसंस्कृत NLP", titleEng: "Sanskrit NLP and Explainable AI", topic: "Computational linguistics", level: "Advanced", estimatedMinutes: 22,
    summary: "Consider how provenance, rule traces, and uncertainty can make computational linguistic outputs easier to inspect.",
    objectives: ["Define an explanation trace in an NLP tool.", "Explain why a trace does not guarantee correctness."], prerequisites: ["NLP task distinctions and rule-based analysis."],
    keyConcepts: ["explainability", "provenance", "uncertainty", "evaluation"], explanation: "An explainable system can expose features, rule references, or intermediate decisions. Such visibility aids inspection but does not prove the analysis is correct; explanations and outputs need independent linguistic evaluation and clear coverage statements.",
    workedExample: "The Analysis Lab displays curated transformations with references. That makes selected demonstrations inspectable, but does not establish performance on arbitrary input.",
    commonMistake: "Do not confuse a plausible explanation with a validated analysis.",
    practiceActivity: "Audit one displayed analysis: identify the claim, evidence, source note, and any limitation the interface discloses.", practicalTakeaway: "Explainability improves auditability only when evidence and limitations are visible.", lessonQuizCategory: "Computational linguistics, NLP, and explainability",
  },
  {
    id: "lesson-call", moduleNumber: 25, titleDev: "संगणकसहाय्यितभाषाशिक्षणम्", titleEng: "Computer-Assisted Language Learning and Practice", topic: "Learning design", level: "Intermediate", estimatedMinutes: 20,
    summary: "Review ways digital practice can provide structured activities and feedback while avoiding unsupported claims about learning effectiveness.",
    objectives: ["Identify feedback and practice features in a learning tool.", "Distinguish design intent from measured learning outcomes."], prerequisites: ["Basic familiarity with the learning centre."],
    keyConcepts: ["formative feedback", "practice", "progress records", "evaluation"], explanation: "Computer-assisted language learning can organize exercises, feedback, and review opportunities. A feature's presence does not demonstrate learning gains; claims about effectiveness require a suitable study with participants, measures, and reported results.",
    workedExample: "A quiz can reveal a selected answer and explanation and record local practice history. This supports review but does not certify mastery or synchronize progress across devices.",
    commonMistake: "Do not present the site's learning tools as experimentally proven or as a substitute for instruction.",
    practiceActivity: "Complete a short quiz, inspect its feedback, then write one next step for reviewing a missed concept.", practicalTakeaway: "Use digital tools as practice aids and evaluate outcomes separately.", lessonQuizCategory: "Sanskrit learning methods and application",
  },
];

const SUPPLEMENTARY_GRAMMAR_LESSONS = supplementaryLessonSeeds.map(createSupplementaryLesson);

const allGrammarLessons: GrammarLesson[] = [
  {
    id: "lesson-1",
    moduleNumber: 5,
    titleDev: "माहेश्वरसूत्राणि प्रत्याहाराश्च",
    titleEng: "The 14 Śiva Sūtras & Pratyāhāra Compression",
    level: "Beginner",
    estimatedMinutes: 15,
    summary: "Explore the sound sequences conventionally called the 14 Śiva Sūtras and learn how pratyāhāras concisely designate sound classes.",
    keyConcepts: [
      "Māheśvara Sūtras (Aphorisms of Shiva)",
      "It-markers (Anubandhas)",
      "Pratyāhāra formation rule (1.1.71)",
      "Vowel vs. Consonant groupings (ac vs. hal)",
    ],
    coreSutras: [
      {
        number: "1.1.71",
        text: "आदिरन्त्येन सहेता",
        translation: "An initial sound taken together with a final marker represents itself and all intervening sounds.",
      },
    ],
    contentSections: [
      {
        heading: "1. The 14 Rhythmic Aphorisms",
        body: "A traditional verse associates the Śiva Sūtras with a dance of Śiva. The learning activity uses the conventional fourteen sound sequences and their marker convention; the traditional origin narrative is not presented here as independently established history.",
        sanskritCallout: "नृत्तावसाने नटराजराजो ननाद ढक्कां नवपञ्चवारम् । उद्धर्तुकामः सनकादिसिद्धानेतद्विमर्शे शिवसूत्रजालम् ॥",
      },
      {
        heading: "2. The Pratyāhāra Algorithm (1.1.71)",
        body: "To refer to all vowels, Pāṇini does not enumerate each one; he takes the first vowel 'a' from Sūtra 1 (अइउण्) and pairs it with the final it-marker 'c' from Sūtra 4 (ऐऔच्), producing the abbreviation 'अच्' (ac). In an instant, this 2-letter token denotes {a, i, u, ṛ, ḷ, e, o, ai, au}.",
      },
      {
        heading: "3. Computational Significance",
        body: "Pratyāhāras are compact technical labels for sound classes. Comparisons to symbolic abbreviations in modern computing can be useful as an analogy, but they do not establish direct historical equivalence or a modern computational implementation.",
      },
    ],
    topic: "Sūtra system",
    objectives: ["Read the sound sequence and it-markers in the Śiva Sūtras.", "Form a pratyāhāra using the convention in 1.1.71."],
    prerequisites: ["Basic Devanāgarī sound recognition."],
    practiceActivity: "Use the Śiva Sūtra chart to form ac and compare its members with the displayed sound inventory.",
    commonMistake: "Do not include the final it-marker as a sound in the represented set.",
    lessonQuizCategory: "Pāṇinian grammar and Aṣṭādhyāyī concepts",
    practicalTakeaway: "Once you master the 14 Śivasūtras, complex rules like 'इको यणचि' dissolve into simple set substitutions: Set(ik) → Set(yaṇ) before Set(ac).",
  },
  {
    id: "lesson-2",
    moduleNumber: 7,
    titleDev: "इत्संज्ञा लोपप्रकरणं च",
    titleEng: "The It-Marker (Anubandha) & Elision System",
    level: "Beginner",
    estimatedMinutes: 20,
    summary: "Understand how auxiliary metadata markers instruct morphological transformations and are systematically erased before surface pronunciation.",
    keyConcepts: [
      "Upadeśa (Original Enunciation)",
      "It-saṁjñā rules (1.3.2 to 1.3.8)",
      "Lopa as zero-replacement (1.3.9 & 1.1.60)",
      "Garbage collection in ancient grammar",
    ],
    coreSutras: [
      {
        number: "1.3.2",
        text: "उपदेशेऽजनुनासिक इत्",
        translation: "A nasalized vowel in upadeśa is an it-marker.",
      },
      {
        number: "1.3.3",
        text: "हलन्त्यम्",
        translation: "A final consonant in upadeśa is an it-marker.",
      },
      {
        number: "1.3.9",
        text: "तस्य लोपः",
        translation: "That element which is designated as an 'it' undergoes elision (lopa).",
      },
    ],
    contentSections: [
      {
        heading: "1. Auxiliary Metadata Markers",
        body: "In Pāṇini's metalanguage, roots and affixes carry tags called 'it' or 'anubandhas'. For instance, the 3rd person singular verbal suffix is written as 'tip' (तिप्). The 'p' marker indicates that this affix causes accentual and morphophonological traits, but it must never appear in the spoken word.",
      },
      {
        heading: "2. The Lopa Principle (Zero Morpheme)",
        body: "By 1.3.9 'तस्य लोपः', the marker 'p' is deleted, leaving 'ti'. Sūtra 1.1.60 'अदर्शनं लोपः' defines lopa strictly as 'non-perception' (invisibility), meaning the deleted element continues to exert operational memory on the remaining stem.",
      },
    ],
    topic: "Sūtra system",
    objectives: ["Recognize the role of anubandhas in technical representations.", "Explain the stated lopa convention without treating markers as ordinary sounds."],
    prerequisites: ["Basic terminology and the Śiva Sūtras."],
    practiceActivity: "Trace one marker in a sourced affix representation and record its designation and lopa rule.",
    commonMistake: "The software-compiler analogy is only an analogy; it is not a historical claim about modern computing.",
    lessonQuizCategory: "Pāṇinian grammar and Aṣṭādhyāyī concepts",
    practicalTakeaway: "In a limited computational analogy, it-markers carry grammatical information in technical representations and are treated by the stated lopa rules; the analogy should not be read as historical equivalence to software compilers.",
  },
  {
    id: "lesson-3",
    moduleNumber: 10,
    titleDev: "सन्धिकार्याणि पदसंधिश्च",
    titleEng: "Sandhi: Euphonic Phonological Junctions",
    level: "Intermediate",
    estimatedMinutes: 25,
    summary: "Explore how speech sounds modify each other at word and morpheme boundaries according to articulatory phonetic optimization.",
    keyConcepts: [
      "Saṁhitā (Euphonic close proximity)",
      "Yan-sandhi (Semi-vocalic substitution)",
      "Guṇa & Vṛddhi vowel gradations",
      "Schtva & Jashtva consonant assimilations",
    ],
    coreSutras: [
      {
        number: "6.1.77",
        text: "इको यणचि",
        translation: "An 'ik' vowel becomes a 'yaṇ' semivowel before an 'ac' vowel in close junction.",
      },
      {
        number: "6.1.87",
        text: "आद् गुणः",
        translation: "When 'a' is followed by a simple vowel, both are replaced by a single Guṇa vowel.",
      },
    ],
    contentSections: [
      {
        heading: "1. The Axiom of Effort Minimization",
        body: "Sandhi is not an arbitrary set of spelling rules; it represents articulatory optimization when two sounds meet in continuous speech (saṁhitā). For instance, transitioning from high front vowel /i/ to back vowel /ā/ naturally creates the palatal glide /y/.",
      },
      {
        heading: "2. Rule Ordering & Ekādeśa",
        body: "In rules like 'आद् गुणः', two sounds are replaced by a single replacement (ekādeśa), preserving musical mora length while smoothing vocalic hiatus.",
      },
    ],
    topic: "Phonology",
    objectives: ["Identify a sound environment in a cited sandhi example.", "Distinguish an observed form from a complete rule derivation."],
    prerequisites: ["Śiva Sūtras, pratyāhāras, and basic sound classes."],
    practiceActivity: "Compare a curated sandhi example with its stated input, output, and rule reference.",
    commonMistake: "Do not assume every surface sequence has only one possible segmentation.",
    lessonQuizCategory: "Sandhi",
    practicalTakeaway: "By identifying the pratyāhāras involved, any Sanskrit compound or sentence split can be systematically parsed back to its pristine stems.",
  },
  {
    id: "lesson-4",
    moduleNumber: 11,
    titleDev: "सुबन्तप्रक्रिया विभक्तयश्च",
    titleEng: "Subanta Morphology: The Nominal Paradigm",
    level: "Intermediate",
    estimatedMinutes: 30,
    summary: "Learn how the 21 nominal case affixes (sup) attach to nominal bases (prātipadika) to express 7 syntactic cases across singular, dual, and plural numbers.",
    keyConcepts: [
      "Prātipadika entitlement (1.2.45)",
      "The 21 Sup affixes (4.1.2)",
      "Rutva and Visarga transformations (8.2.66, 8.3.15)",
      "Stem lengthening (7.3.102 supi ca)",
    ],
    coreSutras: [
      {
        number: "4.1.2",
        text: "स्वौजसमौट्छष्टाभ्यां...",
        translation: "The 21 nominal case endings attach to prātipadikas.",
      },
      {
        number: "8.3.15",
        text: "खरवसानयोर्विसर्जनीयः",
        translation: "A terminal 'r' converts to visarga (ḥ) before a pause or unvoiced consonant.",
      },
    ],
    contentSections: [
      {
        heading: "1. The 7 Cases & 3 Numbers",
        body: "Sanskrit nominal inflection is governed by 7 vibhaktis (Nominative, Accusative, Instrumental, Dative, Ablative, Genitive, Locative) across 3 vacanas (Singular, Dual, Plural). Each cell in this 7x3 matrix corresponds to a specific sup affix defined in Sūtra 4.1.2.",
      },
      {
        heading: "2. How rāma + su becomes rāmaḥ",
        body: "Step 1: rāma + suँ. Step 2: marker 'uँ' elided → rāma + s. Step 3: s turns into ruँ (8.2.66). Step 4: marker elision → rāma + r. Step 5: final 'r' turns into Visarga (8.3.15) → rāmaḥ.",
      },
    ],
    topic: "Nominal morphology",
    objectives: ["Identify a nominal base and inflectional ending in a referenced paradigm.", "Relate number and case labels to nominal forms."],
    prerequisites: ["Grammatical terminology and sound alternations."],
    practiceActivity: "Use the site's cited paradigm example and label the base, ending, number, and case.",
    commonMistake: "Do not generalize one noun's ending pattern to all stem classes.",
    lessonQuizCategory: "Sup, tiṅ, vibhakti, and kāraka",
    practicalTakeaway: "Every Sanskrit noun is built from an uninflected base transformed through auditable phonological rules into an active syntactic word (pada).",
  },
  {
    id: "lesson-5",
    moduleNumber: 15,
    titleDev: "तिङन्तप्रक्रिया दशगणाश्च",
    titleEng: "Tiṅanta Morphology: Verbal Conjugation & The 10 Gaṇas",
    level: "Intermediate",
    estimatedMinutes: 30,
    summary: "Master finite verbal formation from ~2,000 verbal roots categorized into 10 conjugational classes (daśa gaṇāḥ) with class-specific vikaraṇa markers.",
    keyConcepts: [
      "Dhātupāṭha inventory & Gaṇa classification",
      "Abstract tense affixes (10 Lakāras: Laṭ, Liṭ, Luṭ...)",
      "Conjugational markers (Vikaraṇa: śap, u, ślu...)",
      "Ablaut vowel gradation (Guṇa & Vṛddhi in verbal stems)",
    ],
    coreSutras: [
      {
        number: "3.2.123",
        text: "वर्तमाने लट्",
        translation: "The abstract tense affix 'laṭ' denotes the present time.",
      },
      {
        number: "3.4.78",
        text: "तिप्तस्झिसिप्थस्थमिब्वस्मस्तातां...",
        translation: "The 18 personal endings replace lakāras based on voice, person, and number.",
      },
      {
        number: "3.1.68",
        text: "कर्तरि शप्",
        translation: "Inserts the thematic vikaraṇa 'śap' in active voice for Class 1, 4, 6, 10.",
      },
      {
        number: "7.3.84",
        text: "सार्वधातुकार्धधातुकयोः",
        translation: "A root vowel undergoes guṇa strengthening before sārvadhātuka or ārdhadhātuka affixes.",
      },
    ],
    contentSections: [
      {
        heading: "1. The 10 Conjugation Classes (Gaṇas)",
        body: "Every Sanskrit verb belongs to one of 10 gaṇas: 1. Bhvādi (√bhū), 2. Adādi (√ad), 3. Juhotyādi (√hu, √dā), 4. Divādi (√div), 5. Svādi (√su), 6. Tudādi (√tud), 7. Rudhādi (√rudh), 8. Tanādi (√tan, √kṛ), 9. Kryādi (√krī), 10. Curādi (√cur). Each gaṇa introduces its own unique vikaraṇa affix between root and ending.",
      },
      {
        heading: "2. The Three-Tier Conjugation Architecture",
        body: "Verbal derivation proceeds across three tiers: [Root] + [Conjugational Vikaraṇa] + [Personal Ending]. Example: √bhū + śap (a) + tip (ti) → bho + a + ti (7.3.84 Guṇa) → bhavati (6.1.78 eco'yavāyāvaḥ).",
      },
    ],
    topic: "Verbal morphology",
    objectives: ["Distinguish a dhātu from its derived verbal stem.", "Recognize that class information is relevant to stem formation."],
    prerequisites: ["Core verbal terminology and affixes."],
    practiceActivity: "Trace a referenced root through the source's stated class and stem-forming affix.",
    commonMistake: "Do not infer a full conjugation from a root class alone; endings and other rules also apply.",
    lessonQuizCategory: "Dhātu, lakāra, and verb formation",
    practicalTakeaway: "A root's gaṇa helps identify relevant stem-forming patterns; a full paradigm also depends on endings and further grammatical conditions.",
  },
  {
    id: "lesson-6",
    moduleNumber: 21,
    titleDev: "परिभाषाप्रकरणं विप्रतिषेधश्च",
    titleEng: "Paribhāṣā Metarules & Conflict Resolution",
    level: "Advanced",
    estimatedMinutes: 25,
    summary: "Discover Pāṇini's meta-algorithmic operating system: how metarules resolve rule conflicts, order operations, and guarantee deterministic derivations.",
    keyConcepts: [
      "Vidhi (Operational) vs. Paribhāṣā (Metarule)",
      "1.4.2 Vipratiṣedhe paraṁ kāryam (Conflict resolution)",
      "Traditional hierarchy: Nitya, Antaraṅga, Apavāda",
      "Deterministic computation in ancient linguistic law",
    ],
    coreSutras: [
      {
        number: "1.4.2",
        text: "विप्रतिषेधे परं कार्यम्",
        translation: "In the event of a mutual conflict between two rules of equal force, the subsequent rule in the order of the Aṣṭādhyāyī prevails.",
      },
      {
        number: "1.1.50",
        text: "स्थानेऽन्तरतमः",
        translation: "In substituting one sound for another, the closest in place and manner of articulation shall be chosen.",
      },
      {
        number: "1.1.52",
        text: "अलोऽन्त्यस्य",
        translation: "A substitute specified by genitive replaces only the final sound.",
      },
    ],
    contentSections: [
      {
        heading: "1. The Need for Metarules",
        body: "With nearly 4,000 algorithmic rules, situations inevitably arise where two rules are eligible to apply simultaneously to the same input string. Pāṇini created Paribhāṣā sūtras to serve as the runtime interpreter and conflict arbiter.",
      },
      {
        heading: "2. Sūtra 1.4.2 & The Hierarchy of Force",
        body: "Sūtra 1.4.2 'विप्रतिषेधे परं कार्यम्' is the formal tie-breaker in the first 7 chapters (Sapādasaptādhyāyī). Traditional commentators further formalized the principle: 'असिद्धं बहिरङ्गमन्तरङ्गे' (Internal operations precede external operations) and 'विप्रतिषेधे परं कार्यम्'.",
      },
    ],
    topic: "Sūtra system",
    objectives: ["Describe why grammatical rules may interact.", "State the scope of the cited conflict principle cautiously."],
    prerequisites: ["Aṣṭādhyāyī structure, anuvṛtti, and rule eligibility."],
    practiceActivity: "Build a rule-eligibility table for a sourced example and distinguish evidence from editorial interpretation.",
    commonMistake: "Do not claim formal computational properties such as Turing completeness without a cited proof and precise model.",
    lessonQuizCategory: "Pāṇinian grammar and Aṣṭādhyāyī concepts",
    practicalTakeaway: "Metarules help readers reason about interaction, but their scope must be established from reliable scholarship.",
  },
  ...SUPPLEMENTARY_GRAMMAR_LESSONS,
];

export const GRAMMAR_LESSONS = allGrammarLessons.sort((a, b) => a.moduleNumber - b.moduleNumber);
