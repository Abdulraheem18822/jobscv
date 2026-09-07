import React, { useState, useRef } from 'react';
import {
  Download,
  FileText,
  Printer,
  Edit3,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe2,
  Award,
  Truck,
  Briefcase,
  GraduationCap,
  Languages,
  Clock,
  Car,
  FileBadge,
  Camera,
  Upload,
  Image as ImageIcon,
  Check,
  Sparkles,
  Layers,
  Wrench,
  UserCheck,
  User,
} from 'lucide-react';
import { CandidateDetails, CvContent, CvStyle } from '../types';
import { COUNTRIES_DATA } from '../data/internationalJobData';
import { exportCvToPdf, generateVectorCvPdf } from '../utils/pdfExport';
import { DEFAULT_PASSPORT_PHOTO } from '../utils/defaultPhoto';

interface CvPreviewProps {
  details: CandidateDetails;
  cv: CvContent;
  onEditCv: () => void;
  onSwitchToCoverLetter: () => void;
  onUpdateCv?: (updated: Partial<CvContent>) => void;
  onUpdateDetails?: (updated: Partial<CandidateDetails>) => void;
}

export const CvPreview: React.FC<CvPreviewProps> = ({
  details,
  cv,
  onEditCv,
  onSwitchToCoverLetter,
  onUpdateCv,
  onUpdateDetails,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const countryInfo = COUNTRIES_DATA[details.targetCountry] || COUNTRIES_DATA.Other;
  const isSingapore = details.targetCountry === 'Singapore';
  const activeStyle: CvStyle = details.cvStyle || cv.style || 'european';

  const fileName = `${(details.fullName || 'Candidate').trim().replace(/\s+/g, '_')}_CV_${details.targetCountry}_${activeStyle}.pdf`;

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    try {
      await exportCvToPdf('cv-printable-document', fileName, details, cv, setIsExporting);
    } catch (err) {
      console.error('Failed to download CV PDF:', err);
      generateVectorCvPdf(details, cv, fileName);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadVectorPdf = () => {
    generateVectorCvPdf(details, cv, fileName);
  };

  const handlePrint = () => {
    window.print();
  };

  // Photo handling
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Photo size exceeds 5MB. Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl && onUpdateCv) {
        onUpdateCv({
          photoUrl: dataUrl,
          showPhoto: true,
          photoWhiteBackground: true,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetToDefaultPhoto = () => {
    if (onUpdateCv) {
      onUpdateCv({
        photoUrl: DEFAULT_PASSPORT_PHOTO,
        showPhoto: true,
        photoWhiteBackground: true,
      });
    }
  };

  const handleToggleShowPhoto = () => {
    if (onUpdateCv) {
      onUpdateCv({ showPhoto: !cv.showPhoto });
    }
  };

  const handleSetCvStyle = (style: CvStyle) => {
    if (onUpdateDetails) {
      onUpdateDetails({ cvStyle: style });
    }
    if (onUpdateCv) {
      onUpdateCv({ style });
    }
  };

  const handleCopyText = () => {
    const text = `CURRICULUM VITAE (${activeStyle.toUpperCase()} FORMAT)
${(details.fullName || 'CANDIDATE').toUpperCase()}
Target Position: ${details.targetJobTitle}
Target Destination: ${details.targetCountry} (${countryInfo.workPermitType})

CONTACT DETAILS:
Email: ${details.email}
Phone: ${details.phone}
Address: ${details.currentAddress ? `${details.currentAddress}, ` : ''}${details.cityCountry}
Nationality: ${details.nationality}
Marital Status: ${details.maritalStatus}
Date of Birth: ${details.dateOfBirth}
${details.fatherName ? `Father's Name: ${details.fatherName}\n` : ''}

PASSPORT & VERIFICATION:
Passport No: ${details.passport.passportNumber}
Place of Issue: ${details.passport.placeOfIssue}
Expiry Date: ${details.passport.expiryDate}
Relocation Readiness: Immediate

PROFESSIONAL SUMMARY & OBJECTIVE:
${cv.professionalSummary}

OPERATIONAL COMPETENCIES:
${cv.operationalSkills.map((s) => `• ${s}`).join('\n')}

PHYSICAL STAMINA & STRENGTHS:
${cv.personalStrengths.map((s) => `• ${s}`).join('\n')}

WORK EXPERIENCE:
${cv.experiences
  .map(
    (exp) =>
      `• ${exp.role} | ${exp.company} (${exp.location}) [${exp.startDate} - ${exp.endDate}]\n${exp.responsibilities.map((r) => `  - ${r}`).join('\n')}`
  )
  .join('\n\n')}

MATERIAL HANDLING EQUIPMENT:
${(cv.equipmentSkills || []).map((eq) => `▪ ${eq}`).join('\n')}

EDUCATION & CREDENTIALS:
${cv.education
  .map((edu) => `• ${edu.degree} | ${edu.institution}, ${edu.location} (${edu.year})`)
  .join('\n')}

LANGUAGES:
${cv.languages.map((l) => `• ${l.language}: ${l.proficiency} [${l.levelBadge}]`).join('\n')}

${cv.driverLicense ? `Driving License: ${cv.driverLicense}\n` : ''}
REFERENCES:
${cv.references || 'Available immediately upon request'}
`;

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const photoSource = cv.photoUrl || DEFAULT_PASSPORT_PHOTO;

  return (
    <div className="space-y-4">
      {/* Top Action Header Bar */}
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-stone-200 shadow-2xs no-print space-y-3">
        {/* Style Selection Banner & Headline */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xl">{countryInfo.flag}</span>
              <h2 className="text-base font-bold text-stone-900">
                Curriculum Vitae Preview ({details.targetCountry})
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                {activeStyle} Style
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                2-Page Layout
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Optimized for international logistics recruiters, agency sponsorship, and work permit verification.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Exporting PDF...' : 'Download CV (PDF)'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadVectorPdf}
              title="Download direct 2-page vector PDF - 100% sharp text for ATS systems"
              className="px-3 py-2 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-800 rounded-lg text-xs font-semibold border border-stone-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileBadge className="w-3.5 h-3.5 text-amber-700" />
              <span>ATS Vector PDF</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-2 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-700 rounded-lg text-xs font-medium border border-stone-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Print</span>
            </button>

            <button
              type="button"
              onClick={handleCopyText}
              className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-medium border border-stone-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{copiedNotification ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              type="button"
              onClick={onEditCv}
              className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-semibold border border-amber-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-700" />
              <span>Edit CV Sections</span>
            </button>
          </div>
        </div>

        {/* CV Format Switcher Tabs */}
        <div className="pt-2 border-t border-stone-200/70 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-lg text-xs">
            <span className="text-[11px] font-semibold text-stone-500 px-2">CV Format:</span>
            <button
              type="button"
              onClick={() => handleSetCvStyle('european')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                activeStyle === 'european'
                  ? 'bg-white text-stone-950 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🇪🇺</span>
              <span>European (Europass)</span>
            </button>

            <button
              type="button"
              onClick={() => handleSetCvStyle('gulf')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                activeStyle === 'gulf'
                  ? 'bg-white text-emerald-950 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🇦🇪</span>
              <span>Gulf Style (GCC)</span>
            </button>

            <button
              type="button"
              onClick={() => handleSetCvStyle('indian')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                activeStyle === 'indian'
                  ? 'bg-white text-blue-950 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🇮🇳</span>
              <span>Indian Style</span>
            </button>
          </div>

          {/* Quick Switch to Cover Letter */}
          <button
            type="button"
            onClick={onSwitchToCoverLetter}
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 underline underline-offset-2 cursor-pointer"
          >
            <span>Switch to Cover Letter View</span>
            <span>&rarr;</span>
          </button>
        </div>

        {/* Passport Photo Attachment Control Strip */}
        <div className="pt-2 border-t border-stone-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs bg-stone-50 p-2.5 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-11 bg-white border border-stone-300 rounded overflow-hidden shadow-2xs shrink-0 flex items-center justify-center">
              {cv.showPhoto !== false ? (
                <img
                  src={photoSource}
                  alt="Passport Photo"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Camera className="w-4 h-4 text-stone-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-900">White Background Passport Photo</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 font-semibold rounded">
                  Standard Spec
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                Official European embassies, Gulf consulates, and Singapore MOM require a solid white background portrait.
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
              <span>Attach Your Photo</span>
            </button>

            <button
              type="button"
              onClick={handleResetToDefaultPhoto}
              title="Use professional passport avatar with crisp white background"
              className="px-2 py-1.5 bg-white hover:bg-stone-100 text-stone-700 rounded border border-stone-300 text-xs font-medium transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 inline mr-1" />
              Default White BG
            </button>

            <button
              type="button"
              onClick={handleToggleShowPhoto}
              className={`px-2.5 py-1.5 rounded border text-xs font-semibold transition-colors cursor-pointer ${
                cv.showPhoto !== false
                  ? 'bg-amber-100/70 border-amber-300 text-amber-900'
                  : 'bg-white border-stone-300 text-stone-600'
              }`}
            >
              {cv.showPhoto !== false ? 'Photo: Shown' : 'Photo: Hidden'}
            </button>
          </div>
        </div>
      </div>

      {/* The Printable / Exportable CV Document (2 Dedicated Sheets) */}
      <div id="cv-printable-document" className="space-y-6 max-w-[850px] mx-auto text-stone-900 font-sans">
        
        {/* ======================================================== */}
        {/* SHEET 1 (PAGE 1 OF 2)                                    */}
        {/* ======================================================== */}
        <div
          id="cv-sheet-1"
          className="bg-white rounded-xl border border-stone-300 shadow-sm p-6 sm:p-9 leading-relaxed relative flex flex-col justify-between"
          style={{ minHeight: '1120px' }}
        >
          <div>
            {/* Header Bar depending on style */}
            <div className={`border-b-2 pb-4 ${
              activeStyle === 'gulf'
                ? 'border-emerald-700'
                : activeStyle === 'indian'
                ? 'border-blue-800'
                : 'border-stone-900'
            }`}>
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                {/* Left: Name, Title & Visa/Objective */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs uppercase font-bold tracking-wider ${
                      activeStyle === 'gulf'
                        ? 'text-emerald-800'
                        : activeStyle === 'indian'
                        ? 'text-blue-800'
                        : 'text-amber-700'
                    }`}>
                      {activeStyle === 'gulf'
                        ? 'Curriculum Vitae • Gulf / GCC Format'
                        : activeStyle === 'indian'
                        ? 'Professional Resume • Industrial & Corporate Format'
                        : 'Curriculum Vitae • Europass Standard'}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                      Page 1 of 2
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950 uppercase">
                    {details.fullName}
                  </h1>
                  <p className={`text-sm sm:text-base font-bold mt-0.5 ${
                    activeStyle === 'gulf'
                      ? 'text-emerald-800'
                      : activeStyle === 'indian'
                      ? 'text-blue-800'
                      : 'text-amber-800'
                  }`}>
                    {details.targetJobTitle}
                  </p>
                  <p className="text-xs font-semibold text-stone-700 mt-1">
                    {activeStyle === 'gulf' ? (
                      <>Targeting: {details.targetCountry} • GCC Sponsorship / Visa • {details.nationality}</>
                    ) : isSingapore ? (
                      <>Targeting: Singapore MOM Work Permit / S Pass • {details.nationality}</>
                    ) : (
                      <>Targeting: {details.targetCountry} Work Permit • {details.nationality}</>
                    )}
                  </p>

                  {/* Contact Info */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone-700">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="font-semibold text-stone-900">{details.email}</span>
                    </div>
                    <div>•</div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="font-semibold text-stone-900">{details.phone}</span>
                    </div>
                    <div>•</div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{details.currentAddress ? `${details.currentAddress}, ` : ''}{details.cityCountry}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Standard Passport Photo (White Background) */}
                {cv.showPhoto !== false && (
                  <div className="shrink-0 flex flex-col items-center">
                    <div
                      className={`w-24 h-32 sm:w-28 sm:h-36 rounded-sm border-2 border-stone-300 shadow-xs overflow-hidden flex items-center justify-center ${
                        cv.photoWhiteBackground !== false ? 'bg-white' : 'bg-stone-50'
                      }`}
                    >
                      <img
                        src={photoSource}
                        alt={`${details.fullName} - Passport Spec`}
                        className="w-full h-full object-cover object-top"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[9px] font-bold text-stone-500 uppercase tracking-widest mt-1">
                      35 × 45 mm Spec
                    </span>
                  </div>
                )}
              </div>

              {/* Personal Meta Strip */}
              <div className="mt-3 pt-2.5 border-t border-stone-200 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-700">
                <div>
                  <span className="text-stone-500">Nationality: </span>
                  <span className="font-semibold text-stone-900">{details.nationality}</span>
                </div>
                <div>•</div>
                <div>
                  <span className="text-stone-500">Marital Status: </span>
                  <span className="font-semibold text-stone-900">{details.maritalStatus}</span>
                </div>
                <div>•</div>
                <div>
                  <span className="text-stone-500">Date of Birth: </span>
                  <span className="font-semibold text-stone-900">{details.dateOfBirth}</span>
                </div>
                {details.fatherName && (
                  <>
                    <div>•</div>
                    <div>
                      <span className="text-stone-500">Father&apos;s Name: </span>
                      <span className="font-semibold text-stone-900">{details.fatherName}</span>
                    </div>
                  </>
                )}
                <div>•</div>
                <div>
                  <span className="text-stone-500">Visa / Permit: </span>
                  <span className="font-semibold text-emerald-800">
                    {details.gulfVisaStatus || countryInfo.workPermitType.split('(')[0].trim()}
                  </span>
                </div>
              </div>
            </div>

            {/* Verification / Gulf / Indian Box */}
            {cv.showPassportBox && (
              <div className={`mt-4 p-3 rounded-lg text-xs border ${
                activeStyle === 'gulf'
                  ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                  : activeStyle === 'indian'
                  ? 'bg-blue-50/40 border-blue-200 text-stone-800'
                  : 'bg-stone-50 border-stone-200 text-stone-800'
              }`}>
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-stone-200/80">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className={`w-4 h-4 ${
                      activeStyle === 'gulf' ? 'text-emerald-700' : activeStyle === 'indian' ? 'text-blue-700' : 'text-emerald-600'
                    }`} />
                    <span className="font-bold text-stone-900 uppercase tracking-wide text-[11px]">
                      {activeStyle === 'gulf'
                        ? 'Gulf Relocation & Passport Verification'
                        : activeStyle === 'indian'
                        ? 'Candidate Identity & Verification'
                        : isSingapore
                        ? 'Singapore MOM Work Permit Eligibility & Verification'
                        : 'European Work Permit Verification & Readiness'}
                    </span>
                  </div>
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                    activeStyle === 'gulf'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-200 text-stone-800'
                  }`}>
                    {activeStyle === 'gulf' ? 'GCC Visa Ready' : 'Verified'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-stone-800">
                  <div>
                    <span className="text-[10px] uppercase text-stone-500 block">Passport Number</span>
                    <span className="font-mono font-bold text-stone-950 text-xs">
                      {details.passport.passportNumber || 'Provided upon offer'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-stone-500 block">Place of Issue</span>
                    <span className="font-semibold text-stone-900 text-xs">
                      {details.passport.placeOfIssue || 'India'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-stone-500 block">Expiry Date</span>
                    <span className="font-semibold text-stone-900 text-xs">
                      {details.passport.expiryDate || 'Valid long-term'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-stone-500 block">
                      {activeStyle === 'gulf' ? 'Visa Status' : 'Police Clearance (PCC)'}
                    </span>
                    <span className="font-semibold text-emerald-800 text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {activeStyle === 'gulf'
                        ? details.gulfVisaStatus || 'Visit / Employment Visa'
                        : details.pccReady ? 'Ready for Embassy' : 'In process'}
                    </span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-stone-200/60 flex flex-wrap items-center gap-3 text-[11px] text-stone-600">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-amber-600" />
                    <strong>Availability:</strong> Immediate upon visa/offer issuance
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-amber-600" />
                    <strong>Shift Flexibility:</strong> {details.shiftPreference}
                  </span>
                </div>
              </div>
            )}

            {/* Section 1: Professional Profile & Career Objective */}
            <div className="mt-4">
              <div className="flex items-center gap-2 border-b border-stone-200 pb-1 mb-2">
                <Briefcase className={`w-4 h-4 ${
                  activeStyle === 'gulf' ? 'text-emerald-700' : activeStyle === 'indian' ? 'text-blue-700' : 'text-amber-700'
                }`} />
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-950">
                  {activeStyle === 'indian'
                    ? 'Career Objective & Professional Summary'
                    : activeStyle === 'gulf'
                    ? 'Professional Profile & Gulf Employment Objective'
                    : 'Professional Profile & International Relocation Objective'}
                </h2>
              </div>
              <p className="text-xs sm:text-[13px] text-stone-800 leading-relaxed text-justify">
                {cv.professionalSummary}
              </p>
            </div>

            {/* Section 2: Operational Skills & Workplace Capabilities */}
            <div className="mt-4">
              <div className="flex items-center gap-2 border-b border-stone-200 pb-1 mb-2">
                <Award className={`w-4 h-4 ${
                  activeStyle === 'gulf' ? 'text-emerald-700' : activeStyle === 'indian' ? 'text-blue-700' : 'text-amber-700'
                }`} />
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-950">
                  Operational Competencies & Capabilities
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide block">
                    Warehouse, Logistics & Handling:
                  </span>
                  <ul className="space-y-1 text-stone-800">
                    {cv.operationalSkills.map((skill, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide block">
                    Work Ethic & Physical Stamina:
                  </span>
                  <ul className="space-y-1 text-stone-800">
                    {cv.personalStrengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          activeStyle === 'gulf' ? 'text-emerald-600' : 'text-amber-600'
                        }`} />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3: Professional Work Experience (Core Roles) */}
            {cv.experiences && cv.experiences.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center gap-2 border-b border-stone-200 pb-1 mb-2">
                  <Truck className={`w-4 h-4 ${
                    activeStyle === 'gulf' ? 'text-emerald-700' : activeStyle === 'indian' ? 'text-blue-700' : 'text-amber-700'
                  }`} />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-stone-950">
                    Work Experience (Primary Positions)
                  </h2>
                </div>

                <div className="space-y-3">
                  {cv.experiences.slice(0, 2).map((exp) => (
                    <div key={exp.id} className="text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <span className="font-bold text-stone-950 text-[13px]">
                          {exp.role}
                        </span>
                        <span className="text-[11px] font-semibold text-stone-500">
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </div>
                      <div className={`font-medium text-xs mt-0.5 ${
                        activeStyle === 'gulf'
                          ? 'text-emerald-800'
                          : activeStyle === 'indian'
                          ? 'text-blue-800'
                          : 'text-amber-800'
                      }`}>
                        {exp.company} • {exp.location}
                      </div>

                      <ul className="mt-1 space-y-0.5 text-stone-700 text-xs">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-stone-400 font-bold shrink-0 mt-0.5">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Page 1 Footer */}
          <div className="mt-6 pt-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
            <span>Curriculum Vitae — {details.fullName}</span>
            <span className="capitalize">{activeStyle} Standard Format</span>
            <span className="font-bold text-stone-800">Page 1 of 2</span>
          </div>
        </div>

        {/* Page Break Visual Divider */}
        <div className="my-6 border-t-2 border-dashed border-stone-300 relative flex items-center justify-center no-print">
          <span className="bg-stone-100 text-stone-600 text-xs font-semibold px-4 py-1.5 rounded-full border border-stone-300 shadow-2xs flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-amber-700" />
            Page Break — Page 2 of 2 Below
          </span>
        </div>

        {/* ======================================================== */}
        {/* SHEET 2 (PAGE 2 OF 2)                                    */}
        {/* ======================================================== */}
        <div
          id="cv-sheet-2"
          className="bg-white rounded-xl border border-stone-300 shadow-sm p-6 sm:p-9 leading-relaxed relative flex flex-col justify-between"
          style={{ minHeight: '1120px' }}
        >
          <div>
            {/* Running Header on Page 2 */}
            <div className="border-b border-stone-300 pb-2.5 mb-4 flex items-center justify-between text-xs text-stone-600">
              <div>
                <span className="font-extrabold text-stone-900 uppercase tracking-wide">
                  {details.fullName}
                </span>
                <span className="mx-2 text-stone-400">|</span>
                <span className="capitalize">{activeStyle} Standard CV</span>
                <span className="mx-2 text-stone-400">|</span>
                <span className="text-amber-800 font-medium">Target: {details.targetJobTitle}</span>
              </div>
              <span className="font-bold text-stone-800 uppercase px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-[10px]">
                Page 2 of 2
              </span>
            </div>

            {/* Section 4: Earlier Professional Experience */}
            {cv.experiences && cv.experiences.length > 2 && (
              <div>
                <div className="flex items-center gap-2 border-b border-stone-200 pb-1 mb-2">
                  <Truck className={`w-4 h-4 ${
                    activeStyle === 'gulf' ? 'text-emerald-700' : activeStyle === 'indian' ? 'text-blue-700' : 'text-amber-700'
                  }`} />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-stone-950">
                    Additional Experience & Operations
                  </h2>
                </div>

                <div className="space-y-3">
                  {cv.experiences.slice(2).map((exp) => (
                    <div key={exp.id} className="text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <span className="font-bold text-stone-950 text-[13px]">
                          {exp.role}
                        </span>
                        <span className="text-[11px] font-semibold text-stone-500">
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </div>
                      <div className="text-stone-600 font-medium text-xs mt-0.5">
                        {exp.company} • {exp.location}
                      </div>

                      <ul className="mt-1 space-y-0.5 text-stone-700 text-xs">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-stone-400 font-bold shrink-0 mt-0.5">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 5: Material Handling Equipment & Technical Tools */}
            <div className="mt-4">
              <div className="flex items-center gap-2 border-b border-stone-200 pb-1 mb-2">
                <Wrench className={`w-4 h-4 ${
                  activeStyle === 'gulf' ? 'text-emerald-700' : activeStyle === 'indian' ? 'text-blue-700' : 'text-amber-700'
                }`} />
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-950">
                  Material Handling Equipment & Technical Systems
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(cv.equipmentSkills || [
                  'Manual Hydraulic Pallet Jacks (up to 2500 kg capacity)',
                  'Semi-Electric Powered Pallet Trucks (PPT)',
                  'Handheld RF Barcode & QR Scanners (Zebra / Honeywell)',
                  'Heavy-Duty Stretch Film Dispensers & Banding Tools',
                  'Hydraulic Dock Levelers & Container Offloading Ramps',
                  'Industrial Digital Weighing Platforms & Parcel Cubing Systems',
                ]).map((eq, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-stone-800">
                    <span className="text-amber-700 font-bold text-xs mt-0.5">▪</span>
                    <span>{eq}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6: Workplace Health, Safety & Endurance */}
            <div className="mt-4 p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs">
              <div className="flex items-center gap-1.5 pb-1.5 mb-1.5 border-b border-stone-200">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <h3 className="font-bold text-stone-900 uppercase tracking-wide text-[11px]">
                  Workplace Health, Safety & Physical Endurance Declaration
                </h3>
              </div>

              <div className="space-y-1 text-stone-700 text-[11.5px]">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Physical Stamina:</strong> Proven capability for sustained 8 to 12-hour continuous standing and active walking shifts in logistics facilities.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Safe Ergonomic Lifting:</strong> Trained in correct posture and knee-lift techniques for repetitive parcel handling up to 25 kg.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>5S & Housekeeping:</strong> Strict adherence to clear staging lanes, zero tripping hazards, and neat bin organization.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>PPE Protocols:</strong> 100% compliance with steel-toe safety footwear, high-visibility vest, grip gloves, and protective headwear.</span>
                </div>
              </div>
            </div>

            {/* Section 7: Education & Formal Training */}
            {cv.education && cv.education.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center gap-2 border-b border-stone-200 pb-1 mb-2">
                  <GraduationCap className={`w-4 h-4 ${
                    activeStyle === 'gulf' ? 'text-emerald-700' : activeStyle === 'indian' ? 'text-blue-700' : 'text-amber-700'
                  }`} />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-stone-950">
                    Education & Vocational Credentials
                  </h2>
                </div>

                <div className="space-y-2 text-xs">
                  {cv.education.map((edu) => (
                    <div key={edu.id} className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <span className="font-bold text-stone-900 block">{edu.degree}</span>
                        <span className="text-stone-600">
                          {edu.institution}, {edu.location}
                          {edu.details ? ` — ${edu.details}` : ''}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500 font-medium">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 8: Languages & Driving Credentials */}
            <div className="mt-4">
              <div className="flex items-center gap-2 border-b border-stone-200 pb-1 mb-2">
                <Languages className={`w-4 h-4 ${
                  activeStyle === 'gulf' ? 'text-emerald-700' : activeStyle === 'indian' ? 'text-blue-700' : 'text-amber-700'
                }`} />
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-950">
                  Languages & Driving Credentials
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  {cv.languages.map((lang) => (
                    <div key={lang.id} className="flex items-center justify-between border-b border-stone-100 pb-0.5">
                      <span className="font-semibold text-stone-900">{lang.language}</span>
                      <div className="text-right">
                        <span className="text-[11px] text-stone-600 mr-2">{lang.proficiency}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          activeStyle === 'gulf'
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-amber-100 text-amber-900 border border-amber-200'
                        }`}>
                          {lang.levelBadge}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  {cv.driverLicense && (
                    <div className="p-2 bg-stone-50 rounded border border-stone-200 flex items-start gap-2">
                      <Car className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-stone-900 block">Driving License</span>
                        <span className="text-[11px] text-stone-600">{cv.driverLicense}</span>
                      </div>
                    </div>
                  )}

                  {cv.certifications && cv.certifications.length > 0 && (
                    <div className="p-2 bg-stone-50 rounded border border-stone-200">
                      <span className="font-semibold text-stone-900 block mb-1">
                        Safety & Operational Certifications:
                      </span>
                      <ul className="text-[11px] text-stone-700 space-y-0.5">
                        {cv.certifications.map((c, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <span className="text-amber-700 font-bold">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 9: References */}
            <div className="mt-4">
              <div className="flex items-center gap-2 border-b border-stone-200 pb-1 mb-1.5">
                <UserCheck className="w-4 h-4 text-stone-700" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-950">
                  Professional References
                </h2>
              </div>
              <p className="text-xs text-stone-700 italic">
                {cv.references || 'Professional and supervisory references from former warehouse managers and logistics coordinators available immediately upon request.'}
              </p>
            </div>

            {/* Section 10: Legal Declaration / GDPR / Indian Declaration */}
            <div className="mt-4 pt-3 border-t border-stone-200 text-[10px] text-stone-500 leading-relaxed">
              {activeStyle === 'indian' ? (
                <div className="space-y-2">
                  <p className="font-semibold text-stone-700 uppercase tracking-wide">Legal Declaration:</p>
                  <p className="italic text-justify">
                    &ldquo;I hereby declare that all the particulars and information stated above are true, complete, and correct to the best of my knowledge and belief.&rdquo;
                  </p>
                  <div className="pt-3 flex items-center justify-between text-stone-700 font-medium text-xs">
                    <div>
                      <p><strong>Place:</strong> {details.cityCountry || 'India'}</p>
                      <p><strong>Date:</strong> {details.date || new Date().toLocaleDateString('en-GB')}</p>
                    </div>
                    <div className="text-right">
                      <div className="w-32 border-b border-stone-400 mb-1"></div>
                      <p><strong>({details.fullName})</strong></p>
                      <p className="text-[10px] text-stone-500">Applicant Signature</p>
                    </div>
                  </div>
                </div>
              ) : activeStyle === 'gulf' ? (
                <div className="space-y-1">
                  <p className="font-semibold text-stone-700 uppercase tracking-wide">
                    Gulf Employment & Sponsorship Declaration:
                  </p>
                  <p className="italic text-justify">
                    {cv.gulfDeclaration ||
                      `I confirm that all statements made in this Curriculum Vitae are true and accurate. I hold a valid passport, have zero legal travel impediments, and am prepared to undergo GCC Approved Medical Centres Association (GAMCA) medical tests and relocate immediately upon visa issuance.`}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-stone-700 font-medium">
                    <span>Candidate: <strong>{details.fullName}</strong></span>
                    <span>Target: <strong>{details.targetCountry} Logistics & Warehousing</strong></span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="font-semibold text-stone-700 mb-0.5">
                    {countryInfo.gdprTitle || (isSingapore ? 'Singapore Personal Data Protection Act (PDPA 2012) Declaration' : 'Data Protection & Consent Declaration (EU 2016/679)')}:
                  </p>
                  <p className="italic text-justify">{cv.gdprClause}</p>
                  <div className="mt-2 flex items-center justify-between text-stone-700 font-medium">
                    <span>Candidate: <strong>{details.fullName}</strong></span>
                    <span>Readiness: <strong>Ready for Work Permit Processing</strong></span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Page 2 Footer */}
          <div className="mt-6 pt-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
            <span>Curriculum Vitae — {details.fullName}</span>
            <span className="capitalize">{activeStyle} Standard Format</span>
            <span className="font-bold text-stone-800">Page 2 of 2</span>
          </div>
        </div>

      </div>
    </div>
  );
};
