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
} from 'lucide-react';
import { CandidateDetails, CvContent } from '../types';
import { COUNTRIES_DATA } from '../data/internationalJobData';
import { exportCvToPdf, generateVectorCvPdf } from '../utils/pdfExport';
import { DEFAULT_PASSPORT_PHOTO } from '../utils/defaultPhoto';

interface CvPreviewProps {
  details: CandidateDetails;
  cv: CvContent;
  onEditCv: () => void;
  onSwitchToCoverLetter: () => void;
  onUpdateCv?: (updated: Partial<CvContent>) => void;
}

export const CvPreview: React.FC<CvPreviewProps> = ({
  details,
  cv,
  onEditCv,
  onSwitchToCoverLetter,
  onUpdateCv,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const countryInfo = COUNTRIES_DATA[details.targetCountry] || COUNTRIES_DATA.Other;
  const isSingapore = details.targetCountry === 'Singapore';
  const fileName = `${details.fullName.replace(/\s+/g, '_')}_CV_${details.targetCountry}_${details.jobCategory}.pdf`;

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

    // Check size limit (max 5MB)
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

  const handleToggleWhiteBg = () => {
    if (onUpdateCv) {
      onUpdateCv({ photoWhiteBackground: !cv.photoWhiteBackground });
    }
  };

  const handleCopyText = () => {
    const text = `CURRICULUM VITAE (EUROPASS STANDARD FORMAT - 2 PAGES)
${details.fullName.toUpperCase()}
Target Position: ${details.targetJobTitle}
Target Destination: ${details.targetCountry} (${countryInfo.workPermitType})

=== PAGE 1 ===
CONTACT DETAILS:
Email: ${details.email}
Phone: ${details.phone}
Address: ${details.currentAddress ? `${details.currentAddress}, ` : ''}${details.cityCountry}
Nationality: ${details.nationality}
Marital Status: ${details.maritalStatus}
Date of Birth: ${details.dateOfBirth}

PASSPORT & WORK PERMIT VERIFICATION:
Passport No: ${details.passport.passportNumber}
Place of Issue: ${details.passport.placeOfIssue}
Expiry Date: ${details.passport.expiryDate}
Police Clearance (PCC): ${details.pccReady ? 'Ready & Verified' : 'In process'}
Relocation Readiness: Immediate upon visa approval
Shift Availability: 8 to 12-hour shifts, night rotations, weekend overtime

PROFESSIONAL SUMMARY & OBJECTIVE:
${cv.professionalSummary}

OPERATIONAL COMPETENCIES:
${cv.operationalSkills.map((s) => `• ${s}`).join('\n')}

PHYSICAL STAMINA & WORK ETHIC:
${cv.personalStrengths.map((s) => `• ${s}`).join('\n')}

PRIMARY WORK EXPERIENCE:
${cv.experiences
  .slice(0, 2)
  .map(
    (exp) =>
      `• ${exp.role} | ${exp.company} (${exp.location}) [${exp.startDate} - ${exp.endDate}]\n${exp.responsibilities.map((r) => `  - ${r}`).join('\n')}`
  )
  .join('\n\n')}

=== PAGE 2 ===
EARLIER WORK EXPERIENCE:
${cv.experiences
  .slice(2)
  .map(
    (exp) =>
      `• ${exp.role} | ${exp.company} (${exp.location}) [${exp.startDate} - ${exp.endDate}]\n${exp.responsibilities.map((r) => `  - ${r}`).join('\n')}`
  )
  .join('\n\n')}

MATERIAL HANDLING EQUIPMENT & INDUSTRIAL TOOLS:
${(cv.equipmentSkills || []).map((eq) => `▪ ${eq}`).join('\n')}

WORKPLACE SAFETY & PHYSICAL ENDURANCE:
• Sustained 8 to 12-hour continuous standing and walking shifts.
• Safe ergonomic manual lifting of up to 25 kg.
• Full compliance with 5S warehouse standards and safety PPE.

EDUCATION & VOCATIONAL CREDENTIALS:
${cv.education
  .map((edu) => `• ${edu.degree} | ${edu.institution}, ${edu.location} (${edu.year})\n  ${edu.details || ''}`)
  .join('\n')}

LANGUAGES (CEFR PROFICIENCY):
${cv.languages.map((l) => `• ${l.language}: ${l.proficiency} [${l.levelBadge}]`).join('\n')}

LICENSES & CERTIFICATIONS:
${cv.driverLicense ? `• Driving License: ${cv.driverLicense}\n` : ''}${cv.certifications.map((c) => `• ${c}`).join('\n')}

REFERENCES:
${cv.references || 'Available immediately upon request'}

STATUTORY DATA PROTECTION DECLARATION:
${cv.gdprClause}
`;

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const photoSource = cv.photoUrl || DEFAULT_PASSPORT_PHOTO;

  return (
    <div className="space-y-4">
      {/* Top Action Header Bar */}
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-stone-200 shadow-2xs no-print">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xl">{countryInfo.flag}</span>
              <h2 className="text-base font-bold text-stone-900">
                European Standard CV ({details.targetCountry})
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                2-Page Europass Layout
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                Passport Photo Ready
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Structured across two full pages for European and Singapore logistics recruiters with passport verification and white background photo options.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="flex-1 sm:flex-none px-4 py-2 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Exporting PDF...' : 'Download CV (PDF)'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadVectorPdf}
              title="Download direct 2-page vector PDF - guaranteed 100% sharp text for ATS systems"
              className="px-3 py-2 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-800 rounded-lg text-xs font-semibold border border-stone-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <FileBadge className="w-3.5 h-3.5 text-amber-700" />
              <span>ATS Vector PDF (2 Pages)</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-2 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-700 rounded-lg text-xs font-medium border border-stone-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Print</span>
            </button>

            <button
              type="button"
              onClick={handleCopyText}
              className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-medium border border-stone-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{copiedNotification ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              type="button"
              onClick={onEditCv}
              className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-semibold border border-amber-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit CV</span>
            </button>
          </div>
        </div>

        {/* Passport Photo Attachment Control Strip */}
        <div className="mt-3 pt-3 border-t border-stone-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs bg-stone-50 p-2.5 rounded-lg">
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
                  EU & Singapore Spec
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                European employers and Singapore agents require a clean portrait with solid white background.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Hidden file input */}
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
              <span>Attach Your Photo</span>
            </button>

            <button
              type="button"
              onClick={handleResetToDefaultPhoto}
              title="Use professional passport avatar with crisp white background"
              className="px-2 py-1.5 bg-white hover:bg-stone-100 text-stone-700 rounded border border-stone-300 text-xs font-medium transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 inline mr-1" />
              Default White BG
            </button>

            <button
              type="button"
              onClick={handleToggleShowPhoto}
              className={`px-2.5 py-1.5 rounded border text-xs font-semibold transition-colors ${
                cv.showPhoto !== false
                  ? 'bg-amber-100/70 border-amber-300 text-amber-900'
                  : 'bg-white border-stone-300 text-stone-600'
              }`}
            >
              {cv.showPhoto !== false ? 'Photo: Shown' : 'Photo: Hidden'}
            </button>
          </div>
        </div>

        {/* Quick Mode Switcher Banner */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-stone-600">
            Applying with both documents? Switch seamlessly:
          </span>
          <button
            type="button"
            onClick={onSwitchToCoverLetter}
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 underline underline-offset-2"
          >
            <span>Switch to Cover Letter View</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>

      {/* The Printable / Exportable European Standard CV Document (2 Dedicated Sheets) */}
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
            {/* Top European Header Bar with Photo */}
            <div className="border-b-2 border-stone-900 pb-4">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                {/* Left: Name, Title & Visa Request */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs uppercase font-bold tracking-wider text-amber-700">
                      Curriculum Vitae • Europass Standard
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                      Page 1 of 2
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950 uppercase">
                    {details.fullName}
                  </h1>
                  <p className="text-sm sm:text-base font-bold text-amber-800 mt-0.5">
                    {details.targetJobTitle}
                  </p>
                  <p className="text-xs font-semibold text-stone-700 mt-1">
                    {isSingapore ? (
                      <>Targeting: Singapore MOM Work Permit / S Pass • Indian Citizen (NTS Worker)</>
                    ) : (
                      <>Targeting: {details.targetCountry} European Work Permit • Indian Citizen (Non-EU)</>
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

                {/* Right: European Standard Passport Photo (White Background) */}
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
                      35 × 45 mm EU Spec
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
                <div>•</div>
                <div>
                  <span className="text-stone-500">Visa Request: </span>
                  <span className="font-semibold text-emerald-800">{countryInfo.workPermitType.split('(')[0].trim()}</span>
                </div>
              </div>
            </div>

            {/* Passport & Work Permit Eligibility Box (Crucial for Non-EU Applicants) */}
            {cv.showPassportBox && (
              <div className="mt-4 p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs">
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-stone-900 uppercase tracking-wide text-[11px]">
                      {isSingapore
                        ? 'Singapore MOM Work Permit Eligibility & Verification'
                        : 'European Work Permit Verification & Readiness'}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    Documents Verified
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
                    <span className="text-[10px] uppercase text-stone-500 block">Police Clearance (PCC)</span>
                    <span className="font-semibold text-emerald-800 text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {details.pccReady ? 'Ready for Embassy' : 'In process'}
                    </span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-stone-200/60 flex flex-wrap items-center gap-3 text-[11px] text-stone-600">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-amber-600" />
                    <strong>Relocation Availability:</strong> Immediate upon visa approval
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-amber-600" />
                    <strong>Shift Availability:</strong> {details.shiftPreference}
                  </span>
                </div>
              </div>
            )}

            {/* Section 1: Professional Profile & Relocation Objective */}
            <div className="mt-4">
              <div className="flex items-center gap-2 border-b border-stone-200 pb-1 mb-2">
                <Briefcase className="w-4 h-4 text-amber-700" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-950">
                  Professional Profile & International Relocation Objective
                </h2>
              </div>
              <p className="text-xs sm:text-[13px] text-stone-800 leading-relaxed text-justify">
                {cv.professionalSummary}
              </p>
            </div>

            {/* Section 2: Operational Skills & Workplace Capabilities */}
            <div className="mt-4">
              <div className="flex items-center gap-2 border-b border-stone-200 pb-1 mb-2">
                <Award className="w-4 h-4 text-amber-700" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-950">
                  Operational Skills & Workplace Capabilities
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide block">
                    Warehouse & Logistics Operations:
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
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
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
                  <Truck className="w-4 h-4 text-amber-700" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-stone-950">
                    Professional Work Experience (Core Roles)
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
                      <div className="text-amber-800 font-medium text-xs mt-0.5">
                        {exp.company} • {exp.location}
                      </div>

                      <ul className="mt-1 space-y-0.5 text-stone-700 text-xs">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-700 font-bold shrink-0 mt-0.5">•</span>
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
            <span>European Standard Format (Europass)</span>
            <span className="font-bold text-stone-800">Page 1 of 2</span>
          </div>
        </div>

        {/* Page Break Visual Divider */}
        <div className="my-6 border-t-2 border-dashed border-stone-300 relative flex items-center justify-center no-print">
          <span className="bg-stone-100 text-stone-600 text-xs font-semibold px-4 py-1.5 rounded-full border border-stone-300 shadow-2xs flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-amber-700" />
            European Standard Page Break — Page 2 of 2 Below
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
                <span>Curriculum Vitae (Europass Format)</span>
                <span className="mx-2 text-stone-400">|</span>
                <span className="text-amber-800 font-medium">Target: {details.targetJobTitle}</span>
              </div>
              <span className="font-bold text-stone-800 uppercase px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-[10px]">
                Page 2 of 2
              </span>
            </div>

            {/* Section 4: Earlier Professional Experience & Depot Operations */}
            {cv.experiences && cv.experiences.length > 2 && (
              <div>
                <div className="flex items-center gap-2 border-b border-stone-200 pb-1 mb-2">
                  <Truck className="w-4 h-4 text-amber-700" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-stone-950">
                    Earlier Professional Experience & Depot Operations
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
                      <div className="text-amber-800 font-medium text-xs mt-0.5">
                        {exp.company} • {exp.location}
                      </div>

                      <ul className="mt-1 space-y-0.5 text-stone-700 text-xs">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-700 font-bold shrink-0 mt-0.5">•</span>
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
                <Wrench className="w-4 h-4 text-amber-700" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-950">
                  Material Handling Equipment & Industrial Systems
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(cv.equipmentSkills || [
                  'Manual Hydraulic Pallet Jacks (up to 2500 kg capacity)',
                  'Semi-Electric Powered Pallet Trucks (PPT)',
                  'Handheld RF Barcode & QR Scanners (Zebra / Honeywell)',
                  'Heavy-Duty Stretch Film Dispensers & Banding Tools',
                  'Hydraulic Dock Levelers & Container Unloading Ramps',
                  'Industrial Digital Weighing Platforms & Parcel Cubing Systems',
                ]).map((eq, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-stone-800">
                    <span className="text-amber-700 font-bold text-xs mt-0.5">▪</span>
                    <span>{eq}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6: Workplace Health, Safety & Physical Endurance Declaration */}
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
                  <span><strong>Physical Stamina:</strong> Proven capability for sustained 8 to 12-hour continuous standing and active walking shifts in logistics hubs.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Safe Ergonomic Lifting:</strong> Trained in correct knee-bend and posture techniques for repetitive parcel handling up to 25 kg.</span>
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
                  <GraduationCap className="w-4 h-4 text-amber-700" />
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

            {/* Section 8: Languages (CEFR Framework) & Licenses */}
            <div className="mt-4">
              <div className="flex items-center gap-2 border-b border-stone-200 pb-1 mb-2">
                <Languages className="w-4 h-4 text-amber-700" />
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
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
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

            {/* Section 9: Professional References */}
            <div className="mt-4">
              <div className="flex items-center gap-2 border-b border-stone-200 pb-1 mb-1.5">
                <UserCheck className="w-4 h-4 text-amber-700" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-950">
                  Professional References
                </h2>
              </div>
              <p className="text-xs text-stone-700 italic">
                {cv.references || 'Professional and supervisory references from former warehouse managers and logistics coordinators available immediately upon request.'}
              </p>
            </div>

            {/* Section 10: European GDPR / Singapore PDPA Consent Declaration */}
            {cv.gdprClause && (
              <div className="mt-4 pt-3 border-t border-stone-200 text-[10px] text-stone-500 leading-relaxed">
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

          {/* Page 2 Footer */}
          <div className="mt-6 pt-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
            <span>Curriculum Vitae — {details.fullName}</span>
            <span>European Standard Format (Europass)</span>
            <span className="font-bold text-stone-800">Page 2 of 2</span>
          </div>
        </div>

      </div>
    </div>
  );
};
