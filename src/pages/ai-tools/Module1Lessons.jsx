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
  HelpCircle
} from 'lucide-react';

// =========================================================================
// LESSON 1 COMPONENT: WHAT IS ARTIFICIAL INTELLIGENCE?
// =========================================================================
export function Lesson1ModuleView({ onCopy, copiedIndex, openAITutor }) {
  // Mini Quiz State for Lesson 1
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

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
      question: 'What is "Generative AI" primarily designed to do?',
      options: [
        'Generate electrical power for home appliances.',
        'Produce brand-new original content such as text, images, slide outlines, and code from natural language prompts.',
        'Repair broken hardware screens and laptop keyboards.',
        'Clean dust from computer fans automatically.'
      ],
      correctIndex: 1,
      explanation: 'Generative AI models create novel outputs (essays, summaries, emails, graphics, scripts) rather than merely classifying existing data.'
    },
    {
      id: 'q4',
      question: 'What does the term "AI Hallucination" mean?',
      options: [
        'When the laptop screen flickers due to low battery.',
        'When an AI model confidently states factually incorrect statements, fake citations, or made-up statistics.',
        'When the server goes to sleep during nighttime maintenance.',
        'When a user types with caps lock on.'
      ],
      correctIndex: 1,
      explanation: 'Because LLMs predict probable words rather than consulting an absolute database of facts, they can occasionally fabricate details with high confidence — requiring human fact-checking.'
    },
    {
      id: 'q5',
      question: 'Why can AI never fully replace human common sense and ethical review?',
      options: [
        'Because AI does not have real-world physical experience, genuine empathy, or moral accountability.',
        'Because AI algorithms are programmed to erase their memory every 24 hours.',
        'Because AI models are strictly prohibited from generating text over 100 words.',
        'Because governments do not allow computers to do math.'
      ],
      correctIndex: 0,
      explanation: 'AI possesses vast pattern recognition, but humans supply emotional intelligence, real-world context, ethical judgment, and factual verification.'
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
    },
    {
      title: 'AI Reality Check & Verification Guide',
      text: 'I want to use AI to help me with [Task, e.g., writing a history assignment]. List 3 things AI will do exceptionally well for this task, and 3 things it might get wrong where I must double-check the facts myself.',
      purpose: 'Prevent blind copy-pasting and identify human checkpoints.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* 1. AI EXPLAINED WITH SIMPLE REAL-LIFE EXAMPLES */}
      <div>
        <div style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            1. AI Explained with Simple Real-Life Examples
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            Demystifying Artificial Intelligence without technical jargon
          </p>
        </div>

        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#334155' }}>
          When most people hear <strong>Artificial Intelligence (AI)</strong>, they imagine talking robots or science-fiction movies. In reality, you have already been using AI every single day on your smartphone without realizing it!
        </p>

        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#334155' }}>
          Think of modern AI as an <strong>ultra-fast, well-read junior assistant</strong>. It has read millions of books, web pages, and articles. It doesn't have feelings or magic powers, but it is exceptionally skilled at recognizing patterns and synthesizing text.
        </p>

        {/* Real-Life Examples Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', color: '#2563eb' }}>
              <MapPin size={20} />
              <strong style={{ fontSize: '0.95rem' }}>Google Maps Rerouting</strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
              Maps doesn't just calculate distance; it analyzes millions of live phone speeds and historical traffic data to predict traffic jams and reroute you around bottlenecks in real time.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', color: '#16a34a' }}>
              <ShoppingBag size={20} />
              <strong style={{ fontSize: '0.95rem' }}>Swiggy, Zomato & YouTube</strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
              Recommendation systems learn your food preferences and viewing history over time to suggest videos and restaurants you are statistically most likely to enjoy.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', color: '#d97706' }}>
              <Mail size={20} />
              <strong style={{ fontSize: '0.95rem' }}>Gmail Spam & Autocomplete</strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
              Gmail automatically filters out 99.9% of phishing and spam emails by recognizing patterns in suspicious sender addresses, wording, and malicious attachments.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', color: '#7c3aed' }}>
              <Smartphone size={20} />
              <strong style={{ fontSize: '0.95rem' }}>Phone Face Unlock & Voice</strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
              Computer vision algorithms map thousands of 3D facial dots to unlock your phone even in dim light or when you are wearing spectacles.
            </p>
          </div>
        </div>
      </div>

      {/* 2. AI VERSUS TRADITIONAL SOFTWARE */}
      <div>
        <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            2. AI versus Traditional Software
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            Why AI is different from every software application before it
          </p>
        </div>

        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#334155' }}>
          For the past 50 years, computers operated on <strong>deterministic rules</strong>. A human software engineer wrote explicit instructions: <em>"IF the user clicks submit, AND the password matches, THEN log them in."</em> If an unexpected scenario occurred, traditional software failed with an error.
        </p>

        {/* Comparison Table */}
        <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                <th style={{ padding: '0.9rem 1rem', color: '#334155', fontWeight: 800 }}>Feature</th>
                <th style={{ padding: '0.9rem 1rem', color: '#2563eb', fontWeight: 800 }}>Traditional Software</th>
                <th style={{ padding: '0.9rem 1rem', color: '#16a34a', fontWeight: 800 }}>Artificial Intelligence (AI)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0f172a' }}>Operating Logic</td>
                <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>Strict, rule-based (`IF / THEN`) programmed by humans</td>
                <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>Pattern learning trained on billions of real-world examples</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0f172a' }}>Real-World Example</td>
                <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>Phone calculator: `50 * 20 = 1000` (always identical)</td>
                <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>ChatGPT writing an email tailored to your boss's tone</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0f172a' }}>Handling Ambiguity</td>
                <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>Throws "Syntax Error" if input isn't exact</td>
                <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>Understands typos, informal language, slang, and messy notes</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0f172a' }}>Best Used For</td>
                <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>Accounting balances, banking transactions, exact math</td>
                <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>Drafting documents, summarizing articles, brainstorming ideas</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ padding: '1.25rem', background: '#f0fdf4', borderRadius: '10px', borderLeft: '4px solid #16a34a' }}>
          <strong style={{ color: '#166534', fontSize: '0.92rem' }}>💡 The Kitchen Analogy:</strong>
          <p style={{ margin: '0.25rem 0 0 0', color: '#14532d', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Traditional software is like a microwave button: press "30 seconds" and it heats for exactly 30 seconds. Generative AI is like an experienced chef: you say <em>"I have leftover potatoes and onions, what quick dinner can I make?"</em> and it creatively invents a recipe.
          </p>
        </div>
      </div>

      {/* 3. GENERATIVE AI AND AI ASSISTANTS */}
      <div>
        <div style={{ borderLeft: '4px solid #f59e0b', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            3. Generative AI and AI Assistants
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            From predictive models to creative conversational partners
          </p>
        </div>

        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#334155' }}>
          Until recently, most AI was <strong>Predictive AI</strong>. It analyzed data to answer classification questions: <em>"Is this credit card charge suspicious? Yes or No."</em> <em>"Is this chest X-ray normal? Yes or No."</em>
        </p>

        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#334155' }}>
          <strong>Generative AI (GenAI)</strong> took a massive leap forward: it <em>generates brand-new content</em> that never existed before. Powered by <strong>Large Language Models (LLMs)</strong>, it can generate:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', margin: '1rem 0' }}>
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <FileText size={24} color="#3b82f6" style={{ margin: '0 auto 0.4rem auto' }} />
            <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block' }}>Text & Documents</strong>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Articles, emails, essays, summaries</span>
          </div>

          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <ImageIcon size={24} color="#10b981" style={{ margin: '0 auto 0.4rem auto' }} />
            <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block' }}>Images & Artwork</strong>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Thumbnails, illustrations, posters</span>
          </div>

          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <Presentation size={24} color="#f59e0b" style={{ margin: '0 auto 0.4rem auto' }} />
            <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block' }}>Slide Presentations</strong>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Deck outlines, bullet slides</span>
          </div>

          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <Terminal size={24} color="#8b5cf6" style={{ margin: '0 auto 0.4rem auto' }} />
            <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block' }}>Code & Automation</strong>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Python scripts, SQL queries, HTML</span>
          </div>
        </div>

        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#475569' }}>
          <strong>How do LLMs actually work?</strong> They do not "know" things like human brains do. When you prompt an LLM, it looks at your sentence and calculates which word is statistically most likely to follow next based on patterns learned from billions of sentences. This is called <em>next-token prediction</em>.
        </p>
      </div>

      {/* 4. BENEFITS AND LIMITATIONS OF AI */}
      <div>
        <div style={{ borderLeft: '4px solid #ef4444', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            4. Benefits and Limitations of AI
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            Leveraging AI's superpowers while protecting yourself from its blind spots
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem', margin: '1rem 0' }}>
          {/* Benefits Card */}
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#166534' }}>
              <Zap size={22} />
              <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Major Benefits for Learners</h4>
            </div>
            <ul style={{ paddingLeft: '1.2rem', lineHeight: 1.8, color: '#14532d', fontSize: '0.92rem', margin: 0 }}>
              <li><strong>10x Speed:</strong> Turn 3-hour drafting tasks into 10-minute revision sessions.</li>
              <li><strong>Infinite Patience:</strong> Ask it to explain the same topic 15 different ways without getting annoyed.</li>
              <li><strong>Personalized Learning:</strong> Tailor explanations to your language level, industry, or learning pace.</li>
              <li><strong>Overcoming Blank Page Syndrome:</strong> Get instant starter outlines, email templates, and draft slides.</li>
            </ul>
          </div>

          {/* Limitations Card */}
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#991b1b' }}>
              <AlertTriangle size={22} />
              <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Critical Limitations to Know</h4>
            </div>
            <ul style={{ paddingLeft: '1.2rem', lineHeight: 1.8, color: '#7f1d1d', fontSize: '0.92rem', margin: 0 }}>
              <li><strong>Hallucinations:</strong> AI can invent false statistics, fake author names, and fake book quotes with total confidence.</li>
              <li><strong>No Real Consciousness:</strong> It cannot apply real-world common sense, ethics, or moral accountability.</li>
              <li><strong>Garbage In, Garbage Out:</strong> Vague prompts produce shallow, generic responses.</li>
              <li><strong>Verification Rule:</strong> Always review and verify before submitting assignments or sending client emails.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5. READY-TO-USE PROMPTS */}
      <div>
        <div style={{ borderLeft: '4px solid #6366f1', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            5. Ready-to-Use Practice Prompts
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            Copy these verified prompt templates directly into ChatGPT or Google Gemini
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {prompts.map((p, pIdx) => (
            <div key={pIdx} style={{ background: '#0f172a', borderRadius: '10px', padding: '1.25rem 1.5rem', color: '#f8fafc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase' }}>
                  {p.title}
                </span>
                <button
                  type="button"
                  onClick={() => onCopy(p.text, pIdx)}
                  style={{
                    background: copiedIndex === pIdx ? '#10b981' : '#334155',
                    border: 'none',
                    color: '#ffffff',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  {copiedIndex === pIdx ? <Check size={14} /> : <Copy size={14} />}
                  {copiedIndex === pIdx ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
              <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.88rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', color: '#e2e8f0' }}>
                {p.text}
              </pre>
              <p style={{ margin: '0.6rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
                💡 Purpose: {p.purpose}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. INTERACTIVE KNOWLEDGE CHECK QUIZ */}
      <div>
        <div style={{ borderLeft: '4px solid #8b5cf6', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            6. Interactive Knowledge Check (5 Questions)
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            Test your understanding of Lesson 1 concepts before advancing
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {quizQuestions.map((q, qIdx) => {
            const selected = selectedAnswers[q.id];
            const isCorrect = selected === q.correctIndex;

            return (
              <div
                key={q.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '1.25rem 1.5rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}
              >
                <h4 style={{ margin: '0 0 0.85rem 0', fontSize: '0.98rem', fontWeight: 700, color: '#0f172a' }}>
                  Q{qIdx + 1}: {q.question}
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px' }}>
                  {q.options.map((opt, optIdx) => {
                    let btnBg = '#f8fafc';
                    let btnBorder = '#cbd5e1';
                    let btnColor = '#1e293b';

                    if (selected === optIdx) {
                      btnBg = '#eff6ff';
                      btnBorder = '#3b82f6';
                      btnColor = '#1d4ed8';
                    }

                    if (showResults) {
                      if (optIdx === q.correctIndex) {
                        btnBg = '#ecfdf5';
                        btnBorder = '#10b981';
                        btnColor = '#065f46';
                      } else if (selected === optIdx && !isCorrect) {
                        btnBg = '#fef2f2';
                        btnBorder = '#ef4444';
                        btnColor = '#991b1b';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={showResults}
                        onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                        style={{
                          textAlign: 'left',
                          padding: '0.65rem 0.9rem',
                          borderRadius: '6px',
                          border: `1.5px solid ${btnBorder}`,
                          background: btnBg,
                          color: btnColor,
                          fontSize: '0.85rem',
                          fontWeight: selected === optIdx ? 700 : 500,
                          cursor: showResults ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.15s'
                        }}
                      >
                        <span style={{ fontWeight: 800, color: '#64748b' }}>
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span style={{ flex: 1 }}>{opt}</span>
                        {showResults && optIdx === q.correctIndex && (
                          <CheckCircle size={14} color="#10b981" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <div style={{ marginTop: '0.65rem', padding: '0.5rem 0.85rem', borderRadius: '6px', background: isCorrect ? '#ecfdf5' : '#fef2f2', border: `1px solid ${isCorrect ? '#a7f3d0' : '#fecaca'}`, fontSize: '0.8rem', color: isCorrect ? '#065f46' : '#991b1b' }}>
                    <strong>{isCorrect ? '✅ Correct!' : '❌ Incorrect.'}</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          {!showResults ? (
            <button
              className="btn btn-primary"
              disabled={Object.keys(selectedAnswers).length < 3}
              onClick={() => setShowResults(true)}
              style={{ fontSize: '0.88rem', padding: '0.65rem 1.4rem', opacity: Object.keys(selectedAnswers).length < 3 ? 0.6 : 1 }}
            >
              Check Lesson 1 Quiz Answers
            </button>
          ) : (
            <button
              className="btn btn-outline"
              onClick={() => {
                setSelectedAnswers({});
                setShowResults(false);
              }}
              style={{ fontSize: '0.85rem' }}
            >
              Reset Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


// =========================================================================
// LESSON 2 COMPONENT: INTRODUCTION TO POPULAR AI TOOLS
// =========================================================================
export function Lesson2ModuleView({ onCopy, copiedIndex, openAITutor }) {
  // Mini Quiz State for Lesson 2
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const quizQuestions = [
    {
      id: 'l2_q1',
      question: 'Which AI platform is best known for seamless integration with Gmail, Google Docs, and YouTube video transcripts?',
      options: [
        'ChatGPT',
        'Google Gemini',
        'Microsoft Excel 2007',
        'Adobe Photoshop'
      ],
      correctIndex: 1,
      explanation: 'Google Gemini natively integrates with the Google Workspace ecosystem (Docs, Drive, Gmail) and can summarize YouTube video lecture transcripts directly.'
    },
    {
      id: 'l2_q2',
      question: 'What is a major advantage of Microsoft Copilot and Perplexity AI for research work?',
      options: [
        'They only work when your computer is disconnected from the internet.',
        'They provide real-time web search grounding with clickable source citations and footnotes.',
        'They guarantee 100% free lifetime access to all supercomputers.',
        'They replace the need to study for exams.'
      ],
      correctIndex: 1,
      explanation: 'Copilot (grounded in Bing) and Perplexity AI provide numbered source citations for each claim, allowing users to verify facts against official reports.'
    },
    {
      id: 'l2_q3',
      question: 'Which tool is specialized in converting text outlines into complete presentation slide decks in seconds?',
      options: [
        'Gamma App (gamma.app) / Canva Magic Studio',
        'Microsoft Paint',
        'Notepad.exe',
        'Google Calculator'
      ],
      correctIndex: 0,
      explanation: 'Gamma.app and Canva Magic Studio use Generative AI to design formatted presentation decks, cards, and web pages from text prompts.'
    },
    {
      id: 'l2_q4',
      question: 'Why is it important to know that AI features and free-plan quotas can change frequently?',
      options: [
        'Because AI tools will be banned in India next month.',
        'Because AI companies continuously update model names, daily message caps, and user interfaces, but core prompt skills stay the same.',
        'Because you should never use free software.',
        'Because passwords expire every hour on AI websites.'
      ],
      correctIndex: 1,
      explanation: 'AI companies rapidly iterate on model versions (e.g. GPT-4o mini, Gemini 1.5 Flash) and quotas. Understanding that interfaces change keeps you adaptable while your core prompt engineering techniques remain permanent.'
    },
    {
      id: 'l2_q5',
      question: 'Do you need a paid subscription to complete the practical exercises and student projects in this course?',
      options: [
        'Yes, you must pay $20 per month for every tool.',
        'No, all core workflows taught in this course can be accomplished 100% on free tiers of ChatGPT, Gemini, Copilot, and Gamma.',
        'Only students in college get free access; others must pay.',
        'You need a cryptocurrency wallet to sign up.'
      ],
      correctIndex: 1,
      explanation: 'Every productivity, study notes, slide generation, and resume workflow in this curriculum is designed strictly around reliable, generous 100% free plans.'
    }
  ];

  const prompts = [
    {
      title: 'Tool Selection Advisor Prompt',
      text: 'I need to accomplish the following task: "[Describe Task, e.g. summarize a 30-minute YouTube lecture]". I have access to ChatGPT Free, Google Gemini, and Microsoft Copilot. Which tool is best suited for this task and why? Give a 2-sentence recommendation.',
      purpose: 'Quickly decide which assistant to open for maximum efficiency.'
    },
    {
      title: 'Fact-Checked Research Prompt (Copilot / Perplexity)',
      text: 'Find current, verified statistics on [Topic] in India. Provide: 1) The most recent official numbers, 2) The government ministry or official source name, and 3) 3 key challenges. Please include source citations.',
      purpose: 'Generate academic or business research with verifiable footnotes.'
    },
    {
      title: 'YouTube Lecture Note-Taker Prompt (Gemini)',
      text: 'Analyze the transcript of this educational video: [Paste Video Link]. Provide: 1) A 3-sentence executive summary, 2) 5 main topic takeaways, and 3) 3 practical questions a student should review for exams.',
      purpose: 'Extract instant study guides from recorded lectures.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* 1. THE BIG THREE: CHATGPT, GEMINI, COPILOT */}
      <div>
        <div style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            1. The "Big Three" Conversational AI Assistants
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            Mastering the core trio that handles 95% of student and office workflows
          </p>
        </div>

        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#334155' }}>
          You do not need to learn 50 different AI tools. The secret of top productivity experts is bookmarking <strong>2 or 3 solid general-purpose assistants</strong> and understanding their individual strengths.
        </p>

        {/* The Big Three Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.25rem', margin: '1.5rem 0' }}>
          {/* ChatGPT */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#dcfce7', color: '#166534', padding: '0.25rem 0.6rem', borderRadius: '20px' }}>
                  OpenAI
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>chatgpt.com</span>
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                ChatGPT
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                The pioneer that started the GenAI revolution. The free tier (powered by models like GPT-4o mini) excels at deep reasoning, drafting emails, creative storytelling, rewriting text, and coding assistance.
              </p>
              <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                <div>✨ <strong>Best for:</strong> Creative writing, brainstorming, complex logic, step-by-step problem solving.</div>
                <div>📱 <strong>Mobile App:</strong> Excellent voice mode on iOS & Android.</div>
              </div>
            </div>
            <a
              href="https://chatgpt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ marginTop: '1.25rem', width: '100%', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              Open ChatGPT <ExternalLink size={14} />
            </a>
          </div>

          {/* Google Gemini */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#dbeafe', color: '#1e40af', padding: '0.25rem 0.6rem', borderRadius: '20px' }}>
                  Google
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>gemini.google.com</span>
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                Google Gemini
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                Google's multimodal assistant with massive context windows. Its superpower is direct integration with Google Docs, Gmail, Google Drive, and YouTube video transcripts.
              </p>
              <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                <div>✨ <strong>Best for:</strong> Summarizing YouTube video lectures, Google Docs drafts, Gmail replies.</div>
                <div>⚡ <strong>Setup:</strong> 1-click login with your existing Google account.</div>
              </div>
            </div>
            <a
              href="https://gemini.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ marginTop: '1.25rem', width: '100%', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              Open Google Gemini <ExternalLink size={14} />
            </a>
          </div>

          {/* Microsoft Copilot */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#fef3c7', color: '#92400e', padding: '0.25rem 0.6rem', borderRadius: '20px' }}>
                  Microsoft
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>copilot.microsoft.com</span>
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                Microsoft Copilot
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                Powered by Bing web grounding and OpenAI GPT technology. Built directly into the Microsoft Edge sidebar and Windows 11 taskbar for fast web page summaries.
              </p>
              <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                <div>✨ <strong>Best for:</strong> Web research with live citations, Word/PowerPoint integration, Edge sidebar.</div>
                <div>🔍 <strong>Footnotes:</strong> Highlights clickable source links for every claim.</div>
              </div>
            </div>
            <a
              href="https://copilot.microsoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ marginTop: '1.25rem', width: '100%', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              Open Microsoft Copilot <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* 2. SPECIALIZED AI TOOLS: IMAGES, PRESENTATIONS, RESEARCH */}
      <div>
        <div style={{ borderLeft: '4px solid #8b5cf6', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            2. Specialized AI Tools for Images, Presentations & Research
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            Expanding beyond text into multimedia slides, visual art, and citation-backed research
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', margin: '1.5rem 0' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ec4899', marginBottom: '0.5rem' }}>
              <Presentation size={22} />
              <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>Gamma App (gamma.app)</strong>
            </div>
            <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
              Type an outline or paste a Word document, and Gamma builds a complete, beautifully designed 8-to-12 slide deck with cards, layouts, and icons in under 60 seconds.
            </p>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#db2777', background: '#fce7f3', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
              Free 400 Credits upon signup
            </span>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0ea5e9', marginBottom: '0.5rem' }}>
              <Search size={22} />
              <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>Perplexity AI (perplexity.ai)</strong>
            </div>
            <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
              An AI-powered "answer engine". Unlike standard search that gives 10 ad links, Perplexity reads verified web pages and synthesizes a direct answer with clickable citations.
            </p>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0284c7', background: '#e0f2fe', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
              100% Free General Research
            </span>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b5cf6', marginBottom: '0.5rem' }}>
              <ImageIcon size={22} />
              <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>Canva Magic Studio & Image AI</strong>
            </div>
            <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
              Create posters, social media banners, and illustrations using text prompts. Generate custom imagery directly inside Canva without Photoshop experience.
            </p>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6d28d9', background: '#ede9fe', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
              Free Canva Account Access
            </span>
          </div>
        </div>
      </div>

      {/* 3. FREE PLANS, ACCOUNT SETUP & BASIC USAGE */}
      <div>
        <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            3. Free Plans, Account Setup & Basic Usage
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            Setting up your accounts in under 2 minutes without paying a single rupee
          </p>
        </div>

        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
            Step-by-Step 2-Minute Account Setup:
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#3b82f6', color: '#ffffff', fontSize: '0.85rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                1
              </span>
              <div>
                <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>Use "Continue with Google" for instant sign-in:</strong>
                <p style={{ margin: '0.2rem 0 0 0', color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  On chatgpt.com, gemini.google.com, and copilot.microsoft.com, click "Continue with Google" or "Continue with Microsoft". You do not need to invent new passwords.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#3b82f6', color: '#ffffff', fontSize: '0.85rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                2
              </span>
              <div>
                <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>Familiarize yourself with the 3 main interface zones:</strong>
                <p style={{ margin: '0.2rem 0 0 0', color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  • <strong>Prompt Bar (Bottom):</strong> Where you type your instructions and attach files.<br />
                  • <strong>Chat History (Left Sidebar):</strong> All your past conversations are saved chronologically.<br />
                  • <strong>Regenerate / Copy Buttons (Below output):</strong> Easily copy responses or ask for an alternative draft.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#3b82f6', color: '#ffffff', fontSize: '0.85rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                3
              </span>
              <div>
                <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>Bookmark the tools in your browser:</strong>
                <p style={{ margin: '0.2rem 0 0 0', color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Press <kbd style={{ padding: '0.15rem 0.4rem', background: '#e2e8f0', borderRadius: '4px', fontSize: '0.8rem', fontFamily: 'monospace' }}>Ctrl + D</kbd> (or Cmd + D on Mac) to bookmark ChatGPT and Gemini to your browser's bookmarks bar for instant 1-click access during work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. IMPORTANT NOTICE: FEATURES & FREE-PLAN LIMITS CAN CHANGE */}
      <div>
        <div style={{ padding: '1.5rem', background: '#fffbeb', borderRadius: '12px', border: '1px solid #fde68a', borderLeft: '5px solid #f59e0b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem', color: '#92400e' }}>
            <AlertTriangle size={24} />
            <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>
              ⚠️ Essential Industry Reality: Features & Free-Plan Limits Change Frequently
            </h4>
          </div>

          <p style={{ color: '#78350f', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 0.75rem 0' }}>
            Generative AI is the fastest-evolving technology in computing history. Every few months, companies update their offerings:
          </p>

          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.7, color: '#78350f', fontSize: '0.88rem', margin: '0 0 1rem 0' }}>
            <li><strong>Model Names Change:</strong> (e.g., GPT-3.5 evolved to GPT-4o mini; Gemini evolved from PaLM to Gemini 1.5 Flash).</li>
            <li><strong>Daily Quotas Adjust:</strong> Free tiers may provide 10 or 15 queries per hour of top-tier models before gracefully reverting to fast standard models.</li>
            <li><strong>Interface Buttons Move:</strong> A button called "Regenerate" might change to an edit pencil or a dropdown switcher.</li>
          </ul>

          <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #fef3c7' }}>
            <strong style={{ color: '#b45309', fontSize: '0.9rem' }}>The Golden Rule of this Course:</strong>
            <p style={{ margin: '0.2rem 0 0 0', color: '#451a03', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Do not worry if an interface button changes color or moves slightly! The <strong>prompt engineering frameworks, analytical thinking, Cornell notes structures, and executive communication templates</strong> you master in this course are <em>permanent foundational skills</em> that work across any AI tool today and for the next decade.
            </p>
          </div>
        </div>
      </div>

      {/* 5. READY-TO-USE TOOL PROMPTS */}
      <div>
        <div style={{ borderLeft: '4px solid #6366f1', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            5. Ready-to-Use Practice Prompts
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            Copy these multi-tool prompts into ChatGPT, Gemini, or Copilot
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {prompts.map((p, pIdx) => (
            <div key={pIdx} style={{ background: '#0f172a', borderRadius: '10px', padding: '1.25rem 1.5rem', color: '#f8fafc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase' }}>
                  {p.title}
                </span>
                <button
                  type="button"
                  onClick={() => onCopy(p.text, pIdx + 10)}
                  style={{
                    background: copiedIndex === (pIdx + 10) ? '#10b981' : '#334155',
                    border: 'none',
                    color: '#ffffff',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  {copiedIndex === (pIdx + 10) ? <Check size={14} /> : <Copy size={14} />}
                  {copiedIndex === (pIdx + 10) ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
              <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.88rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', color: '#e2e8f0' }}>
                {p.text}
              </pre>
              <p style={{ margin: '0.6rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
                💡 Purpose: {p.purpose}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. INTERACTIVE KNOWLEDGE CHECK (LESSON 2) */}
      <div>
        <div style={{ borderLeft: '4px solid #8b5cf6', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            6. Interactive Knowledge Check (5 Questions)
          </h3>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            Verify your mastery of popular AI tools before concluding Module 1
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {quizQuestions.map((q, qIdx) => {
            const selected = selectedAnswers[q.id];
            const isCorrect = selected === q.correctIndex;

            return (
              <div
                key={q.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '1.25rem 1.5rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}
              >
                <h4 style={{ margin: '0 0 0.85rem 0', fontSize: '0.98rem', fontWeight: 700, color: '#0f172a' }}>
                  Q{qIdx + 1}: {q.question}
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px' }}>
                  {q.options.map((opt, optIdx) => {
                    let btnBg = '#f8fafc';
                    let btnBorder = '#cbd5e1';
                    let btnColor = '#1e293b';

                    if (selected === optIdx) {
                      btnBg = '#eff6ff';
                      btnBorder = '#3b82f6';
                      btnColor = '#1d4ed8';
                    }

                    if (showResults) {
                      if (optIdx === q.correctIndex) {
                        btnBg = '#ecfdf5';
                        btnBorder = '#10b981';
                        btnColor = '#065f46';
                      } else if (selected === optIdx && !isCorrect) {
                        btnBg = '#fef2f2';
                        btnBorder = '#ef4444';
                        btnColor = '#991b1b';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={showResults}
                        onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                        style={{
                          textAlign: 'left',
                          padding: '0.65rem 0.9rem',
                          borderRadius: '6px',
                          border: `1.5px solid ${btnBorder}`,
                          background: btnBg,
                          color: btnColor,
                          fontSize: '0.85rem',
                          fontWeight: selected === optIdx ? 700 : 500,
                          cursor: showResults ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.15s'
                        }}
                      >
                        <span style={{ fontWeight: 800, color: '#64748b' }}>
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span style={{ flex: 1 }}>{opt}</span>
                        {showResults && optIdx === q.correctIndex && (
                          <CheckCircle size={14} color="#10b981" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <div style={{ marginTop: '0.65rem', padding: '0.5rem 0.85rem', borderRadius: '6px', background: isCorrect ? '#ecfdf5' : '#fef2f2', border: `1px solid ${isCorrect ? '#a7f3d0' : '#fecaca'}`, fontSize: '0.8rem', color: isCorrect ? '#065f46' : '#991b1b' }}>
                    <strong>{isCorrect ? '✅ Correct!' : '❌ Incorrect.'}</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          {!showResults ? (
            <button
              className="btn btn-primary"
              disabled={Object.keys(selectedAnswers).length < 3}
              onClick={() => setShowResults(true)}
              style={{ fontSize: '0.88rem', padding: '0.65rem 1.4rem', opacity: Object.keys(selectedAnswers).length < 3 ? 0.6 : 1 }}
            >
              Check Lesson 2 Quiz Answers
            </button>
          ) : (
            <button
              className="btn btn-outline"
              onClick={() => {
                setSelectedAnswers({});
                setShowResults(false);
              }}
              style={{ fontSize: '0.85rem' }}
            >
              Reset Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
