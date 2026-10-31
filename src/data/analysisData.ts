export interface SandhiAnalysisItem {
  id: string;
  combined: string;
  combinedIast: string;
  split: string;
  splitIast: string;
  sandhiType: "Svara Sandhi (Vocalic)" | "Vyañjana Sandhi (Consonantal)" | "Visarga Sandhi";
  governingSutra: string;
  sutraNumber: string;
  explanation: string;
  phoneticProcess: string;
  searchKeywords: string[];
}

export interface MorphAnalysisItem {
  id: string;
  word: string;
  wordIast: string;
  pos: "Subanta (Noun)" | "Tiṅanta (Verb)" | "Avyaya (Indeclinable)";
  baseStem: string;
  baseIast: string;
  affix: string;
  affixIast: string;
  vibhaktiOrLakara: string;
  vacana: string;
  purushaOrLinga: string;
  governingSutras: string[];
  semanticGloss: string;
  searchKeywords: string[];
}

export interface KarakaDependencySentence {
  id: string;
  sentenceDev: string;
  sentenceIast: string;
  translation: string;
  searchKeywords: string[];
  words: {
    token: string;
    tokenIast: string;
    lemma: string;
    caseNumber: string;
    karakaRole: "Kartā (Agent)" | "Karma (Object)" | "Karaṇa (Instrument)" | "Sampradāna (Recipient)" | "Apādāna (Source)" | "Adhikaraṇa (Locus)" | "Kriyā (Action)";
    karakaSutra: string;
    dependencyHead: string; // token it links to
    relation: string;
  }[];
}

export const VERIFIED_SANDHI_ANALYSIS: SandhiAnalysisItem[] = [
  {
    id: "sandhi-1",
    combined: "इत्याह",
    combinedIast: "ityāha",
    split: "इति + आह",
    splitIast: "iti + āha",
    sandhiType: "Svara Sandhi (Vocalic)",
    governingSutra: "इको यणचि",
    sutraNumber: "6.1.77",
    explanation: "High front vowel /i/ (ik) before dissimilar vowel /ā/ (ac) undergoes substitution to semivowel /y/ (yaṇ).",
    phoneticProcess: "it[i] + [ā]ha → it[y] + āha → ityāha",
    searchKeywords: ["इत्याह", "ityaha", "ityāha", "iti", "इति", "आह", "aha", "āha", "yan", "यण्"],
  },
  {
    id: "sandhi-2",
    combined: "देवेन्द्रः",
    combinedIast: "devendraḥ",
    split: "देव + इन्द्रः",
    splitIast: "deva + indraḥ",
    sandhiType: "Svara Sandhi (Vocalic)",
    governingSutra: "आद् गुणः",
    sutraNumber: "6.1.87",
    explanation: "Stem-final short /a/ before /i/ coalesces into a single Guṇa substitute /e/.",
    phoneticProcess: "dev[a] + [i]ndraḥ → dev[e]ndraḥ",
    searchKeywords: ["देवेन्द्रः", "देवेन्द्र", "devendra", "devendrah", "deva", "देव", "indra", "इन्द्र", "guna", "गुण"],
  },
  {
    id: "sandhi-3",
    combined: "तच्छिवः",
    combinedIast: "tacchivaḥ",
    split: "तत् + शिवः",
    splitIast: "tat + śivaḥ",
    sandhiType: "Vyañjana Sandhi (Consonantal)",
    governingSutra: "स्तोः श्चुना श्चुः | शश्छोऽटि",
    sutraNumber: "8.4.40 & 8.4.63",
    explanation: "Dental /t/ palatalizes to /c/ before palatal /ś/ (Schtva), and subsequent /ś/ transforms into aspirated /ch/ (Chhattva).",
    phoneticProcess: "ta[t] + [ś]ivaḥ → ta[c] + [ś]ivaḥ → ta[cch]ivaḥ",
    searchKeywords: ["तच्छिवः", "तच्छिव", "tacchiva", "tacchivah", "tat", "तत्", "siva", "शिव", "schva"],
  },
  {
    id: "sandhi-4",
    combined: "रामो गच्छति",
    combinedIast: "rāmo gacchati",
    split: "रामः + गच्छति",
    splitIast: "rāmaḥ + gacchati",
    sandhiType: "Visarga Sandhi",
    governingSutra: "अतो रोरप्लुतादप्लुते | हशि च",
    sutraNumber: "6.1.114",
    explanation: "Visarga preceded by short /a/ and followed by a voiced consonant (haś) turns into /u/, which combines with preceding /a/ into Guṇa /o/.",
    phoneticProcess: "rām[aḥ] + [g]acchati → rām[a + u] + gacchati → rām[o] gacchati",
    searchKeywords: ["रामो गच्छति", "ramo gacchati", "ramo", "रामो", "रामः", "ramah", "visarga"],
  },
  {
    id: "sandhi-5",
    combined: "वागीशः",
    combinedIast: "vāgīśaḥ",
    split: "वाक् + ईशः",
    splitIast: "vāk + īśaḥ",
    sandhiType: "Vyañjana Sandhi (Consonantal)",
    governingSutra: "झलां जशोऽन्ते",
    sutraNumber: "8.2.39",
    explanation: "Word-final unvoiced stop /k/ (jhal) before a vowel turns into its corresponding voiced stop /g/ (jaś).",
    phoneticProcess: "vā[k] + [ī]śaḥ → vā[g] + īśaḥ → vāgīśaḥ",
    searchKeywords: ["वागीशः", "वागीश", "vagisa", "vagisah", "vāgīśaḥ", "vak", "वाक्", "isa", "ईश", "jashtva"],
  },
  {
    id: "sandhi-6",
    combined: "पावकः",
    combinedIast: "pāvakaḥ",
    split: "पौ + अकः",
    splitIast: "pau + akaḥ",
    sandhiType: "Svara Sandhi (Vocalic)",
    governingSutra: "एचोऽयवायावः",
    sutraNumber: "6.1.78",
    explanation: "Diphthong /au/ (ec) before any vowel /a/ converts into /āv/ (āy-av-āy-āv replacement).",
    phoneticProcess: "p[au] + [a]kaḥ → p[āv] + akaḥ → pāvakaḥ",
    searchKeywords: ["पावकः", "पावक", "pavaka", "pāvakaḥ", "pau", "पौ", "aka", "अकः", "ayadi"],
  },
];

export const VERIFIED_MORPH_ANALYSIS: MorphAnalysisItem[] = [
  {
    id: "m1",
    word: "रामः",
    wordIast: "rāmaḥ",
    pos: "Subanta (Noun)",
    baseStem: "राम",
    baseIast: "rāma",
    affix: "सुँ",
    affixIast: "suँ",
    vibhaktiOrLakara: "Prathamā (Nominative, 1st Case)",
    vacana: "Ekavacana (Singular)",
    purushaOrLinga: "Pul-liṅga (Masculine)",
    governingSutras: [
      "1.2.45 (अर्थवदधातुरप्रत्ययः प्रातिपदिकम्)",
      "4.1.2 (स्वौजसमौट्...)",
      "1.3.2 & 1.3.9 (उपदेशेऽजनुनासिक इत् | तस्य लोपः)",
      "8.2.66 (ससजुषो रुः)",
      "8.3.15 (खरवसानयोर्विसर्जनीयः)",
    ],
    semanticGloss: "Rama (as grammatical subject/agent)",
    searchKeywords: ["रामः", "राम", "rama", "ramah", "nom", "nominative", "singular"],
  },
  {
    id: "m2",
    word: "भवति",
    wordIast: "bhavati",
    pos: "Tiṅanta (Verb)",
    baseStem: "√भू",
    baseIast: "√bhū",
    affix: "तिप् (ति)",
    affixIast: "tip (ti)",
    vibhaktiOrLakara: "Laṭ (Present Indicative)",
    vacana: "Ekavacana (Singular)",
    purushaOrLinga: "Prathama Puruṣa (3rd Person)",
    governingSutras: [
      "3.2.123 (वर्तमाने लट्)",
      "3.4.78 (तिप्तस्झि...)",
      "1.3.3 & 1.3.9 (हलन्त्यम् | तस्य लोपः)",
      "3.1.68 (कर्तरि शप्)",
      "7.3.84 (सार्वधातुकार्धधातुकयोः)",
      "6.1.78 (एचोऽयवायावः)",
    ],
    semanticGloss: "He/she/it becomes or is",
    searchKeywords: ["भवति", "bhavati", "bhu", "भू", "present", "lat", "verb"],
  },
  {
    id: "m3",
    word: "रामाभ्याम्",
    wordIast: "rāmābhyām",
    pos: "Subanta (Noun)",
    baseStem: "राम",
    baseIast: "rāma",
    affix: "भ्याम्",
    affixIast: "bhyām",
    vibhaktiOrLakara: "Tṛtīyā / Caturthī / Pañcamī (3rd/4th/5th Case)",
    vacana: "Dvivacana (Dual)",
    purushaOrLinga: "Pul-liṅga (Masculine)",
    governingSutras: [
      "1.2.45 (अर्थवदधातुरप्रत्ययः प्रातिपदिकम्)",
      "4.1.2 (स्वौजसमौट्...)",
      "7.3.102 (सुपि च)",
      "1.4.14 (सुप्तिङन्तं पदम्)",
    ],
    semanticGloss: "By/for/from two Ramas (Dual)",
    searchKeywords: ["रामाभ्याम्", "ramabhyam", "rāmābhyām", "dual", "bhyam"],
  },
  {
    id: "m4",
    word: "गच्छति",
    wordIast: "gacchati",
    pos: "Tiṅanta (Verb)",
    baseStem: "√गम्",
    baseIast: "√gam",
    affix: "तिप् (ति)",
    affixIast: "tip (ti)",
    vibhaktiOrLakara: "Laṭ (Present Indicative)",
    vacana: "Ekavacana (Singular)",
    purushaOrLinga: "Prathama Puruṣa (3rd Person)",
    governingSutras: [
      "3.2.123 (वर्तमाने लट्)",
      "3.4.78 (तिप्तस्झि...)",
      "3.1.68 (कर्तरि शप्)",
      "7.3.77 (इषुगमियमां छः)",
      "6.1.73 (छे च)",
      "8.4.40 (स्तोः श्चुना श्चुः)",
    ],
    semanticGloss: "He/she/it goes",
    searchKeywords: ["गच्छति", "gacchati", "gam", "गम्", "go", "goes"],
  },
  {
    id: "m5",
    word: "करोति",
    wordIast: "karoti",
    pos: "Tiṅanta (Verb)",
    baseStem: "√कृ",
    baseIast: "√kṛ",
    affix: "तिप् (ति)",
    affixIast: "tip (ti)",
    vibhaktiOrLakara: "Laṭ (Present Indicative)",
    vacana: "Ekavacana (Singular)",
    purushaOrLinga: "Prathama Puruṣa (3rd Person)",
    governingSutras: [
      "3.2.123 (वर्तमाने लट्)",
      "3.4.78 (तिप्तस्झि...)",
      "3.1.79 (तनादिकृञ्भ्य उः)",
      "7.3.84 & 1.1.51 (सार्वधातुक... | उरण् रपरः)",
    ],
    semanticGloss: "He/she/it does or makes",
    searchKeywords: ["करोति", "karoti", "kr", "कृ", "do", "does", "make"],
  },
  {
    id: "m6",
    word: "फलानि",
    wordIast: "phalāni",
    pos: "Subanta (Noun)",
    baseStem: "फल",
    baseIast: "phala",
    affix: "जस् / शस् → शि",
    affixIast: "jas / śas → śi",
    vibhaktiOrLakara: "Prathamā / Dvitīyā (1st/2nd Case)",
    vacana: "Bahuvacana (Plural)",
    purushaOrLinga: "Napuṁsaka-liṅga (Neuter)",
    governingSutras: [
      "1.2.45 (अर्थवदधातुरप्रत्ययः...)",
      "4.1.2 (स्वौजसमौट्...)",
      "7.1.20 (जश्शसोः शिः)",
      "7.1.72 (नपुंसकस्य झलचः)",
      "6.4.8 (सर्वनामस्थाने चासम्बुद्धौ)",
    ],
    semanticGloss: "Fruits (Neuter Plural)",
    searchKeywords: ["फलानि", "phalani", "phalāni", "phala", "फल", "fruit", "fruits"],
  },
];

export const VERIFIED_KARAKA_SENTENCES: KarakaDependencySentence[] = [
  {
    id: "sent-1",
    sentenceDev: "रामः बाणेन रावणं हन्ति।",
    sentenceIast: "rāmaḥ bāṇena rāvaṇaṁ hanti.",
    translation: "Rama kills Ravana with an arrow.",
    searchKeywords: ["रामः बाणेन रावणं हन्ति", "ramah banena ravanam hanti", "rama", "ravana", "arrow", "kills"],
    words: [
      {
        token: "रामः",
        tokenIast: "rāmaḥ",
        lemma: "राम",
        caseNumber: "Nominative Singular",
        karakaRole: "Kartā (Agent)",
        karakaSutra: "1.4.54 (स्वतंत्रः कर्ता) & 2.3.46 (प्रातिपदिकार्थ...)",
        dependencyHead: "हन्ति (hanti)",
        relation: "kartā → kriyā",
      },
      {
        token: "बाणेन",
        tokenIast: "bāṇena",
        lemma: "बाण",
        caseNumber: "Instrumental Singular",
        karakaRole: "Karaṇa (Instrument)",
        karakaSutra: "1.4.42 (साधकतमं करणम्) & 2.3.18 (कर्तृकरणयोस्तृतीया)",
        dependencyHead: "हन्ति (hanti)",
        relation: "karaṇa → kriyā",
      },
      {
        token: "रावणम्",
        tokenIast: "rāvaṇam",
        lemma: "रावण",
        caseNumber: "Accusative Singular",
        karakaRole: "Karma (Object)",
        karakaSutra: "1.4.49 (कर्तुरीप्सिततमं कर्म) & 2.3.2 (कर्मणि द्वितीया)",
        dependencyHead: "हन्ति (hanti)",
        relation: "karma → kriyā",
      },
      {
        token: "हन्ति",
        tokenIast: "hanti",
        lemma: "√हन्",
        caseNumber: "Present 3rd Sg",
        karakaRole: "Kriyā (Action)",
        karakaSutra: "3.2.123 (वर्तमाने लट्)",
        dependencyHead: "[ROOT]",
        relation: "root verb",
      },
    ],
  },
  {
    id: "sent-2",
    sentenceDev: "छात्रः विद्यालये पुस्तकानि पठति।",
    sentenceIast: "chātraḥ vidyālaye pustakāni paṭhati.",
    translation: "The student reads books in the school.",
    searchKeywords: ["छात्रः विद्यालये पुस्तकानि पठति", "chatrah vidyalaye pustakani pathati", "student", "school", "books", "reads"],
    words: [
      {
        token: "छात्रः",
        tokenIast: "chātraḥ",
        lemma: "छात्र",
        caseNumber: "Nominative Singular",
        karakaRole: "Kartā (Agent)",
        karakaSutra: "1.4.54 (स्वतंत्रः कर्ता)",
        dependencyHead: "पठति (paṭhati)",
        relation: "kartā → kriyā",
      },
      {
        token: "विद्यालये",
        tokenIast: "vidyālaye",
        lemma: "विद्यालय",
        caseNumber: "Locative Singular",
        karakaRole: "Adhikaraṇa (Locus)",
        karakaSutra: "1.4.45 (आधारोऽधिकरणम्) & 2.3.36 (सप्तम्यधिकरणे च)",
        dependencyHead: "पठति (paṭhati)",
        relation: "adhikaraṇa → kriyā",
      },
      {
        token: "पुस्तकानि",
        tokenIast: "pustakāni",
        lemma: "पुस्तक",
        caseNumber: "Accusative Plural",
        karakaRole: "Karma (Object)",
        karakaSutra: "1.4.49 (कर्तुरीप्सिततमं कर्म)",
        dependencyHead: "पठति (paṭhati)",
        relation: "karma → kriyā",
      },
      {
        token: "पठति",
        tokenIast: "paṭhati",
        lemma: "√पठ्",
        caseNumber: "Present 3rd Sg",
        karakaRole: "Kriyā (Action)",
        karakaSutra: "3.2.123 (वर्तमाने लट्)",
        dependencyHead: "[ROOT]",
        relation: "root verb",
      },
    ],
  },
  {
    id: "sent-3",
    sentenceDev: "गुरुः शिष्याय ज्ञानं ददाति।",
    sentenceIast: "guruḥ śiṣyāya jñānaṁ dadāti.",
    translation: "The teacher gives knowledge to the disciple.",
    searchKeywords: ["गुरुः शिष्याय ज्ञानं ददाति", "guruh sisyaya jnanam dadati", "guru", "teacher", "disciple", "knowledge", "gives"],
    words: [
      {
        token: "गुरुः",
        tokenIast: "guruḥ",
        lemma: "गुरु",
        caseNumber: "Nominative Singular",
        karakaRole: "Kartā (Agent)",
        karakaSutra: "1.4.54 (स्वतंत्रः कर्ता)",
        dependencyHead: "ददाति (dadāti)",
        relation: "kartā → kriyā",
      },
      {
        token: "शिष्याय",
        tokenIast: "śiṣyāya",
        lemma: "शिष्य",
        caseNumber: "Dative Singular",
        karakaRole: "Sampradāna (Recipient)",
        karakaSutra: "1.4.32 (कर्मणा यमभिप्रेति स सम्प्रदानम्) & 2.3.13 (चतुर्थी सम्प्रदाने)",
        dependencyHead: "ददाति (dadāti)",
        relation: "sampradāna → kriyā",
      },
      {
        token: "ज्ञानम्",
        tokenIast: "jñānam",
        lemma: "ज्ञान",
        caseNumber: "Accusative Singular",
        karakaRole: "Karma (Object)",
        karakaSutra: "1.4.49 (कर्तुरीप्सिततमं कर्म)",
        dependencyHead: "ददाति (dadāti)",
        relation: "karma → kriyā",
      },
      {
        token: "ददाति",
        tokenIast: "dadāti",
        lemma: "√दा",
        caseNumber: "Present 3rd Sg",
        karakaRole: "Kriyā (Action)",
        karakaSutra: "3.2.123 (वर्तमाने लट्)",
        dependencyHead: "[ROOT]",
        relation: "root verb",
      },
    ],
  },
];
