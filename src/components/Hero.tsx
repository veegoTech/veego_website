import React from 'react';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import heroTeamImg from '../assets/hero_team.jpg';

interface HeroProps {
  onSolveProblem: () => void;
  onExploreSolutions: () => void;
  onExploreCourses?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSolveProblem,
  onExploreSolutions
}) => {

  return (
    <section className="relative bg-white text-slate-900 overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-200">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-blue-100/50 via-cyan-50/40 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute -bottom-10 left-10 w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* MAIN SPLIT HERO: Left Headline + Right Geometric Shield Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
          {/* Left Column (Content & CTAs) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-semibold text-blue-700 mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>VeeGo</span>
              <span className="text-blue-300">·</span>
              <span className="text-slate-700">Understand. Build. Grow.</span>
            </div>

            {/* Main Headline with Underline Accent */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight text-slate-900 leading-[1.12] mb-6"
              style={{ textWrap: 'balance' }}
            >
              <span className="relative inline-block">
                <span className="relative z-10">IT Solutions</span>
                <span className="absolute bottom-1.5 left-0 w-full h-3 bg-blue-200 -z-0 rounded-sm" />
              </span>{' '}
              for your Business Problems
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8 max-w-xl">
              We start with your business problem, not complex tech. We understand how your team works, build custom software to solve it, and teach practical coding through real projects.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onSolveProblem}
                className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/20 hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span>Tell Us Your Problem</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreSolutions}
                className="px-6 py-3.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all flex items-center gap-2.5 shadow-2xs"
              >
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Explore Solutions</span>
              </button>
            </div>

          </div>

          {/* Right Column (Geometric Shield Framed Image with Accent Wings) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Decorative Geometric Background Wings */}
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl rotate-12 opacity-85 -z-0 blur-xs" />
            <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-blue-100 rounded-3xl -rotate-6 -z-0" />

            {/* Chevrons Accent */}
            <div className="absolute -bottom-8 left-8 text-blue-300/80 font-bold text-xs tracking-widest select-none hidden sm:block">
              &lt;&lt;&lt;&lt;&lt;&lt;
            </div>

            {/* Main Image in Modern Organic Polygon Frame */}
            <div className="relative z-10 w-full max-w-lg rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl bg-white aspect-[4/3]">
              <img
                src={heroTeamImg}
                alt="VeeGo Software Engineering Team Collaborating"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating Bottom Card Over Image */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Understand · Build · Grow
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Real software for real daily operations
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
