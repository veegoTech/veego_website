import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play, Shield, Code2, Cpu, Box } from 'lucide-react';
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
    <section className="relative bg-tech-3d-dark text-white overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-slate-800/80">
      {/* 3D LIGHTING & AMBIENT PARALLAX GLOWS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top Right Cyan Radial Glow */}
        <div className="absolute -top-24 -right-24 w-[650px] h-[650px] bg-sky-500/15 rounded-full blur-[140px]" />
        {/* Bottom Left Blue-Indigo Glow */}
        <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[140px]" />

        {/* Laser Axis Lines (Matching Reference Image 1) */}
        <div className="absolute top-1/4 right-[25%] w-[500px] laser-axis-h opacity-60 hidden md:block" />
        <div className="absolute top-[10%] right-[35%] h-[600px] laser-axis-v opacity-60 hidden md:block" />
        
        {/* HUD Corner Accents */}
        <div className="absolute top-6 left-6 text-sky-500/40 text-xs font-mono select-none">
          + 3D_SPACE_GRID // 0x7F9A
        </div>
        <div className="absolute top-6 right-6 text-indigo-400/40 text-xs font-mono select-none">
          [ VEEGO_ENGINEERING_V2.0 ]
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* MAIN SPLIT HERO: Left Headline + Right 3D Object & Team Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Content & CTAs) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-sky-500/40 text-xs font-mono text-sky-300 mb-6 shadow-lg shadow-sky-500/10"
            >
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <Code2 className="w-3.5 h-3.5 text-sky-400" />
              <span>VEEGO</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300 font-sans">UNDERSTAND · BUILD · GROW</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight text-white leading-[1.12] mb-6"
              style={{ textWrap: 'balance' }}
            >
              Real <span className="text-sky-400 font-black">IT Solutions</span> for Your Operational Problems
            </motion.h1>

            {/* Subtitle Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8 max-w-xl"
            >
              We solve daily business friction through custom-engineered software, automated workflows, and hands-on production code. No buzzwords, just results.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-6"
            >
              <button
                onClick={onSolveProblem}
                className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <span>Discuss Your Operational Problem</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreSolutions}
                className="px-6 py-4 rounded-2xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-all flex items-center gap-2.5 cursor-pointer hover:border-sky-500/50"
              >
                <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Explore Solutions</span>
              </button>
            </motion.div>

            {/* Tech Badges Row */}
            <div className="flex items-center gap-6 pt-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-sky-400" />
                <span>Zero Sales Reps</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>100% Direct Engineer Access</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Wireframe Scene & Cyber Frame */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Animated 3D Isometric Cube Element (Matching Reference Image 1) */}
            <div className="absolute -top-12 -right-8 pointer-events-none z-0 hidden sm:block opacity-80">
              <div className="perspective-1000 scale-75">
                <div className="cube-3d-scene">
                  <div className="cube-3d-face cube-3d-front" />
                  <div className="cube-3d-face cube-3d-back" />
                  <div className="cube-3d-face cube-3d-right" />
                  <div className="cube-3d-face cube-3d-left" />
                  <div className="cube-3d-face cube-3d-top" />
                  <div className="cube-3d-face cube-3d-bottom" />
                </div>
              </div>
            </div>

            {/* Main Cyber Framed Image */}
            <div className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 aspect-[4/3] group">
              <img
                src={heroTeamImg}
                alt="VeeGo Software Engineering Team Collaborating"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

              {/* HUD Corner Markers */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-sky-400 pointer-events-none" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-sky-400 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-sky-400 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-sky-400 pointer-events-none" />

              {/* Floating Bottom Card Over Image */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80 shadow-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 shrink-0">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white font-mono tracking-tight">
                      VEEGO_ENGINEERING_CORE
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Understand · Build · Grow
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  ● ACTIVE
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

