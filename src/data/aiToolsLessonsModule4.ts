import { LessonContent } from './aiToolsCourseData';

export const module4Lessons: LessonContent[] = [
  {
    id: 'lesson-8',
    lessonNumber: 8,
    moduleId: 'module-4',
    moduleTitle: 'Module 4: AI for Presentations and Content',
    title: 'Create Presentations Using AI',
    durationMinutes: 15,
    learningObjectives: [
      'Deconstruct complex presentation topics into logical 6-to-8 slide narratives using AI prompts',
      'Generate punchy slide headlines, 3-bullet structures, and speaker notes tailored to your audience',
      'Translate AI text outlines directly into presentation tools like Canva or Gamma without design paralysis',
      'Critically review AI-generated slide outlines to eliminate wordiness and corporate jargon',
      'Maintain visual-verbal balance where slides support rather than duplicate your spoken words'
    ],
    trainerScript: `Hello learners, and welcome to Lesson 8! Today we are tackling one of the biggest time-sinks in academia and corporate life: building slide presentations.

How many times have you stared at a blank PowerPoint or Google Slides screen, wondering: What should slide 3 be? How much text is too much? What is the logical flow?

In traditional workflow, creating a 10-slide deck takes 3 to 4 hours: 1 hour brainstorming, 1 hour writing bullets, and 2 hours fighting with alignment and fonts. With AI, we flip the process: AI handles 80% of the structural drafting and bullet condensation in 5 minutes, allowing you to focus your energy on delivery, storytelling, and visual clarity.

Here is the cardinal rule of AI presentations: Never ask AI to 'write my entire presentation' and paste everything onto slides. Slides are visual anchors for an audience, not teleprompters for the speaker! Each slide should follow the Rule of 3: One bold headline, maximum three supporting concise bullet points, and high visual whitespace.

Today we will explore a two-step AI presentation workflow:
Step 1: Ideate the deck architecture. We feed AI the topic, audience profile, and total time available. AI outputs a structured slide-by-slide storyboard including Slide Title, Key Takeaway, Bullet Points (max 10 words each), and Speaker Script.
Step 2: Transfer to modern AI presentation creators. Tools like Canva's Magic Design or Gamma App allow you to paste markdown outlines and instantly format professional layouts.

Let us jump into a live demonstration and build an 8-slide pitch deck on Renewable Energy for College Campuses!`,
    demonstrationInstructions: [
      'Open ChatGPT or Gemini in one browser tab, and Canva or Gamma in another tab.',
      'Enter the Master Presentation Outline prompt specifying target audience (e.g., college management), deck length (7 slides), and presentation time (10 minutes).',
      'Review the generated outline. Notice how the AI provides Slide Title, Visual Suggestion, 3 Bullets, and Speaker Notes for each slide.',
      'Ask the AI to refine Slide 4: "Make the cost-benefit analysis slide more concrete with estimated rupee figures and an ROI payback period in years."',
      'Copy the structured outline into Canva Magic Design or Gamma.app to demonstrate automatic slide generation in under 60 seconds.',
      'Manually edit the slides to replace generic stock imagery suggestions with real photos or clean diagrams.'
    ],
    practicalExamples: [
      {
        title: 'College Seminar Presentation on Cyber Security Awareness',
        scenario: 'A computer science student has to deliver an 8-minute presentation to non-technical 1st-year students on password safety and phishing.',
        aiWorkflow: 'Used Gemini with the prompt: "Act as a cybersecurity educator. Create a 6-slide outline for non-tech freshmen. Keep slides minimal: 1 punchy heading, 3 bullets under 8 words each, and an engaging real-world hook for the speaker."',
        result: 'Generated an engaging deck titled "Think Before You Click". Slide 3 contrasted "Bad Password: password123" with "Good Passphrase: BlueElephant#2026Dancing", making the topic instantly memorable.'
      },
      {
        title: 'Quarterly Sales Review for an Indian Retail Distributor',
        scenario: 'A sales manager needs to present Q3 results to executive leadership in 15 minutes, highlighting tier-2 city expansion.',
        aiWorkflow: 'Pasted raw quarterly sales metrics into Claude/ChatGPT and asked: "Structure a 7-slide executive briefing. Highlight YoY revenue growth, Tier-2 city traction, supply chain bottlenecks, and Q4 targets. Include a one-line executive takeaway at the bottom of each slide."',
        result: 'Delivered an executive-ready deck outline with clean comparative data points that took 12 minutes to finalize instead of 3 hours.'
      }
    ],
    prompts: [
      {
        title: 'Master Presentation Storyboard Generator',
        category: 'Outlines & Architecture',
        promptText: 'Act as an expert presentation designer. I need to deliver a [DURATION] minute presentation to [TARGET AUDIENCE] on the topic: "[TOPIC]". Create a [NUMBER OF SLIDES]-slide storyboard. For every slide, provide:\n1. Slide Number & Punchy Title (max 6 words)\n2. Core Visual Concept (what image/chart should be displayed)\n3. Slide Content (strictly maximum 3 concise bullet points, max 10 words each)\n4. Speaker Notes (2-3 sentences explaining what the speaker should say out loud).',
        variables: ['[DURATION]', '[TARGET AUDIENCE]', '[TOPIC]', '[NUMBER OF SLIDES]'],
        intendedPurpose: 'Generates a ready-to-format presentation storyboard with strict bullet brevity and spoken script.'
      },
      {
        title: 'Bullet Point Condenser (Anti-Clutter)',
        category: 'Slide Polish',
        promptText: 'Here is a paragraph of content I want to show on a presentation slide:\n"[PASTE PARAGRAPH]"\nCondense this into exactly 3 punchy, high-impact bullet points. Each bullet point must begin with an active verb, contain no filler words, and be under 8 words. Keep the tone professional and persuasive.',
        variables: ['[PASTE PARAGRAPH]'],
        intendedPurpose: 'Transforms verbose paragraphs into clean, readable presentation bullets that do not overwhelm slides.'
      },
      {
        title: 'Audience Q&A Simulator for Presentations',
        category: 'Speaker Preparation',
        promptText: 'I am presenting on "[TOPIC]" to an audience of [TARGET AUDIENCE]. Based on this slide outline:\n[PASTE SLIDE OUTLINE]\nAnticipate the top 5 toughest, most skeptical questions this audience is likely to ask during the Q&A session. For each question, provide a confident, evidence-based 2-minute answer framework.',
        variables: ['[TOPIC]', '[TARGET AUDIENCE]', '[PASTE SLIDE OUTLINE]'],
        intendedPurpose: 'Prepares the presenter for difficult audience questions before stepping onto the stage.'
      },
      {
        title: 'Visual Metaphor & Infographic Ideator',
        category: 'Design & Visuals',
        promptText: 'I need to explain the concept of "[ABSTRACT CONCEPT]" on a presentation slide without using boring bullet points. Suggest 3 visual metaphors or infographic layout concepts (e.g., funnel, bridge, flywheel, comparison matrix) that would instantly explain this idea to visual learners.',
        variables: ['[ABSTRACT CONCEPT]'],
        intendedPurpose: 'Provides visual concepts and metaphors to replace boring walls of text with charts and infographics.'
      },
      {
        title: 'Compelling Presentation Hook & Closing',
        category: 'Storytelling',
        promptText: 'I am opening and closing a presentation on "[TOPIC]" for [AUDIENCE]. Give me:\n1. Three options for an opening hook (Option A: A surprising statistic, Option B: A 15-second relatable story, Option C: A provocative question).\n2. Two memorable closing statements with a clear call to action.',
        variables: ['[TOPIC]', '[AUDIENCE]'],
        intendedPurpose: 'Creates magnetic opening hooks and strong conclusions that leave a lasting impression.'
      }
    ],
    studentActivity: {
      title: 'Design a 6-Slide Presentation Storyboard',
      description: 'Use the Master Presentation Storyboard prompt to create an outline for a topic of your choice (e.g., "Why Indian Startups are Adopting Electric Vehicles" or "Effective Time Management for College Students").',
      steps: [
        'Select a topic relevant to your field or academic study.',
        'Execute the Master Presentation Storyboard prompt targeting 6 slides.',
        'Verify that no slide has more than 3 bullet points.',
        'Copy the text into Google Slides or Canva and create the draft deck.',
        'Save the deck link or PDF for your project submission portfolio.'
      ],
      submissionExpected: 'A 6-slide outline with titles, 3 bullets each, speaker notes, and visual layout ideas.'
    },
    keyTakeaways: [
      'Slides exist to amplify the speaker, not replace them; keep slide text minimal and spoken notes rich.',
      'Use the Rule of 3: One headline, three concise bullets, and ample negative whitespace per slide.',
      'AI tools like Canva and Gamma turn structured markdown outlines into formatted slides in seconds.',
      'Always prepare for audience Q&A by asking AI to simulate skeptical objections beforehand.',
      'Check all statistics and case study references on your slides before presenting.'
    ],
    suggestedVisuals: [
      'Comparison graphic: "Wall of text slide (F-)" vs "AI-structured 3-bullet slide with visual (A+)"',
      'Screen recording demonstrating prompt input in Gemini and instant layout rendering in Canva Magic Design',
      'Callout graphic highlighting the 4 parts of a storyboard: Title, Visual, 3 Bullets, Speaker Notes'
    ],
    downloadableNotes: `# VeeGo AI LMS - Lesson 8 Cheatsheet: Create Presentations Using AI

## 1. The Presentation Golden Ratio
- **70% Visual & Whitespace**: Images, icons, and clean structure.
- **20% Spoken Script**: What you say that adds value beyond the text.
- **10% Slide Text**: Maximum 15 to 20 words total per slide.

## 2. Standard 6-to-8 Slide Deck Flow
1. **Slide 1**: Title, Subtitle, Presenter Name, Date.
2. **Slide 2**: The Core Problem / Current State (Pain points).
3. **Slide 3**: The Opportunity / Vision (What is possible).
4. **Slide 4**: The Solution / Methodology (How it works).
5. **Slide 5**: Evidence / Case Study / Key Metrics (Proof points).
6. **Slide 6**: Roadmap & Implementation (Next steps).
7. **Slide 7**: Summary & Call to Action (Next immediate steps + Contact details).

## 3. Recommended Tools
- **Prompting & Outlining**: ChatGPT, Google Gemini, Claude.
- **Automatic Layout Rendering**: Canva Magic Design, Gamma App, Microsoft Copilot for PowerPoint.
`,
    quiz: [
      {
        id: 'q8-1',
        question: 'What is the primary role of text on a presentation slide?',
        options: [
          'To act as a teleprompter so the speaker does not forget any words',
          'To serve as a concise visual anchor while the speaker provides context orally',
          'To contain every detail so audience members do not need to listen',
          'To fill all empty spaces so the slide looks busy and comprehensive'
        ],
        correctIndex: 1,
        explanation: 'Slides are visual anchors for the audience. Putting all words on the slide overwhelms the audience and causes them to read instead of listening to the presenter.'
      },
      {
        id: 'q8-2',
        question: 'According to presentation design best practices, what is the recommended limit for bullet points per slide?',
        options: [
          '8 to 10 bullet points',
          'Maximum 3 to 4 concise bullet points',
          '15 numbered steps',
          'As many as can fit in font size 10'
        ],
        correctIndex: 1,
        explanation: 'The Rule of 3 recommends no more than 3 to 4 concise bullets per slide to avoid cognitive overload.'
      },
      {
        id: 'q8-3',
        question: 'How can modern tools like Gamma or Canva Magic Design interact with AI generated outlines?',
        options: [
          'They cannot accept AI text outlines',
          'They can convert structured text/markdown outlines directly into styled slides',
          'They require hand-coding each slide in HTML',
          'They delete all speaker notes automatically'
        ],
        correctIndex: 1,
        explanation: 'Modern AI presentation creators ingest structured text outlines and automatically arrange them into formatted layouts with cards, icons, and styling.'
      },
      {
        id: 'q8-4',
        question: 'Why is it valuable to generate "Speaker Notes" alongside slide bullets?',
        options: [
          'To print out and read word-for-word in front of the audience without eye contact',
          'To guide the presenter on what to explain verbally without cluttering the visible slide with text',
          'To submit to AI for copyright verification',
          'Speaker notes are obsolete and should never be used'
        ],
        correctIndex: 1,
        explanation: 'Speaker notes keep the spoken story rich and comprehensive while keeping the visible slide clean and uncluttered.'
      },
      {
        id: 'q8-5',
        question: 'What must you always do before presenting AI-generated data or statistics on a slide?',
        options: [
          'Double-check and verify figures with authentic source documents to prevent hallucinations',
          'Assume AI never makes mathematical mistakes in presentations',
          'Change the currency symbol without converting the actual amount',
          'Hide the numbers with a transition animation'
        ],
        correctIndex: 0,
        explanation: 'AI can hallucinate or miscalculate statistics. Presenters must verify all figures, percentages, and metrics against primary sources before presenting.'
      }
    ]
  },
  {
    id: 'lesson-9',
    lessonNumber: 9,
    moduleId: 'module-4',
    moduleTitle: 'Module 4: AI for Presentations and Content',
    title: 'AI for Documents and Reports',
    durationMinutes: 15,
    learningObjectives: [
      'Structure comprehensive academic, business, and technical reports using executive frameworks',
      'Synthesize multi-page messy meeting notes and research data into clean executive summaries',
      'Leverage AI as an advanced copyeditor to eliminate passive voice, redundancy, and grammatical errors',
      'Apply professional tone matching (e.g., formal board report vs. accessible student guide)',
      'Produce standardized report sections including problem statements, methodology, findings, and recommendations'
    ],
    trainerScript: `Welcome to Lesson 9! In this lesson, we will learn how to turn disorganized information into polished, professional documents and reports.

Whether you are writing a college project report, an internship summary, a business proposal, or an annual review, the struggle is almost always the same: you have scattered thoughts, rough data, and meeting minutes, but turning them into a cohesive, professional 10-page document feels overwhelming.

Most people make one of two mistakes with AI when writing reports:
Mistake 1: They prompt "Write a 5-page report on X" and get back 5 pages of fluffy, repetitive, robotic nonsense.
Mistake 2: They write everything manually, spending hours fixing punctuation, grammar, and paragraph transitions.

The professional method is Collaborative Document Architecture:
1. You provide the core substance: findings, bullet points, data tables, and objectives.
2. AI provides the structural skeleton: standard corporate/academic sections (Executive Summary, Background, Methodology, Key Findings, Strategic Recommendations, and Conclusion).
3. You review section-by-section, enforcing your personal voice and verifying every factual claim.

AI also shines as a merciless line editor. When you write under pressure, sentences become bloated with words like "in order to", "it is important to note that", and passive phrasing. In this lesson, we will master specific copyediting prompts that tighten your writing by 30% while boosting clarity.

Let us explore the live demonstration!`,
    demonstrationInstructions: [
      'Open a text editor with a rough 200-word draft of a project summary with informal grammar.',
      'Feed the draft to ChatGPT/Gemini using the "Executive Editor" prompt with strict constraints: active voice, subheadings, and zero fluff.',
      'Compare the before and after text side-by-side to observe how readability and conciseness improve.',
      'Demonstrate how to write an "Executive Summary" from 5 disparate bullet points using the BLUF (Bottom Line Up Front) model.',
      'Show how to generate a formal Table of Contents and Section Numbering for a 10-page project proposal.',
      'Highlight the importance of preserving original data figures and citations without allowing the AI to invent metrics.'
    ],
    practicalExamples: [
      {
        title: 'College Final-Year Project Report Editing',
        scenario: 'An engineering student has 12 pages of rough notes describing an IoT water monitoring system. The language is conversational and disorganized.',
        aiWorkflow: 'Used the "Academic Standardizer" prompt: "Review my rough notes for Chapter 3 (Methodology). Restructure into: 3.1 Hardware Architecture, 3.2 Sensor Calibration, 3.3 Data Transmission Protocols. Convert informal notes into formal academic English while preserving all sensor model numbers."',
        result: 'Transformed conversational fragments into a rigorous academic methodology section ready for faculty review.'
      },
      {
        title: 'Quarterly Operations Summary for a Logistics Company',
        scenario: 'An operations lead in Chennai needs to send a monthly report to regional directors summarizing warehouse delays, fuel cost spikes, and fleet maintenance.',
        aiWorkflow: 'Fed raw bullet points into Claude with the prompt: "Act as an Operations Director. Format these bullets into a formal 1-page operational briefing using the BLUF format: (1) Key Incident Summary, (2) Root Causes, (3) Corrective Actions Taken, (4) Financial Impact."',
        result: 'Produced an impactful one-page memo that highlighted key blockers without burying directors in endless paragraphs.'
      }
    ],
    prompts: [
      {
        title: 'Executive Summary Synthesizer (BLUF Method)',
        category: 'Summarization',
        promptText: 'Act as a Senior Business Consultant. Below are the key findings, data points, and discussion notes from our project:\n[PASTE RAW NOTES/FINDINGS]\nCreate a crisp Executive Summary (maximum 300 words) using the BLUF (Bottom Line Up Front) framework:\n1. Core Takeaway (1-2 sentences stating the most critical result/decision)\n2. Strategic Context (Why this matters)\n3. Top 3 Findings (Bullet points with metrics)\n4. Immediate Action Items (Who needs to do what next).',
        variables: ['[PASTE RAW NOTES/FINDINGS]'],
        intendedPurpose: 'Distills complex, multi-page data or discussion notes into an actionable executive summary.'
      },
      {
        title: 'Line Editor: Conciseness & Active Voice',
        category: 'Copyediting',
        promptText: 'Act as an expert copyeditor for a top publication. Review the following text:\n"[PASTE DRAFT TEXT]"\nPerform the following edits:\n1. Convert passive voice to active voice.\n2. Eliminate redundant phrases, filler words, and corporate clichés.\n3. Keep sentence length under 20 words for maximum readability.\n4. Provide a 2-column comparison table showing: "Original Sentence" vs "Edited Sentence" and the reason for change.',
        variables: ['[PASTE DRAFT TEXT]'],
        intendedPurpose: 'Tightens prose, boosts readability, and explains the editing rationale for student learning.'
      },
      {
        title: 'Formal Report Architecture Generator',
        category: 'Document Planning',
        promptText: 'I need to write a comprehensive [REPORT TYPE, e.g., Feasibility Study / Internship Report / Market Research] on the topic: "[TOPIC]". Generate a complete report outline including:\n1. Recommended Section Hierarchy (H1, H2, H3 numbering)\n2. Purpose and expected length for each section\n3. Key questions each section must answer\n4. Recommended tables or charts to include in the appendix.',
        variables: ['[REPORT TYPE]', '[TOPIC]'],
        intendedPurpose: 'Builds a professional report structure before drafting starts, preventing writer block.'
      },
      {
        title: 'Tone Shift: Casual to Boardroom Professional',
        category: 'Tone Calibration',
        promptText: 'Here is an internal note written in informal/conversational tone:\n"[PASTE INFORMAL NOTE]"\nRewrite this text for an audience of [TARGET AUDIENCE, e.g., Company Board of Directors / Academic Examination Committee]. Maintain high professionalism, constructive phrasing, and objective authority without sounding arrogant or overly convoluted.',
        variables: ['[PASTE INFORMAL NOTE]', '[TARGET AUDIENCE]'],
        intendedPurpose: 'Elevates conversational drafts into authoritative, respectful professional prose.'
      },
      {
        title: 'Policy / Standard Operating Procedure (SOP) Formatter',
        category: 'Workplace Documentation',
        promptText: 'Turn the following process description into a clear Standard Operating Procedure (SOP):\n"[PASTE ROUGH PROCESS STEPS]"\nFormat with:\n- SOP Title & Purpose\n- Scope & Roles Responsible\n- Step-by-Step Procedure (numbered steps with bold action verbs)\n- Common Edge Cases / Troubleshooting\n- Approval & Review Frequency.',
        variables: ['[PASTE ROUGH PROCESS STEPS]'],
        intendedPurpose: 'Converts ad-hoc office processes into standardized, auditable procedural documentation.'
      }
    ],
    studentActivity: {
      title: 'Transform Raw Project Notes into a 1-Page Briefing',
      description: 'Take a paragraph of informal notes from your college study group, job, or club meeting and use the Executive Summary and Line Editor prompts to produce a clean 1-page briefing.',
      steps: [
        'Write or compile 150 to 200 words of messy notes describing an event, project milestone, or challenge.',
        'Run the Executive Summary Synthesizer prompt to generate a BLUF briefing.',
        'Run the Line Editor prompt to refine word choice and active voice.',
        'Review the output to verify no names, dates, or numbers were hallucinated.',
        'Save the resulting document in your student project file.'
      ],
      submissionExpected: 'A before-and-after document showcasing raw notes converted into an executive briefing.'
    },
    keyTakeaways: [
      'Never ask AI to write an entire report blindly; provide the raw substance and let AI handle structure and synthesis.',
      'The BLUF (Bottom Line Up Front) model ensures busy professors and executives understand your core conclusion immediately.',
      'Use AI as an active-voice copyeditor to strip away wordy filler phrases and enhance reading clarity.',
      'Always safeguard sensitive corporate data by removing confidential customer or financial identifiers before prompting.',
      'Check all report tables and citations manually against source documents.'
    ],
    suggestedVisuals: [
      'Diagram explaining the BLUF (Bottom Line Up Front) pyramid hierarchy',
      'Side-by-side text comparison table showing passive wordy sentence transformed into crisp active sentence',
      'Graphic showing the 5 essential sections of an executive report'
    ],
    downloadableNotes: `# VeeGo AI LMS - Lesson 9 Cheatsheet: AI for Documents and Reports

## 1. The BLUF Model (Bottom Line Up Front)
- **Bottom Line**: The most important conclusion or recommendation stated in line 1.
- **Context**: Why this problem or opportunity exists.
- **Key Details**: Evidence, numbers, and methodology in bullet form.
- **Next Steps**: Exact actions, owners, and timelines.

## 2. Copyediting Checklist for AI-Assisted Reports
1. **Active Voice**: "The team delivered the project" NOT "The project was delivered by the team".
2. **Remove Throat-Clearing Phrases**: Delete "It is interesting to note that", "In order to", "As a matter of fact".
3. **Punctuation & Headings**: Use clear H1, H2, and H3 headers to make documents easily skimmable.
4. **Data Verification**: Confirm that all numbers, dates, and percentages match source records exactly.
`,
    quiz: [
      {
        id: 'q9-1',
        question: 'What does the acronym BLUF stand for in professional report writing?',
        options: [
          'Basic Learning Under Formal Frameworks',
          'Bottom Line Up Front',
          'Broad Listing of User Feedback',
          'Business Logic Universal File'
        ],
        correctIndex: 1,
        explanation: 'BLUF stands for "Bottom Line Up Front", a communication technique where the primary conclusion or recommendation is stated at the very beginning of the document.'
      },
      {
        id: 'q9-2',
        question: 'What is the most effective way to use AI for drafting a comprehensive project report?',
        options: [
          'Ask AI to generate a 20-page report without providing any specific notes or data',
          'Provide your own raw data and notes, use AI for structural outlining and synthesis, and review every section',
          'Copy text from Wikipedia and ask AI to change every 4th word to avoid plagiarism',
          'Have AI generate fake citations so the bibliography looks impressive'
        ],
        correctIndex: 1,
        explanation: 'The most effective method is Collaborative Architecture: you provide real facts and data, while AI assists with structure, transitions, and editing.'
      },
      {
        id: 'q9-3',
        question: 'Which of the following is an example of changing passive voice to active voice?',
        options: [
          'From "The software was tested by our QA team" to "Our QA team tested the software"',
          'From "We analyzed the data" to "The data was analyzed by us"',
          'From "The server crashed" to "A server crash was experienced by the system"',
          'From "I wrote the email" to "The email was composed and sent by me"'
        ],
        correctIndex: 0,
        explanation: 'Active voice places the actor first ("Our QA team tested the software"), making business documents punchier and clearer.'
      },
      {
        id: 'q9-4',
        question: 'Why should you avoid pasting confidential company financial data or student PII directly into public AI tools?',
        options: [
          'Because AI tools charge an extra fee for numbers',
          'Because public tools may use uploaded data for model training, creating privacy and compliance risks',
          'Because AI cannot understand numbers with commas',
          'Because reports must always be written with fountain pens'
        ],
        correctIndex: 1,
        explanation: 'Public consumer AI tools may retain user prompts for model training. Sensitive company secrets or personal identifiable information (PII) must be anonymized.'
      },
      {
        id: 'q9-5',
        question: 'What is the role of AI when writing a Standard Operating Procedure (SOP)?',
        options: [
          'To replace human operators completely without any training',
          'To organize disorganized procedural steps into numbered actions with clear roles and edge-case handling',
          'To fabricate safety guidelines without consulting engineering standards',
          'To write policies in fictional languages'
        ],
        correctIndex: 1,
        explanation: 'AI excels at taking rough process notes and structuring them into clear, step-by-step SOPs with roles, prerequisites, and troubleshooting steps.'
      }
    ]
  },
  {
    id: 'lesson-10',
    lessonNumber: 10,
    moduleId: 'module-4',
    moduleTitle: 'Module 4: AI for Presentations and Content',
    title: 'AI for Creative Thinking',
    durationMinutes: 15,
    learningObjectives: [
      'Overcome creative block using divergent thinking prompts to generate 20+ novel ideas in minutes',
      'Apply classic ideation frameworks (SCAMPER, Six Thinking Hats, Lateral Thinking) with AI assistance',
      'Deconstruct broad concepts into structured hierarchical mind maps and content pillar outlines',
      'Iterate on rough drafts using multi-perspective critique prompts (Devil\'s Advocate, First-Time User, Skeptic)',
      'Complete Practical Task 2: Create a five-to-eight-slide presentation on a chosen topic'
    ],
    trainerScript: `Hello learners, and welcome to Lesson 10! Today we explore one of the most exciting aspects of AI: using it as a creative brainstorming partner.

Have you ever sat down to come up with a topic for a college symposium, a marketing campaign for a local business, or a YouTube video concept, and your brain just went blank? That feeling is called creative inertia or the blank-page syndrome.

Many people believe AI makes humans less creative. But the opposite is true if you know how to use it! AI is not here to replace human originality; AI is the ultimate divergent brainstorming sounding board.

Think of creativity in two phases:
Phase 1: Divergent Thinking. Generating as many wild, varied, non-obvious angles as possible.
Phase 2: Convergent Thinking. Filtering, curating, and refining the top 2 ideas into an executable plan.

Humans often get stuck because our brains jump straight to Phase 2, criticizing and discarding ideas before giving them room to breathe. AI has no ego and no fear of being judged. It can generate 30 distinct angles in 10 seconds. You, the human curator, then apply your taste, empathy, and cultural context to pick the diamond in the rough.

In this lesson, we will also practice classic innovation frameworks like SCAMPER (Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse) and Edward de Bono's Six Thinking Hats using AI prompts.

Finally, this lesson marks the milestone for your Practical Task 2: Creating a 5-to-8 slide presentation using the combined skills from Lessons 8, 9, and 10! Let us dive in!`,
    demonstrationInstructions: [
      'Open ChatGPT or Gemini and introduce a real-world scenario (e.g., "A student-led initiative to reduce food waste in college hostels").',
      'Run the "Divergent Ideation Storm" prompt asking for 15 unconventional, low-cost ideas categorized by approach (Behavioral, Tech-enabled, Gamified, Community).',
      'Select the most promising idea and run the "Six Thinking Hats" prompt to evaluate it from Emotional, Analytical, Pessimistic, and Optimistic viewpoints.',
      'Use the Mind Map Generator prompt to turn the concept into a visual text-based markdown hierarchy.',
      'Show how to draft a quick 6-slide outline for Practical Task 2 based directly on this brainstormed solution.'
    ],
    practicalExamples: [
      {
        title: 'College Cultural Fest Engagement Strategy',
        scenario: 'A student committee needs to increase student participation in technical paper presentations during the annual college fest.',
        aiWorkflow: 'Used the SCAMPER framework prompt: "How can we apply SCAMPER to traditional 10-minute PowerPoint paper presentations to make them exciting for 500 audience members?"',
        result: 'AI suggested "Combine + Reverse": Turn paper presentations into a 3-minute Shark Tank style pitch where student audience members vote using live phone polls, boosting attendance by 3x.'
      },
      {
        title: 'Local Organic Bakery Marketing Campaign',
        scenario: 'A home baker in Pune wants to launch a healthy millet snack box for IT professionals working long shifts.',
        aiWorkflow: 'Prompted Claude: "Act as a creative copywriter specializing in Indian D2C wellness brands. Generate 5 unique campaign angles for \'Millet Munchies for 4 PM Office Slump\'. Avoid generic fitness clichés."',
        result: 'Generated the winning tagline and campaign angle: "Beat the 4 PM Chai-Samosa Guilt: 100% Roasted Millets, 0% Post-Lunch Fog".'
      }
    ],
    prompts: [
      {
        title: 'Divergent Ideation Storm (30 Angles)',
        category: 'Brainstorming',
        promptText: 'Act as a world-class creative director. I need fresh, unconventional ideas for [CHALLENGE OR GOAL, e.g., promoting student attendance at morning lectures / marketing a local handmade soap brand].\nGenerate 20 distinct ideas split evenly across 4 categories:\n1. Low-Cost / Guerrilla Tactics\n2. Digital & Social Media Gamification\n3. Psychology & Behavioral Nudges\n4. Wild / Moonshot Concepts.\nEnsure the ideas are practical for an Indian context and not generic clichés.',
        variables: ['[CHALLENGE OR GOAL]'],
        intendedPurpose: 'Unlocks a broad spectrum of unconventional creative concepts across multiple tactical categories.'
      },
      {
        title: 'SCAMPER Innovation Framework',
        category: 'Product & Concept Design',
        promptText: 'Apply the SCAMPER innovation framework to reimagine [PRODUCT, SERVICE, OR ACTIVITY]:\n- S (Substitute): What materials, rules, or steps can we swap?\n- C (Combine): What unrelated concepts can we merge?\n- A (Adapt): What can we borrow from a completely different industry?\n- M (Modify/Magnify): What feature can we exaggerate or minimize?\n- P (Put to other use): Who else could benefit from this in an unexpected way?\n- E (Eliminate): What complexity can we strip away?\n- R (Reverse): What happens if we do the exact opposite of industry convention?',
        variables: ['[PRODUCT, SERVICE, OR ACTIVITY]'],
        intendedPurpose: 'Systematically redesigns an existing process or product using structured creativity.'
      },
      {
        title: 'Six Thinking Hats Evaluation',
        category: 'Critical Evaluation',
        promptText: 'Evaluate the following proposal or idea:\n"[PASTE IDEA]"\nAnalyze this idea through Edward de Bono\'s Six Thinking Hats:\n- White Hat (Facts & Data needed)\n- Red Hat (Gut instinct & Emotional reaction of users)\n- Black Hat (Risks, weaknesses, why it might fail)\n- Yellow Hat (Optimism, maximum upside & benefits)\n- Green Hat (Creative ways to overcome the Black Hat risks)\n- Blue Hat (Summary of action steps and next decisions).',
        variables: ['[PASTE IDEA]'],
        intendedPurpose: 'Provides 360-degree scrutiny on a creative idea before investing time and money.'
      },
      {
        title: 'Hierarchical Mind Map Builder',
        category: 'Content Structure',
        promptText: 'I am planning a comprehensive project/content pillar on "[CENTRAL THEME]".\nBuild an indented, hierarchical text mind map with 4 main branches (H2), each containing 3 sub-branches (H3), and each sub-branch having 2 actionable micro-elements (bullet points). Format using clean markdown hierarchy suitable for pasting into Obsidian or Notion.',
        variables: ['[CENTRAL THEME]'],
        intendedPurpose: 'Deconstructs a big creative vision into an organized visual tree structure.'
      },
      {
        title: 'Devil\'s Advocate Stress-Test',
        category: 'Critique & Refinement',
        promptText: 'Act as a skeptical, experienced industry veteran who has seen dozens of similar projects fail. Read my concept draft:\n"[PASTE CONCEPT]"\nRuthlessly challenge my assumptions. Identify 3 hidden failure points, 2 unrealistic timelines, and 2 reasons customers/users will ignore this. Conclude with 2 concrete suggestions to bulletproof this idea.',
        variables: ['[PASTE CONCEPT]'],
        intendedPurpose: 'Stress-tests drafts by exposing blind spots and unexamined assumptions.'
      }
    ],
    studentActivity: {
      title: 'Practical Task 2: Build a 5-to-8 Slide Presentation',
      description: 'Select a creative or technical topic of your choice. Use AI ideation to brainstorm the angle, create the outline, write 3-bullet slides, and format them into a 5-to-8 slide presentation deck.',
      steps: [
        'Pick a topic (e.g., "AI in Healthcare", "Clean Energy for Cities", "Personal Finance for College Students").',
        'Use the Divergent Ideation Storm prompt to pick a unique angle.',
        'Use the Master Presentation Storyboard prompt (Lesson 8) to create the 5 to 8 slide outline.',
        'Format the slides in Canva, Google Slides, or Gamma.',
        'Review the deck against the Rubric: Max 3 bullets per slide, verified facts, and clean visual layout.',
        'Export as PDF for your portfolio submission.'
      ],
      submissionExpected: 'A 5-to-8 slide presentation deck (PDF or link) created with AI assistance.'
    },
    keyTakeaways: [
      'Creativity is a two-step process: Divergent brainstorming (generating volume) followed by Convergent curation (exercising taste).',
      'AI eliminates the blank-page syndrome by producing 20+ distinct angles in seconds without fear or judgment.',
      'Structured frameworks like SCAMPER and Six Thinking Hats prevent groupthink and expose blind spots early.',
      'Always test your creative ideas with a Devil\'s Advocate prompt to anticipate real-world obstacles.',
      'Practical Task 2 milestone: Combine Lessons 8, 9, and 10 to produce your 5-to-8 slide presentation.'
    ],
    suggestedVisuals: [
      'Visual diagram of Divergent Thinking (expanding funnel) vs Convergent Thinking (narrowing funnel)',
      'The SCAMPER wheel diagram showing all 7 innovation vectors',
      'Six Thinking Hats colored icons breakdown (White, Red, Black, Yellow, Green, Blue)'
    ],
    downloadableNotes: `# VeeGo AI LMS - Lesson 10 Cheatsheet: AI for Creative Thinking

## 1. The SCAMPER Framework for Prompting
- **S - Substitute**: What if we swapped the main component?
- **C - Combine**: What if we combined this with an unrelated app?
- **A - Adapt**: How does Netflix or Swiggy solve this engagement problem?
- **M - Modify**: What if we made it 10x faster or micro-sized?
- **P - Put to other use**: How can senior citizens or school kids use this?
- **E - Eliminate**: What if we removed the signup form entirely?
- **R - Reverse**: What if customers paid after 30 days of free usage?

## 2. Practical Task 2 Rubric Checklist (Presentation)
- [ ] 5 to 8 slides total.
- [ ] No slide exceeds 3 bullet points.
- [ ] Visual concept or diagram idea noted for every slide.
- [ ] Spoken speaker notes included for delivery.
- [ ] All statistics or factual statements verified against reliable sources.
`,
    quiz: [
      {
        id: 'q10-1',
        question: 'What is the distinction between divergent and convergent thinking in creative work?',
        options: [
          'Divergent thinking generates multiple varied options, while convergent thinking evaluates and selects the best option',
          'Divergent thinking is done by computers, while convergent thinking is done by artists',
          'Divergent thinking only uses numbers, while convergent thinking uses words',
          'There is no difference; both terms mean writing quickly'
        ],
        correctIndex: 0,
        explanation: 'Divergent thinking expands outward to explore possibilities and generate volume; convergent thinking narrows inward to evaluate, refine, and execute.'
      },
      {
        id: 'q10-2',
        question: 'What does the "Black Hat" represent in Edward de Bono\'s Six Thinking Hats framework?',
        options: [
          'Unbridled optimism and dreaming of best-case scenarios',
          'Critical thinking, risk assessment, identifying weaknesses, and why an idea might fail',
          'Pure emotional reactions without any logic',
          'Procedural meeting management'
        ],
        correctIndex: 1,
        explanation: 'The Black Hat represents critical judgment, identifying risks, drawbacks, and obstacles so ideas can be fortified.'
      },
      {
        id: 'q10-3',
        question: 'What does the letter "E" stand for in the SCAMPER creative framework?',
        options: [
          'Exaggerate',
          'Eliminate',
          'Enlarge',
          'Entertain'
        ],
        correctIndex: 1,
        explanation: 'In SCAMPER, "E" stands for "Eliminate" — questioning what steps, features, or friction can be removed to streamline a product or concept.'
      },
      {
        id: 'q10-4',
        question: 'Why is prompting an AI to act as a "Devil\'s Advocate" beneficial during planning?',
        options: [
          'To discourage you from ever starting a project',
          'To expose hidden assumptions, blind spots, and realistic objections before investing time and money',
          'To generate rude comments for social media',
          'To delete your project files'
        ],
        correctIndex: 1,
        explanation: 'A Devil\'s Advocate prompt acts as a stress test, highlighting vulnerabilities in your plan so you can address them proactively.'
      },
      {
        id: 'q10-5',
        question: 'What is the deliverable for Practical Task 2 in Module 4?',
        options: [
          'A 500-page novel',
          'A 5-to-8 slide presentation deck on a chosen topic with concise bullets and speaker notes',
          'A Python machine learning script',
          'A handwritten letter sent via postal mail'
        ],
        correctIndex: 1,
        explanation: 'Practical Task 2 requires students to create a 5-to-8 slide presentation deck applying prompt outlining, concise bullet structure, and visual clarity.'
      }
    ]
  }
];
