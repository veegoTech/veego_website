import React from 'react';
import {
  Workflow,
  Users,
  Package,
  Receipt,
  Target,
  Cpu,
  Layers,
  Zap,
  ArrowRight
} from 'lucide-react';
import { SolutionItem } from '../types';

interface SolutionCardProps {
  solution: SolutionItem;
  onExploreSolution: (solution: SolutionItem) => void;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({
  solution,
  onExploreSolution
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Workflow':
        return <Workflow className="w-5 h-5 text-blue-600" />;
      case 'Users':
        return <Users className="w-5 h-5 text-blue-600" />;
      case 'Package':
        return <Package className="w-5 h-5 text-blue-600" />;
      case 'Receipt':
        return <Receipt className="w-5 h-5 text-blue-600" />;
      case 'Target':
        return <Target className="w-5 h-5 text-blue-600" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-blue-600" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-blue-600" />;
      case 'Layers':
      default:
        return <Layers className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="flex flex-col justify-between p-6 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-400 transition-all duration-200">
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
            {getIcon(solution.iconName)}
          </div>
          <span className="text-xs text-slate-600 font-semibold px-2.5 py-0.5 bg-slate-100 rounded-md">
            {solution.category}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5 tracking-tight">
          {solution.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          {solution.shortDescription}
        </p>

        {/* Clean, Simple Problem vs Solution breakdown (fully visible, no truncation) */}
        <div className="space-y-2.5 mb-5 text-xs">
          <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/70">
            <span className="text-[11px] uppercase tracking-wider text-amber-900 font-bold block mb-1">
              The Real Problem:
            </span>
            <p className="text-slate-800 leading-relaxed font-medium">
              {solution.problem}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-100">
            <span className="text-[11px] uppercase tracking-wider text-blue-900 font-bold block mb-1">
              Built Solution:
            </span>
            <p className="text-slate-800 leading-relaxed font-medium">
              {solution.solution}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100">
        <button
          onClick={() => onExploreSolution(solution)}
          className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs"
        >
          <span>Request This Solution</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
