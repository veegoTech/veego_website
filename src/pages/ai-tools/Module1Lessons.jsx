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
  Compass,
  CheckSquare,
  Lock,
  Eye,
  Award,
  Share2
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
// LESSON 1 COMPONENT: WHAT IS ARTIFICIAL INTELLIGENCE?
// =========================================================================
export function Lesson1ModuleView({ onCopy, copiedIndex, openAITutor }) {
  // Mini Quiz State for Lesson 1
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Active Real-World Example Card Tab
  const [activeExampleTab, setActiveExampleTab] = useState('maps');

  // Interactive Traditional vs AI View Mode
  const [activeComparisonView, setActiveComparisonView] = useState('table'); // 'table' | 'flowchart'

  const realWorldExamples = {
    maps: {
      title: 'Google Maps Live Rerouting',
      icon: <MapPin size={22} color="#2563eb" />,
      tag: 'Predictive AI in Daily Commutes',
      summary: 'Analyzes live GPS signals from millions of moving smartphones across India in real-time.',
      traditionalApproach: 'Calculates fixed distance divided by standard speed limit: Time = Distance / Speed. It cannot predict sudden traffic jams on MG Road or Anna Salai.',
      aiApproach: 'Predictive machine learning models continuously ingest live speed data from autos, bikes, and buses, recognizing developing congestion patterns and rerouting you 15 minutes before you reach the traffic knot.',
      impact: 'Saves 20–40 minutes per commute, reduces vehicle fuel consumption, and updates arrival estimates dynamically.'
    },
    swiggy: {
      title: 'Swiggy & Zomato Delivery Dispatch',
      icon: <ShoppingBag size={22} color="#ea580c" />,
      tag: 'Dynamic Logistics Optimization',
      summary: 'Matches thousands of restaurant orders with nearby delivery partners during peak rain and lunch hours.',
      traditionalApproach: 'Dispatches the first driver who logs onto the app nearest to the restaurant, ignoring kitchen prep delays, traffic lights, and multi-order bundling.',
      aiApproach: 'AI algorithms calculate restaurant kitchen prep time, weather delays, and traffic patterns simultaneously, dispatching the driver precisely when the food is packed.',
      impact: 'Food arrives warm, delivery partner fuel costs drop by 18%, and customers receive accurate live arrival minutes.'
    },
    gmail: {
      title: 'Gmail Spam Shield & Smart Compose',
      icon: <Mail size={22} color="#16a34a" />,
      tag: 'Natural Language Pattern Filtering',
      summary: 'Blocks 99.9% of phishing scams and autocompletes professional email sentences.',
      traditionalApproach: 'Simple keyword blacklists: IF subject contains "lottery" THEN spam. Spammers bypass this instantly by spelling "L0tt3ry" or "Prize Winner".',
      aiApproach: 'Natural Language Processing (NLP) models examine sender domain reputation, sentence semantic intent, and link authenticity, blocking deceptive emails regardless of spelling tricks.',
      impact: 'Protects millions of Indian bank accounts from credential phishing without user intervention.'
    },
    faceid: {
      title: 'Smartphone Face Unlock & Biometrics',
      icon: <Smartphone size={22} color="#9333ea" />,
      tag: 'Computer Vision & Neural Networks',
      summary: 'Maps 30,000 infrared facial depth dots in less than 0.2 seconds.',
      traditionalApproach: 'Compares a 2D photograph pixel-by-pixel. If lighting changes, or you put on reading glasses, traditional software fails to match the photo.',
      aiApproach: 'Deep convolutional neural networks learn abstract 3D facial contours and depth vectors, recognizing your face in dark rooms, with beard growth, or with spectacles.',
      impact: 'Instant frictionless security preventing unauthorized access even with physical 2D photograph spoofs.'
    }
  };

  const currentExample = realWorldExamples[activeExampleTab];

  // Recharts Task Execution Speed Data
  const executionSpeedData = [
    { task: 'Drafting 150-word Email', manual: 15, ai: 0.1 },
    { task: 'Summarizing 20-Page PDF', manual: 60, ai: 0.2 },
    { task: 'Categorizing 50 Invoices', manual: 40, ai: 0.15 },
    { task: 'Outlining 8-Slide Deck', manual: 45, ai: 0.25 }
  ];

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the fundamental difference between traditional software and Artificial Intelligence?',
      options: [
        'Traditional software uses internet; AI runs completely offline without electricity.',
        'Traditional software follows rigid, pre-coded rules (IF/THEN); AI learns statistical patterns from training datasets to synthesize contextual responses.',
        'Traditional software is only for mobile phones; AI only runs on supercomputers.',
        'There is no difference; both are identical technologies with different brand names.'
      ],
      correctIndex: 1,
      explanation: 'Traditional software relies on explicit, deterministic instructions written by human programmers (e.g., calculators, spreadsheets). AI analyzes millions of examples to discover patterns and generate original contextual answers.'
    },
    {
      id: 'q2',
      question: 'Which of the following represents an everyday application of AI you already use in India?',
      options: [
        'A manual wall clock ticking on the wall.',
        'Google Maps rerouting you around a traffic bottleneck on MG Road in real-time.',
        'A paper notebook with handwritten algebra formulas.',
        'A standard pocket calculator doing 50 + 25 = 75.'
      ],
      correctIndex: 1,
      explanation: 'Google Maps uses predictive machine learning to aggregate live speeds and sensor data from millions of smartphones to dynamically forecast traffic and reroute drivers.'
    },
    {
      id: 'q3',
      question: 'What is "Generative AI" primarily designed to do?',
      options: [
        'Generate electrical current to charge laptop batteries.',
        'Synthesize brand-new original content such as text, images, slide outlines, and code from natural language prompts.',
        'Repair broken hardware screens and laptop keyboards.',
        'Clean dust from computer cooling fans automatically.'
      ],
      correctIndex: 1,
      explanation: 'Generative AI models create novel outputs (essays, summaries, emails, graphics, scripts) rather than merely classifying or sorting existing data.'
    },
    {
      id: 'q4',
      question: 'In AI terminology, what is a "hallucination"?',
      options: [
        'When the laptop screen flickers due to low battery voltage.',
        'When an AI model confidently states factually incorrect statements, fake citations, or made-up statistics.',
        'When the cloud server goes to sleep during scheduled midnight maintenance.',
        'When a user types with Caps Lock enabled.'
      ],
      correctIndex: 1,
      explanation: 'Because Large Language Models predict probable word sequences rather than consulting an absolute database of facts, they can occasionally fabricate details with complete confidence — requiring human fact-checking.'
    },
    {
      id: 'q5',
      question: 'Why can AI never fully replace human common sense and ethical verification?',
      options: [
        'Because AI does not have real-world physical experience, genuine empathy, or moral accountability.',
        'Because AI algorithms are programmed to erase their memory every 24 hours.',
        'Because AI models are strictly prohibited by law from generating text over 100 words.',
        'Because computers cannot perform mathematical calculations.'
      ],
      correctIndex: 0,
      explanation: 'AI possesses vast pattern recognition, but humans supply emotional intelligence, real-world context, ethical judgment, and factual verification.'
    }
  ];

  const testedPrompts = [
    {
      title: 'Role-Based Concept Explainer (Analogy Generator)',
      prompt: 'Act as a patient college professor. Explain [Difficult Concept, e.g., Cloud Computing or GST] to a complete beginner using an everyday Indian scenario (like making chai or a cricket match). Keep it under 150 words and end with a 1-sentence summary.',
      purpose: 'Demystify complex technical, accounting, or legal topics in under 10 seconds.'
    },
    {
      title: 'Traditional Software vs AI Comparison Generator',
      prompt: 'I am learning the difference between traditional rule-based software and modern AI. Create a clean 3-column Markdown comparison table for the field of [e.g., Hospital Healthcare or Banking]. Columns: Feature, Traditional Software Approach, AI-Assisted Approach. Keep each row under 20 words.',
      purpose: 'Build crystal-clear intuitive mental models for work or exams.'
    },
    {
      title: 'AI Reality Check & Verification Guide',
      prompt: 'I want to use AI to help me with [Task, e.g., preparing a history seminar on the Chola Dynasty]. List 3 things AI will do exceptionally well for this task, and 3 specific facts where AI might hallucinate and where I must double-check official textbooks myself.',
      purpose: 'Prevent blind copy-pasting and establish strong academic integrity.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

      {/* TOPIC 1: AI EXPLAINED WITH SIMPLE REAL-LIFE EXAMPLES */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            TOPIC 1 · CONCEPTUAL FOUNDATION
          </span>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0 0 0' }}>
            What Is Artificial Intelligence? Demystifying AI with Real-Life Examples
          </h3>
        </div>

        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#334155', margin: '0 0 1rem 0' }}>
          When most beginners hear <strong>Artificial Intelligence (AI)</strong>, they imagine science-fiction robots or magical computers. In reality, modern AI is neither magic nor human consciousness.
        </p>

        {/* The Mental Model Card */}
        <div style={{ background: '#eff6ff', borderRadius: '12px', padding: '1.25rem 1.5rem', border: '1px solid #bfdbfe', marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1d4ed8', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.4rem' }}>
            <Brain size={20} /> The "Junior Super-Assistant" Mental Model:
          </div>
          <p style={{ margin: 0, color: '#1e3a8a', fontSize: '0.92rem', lineHeight: 1.65 }}>
            Think of AI as an <strong>extremely fast, well-read junior intern</strong> who has read millions of books, websites, and research papers. If you give this intern vague instructions (<em>"write about sales"</em>), they produce generic filler. But if you give them clear, structured guidelines (<em>"act as a sales manager, write a 120-word email highlighting 3 benefits"</em>), they save you 10 to 15 hours every week!
          </p>
        </div>

        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
          Interactive Real-World Case Studies (You Already Use AI Daily in India):
        </h4>
        <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1rem 0' }}>
          Click each everyday application below to inspect how AI operates behind the scenes:
        </p>

        {/* Tab Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '1.25rem' }}>
          {Object.keys(realWorldExamples).map(key => {
            const ex = realWorldExamples[key];
            const isSelected = activeExampleTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveExampleTab(key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: isSelected ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                  background: isSelected ? '#eff6ff' : '#f8fafc',
                  color: isSelected ? '#1d4ed8' : '#334155',
                  fontWeight: isSelected ? 800 : 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {ex.icon}
                <span style={{ flex: 1 }}>{ex.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Example Deep-Dive Card */}
        <div style={{ background: '#f8fafc', borderRadius: '12px', border: '1.5px solid #cbd5e1', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', background: '#dbeafe', padding: '3px 10px', borderRadius: '20px' }}>
              {currentExample.tag}
            </span>
            <span style={{ fontSize: '0.82rem', color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle size={15} /> Active Indian Application
            </span>
          </div>

          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
            {currentExample.title}
          </h4>
          <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
            {currentExample.summary}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <strong style={{ fontSize: '0.82rem', color: '#dc2626', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                Without AI (Old Deterministic Code):
              </strong>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#334155', lineHeight: 1.55 }}>
                {currentExample.traditionalApproach}
              </p>
            </div>
            <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #86efac' }}>
              <strong style={{ fontSize: '0.82rem', color: '#16a34a', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                With AI (Pattern-Learning Engine):
              </strong>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#14532d', lineHeight: 1.55 }}>
                {currentExample.aiApproach}
              </p>
            </div>
          </div>

          <div style={{ background: '#ecfdf5', borderRadius: '8px', padding: '0.85rem 1rem', border: '1px solid #a7f3d0', fontSize: '0.88rem', color: '#065f46' }}>
            <strong>Real-World Impact:</strong> {currentExample.impact}
          </div>
        </div>
      </div>

      {/* TOPIC 2: AI VERSUS TRADITIONAL SOFTWARE */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            TOPIC 2 · ARCHITECTURAL CONTRAST
          </span>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0 0 0' }}>
            AI versus Traditional Software: Rules vs. Learned Patterns
          </h3>
        </div>

        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#334155', margin: '0 0 1.25rem 0' }}>
          For 50 years, computers operated entirely on <strong>deterministic rules</strong>. A human programmer wrote exact steps: <code>IF password matches THEN allow login</code>. If you misspelled a word, or faced an unpredicted edge case, the program threw an error. AI fundamentally changes this paradigm by <strong>learning patterns from data</strong> rather than relying on pre-programmed IF statements.
        </p>

        {/* View Mode Toggle */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setActiveComparisonView('table')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              border: activeComparisonView === 'table' ? '2px solid #10b981' : '1px solid #cbd5e1',
              background: activeComparisonView === 'table' ? '#ecfdf5' : '#fff',
              color: activeComparisonView === 'table' ? '#065f46' : '#64748b',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            Detailed Comparison Table
          </button>
          <button
            type="button"
            onClick={() => setActiveComparisonView('flowchart')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              border: activeComparisonView === 'flowchart' ? '2px solid #10b981' : '1px solid #cbd5e1',
              background: activeComparisonView === 'flowchart' ? '#ecfdf5' : '#fff',
              color: activeComparisonView === 'flowchart' ? '#065f46' : '#64748b',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            Visual Pipeline Diagram
          </button>
        </div>

        {activeComparisonView === 'table' ? (
          <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '0.85rem 1rem', color: '#334155', fontWeight: 800 }}>Dimension</th>
                  <th style={{ padding: '0.85rem 1rem', color: '#2563eb', fontWeight: 800 }}>Traditional Software</th>
                  <th style={{ padding: '0.85rem 1rem', color: '#16a34a', fontWeight: 800 }}>Modern Artificial Intelligence</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0f172a' }}>Core Logic</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>Hand-crafted deterministic rules (<code>IF / THEN / ELSE</code>)</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>Statistical neural weights trained on billions of parameters</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0f172a' }}>Real-World Example</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>Pocket calculator: <code>50 * 20 = 1000</code> (100% fixed output)</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>ChatGPT drafting a customized job application for an Indian startup</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0f172a' }}>Handling Ambiguity & Typos</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>Crashes or throws syntax error if input doesn't match format</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>Infers meaning from context, slang, messy voice transcripts, or typos</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0f172a' }}>Adaptability</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>Requires human developer to recode and deploy new software version</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>Adapts in seconds when prompted with new instructions or context</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0f172a' }}>Best Used For</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>Exact bank ledger balances, payroll calculations, railway reservations</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>Brainstorming, document summarization, draft generation, language translation</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.5rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: '#eff6ff', borderRadius: '10px', padding: '1.25rem', border: '1px solid #bfdbfe' }}>
                <strong style={{ color: '#1d4ed8', fontSize: '0.95rem', display: 'block', marginBottom: '0.5rem' }}>
                  ⚙️ Traditional Software Pipeline:
                </strong>
                <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#1e3a8a', lineHeight: 1.8 }}>
                  [Input: User Data]<br />
                  &nbsp;&nbsp;⬇️<br />
                  [Fixed Logic: IF Input == X THEN Y]<br />
                  &nbsp;&nbsp;⬇️<br />
                  [Output: Predictable Result (or Crash)]
                </div>
              </div>
              <div style={{ background: '#ecfdf5', borderRadius: '10px', padding: '1.25rem', border: '1px solid #a7f3d0' }}>
                <strong style={{ color: '#065f46', fontSize: '0.95rem', display: 'block', marginBottom: '0.5rem' }}>
                  🧠 AI Pattern-Learning Pipeline:
                </strong>
                <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#064e3b', lineHeight: 1.8 }}>
                  [Input: Messy Natural Language Prompt]<br />
                  &nbsp;&nbsp;⬇️<br />
                  [Neural Net: Matches Contextual Patterns across Billions of Tokens]<br />
                  &nbsp;&nbsp;⬇️<br />
                  [Output: Dynamic, Contextual Synthesis]
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#f0fdf4', borderRadius: '10px', padding: '1rem 1.25rem', borderLeft: '4px solid #16a34a', fontSize: '0.9rem', color: '#166534', lineHeight: 1.6 }}>
          <strong>💡 The Microwave vs. Master Chef Analogy:</strong> Traditional software is like a microwave button: you press "30 seconds" and it heats for exactly 30 seconds. Generative AI is like an experienced chef: you say <em>"I have leftover rice, onions, and curry leaves in Coimbatore; what quick dinner can I prepare in 10 minutes?"</em> and it invents a recipe tailored to your kitchen.
        </div>
      </div>

      {/* TOPIC 3: GENERATIVE AI AND AI ASSISTANTS */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ borderLeft: '4px solid #f59e0b', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            TOPIC 3 · THE MODERN WAVE
          </span>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0 0 0' }}>
            Generative AI and Conversational Assistants: The Paradigm Shift
          </h3>
        </div>

        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#334155', margin: '0 0 1.25rem 0' }}>
          Until 2022, most AI systems were <strong>Predictive or Discriminative</strong> — they merely classified existing data: <em>"Is this transaction on PhonePe fraudulent: Yes or No?"</em> or <em>"Does this image contain a helmet: Yes or No?"</em>
        </p>

        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#334155', margin: '0 0 1.5rem 0' }}>
          <strong>Generative AI</strong> fundamentally broke through by creating <strong>brand-new original content</strong> from plain English prompts:
        </p>

        {/* Generative Modality Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563eb', fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.35rem' }}>
              <FileText size={18} /> Text & Code
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
              Summaries, email replies, Excel formulas, Python scripts, study notes, and legal clauses.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9333ea', fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.35rem' }}>
              <ImageIcon size={18} /> Visual Graphics
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
              Photorealistic imagery, company logos, social media banners, diagrams, and thumbnails.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.35rem' }}>
              <Presentation size={18} /> Presentations
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
              Generates 10-slide decks with titles, bullets, icons, and themes from rough raw notes.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ea580c', fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.35rem' }}>
              <Bot size={18} /> Conversational Chat
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
              Interactive assistants (ChatGPT, Gemini, Copilot) answering questions iteratively like a colleague.
            </p>
          </div>
        </div>

        {/* Recharts Execution Speed Comparison */}
        <div style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <strong style={{ fontSize: '0.92rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BarChart3 size={18} color="#2563eb" /> Productivity Multiplier: Manual Drafting vs. AI Assistance (Minutes)
            </strong>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>First draft generation speed</span>
          </div>

          <div style={{ height: 200, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={executionSpeedData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="task" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} unit="m" />
                <RechartsTooltip
                  formatter={(val, name) => [`${val} mins`, name === 'manual' ? 'Manual Effort' : 'AI Generation']}
                  contentStyle={{ background: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '0.82rem', border: 'none' }}
                />
                <Bar dataKey="manual" fill="#cbd5e1" name="manual" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ai" fill="#3b82f6" name="ai" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TOPIC 4: BENEFITS AND LIMITATIONS OF AI */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ borderLeft: '4px solid #8b5cf6', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            TOPIC 4 · REALISTIC AUDIT
          </span>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0 0 0' }}>
            Benefits and Critical Limitations of AI: The Honest Reality Check
          </h3>
        </div>

        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#334155', margin: '0 0 1.5rem 0' }}>
          To operate AI like a professional rather than an amateur, you must know both its immense superpowers and its non-negotiable boundaries:
        </p>

        {/* Split Grid: Superpowers vs Guardrails */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          
          {/* Superpowers */}
          <div style={{ background: '#f0fdf4', borderRadius: '12px', border: '1.5px solid #86efac', padding: '1.5rem' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#166534', fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={20} color="#16a34a" /> 4 Core Superpowers (Benefits)
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#14532d', fontSize: '0.9rem', lineHeight: 1.7 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Infinite Patience:</strong> You can ask AI to re-explain a complex engineering, medical, or accounting topic 25 times in 25 different ways without any hesitation or irritation.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Overcomes Blank-Page Syndrome:</strong> Starting a fresh resume, project proposal, or client email is hard. AI produces a 70% draft in 3 seconds, so you only spend time refining.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Instant Language Leveling:</strong> Indian professionals who think in Tamil, Hindi, or Telugu can write rough thoughts and command AI to polish it into fluent international business English.
              </li>
              <li>
                <strong>Versatile Cross-Disciplinary Knowledge:</strong> Capable of analyzing an Excel formula, summarizing a 30-page case law, and writing a marketing tag in the same single chat.
              </li>
            </ul>
          </div>

          {/* Critical Limitations */}
          <div style={{ background: '#fef2f2', borderRadius: '12px', border: '1.5px solid #fecaca', padding: '1.5rem' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#991b1b', fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={20} color="#dc2626" /> 4 Critical Limitations (Guardrails)
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#7f1d1d', fontSize: '0.9rem', lineHeight: 1.7 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>AI Hallucinations:</strong> LLMs predict probable word sequences, not verified facts. If unsure, an AI model will smoothly invent fake author names, imaginary court rulings, or made-up statistics with 100% confidence!
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>No Real-World Ground Truth:</strong> AI has never lived in a city, visited a bank branch, or spoken to a customer. It lacks common sense and physical intuition.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Data Privacy & Confidentiality:</strong> Consumer free plans may use chats to train future models. <em>Never paste passwords, customer Aadhaar cards, bank details, or internal corporate secrets into public AI!</em>
              </li>
              <li>
                <strong>The "Garbage In, Garbage Out" Law:</strong> If you input a lazy, vague prompt, you receive useless generic fluff. AI output quality directly reflects prompt engineering quality.
              </li>
            </ul>
          </div>

        </div>

        {/* Verification Rule Banner */}
        <div style={{ background: '#eff6ff', borderRadius: '10px', padding: '1rem 1.25rem', border: '1px solid #bfdbfe', fontSize: '0.92rem', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Shield size={22} color="#2563eb" style={{ flexShrink: 0 }} />
          <span>
            <strong>The Professional AI Golden Rule:</strong> Use AI to generate drafts, ideas, and structures; use your human intelligence to verify facts, apply ethics, and make final decisions. Never copy-paste without reading!
          </span>
        </div>
      </div>

      {/* TOPIC 5: PRACTICAL CASE SCENARIOS */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="#f59e0b" /> Real Student & Professional Case Scenarios
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {/* Scenario 1 */}
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>
              Student Case: Exam Revision
            </span>
            <h4 style={{ margin: '0.35rem 0 0.5rem 0', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              Pooja (2nd-Year B.Com Student, Coimbatore)
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: '0 0 0.75rem 0' }}>
              <strong>Challenge:</strong> 80 pages of textbook notes on Accounting Principles. She has an internal test tomorrow morning and struggles to memorize dry definitions of Real, Personal, and Nominal accounts.
            </p>
            <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#1e293b' }}>
              <strong>AI Solution:</strong> Pooja prompts ChatGPT: <em>"Explain the 3 Golden Rules of Accounting using simple examples from an everyday Tamil Nadu grocery store."</em> Result: Concrete inventory and cash drawer examples that stick in her memory and help her ace the viva.
            </div>
          </div>

          {/* Scenario 2 */}
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase' }}>
              Professional Case: Vendor Relations
            </span>
            <h4 style={{ margin: '0.35rem 0 0.5rem 0', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              Karthik (Logistics Transport Manager, Tiruppur)
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: '0 0 0.75rem 0' }}>
              <strong>Challenge:</strong> A corporate client invoice of ₹45,000 is overdue by 18 days. Karthik does not want to damage a longstanding client relationship by sounding rude, but needs firm commitment by Friday.
            </p>
            <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#1e293b' }}>
              <strong>AI Solution:</strong> Karthik prompts Copilot: <em>"Draft a polite, respectful, yet firm payment reminder email from a logistics vendor to a longstanding client requesting RTGS settlement by Friday."</em> Copilot produces an email in 4 seconds, saving Karthik 30 minutes of stressful drafting.
            </div>
          </div>
        </div>
      </div>

      {/* TOPIC 6: READY-TO-USE TESTED PROMPTS */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={20} color="#10b981" /> Tested Prompt Templates for Lesson 1 (Click to Copy)
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
          Copy these verified templates directly into ChatGPT, Gemini, or Copilot for instant results:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {testedPrompts.map((p, pIdx) => (
            <div key={pIdx} style={{ background: '#0f172a', color: '#f8fafc', borderRadius: '10px', padding: '1.25rem 1.5rem', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#93c5fd', textTransform: 'uppercase' }}>
                  {p.title}
                </span>
                <button
                  type="button"
                  onClick={() => onCopy(p.prompt, pIdx)}
                  style={{
                    background: copiedIndex === pIdx ? '#10b981' : '#334155',
                    border: 'none',
                    color: '#ffffff',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
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

              <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', color: '#e2e8f0' }}>
                {p.prompt}
              </pre>

              <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic', borderTop: '1px dashed #334155', paddingTop: '0.5rem' }}>
                💡 Purpose: {p.purpose}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TOPIC 7: INTERACTIVE KNOWLEDGE CHECK QUIZ */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckSquare size={20} color="#8b5cf6" /> Lesson 1 Knowledge Check Quiz ({quizQuestions.length} MCQs)
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
          Test your comprehension of core AI principles:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {quizQuestions.map((q, qIdx) => {
            const selected = selectedAnswers[qIdx];
            const isCorrect = selected === q.correctIndex;
            return (
              <div key={q.id} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: '0 0 0.85rem 0', fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                  Q{qIdx + 1}: {q.question}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px' }}>
                  {q.options.map((opt, optIdx) => {
                    let btnBorder = selected === optIdx ? '#3b82f6' : '#cbd5e1';
                    let btnBg = selected === optIdx ? '#eff6ff' : '#ffffff';
                    let btnColor = selected === optIdx ? '#1d4ed8' : '#1e293b';

                    if (showResults) {
                      if (optIdx === q.correctIndex) {
                        btnBorder = '#10b981';
                        btnBg = '#ecfdf5';
                        btnColor = '#065f46';
                      } else if (selected === optIdx && !isCorrect) {
                        btnBorder = '#ef4444';
                        btnBg = '#fef2f2';
                        btnColor = '#991b1b';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={showResults}
                        onClick={() => setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx })}
                        style={{
                          textAlign: 'left',
                          padding: '0.65rem 0.9rem',
                          borderRadius: '6px',
                          border: `1.5px solid ${btnBorder}`,
                          background: btnBg,
                          color: btnColor,
                          fontSize: '0.85rem',
                          fontWeight: selected === optIdx ? 700 : 500,
                          cursor: showResults ? 'default' : 'pointer'
                        }}
                      >
                        <span style={{ fontWeight: 800, color: '#64748b', marginRight: '6px' }}>
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.85rem', borderRadius: '6px', background: isCorrect ? '#ecfdf5' : '#fef2f2', border: `1px solid ${isCorrect ? '#a7f3d0' : '#fecaca'}`, fontSize: '0.82rem', color: isCorrect ? '#065f46' : '#991b1b' }}>
                    <strong>{isCorrect ? '✅ Correct!' : '❌ Incorrect.'}</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!showResults && Object.keys(selectedAnswers).length > 0 && (
          <div style={{ textAlign: 'right', marginTop: '1.25rem' }}>
            <button className="btn btn-primary" onClick={() => setShowResults(true)}>
              Check Lesson 1 Quiz Answers
            </button>
          </div>
        )}
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

  // Active Tool Tab
  const [activeToolTab, setActiveToolTab] = useState('chatgpt'); // 'chatgpt' | 'gemini' | 'copilot' | 'specialized'

  const quizQuestions = [
    {
      id: 'l2_q1',
      question: 'Which of the following is the single greatest advantage of Google Gemini for college students and office workers?',
      options: [
        'It works completely without an internet connection.',
        'Deep native integration with Google Workspace (Google Docs, Gmail, Drive) and YouTube lecture video reading.',
        'It generates video games automatically on Android phones.',
        'It never makes any mistakes under any circumstances.'
      ],
      correctIndex: 1,
      explanation: 'Google Gemini natively integrates with Google Docs, Gmail, Drive, and YouTube transcripts, allowing one-click summarization of lectures and email drafting.'
    },
    {
      id: 'l2_q2',
      question: 'Why should researchers and seminar presenters use Perplexity AI or Microsoft Copilot instead of standard ChatGPT without web access?',
      options: [
        'Because standard ChatGPT charges ₹500 per question.',
        'Because Copilot and Perplexity search the live web and provide clickable footnote citations to verify facts with official reports.',
        'Because Perplexity writes in regional languages only.',
        'Because Copilot was developed in the 1990s.'
      ],
      correctIndex: 1,
      explanation: 'Copilot and Perplexity are "grounded in search" — they actively read live web pages and return numbered source citations (like RBI, NITI Aayog) so you can verify data.'
    },
    {
      id: 'l2_q3',
      question: 'Which specialized AI tool is best for converting a rough 1-page outline into an 8-slide presentation deck in 30 seconds?',
      options: [
        'Notepad',
        'Gamma.app (or Canva Magic Studio)',
        'VLC Media Player',
        'Command Prompt'
      ],
      correctIndex: 1,
      explanation: 'Gamma.app and Canva Magic Studio specialize in generative presentation design, structuring slides, styling layouts, and inserting relevant graphics automatically.'
    },
    {
      id: 'l2_q4',
      question: 'Why is it important to know that AI features, model names, and free plan limits change frequently?',
      options: [
        'Because companies often upgrade model speeds, adjust daily query limits, and rename models — but you can accomplish all student tasks on free tiers.',
        'Because all AI accounts are deleted every Monday morning.',
        'Because AI tools will permanently shut down next month.',
        'Because free users are banned from opening web browsers.'
      ],
      correctIndex: 0,
      explanation: 'AI technology evolves rapidly; model names (like GPT-4o mini or Gemini 1.5) and quota limits change frequently, but free plans remain fully sufficient for productive learning.'
    },
    {
      id: 'l2_q5',
      question: 'What crucial privacy setting should you check before using consumer AI tools for sensitive office or student work?',
      options: [
        'Change screen resolution to 4K.',
        'Turn off "Model Training / Chat History Sharing" in account settings if you input sensitive confidential notes.',
        'Delete the web browser every evening.',
        'Turn off Wi-Fi while chatting with AI.'
      ],
      correctIndex: 1,
      explanation: 'Disabling chat history training in ChatGPT, Gemini, or Copilot settings ensures your proprietary inputs are not saved to train public AI models.'
    }
  ];

  const testedPrompts = [
    {
      title: 'AI Tool Recommendation Advisor',
      prompt: 'I need to accomplish the following task: [Describe Task, e.g., Summarize a 40-minute YouTube economics lecture with citations]. Which free AI tool (ChatGPT, Google Gemini, Microsoft Copilot, or Perplexity) is best suited for this task and why? Give a 2-sentence recommendation.',
      purpose: 'Pick the right AI tool without wasting time guessing.'
    },
    {
      title: 'YouTube Lecture Note-Taker (Gemini Special)',
      prompt: 'Analyze this video URL: [Paste YouTube Video Link]. Provide: 1) A 3-sentence executive summary, 2) Timeline of core topics discussed with timestamps, and 3) 5 major action points for students.',
      purpose: 'Extract instant study notes from recorded seminars and video courses.'
    },
    {
      title: 'Sourced Fact Verification Prompt (Copilot / Perplexity)',
      prompt: 'Find verified, current statistics on [Topic, e.g., UPI Digital Payment growth in India over the past 2 years]. Include: 1) Exact numerical figures, 2) Names of official regulatory sources (e.g. RBI or NPCI), and 3) Provide clickable citations.',
      purpose: 'Prevent hallucinations and get footnoted references for academic papers.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

      {/* TOPIC 1: THE BIG THREE GENERAL-PURPOSE ASSISTANTS */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            TOPIC 1 · THE BIG THREE ECOSYSTEM
          </span>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0 0 0' }}>
            The Big Three AI Assistants: ChatGPT, Google Gemini, and Microsoft Copilot
          </h3>
        </div>

        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#334155', margin: '0 0 1.25rem 0' }}>
          When starting with AI, thousands of new tools are released every month. The secret to professional productivity is simple: <strong>master the Big Three general-purpose assistants</strong>. They handle 90% of your student and career tasks on 100% free plans!
        </p>

        {/* Tool Switcher Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '1.5rem' }}>
          {[
            { id: 'chatgpt', name: 'ChatGPT (OpenAI)', badge: 'The Pioneer', color: '#10b981' },
            { id: 'gemini', name: 'Google Gemini', badge: 'Workspace & YouTube', color: '#3b82f6' },
            { id: 'copilot', name: 'Microsoft Copilot', badge: 'Search & Office', color: '#8b5cf6' },
            { id: 'specialized', name: 'Specialized AI Tools', badge: 'Canva, Gamma, Perplexity', color: '#f59e0b' }
          ].map(tool => (
            <button
              key={tool.id}
              type="button"
              onClick={() => setActiveToolTab(tool.id)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: activeToolTab === tool.id ? `2px solid ${tool.color}` : '1px solid #e2e8f0',
                background: activeToolTab === tool.id ? `${tool.color}15` : '#f8fafc',
                color: activeToolTab === tool.id ? '#0f172a' : '#475569',
                fontWeight: activeToolTab === tool.id ? 800 : 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: tool.color, fontWeight: 800 }}>{tool.badge}</div>
              <div style={{ fontSize: '0.95rem' }}>{tool.name}</div>
            </button>
          ))}
        </div>

        {/* Detailed Breakdown Card for Active Tool */}
        <div style={{ background: '#f8fafc', borderRadius: '12px', border: '1.5px solid #cbd5e1', padding: '1.5rem' }}>
          {activeToolTab === 'chatgpt' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '8px' }}>
                <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                  1. ChatGPT by OpenAI (<a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }}>chatgpt.com</a>)
                </h4>
                <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  Open ChatGPT <ExternalLink size={13} />
                </a>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.65, margin: '0 0 1rem 0' }}>
                The pioneer that started the modern Generative AI wave in late 2022. The free plan runs on <strong>GPT-4o mini</strong>, offering an exceptionally clean conversational interface, strong coding abilities, and natural human-like phrasing.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ fontSize: '0.82rem', color: '#16a34a', textTransform: 'uppercase' }}>Best For</strong>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.88rem', color: '#334155' }}>
                    Brainstorming, drafting emails, programming & debugging code, language translation, role-playing interviews.
                  </p>
                </div>
                <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ fontSize: '0.82rem', color: '#2563eb', textTransform: 'uppercase' }}>Key Free Features</strong>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.88rem', color: '#334155' }}>
                    Custom instructions, memory across sessions, file attachment uploads (PDFs, images), excellent Android/iOS apps.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeToolTab === 'gemini' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '8px' }}>
                <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                  2. Google Gemini (<a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }}>gemini.google.com</a>)
                </h4>
                <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  Open Gemini <ExternalLink size={13} />
                </a>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.65, margin: '0 0 1rem 0' }}>
                Google's multimodal flagship running on <strong>Gemini 1.5 Flash</strong>. For Indian students and professionals, its biggest superpower is its deep native integration with the entire Google ecosystem — YouTube, Google Docs, Gmail, and Google Drive.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ fontSize: '0.82rem', color: '#16a34a', textTransform: 'uppercase' }}>Best For</strong>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.88rem', color: '#334155' }}>
                    Summarizing 45-minute YouTube lectures, drafting emails inside Gmail, processing huge 1-million-token textbook PDFs.
                  </p>
                </div>
                <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ fontSize: '0.82rem', color: '#2563eb', textTransform: 'uppercase' }}>Key Free Features</strong>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.88rem', color: '#334155' }}>
                    1-click Google sign-in, double-check response button (verifies claims using Google Search), YouTube video transcript reading.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeToolTab === 'copilot' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '8px' }}>
                <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                  3. Microsoft Copilot (<a href="https://copilot.microsoft.com" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }}>copilot.microsoft.com</a>)
                </h4>
                <a href="https://copilot.microsoft.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  Open Copilot <ExternalLink size={13} />
                </a>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.65, margin: '0 0 1rem 0' }}>
                Built directly into Microsoft Edge and Windows 11. Copilot connects OpenAI's advanced models directly with live Bing web search, ensuring every answer is anchored with clickable footnote links.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ fontSize: '0.82rem', color: '#16a34a', textTransform: 'uppercase' }}>Best For</strong>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.88rem', color: '#334155' }}>
                    Live fact-checking, cited college seminar research, drafting letters within Microsoft Word and PowerPoint.
                  </p>
                </div>
                <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ fontSize: '0.82rem', color: '#2563eb', textTransform: 'uppercase' }}>Key Free Features</strong>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.88rem', color: '#334155' }}>
                    Free access to search grounding, integrated DALL-E image generation (Designer), side-by-side Edge PDF sidebar reading.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeToolTab === 'specialized' && (
            <div>
              <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                4. Specialized AI Tools for Research, Slides & Visuals
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.65, margin: '0 0 1rem 0' }}>
                While the Big Three are conversational generalists, these specialized platforms dominate specific workflows:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2563eb', fontWeight: 800, marginBottom: '0.35rem' }}>
                    <Search size={16} /> Perplexity AI (perplexity.ai)
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                    An AI Answer Engine. Rather than ten spam ad links, Perplexity reads the top web pages and compiles a verified answer with numbered citations to official government, news, and academic papers.
                  </p>
                </div>

                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontWeight: 800, marginBottom: '0.35rem' }}>
                    <Presentation size={16} /> Gamma.app (gamma.app)
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                    Instant AI presentation creator. You paste a 1-page text summary, and Gamma automatically formats an 8-slide presentation with card grids, typography, and images in 30 seconds.
                  </p>
                </div>

                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9333ea', fontWeight: 800, marginBottom: '0.35rem' }}>
                    <ImageIcon size={16} /> Canva Magic Studio (canva.com)
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                    Graphic design powerhouse. Uses AI to expand photos, remove backgrounds with 1 click, rewrite headline copy, and auto-generate social media posters.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TOPIC 2: STEP-BY-STEP ACCOUNT SETUP GUIDE */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            TOPIC 2 · GETTING STARTED
          </span>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0 0 0' }}>
            Free Plans, Account Setup & Basic Usage: 2-Minute Step-by-Step Guide
          </h3>
        </div>

        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#334155', margin: '0 0 1.25rem 0' }}>
          Setting up your AI workspace takes less than 120 seconds. Follow these 4 standard steps:
        </p>

        {/* 4-Step Process Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              1
            </div>
            <strong style={{ fontSize: '0.92rem', color: '#0f172a', display: 'block', marginBottom: '0.35rem' }}>One-Click Sign-In</strong>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
              Use your existing Google Account (Gmail) or Microsoft Account to sign into ChatGPT, Gemini, and Copilot. No credit card required!
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              2
            </div>
            <strong style={{ fontSize: '0.92rem', color: '#0f172a', display: 'block', marginBottom: '0.35rem' }}>Locate the Input Bar</strong>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
              The bottom text bar is your command cockpit. Type instructions in plain English (or Tanglish/Hinglish). Press Enter to stream responses.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              3
            </div>
            <strong style={{ fontSize: '0.92rem', color: '#0f172a', display: 'block', marginBottom: '0.35rem' }}>Organize via Chat History</strong>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
              The left sidebar records your conversations. Start a <em>"New Chat"</em> for each separate project so the AI memory doesn't mix different topics!
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              4
            </div>
            <strong style={{ fontSize: '0.92rem', color: '#0f172a', display: 'block', marginBottom: '0.35rem' }}>Protect Data Privacy</strong>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
              Open Settings &gt; Data Controls &gt; Turn off <em>"Improve model for everyone"</em> if you work with sensitive workplace notes or student marks.
            </p>
          </div>
        </div>
      </div>

      {/* TOPIC 3: CRITICAL NOTICE ON DYNAMIC LIMITS & MODEL VERSIONS */}
      <div style={{ background: '#fffbeb', borderRadius: '14px', border: '1.5px solid #fde68a', padding: '1.75rem' }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
          <AlertTriangle size={28} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ margin: '0 0 0.4rem 0', color: '#92400e', fontSize: '1.15rem', fontWeight: 800 }}>
              Critical Notice: Features, Model Names & Free Plan Limits Change Frequently
            </h4>
            <p style={{ margin: '0 0 0.85rem 0', color: '#b45309', fontSize: '0.92rem', lineHeight: 1.65 }}>
              The AI landscape moves at lightning speed. OpenAI, Google, and Microsoft constantly upgrade model versions (e.g., from GPT-3.5 to GPT-4o mini, from PaLM to Gemini 1.5 Flash). Free-tier message quotas fluctuate during peak traffic hours.
            </p>
            <div style={{ background: '#ffffff', padding: '0.85rem 1.15rem', borderRadius: '8px', border: '1px solid #fde68a', fontSize: '0.88rem', color: '#92400e', lineHeight: 1.6 }}>
              <strong>The VeeGo Assurance:</strong> Never panic if a button shifts or a model is renamed. The core principles of prompting and verification you learn in this course are universal. <strong>Every assignment and productivity workflow in this course can be completed on 100% free tiers without paying a single rupee for paid subscriptions!</strong>
            </div>
          </div>
        </div>
      </div>

      {/* TOPIC 4: TESTED PROMPT TEMPLATES */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={20} color="#10b981" /> Tested Prompt Templates for Lesson 2 (Click to Copy)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {testedPrompts.map((p, pIdx) => (
            <div key={pIdx} style={{ background: '#0f172a', color: '#f8fafc', borderRadius: '10px', padding: '1.25rem 1.5rem', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#93c5fd', textTransform: 'uppercase' }}>
                  {p.title}
                </span>
                <button
                  type="button"
                  onClick={() => onCopy(p.prompt, pIdx + 10)}
                  style={{
                    background: copiedIndex === pIdx + 10 ? '#10b981' : '#334155',
                    border: 'none',
                    color: '#ffffff',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  {copiedIndex === pIdx + 10 ? <Check size={14} /> : <Copy size={14} />}
                  {copiedIndex === pIdx + 10 ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>

              <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', color: '#e2e8f0' }}>
                {p.prompt}
              </pre>

              <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic', borderTop: '1px dashed #334155', paddingTop: '0.5rem' }}>
                💡 Purpose: {p.purpose}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TOPIC 5: INTERACTIVE KNOWLEDGE CHECK QUIZ */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckSquare size={20} color="#8b5cf6" /> Lesson 2 Knowledge Check Quiz ({quizQuestions.length} MCQs)
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
          Verify your mastery of popular AI platforms and safe usage:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {quizQuestions.map((q, qIdx) => {
            const selected = selectedAnswers[qIdx];
            const isCorrect = selected === q.correctIndex;
            return (
              <div key={q.id} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: '0 0 0.85rem 0', fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                  Q{qIdx + 1}: {q.question}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px' }}>
                  {q.options.map((opt, optIdx) => {
                    let btnBorder = selected === optIdx ? '#3b82f6' : '#cbd5e1';
                    let btnBg = selected === optIdx ? '#eff6ff' : '#ffffff';
                    let btnColor = selected === optIdx ? '#1d4ed8' : '#1e293b';

                    if (showResults) {
                      if (optIdx === q.correctIndex) {
                        btnBorder = '#10b981';
                        btnBg = '#ecfdf5';
                        btnColor = '#065f46';
                      } else if (selected === optIdx && !isCorrect) {
                        btnBorder = '#ef4444';
                        btnBg = '#fef2f2';
                        btnColor = '#991b1b';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={showResults}
                        onClick={() => setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx })}
                        style={{
                          textAlign: 'left',
                          padding: '0.65rem 0.9rem',
                          borderRadius: '6px',
                          border: `1.5px solid ${btnBorder}`,
                          background: btnBg,
                          color: btnColor,
                          fontSize: '0.85rem',
                          fontWeight: selected === optIdx ? 700 : 500,
                          cursor: showResults ? 'default' : 'pointer'
                        }}
                      >
                        <span style={{ fontWeight: 800, color: '#64748b', marginRight: '6px' }}>
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.85rem', borderRadius: '6px', background: isCorrect ? '#ecfdf5' : '#fef2f2', border: `1px solid ${isCorrect ? '#a7f3d0' : '#fecaca'}`, fontSize: '0.82rem', color: isCorrect ? '#065f46' : '#991b1b' }}>
                    <strong>{isCorrect ? '✅ Correct!' : '❌ Incorrect.'}</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!showResults && Object.keys(selectedAnswers).length > 0 && (
          <div style={{ textAlign: 'right', marginTop: '1.25rem' }}>
            <button className="btn btn-primary" onClick={() => setShowResults(true)}>
              Check Lesson 2 Quiz Answers
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
