import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Star, Briefcase, MessageSquare, ArrowRight, Store, AlertCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../../shared/services/api/userService';
import { projectService } from '../../shared/services/api/projectService';
import { UserProfile, Project } from '../../shared/types/types';

export const PublicBusinessProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [umkm, setUmkm] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const [profileData, allProjects] = await Promise.all([
          userService.getProfile(id),
          projectService.getProjects(),
        ]);
        setUmkm(profileData);
        // Filter projects belonging to this UMKM
        const company = profileData.companyName || profileData.name;
        const matchingProjects = allProjects.filter(p =>
          p.companyName === company || p.title.toLowerCase().includes(company.toLowerCase())
        );
        setProjects(matchingProjects.length > 0 ? matchingProjects : allProjects.slice(0, 2));
      } catch (err: any) {
        console.error('Failed to load business profile', err);
        setError(err.response?.data?.error || 'Business profile not found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-semibold text-slate-500">Loading business profile...</p>
        </div>
      </div>
    );
  }

  if (error || !umkm) {
    return (
      <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">{error || 'Business Not Found'}</h2>
          <button
            onClick={() => navigate('/market')}
            className="px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-blue-700"
          >
            Return to Market
          </button>
        </div>
      </div>
    );
  }

  const displayName = umkm.companyName || umkm.name;

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors flex items-center gap-1 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Market</span>
        </button>
        <span className="font-extrabold text-blue-600 text-base">SkillBridge</span>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Business Hero */}
        <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            {umkm.avatar ? (
              <img
                src={umkm.avatar}
                alt={displayName}
                className="w-24 h-24 rounded-2xl object-cover border border-slate-200 shrink-0"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                <Store className="w-10 h-10" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900">{displayName}</h1>
                <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-600/20" />
              </div>
              <div className="flex items-center gap-3 mt-1 mb-2">
                <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-0.5 rounded-full">
                  Verified UMKM Partner
                </span>
              </div>
              <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                {umkm.bio || 'Empowering local enterprise growth through student talent collaborations on SkillBridge.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={() => navigate(`/messages/${umkm.id}`)}
              className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Business</span>
            </button>
          </div>
        </section>

        {/* Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col items-center text-center justify-center">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Enterprise Standing</h3>
            <div className="w-24 h-24 rounded-full border-8 border-blue-600 flex items-center justify-center mb-2">
              <span className="text-3xl font-black text-blue-600">A+</span>
            </div>
            <p className="text-xs text-slate-500">Verified academic partnership partner with active student mentorship.</p>
          </div>

          <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">About the Business</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {umkm.bio || `${displayName} is actively collaborating with academic institutions to provide practical project opportunities, career mentoring, and project stipends for motivated students.`}
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-500 border-t border-slate-100">
              <span>📍 Registered Enterprise</span>
              <span>🎓 Partnered with Universities</span>
              <span>💼 Active Employer</span>
            </div>
          </div>
        </div>

        {/* Open Opportunities */}
        <div className="space-y-4">
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <span>Active Project Openings</span>
          </h3>

          {projects.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 text-center text-xs text-slate-400 font-semibold">
              No active project openings currently. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => navigate(`/projects/${proj.id}`)}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{proj.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{proj.category} • {proj.duration}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      {proj.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {proj.description}
                  </p>
                  <div className="text-xs font-bold text-blue-600 flex items-center gap-1 pt-2">
                    <span>View Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
