import { LessonContent } from './aiToolsCourseData';

export const LESSON_3: LessonContent = {
  id: 'aitools_lesson3',
  lessonNumber: 3,
  moduleId: 'aitools_module2',
  moduleTitle: 'Module 2: Prompt Engineering Basics (40 min)',
  title: 'Lesson 3: Understanding Prompts',
  durationMinutes: 20,
  learningObjectives: [
    'Understand what a prompt is and why prompt quality determines output quality.',
    'Analyze the difference between weak prompts and high-leverage prompts.',
    'Master the 5 core ingredients of a professional prompt: Role, Context, Task, Constraints, and Output Format.',
    'Avoid common prompt traps like ambiguity, lack of negative constraints, and missing audience definition.'
  ],
  trainerScript: `Welcome to Module 2, Lesson 3! Today, we unlock the single most valuable skill in the modern digital workplace: Prompt Engineering.

What is a prompt?
A prompt is simply the instruction, question, or text that you enter into an AI model. Many people say: "I tried ChatGPT once, and it gave me a very boring, generic answer. AI is overhyped."

When I look at what they typed, it was usually something like:
"Write an email about sales." or "Explain economics."

Imagine you are a manager at an IT company in Chennai or Bengaluru, and an intern walks into your cabin on Monday morning. If you tell the intern: "Do some work on sales," what will they do? They will stare at you blankly or produce something completely irrelevant!
But if you say:
"Act as an enterprise software sales executive. We are offering an automated inventory billing software to medium retail supermarket chains in Tamil Nadu. Write a 150-word introductory email to the store owner highlighting 3 benefits: GST invoice compliance, reduction of cashier theft, and WhatsApp bills. Keep the tone warm and professional, and end with an invitation for a 10-minute demo this Thursday."

Notice the dramatic difference! In the second instruction, the intern — or the AI — knows:
1. Who they are (Role)
2. What the background is (Context)
3. Exactly what needs to be done (Task)
4. What rules must be respected (Constraints)
5. How the final result should look (Output Format)

This is the famous **R-C-T-C-F Framework**:
- **R (Role)**: Who should the AI pretend to be? A college professor? An HR director? An IELTS examiner?
- **C (Context)**: What background details are needed? Who is the audience? Where is this taking place?
- **T (Task)**: What is the specific action verb? Summarize, extract, debate, rewrite, critique.
- **C (Constraints)**: What should the AI NOT do? Word count limits, tone restrictions, things to avoid.
- **F (Format)**: Markdown table, bulleted list, email draft with subject line, or flashcards.

When you incorporate these five ingredients, the AI transforms from a generic toy into an executive-level productivity engine. In our demonstration, we will take a weak prompt and turn it into gold step-by-step.`,
  demonstrationInstructions: [
    'Open ChatGPT or Google Gemini side-by-side.',
    'Enter Weak Prompt: "Give me study tips."',
    'Inspect the result: generic, bland tips like "sleep well and drink water."',
    'Now rewrite using the RCTCF Framework:',
    '"Role: Experienced university academic counselor in India.',
    'Context: 3rd year engineering student studying for 6 university semester theory exams starting in 14 days.',
    'Task: Create a daily 4-hour revision timetable using active recall and the Pomodoro technique.',
    'Constraints: Do not give general wellness advice; focus only on study scheduling. Avoid late-night study after 11 PM.',
    'Format: A clean markdown table with columns: Time Slot, Activity, Technique."',
    'Compare the two outputs side-by-side on screen.'
  ],
  practicalExamples: [
    {
      title: 'Job Search: Cover Letter Transformation',
      scenario: 'Naveen, a BCA graduate from Madurai, needs a cover letter for a Junior Frontend Developer role at a SaaS startup.',
      aiWorkflow: 'Weak prompt ("Write a cover letter for IT job") produces a robotic, cliché letter. Naveen applies RCTCF: specifies the role (Senior Tech Recruiter), context (fresher with 2 React projects on GitHub), constraints (no fake experience, maximum 180 words), format (Subject line + 3 short paragraphs).',
      result: 'The output is specific, mentions Naveen\'s actual projects, and sounds authentic rather than machine-generated.'
    },
    {
      title: 'Teacher: Quiz Creation',
      scenario: 'Mrs. Lakshmi teaches 9th standard CBSE Science. She needs 5 thought-provoking questions on Newton\'s Laws of Motion.',
      aiWorkflow: 'Lakshmi prompts: "Role: Experienced CBSE Physics Teacher. Task: Create 5 scenario-based multiple-choice questions testing Newton\'s Third Law using cricket, swimming, and rocket launches. Format: Question, 4 options, and a 2-line explanation of the common misconception."',
      result: 'Lakshmi gets exam-ready classroom materials in 10 seconds that test genuine comprehension rather than rote memory.'
    }
  ],
  prompts: [
    {
      title: 'The Master RCTCF Universal Template',
      category: 'Framework',
      promptText: 'Act as a [Role].\nContext: [Explain the background, target audience, and situation].\nTask: [Specify the exact action verb and goal].\nConstraints: [Word limit, tone, things to strictly exclude].\nOutput Format: [Table, bullet points, email, or numbered list].',
      variables: ['[Role]', '[Explain background]', '[Specify goal]', '[Word limit/tone]', '[Format]'],
      intendedPurpose: 'A versatile foundation prompt for any high-quality task.'
    },
    {
      title: 'Prompt Diagnostic Improver',
      category: 'Prompt Engineering',
      promptText: 'Here is my draft prompt: "[My Draft Prompt]". Critique this prompt: 1) What is ambiguous? 2) What missing context would cause generic responses? 3) Rewrite this into an optimized professional prompt.',
      variables: ['[My Draft Prompt]'],
      intendedPurpose: 'Use AI to audit and elevate your own prompt writing skills.'
    },
    {
      title: 'Audience Tone Calibrator',
      category: 'Communication',
      promptText: 'Explain [Topic] to three distinct audiences: 1) A 10-year-old child using a playground analogy, 2) A 20-year-old college student using social media or sports analogies, 3) A corporate CEO using business return-on-investment (ROI) terminology.',
      variables: ['[Topic]'],
      intendedPurpose: 'Master audience-tailored language and conceptual clarity.'
    },
    {
      title: 'Negative Constraint Enforcer',
      category: 'Drafting',
      promptText: 'Draft a response on [Topic]. Strict negative constraints:\n- Do NOT use buzzwords like "delve", "tapestry", "unleash", or "testament".\n- Do NOT exceed 120 words.\n- Do NOT write an introductory pleasantry or concluding summary.',
      variables: ['[Topic]'],
      intendedPurpose: 'Eliminate repetitive AI clichés and filler text.'
    },
    {
      title: 'Perspective Red Teaming (Counter-Arguments)',
      category: 'Critical Thinking',
      promptText: 'I believe that [My Thesis/Idea]. Act as a critical, skeptical Devil\'s Advocate. Provide the top 3 strongest counter-arguments against my idea that I must be prepared to defend.',
      variables: ['[My Thesis/Idea]'],
      intendedPurpose: 'Stress-test project plans, business ideas, or debate arguments.'
    }
  ],
  studentActivity: {
    title: 'Transform a Weak Prompt into an RCTCF Masterpiece',
    description: 'Take a weak one-line prompt and rebuild it using the 5-part framework.',
    steps: [
      'Take this weak prompt: "Write an email about leave."',
      'Define the 5 elements: Role (Software Engineer), Context (Viral fever, project deadline next Tuesday, backup teammate identified), Task (Request 2 days sick leave), Constraints (Professional, polite, under 100 words), Format (Standard workplace email).',
      'Run both prompts in your AI tool and save both outputs.',
      'Compare the two outputs side-by-side.'
    ],
    submissionExpected: 'A comparison screenshot or text snippet showing the generic output versus the RCTCF output.'
  },
  keyTakeaways: [
    'Prompt engineering is the art of giving structured, unambiguous instructions to AI.',
    'Weak prompts generate generic, uninspired filler; detailed prompts produce high-impact results.',
    'Always remember the RCTCF Framework: Role, Context, Task, Constraints, Format.',
    'Negative constraints (what NOT to do) are just as powerful as positive instructions.'
  ],
  suggestedVisuals: [
    'A 5-part jigsaw puzzle graphic highlighting R-C-T-C-F.',
    'Side-by-side on-screen text comparison: Vague 5-word prompt output vs Engineered 50-word prompt output.',
    'Highlighting box showing words AI loves to overuse (e.g. "delve", "tapestry", "unleash") and how to ban them.'
  ],
  downloadableNotes: `# Lesson 3 Notes: Understanding Prompts & The RCTCF Framework

### 1. The Core Equation
$$\\text{Output Quality} = \\text{Prompt Clarity} \\times \\text{Context Specificity}$$

### 2. The RCTCF 5-Element Framework
1. **Role**: The persona, experience level, and perspective the model should adopt.
   - *Example*: "Act as a Senior HR Manager with 10 years of experience in Indian IT companies."
2. **Context**: Background details, scenario constraints, and target recipient.
   - *Example*: "Our company is shifting from 5 days work-from-home to a hybrid 3-days in office model."
3. **Task**: The specific, measurable goal using action verbs.
   - *Example*: "Draft an internal announcement memo explaining the rationale and transition timeline."
4. **Constraints**: Boundaries, word count, prohibited phrases, and tone rules.
   - *Example*: "Maximum 200 words. Keep tone empathetic and constructive. Do not use threats or punitive language."
5. **Format**: The structural presentation of the response.
   - *Example*: "Format with a clear subject line, 3 short paragraphs, and a bulleted FAQ section."

### 3. Red Flags in Weak Prompts
- Single-sentence instructions without audience context.
- Omitting desired output length (resulting in overly long essays).
- Forgetting to specify tone (e.g., informal vs. corporate formal).`,
  quiz: [
    {
      id: 'l3_q1',
      question: 'What is "Prompt Engineering" in the context of Generative AI?',
      options: [
        'Writing low-level C++ assembly code for microprocessors.',
        'The practice of designing, structuring, and refining text inputs to guide an AI model toward optimal, accurate outputs.',
        'Fixing hardware broken screens on mobile phones.',
        'Building electrical generators for data centers.'
      ],
      correctIndex: 1,
      explanation: 'Prompt engineering involves structuring prompts with role, context, constraints, and formatting instructions to obtain precise AI results.'
    },
    {
      id: 'l3_q2',
      question: 'In the RCTCF Framework, what does the "C" in Constraints refer to?',
      options: [
        'Connecting the computer to high-speed fiber internet.',
        'Rules, boundaries, word limits, or specific things the AI must strictly NOT do.',
        'Copying and pasting text five times.',
        'Closing the browser tab after 2 minutes.'
      ],
      correctIndex: 1,
      explanation: 'Constraints specify the boundaries such as word counts, prohibited cliches, and tone rules that the model must respect.'
    },
    {
      id: 'l3_q3',
      question: 'Which of the following is considered a WEAK prompt?',
      options: [
        '"Act as a career counselor. Review this 150-word resume summary for an entry-level accountant and suggest 3 bullet-point improvements."',
        '"Write an essay on global warming in 300 words for 8th-grade students with 3 actionable tips."',
        '"Write a letter."',
        '"Summarize the attached contract in a 2-column table comparing payment obligations and penalty clauses."'
      ],
      correctIndex: 2,
      explanation: '"Write a letter" contains no role, context, recipient, purpose, length, or format, leading to completely generic output.'
    },
    {
      id: 'l3_q4',
      question: 'Why are negative constraints (e.g., "Do not use buzzwords like delve or tapestry") useful in prompts?',
      options: [
        'They break the AI computer server.',
        'They prevent the AI from generating repetitive, cliché filler words and keep the language natural and authentic.',
        'They increase the battery life of your smartphone.',
        'They prevent the user from typing in English.'
      ],
      correctIndex: 1,
      explanation: 'Negative constraints prevent the model from defaulting to generic, robotic phrasing and overused AI buzzwords.'
    },
    {
      id: 'l3_q5',
      question: 'What happens when you explicitly define the "Output Format" (e.g., markdown table, numbered list)?',
      options: [
        'The AI generates a messy wall of unbroken paragraphs.',
        'The AI structures the response directly in the layout you need, saving manual reformatting time.',
        'The AI tool charges double fee for tables.',
        'The browser automatically prints the page.'
      ],
      correctIndex: 1,
      explanation: 'Specifying the output format ensures the output is instantly usable (e.g., in spreadsheets, presentations, or emails) without manual reformatting.'
    }
  ]
};

export const LESSON_4: LessonContent = {
  id: 'aitools_lesson4',
  lessonNumber: 4,
  moduleId: 'aitools_module2',
  moduleTitle: 'Module 2: Prompt Engineering Basics (40 min)',
  title: 'Lesson 4: Writing Better Prompts',
  durationMinutes: 20,
  learningObjectives: [
    'Apply the iterative prompting loop: Draft -> Evaluate -> Refine -> Finalize.',
    'Use follow-up questioning techniques to drill down into complex topics.',
    'Fix inaccurate, incomplete, or hallucinated AI responses on the fly.',
    'Master 5 real-world practical prompt exercises across student and workplace scenarios.'
  ],
  trainerScript: `Welcome to Lesson 4! In our last lesson, we mastered the RCTCF ingredients. Today, we learn how to converse with AI through the **Iterative Prompting Loop**.

Here is a common beginner mistake: someone types one prompt, receives a response that is 80% good, gets frustrated by the 20% that isn't right, and deletes the entire conversation to start over!

Remember: Conversational AI is an interactive dialogue. Think of it like sculpting clay. You do not expect the entire statue on the first strike of the chisel. You shape the rough form, step back, and refine it.

The 4-Step Iterative Loop:
1. **Draft**: Enter your initial structured RCTCF prompt.
2. **Evaluate**: Read the output critically. What is good? What is too wordy? What feels robotic? What is missing?
3. **Refine**: Give precise corrective feedback in your next message. For example:
   - "Great draft, but paragraph 2 sounds too informal. Rewrite paragraph 2 to sound more corporate."
   - "Cut the length in half and present points 3 and 4 as a bulleted checklist."
   - "You mentioned a statistics figure of 74%. What is the source or calculation for this number?"
4. **Finalize**: Polish the response and copy it into your work document or study notes.

How do you handle incomplete or inaccurate answers?
If the AI gives you a vague answer, do not repeat the same question. Use the **Constraint Tightener**:
"You answered at a very high level. Now zoom in specifically on the procedural steps taken in Tamil Nadu/India under Section 12."

In this lesson, we will execute five hands-on prompt exercises that will immediately upgrade your daily workflow.`,
  demonstrationInstructions: [
    'Start a fresh chat in ChatGPT or Gemini.',
    'Prompt: "Draft a 1-page proposal for a college technical symposium called TECHFEST 2026."',
    'Inspect the first output: Notice it has general headings.',
    'Demonstrate Follow-up 1 (Refining): "Make this proposal specific to an engineering college in Coimbatore with a total budget of ₹1,50,000 across 3 events: Web Design Hackathon, Paper Presentation, and Robotics."',
    'Demonstrate Follow-up 2 (Formatting): "Convert the budget section into a markdown table with columns: Event Name, Expected Participants, Prize Money, Logistics, Total."',
    'Demonstrate Follow-up 3 (Tone adjustment): "Now write the formal invitation letter to the College Principal requesting permission for this proposal, keeping it under 150 words."'
  ],
  practicalExamples: [
    {
      title: 'Office Meeting Action Item Extraction',
      scenario: 'Rohit recorded a messy, 400-word voice note transcript of an internal team review with his manager and two developers.',
      aiWorkflow: 'Rohit pastes the transcript into Gemini and prompts: "Extract a clean table of Action Items from this transcript with columns: Owner, Action Item, Target Deadline, and Priority (High/Med/Low). If a deadline was not mentioned, mark as To be Decided."',
      result: 'In 4 seconds, Rohit has a clean, professional meeting tracker to paste into Slack or Microsoft Teams.'
    },
    {
      title: 'Exam Question Paper Solution Verification',
      scenario: 'Divya is solving previous year university questions in Operating Systems. She solved a deadlock avoidance problem using Banker\'s Algorithm and wants to verify her step-by-step logic.',
      aiWorkflow: 'Divya types her matrix allocation table and requests: "Review my calculations step by step for the Banker\'s Algorithm. Do not just say Correct; verify if the system is in a Safe State and show the safe sequence."',
      result: 'The AI checks her matrix math, verifies the safe sequence, and flags one subtraction error in her Need Matrix.'
    }
  ],
  prompts: [
    {
      title: 'Prompt Exercise 1: Meeting Minutes to Action Tracker',
      category: 'Productivity',
      promptText: 'Analyze the following raw meeting transcript. Extract: 1) Executive Summary (3 bullets), 2) Action Items table with Columns: Task, Owner, Deadline, 3) Open Questions not yet resolved:\n\n"[Paste Meeting Notes]"',
      variables: ['[Paste Meeting Notes]'],
      intendedPurpose: 'Turn unstructured discussion into disciplined execution.'
    },
    {
      title: 'Prompt Exercise 2: Fact & Citation Stress-Tester',
      category: 'Verification',
      promptText: 'In the previous response, you stated that [Specific Fact/Claim]. 1) Confirm whether this is an established fact or an estimation, 2) Identify the primary authoritative source, 3) If uncertain, state explicitly that you cannot verify it.',
      variables: ['[Specific Fact/Claim]'],
      intendedPurpose: 'Challenge and cross-examine potential hallucinations.'
    },
    {
      title: 'Prompt Exercise 3: Text Shrinker & Executive Summary',
      category: 'Communication',
      promptText: 'Compress the following text into exactly 3 punchy bullet points without losing any vital numbers, names, or deadlines. Total word count must not exceed 60 words:\n\n"[Paste Text]"',
      variables: ['[Paste Text]'],
      intendedPurpose: 'Drastically reduce reading time for busy managers and clients.'
    },
    {
      title: 'Prompt Exercise 4: Socratic Tutor Mode',
      category: 'Learning',
      promptText: 'Act as a Socratic tutor teaching me [Subject]. Do NOT give me the direct answers immediately. Instead, ask me one challenging question at a time, wait for my response, and guide me to discover the correct principle on my own.',
      variables: ['[Subject]'],
      intendedPurpose: 'Active learning that builds genuine deep understanding.'
    },
    {
      title: 'Prompt Exercise 5: Professional Tone Polisher',
      category: 'Writing',
      promptText: 'I wrote this rough message to my senior manager: "[My Message]". Rewrite this into 3 alternative tones: 1) Formal & Respectful, 2) Direct & Collaborative, 3) Gentle Reminder. Keep all three under 75 words.',
      variables: ['[My Message]'],
      intendedPurpose: 'Ensure diplomatic, respectful workplace communication.'
    }
  ],
  studentActivity: {
    title: 'Complete the 3-Turn Dialogue Drill',
    description: 'Execute an iterative prompt dialogue that spans at least 3 sequential refinement messages.',
    steps: [
      'Turn 1: Ask AI to outline a 3-month skill development plan for learning Data Analytics or Digital Marketing.',
      'Turn 2: Refine the output by adding constraints: "Customize this plan for a working professional who can only dedicate 1 hour on weekdays and 3 hours on Sundays. Focus heavily on free tools."',
      'Turn 3: Request final formatting: "Convert Month 1 into a week-by-week calendar with realistic milestones and weekend mini-projects."',
      'Review how the output matured from a generic list into a realistic, personalized calendar.'
    ],
    submissionExpected: 'Submit the full 3-turn chat transcript demonstrating your progressive refinement.'
  },
  keyTakeaways: [
    'AI is an iterative conversation; never stop at the first raw response.',
    'Use specific follow-ups ("make it punchier", "reduce by 50%", "add an example") to guide the model.',
    'When numbers or statistics are mentioned, explicitly prompt the model to identify its source.',
    'Socratic questioning prompts turn AI into an active personal tutor rather than an answer-copying machine.'
  ],
  suggestedVisuals: [
    'Diagram of the 4-step loop: Draft -> Evaluate -> Refine -> Finalize.',
    'Side-by-side animation showing Turn 1, Turn 2, and Turn 3 text evolution.',
    'Visual comparison of passive consumption vs Socratic guided dialogue.'
  ],
  downloadableNotes: `# Lesson 4 Notes: Writing Better Prompts & The Iterative Dialogue Loop

### 1. The Iterative Refinement Technique
Never abandon a chat after Turn 1. Use targeted follow-ups:
- **Scope Trimming**: "Remove section 3 and expand section 1 with 2 examples."
- **Tone Calibration**: "Make this sound more empathetic and less bureaucratic."
- **Length Constraint**: "Condense this entire document to under 150 words."
- **Data Verification**: "Are these statistics estimated or official? What organization published them?"

### 2. The Five Essential Everyday Prompt Patterns
1. **The Synthesizer**: Unstructured text $\\rightarrow$ Structured action table.
2. **The Stress-Tester**: Statements $\\rightarrow$ Source cross-examination.
3. **The Executive Condenser**: Long reports $\\rightarrow$ 60-word executive brief.
4. **The Socratic Mentor**: Asking guided questions rather than feeding answers.
5. **The Diplomatic Polisher**: Converting blunt thoughts into respectful workplace emails.

### 3. Golden Rule
*The quality of your output is directly proportional to your willingness to refine the conversation through follow-ups.*`,
  quiz: [
    {
      id: 'l4_q1',
      question: 'What is the most effective approach when an initial AI response is slightly too informal or lengthy?',
      options: [
        'Close the browser and give up on AI entirely.',
        'Send a targeted follow-up prompt specifying the adjustments needed (e.g., "Make tone formal and cut word count by 40%").',
        'Type your original prompt in all capital letters.',
        'Reboot your computer.'
      ],
      correctIndex: 1,
      explanation: 'AI models maintain conversational context; sending targeted follow-up instructions sculpts the response to your exact specifications.'
    },
    {
      id: 'l4_q2',
      question: 'What does the "Socratic Tutor" prompting method achieve for students?',
      options: [
        'It writes exam cheat sheets automatically.',
        'It refuses to do anything.',
        'It guides the student by asking sequential questions, forcing active recall and deeper understanding rather than spoon-feeding answers.',
        'It speaks ancient Greek only.'
      ],
      correctIndex: 2,
      explanation: 'Socratic prompting guides learners through sequential questions, encouraging active critical thinking.'
    },
    {
      id: 'l4_q3',
      question: 'If an AI assistant provides a surprising statistical figure (e.g., "89% of small businesses in India fail in year one"), what should your immediate next prompt be?',
      options: [
        'Believe it immediately without question.',
        'Ask the AI to confirm whether this is verified data, cite the primary publishing institution, or search live web sources.',
        'Post it immediately on LinkedIn as an absolute fact.',
        'Shut down your laptop.'
      ],
      correctIndex: 1,
      explanation: 'Always cross-examine specific data points and request primary institutional sources to filter out hallucinations.'
    },
    {
      id: 'l4_q4',
      question: 'In the iterative prompt loop (Draft -> Evaluate -> Refine -> Finalize), what takes place during the "Evaluate" stage?',
      options: [
        'The user pays an online fee.',
        'The user critically reviews the draft against accuracy, tone, word count, and required goals.',
        'The computer scans your biometric fingerprint.',
        'The AI reviews your internet browsing history.'
      ],
      correctIndex: 1,
      explanation: 'Evaluation is the critical human judgment step where you review the output for accuracy, tone, and completeness before refining.'
    },
    {
      id: 'l4_q5',
      question: 'Why is conversational context retention in tools like ChatGPT and Gemini beneficial?',
      options: [
        'It allows follow-up prompts to reference previous messages without needing to repeat the entire background story.',
        'It stores all your passwords publicly.',
        'It increases the font size automatically.',
        'It changes the color of your screen.'
      ],
      correctIndex: 0,
      explanation: 'Conversational memory retains context within the session, enabling iterative refinements without re-pasting background data.'
    }
  ]
};

export const module2Lessons: LessonContent[] = [LESSON_3, LESSON_4];
