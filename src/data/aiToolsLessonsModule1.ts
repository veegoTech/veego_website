import { LessonContent } from './aiToolsCourseData';

export const LESSON_1: LessonContent = {
  id: 'aitools_lesson1',
  lessonNumber: 1,
  moduleId: 'aitools_module1',
  moduleTitle: 'Module 1: Introduction to AI (30 min)',
  title: 'Lesson 1: Introduction to AI: Understanding the Future of Intelligence',
  durationMinutes: 15,
  learningObjectives: [
    'Define Artificial Intelligence as the simulation of human intelligence in machines that learn and adapt.',
    'Contrast deterministic traditional software (rule-based) with modern AI (data & pattern learning).',
    'Understand the nested Building Blocks of AI: Machine Learning (ML), Deep Learning (DL), and Generative AI (GenAI).',
    'Distinguish between the 3 Classifications of AI: Artificial Narrow Intelligence (ANI), General Intelligence (AGI), and Superintelligence (ASI).',
    'Examine real-world impact across Healthcare, Finance, Education, and Daily Life.',
    'Analyze ethical challenges: algorithmic bias, privacy, economic workforce shifts, and Responsible AI governance.'
  ],
  trainerScript: `Welcome to "Introduction to AI: Understanding the Future of Intelligence" by VeeGo Technologies!

Artificial Intelligence has rapidly shifted from the realms of science fiction into the foundation of modern technology. Whether it is facial recognition on your smartphone, automated medical diagnostics, or generating a complete presentation outline in 10 seconds, AI is redefining how we work, learn, and solve problems.

1. What is Artificial Intelligence?
At its core, AI refers to the simulation of human intelligence in machines programmed to think, learn, adapt, and problem-solve.
Unlike traditional software where human programmers hand-craft every single "IF/THEN" rule, AI systems ingest massive amounts of data, detect subtle patterns, and make predictions or decisions autonomously.

2. The 3 Building Blocks of AI:
Think of AI as nested layers:
- Artificial Intelligence (AI) is the broad umbrella.
- Machine Learning (ML) is a subset where algorithms learn from data to make predictions without being explicitly programmed for every scenario.
- Deep Learning (DL) is a specialized branch of ML using multi-layered Artificial Neural Networks (ANNs) inspired by the human brain, powering vision, speech, and autonomous driving.
- Generative AI (GenAI) is the latest frontier: systems like Large Language Models (LLMs) and diffusion models that synthesize brand-new content—text, code, images, audio, and slides—from human prompts.

3. The 3 Classifications of AI:
- Artificial Narrow Intelligence (ANI / Weak AI): Designed for a specific single task (e.g., Google Maps routing, chess algorithms, ChatGPT text generation). ALL AI that currently exists in the world today is ANI!
- Artificial General Intelligence (AGI / Strong AI): A theoretical future machine possessing human-level cognitive flexibility across diverse intellectual domains. AGI does not exist yet.
- Artificial Superintelligence (ASI): A hypothetical future stage where AI surpasses the collective intellectual capability of all human minds combined.

4. Real-World Applications:
AI is driving transformations in Healthcare (early cancer detection, drug discovery), Business & Finance (fraud prevention, market forecasting), Education (24/7 personal tutors), and Daily Life (smart assistants, translation).

5. Ethics and Responsible AI:
As AI accelerates, we must actively govern its risks: algorithmic bias inherited from historical data, data privacy, deepfakes, and job transitions.

The future of intelligence is collaborative: AI is a cognitive engine designed to augment human potential, not replace human judgment. Let's explore how it works!`,
  demonstrationInstructions: [
    'Open your web browser (Chrome, Edge, or Brave).',
    'Open Google Maps on one tab to demonstrate everyday predictive Narrow AI (traffic rerouting).',
    'Open ChatGPT (chatgpt.com) or Google Gemini (gemini.google.com) to demonstrate Generative AI.',
    'Type: "Compare Narrow AI (ANI) with General AI (AGI) using a 2-column table with 3 everyday examples."',
    'Observe how the model synthesizes a structured response within 3 seconds based on learned conceptual patterns.',
    'Test an ethical reality check: Ask the model to explain how training bias can impact job recruitment algorithms.'
  ],
  practicalExamples: [
    {
      title: 'Healthcare & Medical Diagnostics',
      scenario: 'Radiology departments in multi-specialty hospitals review 400+ CT scans and X-rays daily. Subtle hairline fractures or early-stage pulmonary nodules are easily missed during exhausting 14-hour night shifts.',
      aiWorkflow: 'Deep Learning Convolutional Neural Networks (CNNs) pre-screen imaging scans in 1.5 seconds, highlighting anomalous pixel clusters with heatmaps for the senior radiologist to confirm.',
      result: 'Early disease detection rates increase by 24%, diagnostic turnaround drops from hours to minutes, and human radiologists focus their expertise on high-risk patient consultations.'
    },
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
      title: 'AI Building Blocks Breakdown (ML vs DL vs GenAI)',
      category: 'Conceptual',
      promptText: 'Explain the difference between Machine Learning, Deep Learning, and Generative AI for someone working in [Your Industry/Domain]. Provide 1 concrete real-world use case for each.',
      variables: ['[Your Industry/Domain]'],
      intendedPurpose: 'Clarify the nested technical architecture of modern AI systems.'
    },
    {
      title: 'Traditional Software vs AI Comparison',
      category: 'Education',
      promptText: 'Create a clean 2-column comparison table between traditional software and AI-powered systems for the use-case of [Industry/Task]. Include Columns: Feature, Traditional Approach, AI-Assisted Approach.',
      variables: ['[Industry/Task]'],
      intendedPurpose: 'Identify where AI creates genuine leverage in workflows.'
    },
    {
      title: 'Responsible AI & Ethical Bias Audit',
      category: 'Ethics',
      promptText: 'I am planning to deploy an AI system to assist with [Task or Process, e.g. hiring screening, loan approvals, or grading]. List 3 potential sources of historical training bias that could harm users, and 3 specific safeguards I should implement.',
      variables: ['[Task or Process]'],
      intendedPurpose: 'Evaluate algorithmic bias and implement Responsible AI best practices.'
    },
    {
      title: 'AI Capability Reality Check (ANI vs AGI)',
      category: 'Productivity',
      promptText: 'I want to use AI to help me with [Specific Goal]. List 3 things current Narrow AI (ANI) can do exceptionally well for this goal, and 3 things requiring human judgment, empathy, or ethical sign-off.',
      variables: ['[Specific Goal]'],
      intendedPurpose: 'Avoid over-reliance and identify human verification checkpoints.'
    }
  ],
  studentActivity: {
    title: 'Your First AI Interaction & Reality Check',
    description: 'Open a free AI tool (ChatGPT, Gemini, or Copilot) and test how it explains an unfamiliar concept while evaluating its limitations.',
    steps: [
      'Choose one subject or topic you recently found confusing (e.g., Inflation, Cloud Computing, Neural Networks, or GST).',
      'Use the Role-Based Concept Explainer prompt from this lesson.',
      'Read the response and evaluate whether the everyday analogy made sense.',
      'Ask a follow-up prompt: "What are 2 limitations of your explanation where a human textbook or teacher must verify the facts?"'
    ],
    submissionExpected: 'A 2-paragraph reflection noting the topic chosen, the prompt used, and how you verified its accuracy.'
  },
  keyTakeaways: [
    'AI simulates human intelligence via machines that learn statistical patterns from data rather than following static rules.',
    'Building Blocks: AI encompasses Machine Learning (ML), which includes Deep Learning (Neural Networks), which powers Generative AI (LLMs & creative generation).',
    'Classifications: All current AI is Artificial Narrow Intelligence (ANI); General AI (AGI) and Superintelligence (ASI) remain theoretical.',
    'Real-World Impact spans Healthcare, Finance, Education, and Daily Life.',
    'Responsible AI is critical: humans must safeguard against algorithmic bias, privacy risks, and hallucinations.'
  ],
  suggestedVisuals: [
    'Nested Concentric Circles: Artificial Intelligence -> Machine Learning -> Deep Learning -> Generative AI.',
    'Capability Spectrum: Narrow AI (ANI - Active Today) -> General AI (AGI - Theoretical) -> Superintelligence (ASI - Hypothetical).',
    'Interactive Real-World Impact Grid across Healthcare, Finance, Education, and Daily Life.'
  ],
  downloadableNotes: `# Introduction to AI: Understanding the Future of Intelligence

### 1. What is Artificial Intelligence?
Artificial Intelligence (AI) refers to the simulation of human intelligence in machines programmed to think, learn, adapt, and problem-solve.
- **Traditional Software:** Follows rigid, deterministic human-written rules (IF/THEN). Cannot adapt to unseen patterns.
- **Modern AI:** Ingests vast datasets, discovers statistical representations, and generates predictions or novel content autonomously.

### 2. The 3 Building Blocks of AI
1. **Machine Learning (ML):** Algorithms trained on data to recognize patterns and make decisions without explicit programming.
2. **Deep Learning (DL):** Multi-layered Artificial Neural Networks (ANNs) inspired by biological brains, enabling image, speech, and sensory comprehension.
3. **Generative AI (GenAI):** Advanced models (LLMs like GPT-4, Gemini) trained on vast knowledge to synthesize original text, code, imagery, audio, and slides from prompts.

### 3. Classifications of AI
- **Artificial Narrow Intelligence (ANI / Weak AI):** Specializes in a dedicated task (Google Maps, spam filters, ChatGPT). *All current AI is ANI.*
- **Artificial General Intelligence (AGI / Strong AI):** Theoretical machine with human-level cognitive flexibility across all intellectual domains.
- **Artificial Superintelligence (ASI):** Hypothetical future AI that eclipses all human intellect combined.

### 4. Real-World Applications
- **Healthcare:** Accelerated drug discovery, automated diagnostic radiology scans, personalized therapies.
- **Business & Finance:** Real-time fraud detection, algorithmic risk modeling, repetitive office automation.
- **Education & Productivity:** 24/7 personal tutors, coding copilots, automated presentation generation.
- **Daily Life:** Real-time navigation routing, language translation, smart home automation.

### 5. Challenges & Responsible AI
- **Bias & Fairness:** Models inherit historical human biases present in training data.
- **Privacy & Security:** Safeguarding personal data against surveillance and deepfakes.
- **Economic Shifts:** Workforce transitions requiring continuous upskilling.
- **Human-in-the-Loop:** AI augments human potential; humans supply common sense, empathy, and ethical verification.`,
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
      question: 'Which classification describes all Artificial Intelligence systems that currently exist in the world today?',
      options: [
        'Artificial General Intelligence (AGI / Strong AI)',
        'Artificial Superintelligence (ASI)',
        'Artificial Narrow Intelligence (ANI / Weak AI)',
        'Sentient Quantum Intelligence (SQI)'
      ],
      correctIndex: 2,
      explanation: 'All currently deployed AI systems (from ChatGPT to Google Maps to self-driving autopilots) are Artificial Narrow Intelligence (ANI) — specialized for specific task domains.'
    },
    {
      id: 'l1_q5',
      question: 'What is the relationship between AI, Machine Learning (ML), and Deep Learning (DL)?',
      options: [
        'They are 3 completely competing companies with different CEOs.',
        'They are nested: ML is a subset of AI, and DL is a subset of ML utilizing Artificial Neural Networks.',
        'Deep Learning came first in the 1800s, followed by AI in 2020.',
        'Machine Learning only works on spreadsheets; Deep Learning only works on gaming consoles.'
      ],
      correctIndex: 1,
      explanation: 'AI is the overarching field. Machine Learning (ML) is a subset focused on learning from data, and Deep Learning (DL) is a subset of ML using multi-layered Artificial Neural Networks inspired by the brain.'
    },
    {
      id: 'l1_q6',
      question: 'Why can AI models exhibit bias in decision-making (e.g. recruitment screening or credit approvals)?',
      options: [
        'Because computer chips inherently dislike certain zip codes.',
        'Because AI models learn patterns from historical human training data, inheriting and potentially amplifying existing human prejudices.',
        'Because AI is legally mandated to discriminate.',
        'Because AI algorithms are programmed in foreign languages.'
      ],
      correctIndex: 1,
      explanation: 'Because AI algorithms train on historical human-generated datasets, any historical disparities or biases embedded in that data will be learned and mirrored by the model unless actively audited and mitigated.'
    },
    {
      id: 'l1_q7',
      question: 'Why should a student or professional view AI as a "cognitive collaborator" rather than a replacement for human intellect?',
      options: [
        'Because AI output is encrypted with secret passwords.',
        'Because AI augments human speed and drafting, while humans provide common sense, ethical accountability, real-world context, and final verification.',
        'Because internet browsers ban users who don\'t write their own sentences.',
        'Because AI tools immediately delete your account after 3 copies.'
      ],
      correctIndex: 1,
      explanation: 'AI acts as a force multiplier for drafting and idea generation, but human practitioners supply empathy, ethical judgment, contextual discernment, and verification.'
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
