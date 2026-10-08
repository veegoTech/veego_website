import React from 'react';
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { Project } from '../../types';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
  onOpenLiveDemo: (project: Project) => void;
  onDiscussSimilarProblem: (projectName: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
  onOpenLiveDemo,
  onDiscussSimilarProblem
}) => {
  return (
    <div className="py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900 bg-slate-50 min-h-screen">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors mb-6 font-bold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Built by VeeGo</span>
      </button>

      {/* Hero Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
          <span className="text-blue-700 font-bold px-2.5 py-0.5 rounded bg-blue-50 border border-blue-200">
            {project.category}
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-emerald-700 flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            Built by VeeGo · {project.status} System
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
          {project.name}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed mb-6 font-normal">
          {project.tagline}
        </p>

        {/* Action bar */}
        <div className="flex flex-wrap items-center gap-3">
          {project.liveDemoAvailable && (
            <button
              onClick={() => onOpenLiveDemo(project)}
              className="px-6 py-3 text-xs sm:text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-xs flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Live Interactive Demo</span>
            </button>
          )}

          <button
            onClick={() => onDiscussSimilarProblem(project.name)}
            className="px-6 py-3 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-2"
          >
            <span>Discuss a Similar Problem</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Large Product Screenshot Frame */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm mb-10">
        <img
          src={project.image}
          alt={`${project.name} Production Interface`}
          referrerPolicy="no-referrer"
          className="w-full aspect-video object-cover object-top"
        />
        <div className="p-3.5 bg-slate-50 text-xs text-slate-500 border-t border-slate-200 flex items-center justify-between font-medium">
          <span>Production Interface Screenshot</span>
          <span className="text-emerald-700 font-semibold">Status: Verified &amp; Operational</span>
        </div>
      </div>

      {/* SECTION 1: THE PROBLEM */}
      <div className="p-7 sm:p-8 rounded-xl bg-white border border-slate-200 mb-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-800 mb-2 font-bold">
          <AlertTriangle className="w-4 h-4" />
          <span>The Problem</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
          What problem existed?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {project.problem}
        </p>
        <div className="p-4 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-relaxed">
          <span className="font-bold">Why this matters to operations:</span> {project.whyProblemMatters}
        </div>
      </div>

      {/* SECTION 2: THE SOLUTION */}
      <div className="p-7 sm:p-8 rounded-xl bg-white border border-slate-200 mb-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-blue-700 mb-2 font-bold">
          <Sparkles className="w-4 h-4" />
          <span>The Solution</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
          What was built?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          {project.solution}
        </p>
      </div>

      {/* SECTION 3: HOW IT WORKS (Workflow) */}
      <div className="mb-10">
        <div className="text-xs uppercase tracking-wider text-slate-500 mb-1 font-bold">
          Operational Process
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.workflow.map((step) => (
            <div
              key={step.stage}
              className="p-5 rounded-xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-600">
                    Phase {step.stage}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Workflow Step</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: KEY FEATURES */}
      <div className="p-7 sm:p-8 rounded-xl bg-white border border-slate-200 mb-6 shadow-xs">
        <div className="text-xs uppercase tracking-wider text-blue-700 mb-2 font-bold">
          Capabilities
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
          Key Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {project.features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: TECHNOLOGY & ARCHITECTURE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 sm:p-7 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-indigo-700 mb-2 font-bold">
            <Cpu className="w-4 h-4" />
            <span>Technology Stack</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            Underlying Architecture
          </h2>
          <div className="space-y-2 mb-4">
            {project.technologies.map((tech) => (
              <div
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between font-semibold"
              >
                <span>{tech}</span>
                <span className="text-[10px] text-slate-400 font-normal">verified</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {project.architectureNotes}
          </p>
        </div>

        {/* SECTION 6: RESULT */}
        <div className="p-6 sm:p-7 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-700 mb-2 font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>Result</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Verified Operational Outcome
            </h2>
            <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm leading-relaxed mb-3 font-medium">
              {project.businessOutcome}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Measured by daily operational adoption, zero duplicate data errors, and reduced supervisor status-chasing.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => onDiscussSimilarProblem(project.name)}
              className="w-full py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>Discuss a Similar Problem</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
