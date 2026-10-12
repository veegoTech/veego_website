import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  Brain,
  Shield,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Layers,
  CheckCircle,
  Smartphone,
  MapPin,
  ShoppingBag,
  Mail,
  RefreshCw,
  Cpu,
  Presentation,
  FileText,
  Search,
  Image as ImageIcon,
  Info,
  Zap,
  Clock,
  HelpCircle,
  TrendingUp,
  BarChart3,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid
} from 'recharts';

// =========================================================================
// LESSON 1: WHAT IS ARTIFICIAL INTELLIGENCE? (INTERACTIVE LAB)
// =========================================================================
export function Lesson1ModuleView({ onCopy, copiedIndex, openAITutor }) {
  // Mini Quiz State for Lesson 1
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Interactive Traditional vs AI Mode Tab
  const [comparisonTab, setComparisonTab] = useState('maps'); // 'calculator' | 'maps' | 'spam' | 'chat'

  // Interactive Token Prediction Simulator State
  const [selectedSeed, setSelectedSeed] = useState('The capital city of Tamil Nadu is');
  const [predictedToken, setPredictedToken] = useState('Chennai');

  const tokenProbabilityMap = {
    'The capital city of Tamil Nadu is': [
      { word: 'Chennai', prob: 98.4, color: '#16a34a' },
      { word: 'Coimbatore', prob: 1.1, color: '#f59e0b' },
      { word: 'Madurai', prob: 0.4, color: '#64748b' },
      { word: 'Trichy', prob: 0.1, color: '#64748b' }
    ],
    'Artificial Intelligence learns from': [
      { word: 'patterns', prob: 94.2, color: '#16a34a' },
      { word: 'electricity', prob: 3.5, color: '#f59e0b' },
      { word: 'magic', prob: 1.8, color: '#64748b' },
      { word: 'batteries', prob: 0.5, color: '#64748b' }
    ],
    'Traditional software operates on rigid': [
      { word: 'rules', prob: 96.1, color: '#16a34a' },
      { word: 'guesses', prob: 2.1, color: '#f59e0b' },
      { word: 'feelings', prob: 1.2, color: '#64748b' },
      { word: 'dreams', prob: 0.6, color: '#64748b' }
    ]
  };

  // Recharts Data: Time to execute common tasks
  const executionSpeedData = [
    { task: 'Drafting 150-word Email', human: 18, ai: 0.05 },
    { task: 'Summarizing 30-Page PDF', human: 90, ai: 0.15 },
    { task: 'Extracting Table to Excel', human: 45, ai: 0.08 },
    { task: 'Generating 5 Topic Ideas', human: 25, ai: 0.03 }
  ];

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the fundamental difference between traditional software and Artificial Intelligence?',
      options: [
        'Traditional software uses internet; AI runs without electricity.',
        'Traditional software follows explicit pre-coded rules (IF/THEN); AI learns patterns from data to synthesize contextual responses.',
        'Traditional software is only for mobile phones; AI only runs on supercomputers.',
        'There is no difference; both are identical technologies.'
      ],
      correctIndex: 1,
      explanation: 'Traditional software relies on fixed deterministic instructions written by human programmers, whereas AI analyzes vast datasets to recognize patterns and generate original responses.'
    },
    {
      id: 'q2',
      question: 'Which of the following is an everyday example of AI you already use in India?',
      options: [
        'A manual wall clock ticking on the wall.',
        'Google Maps rerouting you around a traffic jam on MG Road in real-time.',
        'A paper notebook with handwritten formulas.',
        'A standard calculator doing 25 + 75 = 100.'
      ],
      correctIndex: 1,
      explanation: 'Google Maps uses predictive AI algorithms to analyze live road speeds, traffic patterns, and sensor data to dynamically recommend the fastest routes.'
    },
    {
      id: 'q3',
      question: 'What does the term "AI Hallucination" mean?',
      options: [
        'When the laptop screen flickers due to low battery.',
        'When an AI model confidently states factually incorrect statements, fake citations, or made-up statistics.',
        'When the server goes to sleep during nighttime maintenance.',
        'When a user types with caps lock on.'
      ],
      correctIndex: 1,
      explanation: 'Because LLMs predict probable words rather than consulting an absolute database of facts, they can occasionally fabricate details with high confidence — requiring human fact-checking.'
    }
  ];

  const prompts = [
    {
      title: 'Role-Based Concept Explainer',
      text: 'Act as a patient college professor. Explain [Difficult Concept] to a complete beginner using an everyday Indian scenario (like making chai or a cricket match). Keep it under 150 words and end with a 1-sentence summary.',
      purpose: 'Demystify complex technical, accounting, or legal topics in seconds.'
    },
    {
      title: 'Traditional Software vs AI Analogy Generator',
      text: 'I am learning the difference between traditional rule-based software and AI. Give me 3 contrasting examples from: 1) Cooking in a kitchen, 2) Driving a car, and 3) Managing a grocery store.',
      purpose: 'Build crystal-clear intuitive mental models.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

      {/* 1. INTERACTIVE NEXT-TOKEN PREDICTION FLOWCHART / SIMULATOR */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              HOW GENERATIVE AI ACTUALLY THINKS
            </span>
            <h3 style={{ margin: '0.25rem 0 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Brain size={20} color="#3b82f6" /> Next-Token Probability Visualizer
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', background: '#eff6ff', color: '#1d4ed8', padding: '4px 10px', borderRadius: '20px', fontWeight: 700 }}>
            Interactive Demo
          </span>
        </div>

        <p style={{ fontSize: '0.92rem', color: '#475569', margin: '0 0 1.25rem 0' }}>
          LLMs (ChatGPT, Gemini) do not memorize full paragraphs. Instead, they read your prompt and calculate the <strong>probability of the next most logical word (token)</strong> based on billions of parameters:
        </p>

        {/* Prompt Seed Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.25rem' }}>
          {Object.keys(tokenProbabilityMap).map((seed, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedSeed(seed);
                setPredictedToken(tokenProbabilityMap[seed][0].word);
              }}
              style={{
                padding: '0.5rem 0.9rem',
                borderRadius: '8px',
                border: selectedSeed === seed ? '2px solid #3b82f6' : '1px solid #cbd5e1',
                background: selectedSeed === seed ? '#eff6ff' : '#f8fafc',
                color: selectedSeed === seed ? '#1d4ed8' : '#334155',
                fontSize: '0.85rem',
                fontWeight: selectedSeed === seed ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              "{seed}..."
            </button>
          ))}
        </div>

        {/* Live Probability Distribution Card */}
        <div style={{ background: '#0f172a', borderRadius: '12px', padding: '1.25rem', color: '#f8fafc' }}>
          <div style={{ fontSize: '0.95rem', fontFamily: 'monospace', marginBottom: '1rem', color: '#93c5fd' }}>
            Input Sentence: <span style={{ color: '#ffffff', fontWeight: 700 }}>"{selectedSeed}"</span>
            <span style={{ background: '#10b981', color: '#fff', padding: '2px 8px', borderRadius: '4px', marginLeft: '8px', fontWeight: 800 }}>
              [{predictedToken}]
            </span>
          </div>

          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Calculated Probability Candidate Weights:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
            {tokenProbabilityMap[selectedSeed].map((cand, cIdx) => (
              <div
                key={cIdx}
                onClick={() => setPredictedToken(cand.word)}
                style={{
                  background: predictedToken === cand.word ? '#1e293b' : '#1e293b80',
                  border: predictedToken === cand.word ? '2px solid #10b981' : '1px solid #334155',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#ffffff' }}>"{cand.word}"</strong>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: cand.color }}>{cand.prob}%</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: '#334155', borderRadius: '2px', marginTop: '6px' }}>
                  <div style={{ width: `${cand.prob}%`, height: '100%', background: cand.color, borderRadius: '2px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE COMPARISON TABS: TRADITIONAL SOFTWARE VS AI */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              INTERACTIVE ARCHITECTURE COMPARISON
            </span>
            <h3 style={{ margin: '0.25rem 0 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
              Traditional Rule-Based Software vs. Generative AI
            </h3>
          </div>

          {/* Scenario Tabs */}
          <div style={{ display: 'flex', gap: '6px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
            <button
              type="button"
              onClick={() => setComparisonTab('maps')}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: comparisonTab === 'maps' ? 800 : 600,
                background: comparisonTab === 'maps' ? '#ffffff' : 'transparent',
                color: comparisonTab === 'maps' ? '#1d4ed8' : '#64748b',
                cursor: 'pointer'
              }}
            >
              Traffic Rerouting
            </button>
            <button
              type="button"
              onClick={() => setComparisonTab('calculator')}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: comparisonTab === 'calculator' ? 800 : 600,
                background: comparisonTab === 'calculator' ? '#ffffff' : 'transparent',
                color: comparisonTab === 'calculator' ? '#1d4ed8' : '#64748b',
                cursor: 'pointer'
              }}
            >
              Math & Accounts
            </button>
            <button
              type="button"
              onClick={() => setComparisonTab('spam')}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: comparisonTab === 'spam' ? 800 : 600,
                background: comparisonTab === 'spam' ? '#ffffff' : 'transparent',
                color: comparisonTab === 'spam' ? '#1d4ed8' : '#64748b',
                cursor: 'pointer'
              }}
            >
              Email Spam Detection
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          
          {/* Traditional Card */}
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1.5px solid #cbd5e1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563eb', fontWeight: 800, marginBottom: '0.75rem', fontSize: '0.95rem' }}>
              <Cpu size={18} /> Traditional Deterministic Code
            </div>
            {comparisonTab === 'maps' && (
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                Calculates shortest straight line distance using fixed formulas: <code>Time = Distance / SpeedLimit</code>. Fails to account for unexpected road closures, weddings, or sudden monsoon waterlogging because human coders didn't write an explicit rule for that street today.
              </p>
            )}
            {comparisonTab === 'calculator' && (
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                Calculator logic: <code>50 * 20 = 1000</code>. Absolutely 100% deterministic. If you type a typo like <code>50 ** 20</code>, it throws a Syntax Error rather than inferring your intention.
              </p>
            )}
            {comparisonTab === 'spam' && (
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                Static keyword blacklist: <code>IF subject CONTAINS "lottery" THEN mark_spam()</code>. Spammers easily bypass this by writing "L0ttery" or "Prize winner", breaking the rigid rule.
              </p>
            )}
          </div>

          {/* AI Card */}
          <div style={{ background: '#f0fdf4', padding: '1.25rem', borderRadius: '12px', border: '1.5px solid #86efac' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontWeight: 800, marginBottom: '0.75rem', fontSize: '0.95rem' }}>
              <Sparkles size={18} /> Modern AI Pattern Learning
            </div>
            {comparisonTab === 'maps' && (
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#14532d', lineHeight: 1.6 }}>
                Predictive AI continuously aggregates millions of live GPS signals from auto-rickshaws, cabs, and delivery drivers to anticipate slowing traffic 20 minutes before you even reach the intersection!
              </p>
            )}
            {comparisonTab === 'calculator' && (
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#14532d', lineHeight: 1.6 }}>
                You can feed AI a messy, handwritten photo of a provision store receipt with torn edges and Tamil notes. The AI extracts the items, categorizes them into GST slabs, and explains your expenditure!
              </p>
            )}
            {comparisonTab === 'spam' && (
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#14532d', lineHeight: 1.6 }}>
                AI analyzes contextual intent, sender reputational history, grammatical anomalies, and hyperlink structures to block 99.9% of attacks regardless of clever spelling tricks.
              </p>
            )}
          </div>

        </div>
      </div>

      {/* 3. RECHARTS GRAPH: HUMAN VS AI EXECUTION SPEED */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              PRODUCTIVITY LEVERAGE METRIC
            </span>
            <h3 style={{ margin: '0.25rem 0 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={20} color="#f59e0b" /> Task Execution Speed: Manual Effort vs. AI Assistance (Minutes)
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Minutes to initial first draft
          </span>
        </div>

        <div style={{ height: 250, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={executionSpeedData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="task" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} unit="m" />
              <RechartsTooltip
                formatter={(val, name) => [`${val} mins`, name === 'human' ? 'Manual Work' : 'AI-Assisted First Pass']}
                contentStyle={{ background: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '0.85rem', border: 'none' }}
              />
              <Bar dataKey="human" fill="#94a3b8" name="human" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ai" fill="#3b82f6" name="ai" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. VERIFIED PROMPT TEMPLATES */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={18} color="#10b981" /> Ready-to-Use Prompt Templates (Click to Copy)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {prompts.map((p, idx) => (
            <div key={idx} style={{ background: '#0f172a', color: '#f8fafc', padding: '1.25rem', borderRadius: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#93c5fd' }}>{p.title}</span>
                <button
                  type="button"
                  onClick={() => onCopy(p.text, idx)}
                  style={{ background: copiedIndex === idx ? '#10b981' : '#334155', border: 'none', color: '#fff', padding: '0.25rem 0.65rem', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {copiedIndex === idx ? <Check size={13} /> : <Copy size={13} />}
                  {copiedIndex === idx ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.88rem', whiteSpace: 'pre-wrap', color: '#e2e8f0' }}>{p.text}</pre>
            </div>
          ))}
        </div>
      </div>

      {/* 5. INTERACTIVE 3-QUESTION MINI QUIZ */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
          Lesson 1 Concept Check
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {quizQuestions.map((q, qIdx) => {
            const selected = selectedAnswers[qIdx];
            const isCorrect = selected === q.correctIndex;
            return (
              <div key={q.id} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 700, fontSize: '0.9rem' }}>Q{qIdx + 1}: {q.question}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={showResults}
                      onClick={() => setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx })}
                      style={{
                        textAlign: 'left',
                        padding: '0.55rem 0.8rem',
                        borderRadius: '6px',
                        border: selected === optIdx ? '2px solid #3b82f6' : '1px solid #cbd5e1',
                        background: selected === optIdx ? '#eff6ff' : '#fff',
                        fontSize: '0.85rem',
                        cursor: showResults ? 'default' : 'pointer'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {showResults && (
                  <div style={{ marginTop: '0.5rem', padding: '0.4rem 0.75rem', borderRadius: '6px', background: isCorrect ? '#ecfdf5' : '#fef2f2', fontSize: '0.8rem', color: isCorrect ? '#065f46' : '#991b1b' }}>
                    {isCorrect ? '✅ Correct!' : '❌ Incorrect.'} {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {!showResults && Object.keys(selectedAnswers).length === quizQuestions.length && (
          <div style={{ textAlign: 'right', marginTop: '1rem' }}>
            <button className="btn btn-primary" onClick={() => setShowResults(true)}>
              Check Answers
            </button>
          </div>
        )}
      </div>

    </div>
  );
}


// =========================================================================
// LESSON 2: INTRODUCTION TO POPULAR AI TOOLS (INTERACTIVE LAB)
// =========================================================================
export function Lesson2ModuleView({ onCopy, copiedIndex, openAITutor }) {
  // Interactive Tool Recommendation Selector
  const [targetTask, setTargetTask] = useState('email'); // 'email' | 'video' | 'research' | 'deck'

  const taskRecommendations = {
    email: {
      tool: 'ChatGPT (OpenAI)',
      badge: 'Best for Brainstorming & Writing',
      model: 'GPT-4o mini',
      freeLimit: 'High token allowance, resets every 3 hours',
      why: 'Ideal for conversational role-play, rapid drafting, language translation, and restructuring messy thoughts into professional paragraphs.',
      directLink: 'https://chatgpt.com',
      samplePrompt: 'Act as a professional email editor. Rewrite this draft to sound polite, confident, and under 100 words:\n\n"[Draft]"'
    },
    video: {
      tool: 'Google Gemini',
      badge: 'Best for Google Workspace & YouTube',
      model: 'Gemini 1.5 Flash',
      freeLimit: 'Generous free tier with Google Account',
      why: 'Natively reads YouTube video links, processes large 1-million-token contexts, and connects directly to your Google Docs, Gmail, and Google Drive.',
      directLink: 'https://gemini.google.com',
      samplePrompt: 'Summarize the core takeaways from this YouTube link: [URL] in 5 numbered action points for students.'
    },
    research: {
      tool: 'Microsoft Copilot / Perplexity AI',
      badge: 'Best for Web Grounding & Citations',
      model: 'Search-Grounded Model',
      freeLimit: 'Free Bing web search & basic Perplexity searches daily',
      why: 'Unlike standard chat models that may hallucinate older data, Copilot and Perplexity search the live web and provide clickable footnote sources for every statistic.',
      directLink: 'https://copilot.microsoft.com',
      samplePrompt: 'What was the total volume of UPI digital transactions recorded in India in the latest financial year? Provide source citations.'
    },
    deck: {
      tool: 'Gamma.app & Canva Magic',
      badge: 'Best for Presentation Slides & Visuals',
      model: 'Generative Design Engine',
      freeLimit: '400 free credits on Gamma / Free Canva plan',
      why: 'Converts a rough text outline into a 10-slide presentation with modern card layouts, color palettes, and stock photography in 30 seconds.',
      directLink: 'https://gamma.app',
      samplePrompt: 'Generate an 8-slide presentation outline on "Introduction to AI for College Beginners" with 3 bullets per slide.'
    }
  };

  const currentRec = taskRecommendations[targetTask];

  // Tool Benchmark Data for Recharts
  const toolCapabilityData = [
    { tool: 'ChatGPT-4o mini', writing: 95, reasoning: 92, webSearch: 80, speed: 96 },
    { tool: 'Google Gemini Flash', writing: 88, reasoning: 86, webSearch: 94, speed: 98 },
    { tool: 'Microsoft Copilot', writing: 85, reasoning: 88, webSearch: 96, speed: 82 },
    { tool: 'Perplexity AI', writing: 82, reasoning: 90, webSearch: 99, speed: 88 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

      {/* 1. INTERACTIVE TOOL SELECTOR ("WHICH AI TOOL SHOULD I USE?") */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              INTERACTIVE TOOL DECISION ENGINE
            </span>
            <h3 style={{ margin: '0.25rem 0 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={20} color="#3b82f6" /> Which AI Tool Fits Your Immediate Task?
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', background: '#eff6ff', color: '#1d4ed8', padding: '4px 10px', borderRadius: '20px', fontWeight: 700 }}>
            Select your goal
          </span>
        </div>

        {/* Task Choice Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '1.5rem' }}>
          {[
            { id: 'email', label: '✍️ Email / Writing / Code', icon: <FileText size={16} /> },
            { id: 'video', label: '📺 YouTube / Docs Summary', icon: <Smartphone size={16} /> },
            { id: 'research', label: '🔍 Sourced Web Research', icon: <Search size={16} /> },
            { id: 'deck', label: '📊 Instant Presentation Deck', icon: <Presentation size={16} /> }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTargetTask(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: targetTask === tab.id ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                background: targetTask === tab.id ? '#eff6ff' : '#f8fafc',
                color: targetTask === tab.id ? '#1d4ed8' : '#334155',
                fontWeight: targetTask === tab.id ? 800 : 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Live Recommendation Card */}
        <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', background: '#dcfce7', padding: '3px 8px', borderRadius: '4px' }}>
                Recommended Choice
              </span>
              <h4 style={{ margin: '0.4rem 0 0 0', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                {currentRec.tool}
              </h4>
            </div>
            <a
              href={currentRec.directLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', textDecoration: 'none', padding: '0.5rem 1rem' }}
            >
              Launch Tool <ExternalLink size={14} />
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <strong style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase' }}>Default Free Model</strong>
              <p style={{ margin: '0.2rem 0 0 0', fontWeight: 700, color: '#0f172a', fontSize: '0.92rem' }}>{currentRec.model}</p>
            </div>
            <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <strong style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase' }}>Free Plan Quota</strong>
              <p style={{ margin: '0.2rem 0 0 0', fontWeight: 700, color: '#0f172a', fontSize: '0.92rem' }}>{currentRec.freeLimit}</p>
            </div>
          </div>

          <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
            {currentRec.why}
          </p>

          <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1rem', color: '#f8fafc' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Copyable Starter Prompt:
            </div>
            <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre-wrap', color: '#e2e8f0' }}>
              {currentRec.samplePrompt}
            </pre>
          </div>
        </div>
      </div>

      {/* 2. RECHARTS GRAPH: TOOL CAPABILITY BENCHMARK */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              MODEL BENCHMARK METRICS
            </span>
            <h3 style={{ margin: '0.25rem 0 0 0', fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={20} color="#10b981" /> AI Assistants Feature Benchmark (Score / 100)
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Creative Writing vs. Live Web Accuracy
          </span>
        </div>

        <div style={{ height: 260, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={toolCapabilityData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="tool" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
              <RechartsTooltip
                contentStyle={{ background: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '0.85rem', border: 'none' }}
              />
              <Bar dataKey="writing" fill="#3b82f6" name="Writing / Brainstorming" radius={[4, 4, 0, 0]} />
              <Bar dataKey="webSearch" fill="#10b981" name="Live Web Grounding" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. CRITICAL NOTICE ON DYNAMIC LIMITS */}
      <div style={{ background: '#fffbeb', borderRadius: '12px', border: '1px solid #fde68a', padding: '1.25rem', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <AlertTriangle size={24} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong style={{ color: '#92400e', fontSize: '0.95rem' }}>Important: Model Names & Free Tier Quotas Evolve Periodically</strong>
          <p style={{ margin: '0.35rem 0 0 0', color: '#b45309', fontSize: '0.88rem', lineHeight: 1.5 }}>
            OpenAI, Google, and Microsoft regularly update their model versions (e.g. GPT-4o mini, Gemini 1.5 Flash). Do not worry if buttons or daily message limits change slightly — <strong>100% of workflows in this course can be completed on free plans without paying a single rupee.</strong>
          </p>
        </div>
      </div>

    </div>
  );
}
