import React, { useState } from 'react';
import { ProjectCard } from '../../components/ProjectCard';
import { projectsData } from '../../data/projects';
import { Project, ProjectCategory } from '../../types';
import { Sparkles, Layers, ArrowRight } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
  onOpenLiveDemo: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onNavigate,
  onOpenLiveDemo
}) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');

  const filterTabs: { label: string; value: ProjectCategory }[] = [
    { label: 'All Systems', value: 'All' },
    { label: 'Business Automation', value: 'Business Automation' },
    { label: 'Education', value: 'Education' },
    { label: 'Web Applications', value: 'Web Applications' }
  ];

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.filterCategory === activeFilter;
  });

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold mb-4">
          <Layers className="w-3.5 h-3.5 text-emerald-600" />
          <span>PRODUCTION SYSTEMS</span>
        </div>
        <h1
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3"
          style={{ textWrap: 'balance' }}
        >
          Built by VeeGo
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Technology we&apos;ve already built. These are production applications engineered around real workflows to eliminate manual work, automate staff tracking, and streamline billing.
        </p>
      </div>

      {/* Segmented Filter Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl overflow-x-auto mb-8 w-fit shadow-xs">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onViewProject={(id) => onNavigate(`/projects/${id}`)}
            onLiveDemo={(proj) => onOpenLiveDemo(proj)}
          />
        ))}
      </div>

      {/* Discussion Strip */}
      <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Need a similar system built for your company?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
            We can adapt these proven architectures or engineer a clean custom system tailored to your unique operational workflow.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/business-enquiry')}
          className="px-6 py-3.5 text-xs sm:text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap shadow-xs flex items-center gap-2"
        >
          <span>Discuss System Deployment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
