import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Users, BarChart, CheckCircle2, ChevronDown, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../shared/types/types';
import { useAuth } from '../../shared/context/AuthContext';
import { projectService } from '../../shared/services/api/projectService';

export const ProjectMarket: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const currentUserRole = currentUser?.role || 'guest';
  const [projects, setProjects] = useState<Project[]>([]);
  const [featuredProject, setFeaturedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Projects');
  const [sortBy, setSortBy] = useState<'Newest' | 'Match' | 'Stipend'>('Newest');
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['All Projects', 'Web Development', 'UI/UX Design', 'Marketing', 'Data Science', 'Mobile App'];

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const data = await projectService.getProjects();
        setProjects(data);
        const featured = data.find(p => p.featured) || null;
        setFeaturedProject(featured);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(p => {
    if (selectedCategory === 'All Projects') return true;
    return p.category === selectedCategory || p.tags.includes(selectedCategory);
  }).sort((a, b) => {
    if (sortBy === 'Match') return b.matchScore - a.matchScore;
    return 0;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] pb-24 pt-4 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Category Filter Horizontal Scroll Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recommended For You Section - Featured Banner matching Screenshot 1 */}
        {featuredProject && (
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Recommended For You
            </h2>

            <div 
              onClick={() => navigate(`/projects/${featuredProject.id}`)}
              className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-600/20 overflow-hidden cursor-pointer group transition-all hover:scale-[1.01]"
            >
              {/* Dotted Grid Pattern overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white border border-white/30">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Featured Opportunity</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight group-hover:underline">
                  {featuredProject.title}
                </h3>

                <div className="pt-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/projects/${featuredProject.id}`);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-colors shadow-md"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Latest Opportunities Header */}
        <div className="flex items-center justify-between pt-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Latest Opportunities
          </h2>
          <div className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs">
            <span>Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="Newest">Newest</option>
              <option value="Match">Highest Match</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Opportunities Card List */}
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-4"
            >
              {/* Card Top Row: Logo, Title, Match Badge, Price */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <img
                    src={project.companyLogo}
                    alt={project.companyName}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-xs"
                  />
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      {project.companyName}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 leading-snug hover:text-blue-600 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-lg font-extrabold text-slate-900 mt-0.5">
                      {project.stipend === '$0' ? 'Volunteer / Certificate' : project.stipend}
                    </p>
                  </div>
                </div>

                {/* Match Rating Pill */}
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-xs ${
                  project.matchScore >= 90
                    ? 'bg-emerald-300/80 text-emerald-950 border border-emerald-400/40'
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}>
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>{project.matchScore}% Match</span>
                </div>
              </div>

              {/* Description Preview */}
              <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer Metadata Grid */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs font-semibold text-slate-500 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <BarChart className="w-4 h-4 text-blue-600" />
                    <span>{project.level}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>{project.appliedCount} Applied</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-1">
                {currentUserRole === 'student' || currentUserRole === 'guest' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (currentUserRole === 'guest') navigate('/login');
                      else navigate(`/projects/${project.id}?apply=true`);
                    }}
                    className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm transition-colors shadow-md shadow-blue-600/15"
                  >
                    Apply Now
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/projects/${project.id}`);
                    }}
                    className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
