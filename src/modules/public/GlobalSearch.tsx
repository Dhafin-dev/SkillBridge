import React, { useState } from 'react';
import { Search, Mic, Filter, History, TrendingUp, Megaphone, User, Star, Code, ArrowRight, X, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../../shared/components/ui/EmptyState';

export const GlobalSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'students' | 'projects'>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const trendingSkills: string[] = [];

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-20 pt-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Search Hero Section */}
      <section className="max-w-3xl mx-auto mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          What are you looking for?
        </h1>
        <p className="text-sm text-slate-500 mb-6">Discover top academic talent and innovative UMKM projects.</p>

        {/* Active Search Input */}
        <div className="relative group max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skills, projects, or users..."
            className="w-full bg-white border border-slate-200/90 rounded-2xl py-3.5 pl-12 pr-12 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all shadow-xs hover:shadow-sm"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors border ${activeFilter === 'all'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
          >
            <Filter className="w-3.5 h-3.5" /> All Categories
          </button>
          <button
            onClick={() => setActiveFilter('students')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors border ${activeFilter === 'students'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
          >
            Students
          </button>
          <button
            onClick={() => setActiveFilter('projects')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors border ${activeFilter === 'projects'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
          >
            UMKM Projects
          </button>
        </div>
      </section>

      {/* Search Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto">
        {/* Left Column: Recent & Trending */}
        <div className="md:col-span-4 space-y-6">
          {/* Recent Searches */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recent Searches</h2>
              {recentSearches.length > 0 && (
                <button
                  onClick={clearRecentSearches}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            {recentSearches.length === 0 ? (
              <p className="text-xs text-slate-400 py-2">No recent searches.</p>
            ) : (
              <ul className="space-y-1">
                {recentSearches.map((item, i) => (
                  <li key={i}>
                    <button
                      onClick={() => setSearchTerm(item)}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors text-xs text-slate-700 text-left font-medium"
                    >
                      <History className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Trending Skills - hidden if empty */}
          {trendingSkills.length > 0 && (
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                <span>Trending Skills</span>
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {trendingSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setSearchTerm(skill)}
                    className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-blue-50 text-xs font-medium text-slate-700 hover:text-blue-700 border border-slate-200/60 transition-colors"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Suggestions Bento Grid */}
        <div className="md:col-span-8 space-y-4">
          <h2 className="text-base font-bold text-slate-900 mb-2">Suggested for you</h2>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
            <EmptyState
              icon={<Sparkles className="w-6 h-6" />}
              title="No Suggestions Yet"
              description="Start searching to see personalized project and student recommendations."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
