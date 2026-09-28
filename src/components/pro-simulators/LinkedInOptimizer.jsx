import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { Share2, CheckCircle2, Sparkles, Send, Award, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LinkedInOptimizer = ({ topicData, day }) => {
  const { requestValidation, isLessonCompleted, isLessonPending } = useCourse();
  const [role, setRole] = useState('Frontend Engineer | React & Next.js');
  const [valueProp, setValueProp] = useState('Building high-performance, accessible web applications for global scale');
  const [copied, setCopied] = useState(false);

  const headline = `${role} 🚀 Helping companies ${valueProp} | Open to Opportunities`;
  const isCompleted = isLessonCompleted('pro', day);
  const isPending = isLessonPending('pro', day);

  const copyHeadline = () => {
    navigator.clipboard.writeText(headline);
    setCopied(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600">Topic 3 Interactive Simulator</span>
            <h2 className="text-xl font-bold text-slate-900">LinkedIn Profile & Personal Branding Studio</h2>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          Optimize your headline, summary narrative, and featured section for recruiter search visibility (SEO).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" /> High-Conversion Headline Formula
          </h3>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Primary Role & Core Tech Stack</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Specific Value Proposition / Impact</label>
            <input
              type="text"
              value={valueProp}
              onChange={(e) => setValueProp(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-blue-500"
            />
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <span className="font-bold text-blue-600 block">Pro Recruiter Tip:</span>
            <p>• Avoid vague titles like "Aspiring Developer". State your specific competencies directly.</p>
            <p>• Include 3-5 target keywords in your About section to trigger recruiter search filters.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-sm">
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
              Live LinkedIn Card Preview
            </span>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-base shadow-sm">
                  IN
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Your Name (LinkedIn Profile)</h4>
                  <p className="text-xs text-slate-500">500+ Connections • Active Now</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 leading-relaxed shadow-sm">
                {headline}
              </div>

              <button
                type="button"
                onClick={copyHeadline}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Optimized Headline'}</span>
              </button>
            </div>
          </div>

          <div className="pt-2">
            {isCompleted ? (
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold text-center">
                ✓ LinkedIn Module Approved (+100 XP)
              </div>
            ) : (
              <button
                onClick={() => requestValidation('pro', day)}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" /> Submit LinkedIn Profile for Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LinkedInOptimizer;
