import React, { useState, useEffect } from 'react';
import { Search, Filter, History, TrendingUp, User, Briefcase, ChevronRight, Sparkles, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../../shared/components/ui/EmptyState';
import { projectService } from '../../shared/services/api/projectService';
import { userService } from '../../shared/services/api/userService';
import { Project, StudentCandidate } from '../../shared/types/types';

export const GlobalSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'students' | 'projects'>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [students, setStudents] = useState<StudentCandidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projList, studentList] = await Promise.all([
          projectService.getProjects(),
          userService.getRecommendedStudents(),
        ]);
        setProjects(projList);
        setStudents(studentList);
      } catch (err) {
        console.error('Failed to load search data', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const query = searchTerm.toLowerCase().trim();

  const filteredProjects = projects.filter(p =>
    !query ||
    p.title.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query) ||
    p.companyName.toLowerCase().includes(query) ||
    p.tags?.some(t => t.toLowerCase().includes(query))
  );

  const filteredStudents = students.filter(s =>
    !query ||
    s.name.toLowerCase().includes(query) ||
    s.institution.toLowerCase().includes(query) ||
    s.skills.some(sk => sk.toLowerCase().includes(query))
  );

  const trendingSkills = ['React', 'Next.js', 'UI/UX Design', 'Flutter', 'Python', 'Marketing', 'Machine Learning'];

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
            placeholder="Search skills, projects, or student names..."
            className="w-full bg-white border border-slate-200/90 rounded-2xl py-3.5 pl-12 pr-12 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all shadow-xs hover:shadow-sm"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Filter className="w-3.5 h-3.5" /> All ({filteredProjects.length + filteredStudents.length})
          </button>
          <button
            onClick={() => setActiveFilter('students')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
              activeFilter === 'students'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Students ({filteredStudents.length})
          </button>
          <button
            onClick={() => setActiveFilter('projects')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
              activeFilter === 'projects'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            UMKM Projects ({filteredProjects.length})
          </button>
        </div>
      </section>

      {/* Search Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto">
        {/* Left Column: Trending Skills */}
        <div className="md:col-span-4 space-y-6">
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
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                    searchTerm.toLowerCase() === skill.toLowerCase()
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border-slate-200/60'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Results List */}
        <div className="md:col-span-8 space-y-6">
          {isLoading ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-10 text-center text-xs text-slate-400 font-semibold">
              Loading matching results...
            </div>
          ) : (
            <>
              {/* Projects Section */}
              {(activeFilter === 'all' || activeFilter === 'projects') && (
                <div className="space-y-3">
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <span>Projects ({filteredProjects.length})</span>
                  </h2>

                  {filteredProjects.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 text-center text-xs text-slate-400 font-medium">
                      No matching projects found for "{searchTerm}"
                    </div>
                  ) : (
                    filteredProjects.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => navigate(`/projects/${p.id}`)}
                        className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                              {p.category}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">{p.duration}</span>
                          </div>
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {p.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">{p.companyName} • {p.stipend}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Students Section */}
              {(activeFilter === 'all' || activeFilter === 'students') && (
                <div className="space-y-3 pt-2">
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                    <span>Student Candidates ({filteredStudents.length})</span>
                  </h2>

                  {filteredStudents.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 text-center text-xs text-slate-400 font-medium">
                      No matching students found for "{searchTerm}"
                    </div>
                  ) : (
                    filteredStudents.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => navigate(`/students/${s.id}`)}
                        className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center shrink-0 border border-indigo-100">
                            {s.avatar ? (
                              <img src={s.avatar} alt={s.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              s.name.substring(0, 2).toUpperCase()
                            )}
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {s.name}
                            </h3>
                            <p className="text-xs text-slate-500">{s.institution} • Score: {s.portfolioScore}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {s.skills?.slice(0, 3).map((sk) => (
                                <span key={sk} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                                  {sk}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
