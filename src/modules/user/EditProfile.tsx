import React, { useState } from 'react';
import { Camera, Save, X, User, Brain, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';

export const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const nameParts = currentUser.name.split(' ');
  const [firstName, setFirstName] = useState(nameParts[0] || 'Alex');
  const [lastName, setLastName] = useState(nameParts.slice(1).join(' ') || 'Rivers');
  const [headline, setHeadline] = useState(currentUser.institution || 'Senior Computer Science Student @ Tech University');
  const [bio, setBio] = useState(currentUser.bio || 'Passionate about building intuitive digital experiences that bridge the gap between complex functionality and user needs. Experienced in React, Figma, and modern web architectures.');
  const [skills, setSkills] = useState<string[]>(currentUser.skills || ['UI/UX Design', 'React.js', 'Tailwind CSS']);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [availableForProjects, setAvailableForProjects] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar);

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation back */}
        <button
          onClick={() => navigate('/settings')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Settings</span>
        </button>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Edit Profile</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your personal information, skills, and portfolio presence.</p>
        </div>

        {/* Form Layout Grid */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Photo & Quick Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Photo Card */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 flex flex-col items-center text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 group cursor-pointer border-4 border-slate-50 shadow-sm">
                <img
                  src={avatarUrl}
                  alt={currentUser.name}
                  className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900">{firstName} {lastName}</h3>
              <p className="text-xs text-slate-500 mb-4">UI/UX Designer & Frontend Dev</p>

              <div className="w-full space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    const newUrl = prompt('Enter image URL for avatar:', avatarUrl);
                    if (newUrl) setAvatarUrl(newUrl);
                  }}
                  className="w-full bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors h-10"
                >
                  Upload New Photo
                </button>
                <button
                  type="button"
                  onClick={() => setAvatarUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80')}
                  className="w-full bg-transparent text-red-600 text-xs font-semibold py-2 px-4 rounded-xl border border-red-200 hover:bg-red-50 transition-colors h-10"
                >
                  Remove Photo
                </button>
              </div>
            </div>

            {/* Visibility Settings */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Profile Availability</h4>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-medium text-slate-700">Available for projects</span>
                <input
                  type="checkbox"
                  checked={availableForProjects}
                  onChange={(e) => setAvailableForProjects(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
              </label>
            </div>
          </div>

          {/* Right Column: Information Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>Personal Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-700 mb-2">Professional Headline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  maxLength={500}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 resize-none"
                />
                <p className="text-right text-[11px] text-slate-400 mt-1 font-medium">
                  {bio.length}/500
                </p>
              </div>
            </div>

            {/* Skills & Expertise */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                <span>Skills & Expertise</span>
              </h2>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-800"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="relative flex gap-2">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    placeholder="Add a skill (e.g. Data Analysis, Figma, Node.js)"
                    className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="bg-blue-50 text-blue-700 px-4 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors shrink-0"
                  >
                    Add Skill
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/settings')}
                className="px-6 py-3 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-slate-100 transition-colors h-11"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all h-11 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
