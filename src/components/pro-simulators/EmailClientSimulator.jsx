import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { 
  Mail, Send, Sparkles, CheckCircle2, 
  Inbox, AlertCircle, RefreshCw, Star, ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const EmailClientSimulator = ({ topicData, day }) => {
  const { requestValidation, isLessonCompleted, isLessonPending } = useCourse();
  const [tone, setTone] = useState('formal');
  const [toField, setToField] = useState('hiring.manager@techcorp.com');
  const [subject, setSubject] = useState('Application: Frontend Developer - [Your Name]');
  const [body, setBody] = useState('Dear Hiring Team,\n\nI am writing to express my strong interest in the Frontend Developer position. With hands-on experience in React, JavaScript, and responsive UI design, I am confident in my ability to contribute effectively to your upcoming product milestones.\n\nPlease find my resume attached for your review. I look forward to the opportunity to discuss my qualifications.\n\nBest regards,\n[Your Name]');
  const [feedback, setFeedback] = useState(null);

  const isCompleted = isLessonCompleted('pro', day);
  const isPending = isLessonPending('pro', day);

  const applyTonePolish = (selectedTone) => {
    setTone(selectedTone);
    if (selectedTone === 'concise') {
      setBody('Hi Team,\n\nI am excited to apply for the Frontend Developer role. I bring strong skills in React, JavaScript, and building accessible UIs.\n\nMy resume is attached. I would appreciate 15 minutes to discuss how I can add value to your team.\n\nBest,\n[Your Name]');
    } else if (selectedTone === 'urgent') {
      setBody('Dear Hiring Manager,\n\nFollowing up on my application for the Frontend Developer role submitted earlier this week. I remain highly enthusiastic about joining your team and would welcome a brief conversation regarding next steps.\n\nThank you for your consideration,\n[Your Name]');
    } else {
      setBody('Dear Hiring Team,\n\nI am writing to express my strong interest in the Frontend Developer position. With hands-on experience in React, JavaScript, and responsive UI design, I am confident in my ability to contribute effectively to your upcoming product milestones.\n\nPlease find my resume attached for your review. I look forward to the opportunity to discuss my qualifications.\n\nBest regards,\n[Your Name]');
    }
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    setFeedback({ type: 'success', text: 'Email sent successfully in simulated corporate client!' });
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-500">Topic 4 & 5 Interactive Simulator</span>
            <h2 className="text-xl font-bold text-slate-900">Corporate Email Client & AI Tone Coach</h2>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          Master executive email etiquette, action-oriented subject lines, and multi-tone AI polishing.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold text-slate-600 ml-2">SpokoMail v3.0 (Corporate Workspace)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500">AI Tone:</span>
            {['formal', 'concise', 'urgent'].map(t => (
              <button
                key={t}
                type="button"
                onClick={() => applyTonePolish(t)}
                className={`px-3 py-1 rounded-xl text-[10px] font-bold uppercase transition-all ${
                  tone === t ? 'bg-orange-500 text-white shadow-sm' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSendEmail} className="p-6 sm:p-8 space-y-4">
          {feedback && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{feedback.text}</span>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-slate-500 w-16">To:</span>
              <input
                type="text"
                required
                value={toField}
                onChange={(e) => setToField(e.target.value)}
                className="flex-1 bg-transparent text-xs text-slate-800 outline-none font-medium"
              />
            </div>

            <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-slate-500 w-16">Subject:</span>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="flex-1 bg-transparent text-xs font-bold text-slate-900 outline-none"
              />
            </div>

            <div>
              <textarea
                rows={8}
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-orange-500 resize-none font-sans leading-relaxed"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              className="py-3 px-8 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" /> Send Simulated Email
            </button>

            {isCompleted ? (
              <span className="text-xs font-bold text-emerald-600">✓ Module Validated</span>
            ) : (
              <button
                type="button"
                onClick={() => requestValidation('pro', day)}
                className="py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
              >
                Submit Email Draft for Staff Validation
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default EmailClientSimulator;
