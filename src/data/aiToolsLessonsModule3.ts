import { LessonContent } from './aiToolsCourseData';

export const LESSON_5: LessonContent = {
  id: 'aitools_lesson5',
  lessonNumber: 5,
  moduleId: 'aitools_module3',
  moduleTitle: 'Module 3: AI for Students and Learning (45 min)',
  title: 'Lesson 5: AI for Study Notes',
  durationMinutes: 15,
  learningObjectives: [
    'Convert dense textbook chapters and PDF readings into high-retention structured study notes.',
    'Use active revision structures: Cornell Notes, 2-column recall tables, and concept maps.',
    'Generate flashcard decks and rapid-fire revision questions for self-testing.',
    'Differentiate between passive highlighting and high-leverage AI-assisted note synthesis.'
  ],
  trainerScript: `Welcome to Module 3! Today, we look at how students can use AI to study smarter, not harder.

Let me ask you: how do most students currently study?
They read a 20-page chapter in a textbook or photocopy notes, take out a bright yellow highlighter, and color half the page yellow! Science has proven over and over that passive reading and highlighting is one of the least effective ways to remember anything for exams.

What actually creates long-term memory?
Two things: **Active Recall** (testing yourself) and **Elaborative Encoding** (structuring ideas in your own words).

This is where AI is your greatest academic partner. Instead of just reading, you feed a dense section of text into ChatGPT or Gemini and instruct it to extract:
1. **The Core Concept Hierarchy**: Headings, definitions, and underlying mechanisms.
2. **The Cornell Note Structure**: Left column contains cue questions and keywords; right column contains concise notes; bottom contains a 2-sentence summary.
3. **Q&A Flashcard Pairs**: Front of card has the prompt or scenario; back of card has the answer.

Let's say you have a 10-page chapter on Indian Contract Act, 1872 or Semiconductor Physics. Rather than re-reading all 10 pages the night before an exam, you can generate 15 high-impact flashcard pairs and test yourself in 10 minutes.

In this lesson's demonstration, I will show you how to take a raw textbook excerpt and turn it into exam-ready revision notes in under 60 seconds.`,
  demonstrationInstructions: [
    'Open Gemini or ChatGPT.',
    'Paste an excerpt from an educational topic (e.g., Photosynthesis light-dependent reactions or Indian Constitution Fundamental Rights).',
    'Demonstrate prompt: "Convert this text into Cornell Notes format. Left column: Cue Question. Right column: Concise Explanation with bullet points. Bottom: 2-sentence summary."',
    'Demonstrate prompt: "From the above notes, create 5 flashcard pairs formatted as Question and Answer for rapid active recall revision."',
    'Show how to copy the output into Microsoft Word, Notion, or an Anki flashcard deck.'
  ],
  practicalExamples: [
    {
      title: 'Commerce Student: Income Tax Act Sections',
      scenario: 'Suraj is studying Section 80C deductions for his B.Com tax paper. The textbook lists 22 different instruments with complicated sub-rules.',
      aiWorkflow: 'Suraj pastes the section text into ChatGPT: "Create a revision cheat sheet table with columns: Instrument Name, Maximum Limit, Lock-in Period, and Risk Level (Low/Med/High). End with 3 common exam trap points where students lose marks."',
      result: 'Suraj gets a clear comparison table and identifies the exact threshold limit that frequently appears in multiple-choice questions.'
    },
    {
      title: 'Engineering Student: Operating Systems Virtual Memory',
      scenario: 'Meena finds page replacement algorithms (FIFO, LRU, Optimal) confusing when reading long textbook proofs.',
      aiWorkflow: 'Meena prompts: "Explain LRU Page Replacement algorithm using a memory reference string [7, 0, 1, 2, 0, 3, 0, 4, 2, 3] with 3 frames. Show the page hit/fault table step by step with clear explanations of which frame gets evicted and why."',
      result: 'Meena gets a clean table showing each frame state after every step, clarifying how the algorithm functions in university problem solving.'
    }
  ],
  prompts: [
    {
      title: 'Cornell Notes Generator',
      category: 'Study Notes',
      promptText: 'Analyze the text below. Transform it into Cornell Notes format:\n- Cue Column: 5 essential review questions\n- Notes Column: Bullet points, bold key terms, and core formulas\n- Summary: A 2-sentence takeaway at the bottom\n\nText:\n"[Paste Textbook Excerpt]"',
      variables: ['[Paste Textbook Excerpt]'],
      intendedPurpose: 'Generate disciplined, high-retention study notes.'
    },
    {
      title: 'Digital Flashcard Deck Creator',
      category: 'Revision',
      promptText: 'Create 10 active recall flashcards from the text below. Format each as:\nCard [Number]:\n[Q] Question/Scenario\n[A] Direct concise answer (under 30 words)\n\nText: "[Paste Study Text]"',
      variables: ['[Paste Study Text]'],
      intendedPurpose: 'Prepare quick self-testing cards for phone or paper revision.'
    },
    {
      title: 'Key Terms & Jargon Glossary',
      category: 'Vocabulary',
      promptText: 'From the following text, extract a glossary of all technical terms, acronyms, and specialized vocabulary. Provide: 1) Term, 2) Simple definition (1 sentence), 3) A common real-world example.\n\n"[Paste Text]"',
      variables: ['[Paste Text]'],
      intendedPurpose: 'Rapidly learn unfamiliar subject vocabulary.'
    },
    {
      title: 'Mistake Prevention Highlighter',
      category: 'Exam Prep',
      promptText: 'Review this topic: [Topic/Chapter]. What are the top 5 most common mistakes or points of confusion that students make when answering questions on this topic in examinations? Explain how to avoid each one.',
      variables: ['[Topic/Chapter]'],
      intendedPurpose: 'Target high-risk exam errors before test day.'
    },
    {
      title: 'Visual Mind Map Outline',
      category: 'Structuring',
      promptText: 'Create a text-based hierarchical mind map outline of [Chapter/Topic]. Use indentation, emojis, and clear branch levels (Root Topic -> 3 Main Branches -> 2 Sub-branches each -> Key Keywords).',
      variables: ['[Chapter/Topic]'],
      intendedPurpose: 'Visualize connections between complex subtopics.'
    }
  ],
  studentActivity: {
    title: 'Build Your Active Recall Study Pack',
    description: 'Select one difficult chapter or lecture from your current curriculum and synthesize full active study notes.',
    steps: [
      'Select a 2 to 3-page excerpt from any textbook or lecture slide.',
      'Run the Cornell Notes Generator prompt in ChatGPT or Gemini.',
      'Generate 5 flashcard pairs using the Flashcard Deck Creator prompt.',
      'Test yourself on the 5 flashcards without looking at the notes.',
      'Refine any flashcard where you could not recall the answer within 5 seconds.'
    ],
    submissionExpected: 'Submit your generated Cornell Notes and 5 flashcards along with your self-testing score.'
  },
  keyTakeaways: [
    'Passive reading produces poor retention; active recall notes produce high exam performance.',
    'Cornell notes split pages into cues, notes, and a concluding summary for structured review.',
    'Flashcard question-and-answer pairs allow rapid self-testing on mobile devices.',
    'Use AI to generate glossary tables and mistake-avoidance lists for high-friction topics.'
  ],
  suggestedVisuals: [
    'Visual diagram of a Cornell Note sheet layout (Cue column, Notes column, Summary footer).',
    'Comparison between a highlighted textbook page (passive) vs a 2-column Q&A flashcard deck (active).',
    'Screen recording showing textbook text pasted into Gemini yielding instant structured notes.'
  ],
  downloadableNotes: `# Lesson 5 Notes: AI for Study Notes & Active Recall

### 1. Why Traditional Note-Taking Fails
- Re-writing textbooks word-for-word wastes hours and promotes passive zoning out.
- Highlighting gives an illusion of competence ("I highlighted it, so I know it") without neural encoding.

### 2. The AI-Enhanced Cornell Method
- **Cue Column (30% width)**: High-yield trigger questions. You cover the right side of the page and answer the cue questions aloud.
- **Notes Column (70% width)**: Concise facts, step-by-step logic, equations, and diagrams.
- **Summary Section (Bottom)**: 2 sentences explaining the overarching big idea.

### 3. Flashcard Engineering Rules
- **One idea per card**: Never put 3 complex definitions on a single flashcard.
- **Scenario-based triggers**: Instead of "Define X", prompt "If scenario Y occurs, which principle applies?"
- **Daily 10-Minute Spaced Repetition**: Review 15 flashcards during bus commutes or morning routines.`,
  quiz: [
    {
      id: 'l5_q1',
      question: 'Why is active recall testing far more effective than re-reading highlighted textbook pages?',
      options: [
        'Because textbooks are printed with invisible ink.',
        'Because active recall forces the brain to retrieve information from memory, strengthening neural pathways and long-term retention.',
        'Because active recall requires no thinking at all.',
        'Because highlighters damage phone screens.'
      ],
      correctIndex: 1,
      explanation: 'Cognitive science demonstrates that the mental effort of retrieving information (active recall) produces vastly stronger memory consolidation than passive re-reading.'
    },
    {
      id: 'l5_q2',
      question: 'What is the structural layout of the Cornell Notes system?',
      options: [
        'Random drawings scattered across a blank sheet.',
        'A left Cue column for review questions, a right Notes column for structured details, and a bottom section for a concise summary.',
        'Only bullet points with emojis.',
        'A single long paragraph without margins.'
      ],
      correctIndex: 1,
      explanation: 'The Cornell method partitions the page into Cues (left), Detailed Notes (right), and a Synthesis Summary (bottom).'
    },
    {
      id: 'l5_q3',
      question: 'When asking AI to generate flashcards from a dense textbook chapter, what constraint is most important for effective learning?',
      options: [
        'Make every answer at least 1,000 words long.',
        'Ensure each card tests one specific concept or fact with a clear, concise question and direct answer.',
        'Ask the AI to hide the questions.',
        'Use only Latin words.'
      ],
      correctIndex: 1,
      explanation: 'Effective flashcards adhere to the minimum information principle: one clear question testing one discrete concept.'
    },
    {
      id: 'l5_q4',
      question: 'How can AI help students prevent losing marks on examination papers?',
      options: [
        'By hacking into the university grading server.',
        'By analyzing a topic to highlight the top 5 most common student misconceptions, calculation traps, and tricky edge-cases.',
        'By writing fake medical certificates.',
        'By predicting the exact physical paper sheet number.'
      ],
      correctIndex: 1,
      explanation: 'Prompting AI for common student mistakes allows learners to preemptively practice tricky conceptual traps before the actual exam.'
    },
    {
      id: 'l5_q5',
      question: 'What is a major advantage of extracting a "Key Terms Glossary Table" using AI before reading a difficult research paper or chapter?',
      options: [
        'It eliminates the need to ever attend college.',
        'It familiarizes you with unfamiliar technical jargon beforehand so you do not stumble while reading the text.',
        'It translates the text into binary 1s and 0s.',
        'It disables your computer keyboard.'
      ],
      correctIndex: 1,
      explanation: 'Pre-learning key terminology reduces cognitive load, allowing smoother comprehension when tackling dense papers or chapters.'
    }
  ]
};

export const LESSON_6: LessonContent = {
  id: 'aitools_lesson6',
  lessonNumber: 6,
  moduleId: 'aitools_module3',
  moduleTitle: 'Module 3: AI for Students and Learning (45 min)',
  title: 'Lesson 6: AI for Research and Learning',
  durationMinutes: 15,
  learningObjectives: [
    'Conduct systematic literature and concept research using AI assistants.',
    'Use the "Explain at 5 Levels" technique (from child to PhD specialist).',
    'Cross-examine facts, verify citations, and identify fabricated references.',
    'Use search-grounded AI tools like Perplexity and Copilot for verified academic background.'
  ],
  trainerScript: `Welcome to Lesson 6! Today, we address one of the most exciting — and dangerous — uses of AI: Academic Research.

Have you ever tried to read an academic journal paper or a university research monograph, only to find that every sentence is packed with impenetrable jargon? 
For example: "The socio-economic ramifications of disparate financial liquidity manifests asymmetric informational friction in sub-tier agrarian lending conduits."
What on earth does that mean? It means: "Farmers in small villages struggle to get fair bank loans because moneylenders have more local information."

With AI, you have a 24/7 personal interpreter. One of my favorite techniques is the **5-Levels Explainer**:
- Level 1: Explain like I am 10 years old (using a playground or toy analogy).
- Level 2: Explain to a high-school student.
- Level 3: Explain to an undergraduate college student.
- Level 4: Explain to a corporate industry professional.
- Level 5: Explain with full mathematical/technical rigor to an academic specialist.

When you start at Level 1 or 2, you build the intuitive mental picture first. Once your brain grasps the intuitive core, reading the technical math or legal theory at Level 5 becomes 10 times easier!

Now, let's talk about the danger zone: **Fabricated Citations**.
Listen to this carefully: Standard ChatGPT without live search will happily generate citations like:
"Sharma, R. & Kumar, A. (2021). Journal of Indian Economics, Vol 45, pp. 112-120."
It looks completely real! But if you search Google Scholar or your college library database, **that paper does not exist!** The model combined common author names and standard journal names into a fictional publication.

If you submit fabricated citations in a college dissertation or thesis, you could face academic disciplinary action for plagiarism or fraud.

In this lesson, I will teach you the exact verification protocol to ensure every fact, statistic, and author citation in your research is 100% genuine and defensible.`,
  demonstrationInstructions: [
    'Open Perplexity AI (perplexity.ai) on one screen and standard ChatGPT on the other.',
    'Enter prompt in ChatGPT: "Give me 3 research papers on Microfinance in South India with author names, journals, and publication years."',
    'Show how some generated citations can be hallucinations.',
    'Now enter the same prompt into Perplexity AI or Microsoft Copilot.',
    'Demonstrate clicking the numbered footnote citations (e.g. [1], [2]) to reveal the live journal page, DOI link, and verified publication details.',
    'Demonstrate the 5-Levels prompt on a complex concept like "Blockchain Byzantine Fault Tolerance" or "Inflation Targeting by the RBI".'
  ],
  practicalExamples: [
    {
      title: 'Literature Review for Final Year Project',
      scenario: 'Praveen is a final-year B.Tech student in Madurai preparing his literature survey on "Solar Panel Dust Detection Using Computer Vision".',
      aiWorkflow: 'Praveen uses Perplexity AI to search: "Recent research methodologies (2022-2025) for dust detection on photovoltaic panels using edge cameras. Provide paper titles with verified IEEE or ScienceDirect DOI links."',
      result: 'Praveen receives a structured literature breakdown referencing real IEEE papers with live links, saving him two weeks of aimless library searching.'
    },
    {
      title: 'Competitive Exam Aspirant: UPSC/TNPSC Current Affairs',
      scenario: 'Kavitha is preparing for the State Civil Services exam and needs to understand the legal debate surrounding "Uniform Civil Code (UCC) and Article 44".',
      aiWorkflow: 'Kavitha asks Gemini: "Provide a balanced, neutral constitutional analysis of Article 44. Outline 3 major arguments in favor, 3 major concerns raised by minority communities, and 2 Supreme Court landmark observations (Shah Bano case, Sarla Mudgal). Keep the tone objective and academic."',
      result: 'Kavitha gets a structured, non-biased study briefing perfectly calibrated for civil service mains answers.'
    }
  ],
  prompts: [
    {
      title: 'The 5-Levels Deep Explainer',
      category: 'Research',
      promptText: 'Explain the concept of [Complex Concept] at 3 distinct levels:\n1. Beginner (Grade 8 student with everyday analogy)\n2. Undergraduate (College student with key terminology and principles)\n3. Advanced (Professional practitioner with practical edge-cases and nuances)',
      variables: ['[Complex Concept]'],
      intendedPurpose: 'Progressively build intuitive understanding from basics to advanced.'
    },
    {
      title: 'Verified Research Survey Protocol',
      category: 'Academic',
      promptText: 'Conduct an academic background survey on [Research Topic]. Provide:\n1. 3 major competing methodologies\n2. Key bottlenecks in current research\n3. 3 verified, existing research papers with their authors and journals\n*Important*: If you cannot verify that a specific paper exists, state so explicitly. Do NOT fabricate citations.',
      variables: ['[Research Topic]'],
      intendedPurpose: 'Gather genuine research background without hallucinated citations.'
    },
    {
      title: 'Academic Paper Abstract Demystifier',
      category: 'Reading',
      promptText: 'Read the following academic abstract. Deconstruct it into 4 sections:\n1. The Problem: What gap were the authors trying to solve?\n2. The Methodology: What experiment or data did they use?\n3. The Key Finding: What was the main numerical or qualitative result?\n4. Limitations: What did the authors admit their study could not prove?\n\nAbstract:\n"[Paste Abstract]"',
      variables: ['[Paste Abstract]'],
      intendedPurpose: 'Quickly evaluate whether a research paper is relevant to your thesis.'
    },
    {
      title: 'Citation Cross-Examination Prompt',
      category: 'Verification',
      promptText: 'For each of the claims made above: 1) What is the exact primary source document? 2) In what year was it published? 3) Is this consensus science or a disputed hypothesis?',
      variables: [],
      intendedPurpose: 'Audit AI claims before including them in college assignments.'
    },
    {
      title: 'Devil\'s Advocate Counter-Evidence Finder',
      category: 'Critical Thinking',
      promptText: 'Most articles argue in favor of [Popular Theory/Strategy]. Search for and summarize 3 peer-reviewed critiques or failure case studies that highlight when this theory fails in practice.',
      variables: ['[Popular Theory/Strategy]'],
      intendedPurpose: 'Prevent confirmation bias in seminar papers and dissertations.'
    }
  ],
  studentActivity: {
    title: 'Citation Audit & Multi-Level Breakdown Drill',
    description: 'Deconstruct a challenging academic topic and audit generated citations for real-world existence.',
    steps: [
      'Choose a scientific, legal, or economic concept (e.g., Quantum Entanglement, Cash Reserve Ratio, or CRISPR Gene Editing).',
      'Use the 5-Levels Deep Explainer prompt to generate intuitive explanations.',
      'Ask the AI for 2 research publications discussing this topic.',
      'Open Google Scholar (scholar.google.com) and search the author and title of both generated citations.',
      'Record whether both citations were real or hallucinated.'
    ],
    submissionExpected: 'Submit your 3-level explanation along with your Google Scholar audit verification report.'
  },
  keyTakeaways: [
    'The 5-levels technique breaks down dense academic jargon into intuitive mental models.',
    'Never trust citations generated by non-search AI models without checking Google Scholar or library portals.',
    'Use Perplexity AI or Microsoft Copilot when live verified web sources and clickable footnotes are required.',
    'Deconstructing abstracts into Problem, Method, Result, and Limitation speeds up research 5-fold.'
  ],
  suggestedVisuals: [
    'Diagram of the 5-Levels Staircase: Child -> Student -> Professional -> Expert.',
    'Visual comparison between a hallucinated citation (not found on Google Scholar) vs a verified citation (live DOI link).',
    'Annotated Perplexity AI search interface highlighting footnote citations.'
  ],
  downloadableNotes: `# Lesson 6 Notes: AI for Systematic Research & Verification

### 1. The 5-Levels Comprehension Method
When encountering dense academic or legal text:
1. **Level 1 (Intuition)**: Playground / Kitchen / Cricket analogy.
2. **Level 2 (Foundation)**: Standard terminology and fundamental rules.
3. **Level 3 (Application)**: Realistic workplace or industrial case study.
4. **Level 4 (Rigorous Depth)**: Mathematical formulas, statutory clauses, edge-case limitations.

### 2. The Verification Protocol for AI Citations
1. **Rule of Thumb**: LLMs generate plausible text tokens; they do not browse a live library unless specifically hooked to web tools.
2. **The 3-Step Verification Test**:
   - Copy the title of the paper into [Google Scholar](https://scholar.google.com).
   - Check if the author, journal, and volume match exactly.
   - Look for the DOI (Digital Object Identifier) link.
3. **Preferred Tools for Literature Surveys**: Perplexity AI, Semantic Scholar (semanticscholar.org), and Microsoft Copilot.`,
  quiz: [
    {
      id: 'l6_q1',
      question: 'What is the danger of asking a standard offline LLM to provide references for a college research paper?',
      options: [
        'The computer can catch a virus.',
        'The model can fabricate believable-sounding authors, paper titles, and journal names that do not actually exist in the real world.',
        'The model will print out physical books without permission.',
        'The university will immediately disable your smartphone.'
      ],
      correctIndex: 1,
      explanation: 'LLMs can hallucinate citations by stringing together familiar academic terms and common author names into fictitious papers.'
    },
    {
      id: 'l6_q2',
      question: 'How does the "5-Levels Explainer" technique assist student learning?',
      options: [
        'It increases the font size 5 times.',
        'It builds progressive understanding, starting with intuitive everyday analogies before moving into technical academic rigor.',
        'It translates English into 5 different languages.',
        'It gives you 5 college degrees automatically.'
      ],
      correctIndex: 1,
      explanation: 'Starting with simple analogies anchors intuitive comprehension, making subsequent technical and mathematical details much easier to absorb.'
    },
    {
      id: 'l6_q3',
      question: 'Which tool is specifically designed as an AI answer engine with live verified footnote citations to actual websites and papers?',
      options: [
        'Perplexity AI',
        'MS Paint',
        'Windows Calculator',
        'Adobe Photoshop'
      ],
      correctIndex: 0,
      explanation: 'Perplexity AI searches the live web, synthesizes facts, and links each assertion to numbered source citations.'
    },
    {
      id: 'l6_q4',
      question: 'What free online academic database should every student use to verify whether an AI-suggested research paper is authentic?',
      options: [
        'Instagram Reels',
        'Google Scholar (scholar.google.com)',
        'Netflix',
        'Amazon Shopping'
      ],
      correctIndex: 1,
      explanation: 'Google Scholar is a primary free index of global peer-reviewed papers, conference proceedings, and academic theses.'
    },
    {
      id: 'l6_q5',
      question: 'When deconstructing a research paper abstract, which four elements should you extract first?',
      options: [
        'Font color, page count, printer model, and ink cartridge type.',
        'The Problem, The Methodology, The Key Finding, and The Limitations.',
        'The author\'s birth date, shoe size, favorite food, and email password.',
        'The date the PDF was downloaded, screen brightness, battery percentage, and mouse brand.'
      ],
      correctIndex: 1,
      explanation: 'Focusing on Problem, Method, Findings, and Limitations reveals whether the study is valid and relevant to your own project in under 60 seconds.'
    }
  ]
};

export const LESSON_7: LessonContent = {
  id: 'aitools_lesson7',
  lessonNumber: 7,
  moduleId: 'aitools_module3',
  moduleTitle: 'Module 3: AI for Students and Learning (45 min)',
  title: 'Lesson 7: AI for Exam Preparation',
  durationMinutes: 15,
  learningObjectives: [
    'Build a realistic, non-burnout revision timetable tailored to exam schedules.',
    'Generate customized practice questions, scenario problems, and mock tests.',
    'Use AI as an interactive oral viva and mock interview examiner.',
    'Navigate academic integrity, institutional honor codes, and ethical boundaries.'
  ],
  trainerScript: `Welcome to Lesson 7! This is where we bring everything together to prepare you for examination excellence.

Exam stress is something every Indian student understands deeply. Whether it is university semester finals, school board exams, or competitive entrance tests like GATE, CAT, UPSC, or Banking, the pressure is immense.

Most students fall into one of two traps during exam month:
1. **Unrealistic Timetables**: They create a timetable that says: "Study 16 hours every day starting at 4:30 AM." Within two days, they are exhausted, sick, and demoralized.
2. **Passive Re-Reading**: They sit with their textbooks for hours without ever testing whether they can reproduce the answers without looking.

Here is how you turn AI into your private 24/7 Personal Exam Coach:

First, **The Realistic Timetable Architect**:
You don't just ask AI for a study plan. You feed your actual syllabus topics, difficulty levels, and daily available hours. For instance:
"I have 18 days until my Database Systems exam. Topic A (SQL Joins) is easy for me; Topic B (Transactions & ACID properties) is medium; Topic C (B+ Trees & Indexing) is very difficult. I have 3 hours available on weekdays and 6 hours on weekends."
The AI will schedule spaced repetition intervals so you review difficult topics 3 times before test day, without burning out.

Second, **Customized Mock Tests**:
You can instruct AI to generate a full 50-mark mock paper formatted in the exact pattern of your university (e.g. Part A: 5 short questions; Part B: 3 long analytical questions). Then you set a timer, solve it on paper, take a picture or type your answer, and ask the AI to grade your answer against the official marking criteria!

Third, **Academic Integrity**:
Let's be 100% transparent:
- Using AI to understand difficult concepts, create flashcards, test yourself, and timetable your revision is **smart, ethical productivity**.
- Copy-pasting AI text into an online proctored exam, an assignment submission, or a take-home test without authorization is **academic dishonesty**.

In this lesson, you will complete Practical Task 1: Building a full study notes and revision quiz pack for one subject. Let's get to work!`,
  demonstrationInstructions: [
    'Open ChatGPT or Gemini.',
    'Demonstrate the Exam Timetable prompt using a 3-subject, 14-day scenario.',
    'Demonstrate generating a 10-mark mock test with a mix of conceptual and numerical questions.',
    'Demonstrate Oral Viva simulation: "Act as an external university viva examiner. Ask me one question on Object-Oriented Programming. Wait for my response before asking question 2."',
    'Enter a student response with a deliberate mistake, and show how the AI pinpoints the error with constructive guidance.'
  ],
  practicalExamples: [
    {
      title: 'University Semester Mock Test & Grading',
      scenario: 'Arun has his Data Structures exam on Friday. He struggles with writing clean explanations of QuickSort vs MergeSort space complexity.',
      aiWorkflow: 'Arun prompts Gemini to generate a 5-mark question comparing QuickSort and MergeSort. Arun types his 100-word answer. He then prompts: "Grade my answer out of 5 marks according to standard university marking rubrics. Highlight missing technical points."',
      result: 'The AI awards him 3.5/5 and points out that he forgot to mention the worst-case O(n^2) time complexity for QuickSort when the pivot is poorly chosen.'
    },
    {
      title: 'Competitive Exam Time Management',
      scenario: 'Priyanka is preparing for a Banking PO exam with quantitative aptitude, reasoning, and English sections.',
      aiWorkflow: 'Priyanka uses Copilot to generate 5 time-pressured word problems on Speed, Distance & Time, with a strict 90-second solving recommendation per problem.',
      result: 'Priyanka practices realistic time-management under realistic exam constraints.'
    }
  ],
  prompts: [
    {
      title: 'Personalized Spaced Repetition Timetable',
      category: 'Exam Planning',
      promptText: 'Act as an expert academic productivity coach. Build an [X-Day] revision timetable for [Subject/Exam].\n- Difficult topics to repeat 3 times: [List Difficult Topics]\n- Moderate topics: [List Moderate Topics]\n- Easy topics for quick review: [List Easy Topics]\nAvailable time: [Hours per weekday] on weekdays, [Hours per weekend] on weekends.\nInclude 1 complete rest day and 2 full mock test days.',
      variables: ['[X-Day]', '[Subject/Exam]', '[List Difficult Topics]', '[List Moderate Topics]', '[List Easy Topics]', '[Hours per weekday]', '[Hours per weekend]'],
      intendedPurpose: 'Build an achievable, scientifically spaced study schedule.'
    },
    {
      title: 'University-Style Mock Test Generator',
      category: 'Testing',
      promptText: 'Generate a 25-mark mock test for [Subject] based on this syllabus: [Syllabus Topics].\nStructure:\n- Section A: 5 short answer questions (2 marks each, under 40 words)\n- Section B: 3 analytical problem-solving questions (5 marks each)\nDo NOT show the answer key yet. State: "Solve on paper and reply READY FOR SOLUTIONS when finished."',
      variables: ['[Subject]', '[Syllabus Topics]'],
      intendedPurpose: 'Realistic exam simulation without premature answer peaking.'
    },
    {
      title: 'Answer Script Evaluator & Grader',
      category: 'Evaluation',
      promptText: 'Here is an exam question: "[Question]"\nHere is my written student answer: "[My Answer]"\nEvaluate my answer like a strict university examiner:\n1. Marks awarded out of [Total Marks]\n2. Strengths of my answer\n3. Missing technical keywords or diagrams needed for full marks\n4. A model 100% answer',
      variables: ['[Question]', '[My Answer]', '[Total Marks]'],
      intendedPurpose: 'Identify exact gaps between student answers and full-mark benchmarks.'
    },
    {
      title: 'Interactive Oral Viva Examiner',
      category: 'Viva Prep',
      promptText: 'Act as a senior university professor conducting an oral viva on [Subject/Lab Project].\nAsk me ONE question at a time. Wait for my response before proceeding. If my answer is partially correct, press me for clarification. Keep questions professional and challenging.',
      variables: ['[Subject/Lab Project]'],
      intendedPurpose: 'Overcome viva fear and practice confident verbal explanations.'
    },
    {
      title: 'Formula & Equation Derivation Helper',
      category: 'Science/Math',
      promptText: 'Derive the formula for [Formula/Equation] step by step. Beside each mathematical step, provide a 1-sentence plain English explanation of the physical or mathematical principle being applied.',
      variables: ['[Formula/Equation]'],
      intendedPurpose: 'Master derivations with underlying conceptual understanding.'
    }
  ],
  studentActivity: {
    title: 'Practical Task 1: Complete Study Notes & Revision Quiz Pack',
    description: 'Select one educational subject and generate a complete study and exam pack.',
    steps: [
      'Choose one subject (e.g. Marketing, Constitutional Law, Data Structures, or Biology).',
      'Generate a 1-page structured Cornell Study Notes summary for one key chapter.',
      'Generate 5 active recall flashcard pairs.',
      'Generate a 5-question mock test with detailed answer explanations.',
      'Solve the mock test, grade yourself, and write a 3-sentence summary of your preparation readiness.'
    ],
    submissionExpected: 'Submit your compiled PDF or document containing: 1) Cornell Notes, 2) Flashcard pairs, 3) Mock test with score.'
  },
  keyTakeaways: [
    'A realistic study timetable plans for spaced repetition and rest days to avoid burnout.',
    'Solving practice questions under time pressure creates superior exam performance.',
    'Use AI as a strict examiner to grade your answers against official marking rubrics.',
    'Always uphold academic integrity: use AI for learning, never for unauthorized exam cheating.'
  ],
  suggestedVisuals: [
    'Graphic of a 14-day study calendar showing Spaced Repetition intervals.',
    'Interactive viva simulation flow chart: Question -> Student Reply -> Critique -> Next Question.',
    'Ethics checklist: Green (Studying, practice, flashcards) vs Red (Exam cheating, uncredited copying).'
  ],
  downloadableNotes: `# Lesson 7 Notes: Exam Preparation & Practical Task 1

### 1. Spaced Repetition Formula
To remember a topic for semester exams:
- **Day 1**: Initial synthesis (Cornell Notes).
- **Day 3**: First rapid recall session (10-minute flashcard drill).
- **Day 7**: Scenario application (Solving 2 exam-style questions).
- **Day 14**: Timed mock examination under realistic test constraints.

### 2. Viva Examination Confidence Formula
- **Answer Structure**: State the direct definition in sentence 1; give an everyday real-world example in sentence 2; mention a practical limitation in sentence 3.
- **Viva Simulation Prompt**: "Act as a strict external professor. Ask me 1 challenging question on [Topic] at a time."

### 3. Practical Task 1 Checklist
- [ ] Select 1 subject and 1 challenging chapter.
- [ ] Generate Cornell Notes (Cues + Detailed Notes + Summary).
- [ ] Generate 5 flashcard Q&A pairs.
- [ ] Generate a 5-question mock test and grade your answers.`,
  quiz: [
    {
      id: 'l7_q1',
      question: 'What is the primary flaw in creating an exam study timetable that demands 16 hours of continuous daily studying with zero rest days?',
      options: [
        'It saves too much money.',
        'It inevitably leads to mental fatigue, cognitive burnout, illness, and rapid abandonment of the schedule within days.',
        'It uses up too much internet data.',
        'It makes the room too cold.'
      ],
      correctIndex: 1,
      explanation: 'Unrealistic schedules ignore human cognitive limits, leading to burnout and poor retention compared to spaced 4-hour sessions.'
    },
    {
      id: 'l7_q2',
      question: 'When using AI to prepare for an oral viva or interview, what is the best prompting strategy?',
      options: [
        'Ask AI to write a 10,000-word essay and read it passively.',
        'Instruct AI to act as an examiner who asks ONE question at a time and waits for your response before giving feedback.',
        'Tell AI to pass the viva on your behalf.',
        'Shut your eyes and let AI talk continuously.'
      ],
      correctIndex: 1,
      explanation: 'Interactive one-at-a-time questioning simulates real viva pressure and forces active verbal articulation.'
    },
    {
      id: 'l7_q3',
      question: 'What constitutes ETHICAL, responsible use of AI during exam preparation?',
      options: [
        'Using AI to generate practice questions, test your recall, explain derivations, and plan revision schedules.',
        'Sneaking a smartphone running ChatGPT into an in-person closed-book examination hall.',
        'Submitting AI-generated answers directly into an unproctored online exam without doing the work.',
        'Selling fake AI leak papers to classmates.'
      ],
      correctIndex: 0,
      explanation: 'Using AI as a personal tutor, practice problem generator, and study planner is ethical; using it to cheat on evaluations violates academic integrity.'
    },
    {
      id: 'l7_q4',
      question: 'Why should you ask AI to grade your practice exam answer against a rubric rather than simply asking "Is this correct?"',
      options: [
        'Because AI models get bored of short questions.',
        'Because rubric grading pinpoints specific missing keywords, formulas, and structural flaws that cause mark deductions in university exams.',
        'Because rubric grading changes your computer font.',
        'Because rubrics are required by electricity boards.'
      ],
      correctIndex: 1,
      explanation: 'Exam rubrics reward specific terminology, definitions, and problem-solving steps; scoring against them teaches you how marks are won or lost.'
    },
    {
      id: 'l7_q5',
      question: 'What is the recommended spaced repetition interval for maximum retention before an exam?',
      options: [
        'Studying everything only 30 minutes before entering the exam hall.',
        'Reviewing a topic across expanding intervals (e.g. Day 1, Day 3, Day 7, Day 14) with active recall drills.',
        'Reading the same textbook page 100 times in one hour.',
        'Only studying on full-moon days.'
      ],
      correctIndex: 1,
      explanation: 'Spaced repetition across increasing intervals combats the Ebbinghaus forgetting curve and cements long-term memory.'
    }
  ]
};

export const module3Lessons: LessonContent[] = [LESSON_5, LESSON_6, LESSON_7];
