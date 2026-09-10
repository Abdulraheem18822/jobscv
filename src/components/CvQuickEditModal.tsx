import React, { useState } from 'react';
import {
  X,
  User,
  Briefcase,
  FileText,
  GraduationCap,
  Wrench,
  Layers,
  Plus,
  Trash2,
  Check,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { CandidateDetails, CvContent, WorkExperience, EducationItem, LanguageItem } from '../types';

interface CvQuickEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: CandidateDetails;
  cv: CvContent;
  onUpdateDetails: (updated: Partial<CandidateDetails>) => void;
  onUpdateCv: (updated: Partial<CvContent>) => void;
}

export const CvQuickEditModal: React.FC<CvQuickEditModalProps> = ({
  isOpen,
  onClose,
  details,
  cv,
  onUpdateDetails,
  onUpdateCv,
}) => {
  const [activeTab, setActiveTab] = useState<
    'profile' | 'summary' | 'experience' | 'skills' | 'education' | 'advanced'
  >('profile');

  if (!isOpen) return null;

  // Work experience helpers
  const handleAddExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      role: details.targetJobTitle || 'Operative',
      company: 'Logistics Facility / Employer',
      location: details.cityCountry || 'India',
      startDate: '2022',
      endDate: 'Present',
      isCurrent: true,
      responsibilities: [
        'Executed daily operational procedures maintaining 100% compliance with safety and quality standards.',
        'Collaborated with multinational team leads to achieve daily production and delivery quotas.',
      ],
    };
    onUpdateCv({
      experiences: [newExp, ...(cv.experiences || [])],
    });
  };

  const handleUpdateExperience = (index: number, updated: Partial<WorkExperience>) => {
    const nextExps = [...(cv.experiences || [])];
    if (nextExps[index]) {
      nextExps[index] = { ...nextExps[index], ...updated };
      onUpdateCv({ experiences: nextExps });
    }
  };

  const handleRemoveExperience = (index: number) => {
    const nextExps = (cv.experiences || []).filter((_, i) => i !== index);
    onUpdateCv({ experiences: nextExps });
  };

  // Education helpers
  const handleAddEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: 'Vocational / Secondary Certificate',
      institution: 'State Technical Board / School',
      location: details.cityCountry || 'India',
      year: '2020',
    };
    onUpdateCv({
      education: [...(cv.education || []), newEdu],
    });
  };

  const handleUpdateEducation = (index: number, updated: Partial<EducationItem>) => {
    const nextEdu = [...(cv.education || [])];
    if (nextEdu[index]) {
      nextEdu[index] = { ...nextEdu[index], ...updated };
      onUpdateCv({ education: nextEdu });
    }
  };

  const handleRemoveEducation = (index: number) => {
    const nextEdu = (cv.education || []).filter((_, i) => i !== index);
    onUpdateCv({ education: nextEdu });
  };

  // Languages helpers
  const handleAddLanguage = () => {
    const newLang: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: 'English',
      proficiency: 'Professional Working Proficiency',
      levelBadge: 'B2 / Fluent',
    };
    onUpdateCv({
      languages: [...(cv.languages || []), newLang],
    });
  };

  const handleUpdateLanguage = (index: number, updated: Partial<LanguageItem>) => {
    const nextLangs = [...(cv.languages || [])];
    if (nextLangs[index]) {
      nextLangs[index] = { ...nextLangs[index], ...updated };
      onUpdateCv({ languages: nextLangs });
    }
  };

  const handleRemoveLanguage = (index: number) => {
    const nextLangs = (cv.languages || []).filter((_, i) => i !== index);
    onUpdateCv({ languages: nextLangs });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-stone-200 bg-stone-50/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-stone-900">
                Quick Edit CV & Candidate Dossier
              </h3>
              <p className="text-[11px] text-stone-500">
                Edit any section directly. Updates apply immediately to live preview and PDF exports.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-5 pt-3 pb-2 border-b border-stone-200 bg-white flex flex-wrap gap-1.5 overflow-x-auto text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile & Passport</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('summary')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'summary'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Headline & Summary</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('experience')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'experience'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Work Experience ({cv.experiences?.length || 0})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('skills')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'skills'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Skills & Equipment</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('education')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'education'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Education & Languages</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('advanced')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'advanced'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Multi-Page Dossier (Pages 3-5)</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
          {/* TAB 1: Profile & Passport */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl">
                <span className="font-bold text-amber-950 block mb-1">
                  Candidate Personal & Contact Information
                </span>
                <p className="text-[11px] text-amber-900/80">
                  Any visitor can freely modify these details to customize their application.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Candidate Full Name:
                  </label>
                  <input
                    type="text"
                    value={details.fullName}
                    onChange={(e) => onUpdateDetails({ fullName: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Target Job Title / Trade:
                  </label>
                  <input
                    type="text"
                    value={details.targetJobTitle}
                    onChange={(e) => {
                      onUpdateDetails({ targetJobTitle: e.target.value });
                      onUpdateCv({ targetJobTitle: e.target.value });
                    }}
                    placeholder="e.g. Warehouse Operative / Forklift Driver"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    value={details.email}
                    onChange={(e) => onUpdateDetails({ email: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    value={details.phone}
                    onChange={(e) => onUpdateDetails({ phone: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    City, Country:
                  </label>
                  <input
                    type="text"
                    value={details.cityCountry}
                    onChange={(e) => onUpdateDetails({ cityCountry: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Nationality:
                  </label>
                  <input
                    type="text"
                    value={details.nationality}
                    onChange={(e) => onUpdateDetails({ nationality: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Date of Birth:
                  </label>
                  <input
                    type="text"
                    value={details.dateOfBirth}
                    onChange={(e) => onUpdateDetails({ dateOfBirth: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Marital Status:
                  </label>
                  <input
                    type="text"
                    value={details.maritalStatus}
                    onChange={(e) => onUpdateDetails({ maritalStatus: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  />
                </div>
              </div>

              {/* Passport Block */}
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                <span className="font-bold text-stone-900 block">
                  International Passport & Relocation Details
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Passport Number:
                    </label>
                    <input
                      type="text"
                      value={details.passport.passportNumber}
                      onChange={(e) =>
                        onUpdateDetails({
                          passport: { ...details.passport, passportNumber: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Place of Issue:
                    </label>
                    <input
                      type="text"
                      value={details.passport.placeOfIssue}
                      onChange={(e) =>
                        onUpdateDetails({
                          passport: { ...details.passport, placeOfIssue: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Expiry Date:
                    </label>
                    <input
                      type="text"
                      value={details.passport.expiryDate}
                      onChange={(e) =>
                        onUpdateDetails({
                          passport: { ...details.passport, expiryDate: e.target.value },
                        })
                      }
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Driving License / Certifications:
                    </label>
                    <input
                      type="text"
                      value={cv.driverLicense || ''}
                      onChange={(e) => onUpdateCv({ driverLicense: e.target.value })}
                      placeholder="e.g. Valid Clean Commercial License (LMV / HMV)"
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      GAMCA Medical / Police Clearance:
                    </label>
                    <input
                      type="text"
                      value={details.passport.medicalClearanceStatus || 'FIT / Certified (GAMCA Aligned)'}
                      onChange={(e) =>
                        onUpdateDetails({
                          passport: {
                            ...details.passport,
                            medicalClearanceStatus: e.target.value,
                          },
                        })
                      }
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Headline & Summary */}
          {activeTab === 'summary' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Professional Headline / Banner Title:
                </label>
                <input
                  type="text"
                  value={cv.headline}
                  onChange={(e) => onUpdateCv({ headline: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Professional Summary & Objective:
                </label>
                <textarea
                  rows={6}
                  value={cv.professionalSummary}
                  onChange={(e) => onUpdateCv({ professionalSummary: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  GDPR / Official Compliance Clause:
                </label>
                <textarea
                  rows={3}
                  value={cv.gdprClause}
                  onChange={(e) => onUpdateCv({ gdprClause: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Experience */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-800">Work Experience Entries</span>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-700 hover:bg-amber-800 text-white flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Experience</span>
                </button>
              </div>

              {(cv.experiences || []).map((exp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl space-y-3 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-xs">
                      Experience #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(idx)}
                      className="text-stone-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                      title="Delete experience entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                        Job Role:
                      </label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleUpdateExperience(idx, { role: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 border border-stone-300 rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                        Company Name:
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleUpdateExperience(idx, { company: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                        Start Date:
                      </label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => handleUpdateExperience(idx, { startDate: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 border border-stone-300 rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                        End Date:
                      </label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => handleUpdateExperience(idx, { endDate: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 border border-stone-300 rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                        Location:
                      </label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => handleUpdateExperience(idx, { location: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                      Key Responsibilities (One per line):
                    </label>
                    <textarea
                      rows={3}
                      value={exp.responsibilities?.join('\n') || ''}
                      onChange={(e) =>
                        handleUpdateExperience(idx, {
                          responsibilities: e.target.value
                            .split('\n')
                            .filter((line) => line.trim().length > 0),
                        })
                      }
                      className="w-full text-xs px-2.5 py-1.5 border border-stone-300 rounded-lg bg-white leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: Skills */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Operational Competencies (One per line):
                </label>
                <textarea
                  rows={5}
                  value={cv.operationalSkills?.join('\n') || ''}
                  onChange={(e) =>
                    onUpdateCv({
                      operationalSkills: e.target.value
                        .split('\n')
                        .filter((s) => s.trim().length > 0),
                    })
                  }
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Material Handling & Equipment Skills (One per line):
                </label>
                <textarea
                  rows={4}
                  value={cv.equipmentSkills?.join('\n') || ''}
                  onChange={(e) =>
                    onUpdateCv({
                      equipmentSkills: e.target.value
                        .split('\n')
                        .filter((s) => s.trim().length > 0),
                    })
                  }
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Physical Stamina & Strengths (One per line):
                </label>
                <textarea
                  rows={4}
                  value={cv.personalStrengths?.join('\n') || ''}
                  onChange={(e) =>
                    onUpdateCv({
                      personalStrengths: e.target.value
                        .split('\n')
                        .filter((s) => s.trim().length > 0),
                    })
                  }
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 5: Education & Languages */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              {/* Education section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-800">Education & Qualifications</span>
                  <button
                    type="button"
                    onClick={handleAddEducation}
                    className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-700 hover:bg-amber-800 text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Education</span>
                  </button>
                </div>

                {(cv.education || []).map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-stone-50 border border-stone-200 rounded-lg space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-800 text-[11px]">
                        Qualification #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveEducation(idx)}
                        className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-stone-600">Degree / Certificate:</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleUpdateEducation(idx, { degree: e.target.value })}
                          className="w-full text-xs px-2.5 py-1.5 border border-stone-300 rounded bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-600">Institution:</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => handleUpdateEducation(idx, { institution: e.target.value })}
                          className="w-full text-xs px-2.5 py-1.5 border border-stone-300 rounded bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-stone-600">Location:</label>
                        <input
                          type="text"
                          value={edu.location}
                          onChange={(e) => handleUpdateEducation(idx, { location: e.target.value })}
                          className="w-full text-xs px-2.5 py-1.5 border border-stone-300 rounded bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-600">Year / Duration:</label>
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) => handleUpdateEducation(idx, { year: e.target.value })}
                          className="w-full text-xs px-2.5 py-1.5 border border-stone-300 rounded bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Languages Section */}
              <div className="space-y-2 pt-3 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-800">Language Proficiencies</span>
                  <button
                    type="button"
                    onClick={handleAddLanguage}
                    className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-700 hover:bg-amber-800 text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Language</span>
                  </button>
                </div>

                {(cv.languages || []).map((lang, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-stone-50 border border-stone-200 rounded-lg flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={lang.language}
                      onChange={(e) => handleUpdateLanguage(idx, { language: e.target.value })}
                      placeholder="Language"
                      className="w-1/3 text-xs px-2.5 py-1.5 border border-stone-300 rounded bg-white"
                    />
                    <input
                      type="text"
                      value={lang.proficiency}
                      onChange={(e) => handleUpdateLanguage(idx, { proficiency: e.target.value })}
                      placeholder="Proficiency"
                      className="w-1/3 text-xs px-2.5 py-1.5 border border-stone-300 rounded bg-white"
                    />
                    <input
                      type="text"
                      value={lang.levelBadge}
                      onChange={(e) => handleUpdateLanguage(idx, { levelBadge: e.target.value })}
                      placeholder="Level Badge"
                      className="w-1/4 text-xs px-2.5 py-1.5 border border-stone-300 rounded bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveLanguage(idx)}
                      className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Multi-Page Advanced Dossier */}
          {activeTab === 'advanced' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
                <span className="font-bold text-amber-950 block">
                  Extended Dossier Sections (Rendered on Pages 3, 4, and 5)
                </span>
                <p className="text-[11px] text-amber-900/80">
                  These high-impact sections appear when 3, 4, or 5 page layouts are selected.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Vocational Safety & Continuous Education Certifications (Page 5):
                </label>
                <textarea
                  rows={4}
                  value={cv.vocationalTrainings?.join('\n') || ''}
                  onChange={(e) =>
                    onUpdateCv({
                      vocationalTrainings: e.target.value
                        .split('\n')
                        .filter((v) => v.trim().length > 0),
                    })
                  }
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Zero-Tolerance Safety Protocols & Fitness Guarantees (Page 5):
                </label>
                <textarea
                  rows={4}
                  value={cv.safetyProtocols?.join('\n') || ''}
                  onChange={(e) =>
                    onUpdateCv({
                      safetyProtocols: e.target.value
                        .split('\n')
                        .filter((v) => v.trim().length > 0),
                    })
                  }
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white leading-relaxed"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3">
          <span className="text-xs text-stone-500">
            Changes are saved live to your session and exports.
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-700 hover:bg-amber-800 text-white shadow-xs transition-colors cursor-pointer"
          >
            Done & View Live CV
          </button>
        </div>
      </div>
    </div>
  );
};
