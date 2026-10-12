import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ProjectCard } from '../../components/ProjectCard';
import { projectsData } from '../../data/projects';
import { Project, ProjectCategory } from '../../types';
import { Layers, ArrowRight } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
  onOpenLiveDemo: (project: Project) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }
};

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
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900 bg-white min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-slate-100 border border-slate-300 text-xs font-mono font-bold text-slate-900 mb-4">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>PRODUCTION SYSTEMS</span>
        </div>
        <h1
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 mb-3"
          style={{ textWrap: 'balance' }}
        >
          Built by VeeGo
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Technology we&apos;ve already built. These are production applications engineered around real workflows to eliminate manual work, automate staff tracking, and streamline billing.
        </p>
      </motion.div>

      {/* Segmented Filter Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-300 rounded-[4px] overflow-x-auto mb-8 w-fit">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-[4px] transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeFilter}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
      >
        {filteredProjects.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <ProjectCard
              project={project}
              onViewProject={(id) => onNavigate(`/projects/${id}`)}
              onLiveDemo={(proj) => onOpenLiveDemo(proj)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Discussion Strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 sm:p-10 rounded-[4px] bg-slate-50 border border-slate-300 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
            Need a similar system built for your company?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
            We can adapt these proven architectures or engineer a clean custom system tailored to your unique operational workflow.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/business-enquiry')}
          className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-[4px] bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap flex items-center gap-2 border border-blue-600 transition-colors cursor-pointer"
        >
          <span>Discuss System Deployment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};
