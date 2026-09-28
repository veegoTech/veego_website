import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import SpeechRecorder from '../lesson/SpeechRecorder';
import TextToSpeechPlayer from '../lesson/TextToSpeechPlayer';
import { 
  User, CheckCircle2, Sparkles, Send, 
  Lightbulb, ArrowRight, ShieldCheck, Briefcase, Award 
} from 'lucide-react';

export const SelfIntroSimulator = ({ topicData, day }) => {
  const { requestValidation, isLessonCompleted, isLessonPending } = useCourse();
  const [introForm, setIntroForm] = useState({
    greeting: 'Good morning, everyone.',
    nameRole: 'I am Rahul, a software engineer with 2 years of experience.',
    educationExp: 'I graduated in Computer Science and completed key cloud projects.',
    skills: 'I specialize in React, Node.js, and strategic problem solving.',
    goals: 'I look forward to contributing to your innovative product team.'
  });

  const fullIntroScript = `${introForm.greeting} ${introForm.nameRole} ${introForm.educationExp} ${introForm.skills} ${introForm.goals}`;
  const isCompleted = isLessonCompleted('pro', day);
  const isPending = isLessonPending('pro', day);

  return (
    <div className="space-y-6">
      
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600">Topic 1 Interactive Simulator</span>
            <h2 className="text-xl font-bold text-slate-900">Professional Self-Introduction Builder</h2>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          Craft a concise, impactful 60-second self-introduction tailored for interviews, team introductions, and client meetings.
        </p>
      </div>

      {/* 5-Step Formula Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Step Inputs */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" /> The 5-Part Intro Formula
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">1. Warm Professional Greeting</label>
              <input
                type="text"
                value={introForm.greeting}
                onChange={(e) => setIntroForm({ ...introForm, greeting: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">2. Name & Current Designation</label>
              <input
                type="text"
                value={introForm.nameRole}
                onChange={(e) => setIntroForm({ ...introForm, nameRole: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">3. Relevant Experience & Background</label>
              <input
                type="text"
                value={introForm.educationExp}
                onChange={(e) => setIntroForm({ ...introForm, educationExp: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">4. Core Technical / Soft Skills</label>
              <input
                type="text"
                value={introForm.skills}
                onChange={(e) => setIntroForm({ ...introForm, skills: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">5. Forward-Looking Value Statement</label>
              <input
                type="text"
                value={introForm.goals}
                onChange={(e) => setIntroForm({ ...introForm, goals: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Live Preview & Audio Practice */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-emerald-600" /> Live Speech Teleprompter
              </h3>
              <TextToSpeechPlayer text={fullIntroScript} label="Listen to AI Pitch" />
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl font-medium text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2 font-sans">
              <p className="text-indigo-600 font-bold">{introForm.greeting}</p>
              <p>{introForm.nameRole}</p>
              <p>{introForm.educationExp}</p>
              <p>{introForm.skills}</p>
              <p className="text-emerald-700 font-semibold">{introForm.goals}</p>
            </div>
          </div>

          <SpeechRecorder promptText="Deliver your full 5-part self-introduction smoothly and record." />
        </div>

      </div>

      {/* Validation CTA */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-3 shadow-sm">
        <h4 className="text-sm font-bold text-slate-900">Module Milestone Submission</h4>
        <p className="text-xs text-slate-500">Submit your self-introduction audio recording for instructor assessment.</p>
        
        {isCompleted ? (
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Self-Intro Module Approved (+100 XP)
          </div>
        ) : isPending ? (
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
            <Sparkles className="w-4 h-4 animate-spin text-amber-600" /> Pending Staff Review
          </div>
        ) : (
          <button
            onClick={() => requestValidation('pro', day)}
            className="py-3 px-8 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 mx-auto transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Submit Self-Intro for Staff Approval</span>
          </button>
        )}
      </div>

    </div>
  );
};
export default SelfIntroSimulator;
