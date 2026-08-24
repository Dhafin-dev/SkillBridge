import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, CheckCircle2, Send, User, Award, Check } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StudentCandidate } from '../../shared/types/types';
import { userService } from '../../shared/services/api/userService';

export const TalentSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectName = searchParams.get('project') || "Digital Marketing";
  const [searchQuery, setSearchQuery] = useState('');
  const [invitedMap, setInvitedMap] = useState<Record<string, boolean>>({});
  const [students, setStudents] = useState<StudentCandidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userService.getRecommendedStudents().then(data => {
      setStudents(data);
      setIsLoading(false);
    });
  }, []);

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.skills.some(sk => sk.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleInvite = (student: StudentCandidate) => {
    setInvitedMap(prev => ({ ...prev, [student.id]: true }));
    // In real app, make API call to invite student
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] pb-24 pt-3 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-5">

        {/* Header Bar matching Screenshot 3 */}
        <div className="flex items-center gap-3 py-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white hover:bg-slate-100 text-slate-700 transition-colors border border-slate-200 shadow-xs"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              Talent Search
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              For "{projectName}" Project
            </p>
          </div>
        </div>

        {/* Search Controls */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search skills or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
          />
        </div>

        {/* Student Cards List */}
        <div className="space-y-4">
          {isLoading && <div className="text-center py-10 text-slate-500 font-semibold">Loading students...</div>}
          {!isLoading && filteredStudents.map((student) => {
            const isInvited = invitedMap[student.id];

            return (
              <div
                key={student.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-all relative overflow-hidden"
              >
                {/* Top Accent Line */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-emerald-400 absolute top-0 left-0 right-0"></div>

                {/* Profile Top Row */}
                <div className="flex items-start justify-between gap-3 pt-1">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-100 shadow-xs"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 leading-tight">
                        {student.name}
                      </h3>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">
                        {student.institution}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Score Stats Row */}
                <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      PORTFOLIO SCORE
                    </span>
                    <span className="text-2xl font-black text-slate-900 leading-none">
                      {student.portfolioScore}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      PROJECTS COMPLETED
                    </span>
                    <span className="text-2xl font-black text-slate-900 leading-none">
                      {student.projectsCompleted}
                    </span>
                  </div>
                </div>

                {/* Relevant Skills */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    RELEVANT SKILLS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {student.skills.map(sk => (
                      <span
                        key={sk}
                        className="px-3 py-1 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-100/60"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons Row matching Screenshot 3 */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => navigate(`/students/${student.id}`)}
                    className="flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-50 transition-colors shadow-xs"
                  >
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Profile</span>
                  </button>

                  <button
                    onClick={() => handleInvite(student)}
                    disabled={isInvited}
                    className={`flex items-center justify-center gap-1.5 py-3 rounded-2xl font-bold text-xs transition-all shadow-md ${isInvited
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-blue-600/20'
                      }`}
                  >
                    {isInvited ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Invited</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Invite Student</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
