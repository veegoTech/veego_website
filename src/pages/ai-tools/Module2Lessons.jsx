import React, { useState } from 'react';
import {
  Sparkles,
  Terminal,
  Copy,
  Check,
  Brain,
  Zap,
  ArrowRight,
  TrendingUp,
  Sliders,
  CheckCircle,
  XCircle,
  HelpCircle,
  Layers,
  Send,
  MessageSquare,
  Bot,
  RefreshCw,
  Clock,
  Play,
  RotateCcw,
  Target,
  BarChart3,
  SlidersHorizontal
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid
} from 'recharts';

// =========================================================================
// LESSON 3: UNDERSTANDING PROMPTS (INTERACTIVE LAB)
// =========================================================================
export function Lesson3ModuleView({ onCopy, copiedIndex, openAITutor }) {
  // Interactive Prompt Ingredient Builder State
  const [selectedRole, setSelectedRole] = useState('Senior Career Counselor');
  const [selectedContext, setSelectedContext] = useState('Final year engineering student in Tamil Nadu preparing for IT campus drive');
  const [selectedTask, setSelectedTask] = useState('List the top 3 soft skills interviewers test and how to demonstrate each');
  const [selectedConstraint, setSelectedConstraint] = useState('Keep under 150 words with real Indian interview scenarios');
  const [selectedFormat, setSelectedFormat] = useState('Clean Markdown Table with columns: Skill, What Interviewer Tests, How to Answer');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedOutput, setSimulatedOutput] = useState('');

  // Active Flowchart Node
  const [activeFlowNode, setActiveFlowNode] = useState(1);

  // Recharts Data: Prompt Specificity vs AI Accuracy & Usability
  const promptAccuracyData = [
    { level: '1 Element (Task only)', score: 28, uselessness: 72, label: '"Tell me about resumes"' },
    { level: '2 Elements (+Role)', score: 45, uselessness: 55, label: '"Act as HR, tell me about resumes"' },
    { level: '3 Elements (+Context)', score: 68, uselessness: 32, label: '"Act as HR for TCS/Infosys campus drive..."' },
    { level: '4 Elements (+Constraint)', score: 86, uselessness: 14, label: '"Keep under 150 words, no jargon..."' },
    { level: '5 Elements (Master Prompt)', score: 97, uselessness: 3, label: '"Role + Context + Task + Constraints + Format"' }
  ];

  // Run Prompt Builder Simulation
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulatedOutput('');
    setTimeout(() => {
      setIsSimulating(false);
      setSimulatedOutput(
        `| Skill | What Interviewer Tests | How to Answer in Indian Campus Drives |\n` +
        `| :--- | :--- | :--- |\n` +
        `| **Active Listening** | Can you comprehend complex client requirements without interrupting? | Rephrase the question before answering: *"If I understood correctly, you are asking about..."* |\n` +
        `| **Structured Problem Solving** | How you break down bugs under pressure | Use STAR format (Situation, Task, Action, Result) from your college final-year project. |\n` +
        `| **Professional Humility & Learnability** | Will you adapt to new tech stacks (React, Python, Cloud)? | Acknowledge what you don't know: *"I haven't used Docker in college, but I picked up Git in 3 days."* |`
      );
    }, 600);
  };

  const compiledPrompt = `Act as a ${selectedRole}.\n\nContext:\n${selectedContext}\n\nTask:\n${selectedTask}\n\nConstraints:\n${selectedConstraint}\n\nOutput Format:\n${selectedFormat}`;

  // Mini Quiz
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestions = [
    {
      q: 'Why does "Role + Context + Task + Constraint + Format" produce better AI outputs than a short question?',
      opts: [
        'It forces the AI server to allocate more GPUs.',
        'It narrows down the probabilistic search space in the LLM, eliminating millions of irrelevant generic tokens.',
        'It bypasses OpenAI and Google copyright filters.',
        'AI cannot process sentences with fewer than 20 words.'
      ],
      correct: 1,
      exp: 'LLMs predict tokens statistically. Adding role, context, and negative constraints dramatically prunes generic branches, focusing output directly on high-value domain responses.'
    },
    {
      q: 'Which element is considered a "Negative Constraint"?',
      opts: [
        '"Act as a doctor."',
        '"Format as a table."',
        '"Do not use corporate buzzwords like synergy or leverage."',
        '"Translate this into Tamil."'
      ],
      correct: 2,
      exp: 'Negative constraints explicitly tell the AI what NOT to do, preventing filler fluff and hallucinations.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

      {/* 1. INTERACTIVE PROMPT LIFECYCLE FLOWCHART */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              INTERACTIVE ARCHITECTURE FLOWCHART
            </span>
            <h3 style={{ margin: '0.25rem 0 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
              The Anatomy of an Enterprise Prompt
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', background: '#eff6ff', color: '#1d4ed8', padding: '4px 10px', borderRadius: '20px', fontWeight: 700 }}>
            Click nodes below to inspect
          </span>
        </div>

        {/* Clickable Pipeline Flowchart */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', margin: '1rem 0 1.5rem 0' }}>
          {[
            { id: 1, title: '1. Persona / Role', color: '#3b82f6', desc: 'Sets vocabulary & mindset (e.g. Senior Tech Lead, Patient College Tutor)' },
            { id: 2, title: '2. Background Context', color: '#10b981', desc: 'Provides scenario, target audience, and Indian industry realities' },
            { id: 3, title: '3. Core Task', color: '#f59e0b', desc: 'Specific action verb (Draft, Contrast, Extract, Debug)' },
            { id: 4, title: '4. Constraints', color: '#ef4444', desc: 'Guardrails: word limit, negative rules ("No buzzwords", "Beginner friendly")' },
            { id: 5, title: '5. Output Format', color: '#8b5cf6', desc: 'Structure: Markdown Table, 3 Bullet Points, JSON, or Micro-Email' }
          ].map(node => (
            <div
              key={node.id}
              onClick={() => setActiveFlowNode(node.id)}
              style={{
                cursor: 'pointer',
                padding: '1rem 0.85rem',
                borderRadius: '10px',
                border: activeFlowNode === node.id ? `2px solid ${node.color}` : '1px solid #e2e8f0',
                background: activeFlowNode === node.id ? `${node.color}10` : '#f8fafc',
                transition: 'all 0.2s',
                textAlign: 'center'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: node.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem auto', fontWeight: 800, fontSize: '0.85rem' }}>
                {node.id}
              </div>
              <strong style={{ display: 'block', fontSize: '0.85rem', color: '#0f172a' }}>{node.title.replace(/^\d+\.\s*/, '')}</strong>
            </div>
          ))}
        </div>

        {/* Detailed Explanation for Active Node */}
        <div style={{ background: '#f8fafc', padding: '1.25rem 1.5rem', borderRadius: '10px', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e40af', fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.35rem' }}>
            <Layers size={18} /> Component #{activeFlowNode} Deep Dive:
          </div>
          <p style={{ margin: 0, color: '#334155', fontSize: '0.92rem', lineHeight: 1.6 }}>
            {activeFlowNode === 1 && "A Persona primes the AI's internal attention mechanisms. Asking 'Act as a Senior HR Recruiter in Bengaluru' activates distinct statistical vocabulary compared to simply asking 'How to make a resume?'"}
            {activeFlowNode === 2 && "Context prevents AI from hallucinating generic Western templates. Supplying context like 'Tier-3 engineering college graduate applying for cloud analyst roles' personalizes the output instantly."}
            {activeFlowNode === 3 && "The Task must always start with an imperative action verb. Instead of vague queries like 'AI and accounting', specify: 'Synthesize the top 3 differences between Tally Prime manual reconciliation and AI automated invoicing.'"}
            {activeFlowNode === 4 && "Constraints protect your time. Without constraints, ChatGPT will happily write 600 words of filler. Explicitly say: 'Keep under 120 words. No introduction or polite preamble. Bullet points only.'"}
            {activeFlowNode === 5 && "Format dictates readability. Never settle for plain text blocks. Command the AI to format as a Markdown table, step-by-step checklist, or copy-paste code snippet for immediate productivity."}
          </p>
        </div>
      </div>

      {/* 2. RECHARTS INTERACTIVE GRAPH: PROMPT QUALITY VS USABILITY SCORE */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              VISUAL DATA INSIGHT
            </span>
            <h3 style={{ margin: '0.25rem 0 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={20} color="#10b981" /> Output Value vs. Prompt Ingredient Count
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
            Source: 2,500+ VeeGo Student Prompts Benchmark
          </span>
        </div>

        <p style={{ fontSize: '0.92rem', color: '#475569', margin: '0 0 1.25rem 0' }}>
          Hover over data points to see how moving from single-sentence prompts to 5-ingredient prompts shoots usability from <strong>28% to 97%</strong>.
        </p>

        <div style={{ height: 260, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={promptAccuracyData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="level" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
              <RechartsTooltip
                formatter={(val, name) => [`${val}%`, name === 'score' ? 'Usability Score' : 'Fluff / Noise']}
                contentStyle={{ background: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '0.85rem', border: 'none' }}
              />
              <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#scoreGrad)" name="score" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. LIVE INTERACTIVE PROMPT BUILDER STUDIO */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              HANDS-ON SIMULATION STUDIO
            </span>
            <h3 style={{ margin: '0.25rem 0 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={20} color="#f59e0b" /> Interactive Prompt Builder Studio
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', background: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '20px', fontWeight: 700 }}>
            Assemble your prompt live
          </span>
        </div>

        {/* Builder Selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
              1. Persona / Role:
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', background: '#f8fafc' }}
            >
              <option value="Senior Career Counselor">Senior Career Counselor</option>
              <option value="Expert Full-Stack Software Architect">Expert Full-Stack Software Architect</option>
              <option value="Patient University English Professor">Patient University English Professor</option>
              <option value="Direct-Response Business Copywriter">Direct-Response Business Copywriter</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
              2. Target Format:
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', background: '#f8fafc' }}
            >
              <option value="Clean Markdown Table with columns: Skill, What Interviewer Tests, How to Answer">Markdown 3-Column Table</option>
              <option value="Numbered 3-Step Action Plan with real-world Indian examples">Numbered 3-Step Action Plan</option>
              <option value="Direct 120-word Copyable Email Draft ready to paste into Gmail">Direct Copyable Email</option>
            </select>
          </div>
        </div>

        {/* Live Assembled Code Box */}
        <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1.25rem', color: '#f8fafc', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#93c5fd', textTransform: 'uppercase' }}>
              Live Compiled Prompt (Ready to Copy)
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => onCopy(compiledPrompt, 999)}
                className="btn btn-outline"
                style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem', color: '#fff', borderColor: '#475569' }}
              >
                {copiedIndex === 999 ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                {copiedIndex === 999 ? 'Copied!' : 'Copy Prompt'}
              </button>
              <button
                type="button"
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="btn btn-primary"
                style={{ padding: '0.3rem 0.9rem', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <Play size={13} />
                {isSimulating ? 'Simulating...' : 'Test Simulator'}
              </button>
            </div>
          </div>

          <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.88rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', color: '#e2e8f0' }}>
            {compiledPrompt}
          </pre>
        </div>

        {/* Simulated AI Output Terminal */}
        {simulatedOutput && (
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <Bot size={16} /> Simulated AI Assistant Response (Zero Hallucination):
            </div>
            <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.5, whiteSpace: 'pre-wrap', color: '#1e293b', background: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
              {simulatedOutput}
            </pre>
          </div>
        )}
      </div>

      {/* 4. INTERACTIVE KNOWLEDGE CHECK QUIZ */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
          Lesson 3 Knowledge Check
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {quizQuestions.map((qItem, qIdx) => {
            const selected = quizAnswers[qIdx];
            const isCorrect = selected === qItem.correct;
            return (
              <div key={qIdx} style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: '0 0 0.75rem 0', fontWeight: 700, fontSize: '0.92rem', color: '#1e293b' }}>
                  Q{qIdx + 1}: {qItem.q}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {qItem.opts.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={quizSubmitted}
                      onClick={() => setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx })}
                      style={{
                        textAlign: 'left',
                        padding: '0.6rem 0.9rem',
                        borderRadius: '6px',
                        border: selected === optIdx ? '2px solid #3b82f6' : '1px solid #cbd5e1',
                        background: selected === optIdx ? '#eff6ff' : '#ffffff',
                        fontWeight: selected === optIdx ? 700 : 500,
                        fontSize: '0.85rem',
                        cursor: quizSubmitted ? 'default' : 'pointer'
                      }}
                    >
                      {String.fromCharCode(65 + optIdx)}. {opt}
                    </button>
                  ))}
                </div>
                {quizSubmitted && (
                  <div style={{ marginTop: '0.65rem', padding: '0.5rem 0.85rem', borderRadius: '6px', background: isCorrect ? '#ecfdf5' : '#fef2f2', fontSize: '0.82rem', color: isCorrect ? '#065f46' : '#991b1b' }}>
                    {isCorrect ? '✅ Correct!' : '❌ Incorrect.'} {qItem.exp}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!quizSubmitted && Object.keys(quizAnswers).length === quizQuestions.length && (
          <div style={{ textAlign: 'right', marginTop: '1rem' }}>
            <button className="btn btn-primary" onClick={() => setQuizSubmitted(true)}>
              Check Answers
            </button>
          </div>
        )}
      </div>

    </div>
  );
}


// =========================================================================
// LESSON 4: WRITING BETTER PROMPTS (INTERACTIVE LAB)
// =========================================================================
export function Lesson4ModuleView({ onCopy, copiedIndex, openAITutor }) {
  // Interactive Prompt Comparator Mode
  const [comparisonScenario, setComparisonScenario] = useState('job'); // 'job' | 'study' | 'code'

  // Refiner Studio State
  const [activeModifiers, setActiveModifiers] = useState({
    punchy: false,
    cutLength: false,
    indianContext: true,
    tableFormat: false,
    socratic: false
  });

  const toggleModifier = (key) => {
    setActiveModifiers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Scenarios for Bad vs Good Comparator
  const scenarios = {
    job: {
      title: 'Job Application Email',
      badPrompt: 'Write a cover letter for me for a software job.',
      badScore: 22,
      badOutput: 'Dear Hiring Manager,\nI am writing to express my interest in the software position at your company. I have strong skills and work hard. I look forward to hearing from you.\nSincerely,\nCandidate',
      goodPrompt: 'Act as a senior tech recruiter. Draft a high-impact, 130-word cold outreach email to the VP of Engineering at a Bengaluru SaaS startup. I am a 2026 CS graduate who built a React & Supabase inventory tool used by 4 local stores. Include: 1) Punchy opening hook, 2) 2 quantified metrics, 3) 15-minute call-to-action on Google Meet this week. Avoid generic buzzwords like "hardworking" or "passionate".',
      goodScore: 96,
      goodOutput: 'Subject: Full-Stack Project: Built inventory tool live with 4 local stores | CS Grad 2026\n\nHi Rajesh,\n\nI noticed your engineering team recently scaled automated billing for B2B merchants. Last semester, I built and deployed an open-source React & Supabase billing dashboard that cut checkout time by 35% across 4 retail supermarkets in Coimbatore.\n\nTwo quick highlights from my work:\n- Zero server crashes with real-time optimistic sync handling 800+ transactions/day\n- Integrated UPI QR generation directly into receipts, eliminating manual reconciliation\n\nI would welcome a brief 15-minute Google Meet this Thursday to share what I learned and discuss open junior developer roles on your team.\n\nBest regards,\nArun Kumar | github.com/arun'
    },
    study: {
      title: 'College Exam Preparation',
      badPrompt: 'Explain operating systems memory management.',
      badScore: 30,
      badOutput: 'Memory management is the process of controlling and coordinating computer memory, assigning portions called blocks to various running programs to optimize overall system performance.',
      goodPrompt: 'Act as a patient professor teaching 2nd-year B.Tech students in India. Explain Virtual Memory and Paging using the exact real-world analogy of a library study desk with limited space and a central book shelf. Contrast Paging vs Segmentation in a 2-column Markdown table. End with 1 probable 5-mark viva question and the ideal 20-word answer.',
      goodScore: 94,
      goodOutput: 'Imagine your study table can only hold 4 textbooks at a time (RAM), but the library has 10,000 books (Hard Drive). Paging is swapping only the exact chapter pages you are reading onto your table rather than carrying entire 1,000-page books!\n\n| Feature | Paging | Segmentation |\n| :--- | :--- | :--- |\n| **Block Size** | Fixed-size blocks (Pages) | Variable-size blocks (Functions/Modules) |\n| **View** | Physical hardware division | Logical programmer division |\n| **Fragmentation** | Suffers Internal Fragmentation | Suffers External Fragmentation |\n\n**Probable 5-Mark Viva Question:** What causes a Page Fault?\n*Ideal 20-word Answer:* A Page Fault occurs when a program attempts to access memory data not currently resident in physical RAM.'
    },
    code: {
      title: 'Excel / SQL Data Request',
      badPrompt: 'Give me a formula for sales data in Excel.',
      badScore: 18,
      badOutput: '=SUM(A1:A10)',
      goodPrompt: 'Act as a senior data analyst. I have an Excel sheet with columns A (Store_City), B (Product_Category), and C (Revenue_INR). Write an exact XLOOKUP or SUMIFS formula to calculate total revenue for "Electronic items" in "Chennai". Provide step-by-step breakdown of each argument so an intern can understand.',
      goodScore: 98,
      goodOutput: '=SUMIFS(C:C, A:A, "Chennai", B:B, "Electronics")\n\nExplanation of arguments:\n1. C:C = Sum_range (The actual numbers we want added)\n2. A:A, "Chennai" = Criteria_range1 and match value\n3. B:B, "Electronics" = Criteria_range2 and match value'
    }
  };

  const currentScenarioData = scenarios[comparisonScenario];

  // Recharts Time Saved Graph
  const productivityData = [
    { task: 'Drafting 1st Email', traditional: 45, basicAI: 15, engineeredPrompt: 4 },
    { task: 'Exam Chapter Summary', traditional: 120, basicAI: 40, engineeredPrompt: 12 },
    { task: 'Excel Data Extraction', traditional: 60, basicAI: 25, engineeredPrompt: 3 },
    { task: 'Slide Outline (10 pgs)', traditional: 90, basicAI: 35, engineeredPrompt: 8 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

      {/* 1. BAD VS GOOD PROMPT SPLIT-SCREEN COMPARATOR */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              INTERACTIVE SIDE-BY-SIDE AUDIT
            </span>
            <h3 style={{ margin: '0.25rem 0 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
              Weak Prompt vs. 5-Star Engineered Prompt
            </h3>
          </div>

          {/* Scenario Filter Tabs */}
          <div style={{ display: 'flex', gap: '6px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
            <button
              type="button"
              onClick={() => setComparisonScenario('job')}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: comparisonScenario === 'job' ? 800 : 600,
                background: comparisonScenario === 'job' ? '#ffffff' : 'transparent',
                color: comparisonScenario === 'job' ? '#1d4ed8' : '#64748b',
                cursor: 'pointer',
                boxShadow: comparisonScenario === 'job' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              Job Outreach
            </button>
            <button
              type="button"
              onClick={() => setComparisonScenario('study')}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: comparisonScenario === 'study' ? 800 : 600,
                background: comparisonScenario === 'study' ? '#ffffff' : 'transparent',
                color: comparisonScenario === 'study' ? '#1d4ed8' : '#64748b',
                cursor: 'pointer',
                boxShadow: comparisonScenario === 'study' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              Exam Viva
            </button>
            <button
              type="button"
              onClick={() => setComparisonScenario('code')}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: comparisonScenario === 'code' ? 800 : 600,
                background: comparisonScenario === 'code' ? '#ffffff' : 'transparent',
                color: comparisonScenario === 'code' ? '#1d4ed8' : '#64748b',
                cursor: 'pointer',
                boxShadow: comparisonScenario === 'code' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              Excel / SQL
            </button>
          </div>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          
          {/* WEAK PROMPT CARD */}
          <div style={{ background: '#fef2f2', borderRadius: '12px', border: '1.5px solid #fecaca', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#dc2626', fontWeight: 800, fontSize: '0.85rem' }}>
                <XCircle size={16} /> VAGUE PROMPT (THE MISTAKE)
              </span>
              <span style={{ background: '#fee2e2', color: '#991b1b', fontSize: '0.75rem', fontWeight: 800, padding: '3px 8px', borderRadius: '20px' }}>
                Score: {currentScenarioData.badScore}/100
              </span>
            </div>

            <div style={{ background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #fecaca', fontStyle: 'italic', color: '#334155', fontSize: '0.9rem', marginBottom: '1rem' }}>
              "{currentScenarioData.badPrompt}"
            </div>

            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7f1d1d', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Resulting Generic AI Output:
            </span>
            <div style={{ flex: 1, background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px dashed #fca5a5', color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
              {currentScenarioData.badOutput}
            </div>

            <div style={{ marginTop: '0.75rem', color: '#991b1b', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
              ⚠️ Zero context, sounds like an automated robot, lacks proof or personality.
            </div>
          </div>

          {/* ENGINEERED PROMPT CARD */}
          <div style={{ background: '#f0fdf4', borderRadius: '12px', border: '1.5px solid #bbf7d0', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontWeight: 800, fontSize: '0.85rem' }}>
                <CheckCircle size={16} /> ENGINEERED PROMPT (THE PRO WAY)
              </span>
              <span style={{ background: '#dcfce7', color: '#14532d', fontSize: '0.75rem', fontWeight: 800, padding: '3px 8px', borderRadius: '20px' }}>
                Score: {currentScenarioData.goodScore}/100
              </span>
            </div>

            <div style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.85rem 1rem', borderRadius: '8px', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem', position: 'relative' }}>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                {currentScenarioData.goodPrompt}
              </pre>
              <button
                type="button"
                onClick={() => onCopy(currentScenarioData.goodPrompt, 888)}
                style={{ position: 'absolute', top: '8px', right: '8px', background: '#334155', border: 'none', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer' }}
              >
                {copiedIndex === 888 ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#14532d', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Resulting High-Leverage AI Output:
            </span>
            <div style={{ flex: 1, background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #86efac', color: '#1e293b', fontSize: '0.85rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
              {currentScenarioData.goodOutput}
            </div>

            <div style={{ marginTop: '0.75rem', color: '#166534', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
              ✅ Quantified metrics, tailored to audience, actionable, ready to send immediately.
            </div>
          </div>

        </div>
      </div>

      {/* 2. INTERACTIVE PROMPT MODIFIER CHIPS ("REFINER STUDIO") */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              1-CLICK PROMPT MODIFIER CHIPS
            </span>
            <h3 style={{ margin: '0.25rem 0 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
              The 5 Magic Follow-Up Modifiers
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Click buttons to toggle prompt rules
          </span>
        </div>

        <p style={{ fontSize: '0.92rem', color: '#475569', margin: '0 0 1.25rem 0' }}>
          Never accept an AI response on the first turn! Use these 5 battle-tested modifiers to reshape outputs instantly:
        </p>

        {/* Interactive Modifier Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
          {[
            { id: 'punchy', label: '⚡ Make it punchier (Remove passive voice)', prompt: 'Rewrite this. Cut all passive voice sentences. Use active, energetic language and start bullets with action verbs.' },
            { id: 'cutLength', label: '✂️ Cut length by 50%', prompt: 'Reduce the total word count by 50% without omitting any core facts or action items.' },
            { id: 'indianContext', label: '🇮🇳 Add Indian Market Context', prompt: 'Tailor all examples and numbers specifically for Tier-1 & Tier-2 Indian cities (mention INR currency, UPI, local businesses).' },
            { id: 'tableFormat', label: '📊 Convert to Markdown Table', prompt: 'Convert this entire explanation into a 3-column Markdown table with columns: Concept, Real-World Example, Key Takeaway.' },
            { id: 'socratic', label: '🧐 Socratic Tutor Mode', prompt: 'Do not give me the answer immediately. Ask me 1 guiding question at a time to help me deduce the solution myself like a tutor.' }
          ].map(chip => (
            <button
              key={chip.id}
              type="button"
              onClick={() => toggleModifier(chip.id)}
              style={{
                padding: '0.55rem 0.95rem',
                borderRadius: '20px',
                border: activeModifiers[chip.id] ? '2px solid #8b5cf6' : '1px solid #cbd5e1',
                background: activeModifiers[chip.id] ? '#f5f3ff' : '#ffffff',
                color: activeModifiers[chip.id] ? '#6d28d9' : '#334155',
                fontSize: '0.85rem',
                fontWeight: activeModifiers[chip.id] ? 800 : 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s'
              }}
            >
              {chip.label}
              {activeModifiers[chip.id] && <Check size={14} color="#6d28d9" />}
            </button>
          ))}
        </div>

        {/* Active Modifiers Prompt Box */}
        <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <strong style={{ fontSize: '0.85rem', color: '#1e293b', display: 'block', marginBottom: '0.5rem' }}>
            Combined Active Refinement Commands:
          </strong>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>
            {activeModifiers.punchy && <li>"Rewrite cutting passive voice with high energy."</li>}
            {activeModifiers.cutLength && <li>"Reduce total word count by 50%."</li>}
            {activeModifiers.indianContext && <li>"Anchor examples in Indian market scenarios and INR figures."</li>}
            {activeModifiers.tableFormat && <li>"Format the output strictly as a structured Markdown table."</li>}
            {activeModifiers.socratic && <li>"Act as a Socratic tutor; guide me step-by-step with 1 question at a time."</li>}
            {!Object.values(activeModifiers).some(Boolean) && <li style={{ fontStyle: 'italic', color: '#94a3b8' }}>Click any modifier above to see the exact prompt instruction!</li>}
          </ul>
        </div>
      </div>

      {/* 3. RECHARTS BAR CHART: TRADITIONAL VS PROMPT-ENGINEERED TIME SAVINGS */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              TIME AUDIT BENCHMARK
            </span>
            <h3 style={{ margin: '0.25rem 0 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={20} color="#3b82f6" /> Minutes Spent per Task: Without AI vs. Engineered Prompting
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Average across student assignments
          </span>
        </div>

        <div style={{ height: 260, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productivityData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="task" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} unit="m" />
              <RechartsTooltip
                formatter={(val, name) => [`${val} mins`, name === 'traditional' ? 'Manual Effort' : name === 'basicAI' ? 'Basic AI (Vague Prompt)' : 'Engineered Prompting']}
                contentStyle={{ background: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '0.85rem', border: 'none' }}
              />
              <Bar dataKey="traditional" fill="#cbd5e1" name="traditional" radius={[4, 4, 0, 0]} />
              <Bar dataKey="basicAI" fill="#93c5fd" name="basicAI" radius={[4, 4, 0, 0]} />
              <Bar dataKey="engineeredPrompt" fill="#10b981" name="engineeredPrompt" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '1rem', fontSize: '0.82rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 12, height: 12, background: '#cbd5e1', borderRadius: 2 }} /> Manual Effort</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 12, height: 12, background: '#93c5fd', borderRadius: 2 }} /> Basic Vague Prompt</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 12, height: 12, background: '#10b981', borderRadius: 2 }} /> <strong>Engineered 5-Part Prompt (90% faster)</strong></div>
        </div>
      </div>

      {/* 4. INTERACTIVE SOCRATIC TUTOR DEMO */}
      <div style={{ background: '#eff6ff', borderRadius: '14px', border: '1px solid #bfdbfe', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1d4ed8', fontWeight: 800, marginBottom: '0.5rem' }}>
          <Brain size={20} /> Pro Tip: Socratic AI (The Smart Student's Superpower)
        </div>
        <p style={{ margin: 0, color: '#1e3a8a', fontSize: '0.92rem', lineHeight: 1.6 }}>
          Never ask AI: <em>"Give me the code for this binary search tree"</em> or <em>"Solve this physics numerical."</em> If you do, you learn zero and fail the exam viva. Instead, prompt:
        </p>
        <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #bfdbfe', margin: '0.75rem 0', fontFamily: 'monospace', fontSize: '0.88rem', color: '#0f172a' }}>
          "Act as a patient professor. Do NOT solve this problem for me. Ask me what the first logical step is, evaluate my answer, and guide me to the correct formula step-by-step."
        </div>
        <p style={{ margin: 0, color: '#1e3a8a', fontSize: '0.88rem' }}>
          This turns ChatGPT into a 24/7 personal tutor who never gets frustrated when you ask 10 questions in a row!
        </p>
      </div>

    </div>
  );
}
