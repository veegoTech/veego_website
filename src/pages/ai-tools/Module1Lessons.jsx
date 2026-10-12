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

// =========================================================================
// LESSON 1 COMPONENT: WHAT IS ARTIFICIAL INTELLIGENCE?
// =========================================================================
export function Lesson1ModuleView({ onCopy, copiedIndex, openAITutor }) {
  // Language Mode: 'en' (English), 'ta' (Tamil), 'both' (Bilingual)
  const [langMode, setLangMode] = useState('both');

  // Active Real-World Everyday Example Tab
  const [activeExampleTab, setActiveExampleTab] = useState('maps');

  // Interactive Traditional vs AI View Mode
  const [activeComparisonView, setActiveComparisonView] = useState('table'); // 'table' | 'flowchart'

  // Interactive Building Blocks Tab
  const [activeBuildingBlock, setActiveBuildingBlock] = useState('ml'); // 'ml' | 'dl' | 'genai'

  // Interactive Classifications of AI Tab
  const [activeClassification, setActiveClassification] = useState('ani'); // 'ani' | 'agi' | 'asi'

  // Interactive Industry Impact Tab
  const [activeImpactSector, setActiveImpactSector] = useState('healthcare'); // 'healthcare' | 'finance' | 'education' | 'dailylife'

  // Interactive Responsible AI Tab
  const [activeEthicsTab, setActiveEthicsTab] = useState('bias'); // 'bias' | 'privacy' | 'economics' | 'governance'

  const realWorldExamples = {
    maps: {
      title: 'Google Maps Live Rerouting',
      icon: <MapPin size={22} color="#2563eb" />,
      tag: 'Predictive Narrow AI in Daily Commutes',
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
      tag: 'Computer Vision & Deep Neural Networks',
      summary: 'Maps 30,000 infrared facial depth dots in less than 0.2 seconds.',
      traditionalApproach: 'Compares a 2D photograph pixel-by-pixel. If lighting changes, or you put on reading glasses, traditional software fails to match the photo.',
      aiApproach: 'Deep convolutional neural networks learn abstract 3D facial contours and depth vectors, recognizing your face in dark rooms, with beard growth, or with spectacles.',
      impact: 'Instant frictionless security preventing unauthorized access even with physical 2D photograph spoofs.'
    }
  };

  const currentExample = realWorldExamples[activeExampleTab];

  // Building Blocks Data (from NotebookLM)
  const buildingBlocks = {
    ml: {
      name: 'Machine Learning (ML)',
      badge: 'Core Foundation',
      color: '#2563eb',
      definition: 'A subset of AI where algorithms are trained on datasets to discover patterns and make predictions without being explicitly hardcoded for every scenario.',
      howItWorks: 'Instead of writing manual rules (e.g. IF income > 50k), the algorithm analyzes historical records of loan approvals, calculates statistical correlations, and predicts probability scores for new applicants.',
      everydayExamples: 'Netflix/YouTube recommendation feeds, spam filters, predictive maintenance in factories, stock market trend indicators.',
      keyTakeaway: 'The machine learns from historical examples; as data volume grows, accuracy improves.'
    },
    dl: {
      name: 'Deep Learning (DL)',
      badge: 'Neural Network Architecture',
      color: '#7c3aed',
      definition: 'A specialized branch of machine learning utilizing multi-layered Artificial Neural Networks (ANNs) inspired by the biological human brain.',
      howItWorks: 'Raw signals pass through input, hidden, and output neuron layers. Early layers detect low-level edges/pixels; middle layers recognize shapes and contours; deep layers identify complete concepts like human faces or tumor boundaries.',
      everydayExamples: 'Self-driving Tesla/Waymo computer vision, MRI medical scan diagnosis, real-time voice translation, facial unlock biometrics.',
      keyTakeaway: 'Excels at complex sensory data (images, video, audio) that traditional algorithms cannot decipher.'
    },
    genai: {
      name: 'Generative AI (GenAI)',
      badge: 'Creative & Conversational Wave',
      color: '#059669',
      definition: 'Advanced AI systems (such as Large Language Models and diffusion models) trained on vast internet corpuses to create brand-new original content from natural language prompts.',
      howItWorks: 'Trained on trillions of text tokens or image-caption pairs using transformer architectures, predicting probable next tokens or denoising latent vectors to synthesize cohesive answers, code, or art.',
      everydayExamples: 'ChatGPT, Google Gemini, Microsoft Copilot, Claude, Midjourney, GitHub Copilot.',
      keyTakeaway: 'Moves beyond analyzing and classifying data to synthesizing entirely new text, code, graphics, and strategies.'
    }
  };

  // Classifications of AI (from NotebookLM)
  const classifications = {
    ani: {
      name: 'Artificial Narrow Intelligence (ANI)',
      aka: 'Weak AI',
      status: '✅ ACTIVE TODAY (100% of current AI)',
      statusColor: '#16a34a',
      scope: 'Specialized for a single, well-defined task domain.',
      description: 'Systems engineered to excel at one specific problem — such as playing grandmaster chess, transcribing audio, recognizing faces, or drafting text. A chess engine cannot drive a car, and ChatGPT cannot perform heart surgery.',
      examples: ['Google Maps navigation', 'AlphaGo & Stockfish', 'Siri & Alexa voice commands', 'ChatGPT & Gemini conversational models']
    },
    agi: {
      name: 'Artificial General Intelligence (AGI)',
      aka: 'Strong AI',
      status: '⏳ THEORETICAL MILESTONE (Under Active Research)',
      statusColor: '#d97706',
      scope: 'Human-level cognitive capability across all intellectual tasks.',
      description: 'A theoretical future machine capable of comprehending, learning, reasoning, abstracting, and adapting across any intellectual task just like a human being. It would transfer knowledge across completely unrelated fields without specialized retraining.',
      examples: ['Autonomous scientific discovery across physics and medicine', 'Self-evolving general software engineers', 'General cognitive problem-solving across all human professions']
    },
    asi: {
      name: 'Artificial Superintelligence (ASI)',
      aka: 'Superhuman Intelligence',
      status: '🔮 HYPOTHETICAL FUTURE STAGE',
      statusColor: '#9333ea',
      scope: 'Surpasses the collective intelligence of all human minds combined.',
      description: 'A hypothetical stage where artificial systems exceed human cognitive capabilities in every single domain — including scientific creativity, general wisdom, philosophical reasoning, and social skills.',
      examples: ['Instant solutions to global climate physics', 'Interstellar propulsion breakthroughs', 'Autonomous macro-economic optimization at planetary scale']
    }
  };

  // Real-World Industry Impact Data (from NotebookLM)
  const industryImpacts = {
    healthcare: {
      title: 'Healthcare & Medicine',
      icon: <Brain size={22} color="#dc2626" />,
      color: '#dc2626',
      headline: 'Early Disease Detection & Molecular Drug Discovery',
      points: [
        { label: 'Radiology Imaging', desc: 'CNN models inspect X-rays, MRIs, and CT scans in seconds to detect micro-tumors and fractures earlier than the human eye.' },
        { label: 'Drug Discovery', desc: 'Accelerates screening of billions of chemical compounds from 10 years to weeks (e.g. DeepMind AlphaFold predicting protein structures).' },
        { label: 'Personalized Treatment', desc: 'Analyzes patient genomic profiles to customize oncology chemotherapy plans with reduced side effects.' }
      ]
    },
    finance: {
      title: 'Business & Finance',
      icon: <TrendingUp size={22} color="#059669" />,
      color: '#059669',
      headline: 'Real-Time Fraud Prevention & Algorithmic Market Forecasting',
      points: [
        { label: 'Instant Fraud Detection', desc: 'Analyzes millions of UPI, credit card, and NEFT transactions per second, freezing fraudulent account transfers before money leaves the bank.' },
        { label: 'Algorithmic Risk Underwriting', desc: 'Assesses loan applications in seconds based on multi-variable credit signals rather than rigid paper forms.' },
        { label: 'Workflow Automation', desc: 'Parses incoming vendor invoices, matches purchase orders, and logs bookkeeping entries automatically.' }
      ]
    },
    education: {
      title: 'Education & Creativity',
      icon: <BookOpen size={22} color="#2563eb" />,
      color: '#2563eb',
      headline: '24/7 Personalized AI Tutors & Synthetic Media Generation',
      points: [
        { label: 'Adaptive Tutoring', desc: 'Personalizes lesson pacing, explanations, and analogies to each student\'s learning speed without judgment.' },
        { label: 'Developer Coding Copilots', desc: 'Suggests unit tests, autocompletes functions, and debugs syntax errors in real-time, tripling engineering velocity.' },
        { label: 'Creative Content Creation', desc: 'Generates initial drafts of presentation decks, social media banners, marketing copy, and podcast scripts.' }
      ]
    },
    dailylife: {
      title: 'Daily Life & Society',
      icon: <Smartphone size={22} color="#7c3aed" />,
      color: '#7c3aed',
      headline: 'Intelligent Navigation, Speech Translation & Smart Living',
      points: [
        { label: 'Predictive Navigation', desc: 'Dynamically routes millions of vehicles around traffic accidents and road repairs in real-time.' },
        { label: 'Live Multilingual Translation', desc: 'Breaks communication barriers by translating speech between languages instantly in video calls and messaging.' },
        { label: 'Smart Home Automation', desc: 'Learns household temperature preferences, optimizes electricity consumption, and manages smart appliances.' }
      ]
    }
  };

  // Responsible AI & Ethics Data (from NotebookLM)
  const ethicsTopics = {
    bias: {
      title: 'Algorithmic Bias & Fairness',
      badge: 'Data Integrity Risk',
      color: '#dc2626',
      problem: 'AI systems learn from historical human-generated datasets. If historical data contains societal prejudices or gender/demographic disparities, the AI algorithm will learn, mirror, and amplify that bias.',
      realExample: 'A recruitment AI trained on 10 years of predominantly male tech resumes may unfairly penalize female applicants because it statistically associates success with male profile phrasing.',
      safeguard: 'Audit training data for demographic representation, implement algorithmic fairness metrics, and mandate diverse human oversight panels.'
    },
    privacy: {
      title: 'Privacy & Data Security',
      badge: 'Information Protection',
      color: '#d97706',
      problem: 'AI models require vast data volumes. Consumer free tools often log user inputs to train future models, creating risks of leaking sensitive personal data, corporate secrets, or student records.',
      realExample: 'An employee pasting confidential quarterly financials or customer Aadhaar card numbers into a public chatbot inadvertently exposes proprietary data to third-party cloud servers.',
      safeguard: 'Never paste passwords, banking details, or confidential records into free public AI; utilize enterprise instances with zero-data-retention guarantees.'
    },
    economics: {
      title: 'Workforce Shifts & Reskilling',
      badge: 'Economic Reality',
      color: '#2563eb',
      problem: 'AI automates repetitive analytical and drafting tasks. While routine cognitive tasks will be transformed, jobs that blend AI proficiency with human emotional intelligence will expand rapidly.',
      realExample: 'Data entry, basic translation, and repetitive boilerplate writing are heavily impacted; prompt-skilled professionals and strategic managers gain a massive productivity edge.',
      safeguard: 'Focus on continuous upskilling: learn to pilot AI tools effectively while cultivating uniquely human skills like critical thinking, empathy, and ethical judgment.'
    },
    governance: {
      title: 'Governance & Alignment (Responsible AI)',
      badge: 'Safety Standards',
      color: '#059669',
      problem: 'Ensuring advanced AI systems remain transparent, interpretable, safe, and aligned with human values and safety standards rather than operating as black boxes.',
      realExample: 'Deepfakes and automated synthetic disinformation on social media distorting public trust during elections or business announcements.',
      safeguard: 'Cryptographic digital watermarking on AI-generated media, clear disclosure policies, and strict regulatory frameworks for high-stakes AI applications.'
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

      {/* LESSON HEADER BANNER */}
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '14px', padding: '1.75rem', color: '#ffffff', border: '1px solid #334155', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.4)', borderRadius: '20px', padding: '3px 12px', fontSize: '0.78rem', color: '#93c5fd', fontWeight: 700, marginBottom: '0.65rem' }}>
              <Sparkles size={14} /> Official Curriculum · NotebookLM Grounded · தமிழ் & English
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
              Introduction to AI: Understanding the Future of Intelligence
            </h2>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#60a5fa', marginBottom: '0.4rem' }}>
              செயற்கை நுண்ணறிவு அறிமுகம்: நவீன அறிவாற்றலின் எதிர்காலம்
            </div>
            <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.92rem', color: '#cbd5e1', maxWidth: '780px', lineHeight: 1.6 }}>
              {langMode !== 'ta' && "Artificial Intelligence has rapidly shifted from science fiction into the foundation of modern technology. Explore the core definition of AI, its nested building blocks, the 3 classifications, real-world industry transformations, and the ethical foundations of Responsible AI."}
              {langMode === 'both' && <br />}
              {langMode !== 'en' && <span style={{ color: '#93c5fd' }}>அறிவியல் புனைகதையிலிருந்து விடுபட்டு இன்றைய தொழில்நுட்பத்தின் அடித்தளமாக மாறியுள்ளது AI. செயற்கை நுண்ணறிவு என்றால் என்ன, அதன் 3 அடிப்படைக் கூறுகள், 3 வகைப்பாடுகள், வேலைவாய்ப்பு மற்றும் நிஜ உலகப் பயன்பாடுகளை எளிய தமிழில் கற்றுக் கொள்ளுங்கள்.</span>}
            </p>

            {/* Language Mode Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>கற்கும் மொழி / Language:</span>
              {[
                { id: 'both', label: '🌐 இருமொழி (Bilingual)' },
                { id: 'ta', label: '🇮🇳 தமிழ் மட்டும் (Tamil Only)' },
                { id: 'en', label: '🇬🇧 English Only' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLangMode(item.id)}
                  style={{
                    background: langMode === item.id ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    border: langMode === item.id ? '1.5px solid #93c5fd' : '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    padding: '4px 12px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: langMode === item.id ? '0 2px 8px rgba(59,130,246,0.5)' : 'none'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TOPIC 1: WHAT IS ARTIFICIAL INTELLIGENCE? */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            TOPIC 1 · CORE DEFINITION · அடிப்படைக் கருத்து
          </span>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0 0 0' }}>
            {langMode !== 'ta' && "What Is Artificial Intelligence? Demystifying AI with Real-Life Examples"}
            {langMode === 'both' && <span style={{ display: 'block', fontSize: '1.15rem', color: '#2563eb', marginTop: '0.2rem' }}>செயற்கை நுண்ணறிவு என்றால் என்ன? எளிய நிஜ வாழ்க்கை உதாரணங்கள்</span>}
            {langMode === 'ta' && "செயற்கை நுண்ணறிவு என்றால் என்ன? எளிய நிஜ வாழ்க்கை உதாரணங்கள்"}
          </h3>
        </div>

        {langMode !== 'ta' && (
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#334155', margin: '0 0 0.85rem 0' }}>
            At its core, <strong>Artificial Intelligence (AI)</strong> refers to the simulation of human intelligence in machines programmed to <strong>think, learn, adapt, and problem-solve</strong>. Unlike traditional software that follows rigid, human-written rules to yield a specific output, AI systems ingest massive amounts of data, identify subtle patterns, and make decisions or predictions autonomously.
          </p>
        )}

        {langMode !== 'en' && (
          <div style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '4px solid #3b82f6', marginBottom: '1.25rem', fontSize: '0.95rem', color: '#1e293b', lineHeight: 1.75 }}>
            <strong style={{ color: '#1d4ed8' }}>🎯 எளிய தமிழ் விளக்கம்:</strong> மனிதனைப் போல <strong>சுயமாக சிந்தித்து, பழைய தரவுகளிலிருந்து கற்றுக்கொண்டு, சூழலுக்கு ஏற்ப முடிவெடுத்து சிக்கல்களைத் தீர்க்கும்</strong> கணினி அமைப்புகளே "செயற்கை நுண்ணறிவு" (AI) எனப்படுகின்றன. மனித புரோகிராமர் எழுதும் நிலையான விதிகளுக்கு மட்டுமே அடிபணியாமல், தரவுகளிலிருந்து தானாகவே வடிவங்களைக் (patterns) கண்டறிந்து புதிய பதில்களை இது உருவாக்குகிறது.
          </div>
        )}

        {/* The Mental Model Card */}
        <div style={{ background: '#eff6ff', borderRadius: '12px', padding: '1.25rem 1.5rem', border: '1px solid #bfdbfe', marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1d4ed8', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.4rem' }}>
            <Brain size={20} /> The "Junior Super-Assistant" Mental Model / "ஜூனியர் உதவியாளர்" மனப் படிமம்:
          </div>
          <p style={{ margin: 0, color: '#1e3a8a', fontSize: '0.92rem', lineHeight: 1.7 }}>
            {langMode !== 'ta' && <>Think of AI as an <strong>extremely fast, well-read junior intern</strong> who has read millions of books, websites, and research papers. If you give this intern vague instructions (<em>"write about sales"</em>), they produce generic filler. But if you give them clear, structured guidelines (<em>"act as a sales manager, write a 120-word email highlighting 3 benefits"</em>), they save you 10 to 15 hours every week!</>}
            {langMode === 'both' && <br />}
            {langMode !== 'en' && <span style={{ display: 'block', marginTop: langMode === 'both' ? '0.5rem' : 0 }}>💡 <strong>தமிழ் விளக்கம்:</strong> AI என்பது மாயாஜாலமோ அல்லது உங்களை வேலைநீக்கம் செய்யும் ரோபோவோ அல்ல. அது <strong>கோடிக்கணக்கான புத்தகங்களையும் இணையப் பக்கங்களையும் நொடியில் வாசித்த ஒரு அதிவேக ஜூனியர் உதவியாளர்</strong> போன்றது. அவரிடம் அரைகுறையாக கேள்வி கேட்டால் பொதுவான பதிலையே தருவார்; ஆனால் தெளிவான கட்டளைகளை (Prompt) கொடுத்தால், உங்கள் வாரத்தின் 15 மணிநேர வேலைப்பளுவை உடனடியாகக் குறைத்துவிடுவார்!</span>}
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
              <CheckCircle size={15} /> Active Everyday Application
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

      {/* TOPIC 3: THE BUILDING BLOCKS OF AI (ML, DL, GENAI) */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ borderLeft: '4px solid #7c3aed', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            TOPIC 3 · NESTED ARCHITECTURE
          </span>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0 0 0' }}>
            The 3 Building Blocks of AI: Machine Learning, Deep Learning & Generative AI
          </h3>
        </div>

        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#334155', margin: '0 0 1.25rem 0' }}>
          Artificial Intelligence is an overarching umbrella concept. Beneath it lies a hierarchy of nested technologies that have evolved over decades, culminating in today's generative models:
        </p>

        {/* Visual Hierarchy Diagram */}
        <div style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 700 }}>
            <span style={{ background: '#dbeafe', color: '#1e40af', padding: '6px 14px', borderRadius: '20px', border: '1px solid #bfdbfe' }}>
              1. Artificial Intelligence (AI)
            </span>
            <span style={{ color: '#94a3b8' }}>&rarr; encompasses &rarr;</span>
            <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '6px 14px', borderRadius: '20px', border: '1px solid #c7d2fe' }}>
              2. Machine Learning (ML)
            </span>
            <span style={{ color: '#94a3b8' }}>&rarr; includes &rarr;</span>
            <span style={{ background: '#f3e8ff', color: '#6b21a8', padding: '6px 14px', borderRadius: '20px', border: '1px solid #e9d5ff' }}>
              3. Deep Learning (DL / ANNs)
            </span>
            <span style={{ color: '#94a3b8' }}>&rarr; powers &rarr;</span>
            <span style={{ background: '#d1fae5', color: '#065f46', padding: '6px 14px', borderRadius: '20px', border: '1px solid #a7f3d0' }}>
              4. Generative AI (LLMs)
            </span>
          </div>
        </div>

        {/* Building Blocks Interactive Tab Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginBottom: '1.25rem' }}>
          {Object.keys(buildingBlocks).map(key => {
            const block = buildingBlocks[key];
            const isSelected = activeBuildingBlock === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveBuildingBlock(key)}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  border: isSelected ? `2px solid ${block.color}` : '1px solid #e2e8f0',
                  background: isSelected ? '#faf5ff' : '#f8fafc',
                  color: isSelected ? block.color : '#334155',
                  fontWeight: isSelected ? 800 : 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b' }}>
                  {block.badge}
                </span>
                <span>{block.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Block Inspector */}
        {(() => {
          const b = buildingBlocks[activeBuildingBlock];
          return (
            <div style={{ background: '#f8fafc', borderRadius: '12px', border: `1.5px solid ${b.color}40`, padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '8px' }}>
                <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: b.color }}>
                  {b.name}
                </h4>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: `${b.color}15`, color: b.color, padding: '3px 10px', borderRadius: '12px' }}>
                  {b.badge}
                </span>
              </div>

              <p style={{ fontSize: '0.95rem', color: '#1e293b', lineHeight: 1.65, margin: '0 0 1rem 0' }}>
                <strong>Definition:</strong> {b.definition}
              </p>

              <div style={{ background: '#ffffff', borderRadius: '8px', padding: '1rem', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                <strong style={{ fontSize: '0.82rem', color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                  How It Actually Operates:
                </strong>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>
                  {b.howItWorks}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ fontSize: '0.8rem', color: '#0f172a', display: 'block', marginBottom: '0.25rem' }}>
                    📱 Everyday Examples:
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{b.everydayExamples}</span>
                </div>
                <div style={{ background: '#ecfdf5', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                  <strong style={{ fontSize: '0.8rem', color: '#065f46', display: 'block', marginBottom: '0.25rem' }}>
                    💡 Key Insight:
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: '#047857' }}>{b.keyTakeaway}</span>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* TOPIC 4: CLASSIFICATIONS OF AI (ANI, AGI, ASI) */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ borderLeft: '4px solid #f59e0b', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            TOPIC 4 · CAPABILITY SPECTRUM
          </span>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0 0 0' }}>
            The 3 Classifications of AI: Narrow (ANI), General (AGI), & Superintelligence (ASI)
          </h3>
        </div>

        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#334155', margin: '0 0 1.25rem 0' }}>
          In computer science, AI capabilities are categorized into three distinct evolutionary stages. Understanding this taxonomy is crucial to separate actual modern tools from science fiction:
        </p>

        {/* Classification Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {Object.keys(classifications).map(key => {
            const c = classifications[key];
            const isSelected = activeClassification === key;
            return (
              <div
                key={key}
                onClick={() => setActiveClassification(key)}
                style={{
                  background: isSelected ? '#fffbeb' : '#f8fafc',
                  border: isSelected ? '2px solid #f59e0b' : '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: c.statusColor }}>
                    {c.aka}
                  </span>
                  <span style={{ fontSize: '0.72rem', background: '#ffffff', padding: '2px 8px', borderRadius: '10px', border: '1px solid #cbd5e1', fontWeight: 700 }}>
                    {key.toUpperCase()}
                  </span>
                </div>
                <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                  {c.name}
                </h4>
                <div style={{ fontSize: '0.78rem', color: c.statusColor, fontWeight: 700, marginBottom: '0.65rem' }}>
                  {c.status}
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                  {c.scope}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Classification Detail */}
        {(() => {
          const c = classifications[activeClassification];
          return (
            <div style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #cbd5e1', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: c.statusColor, background: '#ffffff', padding: '3px 12px', borderRadius: '20px', border: `1px solid ${c.statusColor}` }}>
                  {c.status}
                </span>
                <span style={{ fontSize: '0.88rem', color: '#64748b' }}>
                  Also known as: <strong>{c.aka}</strong>
                </span>
              </div>

              <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.7, margin: '0 0 1rem 0' }}>
                {c.description}
              </p>

              <div>
                <strong style={{ fontSize: '0.82rem', color: '#0f172a', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                  Representative Examples & Frontiers:
                </strong>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  {c.examples.map((ex, exIdx) => (
                    <li key={exIdx} style={{ marginBottom: '0.25rem' }}>{ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })()}

        <div style={{ marginTop: '1.25rem', background: '#eff6ff', borderRadius: '10px', padding: '1rem 1.25rem', border: '1px solid #bfdbfe', fontSize: '0.9rem', color: '#1e3a8a', lineHeight: 1.6 }}>
          <strong>⚡ The Ground Truth:</strong> <em>All AI tools you use today (ChatGPT, Gemini, Midjourney, Google Maps, Tesla Autopilot) are Artificial Narrow Intelligence (ANI).</em> AGI does not exist yet, and claims that today's chatbots have human emotions are false.
        </div>
      </div>

      {/* TOPIC 5: REAL-WORLD INDUSTRY IMPACT */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ borderLeft: '4px solid #ec4899', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ec4899', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            TOPIC 5 · INDUSTRY DISRUPTIONS
          </span>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0 0 0' }}>
            Real-World Impact & Applications Across Sectors
          </h3>
        </div>

        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#334155', margin: '0 0 1.25rem 0' }}>
          AI is reshaping virtually every major sector of human industry. Explore the primary application domains below:
        </p>

        {/* Industry Sector Tab Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '1.25rem' }}>
          {Object.keys(industryImpacts).map(key => {
            const sec = industryImpacts[key];
            const isSelected = activeImpactSector === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveImpactSector(key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: isSelected ? `2px solid ${sec.color}` : '1px solid #e2e8f0',
                  background: isSelected ? '#fdf2f8' : '#f8fafc',
                  color: isSelected ? sec.color : '#334155',
                  fontWeight: isSelected ? 800 : 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {sec.icon}
                <span>{sec.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Deep-Dive */}
        {(() => {
          const sec = industryImpacts[activeImpactSector];
          return (
            <div style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #cbd5e1', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                {sec.icon}
                <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: sec.color }}>
                  {sec.headline}
                </h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                {sec.points.map((pt, pIdx) => (
                  <div key={pIdx} style={{ background: '#ffffff', borderRadius: '8px', padding: '1rem', border: '1px solid #e2e8f0' }}>
                    <strong style={{ fontSize: '0.88rem', color: '#0f172a', display: 'block', marginBottom: '0.35rem' }}>
                      {pt.label}
                    </strong>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                      {pt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* TOPIC 6: CHALLENGES & THE ETHICAL FUTURE (RESPONSIBLE AI) */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ borderLeft: '4px solid #dc2626', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            TOPIC 6 · RESPONSIBLE AI & ETHICS
          </span>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0.2rem 0 0 0' }}>
            Critical Challenges & The Ethical Future: Responsible AI
          </h3>
        </div>

        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#334155', margin: '0 0 1.25rem 0' }}>
          As AI systems become embedded in judicial, medical, hiring, and educational decisions, society faces fundamental ethical questions. Explore the 4 primary pillars of <strong>Responsible AI</strong>:
        </p>

        {/* Ethics Tab Switcher */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginBottom: '1.25rem' }}>
          {Object.keys(ethicsTopics).map(key => {
            const et = ethicsTopics[key];
            const isSelected = activeEthicsTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveEthicsTab(key)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: isSelected ? `2px solid ${et.color}` : '1px solid #e2e8f0',
                  background: isSelected ? '#fef2f2' : '#f8fafc',
                  color: isSelected ? et.color : '#334155',
                  fontWeight: isSelected ? 800 : 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px'
                }}
              >
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b' }}>
                  {et.badge}
                </span>
                <span>{et.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Ethics Deep-Dive */}
        {(() => {
          const et = ethicsTopics[activeEthicsTab];
          return (
            <div style={{ background: '#f8fafc', borderRadius: '12px', border: `1.5px solid ${et.color}35`, padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '8px' }}>
                <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: et.color }}>
                  {et.title}
                </h4>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: `${et.color}15`, color: et.color, padding: '3px 10px', borderRadius: '12px' }}>
                  {et.badge}
                </span>
              </div>

              <div style={{ background: '#ffffff', borderRadius: '8px', padding: '1rem', border: '1px solid #e2e8f0', marginBottom: '0.85rem' }}>
                <strong style={{ fontSize: '0.82rem', color: '#991b1b', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                  Core Challenge / Risk:
                </strong>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>
                  {et.problem}
                </p>
              </div>

              <div style={{ background: '#ffffff', borderRadius: '8px', padding: '1rem', border: '1px solid #e2e8f0', marginBottom: '0.85rem' }}>
                <strong style={{ fontSize: '0.82rem', color: '#0f172a', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                  Real-World Scenario:
                </strong>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                  {et.realExample}
                </p>
              </div>

              <div style={{ background: '#ecfdf5', borderRadius: '8px', padding: '0.85rem 1rem', border: '1px solid #a7f3d0' }}>
                <strong style={{ fontSize: '0.82rem', color: '#065f46', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                  Mandatory Safeguard & Best Practice:
                </strong>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#047857', lineHeight: 1.55 }}>
                  {et.safeguard}
                </p>
              </div>
            </div>
          );
        })()}

        {/* Verification Rule Banner */}
        <div style={{ marginTop: '1.25rem', background: '#eff6ff', borderRadius: '10px', padding: '1rem 1.25rem', border: '1px solid #bfdbfe', fontSize: '0.92rem', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Shield size={22} color="#2563eb" style={{ flexShrink: 0 }} />
          <span>
            <strong>The Professional AI Golden Rule:</strong> Use AI to generate drafts, ideas, and structures; use your human intelligence to verify facts, apply ethics, and make final decisions. Never copy-paste without reading!
          </span>
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
