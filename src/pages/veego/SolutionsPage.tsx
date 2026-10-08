import React, { useState } from 'react';
import { SolutionCard } from '../../components/SolutionCard';
import { solutionsData } from '../../data/solutions';
import { SolutionItem } from '../../types';
import { Sparkles, ArrowRight, Building2, Search } from 'lucide-react';

interface SolutionsPageProps {
  onNavigate: (path: string) => void;
  onExploreSolution: (solution: SolutionItem) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({
  onNavigate,
  onExploreSolution
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Operations & Workforce',
    'Finance & Billing',
    'Sales & CRM',
    'Stock & Logistics',
    'Automation & APIs',
    'Applied Intelligence',
    'Custom Software'
  ];

  const filteredSolutions = solutionsData.filter((sol) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      sol.category.toLowerCase() === selectedCategory.toLowerCase();

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      sol.title.toLowerCase().includes(query) ||
      sol.problem.toLowerCase().includes(query) ||
      sol.solution.toLowerCase().includes(query) ||
      sol.category.toLowerCase().includes(query) ||
      sol.shortDescription.toLowerCase().includes(query) ||
      sol.technologies.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs text-blue-700 font-semibold mb-4">
          <Building2 className="w-3.5 h-3.5" />
          <span>UNDERSTAND · BUILD · GROW</span>
        </div>
        <h1
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3"
          style={{ textWrap: 'balance' }}
        >
          Find Your Solution
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold mb-2">
          &ldquo;We Go Through Your Problem. We Give You the Solution.&rdquo;
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Every business works differently. Instead of forcing your business into a standard product, VeeGo starts by understanding your problem, workflow and goal — then builds the right technology solution.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search problems or solutions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Solutions Grid */}
      {filteredSolutions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredSolutions.map((sol) => (
            <SolutionCard
              key={sol.id}
              solution={sol}
              onExploreSolution={onExploreSolution}
            />
          ))}
        </div>
      ) : (
        <div className="mb-16 p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-slate-700 font-semibold mb-2">No solutions found matching your search</p>
          <p className="text-xs text-slate-500 mb-4">Try selecting another category or clearing your search keywords.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Custom Solution Callout */}
      <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="text-xs uppercase text-blue-700 font-bold mb-1">
            Need a unique workflow automation?
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Have an operational challenge not listed above?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
            Every business has its own quirks and manual routines. Tell us what is slowing down your team, and we will architect a tailored system.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/business-enquiry')}
          className="px-6 py-3.5 text-xs sm:text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap shadow-xs flex items-center gap-2"
        >
          <span>Tell Us Your Problem</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
