import React, { useState, useRef } from 'react';
import {
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  Plus,
  Trash2,
  RotateCcw,
  Check,
  FileCheck,
  Eye,
  ShieldCheck,
  Layers,
  ChevronDown,
  ChevronUp,
  Upload,
  Camera,
  Sparkles,
  Wrench,
  UserCheck,
} from 'lucide-react';
import { CandidateDetails, CvContent, JobCategory, TargetCountry, WorkExperience, EducationItem, LanguageItem } from '../types';
import { generateCvContent } from '../data/internationalJobData';
import { DEFAULT_PASSPORT_PHOTO } from '../utils/defaultPhoto';

interface CvEditorProps {
  details: CandidateDetails;
  cv: CvContent;
  onChange: (updatedCv: Partial<CvContent>) => void;
  onResetCv: () => void;
  onNavigateToPreview: () => void;
}

export const CvEditor: React.FC<CvEditorProps> = ({
  details,
  cv,
  onChange,
  onResetCv,
  onNavigateToPreview,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'skills' | 'education' | 'languages'>('profile');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onChange({
          photoUrl: dataUrl,
          showPhoto: true,
          photoWhiteBackground: true,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const photoSource = cv.photoUrl || DEFAULT_PASSPORT_PHOTO;

  // Helper for experience
  const handleUpdateExperience = (index: number, updated: Partial<WorkExperience>) => {
    const newExps = [...cv.experiences];
    newExps[index] = { ...newExps[index], ...updated };
    onChange({ experiences: newExps });
  };

  const handleAddExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      role: 'Warehouse Assistant / Material Handler',
      company: 'Logistics Distribution Center',
      location: 'Delhi, India',
      startDate: '2020',
      endDate: '2022',
      isCurrent: false,
      responsibilities: [
        'Loaded, unloaded, and inspected inbound freight shipments.',
        'Operated manual pallet jacks to transfer items into storage racks.',
      ],
    };
    onChange({ experiences: [...cv.experiences, newExp] });
  };

  const handleRemoveExperience = (index: number) => {
    const newExps = cv.experiences.filter((_, i) => i !== index);
    onChange({ experiences: newExps });
  };

  const handleAddResponsibility = (expIndex: number) => {
    const exp = cv.experiences[expIndex];
    const newResps = [...exp.responsibilities, 'New duty or warehouse task'];
    handleUpdateExperience(expIndex, { responsibilities: newResps });
  };

  const handleUpdateResponsibility = (expIndex: number, respIndex: number, text: string) => {
    const exp = cv.experiences[expIndex];
    const newResps = [...exp.responsibilities];
    newResps[respIndex] = text;
    handleUpdateExperience(expIndex, { responsibilities: newResps });
  };

  const handleRemoveResponsibility = (expIndex: number, respIndex: number) => {
    const exp = cv.experiences[expIndex];
    const newResps = exp.responsibilities.filter((_, i) => i !== respIndex);
    handleUpdateExperience(expIndex, { responsibilities: newResps });
  };

  // Helper for skills
  const handleAddSkill = (skill: string) => {
    if (!skill.trim()) return;
    onChange({ operationalSkills: [...cv.operationalSkills, skill.trim()] });
  };

  const handleRemoveSkill = (index: number) => {
    onChange({ operationalSkills: cv.operationalSkills.filter((_, i) => i !== index) });
  };

  const handleAddStrength = (strength: string) => {
    if (!strength.trim()) return;
    onChange({ personalStrengths: [...cv.personalStrengths, strength.trim()] });
  };

  const handleRemoveStrength = (index: number) => {
    onChange({ personalStrengths: cv.personalStrengths.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
              Customize Curriculum Vitae (CV)
            </h2>
            <span className="text-[11px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded border border-amber-200">
              European Standard
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Tailor your professional summary, work history, skills, and languages for {details.targetCountry} employers.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={onResetCv}
            className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg border border-stone-200 font-medium flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={onNavigateToPreview}
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View CV Document</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-stone-200 bg-white rounded-t-xl px-2 pt-2 gap-1 overflow-x-auto text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`px-3.5 py-2.5 rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'profile'
              ? 'border-amber-600 text-amber-900 font-bold bg-amber-50/50'
              : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-50'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Profile & Summary</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('experience')}
          className={`px-3.5 py-2.5 rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'experience'
              ? 'border-amber-600 text-amber-900 font-bold bg-amber-50/50'
              : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Work Experience ({cv.experiences.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('skills')}
          className={`px-3.5 py-2.5 rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'skills'
              ? 'border-amber-600 text-amber-900 font-bold bg-amber-50/50'
              : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-50'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Operational Skills ({cv.operationalSkills.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('education')}
          className={`px-3.5 py-2.5 rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'education'
              ? 'border-amber-600 text-amber-900 font-bold bg-amber-50/50'
              : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-50'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Education ({cv.education.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('languages')}
          className={`px-3.5 py-2.5 rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'languages'
              ? 'border-amber-600 text-amber-900 font-bold bg-amber-50/50'
              : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-50'
          }`}
        >
          <Languages className="w-3.5 h-3.5" />
          <span>Languages & Badges ({cv.languages.length})</span>
        </button>
      </div>

      {/* Tab 1: Profile & Summary */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-b-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-4">
          {/* European Standard Passport Photo Section */}
          <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-16 rounded border-2 border-stone-300 overflow-hidden shrink-0 flex items-center justify-center shadow-xs ${cv.photoWhiteBackground !== false ? 'bg-white' : 'bg-stone-100'}`}>
                  {cv.showPhoto !== false ? (
                    <img
                      src={photoSource}
                      alt="Passport Photo"
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Camera className="w-5 h-5 text-stone-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">White Background Passport Photo</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded">
                      EU / Singapore Spec
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Attach your formal portrait photo with plain white background. Rendered at official 35×45mm ratio.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1.5 bg-white hover:bg-stone-100 text-stone-800 rounded border border-stone-300 text-xs font-semibold shadow-2xs flex items-center gap-1 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-700" />
                  <span>Upload Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      photoUrl: DEFAULT_PASSPORT_PHOTO,
                      showPhoto: true,
                      photoWhiteBackground: true,
                    })
                  }
                  className="px-2.5 py-1.5 bg-white hover:bg-stone-100 text-stone-700 rounded border border-stone-300 text-xs font-medium transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 inline mr-1" />
                  Default White BG
                </button>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-stone-200/70 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cv.showPhoto !== false}
                  onChange={(e) => onChange({ showPhoto: e.target.checked })}
                  className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-stone-700 font-medium">Display Photo on European CV</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cv.photoWhiteBackground !== false}
                  onChange={(e) => onChange({ photoWhiteBackground: e.target.checked })}
                  className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-stone-700 font-medium">Enforce Solid White Background</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              CV Headline / Target Title
            </label>
            <input
              type="text"
              value={cv.headline}
              onChange={(e) => onChange({ headline: e.target.value })}
              className="w-full text-xs font-semibold p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="e.g. Warehouse Worker & Material Handler | Poland Work Permit Applicant"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-stone-700">
                Professional Summary & International Relocation Statement
              </label>
              <span className="text-[11px] text-stone-500">Highlight stamina & document readiness</span>
            </div>
            <textarea
              rows={6}
              value={cv.professionalSummary}
              onChange={(e) => onChange({ professionalSummary: e.target.value })}
              className="w-full text-xs p-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 leading-relaxed font-sans"
              placeholder="Detail your experience in manual handling, physical endurance, shift flexibility, and readiness for work permit filing..."
            />
          </div>

          {/* Document Options */}
          <div className="pt-2 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center gap-2 p-2.5 bg-stone-50 border border-stone-200 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={cv.showPassportBox}
                onChange={(e) => onChange({ showPassportBox: e.target.checked })}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
              />
              <div>
                <span className="text-xs font-semibold text-stone-900 block">
                  Include Passport & Work Permit Verification Box
                </span>
                <span className="text-[11px] text-stone-500">
                  Highly recommended for Non-EU applicants to show genuine embassy readiness
                </span>
              </div>
            </label>

            <label className="flex items-center gap-2 p-2.5 bg-stone-50 border border-stone-200 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={cv.showReadinessBadges}
                onChange={(e) => onChange({ showReadinessBadges: e.target.checked })}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
              />
              <div>
                <span className="text-xs font-semibold text-stone-900 block">
                  Show 8-12h Shifts & PCC Ready Badges
                </span>
                <span className="text-[11px] text-stone-500">
                  Highlights your availability for rotational shifts and clean police background
                </span>
              </div>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Driving License
            </label>
            <input
              type="text"
              value={cv.driverLicense || ''}
              onChange={(e) => onChange({ driverLicense: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. Valid Motor Vehicle Driving License (LMV / HMV, Clean Record)"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Data Protection & GDPR Clause ({details.targetCountry})
            </label>
            <textarea
              rows={3}
              value={cv.gdprClause}
              onChange={(e) => onChange({ gdprClause: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 font-mono text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Professional References (Displayed on Page 2)
            </label>
            <textarea
              rows={2}
              value={cv.references || ''}
              onChange={(e) => onChange({ references: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. Professional and supervisory references from former warehouse managers and logistics coordinators available immediately upon request."
            />
          </div>
        </div>
      )}

      {/* Tab 2: Work Experience */}
      {activeTab === 'experience' && (
        <div className="bg-white rounded-b-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-600 font-medium">
              List your practical warehousing, material handling, and logistics experience:
            </span>
            <button
              type="button"
              onClick={handleAddExperience}
              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold rounded-lg border border-amber-200 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Position</span>
            </button>
          </div>

          <div className="space-y-4">
            {cv.experiences.map((exp, expIdx) => (
              <div
                key={exp.id}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                    Position #{expIdx + 1}
                  </span>
                  {cv.experiences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(expIdx)}
                      className="text-stone-400 hover:text-red-600 p-1 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Job Title / Role
                    </label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => handleUpdateExperience(expIdx, { role: e.target.value })}
                      className="w-full text-xs font-medium p-2 rounded-lg border border-stone-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleUpdateExperience(expIdx, { company: e.target.value })}
                      className="w-full text-xs font-medium p-2 rounded-lg border border-stone-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleUpdateExperience(expIdx, { location: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Start Date
                      </label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => handleUpdateExperience(expIdx, { startDate: e.target.value })}
                        className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        End Date
                      </label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => handleUpdateExperience(expIdx, { endDate: e.target.value })}
                        className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Key Responsibilities */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-semibold text-stone-600">
                      Key Duties & Achievements (Action Verbs)
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAddResponsibility(expIdx)}
                      className="text-[11px] font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Duty</span>
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {exp.responsibilities.map((resp, respIdx) => (
                      <div key={respIdx} className="flex items-center gap-2">
                        <span className="text-amber-700 font-bold">•</span>
                        <input
                          type="text"
                          value={resp}
                          onChange={(e) =>
                            handleUpdateResponsibility(expIdx, respIdx, e.target.value)
                          }
                          className="flex-1 text-xs p-1.5 rounded border border-stone-300 bg-white"
                        />
                        {exp.responsibilities.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveResponsibility(expIdx, respIdx)}
                            className="text-stone-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Operational Skills */}
      {activeTab === 'skills' && (
        <div className="bg-white rounded-b-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-6">
          {/* Operational Skills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                Operational & Warehouse Skills
              </label>
              <span className="text-[11px] text-stone-500">Physical handling, scanning & safety</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {cv.operationalSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-amber-50 border border-amber-200 text-amber-950 font-medium"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(idx)}
                    className="text-amber-700 hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Quick add */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="new-operational-skill-input"
                placeholder="Add custom operational skill (e.g. Electric Pallet Jack, Inventory Staging)..."
                className="flex-1 text-xs p-2 rounded-lg border border-stone-300"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('new-operational-skill-input') as HTMLInputElement;
                  if (input && input.value) {
                    handleAddSkill(input.value);
                    input.value = '';
                  }
                }}
                className="px-3 py-2 bg-stone-800 text-white rounded-lg text-xs font-semibold"
              >
                Add
              </button>
            </div>
          </div>

          {/* Personal Strengths / Stamina */}
          <div className="pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                Work Ethic & Physical Strengths
              </label>
              <span className="text-[11px] text-stone-500">Punctuality, shifts & stamina</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {cv.personalStrengths.map((strength, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-stone-100 border border-stone-300 text-stone-900 font-medium"
                >
                  <span>{strength}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStrength(idx)}
                    className="text-stone-500 hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                id="new-strength-input"
                placeholder="Add work ethic strength (e.g. High Attendance, Weekend Availability)..."
                className="flex-1 text-xs p-2 rounded-lg border border-stone-300"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddStrength((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('new-strength-input') as HTMLInputElement;
                  if (input && input.value) {
                    handleAddStrength(input.value);
                    input.value = '';
                  }
                }}
                className="px-3 py-2 bg-stone-800 text-white rounded-lg text-xs font-semibold"
              >
                Add
              </button>
            </div>
          </div>

          {/* Material Handling Equipment Skills (Page 2 Matrix) */}
          <div className="pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                Material Handling Equipment & Industrial Systems (Page 2 Matrix)
              </label>
              <span className="text-[11px] text-stone-500">Pallet trucks, RF guns, dock levelers</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {(cv.equipmentSkills || []).map((eq, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-amber-50/80 border border-amber-200 text-amber-950 font-medium"
                >
                  <Wrench className="w-3 h-3 text-amber-700 shrink-0" />
                  <span>{eq}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newEq = (cv.equipmentSkills || []).filter((_, i) => i !== idx);
                      onChange({ equipmentSkills: newEq });
                    }}
                    className="text-amber-700 hover:text-red-600 ml-1 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                id="new-equipment-input"
                placeholder="Add equipment (e.g. Electric Walkie Stacker, Stretch Wrapper)..."
                className="flex-1 text-xs p-2 rounded-lg border border-stone-300"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val) {
                      onChange({ equipmentSkills: [...(cv.equipmentSkills || []), val] });
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('new-equipment-input') as HTMLInputElement;
                  if (input && input.value.trim()) {
                    onChange({ equipmentSkills: [...(cv.equipmentSkills || []), input.value.trim()] });
                    input.value = '';
                  }
                }}
                className="px-3 py-2 bg-stone-800 text-white rounded-lg text-xs font-semibold"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Education */}
      {activeTab === 'education' && (
        <div className="bg-white rounded-b-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-600 font-medium">
              Academic credentials and schooling:
            </span>
          </div>

          <div className="space-y-3">
            {cv.education.map((edu, idx) => (
              <div key={edu.id} className="p-3 bg-stone-50 border border-stone-200 rounded-lg space-y-2 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Degree / Certificate
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const newEd = [...cv.education];
                        newEd[idx].degree = e.target.value;
                        onChange({ education: newEd });
                      }}
                      className="w-full text-xs p-1.5 rounded border border-stone-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Institution / Board
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const newEd = [...cv.education];
                        newEd[idx].institution = e.target.value;
                        onChange({ education: newEd });
                      }}
                      className="w-full text-xs p-1.5 rounded border border-stone-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Location
                    </label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) => {
                        const newEd = [...cv.education];
                        newEd[idx].location = e.target.value;
                        onChange({ education: newEd });
                      }}
                      className="w-full text-xs p-1.5 rounded border border-stone-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Year
                    </label>
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => {
                        const newEd = [...cv.education];
                        newEd[idx].year = e.target.value;
                        onChange({ education: newEd });
                      }}
                      className="w-full text-xs p-1.5 rounded border border-stone-300 bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Languages */}
      {activeTab === 'languages' && (
        <div className="bg-white rounded-b-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-4">
          <span className="text-xs text-stone-600 font-medium block">
            Languages spoken with CEFR European proficiency levels (Crucial for floor instructions):
          </span>

          <div className="space-y-3">
            {cv.languages.map((lang, idx) => (
              <div key={lang.id} className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Language
                    </label>
                    <input
                      type="text"
                      value={lang.language}
                      onChange={(e) => {
                        const newL = [...cv.languages];
                        newL[idx].language = e.target.value;
                        onChange({ languages: newL });
                      }}
                      className="w-full text-xs p-1.5 rounded border border-stone-300 bg-white font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Description / Usage
                    </label>
                    <input
                      type="text"
                      value={lang.proficiency}
                      onChange={(e) => {
                        const newL = [...cv.languages];
                        newL[idx].proficiency = e.target.value;
                        onChange({ languages: newL });
                      }}
                      className="w-full text-xs p-1.5 rounded border border-stone-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      CEFR Level Badge
                    </label>
                    <select
                      value={lang.levelBadge}
                      onChange={(e) => {
                        const newL = [...cv.languages];
                        newL[idx].levelBadge = e.target.value;
                        onChange({ languages: newL });
                      }}
                      className="w-full text-xs p-1.5 rounded border border-stone-300 bg-white font-bold"
                    >
                      <option value="A1 Learner">A1 Learner (Basic vocabulary & greetings)</option>
                      <option value="A2 Elementary">A2 Elementary (Basic floor commands)</option>
                      <option value="B1 Intermediate">B1 Intermediate (Everyday conversations)</option>
                      <option value="B2 Level">B2 Level (Communicative / Fluent working proficiency)</option>
                      <option value="C1 Advanced">C1 Advanced (Full operational proficiency)</option>
                      <option value="C2 Native">C2 Native (Mother tongue)</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Button to View CV */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onNavigateToPreview}
          className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          <FileCheck className="w-4 h-4" />
          <span>Save & View CV Document</span>
        </button>
      </div>
    </div>
  );
};
