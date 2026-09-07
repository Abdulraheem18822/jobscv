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
import { CandidateDetails, CvContent, JobCategory, TargetCountry, WorkExperience, EducationItem, LanguageItem, CvStyle } from '../types';
import { generateCvContent } from '../data/internationalJobData';
import { DEFAULT_PASSPORT_PHOTO } from '../utils/defaultPhoto';

interface CvEditorProps {
  details: CandidateDetails;
  cv: CvContent;
  onChange: (updatedCv: Partial<CvContent>) => void;
  onUpdateDetails?: (updatedDetails: Partial<CandidateDetails>) => void;
  onResetCv: () => void;
  onNavigateToPreview: () => void;
}

export const CvEditor: React.FC<CvEditorProps> = ({
  details,
  cv,
  onChange,
  onUpdateDetails,
  onResetCv,
  onNavigateToPreview,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'skills' | 'education' | 'languages'>('profile');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeStyle: CvStyle = details.cvStyle || cv.style || 'european';

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

  const handleSetCvStyle = (style: CvStyle) => {
    onChange({ style });
    if (onUpdateDetails) {
      onUpdateDetails({ cvStyle: style });
    }
  };

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
            <span className="text-[11px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded border border-amber-200 uppercase">
              {activeStyle} Style
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
            className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg border border-stone-200 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={onNavigateToPreview}
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View CV Document</span>
          </button>
        </div>
      </div>

      {/* CV Style Format Selector */}
      <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs">
        <label className="block text-xs font-semibold text-stone-700 mb-2">
          Choose CV Style Format:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleSetCvStyle('european')}
            className={`p-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeStyle === 'european'
                ? 'border-amber-600 bg-amber-50 text-amber-950 ring-1 ring-amber-600 shadow-2xs'
                : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
            }`}
          >
            <span>🇪🇺</span>
            <span>European Style (Europass)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSetCvStyle('gulf')}
            className={`p-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeStyle === 'gulf'
                ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600 shadow-2xs'
                : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
            }`}
          >
            <span>🇦🇪</span>
            <span>Gulf Style (GCC)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSetCvStyle('indian')}
            className={`p-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeStyle === 'indian'
                ? 'border-blue-600 bg-blue-50 text-blue-950 ring-1 ring-blue-600 shadow-2xs'
                : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
            }`}
          >
            <span>🇮🇳</span>
            <span>Indian Corporate Style</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-stone-200 bg-white rounded-t-xl px-2 pt-2 gap-1 overflow-x-auto text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`px-3.5 py-2.5 rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
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
          className={`px-3.5 py-2.5 rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
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
          className={`px-3.5 py-2.5 rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
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
          className={`px-3.5 py-2.5 rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
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
          className={`px-3.5 py-2.5 rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
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
          {/* Passport Photo Section */}
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
                      Standard Spec
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
                  className="px-2.5 py-1.5 bg-white hover:bg-stone-100 text-stone-800 rounded border border-stone-300 text-xs font-semibold shadow-2xs flex items-center gap-1 transition-colors cursor-pointer"
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
                  className="px-2.5 py-1.5 bg-white hover:bg-stone-100 text-stone-700 rounded border border-stone-300 text-xs font-medium transition-colors cursor-pointer"
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
                <span className="text-stone-700 font-medium">Display Photo on CV</span>
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
              className="w-full text-xs font-semibold p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-900"
              placeholder="e.g. Warehouse Worker & Material Handler | Work Permit Applicant"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-stone-700">
                Professional Summary & Career Objective
              </label>
              <span className="text-[11px] text-stone-500">Highlight stamina & document readiness</span>
            </div>
            <textarea
              rows={6}
              value={cv.professionalSummary}
              onChange={(e) => onChange({ professionalSummary: e.target.value })}
              className="w-full text-xs p-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 leading-relaxed font-sans text-stone-900"
            />
          </div>

          {/* References Field */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              References
            </label>
            <input
              type="text"
              value={cv.references || ''}
              onChange={(e) => onChange({ references: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-900"
              placeholder="Available immediately upon request"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Work Experience */}
      {activeTab === 'experience' && (
        <div className="bg-white rounded-b-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-600 font-medium">
              Add your past jobs and warehouse / industrial responsibilities:
            </span>
            <button
              type="button"
              onClick={handleAddExperience}
              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg border border-amber-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-700" />
              <span>Add Position</span>
            </button>
          </div>

          <div className="space-y-4">
            {cv.experiences.map((exp, expIdx) => (
              <div
                key={exp.id}
                className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <span className="font-bold text-stone-900 text-xs">
                    Position #{expIdx + 1}
                  </span>
                  {cv.experiences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(expIdx)}
                      className="text-red-600 hover:text-red-700 text-xs font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Role Title
                    </label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => handleUpdateExperience(expIdx, { role: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white font-semibold text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleUpdateExperience(expIdx, { company: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      City, Country
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleUpdateExperience(expIdx, { location: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white text-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                        Start Date
                      </label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => handleUpdateExperience(expIdx, { startDate: e.target.value })}
                        className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                        End Date
                      </label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => handleUpdateExperience(expIdx, { endDate: e.target.value })}
                        className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white text-stone-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-semibold text-stone-600">
                      Key Responsibilities & Operational Duties:
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAddResponsibility(expIdx)}
                      className="text-amber-700 hover:text-amber-800 text-[11px] font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Duty</span>
                    </button>
                  </div>

                  {exp.responsibilities.map((resp, respIdx) => (
                    <div key={respIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={resp}
                        onChange={(e) => handleUpdateResponsibility(expIdx, respIdx, e.target.value)}
                        className="flex-1 text-xs p-1.5 rounded border border-stone-300 bg-white text-stone-900"
                      />
                      {exp.responsibilities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveResponsibility(expIdx, respIdx)}
                          className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Operational Skills */}
      {activeTab === 'skills' && (
        <div className="bg-white rounded-b-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-5">
          {/* Warehouse Competencies */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-stone-700">
              Warehouse & Logistics Operational Skills:
            </label>
            <div className="space-y-1.5">
              {cv.operationalSkills.map((s, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={s}
                    onChange={(e) => {
                      const newS = [...cv.operationalSkills];
                      newS[idx] = e.target.value;
                      onChange({ operationalSkills: newS });
                    }}
                    className="flex-1 text-xs p-2 rounded-lg border border-stone-300 bg-white text-stone-900 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(idx)}
                    className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleAddSkill('Safe Container Devanning & Pallet Staging')}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Operational Skill</span>
            </button>
          </div>

          {/* Personal Strengths & Stamina */}
          <div className="space-y-2 pt-3 border-t border-stone-200">
            <label className="block text-xs font-semibold text-stone-700">
              Physical Stamina & Work Ethic Strengths:
            </label>
            <div className="space-y-1.5">
              {cv.personalStrengths.map((str, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={str}
                    onChange={(e) => {
                      const newStr = [...cv.personalStrengths];
                      newStr[idx] = e.target.value;
                      onChange({ personalStrengths: newStr });
                    }}
                    className="flex-1 text-xs p-2 rounded-lg border border-stone-300 bg-white text-stone-900"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveStrength(idx)}
                    className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleAddStrength('High Energy & Punctual for Rotating Shifts')}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Strength / Stamina Point</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Education */}
      {activeTab === 'education' && (
        <div className="bg-white rounded-b-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-4">
          <span className="text-xs text-stone-600 font-medium block">
            Educational credentials & school certificates:
          </span>

          <div className="space-y-3">
            {cv.education.map((edu, idx) => (
              <div key={edu.id} className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
                      className="w-full text-xs p-1.5 rounded border border-stone-300 bg-white font-bold text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">
                      Institution / School
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const newEd = [...cv.education];
                        newEd[idx].institution = e.target.value;
                        onChange({ education: newEd });
                      }}
                      className="w-full text-xs p-1.5 rounded border border-stone-300 bg-white text-stone-900"
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
                      className="w-full text-xs p-1.5 rounded border border-stone-300 bg-white text-stone-900"
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
            Languages spoken with CEFR proficiency levels (Crucial for floor instructions):
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
                      className="w-full text-xs p-1.5 rounded border border-stone-300 bg-white font-semibold text-stone-900"
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
                      className="w-full text-xs p-1.5 rounded border border-stone-300 bg-white text-stone-900"
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
                      className="w-full text-xs p-1.5 rounded border border-stone-300 bg-white font-bold text-stone-900"
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
          className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <FileCheck className="w-4 h-4" />
          <span>Save & View CV Document</span>
        </button>
      </div>
    </div>
  );
};
