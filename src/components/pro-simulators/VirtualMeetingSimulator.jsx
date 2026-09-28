import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import SpeechRecorder from '../lesson/SpeechRecorder';
import TextToSpeechPlayer from '../lesson/TextToSpeechPlayer';
import { 
  Video, Mic, MicOff, VideoOff, Users, 
  MessageSquare, PhoneOff, CheckCircle2, Send, Sparkles 
} from 'lucide-react';

export const VirtualMeetingSimulator = ({ topicData, day }) => {
  const { requestValidation, isLessonCompleted, isLessonPending } = useCourse();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [meetingScenario, setMeetingScenario] = useState('standup');

  const scenarios = {
    standup: {
      title: 'Daily Agile Standup (3 Updates)',
      script: 'Yesterday I finalized the user authentication flow. Today I am optimizing database query latency. I have no blockers currently.',
      etiquetteTip: 'Keep updates under 60 seconds; address blockers immediately.'
    },
    client: {
      title: 'Client Status Update & Next Steps',
      script: 'Good morning everyone. We have successfully completed Milestone 1 ahead of schedule. Let me present the live demo now.',
      etiquetteTip: 'Share your screen smoothly and ask "Can everyone see my screen clearly?" before speaking.'
    },
    demo: {
      title: 'Product Demonstration & Q&A',
      script: 'Thank you for your question. That feature is currently scheduled for our next release cycle in sprint 4.',
      etiquetteTip: 'Acknowledge the question before answering and maintain steady eye contact with the camera.'
    }
  };

  const activeScn = scenarios[meetingScenario];
  const isCompleted = isLessonCompleted('pro', day);
  const isPending = isLessonPending('pro', day);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600">Topic 6 & 7 Interactive Simulator</span>
            <h2 className="text-xl font-bold text-slate-900">Teams & Meet Virtual Conference Simulator</h2>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          Simulate speaking in corporate video conferences, handling polite interruptions, and giving structured team updates.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        
        {/* Virtual Call Stage */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-900">
          
          {/* User Video Feed */}
          <div className="relative aspect-video bg-slate-800 rounded-2xl border border-indigo-500/40 flex flex-col items-center justify-center p-4 overflow-hidden ring-2 ring-indigo-500/20">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
              You
            </div>
            <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-white flex items-center gap-1.5">
              <span>You (Speaking)</span>
              {!isMuted && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
            </div>
          </div>

          {/* Peer 1 */}
          <div className="relative aspect-video bg-slate-800 rounded-2xl border border-slate-700 flex flex-col items-center justify-center p-4 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" alt="Peer" className="w-16 h-16 rounded-full bg-slate-700" />
            <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-300">
              Priya (Engineering Lead)
            </div>
          </div>

          {/* Peer 2 */}
          <div className="relative aspect-video bg-slate-800 rounded-2xl border border-slate-700 flex flex-col items-center justify-center p-4 overflow-hidden hidden sm:flex">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" alt="Peer" className="w-16 h-16 rounded-full bg-slate-700" />
            <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-300">
              Marcus (Product Manager)
            </div>
          </div>

        </div>

        {/* Meeting Controls Bar */}
        <div className="bg-slate-950 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                isMuted ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <button
              type="button"
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                !isVideoOn ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {!isVideoOn ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>
          </div>

          {/* Scenario Selector */}
          <div className="flex items-center gap-2">
            {Object.keys(scenarios).map((scnKey) => (
              <button
                key={scnKey}
                type="button"
                onClick={() => setMeetingScenario(scnKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  meetingScenario === scnKey ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {scnKey}
              </button>
            ))}
          </div>
        </div>

        {/* Teleprompter Script */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
                {activeScn.title}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">Tip: {activeScn.etiquetteTip}</p>
            </div>
            <TextToSpeechPlayer text={activeScn.script} label="Listen to Dialogue" />
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 font-medium italic leading-relaxed">
            "{activeScn.script}"
          </div>

          <SpeechRecorder promptText="Deliver this virtual meeting dialogue clearly into your microphone." />

          <div className="pt-2 text-center">
            {isCompleted ? (
              <span className="text-xs font-bold text-emerald-600">✓ Virtual Meeting Module Validated (+100 XP)</span>
            ) : (
              <button
                onClick={() => requestValidation('pro', day)}
                className="py-3 px-8 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all"
              >
                <Send className="w-4 h-4 inline mr-1.5" /> Submit Performance for Staff Validation
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
export default VirtualMeetingSimulator;
