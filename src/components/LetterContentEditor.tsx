import React, { useState } from 'react';
import {
  FileEdit,
  Sparkles,
  RefreshCw,
  Sliders,
  Check,
  AlertCircle,
  Wand2,
  BookOpen,
  ArrowRightLeft,
  Minimize2,
  Layers,
  Globe2,
} from 'lucide-react';
import { CandidateDetails, JobCategory, LetterContent, TargetCountry } from '../types';
import { COUNTRIES_DATA, generateCoverLetterContent } from '../data/internationalJobData';

interface LetterContentEditorProps {
  content: LetterContent;
  details: CandidateDetails;
  onChange: (updated: Partial<LetterContent>) => void;
  onResetToDefault: () => void;
  onNavigateToLetterView: () => void;
}

export const LetterContentEditor: React.FC<LetterContentEditorProps> = ({
  content,
  details,
  onChange,
  onResetToDefault,
  onNavigateToLetterView,
}) => {
  const [activeSection, setActiveSection] = useState<keyof LetterContent | 'all'>('paragraph1_intro');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const sections: {
    key: keyof LetterContent;
    title: string;
    description: string;
    suggestions: string[];
  }[] = [
    {
      key: 'salutation',
      title: 'Salutation',
      description: 'Formal address to the employer / recruitment team',
      suggestions: [
        `Dear Hiring Manager / Recruitment Team in ${details.targetCountry},`,
        `Dear Human Resources & Logistics Staffing Team,`,
        `To the Recruitment & Work Permit Processing Committee,`,
      ],
    },
    {
      key: 'paragraph1_intro',
      title: 'Opening & Job Application',
      description: 'Clear statement of job title, destination country, and strong motivation',
      suggestions: [
        `I am writing to express my strong interest in the ${details.targetJobTitle} position in ${details.targetCountry}. With a solid work ethic and dedicated attitude from India, I am eager to contribute immediately to your operational facility.`,
        `Please accept this letter as my enthusiastic application for the ${details.targetJobTitle} opening in ${details.targetCountry}. I offer high physical energy, extreme punctuality, and a strong commitment to team productivity.`,
      ],
    },
    {
      key: 'paragraph2_experience',
      title: 'Physical Stamina & Daily Duties',
      description: 'Highlighting ability to stand for long shifts, heavy lifting up to 25kg, and manual accuracy',
      suggestions: [
        `I possess great physical stamina and am accustomed to active manual labor throughout 8- to 12-hour shifts. I handle heavy parcel lifting up to 25 kg in strict adherence to ergonomic posture, rapid barcode scanning, and organized pallet packing.`,
        `Having practiced disciplined manual work, I thrive on my feet during busy shifts. I am proficient in unloading containers, stacking pallets securely, sorting goods by manifest, and maintaining speed without compromising quality.`,
      ],
    },
    {
      key: 'paragraph3_skills_safety',
      title: 'Workplace Safety & Teamwork',
      description: 'PPE compliance, 5S standards, RF scanners, and clear English communication',
      suggestions: [
        `Safety is my top priority in any warehouse or work site. I strictly wear all required PPE, follow 5S cleanliness, and handle warehouse equipment with caution. I work cooperatively in multicultural teams and communicate clearly in English.`,
        `I am highly disciplined regarding occupational health and safety regulations. I adapt rapidly to digital scanner devices, respect supervisor guidance, and treat co-workers with respect while maintaining a tidy, hazard-free work bay.`,
      ],
    },
    {
      key: 'paragraph4_eligibility_shifts',
      title: 'Work Permit, Passport & Shift Availability',
      description: 'Indian citizenship, unmarried flexibility for overtime/night shifts, valid passport & PCC',
      suggestions: [
        `As an Indian citizen, I am seeking an employer-sponsored work permit for ${details.targetCountry}. I am unmarried with zero family encumbrances, granting me complete flexibility for rotational night shifts and overtime. My passport is valid with clean police clearance (PCC) ready.`,
        `I require work authorization sponsorship in ${details.targetCountry} and have all prerequisites prepared, including a valid Indian passport, police clearance certificate, and certified medical fitness. As a single individual, I can dedicate my full attention to meeting your production schedule.`,
      ],
    },
    {
      key: 'paragraph5_closing',
      title: 'Closing & Interview Readiness',
      description: 'Readiness to relocate immediately and eager availability for an interview',
      suggestions: [
        `I am prepared to complete consular visa formalities and relocate to ${details.targetCountry} promptly. Thank you for your time and review. I welcome the opportunity to discuss my application in an interview.`,
        `I look forward to speaking with your recruitment team and demonstrating how my energy and dependability will serve your team in ${details.targetCountry}. Thank you for your consideration.`,
      ],
    },
    {
      key: 'signOff',
      title: 'Sign-Off',
      description: 'Formal closing salutation',
      suggestions: ['Yours sincerely,', 'Respectfully yours,', 'Sincerely,', 'Yours faithfully,'],
    },
  ];

  const handleApplySuggestion = (key: keyof LetterContent, text: string) => {
    onChange({ [key]: text });
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Overview Card */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{COUNTRIES_DATA[details.targetCountry].flag}</span>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Letter Customizer: {details.targetCountry}
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Role: <span className="text-amber-700 font-semibold">{details.targetJobTitle}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onResetToDefault}
            className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            title="Reset paragraphs to default preset"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Preset</span>
          </button>
        </div>
      </div>

      {/* Section Quick Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {sections.map((sec) => (
          <button
            key={sec.key}
            type="button"
            onClick={() => setActiveSection(sec.key)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSection === sec.key
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {sec.title}
          </button>
        ))}
      </div>

      {/* Editor Cards */}
      <div className="space-y-4">
        {sections
          .filter((sec) => activeSection === 'all' || activeSection === sec.key)
          .map((sec) => {
            const val = content[sec.key];
            const isTextarea = sec.key !== 'salutation' && sec.key !== 'signOff';

            return (
              <div
                key={sec.key}
                className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <FileEdit className="w-3.5 h-3.5 text-amber-600" />
                      <span>{sec.title}</span>
                    </h4>
                    <p className="text-[11px] text-stone-500">{sec.description}</p>
                  </div>
                </div>

                {isTextarea ? (
                  <textarea
                    rows={4}
                    value={val}
                    onChange={(e) => onChange({ [sec.key]: e.target.value })}
                    className="w-full p-3 text-xs sm:text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-800 leading-relaxed resize-y"
                  />
                ) : (
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => onChange({ [sec.key]: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-800 font-medium"
                  />
                )}

                {/* Suggestions / Alternative phrasings */}
                {sec.suggestions && sec.suggestions.length > 0 && (
                  <div className="pt-2 border-t border-stone-100">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-amber-600" />
                      <span>Quick Alternative Templates (Click to apply)</span>
                    </p>
                    <div className="space-y-1.5">
                      {sec.suggestions.map((sugg, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleApplySuggestion(sec.key, sugg)}
                          className="w-full text-left p-2 rounded-lg bg-stone-50 hover:bg-amber-50/70 border border-stone-200/80 hover:border-amber-300 text-[11px] text-stone-700 leading-snug transition-colors flex items-start gap-2 group cursor-pointer"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover:bg-amber-500 mt-1 shrink-0"></span>
                          <span className="flex-1">{sugg}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Button to navigate to Letter View */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onNavigateToLetterView}
          className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>View Printable Letter & Download PDF</span>
        </button>
      </div>
    </div>
  );
};
