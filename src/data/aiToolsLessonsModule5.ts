import { LessonContent } from './aiToolsCourseData';

export const module5Lessons: LessonContent[] = [
  {
    id: 'lesson-11',
    lessonNumber: 11,
    moduleId: 'module-5',
    moduleTitle: 'Module 5: AI for Professional Productivity',
    title: 'Professional Email Writing',
    durationMinutes: 13,
    learningObjectives: [
      'Draft polite, unambiguous corporate and academic emails in seconds using context-rich prompts',
      'Master key professional email formats: cold job outreach, interview follow-ups, and project status updates',
      'Dynamically adjust emotional tone (assertive, apologetic, diplomatic, encouraging) across stakeholder levels',
      'Write compelling subject lines that achieve high open and response rates without clickbait',
      'Avoid common AI email red flags: unnatural robotic pleasantries, redundant paragraphs, and generic fluff'
    ],
    trainerScript: `Welcome to Lesson 11! Today we tackle a daily communication challenge: writing professional emails.

Surveys show that working professionals spend an average of 2.5 hours every day reading and writing emails! For students and early-career job seekers, sending an email to a senior manager, professor, or recruiter often triggers anxiety. You wonder: Is this too casual? Is this too rude? Did I sound desperate?

When people use AI for email writing naively, they prompt: "Write an email asking for an internship." The result? A three-paragraph, robotic essay beginning with "I hope this email finds you well and in high spirits" that screams "I copied this straight from ChatGPT!" Experienced recruiters delete these within two seconds.

The secret to professional AI emails is the 3-Sentence Micro-Email Principle:
1. State the purpose clearly in line 1.
2. Provide the key proof point or contextual detail in line 2.
3. State the exact call to action with low friction in line 3.

In this lesson, we will learn how to prompt AI to generate lean, respectful, high-converting emails. We will master cold applications, gentle follow-ups for unpaid invoices or unanswered messages, and diplomatic escalation when deadlines are at risk.

Let us jump into the practical demonstration!`,
    demonstrationInstructions: [
      'Open ChatGPT or Gemini in your browser.',
      'Demonstrate a poor prompt: "Write an email following up on my job interview." Analyze why the response is bloated and generic.',
      'Demonstrate the engineered prompt: "Act as an executive communication coach. Draft a 4-sentence follow-up email after a second-round interview with [Company]. Recruiter name: Priya. Mention: enjoyed discussing their expansion into cloud migration. Reiterate enthusiasm. Ask politely about next steps. Zero clichés."',
      'Compare both versions: show how the second version sounds natural, authentic, and polite.',
      'Show how to run a "Tone Transformation": turn an emotional, frustrated email regarding a delayed project into a calm, solution-oriented diplomatic memo.',
      'Generate 3 high-converting subject lines for the email.'
    ],
    practicalExamples: [
      {
        title: 'Cold Outreach to a Startup Founder for Summer Internship',
        scenario: 'A 3rd-year engineering student in Bengaluru wants to reach out to the founder of a clean-tech startup on LinkedIn/Email.',
        aiWorkflow: 'Used the "High-Value Cold Outreach" prompt: "Write a 90-word cold email to a startup founder. Reference their recent podcast on solar grid efficiency. Mention I built an open-source solar tracker in Arduino with a GitHub link. Ask for a brief 10-minute call next Tuesday or Wednesday."',
        result: 'The founder replied within 24 hours praising the specific reference and schedule clarity, leading to an interview.'
      },
      {
        title: 'Tactful Payment Follow-Up for a Freelancer',
        scenario: 'A freelance graphic designer has an invoice overdue by 14 days from a corporate client. They want to be firm without burning the relationship.',
        aiWorkflow: 'Used the "Diplomatic Escalation" prompt: "Draft a polite but firm payment follow-up email. Invoice #1042 was due on Oct 1st. Maintain a warm partnership tone, attach invoice reference, and ask them to confirm the processing date by end of week."',
        result: 'Client apologized for internal finance department delays and processed the payment within 48 hours.'
      }
    ],
    prompts: [
      {
        title: 'High-Impact Cold Job / Internship Outreach',
        category: 'Career Outreach',
        promptText: 'Act as a senior career strategist. Draft a concise, high-converting cold email (under 120 words) reaching out to [RECIPIENT NAME], who is [RECIPIENT ROLE] at [COMPANY NAME].\nKey details to weave in naturally:\n- How I discovered their work: [SPECIFIC RECENT INITIATIVE / ARTICLE]\n- My background & relevant project: [MY BACKGROUND & PROOF OF WORK]\n- Clear, low-friction ask: [ASK, e.g., 10-min virtual coffee chat]\nConstraints: No generic phrases like "hope this finds you well". Be humble, sharp, and authentic.',
        variables: ['[RECIPIENT NAME]', '[RECIPIENT ROLE]', '[COMPANY NAME]', '[SPECIFIC RECENT INITIATIVE / ARTICLE]', '[MY BACKGROUND & PROOF OF WORK]', '[ASK]'],
        intendedPurpose: 'Generates brief, personalized cold outreach emails that stand out from mass spam.'
      },
      {
        title: 'Diplomatic Follow-Up (Unanswered Messages)',
        category: 'Follow-ups',
        promptText: 'Draft a polite, professional follow-up email regarding an earlier message sent on [DATE] about [TOPIC/REQUEST].\nRecipient: [RECIPIENT NAME & ROLE].\nTone: Courteous, respectful of their busy schedule, but with a gentle nudge.\nConstraint: Keep it under 60 words. Provide an easy out so they do not feel guilty, but make replying with a "yes/no/later" take less than 10 seconds.',
        variables: ['[DATE]', '[TOPIC/REQUEST]', '[RECIPIENT NAME & ROLE]'],
        intendedPurpose: 'Follows up on unanswered messages with zero awkwardness or guilt.'
      },
      {
        title: 'Executive Tone Calibrator (Frustrated to Diplomatic)',
        category: 'Tone Transformation',
        promptText: 'Here is a rough, emotionally frustrated draft I wrote regarding a workplace issue:\n"[PASTE RAW EMOTIONAL DRAFT]"\nRewrite this email for [RECIPIENT ROLE]. Transform emotional venting into calm, constructive, solutions-oriented executive language. Address the core bottleneck, state the impact on deadlines, propose two concrete remedies, and request an alignment meeting.',
        variables: ['[PASTE RAW EMOTIONAL DRAFT]', '[RECIPIENT ROLE]'],
        intendedPurpose: 'Prevents career-limiting emails by converting frustration into diplomatic, constructive negotiation.'
      },
      {
        title: 'Subject Line Generator (3 Options: Direct, Value, Curiosity)',
        category: 'Open Rates',
        promptText: 'Based on this email draft:\n"[PASTE EMAIL DRAFT]"\nGenerate 5 subject lines categorized by style:\n1. Direct & Urgent (Best for internal team & managers)\n2. Value-First (Best for recruiters and prospects)\n3. Polite & Personal (Best for mentors and professors).\nConstraint: All subject lines must be under 7 words.',
        variables: ['[PASTE EMAIL DRAFT]'],
        intendedPurpose: 'Generates subject lines that boost open rates while matching professional context.'
      },
      {
        title: 'Meeting Request with Pre-Set Agenda',
        category: 'Scheduling',
        promptText: 'Draft a meeting request email to [RECIPIENT NAME].\nPurpose of meeting: [PURPOSE, e.g., review semester thesis progress / finalize Q4 marketing budget].\nProposed time: 25 minutes (respecting their time).\nInclude a clean 3-bullet agenda of exact discussion points and attach required preparation materials. Offer two concrete time slots in IST.',
        variables: ['[RECIPIENT NAME]', '[PURPOSE]'],
        intendedPurpose: 'Schedules productive meetings with upfront agendas so attendees come prepared.'
      }
    ],
    studentActivity: {
      title: 'Write a Tailored Professional Email',
      description: 'Choose a real situation: requesting a letter of recommendation from a professor, following up with a recruiter, or proposing an idea to your manager. Use AI to draft, tone-check, and finalize the email.',
      steps: [
        'Select your real-world communication scenario.',
        'Apply the High-Impact Outreach or Meeting Request prompt with your actual details.',
        'Run the Tone Calibrator to ensure it sounds like your authentic human voice.',
        'Verify subject line and check for zero clichés.',
        'Save this email as part of your Practical Task 3 portfolio.'
      ],
      submissionExpected: 'A final professional email draft including subject line, body, and intended recipient context.'
    },
    keyTakeaways: [
      'Brevity is respect: Keep professional emails under 120 words whenever possible.',
      'Delete generic AI openings like "I hope this email finds you well"; lead with purpose immediately.',
      'Use the 3-Sentence Principle: Purpose -> Proof/Context -> Low-friction Call to Action.',
      'Always test your email against the Tone Calibrator before sending sensitive or difficult messages.',
      'Never send an AI email without proofreading your own name, dates, and attachment references.'
    ],
    suggestedVisuals: [
      'Visual breakdown: Anatomy of a High-Converting Email (Hook, Value, Proof, Easy CTA)',
      'Side-by-side comparison: "Fluffy AI email (250 words)" vs "Punchy Executive email (85 words)"',
      'The 3-Sentence Micro-Email Formula infographic'
    ],
    downloadableNotes: `# VeeGo AI LMS - Lesson 11 Cheatsheet: Professional Email Writing

## 1. The 3-Sentence Formula
- **Sentence 1 (The Why)**: "I am writing to share our updated prototype for the campus solar tracker."
- **Sentence 2 (The Proof)**: "Following our discussion last Thursday, we reduced sensor latency by 35%."
- **Sentence 3 (The Ask)**: "Would you have 10 minutes this Wednesday between 3 PM and 5 PM IST for a quick review?"

## 2. Words to Erase from AI Emails
- "I hope this email finds you well" -> *Start directly with purpose*
- "Please do not hesitate to reach out" -> *Use "Feel free to ping me"*
- "Delighted / Thrilled to connect" -> *Keep enthusiasm natural*
- "In order to facilitate" -> *Use "To help"*
`,
    quiz: [
      {
        id: 'q11-1',
        question: 'Why do seasoned recruiters and executives often dislike raw AI-generated emails?',
        options: [
          'Because AI uses fonts they cannot open',
          'Because raw AI emails tend to be wordy, overly formal, and filled with generic clichés like "I hope this email finds you well"',
          'Because AI emails automatically self-delete after 24 hours',
          'Because AI emails are always written in French'
        ],
        correctIndex: 1,
        explanation: 'Unedited AI emails suffer from excessive fluff, artificial pleasantries, and lack of genuine personal context.'
      },
      {
        id: 'q11-2',
        question: 'What is the recommended word limit for a high-converting cold professional email?',
        options: [
          '500 to 800 words',
          'Under 100 to 120 words',
          'Exactly 1 word',
          'No limit, the longer the better'
        ],
        correctIndex: 1,
        explanation: 'Busy executives read emails on smartphones. Keeping cold messages under 100-120 words respects their time and boosts reply rates.'
      },
      {
        id: 'q11-3',
        question: 'What is a "low-friction" call to action (CTA) in a meeting request email?',
        options: [
          'Asking them to prepare a 50-page presentation before meeting you',
          'Asking for a brief 10-15 minute discussion with two specific time options to choose from',
          'Demanding they call you immediately on your personal cell phone',
          'Asking them to fly to your city'
        ],
        correctIndex: 1,
        explanation: 'Offering two concrete, brief time slots (e.g., "10 minutes Wednesday at 3 PM or 4 PM") makes saying yes effortless.'
      },
      {
        id: 'q11-4',
        question: 'When using AI to rewrite an emotionally charged email, what is the primary goal?',
        options: [
          'To make the email sound passive-aggressive',
          'To convert frustration into calm, diplomatic, solution-oriented professional phrasing',
          'To accuse the other party in legal terms',
          'To delete the other person from the company'
        ],
        correctIndex: 1,
        explanation: 'The tone calibrator helps remove emotional defensiveness, focusing instead on objective facts, impact, and actionable solutions.'
      },
      {
        id: 'q11-5',
        question: 'Before hitting Send on an AI-assisted email, what is the sender\'s ethical and professional responsibility?',
        options: [
          'Proofread names, dates, links, and ensure the tone reflects their authentic intent and truth',
          'Add a disclaimer that AI made all decisions',
          'Forward it to 10 colleagues first',
          'Nothing, AI output is always 100% ready'
        ],
        correctIndex: 0,
        explanation: 'The human sender is always responsible for the communication. Verifying recipient names, links, attachments, and accuracy is mandatory.'
      }
    ]
  },
  {
    id: 'lesson-12',
    lessonNumber: 12,
    moduleId: 'module-5',
    moduleTitle: 'Module 5: AI for Professional Productivity',
    title: 'AI for Resumes and Interviews',
    durationMinutes: 14,
    learningObjectives: [
      'Transform weak resume duty statements into quantifiable XYZ achievements (Accomplished [X] as measured by [Y] by doing [Z])',
      'Systematically tailor resumes to job descriptions (JDs) using keyword matching without keyword stuffing',
      'Generate realistic company-specific technical and behavioral interview practice questions',
      'Conduct interactive mock interview simulations with real-time feedback using AI roleplay',
      'Adhere strictly to professional ethics: never fabricate qualifications, experience, or metrics'
    ],
    trainerScript: `Welcome to Lesson 12! Today we are looking at one of the highest-stakes applications of AI: career advancement, resumes, and interview preparation.

Let us start with an urgent, non-negotiable ethical warning:
NEVER use AI to fabricate job titles, invent companies you never worked for, or generate fake accomplishments! Recruiters verify backgrounds through background checks, technical tests, and reference calls. A fake resume line will get you blacklisted permanently.

So how should you use AI ethically?
Use AI to translate what you actually did into high-impact, industry-standard professional language!

Most student and professional resumes fail because they list passive duties instead of impactful achievements.
For example, a student writes: "Responsible for managing college club Instagram account."
That is boring and passive.
With Google's famous XYZ Resume Formula, we prompt AI to restructure it:
"Accomplished [X] as measured by [Y] by doing [Z]".
The revised bullet becomes:
"Grew club social media engagement by 140% across 3 months by curating 24 technical micro-reels and hosting weekly live Q&As."
Notice the difference: The facts did not change, but the value is clear, measured, and compelling!

In the second half of this lesson, we will turn your AI into a Mock Interview Coach that asks you challenging questions, listens to your answers, and grades you on the STAR (Situation, Task, Action, Result) method. Let us begin!`,
    demonstrationInstructions: [
      'Open a text editor with 3 weak resume bullet points (e.g., "Worked on billing software", "Helped customers with queries").',
      'Feed the bullets to Claude or ChatGPT with the "XYZ Resume Transformer" prompt.',
      'Show how the AI prompts you for missing numbers (e.g., "How many customers per day? Did response time improve?").',
      'Paste a real Job Description (JD) and demonstrate how to perform an ATS (Applicant Tracking System) Gap Analysis.',
      'Launch a real-time Mock Interview roleplay in conversational mode, practicing the classic question: "Tell me about a time you faced a tight deadline with changing requirements."',
      'Evaluate the mock answer against the STAR framework and display the score.'
    ],
    practicalExamples: [
      {
        title: 'Fresh Graduate IT Resume Transformation',
        scenario: 'A B.Tech graduate in Coimbatore had a final-year project: "Built a hospital appointment booking system in React and Node.js".',
        aiWorkflow: 'Used the XYZ Bullet Prompt: "Rewrite this project bullet using the XYZ formula. I designed the database schema, built 8 REST APIs, and reduced appointment booking latency to under 300ms for 50 concurrent users."',
        result: 'Transformed into 3 punchy resume bullets highlighting RESTful API design, database indexing, and sub-second query performance that impressed campus interviewers.'
      },
      {
        title: 'Sales Executive Behavioral Interview Prep',
        scenario: 'A retail branch manager in Hyderabad preparing for an Area Sales Manager interview at a major consumer electronics firm.',
        aiWorkflow: 'Used the Mock Interviewer prompt: "Act as the VP of Sales interviewing me. Ask 3 tough behavioral questions regarding team turnover and regional target deficits. Critique my answers using the STAR method."',
        result: 'Practiced answering with structured Situation, Task, Action, and Result framing, boosting confidence and landing the offer.'
      }
    ],
    prompts: [
      {
        title: 'Google XYZ Resume Bullet Transformer',
        category: 'Resume Enhancement',
        promptText: 'Act as an executive resume writer for top tech and multinational firms. Below are my actual, truthful experience bullet points:\n[PASTE RAW BULLETS]\nRewrite each bullet using Google\'s XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]".\nRules:\n1. Begin every bullet with a strong action verb (Spearheaded, Architected, Automated, Optimized).\n2. If I have not provided a number, place a placeholder like [METRIC: e.g. % increase / hours saved] and suggest what number I should calculate from my real experience.\n3. Do not invent any skills or tools I did not mention.',
        variables: ['[PASTE RAW BULLETS]'],
        intendedPurpose: 'Converts passive job descriptions into measurable, metric-driven resume achievements.'
      },
      {
        title: 'Job Description (JD) Keyword & Gap Analysis',
        category: 'ATS Optimization',
        promptText: 'Act as an Applicant Tracking System (ATS) auditor. I am pasting the Target Job Description and my current resume below.\nJob Description:\n[PASTE JOB DESCRIPTION]\nCurrent Resume:\n[PASTE CURRENT RESUME]\nPerform a comparative analysis:\n1. Top 5 core competencies and keywords in the JD that are strongly represented in my resume.\n2. Top 5 missing keywords or gaps that I might possess but failed to articulate.\n3. Three recommended tweaks to align my resume language with the company\'s terminology without lying.',
        variables: ['[PASTE JOB DESCRIPTION]', '[PASTE CURRENT RESUME]'],
        intendedPurpose: 'Identifies terminology gaps between a resume and a target job description ethically.'
      },
      {
        title: 'Interactive Mock Interviewer (STAR Method)',
        category: 'Interview Simulation',
        promptText: 'Act as an experienced hiring manager for the role of [ROLE] at [COMPANY/INDUSTRY]. You are interviewing me.\nRules for this session:\n1. Ask me only ONE interview question at a time. Do not list all questions at once.\n2. Start with Question 1: A behavioral or situational question relevant to this role.\n3. After I type my response, grade my answer based on the STAR framework (Situation, Task, Action, Result). Highlight what was strong and what detail was missing.\n4. Then, and only then, ask Question 2. Ready? Ask Question 1 now.',
        variables: ['[ROLE]', '[COMPANY/INDUSTRY]'],
        intendedPurpose: 'Runs a step-by-step interactive mock interview providing real-time feedback after every answer.'
      },
      {
        title: 'Tough Interview Question Defense ("Why This Gap / Flaw?")',
        category: 'Interview Preparation',
        promptText: 'In my upcoming interview for [ROLE], I am worried the interviewer will ask about: "[DIFFICULT QUESTION OR BACKGROUND ISSUE, e.g., 1-year education gap / lack of direct managerial experience / transitioning from mechanical to IT]".\nHelp me frame a confident, honest, and positive 90-second answer. Structure it with:\n1. Direct acknowledgment without defensiveness\n2. The constructive learning or self-study done during that period\n3. Why this unique path makes me even more resilient and prepared today.',
        variables: ['[ROLE]', '[DIFFICULT QUESTION OR BACKGROUND ISSUE]'],
        intendedPurpose: 'Crafts honest, confident responses to difficult resume gaps and transitions.'
      },
      {
        title: 'Smart Questions to Ask the Interviewer (End of Interview)',
        category: 'Interview Closing',
        promptText: 'At the end of an interview for [ROLE] at [COMPANY], the interviewer will ask: "Do you have any questions for us?"\nGive me 4 intelligent, memorable questions that show deep research, intellectual curiosity, and strategic thinking. Avoid generic questions like "What is the company culture?". Include questions regarding team challenges, definition of success in first 90 days, and technological roadmap.',
        variables: ['[ROLE]', '[COMPANY]'],
        intendedPurpose: 'Leaves an outstanding final impression with intelligent closing questions for the interviewer.'
      }
    ],
    studentActivity: {
      title: 'Transform 3 Resume Bullets & Practice 1 Mock Question',
      description: 'Take 3 real bullet points from your current resume or college CV. Rewrite them using the Google XYZ Formula prompt, and then practice answering one behavioral question using the STAR method.',
      steps: [
        'Select 3 bullet points describing a past job, internship, college project, or club role.',
        'Apply the XYZ Resume Bullet Transformer prompt and calculate your actual numbers.',
        'Run the Interactive Mock Interviewer prompt and answer 1 question using the STAR method.',
        'Document the before-and-after bullets and the mock interview feedback.',
        'Include these outputs in your Practical Task 3 portfolio.'
      ],
      submissionExpected: '3 rewritten XYZ resume bullets and 1 STAR-framework interview practice transcript.'
    },
    keyTakeaways: [
      'Strictly avoid fabricating resume claims; AI is a tool to articulate real achievements, not invent fake ones.',
      'Google\'s XYZ formula (Accomplished [X] measured by [Y] by doing [Z]) makes your impact undeniable.',
      'Align your resume keywords with the Job Description ethically by matching industry terminology.',
      'Use interactive AI mock interviews to practice the STAR framework (Situation, Task, Action, Result).',
      'Always prepare 3 strategic questions to ask the interviewer at the close of every discussion.'
    ],
    suggestedVisuals: [
      'Visual diagram of Google\'s XYZ Resume Bullet formula with color-coded examples',
      'STAR method matrix (Situation, Task, Action, Result) with time allocation percentages',
      'Flowchart of ATS Keyword Gap Analysis workflow'
    ],
    downloadableNotes: `# VeeGo AI LMS - Lesson 12 Cheatsheet: AI for Resumes and Interviews

## 1. Google's XYZ Formula
- **X = Accomplished**: "Reduced onboarding ticket resolution time"
- **Y = Measured by**: "by 32% across 45 new team members"
- **Z = By doing**: "by creating an automated Notion self-service knowledge base."

## 2. The STAR Interview Answer Breakdown
- **Situation (20% of time)**: Set the context, team size, and initial challenge.
- **Task (10% of time)**: Your specific responsibility in solving the issue.
- **Action (50% of time)**: The exact steps YOU took, tools used, and obstacles overcome.
- **Result (20% of time)**: Measurable outcome, lessons learned, and business impact.
`,
    quiz: [
      {
        id: 'q12-1',
        question: 'What is Google\'s well-known XYZ formula for writing impactful resume bullet points?',
        options: [
          'Examine [X], Yield [Y], Zero [Z]',
          'Accomplished [X] as measured by [Y], by doing [Z]',
          'X-ray the job description, Yearn for success, Zip your lips',
          'Export [X], Year-end [Y], Zoom [Z]'
        ],
        correctIndex: 1,
        explanation: 'Google\'s formula is "Accomplished [X] as measured by [Y], by doing [Z]", ensuring every bullet point highlights a concrete achievement, metric, and method.'
      },
      {
        id: 'q12-2',
        question: 'What is the danger of using AI to fabricate experience or skills you do not have?',
        options: [
          'AI will charge you higher subscription fees',
          'Background verification, technical interviews, and reference checks will expose the deception, risking permanent blacklisting',
          'Your resume will print in the wrong color',
          'Recruiters will only offer higher salaries'
        ],
        correctIndex: 1,
        explanation: 'Falsifying qualifications ruins professional credibility and leads to immediate disqualification or termination upon background checks.'
      },
      {
        id: 'q12-3',
        question: 'What does the "A" in the STAR interview technique stand for?',
        options: [
          'Argument',
          'Action (the specific steps you took)',
          'Apology',
          'Automation'
        ],
        correctIndex: 1,
        explanation: 'In the STAR method, "A" stands for "Action" — describing the specific actions you took to resolve the problem.'
      },
      {
        id: 'q12-4',
        question: 'What percentage of your interview answer time should typically be spent on the Action phase in STAR?',
        options: [
          'Around 50% (the core focus of what you personally executed)',
          '5%',
          '100%',
          '0%'
        ],
        correctIndex: 0,
        explanation: 'Interviewers evaluate your competence based on your actions; spending ~50% of your time explaining your personal execution provides the evidence they need.'
      },
      {
        id: 'q12-5',
        question: 'How does an ATS Gap Analysis prompt help job seekers ethically?',
        options: [
          'It writes a fake letter of recommendation from the CEO',
          'It identifies relevant skills and terminology from the job description that you possess but omitted in your draft',
          'It hacks the company\'s database to place your name at the top',
          'It hides invisible white text in your resume PDF'
        ],
        correctIndex: 1,
        explanation: 'It helps you align truthful experiences with the specific vocabulary and technical terms used by the hiring organization.'
      }
    ]
  },
  {
    id: 'lesson-13',
    lessonNumber: 13,
    moduleId: 'module-5',
    moduleTitle: 'Module 5: AI for Professional Productivity',
    title: 'AI for Daily Productivity',
    durationMinutes: 13,
    learningObjectives: [
      'Extract structured action items, owners, and deadlines from disorganized meeting transcripts',
      'Prioritize daily tasks using Eisenhower Matrix and Time Boxing prompts with AI assistance',
      'Design realistic daily and weekly work schedules that balance deep work and routine tasks',
      'Automate routine organizational workflows such as checklists, project trackers, and debriefs',
      'Complete Practical Task 3: Professional Email, Daily Productivity Plan, and Interview Practice Questions'
    ],
    trainerScript: `Hello learners, and welcome to Lesson 13! Today we focus on your everyday operating system: daily task management, meeting processing, and time design.

Have you ever finished a busy 9-hour workday or study day, felt exhausted, and realized you did not make any real progress on your most important goals? That feeling is caused by "reactive productivity": spending your entire day responding to notifications, messy messages, and ad-hoc requests.

AI can act as your personal Chief of Staff. When you feed AI your raw daily inputs:
- 10 messy lines from a WhatsApp group discussion
- 4 scattered tasks written on sticky notes
- An audio transcript or notes from an hour-long project meeting

AI can instantly parse, categorize, and organize everything into an actionable master schedule.

In this lesson, we will combine AI with proven productivity systems:
1. The Eisenhower Matrix: Categorizing tasks into Urgent vs. Important so you stop ignoring high-leverage goals.
2. Time Boxing: Allocating concrete 60-to-90 minute calendar blocks rather than maintaining endless open-ended to-do lists.
3. Meeting Synthesis: Converting transcripts into a 3-part Action Grid: Decision Log, Assigned Action Items with Deadlines, and Unresolved Questions.

This lesson also marks the completion of your Practical Task 3! Let us dive into the live walkthrough!`,
    demonstrationInstructions: [
      'Paste a 200-word messy transcript of a group meeting discussing an upcoming college project or office launch.',
      'Run the "Meeting Transcript to Action Grid" prompt and watch the AI extract Decisions, Action Items with Owners, and Open Questions in a clean markdown table.',
      'Take an unorganized brain dump of 8 diverse tasks and feed them into the "Eisenhower Matrix Prioritizer" prompt.',
      'Show how the AI builds a realistic 8-hour Time Boxed calendar schedule with 15-minute buffers for lunch and mental breaks.',
      'Review the components of Practical Task 3: Email + Daily Schedule + Interview Questions.'
    ],
    practicalExamples: [
      {
        title: 'College Tech Symposium Organizing Committee Meeting',
        scenario: 'A student committee spent 45 minutes arguing over speaker hospitality, budget approvals, and website banners, leaving messy notes.',
        aiWorkflow: 'Pasted rough notes into ChatGPT: "Extract an Action Items Table: Task, Owner, Deadline, Priority. Then summarize the 3 decisions finalized during the call."',
        result: 'Within 30 seconds, generated a clean table distributed on WhatsApp, ending confusion and ensuring accountability.'
      },
      {
        title: 'Freelance Consultant Daily Planning & Deep Work Protection',
        scenario: 'A marketing consultant in Delhi had 14 pending tasks spanning client revisions, tax filing, invoicing, and proposal writing.',
        aiWorkflow: 'Used the Time-Boxing Planner prompt: "Here are my 14 tasks. Group into Deep Work (cognitively demanding) vs Shallow Work (admin/emails). Build an 8-hour schedule from 9 AM to 6 PM with deep work in the morning."',
        result: 'Scheduled client proposals from 9:30 AM to 11:30 AM without distractions, pushing email checks to 3 PM, dramatically increasing output.'
      }
    ],
    prompts: [
      {
        title: 'Meeting Notes to Action Grid (Decisions & Owners)',
        category: 'Meeting Processing',
        promptText: 'Act as an executive project manager. Below are the raw notes or transcript from our meeting:\n[PASTE RAW MEETING NOTES]\nTransform these notes into a structured 3-part summary:\n1. Key Decisions Made (Bullet points of final agreements)\n2. Action Items Table (Columns: Task Description | Owner / Assignee | Due Date | Priority High/Med/Low)\n3. Open Questions / Blockers (Items requiring follow-up before the next sync).',
        variables: ['[PASTE RAW MEETING NOTES]'],
        intendedPurpose: 'Converts rambling meeting notes into clear decisions and assigned accountability.'
      },
      {
        title: 'Eisenhower Matrix & Time-Boxed Daily Planner',
        category: 'Time Management',
        promptText: 'I have the following tasks to accomplish today:\n[PASTE LIST OF TASKS]\nMy working hours are [START TIME, e.g. 9:00 AM] to [END TIME, e.g. 6:00 PM].\nPlease:\n1. Categorize each task into the Eisenhower Matrix: Quadrant 1 (Urgent & Important), Quadrant 2 (Important, Not Urgent - Deep Work), Quadrant 3 (Urgent, Not Important - Delegate/Batch), Quadrant 4 (Not Urgent, Not Important - Eliminate).\n2. Build a realistic Time-Boxed calendar schedule for my day. Schedule Quadrant 2 deep work during high-energy morning hours. Include a 45-minute lunch break and two 15-minute buffer breaks.',
        variables: ['[PASTE LIST OF TASKS]', '[START TIME]', '[END TIME]'],
        intendedPurpose: 'Turns chaotic to-do lists into an organized, realistic time-boxed daily schedule.'
      },
      {
        title: 'End-of-Day Work Log & Tomorrow\'s Battle Plan',
        category: 'Daily Debrief',
        promptText: 'Here is what I worked on today:\n[PASTE TODAY\'S ACCOMPLISHMENTS & UNFINISHED TASKS]\nDraft:\n1. A 3-sentence summary of wins for today to share on my team\'s Slack/WhatsApp channel.\n2. A prioritized Top-3 "Must-Win" list for tomorrow morning so I can hit the ground running without hesitation.',
        variables: ['[PASTE TODAY\'S ACCOMPLISHMENTS & UNFINISHED TASKS]'],
        intendedPurpose: 'Closes out the workday cleanly and primes the mind for high-focus execution the next morning.'
      },
      {
        title: 'Project Milestone Breakdown (Work Breakdown Structure)',
        category: 'Project Planning',
        promptText: 'I need to execute [PROJECT NAME, e.g., launching an online portfolio / organizing a 2-day hackathon] within [TIMELINE, e.g., 4 weeks].\nBreak this project down into a Work Breakdown Structure (WBS):\n- Week 1: Discovery & Planning\n- Week 2: Execution & Asset Creation\n- Week 3: Testing & Review\n- Week 4: Final Launch & Retrospective.\nFor each week, give 3 specific milestone checklists and identify the single biggest risk factor.',
        variables: ['[PROJECT NAME]', '[TIMELINE]'],
        intendedPurpose: 'Deconstructs large, intimidating multi-week projects into manageable weekly milestones.'
      },
      {
        title: 'Weekly Review & Habit Optimization Coach',
        category: 'Reflection & Growth',
        promptText: 'Act as a high-performance productivity coach. Here is my weekly reflection:\n- Hours worked: [HOURS]\n- Biggest win: [WIN]\n- Biggest distraction / time-waster: [DISTRACTION]\n- Goals missed: [MISSED GOALS].\nAnalyze my week with empathy and rigor. Give me:\n1. Root-cause analysis of why goals were missed\n2. One micro-habit change to prevent the distraction next week\n3. An encouraging closing mindset shift.',
        variables: ['[HOURS]', '[WIN]', '[DISTRACTION]', '[MISSED GOALS]'],
        intendedPurpose: 'Provides high-level weekly accountability coaching to prevent recurring burnout and distraction.'
      }
    ],
    studentActivity: {
      title: 'Practical Task 3: Professional Productivity Triple-Set',
      description: 'Complete the three core professional deliverables: (1) One polished professional email, (2) One structured Time-Boxed daily productivity plan, and (3) A set of 5 tailored interview practice questions with sample answers.',
      steps: [
        'Complete the professional email from Lesson 11 (with subject line and under 120 words).',
        'Apply the Eisenhower Matrix & Time-Boxed Planner prompt to structure a real workday or study day from 9 AM to 6 PM.',
        'Use the Interview Preparation prompts from Lesson 12 to generate 5 tailored questions and write 1 STAR answer.',
        'Compile all three documents into your Practical Task 3 portfolio section.',
        'Review against the portfolio rubric before submitting.'
      ],
      submissionExpected: 'A 3-part document containing: (1) Professional Email, (2) Daily Schedule & Task Matrix, (3) 5 Interview Questions + 1 STAR Answer.'
    },
    keyTakeaways: [
      'Reactive productivity drains your energy; use AI to structure and time-box your schedule proactively.',
      'The Eisenhower Matrix protects Quadrant 2 (Important, Not Urgent deep work) from being crowded out by trivial emergencies.',
      'Never leave meetings without an Action Grid: Decisions Made, Assignees with Deadlines, and Blockers.',
      'Schedule 15-minute buffers between blocks; unrealistic back-to-back schedules always break.',
      'Practical Task 3 milestone: Submit your Professional Email, Daily Productivity Schedule, and Interview Practice Set.'
    ],
    suggestedVisuals: [
      'The Eisenhower Matrix 2x2 grid (Urgent vs Important quadrants)',
      'Time-Boxing visual calendar template showing Deep Work blocks vs Shallow Admin blocks',
      'Action Grid Table layout (Task, Owner, Due Date, Priority)'
    ],
    downloadableNotes: `# VeeGo AI LMS - Lesson 13 Cheatsheet: AI for Daily Productivity

## 1. The Eisenhower Matrix Quadrants
- **Q1: Urgent & Important (Do First)**: System crashes, impending deadlines within 24 hours.
- **Q2: Not Urgent but Important (Schedule - The Goldmine)**: Skill learning, strategic planning, health, deep projects.
- **Q3: Urgent but Not Important (Delegate/Batch)**: Most phone calls, urgent unimportant emails, trivial requests.
- **Q4: Not Urgent & Not Important (Eliminate)**: Mindless doom-scrolling, unproductive gossip.

## 2. Practical Task 3 Checklist
- [ ] Professional email draft under 120 words with clear CTA.
- [ ] Time-Boxed schedule covering a full day with breaks.
- [ ] 5 role-specific interview questions.
- [ ] 1 comprehensive answer using Situation, Task, Action, Result (STAR).
`,
    quiz: [
      {
        id: 'q13-1',
        question: 'Which quadrant of the Eisenhower Matrix represents high-leverage activities like skill development and deep planning?',
        options: [
          'Quadrant 1 (Urgent & Important)',
          'Quadrant 2 (Important but Not Urgent)',
          'Quadrant 3 (Urgent but Not Important)',
          'Quadrant 4 (Not Urgent & Not Important)'
        ],
        correctIndex: 1,
        explanation: 'Quadrant 2 represents important non-urgent activities. Without intentional scheduling, these high-leverage tasks are often neglected for immediate trivial demands.'
      },
      {
        id: 'q13-2',
        question: 'Why is "Time Boxing" generally more effective than an open-ended to-do list?',
        options: [
          'Because to-do lists are illegal in India',
          'Because time boxing assigns dedicated blocks of time and limits on the calendar, preventing tasks from expanding endlessly',
          'Because time boxing eliminates the need to work',
          'Because time boxing is only for professional athletes'
        ],
        correctIndex: 1,
        explanation: 'Time boxing adheres to Parkinson\'s Law (work expands to fill time available) by allocating specific start and stop times on your calendar.'
      },
      {
        id: 'q13-3',
        question: 'What are the three essential components of a post-meeting summary grid?',
        options: [
          'Jokes told, food ordered, and room temperature',
          'Key Decisions Finalized, Action Items with Owners & Deadlines, and Open Questions/Blockers',
          'Word count, font size, and attendance percentage',
          'Signatures from the CEO, Governor, and Police Commissioner'
        ],
        correctIndex: 1,
        explanation: 'A productive meeting synthesis requires: (1) Decisions made, (2) Action items with clear owners and dates, and (3) Unresolved questions requiring follow-up.'
      },
      {
        id: 'q13-4',
        question: 'Why should a daily time-boxed calendar include 15-minute buffer breaks?',
        options: [
          'To sleep through the afternoon',
          'Because unexpected interruptions and cognitive fatigue occur in the real world, and rigid schedules break easily',
          'To make the schedule look shorter',
          'Buffers are unnecessary and should always be deleted'
        ],
        correctIndex: 1,
        explanation: 'Buffer blocks absorb unforeseen delays and provide cognitive recovery, making the schedule resilient and achievable.'
      },
      {
        id: 'q13-5',
        question: 'What are the three required elements of Practical Task 3?',
        options: [
          'A novel, a poem, and a song',
          'One professional email, one daily productivity schedule/matrix, and one set of interview practice questions with a STAR answer',
          'Three different selfies',
          'A Python machine learning script'
        ],
        correctIndex: 1,
        explanation: 'Practical Task 3 requires: (1) A professional email, (2) An Eisenhower time-boxed daily schedule, and (3) 5 interview questions with 1 STAR answer.'
      }
    ]
  }
];
