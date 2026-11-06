THE PANINI PARSER
An educational and research-oriented web platform connecting Indian
Knowledge Systems (IKS), Sanskrit, Paninian grammar, and
computational linguistics.

Live website: https://iks-web-development.vercel.app/\
GitHub repository:
https://github.com/shaan-codes-art/IKS-WEB-DEVELOPMENT
About the Project
THE PANINI PARSER is a college IKS project designed to make Paninian
grammar and Sanskrit language concepts easier to explore through a
digital learning environment.

The platform brings together learning modules, Sanskrit analysis
concepts, word-formation exploration, assessments, a searchable sutra
and rule collection, and research resources.

Its central idea is to connect the systematic grammatical tradition
associated with Maharishi Panini with modern web development and
computational language technologies.
The Seven Main Sections
1. Home
The entry point of the platform. It introduces the college research
initiative, its problem statements, and the main areas of the website.
2. Sanskrit Analysis Lab --- Research 1 (X-NLP)
A research-oriented section focused on explainable Sanskrit language
analysis. Its described areas include:
- Explainable Sandhi Splitter: explores the separation and
  explanation of sound combinations.
- Morphological Tagger: analyses the grammatical structure and
  properties of words.
- Visual Kāraka Dependency Syntactic Parser: represents
  grammatical relationships between words in a sentence.
X-NLP refers to explainable Natural Language Processing.
3. Word Formation Explorer
A section for exploring Sanskrit word derivation through a Dynamic
Prakriya Generator. The project description identifies work across
verified verbal roots (dhātu) and nominal stems (prātipadika), and
lists 11 verified paradigms.
- Dhātu: a verbal root.
- Prātipadika: a nominal stem.
- Prakriya: the grammatical process or procedure used in
  derivation.
4. Learn Pāṇinian Grammar --- Research 2 (CALL)
A structured learning section covering:
- Śivasūtras
- Pratyāhāras
- It-markers
- Sandhi mechanics
CALL stands for Computer-Assisted Language Learning. This research
direction explores how digital learning modules can support the study of
Paninian grammar.
5. Practice and Quiz
An assessment area described as containing 8 formative challenges.
It includes interactive formative assessments, sutra-identification
challenges, and diagnostic tests to help learners practise and review
their understanding.
6. Sūtra and Rule Library
A searchable catalogue described as containing 34 verified rules
from the Aṣṭādhyāyī, with an interactive operational knowledge graph
intended to show relationships between rules and their applications.
7. About the Research
The research hub presents the college IKS project mandate, the Research
1 and Research 2 directions, their methodologies, and downloadable
proposal drafts.
Research Directions
  Research direction      Focus                   Related website section
  Research 1 --- X-NLP    Explainable             Sanskrit Analysis Lab
computational analysis
of Sanskrit             
Research 2 --- CALL     Computer-assisted       Learn Pāṇinian Grammar
learning of Paninian
grammar
The downloadable documents are research proposal drafts. They should
not be interpreted as peer-reviewed research publications.
Key Concepts
  Term                Meaning
  Sutra               A concise grammatical rule
Sandhi              Sound combination or change at a boundary
Morphology          The study of word structure
Kāraka              A grammatical relationship associated with an action
Syntactic parsing   Analysis of sentence structure
Dhātu               Verbal root
Prātipadika         Nominal stem
Prakriya            Step-by-step grammatical derivation
Śivasūtras          Sound groupings used in the Paninian grammatical system
Pratyāhāra          A compact designation for a group of sounds
It-marker           A grammatical marker in the Paninian system
NLP                 Natural Language Processing
X-NLP               Explainable Natural Language Processing
CALL                Computer-Assisted Language Learning
IKS                 Indian Knowledge Systems
Technology Stack
- Next.js 15 --- application framework and routing.
- React 19 --- component-based user interface.
- TypeScript --- typed JavaScript for maintainable code.
- Tailwind CSS 4 --- styling and responsive layouts.
- AI provider integration --- supports the AI Learning Assistant
  through a server-side API route.
- GitHub --- source-code hosting and version control.
- Vercel --- website deployment and hosting.
The exact AI provider and model depend on the environment configuration
used for the deployment.
Application Structure
.
├── public/
│   └── downloads/
├── scripts/
├── src/
│   ├── app/
│   ├── components/
│   ├── data/
│   └── lib/
├── package.json
├── package-lock.json
├── next.config.mjs
├── tsconfig.json
└── .gitignore
- src/app/ --- application pages and API routes.
- src/components/ --- reusable interface components.
- src/data/ --- structured learning and application data.
- src/lib/ --- shared utilities and supporting logic.
- public/ --- static assets such as images and logos.
- public/downloads/ --- downloadable project resources.
- scripts/ --- project utility scripts.
Running the Project Locally
Prerequisites
Install Node.js (compatible with the project's dependencies), npm, and
optionally Git.
1. Clone the repository
git clone https://github.com/shaan-codes-art/IKS-WEB-DEVELOPMENT.git
cd IKS-WEB-DEVELOPMENT
2. Install dependencies
npm install
3. Configure environment variables
Some features, such as the AI Learning Assistant, may require an API
key.

Create a local file named .env.local in the project root. If the
current backend uses OpenRouter, the variables may look like this:
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openrouter/free
Replace the placeholder with your own valid key locally. Never commit
.env.local, API keys, tokens, or other secrets to GitHub. Keep
secrets in the hosting provider's environment-variable settings for
deployed environments.

Check .env.example and the current server-side implementation for the
exact variables required by your version of the project.
4. Start the development server
npm run dev
Open http://localhost:3000 in your browser.
5. Create a production build
npm run build
To run the production build locally:
npm run start
AI Learning Assistant
The AI Learning Assistant is connected through the server-side Next.js
API route:
/api/learning-assistant
The browser sends a learning question to the backend route. The backend
uses the configured AI provider and returns a response to the interface.

API credentials must remain on the server side in environment variables.
They must never be exposed in client-side code or committed to the
repository.

AI-generated explanations can make mistakes. Important Sanskrit
grammatical claims and derivations should be checked against reliable
grammatical sources.
Deployment
The project is hosted on Vercel.

A typical deployment workflow is:
1. Push the project source code to GitHub.
2. Import or connect the repository in Vercel.
3. Configure the required environment variables in Vercel project
   settings.
4. Deploy the application.
5. Test the deployed pages and AI functionality.
Live deployment: https://iks-web-development.vercel.app/
Educational Goals
- Make Paninian grammar more accessible to learners.
- Present Sanskrit grammatical concepts in a structured digital
  format.
- Encourage learning through examples, practice, and assessments.
- Explore computational approaches to Sanskrit analysis.
- Connect traditional Indian linguistic knowledge with modern language
  technologies.
Future Scope
- Expand the collection of verified sutras, rules, and paradigms.
- Add more carefully validated Sanskrit derivation examples.
- Improve explanations and visualisation of grammatical operations.
- Expand practice questions and diagnostic assessments.
- Improve the AI assistant with reliable, source-grounded Sanskrit
  references.
- Develop additional computational analysis capabilities.
Academic Note
This is an educational college project exploring Indian Knowledge
Systems, Paninian grammar, and computational linguistics. The website
and its AI-assisted features are learning aids; they do not replace
authoritative Sanskrit grammar texts, expert instruction, or academic
verification.
Project Links
- Website: https://iks-web-development.vercel.app/
- GitHub: https://github.com/shaan-codes-art/IKS-WEB-DEVELOPMENT
THE PANINI PARSER
Connecting Sanskrit grammatical knowledge with modern computational
learning.
