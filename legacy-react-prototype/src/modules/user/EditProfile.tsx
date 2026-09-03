import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Save,
  X,
  User,
  Brain,
  ArrowLeft,
  Upload,
  Loader2,
  Link2,
  Award,
  Plus,
  Trash2,
  Store,
  MapPin,
  Globe,
  Instagram,
  Phone,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import { userService } from '../../shared/services/api/userService';
import { uploadService } from '../../shared/services/api/uploadService';
import { Certificate } from '../../shared/types/types';

export const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isUmkm = currentUser?.role === 'umkm';

  // Student State
  const nameParts = (currentUser.name || '').split(' ');
  const [firstName, setFirstName] = useState(nameParts[0] || '');
  const [lastName, setLastName] = useState(nameParts.slice(1).join(' ') || '');
  const [headline, setHeadline] = useState(currentUser.institution || '');
  const [skills, setSkills] = useState<string[]>(currentUser.skills || []);
  const [certificates, setCertificates] = useState<Certificate[]>(currentUser.certificates || []);
  const [newCertTitle, setNewCertTitle] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertDate, setNewCertDate] = useState('');
  const [newSkillInput, setNewSkillInput] = useState('');

  // UMKM Specific State
  const [companyName, setCompanyName] = useState(currentUser.companyName || currentUser.name || '');
  const [industry, setIndustry] = useState(currentUser.industry || 'Food & Beverage');
  const [location, setLocation] = useState(currentUser.location || '');
  const [website, setWebsite] = useState(currentUser.website || '');
  const [instagram, setInstagram] = useState(currentUser.instagram || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [businessScale, setBusinessScale] = useState(currentUser.businessScale || 'Small Enterprise');

  // Shared State
  const [bio, setBio] = useState(currentUser.bio || '');
  const [availableForProjects, setAvailableForProjects] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar || currentUser.companyLogo || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    userService.getProfile().then(user => {
      if (user) {
        setCurrentUser(user);
        const parts = (user.name || '').split(' ');
        setFirstName(parts[0] || '');
        setLastName(parts.slice(1).join(' ') || '');
        setHeadline(user.institution || '');
        setBio(user.bio || '');
        setSkills(user.skills || []);
        setCertificates(user.certificates || []);
        setAvatarUrl(user.avatar || user.companyLogo || '');

        setCompanyName(user.companyName || user.name || '');
        setIndustry(user.industry || 'Food & Beverage');
        setLocation(user.location || '');
        setWebsite(user.website || '');
        setInstagram(user.instagram || '');
        setPhone(user.phone || '');
        setBusinessScale(user.businessScale || 'Small Enterprise');
      }
    }).catch(err => console.error('Failed to sync profile in edit:', err));
  }, []);

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAddCertificate = () => {
    if (newCertTitle.trim() && newCertIssuer.trim()) {
      const newCert: Certificate = {
        id: `cert-${Date.now()}`,
        title: newCertTitle.trim(),
        issuer: newCertIssuer.trim(),
        date: newCertDate.trim() || undefined,
      };
      setCertificates([...certificates, newCert]);
      setNewCertTitle('');
      setNewCertIssuer('');
      setNewCertDate('');
    }
  };

  const handleRemoveCertificate = (indexToRemove: number) => {
    setCertificates(certificates.filter((_, idx) => idx !== indexToRemove));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPEG, PNG, WEBP, GIF)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size must be less than 5MB');
      return;
    }

    // Instant local preview
    const localPreview = URL.createObjectURL(file);
    setAvatarUrl(localPreview);
    setIsUploadingPhoto(true);
    setUploadError(null);

    try {
      const uploadRes = await uploadService.uploadPhoto(file);
      setAvatarUrl(uploadRes.url);
    } catch (err: any) {
      console.error('Photo upload failed:', err);
      setUploadError(err.response?.data?.error || 'Failed to upload image. Please try again.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (isUmkm) {
        await userService.updateProfile({
          name: companyName,
          companyName,
          industry,
          location,
          website,
          instagram,
          phone,
          businessScale,
          bio,
          avatar: avatarUrl
        });
      } else {
        await userService.updateProfile({
          name: `${firstName} ${lastName}`.trim(),
          institution: headline,
          bio,
          skills,
          certificates,
          avatar: avatarUrl
        });
      }

      // Force refresh of the global user state
      const updatedUser = await userService.getProfile();
      setCurrentUser(updatedUser);

      navigate('/profile');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const industriesList = [
    'Food & Beverage',
    'Fashion & Apparel',
    'Retail & E-Commerce',
    'Technology & Software',
    'Creative, Media & Design',
    'Agriculture & Agribusiness',
    'Healthcare & Wellness',
    'Education & Professional Services',
    'Handicraft & Traditional Arts',
    'Tourism & Hospitality'
  ];

  const scalesList = [
    'Micro Enterprise (1-4 Employees)',
    'Small Enterprise (5-19 Employees)',
    'Medium Enterprise (20-99 Employees)',
    'Growing Startup'
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation back */}
        <button
          onClick={() => navigate('/profile')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </button>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {isUmkm ? 'Edit Enterprise Profile' : 'Edit Profile'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {isUmkm
              ? 'Manage your company identity, industry sector, online presence, and business story.'
              : 'Manage your personal information, skills, and portfolio presence.'}
          </p>
        </div>

        {/* Form Layout Grid */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Photo & Quick Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Photo Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80 flex flex-col items-center text-center">
              {/* Hidden File Input for Local Upload */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                className="hidden"
                onChange={handleFileChange}
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative ${isUmkm ? 'w-32 h-32 rounded-2xl' : 'w-32 h-32 rounded-full'} overflow-hidden mb-4 group cursor-pointer border-4 border-slate-50 shadow-sm`}
                title="Click to upload photo from device"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={isUmkm ? companyName : firstName}
                    className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:opacity-80 transition-opacity">
                    {isUmkm ? <Store className="w-12 h-12 text-blue-600" /> : <User className="w-12 h-12" />}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {isUploadingPhoto ? (
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  ) : (
                    <Camera className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 truncate max-w-full">
                {isUmkm ? (companyName || 'Business Name') : `${firstName} ${lastName}`}
              </h3>
              <p className="text-xs text-slate-500 mb-4 truncate max-w-full">
                {isUmkm ? industry : (headline || 'No headline set')}
              </p>

              {uploadError && (
                <div className="w-full mb-3 p-2 text-[11px] text-red-600 bg-red-50 border border-red-200 rounded-lg">
                  {uploadError}
                </div>
              )}

              <div className="w-full space-y-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingPhoto}
                  className="w-full bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors h-10 flex items-center justify-center gap-2 shadow-xs"
                >
                  {isUploadingPhoto ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>{isUmkm ? 'Upload Company Logo' : 'Upload Profile Photo'}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const newUrl = prompt('Or enter direct image URL:', avatarUrl);
                    if (newUrl !== null) setAvatarUrl(newUrl);
                  }}
                  className="w-full bg-slate-50 text-slate-700 text-xs font-semibold py-2 px-4 rounded-xl hover:bg-slate-100 transition-colors h-9 flex items-center justify-center gap-1.5 border border-slate-200"
                >
                  <Link2 className="w-3.5 h-3.5" />
                  <span>Enter Image URL</span>
                </button>

                {avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setAvatarUrl('')}
                    className="w-full bg-transparent text-red-600 text-xs font-semibold py-1.5 px-4 rounded-xl border border-red-200 hover:bg-red-50 transition-colors h-9"
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            </div>

            {/* Visibility Settings */}
            <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                {isUmkm ? 'Hiring Status' : 'Profile Availability'}
              </h4>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-medium text-slate-700">
                  {isUmkm ? 'Actively Hiring Talents' : 'Available for projects'}
                </span>
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
            
            {/* =============================================================== */}
            {/* UMKM FORM FIELDS                                                */}
            {/* =============================================================== */}
            {isUmkm ? (
              <>
                {/* Company Information Card */}
                <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80 space-y-4">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <span>Company Information</span>
                  </h2>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Company / Enterprise Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      placeholder="e.g. Lumina Beans Roastery"
                      className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Industry Sector</label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 cursor-pointer"
                      >
                        {industriesList.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Business Scale</label>
                      <select
                        value={businessScale}
                        onChange={(e) => setBusinessScale(e.target.value)}
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 cursor-pointer"
                      >
                        {scalesList.map((sc) => (
                          <option key={sc} value={sc}>{sc}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Business Location (City / Province)</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Jakarta Selatan, DKI Jakarta"
                        className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Company Overview & Mission</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      maxLength={600}
                      placeholder="Tell students about your company story, what you produce, and what you look for in student talents..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 resize-none"
                    />
                    <p className="text-right text-[11px] text-slate-400 mt-1 font-medium">
                      {bio.length}/600
                    </p>
                  </div>
                </div>

                {/* Online Presence & Contact Card */}
                <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80 space-y-4">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <span>Online Presence & Contacts</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Website URL</label>
                      <div className="relative">
                        <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="e.g. luminabeans.com"
                          className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Instagram Handle</label>
                      <div className="relative">
                        <Instagram className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          placeholder="e.g. luminabeans.id"
                          className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Business WhatsApp / Phone</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +62 812-3456-7890"
                        className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* =============================================================== */
              /* STUDENT FORM FIELDS                                             */
              /* =============================================================== */
              <>
                {/* Personal Information */}
                <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
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
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Institution / University</label>
                    <input
                      type="text"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="e.g. Universitas Indonesia"
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
                <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
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

                {/* Certificates & Credentials */}
                <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
                  <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span>Certificates & Credentials</span>
                  </h2>

                  {/* Existing Certificates List */}
                  <div className="space-y-2.5 mb-5">
                    {certificates.length > 0 ? (
                      certificates.map((cert, index) => (
                        <div
                          key={cert.id || index}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                              <Award className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900">{cert.title}</h4>
                              <p className="text-[11px] text-slate-500">
                                {cert.issuer} {cert.date ? `• ${cert.date}` : ''}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveCertificate(index)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            title="Remove Certificate"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">No certificates added yet.</p>
                    )}
                  </div>

                  {/* Add Certificate Inputs */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/60 space-y-3">
                    <h4 className="text-xs font-bold text-slate-800">Add New Certificate</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Certificate Title</label>
                        <input
                          type="text"
                          value={newCertTitle}
                          onChange={(e) => setNewCertTitle(e.target.value)}
                          placeholder="e.g. AWS Certified Developer"
                          className="w-full h-9 bg-white border border-slate-200 rounded-lg px-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Issuing Organization</label>
                        <input
                          type="text"
                          value={newCertIssuer}
                          onChange={(e) => setNewCertIssuer(e.target.value)}
                          placeholder="e.g. Amazon Web Services"
                          className="w-full h-9 bg-white border border-slate-200 rounded-lg px-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Issue Year / Date (Optional)</label>
                        <input
                          type="text"
                          value={newCertDate}
                          onChange={(e) => setNewCertDate(e.target.value)}
                          placeholder="e.g. 2026"
                          className="w-full h-9 bg-white border border-slate-200 rounded-lg px-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div className="pt-5">
                        <button
                          type="button"
                          onClick={handleAddCertificate}
                          disabled={!newCertTitle.trim() || !newCertIssuer.trim()}
                          className="h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors disabled:opacity-50 flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all disabled:opacity-70"
              >
                {isSaving ? <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> : <Save className="w-4 h-4" />}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

