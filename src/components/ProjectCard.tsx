import React from 'react';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onViewProject: (projectId: string) => void;
  onLiveDemo: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onViewProject,
  onLiveDemo
}) => {
  return (
    <div className="group relative flex flex-col rounded-[4px] bg-white border border-slate-200 hover:border-slate-400 transition-colors duration-150 overflow-hidden">
      {/* Product Screenshot / Visual Frame */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 border-b border-slate-200">
        <img
          src={project.image}
          alt={`${project.name} Production Interface`}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.02]"
        />
        {/* Status indicator badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-white text-[10px] font-mono font-bold text-emerald-700 border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-[1px] bg-emerald-600 animate-pulse" />
          <span>VEEGO · {project.status.toUpperCase()}</span>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
          <span className="text-blue-700 font-bold uppercase tracking-wider">{project.category}</span>
          <span>·</span>
          <span>PRODUCTION SYSTEM</span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
          {project.name}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          {project.shortDescription}
        </p>

        {/* Problem vs Solution Summary */}
        <div className="space-y-2.5 mb-4 text-xs">
          <div className="p-3 rounded-[4px] bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-900 font-bold block mb-1">
              Problem Solved:
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">
              {project.problem}
            </p>
          </div>

          <div className="p-3 rounded-[4px] bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-700 font-bold block mb-1">
              VeeGo Solution:
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Key Features snippet */}
        <div className="space-y-1.5 mb-5 flex-1">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1">
            System Highlights
          </div>
          {project.features.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Technology stack tags */}
        <div className="pt-3 border-t border-slate-200 mb-5">
          <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono font-medium text-slate-700">
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="px-2 py-0.5 rounded-[4px] bg-slate-100 border border-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => onViewProject(project.id)}
            className="flex-1 py-2.5 px-3 text-xs font-bold uppercase tracking-wider rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center gap-1.5 border border-blue-600 cursor-pointer"
          >
            <span>Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {project.liveDemoAvailable && (
            <button
              onClick={() => onLiveDemo(project)}
              className="py-2.5 px-3.5 text-xs font-bold uppercase tracking-wider rounded-[4px] border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-blue-600 fill-current" />
              <span>Live Demo</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
