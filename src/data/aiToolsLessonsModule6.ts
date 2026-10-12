import { LessonContent, QuizQuestion, ProjectRubricCriterion } from './aiToolsCourseData';

export const module6Lessons: LessonContent[] = [
  {
    id: 'lesson-14',
    lessonNumber: 14,
    moduleId: 'module-6',
    moduleTitle: 'Module 6: Responsible AI and Final Assessment',
    title: 'Privacy, Accuracy, and Responsible AI',
    durationMinutes: 20,
    learningObjectives: [
      'Identify and protect Personal Identifiable Information (PII) and confidential corporate data when using AI',
      'Understand the technical roots of AI hallucinations, algorithmic bias, and sycophancy in LLMs',
      'Execute robust verification protocols: the Two-Source Rule, primary citation checks, and calculation audits',
      'Navigate copyright, intellectual property, and academic attribution rules responsibly',
      'Know the definitive boundary: understand exactly when NOT to rely on AI (legal, medical, critical safety)'
    ],
    trainerScript: `Welcome to Lesson 14, learners. This is arguably the most vital lesson in the entire course.

Up to this point, you have discovered the superpowers of AI: generating notes in seconds, drafting presentations, condensing reports, and preparing for job interviews. But as the saying goes, "With great power comes great responsibility."

If you use AI without understanding privacy, accuracy, and ethics, you risk severe real-world consequences: academic expulsion, loss of employment, legal liabilities, or reputational damage.

Let us address the three core pillars of Responsible AI:

Pillar 1: Data Privacy & The "Billboard Rule"
When you type into consumer-facing AI tools (like ChatGPT Free, Gemini, or Copilot), your prompts and uploaded files may be stored on remote servers and potentially used to train future AI models.
Adopt the Billboard Rule: Never input anything into an AI prompt that you would not be comfortable displaying on a public highway billboard!
Never share: Aadhaar numbers, PAN cards, bank account details, customer phone lists, proprietary company codebases, or medical records. If you must process a document, redact and anonymize all identifiers first.

Pillar 2: Hallucinations and Algorithmic Sycophancy
LLMs are statistical text generators, not truth engines. They predict the most probable next word based on patterns. When an AI does not know the answer, it often hallucinates plausible-sounding but completely fabricated facts, fake legal case names, and fictional research citations.
Furthermore, AI suffers from sycophancy: if you ask "Why did Napoleon win the Battle of Waterloo in 1815?", a weak prompt might lead the AI to agree with your false premise!

Pillar 3: The Boundary Line - When NOT to Use AI
Never rely exclusively on AI for:
- Medical diagnoses or medication dosages.
- Binding legal contracts or court filings without certified lawyer review.
- High-stakes financial investments.
- High-precision engineering calculations where human safety is at stake.

In this lesson, we will establish your personal Responsible AI Protocol. Let us begin!`,
    demonstrationInstructions: [
      'Open ChatGPT or Gemini in your browser.',
      'Demonstrate a live PII Redaction exercise: Take a raw customer message containing a full name, Indian phone number, and address. Show how to scrub the data to [CUSTOMER_A], [PHONE_REDACTED], and [CITY_X] before prompting.',
      'Demonstrate how LLMs hallucinate citations: Ask the AI for 5 research papers published in 2023 on an obscure niche topic with volume and page numbers. Show how to verify whether these DOIs actually exist in Google Scholar or PubMed.',
      'Showcase "Sycophancy Detection": Ask a leading question with a deliberate factual error, and show how to engineer the prompt to demand objective truth over flattery.',
      'Review the academic citation format for AI tools: "Text generated using OpenAI ChatGPT-4o (October 2026) based on prompt by author."'
    ],
    practicalExamples: [
      {
        title: 'Workplace Leak Prevention at a Financial Advisory Firm',
        scenario: 'A junior financial analyst in Mumbai wanted to summarize a client\'s confidential wealth portfolio of ₹15 Crores before an advisory meeting.',
        aiWorkflow: 'Applied Data Anonymization: Replaced client name with "High-Net-Worth Client Alpha", masked exact PAN and bank names with [BANK_1] and [EQUITY_FUND_A], and processed only percentages and asset allocations through the AI.',
        result: 'Protected client confidentiality and complied with SEBI privacy standards while gaining the summary in 3 minutes.'
      },
      {
        title: 'Verifying Fake Academic Citations in a Master\'s Thesis',
        scenario: 'A postgraduate student asked AI for 10 research papers on "Microplastics in Indian Coastal Water Reservoirs" for Chapter 2 of their thesis.',
        aiWorkflow: 'Applied the Two-Source Rule: Looked up each of the 10 suggested paper titles in Google Scholar and ResearchGate. Discovered that 4 of the 10 papers had real author names but completely fabricated paper titles that never existed!',
        result: 'Removed the hallucinated citations, saving the student from severe plagiarism and academic disciplinary charges.'
      }
    ],
    prompts: [
      {
        title: 'PII & Confidentiality Data Scrubber',
        category: 'Data Privacy',
        promptText: 'Act as a strict Data Privacy & Compliance Officer. Review the following text:\n"[PASTE RAW TEXT]"\nIdentify all instances of Personal Identifiable Information (PII) or confidential business data (e.g., names, phone numbers, email addresses, identification numbers, financial figures, company names). Replace them with standardized bracketed placeholders (e.g., [CLIENT_NAME_1], [PHONE_NUMBER], [AMOUNT_A]). Output the scrubbed text ready for safe AI processing.',
        variables: ['[PASTE RAW TEXT]'],
        intendedPurpose: 'Anonymizes sensitive personal or business text before sending it to AI models.'
      },
      {
        title: 'Adversarial Fact-Check & Hallucination Detector',
        category: 'Verification',
        promptText: 'Act as a skeptical investigative journalist and fact-checker. Read the following text:\n"[PASTE AI OUTPUT OR ARTICLE]"\nRuthlessly fact-check every assertion, statistic, historical date, and quoted study.\nFor every claim, categorize as:\n1. [VERIFIED & WELL-ESTABLISHED]\n2. [QUESTIONABLE / LACKS PRIMARY SOURCE]\n3. [LIKELY HALLUCINATION / FALSE].\nFor any questionable claim, provide the specific search query I must perform to verify it.',
        variables: ['[PASTE AI OUTPUT OR ARTICLE]'],
        intendedPurpose: 'Audits AI-generated content to catch hallucinations, fabricated dates, and unverified statistics.'
      },
      {
        title: 'Anti-Sycophancy Objective Truth Prompt',
        category: 'Critical Accuracy',
        promptText: 'I am going to ask you a question on [TOPIC].\nCrucial Instructions:\n1. Do NOT try to validate my opinion or agree with my premise if it is flawed or inaccurate.\n2. Be completely neutral, objective, and evidence-based.\n3. If my question contains a false assumption, correct me immediately with respectful, factual evidence.\nHere is my question: "[PASTE QUESTION]"',
        variables: ['[TOPIC]', '[PASTE QUESTION]'],
        intendedPurpose: 'Prevents the AI from blindly agreeing with incorrect user assumptions.'
      },
      {
        title: 'Responsible Academic / Professional AI Citation Formatter',
        category: 'Attribution',
        promptText: 'I used [AI TOOL NAME, e.g., ChatGPT / Gemini / Claude] to assist me with [SPECIFIC TASK, e.g., brainstorming outline / proofreading draft] for my project titled "[PROJECT TITLE]".\nGenerate formal attribution and disclosure text in 3 standard formats:\n1. APA 7th Edition AI Citation Format\n2. IEEE Style Disclosure Statement\n3. General Corporate / Professional Transparency Footnote.',
        variables: ['[AI TOOL NAME]', '[SPECIFIC TASK]', '[PROJECT TITLE]'],
        intendedPurpose: 'Generates standardized citation and transparency disclosures for academic and workplace honesty.'
      },
      {
        title: 'Ethical AI Dilemma Evaluator',
        category: 'Ethics & Compliance',
        promptText: 'Evaluate the following workplace/academic scenario involving AI:\n"[DESCRIBE SCENARIO, e.g. An employee using AI to auto-generate customer support responses without human review]"\nEvaluate:\n1. Potential legal and reputational risks\n2. Ethical implications for stakeholders\n3. Recommended organizational policy or human-in-the-loop safeguard to mitigate risks.',
        variables: ['[DESCRIBE SCENARIO]'],
        intendedPurpose: 'Assesses workplace AI dilemmas and designs safe human-in-the-loop policies.'
      }
    ],
    studentActivity: {
      title: 'Scrub a Document and Fact-Check an AI Output',
      description: 'Practice the two core safeguards of Responsible AI: (1) Anonymize a text containing sample PII, and (2) Perform an adversarial fact-check on an AI-generated claim using Google Scholar or an authentic search engine.',
      steps: [
        'Take a 100-word paragraph containing mock personal data (names, mock credit card or phone numbers).',
        'Run the PII & Confidentiality Data Scrubber prompt and verify zero sensitive data remains.',
        'Ask AI for 3 historical or scientific statistics, and verify all 3 using authentic primary websites or books.',
        'Document which sources you used to verify the claims.',
        'Include your verification notes in your final portfolio submission.'
      ],
      submissionExpected: 'A 1-page Responsible AI Verification Log documenting data scrub and 3 verified claims.'
    },
    keyTakeaways: [
      'The Billboard Rule: Never paste any data into AI prompts that you would not display on a public billboard.',
      'LLMs predict plausible word sequences; they do not have intrinsic awareness of truth and can hallucinate citations.',
      'Always enforce the Two-Source Rule: Verify every statistic, historical fact, and citation using trusted external databases.',
      'Disclose AI assistance transparently in academic papers and corporate reports using standardized attribution formats.',
      'High-stakes domains (medicine, criminal law, critical engineering) strictly require human expert oversight.'
    ],
    suggestedVisuals: [
      'The "Billboard Rule" privacy infographic with red caution symbols over PII',
      'The Anatomy of a Hallucination: Why LLMs generate plausible-sounding falsehoods',
      'The Two-Source Verification Checklist workflow diagram'
    ],
    downloadableNotes: `# VeeGo AI LMS - Lesson 14 Cheatsheet: Privacy, Accuracy, and Responsible AI

## 1. What NEVER to Put in Public AI Tools
- **PII**: Full Aadhaar, PAN, SSN, Passport, phone numbers, physical addresses.
- **Financial**: Bank account numbers, PINs, card security codes, private company balance sheets.
- **Intellectual Property**: Unreleased trade secrets, proprietary algorithm source code, non-disclosure agreement (NDA) documents.
- **Medical**: Patient records, diagnosis files, personal health records.

## 2. Standard Academic AI Disclosure Template (APA 7th Edition)
> OpenAI. (2026). *ChatGPT* (Version GPT-4o) [Large language model]. https://chat.openai.com/
> *Author Note: The author utilized ChatGPT to assist in brainstorming the thematic outline for Section 2. All text was written and verified by the author.*
`,
    quiz: [
      {
        id: 'q14-1',
        question: 'What is the "Billboard Rule" regarding data privacy in consumer AI tools?',
        options: [
          'You must advertise on billboards to earn AI credits',
          'Never enter any personal or confidential data into an AI tool that you would not feel comfortable displaying on a public highway billboard',
          'Always use all capital letters when prompting',
          'AI tools must only be used by billboard designers'
        ],
        correctIndex: 1,
        explanation: 'The Billboard Rule states that because consumer AI tools may process and retain prompts for training, sensitive private or corporate data should never be entered.'
      },
      {
        id: 'q14-2',
        question: 'What is an "AI hallucination"?',
        options: [
          'When an AI model experiences human dreams',
          'When an AI generates plausible-sounding but factually incorrect or completely fabricated information with apparent confidence',
          'When a computer screen flickers during heavy computing',
          'When the user forgets their AI account password'
        ],
        correctIndex: 1,
        explanation: 'Hallucinations occur when language models generate grammatically convincing text that has no basis in factual reality or authentic sources.'
      },
      {
        id: 'q14-3',
        question: 'What is the "Two-Source Rule" for fact-checking AI-generated research citations and statistics?',
        options: [
          'Ask the same AI model twice',
          'Cross-verify any critical claim or citation using at least two independent, reputable external sources (e.g., peer-reviewed journals, official records)',
          'Read the claim in two different fonts',
          'Print two paper copies of the report'
        ],
        correctIndex: 1,
        explanation: 'The Two-Source Rule requires verifying AI claims against two independent, credible external primary sources before relying on or publishing them.'
      },
      {
        id: 'q14-4',
        question: 'In which of the following scenarios is it UNACCEPTABLE to rely on AI output without certified human expert validation?',
        options: [
          'Brainstorming ideas for a birthday party game',
          'Medical treatment plans, prescribing medication dosages, or legal defense filings',
          'Drafting a preliminary outline for a college essay',
          'Formatting a markdown bullet list'
        ],
        correctIndex: 1,
        explanation: 'Medical, legal, and safety-critical decisions carry severe risks to health, liberty, and life, and must always be validated by qualified human professionals.'
      },
      {
        id: 'q14-5',
        question: 'What does "algorithmic sycophancy" mean in the context of conversational AI?',
        options: [
          'The tendency of an AI model to agree with the user\'s opinions or mistaken premises rather than stating objective truth',
          'The ability of AI to translate across 100 languages',
          'A hardware malfunction in server chips',
          'The encryption algorithm used by HTTPS'
        ],
        correctIndex: 0,
        explanation: 'Sycophancy is when an AI prioritizes pleasing or agreeing with the user over delivering rigorous, objective, and critical accuracy.'
      }
    ]
  },
  {
    id: 'lesson-15',
    lessonNumber: 15,
    moduleId: 'module-6',
    moduleTitle: 'Module 6: Responsible AI and Final Assessment',
    title: 'Final Practical Project and Assessment',
    durationMinutes: 20,
    learningObjectives: [
      'Assemble the comprehensive "AI Productivity Portfolio" consolidating all practical deliverables',
      'Demonstrate an end-to-end AI-assisted professional workflow from ideation to delivery',
      'Review the four scoring pillars of the Project Submission Rubric (Completeness, Accuracy, Utility, Ethics)',
      'Prepare for and successfully complete the 20-Question Final Assessment (passing score 70%)',
      'Verify course completion requirements and receive your tamper-evident VeeGo Digital Certificate'
    ],
    trainerScript: `Congratulations, learners! You have reached Lesson 15, the capstone lesson of the AI Tools for Students & Professionals course!

Take a moment to appreciate how far you have come. Just 4 hours ago, you may have viewed AI as a mysterious gadget or a simple search engine. Today, you possess a systematic, repeatable framework for prompt engineering, academic study, research verification, presentation design, executive communication, and workplace productivity.

In this final lesson, we will do three things:
1. Walk through the requirements for your Capstone Project: The AI Productivity Portfolio.
2. Review the four evaluation criteria in our official grading rubric.
3. Prepare you for the 20-Question Final Assessment.

Here is what your AI Productivity Portfolio must contain:
- Component A: Structured Study Notes on a topic of your choice, complete with summary, flashcards, and verified sources.
- Component B: A 5-to-8 slide presentation deck outline with punchy 3-bullet slides and speaker notes.
- Component C: One professional email (under 120 words) with subject line and clear call to action.
- Component D: Prompt Portfolio: 5 reusable prompts customized for your field with their intended purposes and variables.

To earn your VeeGo Certificate of Completion:
1. Complete 100% of all 15 lessons.
2. Pass the Final Assessment with a score of 70% or higher (14/20 questions correct).
3. Submit your AI Productivity Portfolio.

Once approved, the VeeGo LMS will issue your verifiable, tamper-evident PDF Certificate containing a unique certificate ID and a live QR code that employers and universities can scan to authenticate your achievement.

Let us review the step-by-step submission instructions!`,
    demonstrationInstructions: [
      'Display the full AI Productivity Portfolio template on screen.',
      'Show an exemplar submission from a past student illustrating Component A, B, C, and D in clean markdown or PDF format.',
      'Demonstrate how to upload the portfolio into the VeeGo LMS submission portal.',
      'Walk through the 20-Question Final Assessment interface: timer, question navigation, review flag, and instant scoring.',
      'Showcase the Certificate generation modal: displaying student name, course title, issue date, unique ID, and QR code verification link.'
    ],
    practicalExamples: [
      {
        title: 'Exemplar Student Portfolio: Mechanical Engineering Finalist',
        scenario: 'A student preparing for campus recruitment created a portfolio centered on "Additive Manufacturing & 3D Printing in Automotive".',
        aiWorkflow: 'Component A: Cornell study notes on SLS vs DMLS with verified ASTM standards. Component B: 7-slide pitch deck on automotive lightweighting. Component C: Cold application email to a senior R&D lead at Tata Motors. Component D: 5 custom CAD prompt engineering frameworks.',
        result: 'Earned 98% rubric score, passed assessment with 19/20, and used the portfolio in interviews to land an R&D role.'
      },
      {
        title: 'Exemplar Professional Portfolio: Small Business Owner',
        scenario: 'An entrepreneur running an artisanal spice brand in Kochi built a portfolio centered on "Export Expansion & Digital Marketing".',
        aiWorkflow: 'Component A: Spices Board export regulation summary notes. Component B: 6-slide investor overview deck. Component C: Formal inquiry email to European gourmet distributors. Component D: 5 marketing prompts for social media and customer retention.',
        result: 'Demonstrated complete AI mastery, improved daily operations, and secured certificate authentication for their professional profile.'
      }
    ],
    prompts: [
      {
        title: 'Portfolio Self-Audit & Rubric Checker',
        category: 'Project Submission',
        promptText: 'Act as the Chief Course Evaluator for the VeeGo AI Course. Below is my draft AI Productivity Portfolio:\n[PASTE COMPLETE PORTFOLIO DRAFT]\nAudit my submission against the 4 Rubric Criteria:\n1. Completeness (Are all 4 components present: Notes, Presentation, Email, 5 Prompts?)\n2. Accuracy & Verification (Are all facts and metrics verifiable?)\n3. Practical Utility (Are the deliverables realistic and professional?)\n4. Responsible AI & Ethics (Is sensitive data protected? Are disclosures included?)\nProvide a numerical score out of 100 with actionable feedback to reach a score of 95+.',
        variables: ['[PASTE COMPLETE PORTFOLIO DRAFT]'],
        intendedPurpose: 'Self-audits your project submission against the course rubric before official LMS grading.'
      },
      {
        title: 'AI Workflow Executive Summary Builder',
        category: 'Portfolio Reflection',
        promptText: 'Draft a 150-word Executive Summary for my AI Productivity Portfolio. I am a [STUDENT / WORKING PROFESSIONAL] in [FIELD/INDUSTRY]. Summarize how these 4 components demonstrate my ability to boost daily productivity, safeguard data privacy, and deliver measurable outcomes using generative AI tools.',
        variables: ['[STUDENT / WORKING PROFESSIONAL]', '[FIELD/INDUSTRY]'],
        intendedPurpose: 'Generates a cover summary for your project submission portfolio.'
      },
      {
        title: 'Final Assessment Quick Review Crammer',
        category: 'Exam Prep',
        promptText: 'Generate a 10-point rapid-fire review list summarizing the most testable concepts across all 6 modules of the VeeGo AI Course (Prompt Frameworks, Cornell Notes, Sycophancy, XYZ Formula, BLUF, and Data Privacy). Keep each point under 2 sentences.',
        variables: [],
        intendedPurpose: 'Provides a high-yield summary to review right before taking the 20-question final exam.'
      },
      {
        title: 'LinkedIn Course Completion Announcement',
        category: 'Career Branding',
        promptText: 'Write an engaging, humble, and professional LinkedIn post announcing my completion of the "AI Tools for Students & Professionals" course by VeeGo. Highlight: mastered prompt engineering, practical study & workplace workflows, and responsible AI ethics. Conclude with a link to my verified certificate ID: [CERTIFICATE_ID] and tag #VeeGoTech #AIEducation #Productivity.',
        variables: ['[CERTIFICATE_ID]'],
        intendedPurpose: 'Drafts a professional post to announce your new credential on LinkedIn.'
      },
      {
        title: 'Next 90 Days AI Upskilling Roadmap',
        category: 'Continuous Learning',
        promptText: 'Now that I have completed the foundational AI Tools for Students & Professionals course, design a 90-day continuing education plan for my role as [ROLE/CAREER GOAL]. Focus on intermediate workflows: AI automation (Zapier/Make), local open-source LLMs, and custom GPT agents. Divide into 3 monthly milestones.',
        variables: ['[ROLE/CAREER GOAL]'],
        intendedPurpose: 'Creates a roadmap for lifelong learning beyond this foundational course.'
      }
    ],
    studentActivity: {
      title: 'Submit the AI Productivity Portfolio & Take Final Exam',
      description: 'Review your portfolio files, ensure all four components are complete, upload your submission to the LMS, and launch the 20-Question Final Assessment.',
      steps: [
        'Assemble Component A (Study Notes), Component B (Presentation Outline), Component C (Professional Email), and Component D (5 Reusable Prompts).',
        'Run the Portfolio Self-Audit prompt to confirm all requirements are met.',
        'Upload your submission into the LMS Project Submission section.',
        'Click "Start Final Assessment" and complete the 20 multiple-choice questions.',
        'Achieve 70%+ to unlock and download your official VeeGo Digital Certificate.'
      ],
      submissionExpected: 'Uploaded AI Productivity Portfolio and completed 20-question assessment.'
    },
    keyTakeaways: [
      'The Capstone Portfolio proves your hands-on ability to apply AI to real study and work challenges.',
      'The four grading pillars are: Completeness (25%), Accuracy (25%), Practical Usefulness (25%), and Ethics (25%).',
      'Passing score on the 20-question final assessment is 70% (14 correct answers).',
      'The VeeGo certificate is tamper-evident, featuring a unique verifiable ID and live QR code.',
      'Learning AI is a continuous journey; use your 90-day roadmap to keep building your AI capabilities.'
    ],
    suggestedVisuals: [
      'Visual breakdown of the 4 Portfolio Components (Notes, Slides, Email, Prompts)',
      'The 4-Pillar Grading Rubric scorecard graphic',
      'Sample VeeGo Certificate preview with QR code, watermark, and certificate ID layout'
    ],
    downloadableNotes: `# VeeGo AI LMS - Lesson 15 Cheatsheet: Final Project & Certification

## 1. Portfolio Components Checklist
- **Component A - Study Notes**: Topic title, summary, 3 key concepts, 5 flashcards, 2 verified references.
- **Component B - Presentation**: 5 to 8 slides, max 3 bullets per slide, visual ideas, speaker notes.
- **Component C - Professional Email**: Subject line, under 120 words, purpose in line 1, low-friction CTA.
- **Component D - Prompt Portfolio**: 5 reusable prompts with category, prompt text, variables, and purpose.

## 2. Certificate Eligibility Rules
1. 100% lessons marked complete (all 15 lessons).
2. Final Assessment score ≥ 70% (at least 14/20 correct).
3. Portfolio submitted through the LMS.
4. Certificate statement: Official VeeGo course completion & assessment certificate.
`,
    quiz: [
      {
        id: 'q15-1',
        question: 'What are the four required components of the final AI Productivity Portfolio?',
        options: [
          'A photo, a video, a website, and a poem',
          'Study Notes, 5-to-8 Slide Presentation Outline, Professional Email, and 5-Prompt Portfolio',
          'Four different resumes',
          'Four machine learning Python scripts'
        ],
        correctIndex: 1,
        explanation: 'The portfolio requires: Component A (Study Notes), Component B (Presentation Deck), Component C (Professional Email), and Component D (5 Reusable Prompts).'
      },
      {
        id: 'q15-2',
        question: 'What is the minimum passing score required on the 20-question Final Assessment to earn the VeeGo certificate?',
        options: [
          '50% (10/20)',
          '70% (14/20)',
          '95% (19/20)',
          '100% (20/20)'
        ],
        correctIndex: 1,
        explanation: 'Learners must achieve a minimum score of 70% (14 out of 20 correct answers) on the final assessment.'
      },
      {
        id: 'q15-3',
        question: 'How is the authenticity of a VeeGo course certificate verified by an employer or academic institution?',
        options: [
          'By calling the local police station',
          'By scanning the embedded QR code or entering the unique Certificate ID on the VeeGo public verification page',
          'By mailing a physical notarized letter',
          'Certificates cannot be verified'
        ],
        correctIndex: 1,
        explanation: 'Every VeeGo certificate contains a unique non-guessable ID and a QR code linking to a secure public verification page showing student name, course, and validity status.'
      },
      {
        id: 'q15-4',
        question: 'What should the certificate clearly disclose regarding accreditation?',
        options: [
          'It is a university PhD degree',
          'It is a VeeGo course completion and assessment certificate, not a government-recognized or externally accredited academic degree',
          'It guarantees an immediate government job',
          'It is an international passport visa'
        ],
        correctIndex: 1,
        explanation: 'In compliance with educational transparency, the certificate clearly states it is an industry course completion and assessment certificate by VeeGo.'
      },
      {
        id: 'q15-5',
        question: 'If a student fails their first attempt at the Final Assessment, what is the default retake policy?',
        options: [
          'They are permanently banned from the website',
          'They are granted one retake opportunity by default',
          'They must pay ₹10,000 INR to try again',
          'No retakes are ever allowed under any circumstances'
        ],
        correctIndex: 1,
        explanation: 'The course policy allows one assessment retake by default, with additional administrative flexibility managed via the admin panel.'
      }
    ]
  }
];

export const finalAssessmentQuestions: QuizQuestion[] = [
  {
    id: 'final-q1',
    question: 'How does Artificial Intelligence fundamentally differ from traditional software programming?',
    options: [
      'Traditional software is written by humans while AI does not use computers',
      'Traditional software executes explicit hardcoded rules, whereas AI learns patterns and statistical probabilities from data',
      'AI only runs on supercomputers costing millions of dollars',
      'Traditional software can only do math, while AI only does art'
    ],
    correctIndex: 1,
    explanation: 'Traditional software follows deterministic, hand-written rules (if-then statements). AI systems learn patterns and statistical relationships from training data to generate outputs.'
  },
  {
    id: 'final-q2',
    question: 'Which component of the RCTCF Prompt Engineering Framework establishes the persona, expertise, and perspective of the AI?',
    options: [
      'Constraint',
      'Role',
      'Task',
      'Format'
    ],
    correctIndex: 1,
    explanation: 'Role defines the identity and expertise the model should assume (e.g., "Act as a Senior Data Scientist" or "Act as an Instructional Designer").'
  },
  {
    id: 'final-q3',
    question: 'Why is providing negative constraints (e.g., "Do not use corporate jargon", "Under 100 words") so effective in prompt engineering?',
    options: [
      'It confuses the AI model and causes faster crashes',
      'It eliminates the most probable generic filler and narrows the probability distribution to your desired style and length',
      'It reduces the electricity consumed by the server',
      'It makes the model angry'
    ],
    correctIndex: 1,
    explanation: 'Negative and quantitative constraints filter out standard predictable filler words, focusing the LLM on your specific requirements.'
  },
  {
    id: 'final-q4',
    question: 'What is an "AI hallucination"?',
    options: [
      'A software bug where the screen turns green',
      'When an AI generates plausible-sounding but factually false or completely fabricated statements with high confidence',
      'When an AI takes longer than 10 seconds to respond',
      'When a user types in incorrect grammar'
    ],
    correctIndex: 1,
    explanation: 'Hallucinations occur when a model predicts text that sounds authoritative and grammatically correct but has no factual basis in reality.'
  },
  {
    id: 'final-q5',
    question: 'What is the "Two-Source Rule" recommended for academic and professional research?',
    options: [
      'Always use two different web browsers',
      'Cross-check any statistic, citation, or critical factual claim using at least two independent credible external sources',
      'Ask the AI to print two copies of the answer',
      'Use two computer monitors while studying'
    ],
    correctIndex: 1,
    explanation: 'The Two-Source Rule requires verifying claims against two independent, reputable external records before citing or acting on them.'
  },
  {
    id: 'final-q6',
    question: 'In the Cornell Note-Taking method with AI, what is placed in the left "Recall Cue" column?',
    options: [
      'Full paragraphs copied word-for-word',
      'High-yield keywords, probing questions, and flashcard cues',
      'The author\'s bank account number',
      'A list of all spelling mistakes'
    ],
    correctIndex: 1,
    explanation: 'The Cornell Cue column contains keywords and stimulus questions used for active self-testing during revision.'
  },
  {
    id: 'final-q7',
    question: 'How should a student use AI ethically when preparing for an exam?',
    options: [
      'Paste exam questions into AI during a proctored test to copy answers directly',
      'Use AI as an interactive Socratic tutor, practice test generator, and concept explainer to build deep understanding',
      'Ask AI to hack the college grading server',
      'Submit AI-generated essays without reading them'
    ],
    correctIndex: 1,
    explanation: 'Ethical learning uses AI for formative practice, Socratic inquiry, and feedback, maintaining strict academic integrity.'
  },
  {
    id: 'final-q8',
    question: 'What is the "Rule of 3" for designing high-impact presentation slides with AI?',
    options: [
      'Use 3 colors on every single word',
      'One bold headline, maximum three concise bullet points, and ample whitespace per slide',
      'Each slide must take 3 hours to design',
      'Every presentation must have exactly 3 slides'
    ],
    correctIndex: 1,
    explanation: 'The Rule of 3 keeps slides clean and readable: one clear headline, max three concise bullets (under 10 words each), and high visual clarity.'
  },
  {
    id: 'final-q9',
    question: 'What does BLUF stand for in executive report writing?',
    options: [
      'Bottom Line Up Front',
      'Basic Layout Under Format',
      'Broad Learning Universal Framework',
      'Business Logic User File'
    ],
    correctIndex: 0,
    explanation: 'BLUF stands for "Bottom Line Up Front" — communicating the core conclusion or recommendation at the very start of the document.'
  },
  {
    id: 'final-q10',
    question: 'What is the difference between divergent and convergent thinking in creative problem-solving?',
    options: [
      'Divergent thinking expands outward to generate a high volume of varied ideas; convergent thinking filters and refines the best option',
      'Divergent thinking is done by computers; convergent thinking is done by printers',
      'There is no difference between the two terms',
      'Divergent thinking is only used for mathematics'
    ],
    correctIndex: 0,
    explanation: 'Divergent thinking generates multiple unconventional alternatives; convergent thinking analyzes and selects the strongest solution.'
  },
  {
    id: 'final-q11',
    question: 'What does the Black Hat represent in Edward de Bono\'s Six Thinking Hats framework?',
    options: [
      'Wild optimism and maximum upside',
      'Critical thinking, risk analysis, weaknesses, and identifying why an idea might fail',
      'Pure emotion and intuition',
      'Neutral facts and data'
    ],
    correctIndex: 1,
    explanation: 'The Black Hat provides critical scrutiny, uncovering pitfalls and operational vulnerabilities so they can be mitigated.'
  },
  {
    id: 'final-q12',
    question: 'What is the recommended word limit for a high-converting cold professional email?',
    options: [
      '500 to 1,000 words',
      'Under 100 to 120 words',
      'Exactly 10 words',
      'As long as possible to prove dedication'
    ],
    correctIndex: 1,
    explanation: 'Cold professional emails under 100-120 words respect the reader\'s limited attention and drastically improve response rates.'
  },
  {
    id: 'final-q13',
    question: 'What is Google\'s XYZ formula for drafting high-impact resume bullet points?',
    options: [
      'Accomplished [X] as measured by [Y], by doing [Z]',
      'Execute [X], Yearn [Y], Zip [Z]',
      'Explain [X], Yield [Y], Zero [Z]',
      'Extract [X], Yellow [Y], Zone [Z]'
    ],
    correctIndex: 0,
    explanation: 'The XYZ formula ("Accomplished [X] as measured by [Y], by doing [Z]") highlights concrete outcomes, measurable proof, and the specific methodology.'
  },
  {
    id: 'final-q14',
    question: 'What is the primary danger of using AI to fabricate resume credentials or past job accomplishments?',
    options: [
      'Your printer will run out of ink',
      'Background checks, technical interviews, and reference verifications will uncover the falsehood, leading to immediate disqualification or blacklisting',
      'AI tools will report you to the credit card company',
      'You will be forced to work without pay'
    ],
    correctIndex: 1,
    explanation: 'Falsifying qualifications violates professional ethics and results in failed background checks, termination, or permanent blacklisting.'
  },
  {
    id: 'final-q15',
    question: 'What does the STAR interview technique stand for?',
    options: [
      'Start, Think, Ask, Review',
      'Situation, Task, Action, Result',
      'Strategy, Team, Agreement, Report',
      'System, Technology, Architecture, Reliability'
    ],
    correctIndex: 1,
    explanation: 'STAR stands for Situation (context), Task (goal/challenge), Action (steps YOU executed), and Result (measurable outcome).'
  },
  {
    id: 'final-q16',
    question: 'Which quadrant of the Eisenhower Matrix represents high-leverage activities like skill building and deep strategic planning?',
    options: [
      'Quadrant 1 (Urgent & Important)',
      'Quadrant 2 (Important, Not Urgent - The Sweet Spot)',
      'Quadrant 3 (Urgent, Not Important)',
      'Quadrant 4 (Not Urgent, Not Important)'
    ],
    correctIndex: 1,
    explanation: 'Quadrant 2 is the foundation of long-term success; scheduling time for non-urgent but high-importance activities prevents constant crisis mode.'
  },
  {
    id: 'final-q17',
    question: 'What is the "Billboard Rule" regarding data privacy in AI tools?',
    options: [
      'Always pay for billboards with cryptocurrency',
      'Never paste any sensitive or confidential data into a consumer AI tool that you would not display on a public billboard',
      'Use billboards as background images for zoom calls',
      'Billboards are the only safe way to train AI'
    ],
    correctIndex: 1,
    explanation: 'Because consumer AI tools may retain prompt data for future model training, confidential or personal information must never be entered.'
  },
  {
    id: 'final-q18',
    question: 'What is algorithmic sycophancy in large language models?',
    options: [
      'The ability of AI to write computer code',
      'The tendency of an AI model to flatter or agree with the user\'s incorrect statements instead of delivering objective factual truth',
      'A server communication timeout error',
      'The physical cooling system of data centers'
    ],
    correctIndex: 1,
    explanation: 'Algorithmic sycophancy is when an AI prioritizes pleasing or agreeing with the user over presenting objective truth.'
  },
  {
    id: 'final-q19',
    question: 'In which domains must you NEVER rely solely on AI generation without qualified human professional certification?',
    options: [
      'Drafting ideas for a student party',
      'Medical diagnostics, legal contracts, and safety-critical engineering calculations',
      'Writing a poem about monsoon rains',
      'Creating a fantasy roleplay character'
    ],
    correctIndex: 1,
    explanation: 'Healthcare, jurisprudence, and safety-critical engineering carry immediate risks to life, liberty, and safety, requiring licensed human professionals.'
  },
  {
    id: 'final-q20',
    question: 'What is the legal and academic nature of the VeeGo Certificate of Completion issued at the end of this course?',
    options: [
      'It is a government degree issued by UGC',
      'It is a professional VeeGo course completion and skills assessment certificate validating practical competency, not a government-accredited university degree',
      'It is an international work visa valid in 50 countries',
      'It is an official passport replacement'
    ],
    correctIndex: 1,
    explanation: 'The VeeGo certificate explicitly states it is a verified course completion and assessment certificate issued by VeeGo, maintaining full academic transparency.'
  }
];

export const projectRubricCriteria: ProjectRubricCriterion[] = [
  {
    category: '1. Completeness & Structural Integrity (25%)',
    weight: 25,
    excellent: 'All 4 components fully present: (A) Structured study notes with summary and flashcards, (B) 5-to-8 slide presentation outline with 3-bullet rule and speaker notes, (C) Professional email under 120 words with clear CTA, (D) 5 field-specific prompts with variables and purposes clearly documented.',
    good: 'All 4 components present, with minor missing details (e.g. only 4 prompts submitted or presentation outline lacks speaker notes).',
    satisfactory: '3 out of 4 components submitted; moderate gaps in documentation or structure.',
    needsImprovement: 'Less than 3 components submitted, or components are incomplete fragments lacking substance.'
  },
  {
    category: '2. Accuracy & Fact-Checking Rigor (25%)',
    weight: 25,
    excellent: 'Zero hallucinations. All statistical data, claims, and case study references are cross-verified against primary sources. Includes explicit verification notes showing authentic source links or citations.',
    good: 'High accuracy with minor unverified claims that are generally accepted; no obvious hallucinations or fabricated metrics.',
    satisfactory: 'Contains 1 or 2 questionable statements or vague citations without proper verification notes.',
    needsImprovement: 'Contains obvious AI hallucinations, fabricated research citations, or unverified statistical claims.'
  },
  {
    category: '3. Practical Usefulness & Craft (25%)',
    weight: 25,
    excellent: 'Deliverables are highly actionable, realistic, and ready for immediate deployment in academia or corporate workplace. Writing is crisp, active voice, free of robotic AI clichés, and tailored to the intended audience.',
    good: 'Practical and well-written, with minor instances of generic phrasing or slightly wordy slide bullets.',
    satisfactory: 'Adequate utility, but suffers from noticeable "AI flavor" (e.g. "I hope this email finds you well" or passive walls of text on slides).',
    needsImprovement: 'Theoretical, generic, or robotic content with little practical real-world utility.'
  },
  {
    category: '4. Responsible AI & Ethical Prompting (25%)',
    weight: 25,
    excellent: 'Exemplary privacy and ethics: All PII and confidential details scrubbed. Honest presentation of credentials without fabrication. Transparent AI disclosure statement in APA/IEEE format included.',
    good: 'Good privacy hygiene with anonymized details; no resume fabrication; basic AI attribution note provided.',
    satisfactory: 'Minor privacy oversights (e.g. left real phone number or email) or missing formal AI disclosure footnote.',
    needsImprovement: 'Violates ethical standards: contains fabricated job experience/degrees, exposed confidential data, or claims AI work as 100% unaided human writing without disclosure.'
  }
];
