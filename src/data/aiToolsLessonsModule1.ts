import { LessonContent } from './aiToolsCourseData';

export const LESSON_1: LessonContent = {
  id: 'aitools_lesson1',
  lessonNumber: 1,
  moduleId: 'aitools_module1',
  moduleTitle: 'Module 1: Introduction to AI (30 min)',
  title: 'Lesson 1: What Is Artificial Intelligence?',
  durationMinutes: 15,
  learningObjectives: [
    'Define Artificial Intelligence in clear, non-technical everyday terms.',
    'Distinguish between traditional software (rule-based) and modern AI (pattern-learning).',
    'Understand Generative AI, Large Language Models (LLMs), and conversational assistants.',
    'Recognize both the superpowers and the realistic limitations of current AI.'
  ],
  trainerScript: `Hello everyone, and a warm welcome to "AI Tools for Students & Professionals" by VeeGo Technologies!

If you are a student preparing for college exams, a fresh graduate looking for your first job, or a busy working professional in an office, you have probably heard everyone talking about ChatGPT, Gemini, and AI replacing jobs. 

Let's clear the air right from minute one: Artificial Intelligence is not magic, and it is not a science-fiction robot coming to take over your desk tomorrow. Think of AI as an extremely well-read, ultra-fast junior assistant who has memorized millions of books, articles, and websites. If you give this assistant clear instructions, it will save you 10 to 15 hours every single week. If you give it vague instructions, it will give you generic or incorrect answers.

What is the core difference between traditional software and AI?
Think of your phone calculator or an Excel formula like SUM(A1:A10). Traditional software follows rigid rules created by a human programmer: "If button A is pressed, do action B." It cannot think, it cannot summarize a messy paragraph, and it cannot write a polite email for you.

AI, on the other hand, learns patterns from massive datasets. When you show an AI thousands of well-written job application emails, it learns the patterns of professional communication: greeting, expressing interest, summarizing qualifications, and a respectful closing call-to-action.

Now, what is Generative AI?
Traditional AI classified things: "Is this transaction on PhonePe or Google Pay fraudulent? Yes or No." "Does this photograph contain a two-wheeler? Yes or No."
Generative AI creates new content: text, code, tables, images, slides, and voice. When you ask ChatGPT or Google Gemini to write a summary of the Indus Valley Civilization for a 10th-grade history exam, it generates brand-new sentences word by word based on probability and context.

Here are the key limitations you must know before using AI:
1. AI does not have real-time consciousness or genuine emotions.
2. AI can hallucinate: it can confidently make up false facts, wrong author names, or fake citations.
3. AI knows words and statistical patterns, but you provide the common sense, judgment, and ethical verification.

By the end of this course, you will not just be asking AI random questions — you will be operating AI like a skilled pilot. Let's dive in!`,
  demonstrationInstructions: [
    'Open your web browser (Chrome, Edge, or Brave).',
    'Open Google Maps on one tab to demonstrate everyday predictive AI (traffic rerouting).',
    'Open ChatGPT (chatgpt.com) or Google Gemini (gemini.google.com).',
    'Type a simple query: "Explain why traffic jams happen in major cities like Bengaluru or Chennai in 3 bullet points."',
    'Observe how the model streams back structured, readable text within 3 seconds without having a pre-written static page.',
    'Highlight the input bar (prompt box), the output area, and the regenerate/copy buttons.'
  ],
  practicalExamples: [
    {
      title: 'College Student Exam Revision',
      scenario: 'Pooja is a 2nd-year B.Com student in Coimbatore with 80 pages of textbook notes on Accounting Principles. She has an internal test tomorrow morning and needs the top 5 golden rules with real shopkeeper examples.',
      aiWorkflow: 'Pooja pastes the textbook definition of Real, Personal, and Nominal accounts into Gemini and requests: "Explain each rule as if explaining to a provision store owner in Tamil Nadu with simple debits and credits."',
      result: 'Instead of memorizing dry jargon, Pooja gets concrete grocery store inventory examples that stick in her memory and help her ace the viva.'
    },
    {
      title: 'Small Business Vendor Communication',
      scenario: 'Karthik runs a logistics transport service in Tiruppur. A client payment of ₹45,000 has been overdue for 18 days. Karthik does not want to sound rude, but needs firm commitment by Friday.',
      aiWorkflow: 'Karthik prompts Copilot: "Draft a firm, polite, respectful payment reminder email from a logistics vendor to a longstanding corporate client requesting RTGS/NEFT settlement by Friday."',
      result: 'Copilot produces a polished 120-word email with invoice reference and polite tone, saving Karthik 30 minutes of stressful drafting.'
    }
  ],
  prompts: [
    {
      title: 'Role-Based Concept Explainer',
      category: 'Learning',
      promptText: 'Act as a patient college professor. Explain [Concept] to a complete beginner using a real-world everyday Indian scenario. Keep it under 150 words and end with a 1-sentence summary.',
      variables: ['[Concept]'],
      intendedPurpose: 'Demystify complex technical, legal, or financial concepts quickly.'
    },
    {
      title: 'Traditional Software vs AI Comparison',
      category: 'Education',
      promptText: 'Create a clean 2-column comparison table between traditional software and AI-powered systems for the use-case of [Industry/Task]. Include Columns: Feature, Traditional Approach, AI-Assisted Approach.',
      variables: ['[Industry/Task]'],
      intendedPurpose: 'Identify where AI creates genuine leverage in workflows.'
    },
    {
      title: 'Everyday Analogy Generator',
      category: 'Study',
      promptText: 'I am struggling to understand [Difficult Topic]. Give me 3 different analogies: 1 from cricket or sports, 1 from kitchen cooking, and 1 from smartphone technology.',
      variables: ['[Difficult Topic]'],
      intendedPurpose: 'Build intuitive mental models for abstract topics.'
    },
    {
      title: 'AI Capability Reality Check',
      category: 'Productivity',
      promptText: 'I want to use AI to help me with [Specific Goal]. List 3 things AI can do exceptionally well for this goal, and 3 things AI cannot do where human judgment is strictly required.',
      variables: ['[Specific Goal]'],
      intendedPurpose: 'Avoid over-reliance and identify human verification checkpoints.'
    },
    {
      title: 'Jargon Simplifier',
      category: 'Reading',
      promptText: 'Rewrite the following text in plain simple English that an 8th-grade student can easily understand without losing the core factual meaning:\n\n"[Paste Text]"',
      variables: ['[Paste Text]'],
      intendedPurpose: 'Break down dense bureaucratic, textbook, or legal language.'
    }
  ],
  studentActivity: {
    title: 'Your First AI Interaction & Reality Check',
    description: 'Open a free AI tool (ChatGPT, Gemini, or Copilot) and test how it explains an unfamiliar concept.',
    steps: [
      'Choose one subject or topic you recently found confusing (e.g., Inflation, Cloud Computing, Photosynthesis, or GST).',
      'Use the Role-Based Concept Explainer prompt from this lesson.',
      'Read the response and write down whether the everyday analogy made sense to you.',
      'Ask one follow-up question asking AI to test you with one multiple-choice question on that topic.'
    ],
    submissionExpected: 'A 2-paragraph reflection noting the topic chosen, the prompt used, and whether the analogy helped your understanding.'
  },
  keyTakeaways: [
    'AI is a pattern-learning assistant, not human consciousness.',
    'Traditional software executes fixed rules; Generative AI synthesizes new responses from learned patterns.',
    'AI can generate text, summarize documents, write drafts, and analyze ideas in seconds.',
    'Always verify output: AI can state incorrect facts with complete confidence (hallucinations).'
  ],
  suggestedVisuals: [
    'Split-screen comparison: Calculator executing 25 * 40 = 1000 (rigid rule) vs ChatGPT writing a warm birthday greeting (creative synthesis).',
    'Infographic diagram showing Data Inputs -> Pattern Recognition -> Generative Output.',
    'Live screen recording of typing a prompt into Gemini and watching the response stream.'
  ],
  downloadableNotes: `# Lesson 1 Notes: What Is Artificial Intelligence?

### 1. Simple Definition
Artificial Intelligence (AI) refers to computer systems engineered to perform tasks that traditionally require human intelligence — such as recognizing patterns, understanding natural language, summarizing information, and creating drafts.

### 2. Traditional Software vs. Generative AI
| Dimension | Traditional Software | Generative AI |
| :--- | :--- | :--- |
| **How it works** | Pre-written conditional rules (IF/THEN) | Statistical pattern recognition trained on vast datasets |
| **Output type** | Predictable, exact, and identical every time | Contextual, creative, and dynamic |
| **Example** | Phone calculator, railway booking form, Excel SUM formula | ChatGPT, Google Gemini, Microsoft Copilot |
| **Best suited for** | Arithmetic, bookkeeping, transactional records | Writing drafts, summarizing long reports, brainstorming |

### 3. Core Strengths of Modern AI
- **Speed**: Drafts emails, outlines, and summaries in 3-5 seconds.
- **Versatility**: Handles languages, coding, business communication, and academic subjects.
- **Patience**: You can ask it to re-explain a concept 20 times without judgment.

### 4. Non-Negotiable Limitations
- **Hallucinations**: Generative AI predicts the next most probable word; it does not have a live fact-checker unless paired with search.
- **No Real World Experience**: It cannot replace human empathy, ethics, or site-level ground truth.
- **Garbage In, Garbage Out**: Weak prompts produce vague answers; clear prompts produce actionable results.`,
  quiz: [
    {
      id: 'l1_q1',
      question: 'What is the fundamental difference between traditional software and Artificial Intelligence?',
      options: [
        'Traditional software uses internet; AI runs without electricity.',
        'Traditional software follows explicit pre-coded rules; AI learns patterns from data to generate contextual responses.',
        'Traditional software is only for mobile phones; AI only works on supercomputers.',
        'There is no difference; they are identical technologies.'
      ],
      correctIndex: 1,
      explanation: 'Traditional software follows deterministic pre-programmed rules (e.g., calculators, spreadsheets), whereas AI learns statistical patterns from training datasets to synthesize new answers.'
    },
    {
      id: 'l1_q2',
      question: 'What does "Generative AI" specifically refer to?',
      options: [
        'AI that generates solar or electrical power for laptops.',
        'AI models designed to generate new content such as text, code, images, and audio from user prompts.',
        'Old computer algorithms from the 1970s.',
        'Robotics hardware used exclusively in automobile factories.'
      ],
      correctIndex: 1,
      explanation: 'Generative AI refers to models that produce original text, code, graphics, or multimedia based on input prompts.'
    },
    {
      id: 'l1_q3',
      question: 'In AI terminology, what is a "hallucination"?',
      options: [
        'When the computer screen flickers due to low battery.',
        'When the AI system takes a nap during server maintenance.',
        'When an AI model generates factually incorrect information, fake citations, or false claims with high confidence.',
        'When a user forgets their password.'
      ],
      correctIndex: 2,
      explanation: 'An AI hallucination occurs when an LLM produces plausible-sounding but factually wrong, fabricated information.'
    },
    {
      id: 'l1_q4',
      question: 'Which of the following tasks is AI best suited for?',
      options: [
        'Guaranteeing 100% legal truth in a court affidavit without human lawyer review.',
        'Making final medical diagnoses without a licensed physician.',
        'Rapidly summarizing a 15-page textbook chapter into key bullet points and revision flashcards.',
        'Replacing physical sports coaches on the field.'
      ],
      correctIndex: 2,
      explanation: 'AI excels at summarizing documents, synthesizing outlines, and generating study notes, while high-stakes medical/legal decisions require human licensed professionals.'
    },
    {
      id: 'l1_q5',
      question: 'Why should a student or professional never blindly copy-paste AI responses without reading them?',
      options: [
        'Because AI output is encrypted with secret code words.',
        'Because AI responses can contain inaccuracies, hallucinations, or robotic phrasing that fail academic and workplace standards.',
        'Because internet browsers automatically report copy-pasting to police.',
        'Because AI tools immediately delete your account after 3 copies.'
      ],
      correctIndex: 1,
      explanation: 'Reviewing and editing AI output ensures accuracy, authentic personal voice, and responsible compliance with academic and workplace guidelines.'
    }
  ]
};

export const LESSON_2: LessonContent = {
  id: 'aitools_lesson2',
  lessonNumber: 2,
  moduleId: 'aitools_module1',
  moduleTitle: 'Module 1: Introduction to AI (30 min)',
  title: 'Lesson 2: Introduction to Popular AI Tools',
  durationMinutes: 15,
  learningObjectives: [
    'Compare the major general-purpose AI platforms: ChatGPT, Google Gemini, and Microsoft Copilot.',
    'Understand specialized AI tools for research (Perplexity), presentations (Canva), and visual design.',
    'Navigate free-tier account setup, privacy settings, and feature limits.',
    'Recognize that AI interfaces, model names, and pricing tiers evolve rapidly.'
  ],
  trainerScript: `Welcome back to Lesson 2! Now that we know what AI is, let's explore your practical toolkit.

When beginners start using AI, they often feel overwhelmed by the sheer number of tools launched every week. The secret is simple: you only need 2 or 3 solid tools in your daily browser bookmarks to handle 95% of your student and professional tasks.

Let's look at the "Big Three" general-purpose AI assistants:

1. **ChatGPT by OpenAI (chatgpt.com)**:
The pioneer that started the modern Generative AI wave. The free plan uses powerful models (like GPT-4o mini) that handle brainstorming, coding, language translation, creative writing, and step-by-step problem-solving. It has a clean chat interface, memory features, and excellent mobile apps for Android and iOS.

2. **Google Gemini (gemini.google.com)**:
Google's native conversational AI. Its greatest strength for Indian users is its tight integration with the Google ecosystem — Google Docs, Gmail, Google Drive, YouTube, and real-time Google Search. If you want to summarize a YouTube lecture video or draft an email directly inside your Google Workspace, Gemini is unmatched.

3. **Microsoft Copilot (copilot.microsoft.com)**:
Built into Microsoft Edge and Windows 11. It connects directly with Bing web search and OpenAI's GPT models. If you need live footnotes, web citations, and direct integration into Word, Excel, and PowerPoint, Copilot is your primary workhorse.

Beyond chat assistants, there are specialized tools:
- **Perplexity AI (perplexity.ai)**: An AI-powered answer engine. Unlike standard search engines that give you ten blue links with spam ads, Perplexity reads the top web sources and writes a comprehensive answer with numbered citations so you can verify each fact.
- **Canva AI Magic Studio (canva.com)**: Excellent for converting rough slide notes into visually compelling presentations, posters, and resumes.
- **Grammarly AI**: Cleans up typos, passive voice, and tone in your browser.

A critical note on free plans and limits:
AI companies frequently update their model names, message limits, and subscription prices. For example, a free plan might allow 10 advanced model queries per day during peak hours, and then smoothly fall back to a standard model. Never worry about paid subscriptions when starting out — everything we teach in this course can be accomplished on 100% free plans!

In our demonstration, I will show you how to set up an account and navigate the interface in under two minutes.`,
  demonstrationInstructions: [
    'Navigate to chatgpt.com and show the "Sign up" button using a standard Google or email account.',
    'Navigate to gemini.google.com and show one-click login with an existing Google account.',
    'Navigate to copilot.microsoft.com and showcase the search-grounded toggle.',
    'Demonstrate the core interface areas: Chat input bar, History sidebar on the left, New Chat button, and Account Settings.',
    'Show how to turn off chat history or data sharing in Settings if you work with sensitive workplace notes.'
  ],
  practicalExamples: [
    {
      title: 'Real-time Fact Checking with Citations',
      scenario: 'Anjali is writing an economics seminar paper on "Digital Payments Adoption via UPI in Rural India (2022-2025)". Standard ChatGPT without web access might only have older training data.',
      aiWorkflow: 'Anjali opens Perplexity AI or Microsoft Copilot and types: "What was the total volume of UPI transactions recorded by NPCI in India during the last financial year? Provide citations to official reports."',
      result: 'The tool provides the exact transaction volume with clickable citations to the Reserve Bank of India (RBI) and NPCI bulletins.'
    },
    {
      title: 'Summarizing a 45-Minute YouTube Lecture',
      scenario: 'Vikram missed his college guest lecture on "Supply Chain Bottlenecks in Manufacturing" which was uploaded to YouTube.',
      aiWorkflow: 'Vikram pastes the YouTube link into Google Gemini and prompts: "Summarize the key points and practical takeaways from this YouTube video into 5 structured bullet points."',
      result: 'Gemini reads the transcript and generates a concise 200-word summary in 8 seconds.'
    }
  ],
  prompts: [
    {
      title: 'Tool Recommendation Advisor',
      category: 'Productivity',
      promptText: 'I need to accomplish [Task]. I currently have access to ChatGPT Free, Google Gemini, and Microsoft Copilot. Which tool is best suited for this task and why? Give a 2-sentence recommendation.',
      variables: ['[Task]'],
      intendedPurpose: 'Select the optimal AI assistant for specific research or drafting needs.'
    },
    {
      title: 'Perplexity Research Query Formatter',
      category: 'Research',
      promptText: 'Find current, verified data regarding [Topic] in India. Include: 1) Most recent statistics, 2) Official source names (e.g., RBI, NITI Aayog, Government Ministry), and 3) A balanced summary of current challenges.',
      variables: ['[Topic]'],
      intendedPurpose: 'Fetch sourced academic and industry data.'
    },
    {
      title: 'YouTube Lecture Note-Taker (Gemini)',
      category: 'Study',
      promptText: 'Analyze this video URL: [Video Link]. Provide: 1) Executive summary in 3 sentences, 2) Timeline of core topics covered, 3) 5 major action points for students.',
      variables: ['[Video Link]'],
      intendedPurpose: 'Fast study summaries of educational videos.'
    },
    {
      title: 'Web Sourced Comparison Table',
      category: 'Analysis',
      promptText: 'Compare [Option A] and [Option B] based on verified user reviews and official documentation. Create a comparison table with: Cost/Free Tier, Strengths, Limitations, and Ideal User Profile.',
      variables: ['[Option A]', '[Option B]'],
      intendedPurpose: 'Objective software, college, or product comparison.'
    },
    {
      title: 'Privacy & Data Anonymization Check',
      category: 'Security',
      promptText: 'I am about to paste meeting notes into an AI tool. Scan the following draft and highlight any Personally Identifiable Information (names, phone numbers, Aadhaar/PAN, internal company server IPs) that I should remove before processing:\n\n"[Draft Notes]"',
      variables: ['[Draft Notes]'],
      intendedPurpose: 'Pre-flight privacy check to prevent data leaks.'
    }
  ],
  studentActivity: {
    title: 'Set Up and Test the Big Three',
    description: 'Create your free accounts on at least two different AI platforms and compare their responses.',
    steps: [
      'Sign in to ChatGPT (chatgpt.com) and Google Gemini (gemini.google.com).',
      'Ask both tools the exact same prompt: "Give me a 3-day weekend study plan for an engineering/commerce student in India."',
      'Compare the formatting, speed, and helpfulness of both answers.',
      'Bookmark both tools in your browser toolbar for quick daily access.'
    ],
    submissionExpected: 'A brief note identifying which tool you preferred for this specific task and one feature you noticed in its interface.'
  },
  keyTakeaways: [
    'ChatGPT excels at creative drafting, brainstorming, and logic puzzles.',
    'Google Gemini is ideal for Google Docs, Gmail, and YouTube transcript summaries.',
    'Microsoft Copilot and Perplexity AI shine when live web search and source citations are required.',
    'All core productivity workflows in this course work on free tiers without paying subscription fees.'
  ],
  suggestedVisuals: [
    'Side-by-side logo matrix of ChatGPT, Gemini, Copilot, Perplexity, and Canva.',
    'Screen recording showing how to bookmark chatgpt.com and gemini.google.com.',
    'Annotated screenshot pointing out the Chat History sidebar, Settings menu, and Model Switcher.'
  ],
  downloadableNotes: `# Lesson 2 Notes: Popular AI Tools Overview

### 1. The Big Three General Assistants
| Tool | Developer | Best Use Case | Special Advantage |
| :--- | :--- | :--- | :--- |
| **ChatGPT** | OpenAI | Drafting, brainstorming, logic, coding | Intuitive chat, mobile app, memory feature |
| **Google Gemini** | Google | Google Workspace integration, YouTube | Connects directly to Docs, Drive, YouTube |
| **Microsoft Copilot** | Microsoft | Research with citations, Office documents | Integrated with Windows, Edge, Bing citations |

### 2. Specialized Productivity Tools
- **Perplexity AI**: Academic and market research with direct footnote citations to reputable websites.
- **Canva Magic Studio**: Converts outline text into visual slide decks, posters, and flyers.
- **Grammarly AI / Wordtune**: Refines grammar, brevity, and tone in workplace emails.

### 3. Practical Setup Checklist
1. Use your primary student or professional Google/Microsoft account for seamless single sign-on (SSO).
2. Pin the chat assistant tab to your browser bar.
3. Review Privacy Settings: disable "Improve model for everyone" if handling proprietary workplace notes.
4. Remember: Free tiers are completely sufficient for daily productivity!`,
  quiz: [
    {
      id: 'l2_q1',
      question: 'Which tool is particularly advantageous if you need to summarize a YouTube video transcript or integrate with Google Docs?',
      options: [
        'Photoshop',
        'Google Gemini',
        'Windows Notepad',
        'VLC Media Player'
      ],
      correctIndex: 1,
      explanation: 'Google Gemini natively interfaces with the Google ecosystem, including YouTube transcripts and Google Workspace documents.'
    },
    {
      id: 'l2_q2',
      question: 'What is the primary strength of Perplexity AI compared to traditional search engines?',
      options: [
        'It plays video games automatically.',
        'It synthesizes direct answers from top sources and provides clickable citations for every claim.',
        'It charges ₹10,000 per search query.',
        'It only works offline without internet.'
      ],
      correctIndex: 1,
      explanation: 'Perplexity acts as an AI answer engine that cites verified web sources for fact-checking.'
    },
    {
      id: 'l2_q3',
      question: 'Do students or professionals need paid premium subscriptions (like ChatGPT Plus) to use AI effectively for study and work?',
      options: [
        'Yes, free AI tools do not work at all.',
        'No, free tiers of ChatGPT, Gemini, and Copilot provide high-quality capabilities sufficient for 95% of everyday tasks.',
        'Only students in medical colleges need to pay.',
        'AI is illegal unless you purchase a government license.'
      ],
      correctIndex: 1,
      explanation: 'Current free tiers on major platforms provide advanced language models that easily handle everyday productivity tasks.'
    },
    {
      id: 'l2_q4',
      question: 'Why can free-plan model availability change over time?',
      options: [
        'Because AI companies frequently update models, adjust server loads, and refresh tier features.',
        'Because AI models forget how to speak English every Friday.',
        'Because computers run out of digital ink.',
        'Because satellite connections reset every month.'
      ],
      correctIndex: 0,
      explanation: 'AI providers constantly iterate on model names, server quotas, and free-plan limits as their infrastructure scales.'
    },
    {
      id: 'l2_q5',
      question: 'What simple browser habit significantly speeds up your daily AI workflow?',
      options: [
        'Deleting your browser cache every 10 minutes.',
        'Bookmarking or pinning your preferred AI assistant tab (e.g., chatgpt.com or gemini.google.com) to your browser toolbar.',
        'Typing prompts only in capital letters.',
        'Using three different keyboards.'
      ],
      correctIndex: 1,
      explanation: 'Keeping a pinned browser tab allows you to instantly invoke your AI assistant whenever you encounter a difficult text, email draft, or research task.'
    }
  ]
};

export const module1Lessons: LessonContent[] = [LESSON_1, LESSON_2];
