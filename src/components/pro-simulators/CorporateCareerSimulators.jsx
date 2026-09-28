import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import SpeechRecorder from '../lesson/SpeechRecorder';
import TextToSpeechPlayer from '../lesson/TextToSpeechPlayer';
import { 
  Presentation, Handshake, ShieldAlert, Scale, 
  Clock, Cpu, Bot, Award, Users2, CheckCircle2, 
  Send, Sparkles, Lightbulb, Play 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const TOPIC_CONFIGS = {
  8: {
    icon: Presentation,
    color: 'text-rose-600',
    bg: 'bg-rose-50 text-rose-600',
    title: 'Presentation Skills & Pitch Deck Delivery',
    scenario: 'Deliver a 3-minute executive presentation introduction explaining project ROI.',
    script: 'Good morning executive leadership. Today I am excited to present our Q3 product roadmap, which is engineered to accelerate customer onboarding by 40% while reducing infrastructure costs.'
  },
  9: {
    icon: Handshake,
    color: 'text-amber-600',
    bg: 'bg-amber-50 text-amber-600',
    title: 'Client Communication & Expectation Setting',
    scenario: 'Handle a client requesting a tight deadline change politely and firmly.',
    script: 'We appreciate your urgency regarding the feature launch. To maintain the highest code quality and security standards, we can deliver the core MVP by Friday, and the secondary enhancements next Tuesday.'
  },
  10: {
    icon: ShieldAlert,
    color: 'text-rose-600',
    bg: 'bg-rose-50 text-rose-600',
    title: 'Workplace Conflict Resolution',
    scenario: 'Address differing opinions in a technical architectural review constructively.',
    script: 'I understand your preference for microservices in this module. However, given our tight timeline, starting with a modular monolith reduces deployment complexity while allowing future scaling.'
  },
  11: {
    icon: Scale,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 text-emerald-600',
    title: 'Professional Negotiation & BATNA',
    scenario: 'Negotiate project scope and budget with stakeholders.',
    script: 'If we include the automated analytics dashboard in this sprint, we will need to reallocate two engineering days from the reporting module to stay strictly within budget.'
  },
  12: {
    icon: Clock,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50 text-cyan-600',
    title: 'Time Management & Eisenhower Matrix',
    scenario: 'Categorize urgent vs important tasks and communicate priorities.',
    script: 'I have prioritized critical bug fixes for production release today, while scheduling the architectural documentation for Thursday morning.'
  },
  13: {
    icon: Cpu,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50 text-indigo-600',
    title: 'Smart Work & Automation Strategies',
    scenario: 'Pitch an automated CI/CD and testing pipeline to leadership.',
    script: 'By automating our end-to-end regression testing, we save 12 developer hours per sprint and prevent release-day regressions.'
  },
  14: {
    icon: Bot,
    color: 'text-purple-600',
    bg: 'bg-purple-50 text-purple-600',
    title: 'AI Tools & Prompt Engineering for Professionals',
    scenario: 'Craft structured zero-shot and few-shot prompts for workplace documentation.',
    script: 'You are an executive editor. Summarize the following meeting transcript into 3 key decisions, 2 action items with owners, and 1 follow-up deadline.'
  },
  15: {
    icon: Award,
    color: 'text-amber-600',
    bg: 'bg-amber-50 text-amber-600',
    title: 'Executive Leadership & Decision Making',
    scenario: 'Announce a strategic pivot to the engineering team with empathy and vision.',
    script: 'Team, based on direct customer feedback, we are pivoting our sprint focus towards mobile performance. This transition will directly double our daily active user retention.'
  },
  16: {
    icon: Users2,
    color: 'text-teal-600',
    bg: 'bg-teal-50 text-teal-600',
    title: 'Agile Teamwork & Cross-functional Collaboration',
    scenario: 'Facilitate a sprint retrospective and summarize team action items.',
    script: 'Great retrospective today everyone. We have agreed on two actionable commitments: creating shared API contracts earlier, and holding asynchronous daily standups.'
  }
};

export const CorporateCareerSimulators = ({ topicData, day }) => {
  const { requestValidation, isLessonCompleted, isLessonPending } = useCourse();
  const config = TOPIC_CONFIGS[day] || TOPIC_CONFIGS[8];
  const Icon = config.icon;

  const [reflectionInput, setReflectionInput] = useState('');
  const isCompleted = isLessonCompleted('pro', day);
  const isPending = isLessonPending('pro', day);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-10 h-10 rounded-2xl ${config.bg} flex items-center justify-center`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <span className={`text-[10px] font-extrabold uppercase tracking-widest ${config.color}`}>
              Corporate Topic {day} Simulator
            </span>
            <h2 className="text-xl font-bold text-slate-900">{config.title}</h2>
          </div>
        </div>
        <p className="text-xs text-slate-500">{config.scenario}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
              Executive Communication Script
            </h3>
            <TextToSpeechPlayer text={config.script} label="Hear Native Audio" />
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-xs sm:text-sm text-slate-800 font-medium italic leading-relaxed">
            "{config.script}"
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Self-Reflection & Workplace Application
            </label>
            <textarea
              rows={4}
              value={reflectionInput}
              onChange={(e) => setReflectionInput(e.target.value)}
              placeholder="How would you adapt this script for your specific domain or workplace scenario?"
              className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 resize-none font-sans"
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-sm">
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1">
              Spoken Delivery & Intonation Evaluation
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Speak with calm pacing, assertive tone, and clear pauses at punctuation marks.
            </p>
          </div>

          <SpeechRecorder promptText={config.script} />

          <div className="pt-2 text-center">
            {isCompleted ? (
              <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold text-center">
                ✓ Topic {day} Milestone Approved (+100 XP)
              </div>
            ) : isPending ? (
              <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold text-center">
                ⏳ Validation Pending Instructor Review
              </div>
            ) : (
              <button
                onClick={() => requestValidation('pro', day)}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all"
              >
                <Send className="w-4 h-4 inline mr-1.5" /> Submit Topic {day} Recording for Staff Validation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CorporateCareerSimulators;
