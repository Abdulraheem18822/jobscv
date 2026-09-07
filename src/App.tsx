import React, { useState, useEffect } from 'react';
import {
  CandidateDetails,
  JobCategory,
  LetterContent,
  TargetCountry,
  CvContent,
} from './types';
import {
  INITIAL_CANDIDATE_DETAILS,
  JOB_CATEGORIES,
  COUNTRIES_DATA,
  generateCoverLetterContent,
  generateCvContent,
} from './data/internationalJobData';
import { Header } from './components/Header';
import { DetailsEditor } from './components/DetailsEditor';
import { LetterContentEditor } from './components/LetterContentEditor';
import { CoverLetterPreview } from './components/CoverLetterPreview';
import { CvEditor } from './components/CvEditor';
import { CvPreview } from './components/CvPreview';
import { CountryWorkPermitDrawer } from './components/CountryWorkPermitDrawer';
import { exportCoverLetterToPdf, exportCvToPdf } from './utils/pdfExport';
import {
  UserCheck,
  FileText,
  HelpCircle,
  Sparkles,
  CheckCircle,
  Building,
  RotateCcw,
  Globe2,
  Briefcase,
  ShieldCheck,
  CreditCard,
  Download,
  Eye,
  Settings,
  Layers,
} from 'lucide-react';

export default function App() {
  const [details, setDetails] = useState<CandidateDetails>(() => {
    const saved = localStorage.getItem('intl_cl_candidate_details');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure name, maritalStatus, nationality, and email stay fixed as requested
        return {
          ...INITIAL_CANDIDATE_DETAILS,
          ...parsed,
          fullName: 'Abdul Raheem',
          email: 'abdulraheem18822@gmail.com',
          nationality: 'Indian Citizen (Non-EU)',
          maritalStatus: 'Unmarried (Single)',
          passport: {
            ...INITIAL_CANDIDATE_DETAILS.passport,
            ...(parsed.passport || {}),
          },
        };
      } catch (e) {
        console.error('Error loading saved details', e);
      }
    }
    return INITIAL_CANDIDATE_DETAILS;
  });

  const [content, setContent] = useState<LetterContent>(() => {
    return generateCoverLetterContent(
      details.jobCategory,
      details.targetCountry,
      details
    );
  });

  const [cv, setCv] = useState<CvContent>(() => {
    const defaultCv = generateCvContent(details.jobCategory, details.targetCountry, details);
    const saved = localStorage.getItem('intl_cv_content');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...defaultCv,
          ...parsed,
          photoUrl: parsed.photoUrl || defaultCv.photoUrl,
          showPhoto: parsed.showPhoto !== undefined ? parsed.showPhoto : true,
          photoWhiteBackground: parsed.photoWhiteBackground !== undefined ? parsed.photoWhiteBackground : true,
          experiences:
            parsed.experiences && parsed.experiences.length >= 3
              ? parsed.experiences
              : defaultCv.experiences,
          equipmentSkills: parsed.equipmentSkills || defaultCv.equipmentSkills,
          references: parsed.references || defaultCv.references,
        };
      } catch (e) {
        console.error('Error parsing saved CV', e);
      }
    }
    return defaultCv;
  });

  const [mode, setMode] = useState<'cover_letter' | 'cv'>('cover_letter');
  const [copied, setCopied] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [sidebarTab, setSidebarTab] = useState<'details' | 'letter' | 'cv_edit' | 'guide'>('details');
  const [activeTab, setActiveTab] = useState<'edit_details' | 'edit_letter' | 'edit_cv' | 'preview_letter' | 'preview_cv'>('edit_details');

  // Persist details to localStorage
  useEffect(() => {
    localStorage.setItem('intl_cl_candidate_details', JSON.stringify(details));
  }, [details]);

  // Persist CV to localStorage
  useEffect(() => {
    localStorage.setItem('intl_cv_content', JSON.stringify(cv));
  }, [cv]);

  // Handle Target Country Change
  const handleCountryChange = (country: TargetCountry) => {
    const info = COUNTRIES_DATA[country] || COUNTRIES_DATA.Other;
    const defaultCity = info.keyHubs[0] || 'Logistics Center';
    const updatedDetails: CandidateDetails = {
      ...details,
      targetCountry: country,
      targetCity: defaultCity,
    };
    setDetails(updatedDetails);
    setContent(generateCoverLetterContent(details.jobCategory, country, updatedDetails));

    // Update CV with new country gdpr and target country
    setCv((prevCv) => {
      const freshCv = generateCvContent(details.jobCategory, country, updatedDetails);
      return {
        ...prevCv,
        targetCountry: country,
        gdprClause: freshCv.gdprClause,
        headline: freshCv.headline,
      };
    });
  };

  // Handle Job Category Change
  const handleJobCategoryChange = (category: JobCategory) => {
    const jobItem = JOB_CATEGORIES.find((j) => j.id === category);
    const newTitle = jobItem ? jobItem.defaultTitle : 'Warehouse Operative';
    const updatedDetails: CandidateDetails = {
      ...details,
      jobCategory: category,
      targetJobTitle: newTitle,
    };
    setDetails(updatedDetails);
    setContent(generateCoverLetterContent(category, details.targetCountry, updatedDetails));

    // Update CV template
    setCv((prevCv) => {
      const freshCv = generateCvContent(category, details.targetCountry, updatedDetails);
      return {
        ...prevCv,
        targetJobTitle: newTitle,
        headline: freshCv.headline,
        experiences: freshCv.experiences,
        operationalSkills: freshCv.operationalSkills,
        professionalSummary: freshCv.professionalSummary,
      };
    });
  };

  const handleDetailsChange = (updated: Partial<CandidateDetails>) => {
    setDetails((prev) => {
      const next = { ...prev, ...updated };
      return next;
    });
  };

  const handleContentChange = (updated: Partial<LetterContent>) => {
    setContent((prev) => ({ ...prev, ...updated }));
  };

  const handleCvChange = (updatedCv: Partial<CvContent>) => {
    setCv((prev) => ({ ...prev, ...updatedCv }));
  };

  // Reset current letter to original template
  const handleResetToDefault = () => {
    const defaultContent = generateCoverLetterContent(
      details.jobCategory,
      details.targetCountry,
      details
    );
    setContent(defaultContent);
  };

  // Reset CV to category defaults
  const handleResetCv = () => {
    const freshCv = generateCvContent(details.jobCategory, details.targetCountry, details);
    setCv(freshCv);
  };

  // Full reset
  const handleFullReset = () => {
    if (window.confirm('Reset all details to default Indian Candidate profile?')) {
      setDetails(INITIAL_CANDIDATE_DETAILS);
      setContent(
        generateCoverLetterContent(
          INITIAL_CANDIDATE_DETAILS.jobCategory,
          INITIAL_CANDIDATE_DETAILS.targetCountry,
          INITIAL_CANDIDATE_DETAILS
        )
      );
      setCv(
        generateCvContent(
          INITIAL_CANDIDATE_DETAILS.jobCategory,
          INITIAL_CANDIDATE_DETAILS.targetCountry,
          INITIAL_CANDIDATE_DETAILS
        )
      );
      localStorage.removeItem('intl_cl_candidate_details');
      localStorage.removeItem('intl_cv_content');
    }
  };

  // PDF Download Handler (Cover Letter or CV)
  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);

      const safeName = details.fullName.trim().replace(/\s+/g, '_');
      const safeCountry = details.targetCountry.replace(/\s+/g, '_');
      const safeJob = details.jobCategory.replace(/\s+/g, '_');

      if (mode === 'cv') {
        // Ensure preview is active
        setActiveTab('preview_cv');
        await new Promise((resolve) => setTimeout(resolve, 300));
        const fileName = `${safeName}_CV_Resume_${safeCountry}_${safeJob}.pdf`;
        await exportCvToPdf('printable-cv-document', fileName, details, cv, setIsGeneratingPdf);
      } else {
        setActiveTab('preview_letter');
        await new Promise((resolve) => setTimeout(resolve, 300));
        const fileName = `${safeName}_Cover_Letter_${safeCountry}_${safeJob}.pdf`;
        await exportCoverLetterToPdf('printable-cover-letter', fileName, details, content, setIsGeneratingPdf);
      }
    } catch (err) {
      console.error('Failed to generate PDF, falling back to print dialog', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Native Print
  const handlePrint = () => {
    window.print();
  };

  // Formatted full letter string for copying & text export
  const getFullLetterString = () => {
    const passportBlock = details.showPassportInLetter
      ? `\n--- PASSPORT & VERIFICATION DETAILS ---
Passport Number: ${details.passport.passportNumber}
Date of Birth: ${details.passport.dateOfBirth} | Place of Issue: ${details.passport.placeOfIssue}
Expiry: ${details.passport.expiryDate}
Marital Status: ${details.maritalStatus} (Ready for immediate relocation)
Police Clearance Certificate (PCC): ${details.pccReady ? 'Ready & Verified' : 'In process'}
---------------------------------------\n`
      : '';

    return `${details.fullName}
${details.targetJobTitle}
Email: ${details.email} | Phone: ${details.phone}
Nationality: ${details.nationality} | Marital Status: ${details.maritalStatus}
Location: ${details.currentAddress ? `${details.currentAddress}, ` : ''}${details.cityCountry}
Target Country: ${details.targetCountry} Work Permit
${passportBlock}
Date: ${details.date}

To:
${details.targetCompany}
${details.targetCity ? `${details.targetCity}, ` : ''}${details.targetCountry}

RE: Application for ${details.targetJobTitle} — Work Permit Sponsorship Applicant

${content.salutation}

${content.paragraph1_intro}

${content.paragraph2_experience}

${content.paragraph3_skills_safety}
${details.hasForkliftLicense ? `Equipment Skill: ${details.forkliftDetails}\n` : ''}${details.hasDrivingLicense ? `Driving Credential: ${details.drivingLicenseDetails}\n` : ''}
${content.paragraph4_eligibility_shifts}

${content.paragraph5_closing}

${content.signOff}

${details.fullName}
Indian Citizen • Passport: ${details.passport.passportNumber}
`;
  };

  // Copy full text
  const handleCopy = async () => {
    try {
      const fullText = getFullLetterString();
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // Download .txt
  const handleDownloadTxt = () => {
    const fullText = getFullLetterString();
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${details.fullName.replace(/\s+/g, '_')}_Cover_Letter_${details.targetCountry}_${details.jobCategory}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleNavigateToLetterView = () => {
    setMode('cover_letter');
    setActiveTab('preview_letter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCvView = () => {
    setMode('cv');
    setActiveTab('preview_cv');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isPreviewMode = activeTab === 'preview_letter' || activeTab === 'preview_cv';

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans text-stone-900">
      {/* Top Application Bar with Mode Switcher & PDF triggers */}
      <Header
        details={details}
        mode={mode}
        onModeChange={(m) => {
          setMode(m);
          if (m === 'cv') {
            if (sidebarTab === 'letter') setSidebarTab('cv_edit');
          } else {
            if (sidebarTab === 'cv_edit') setSidebarTab('letter');
          }
        }}
        onPrint={handlePrint}
        onDownloadPdf={handleDownloadPdf}
        isGeneratingPdf={isGeneratingPdf}
        onCopy={handleCopy}
        onDownloadTxt={handleDownloadTxt}
        onReset={handleFullReset}
        copied={copied}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Candidate & Passport Status Banner */}
        <div className="mb-6 bg-white border border-stone-200/80 rounded-xl p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 no-print">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0 border border-amber-300/40">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-stone-900">
                  {details.fullName}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {details.nationality}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                  {details.maritalStatus}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase">
                  Active Document: {mode === 'cv' ? 'Curriculum Vitae (CV)' : 'Cover Letter'}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Targeting: <strong className="text-amber-900">{details.targetJobTitle}</strong> in <strong className="text-stone-800">{COUNTRIES_DATA[details.targetCountry]?.flag} {details.targetCountry}</strong> • Passport: <span className="font-mono font-medium">{details.passport.passportNumber || 'Pending manual entry'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-start md:justify-end flex-wrap">
            {/* Switch Mode Button */}
            <button
              type="button"
              onClick={() => {
                const nextMode = mode === 'cover_letter' ? 'cv' : 'cover_letter';
                setMode(nextMode);
                if (nextMode === 'cv') {
                  setActiveTab('preview_cv');
                  setSidebarTab('cv_edit');
                } else {
                  setActiveTab('preview_letter');
                  setSidebarTab('letter');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 transition-all cursor-pointer"
            >
              {mode === 'cv' ? (
                <>
                  <FileText className="w-3.5 h-3.5 text-amber-700" />
                  <span>Switch to Cover Letter</span>
                </>
              ) : (
                <>
                  <Briefcase className="w-3.5 h-3.5 text-amber-700" />
                  <span>Switch to European CV</span>
                </>
              )}
            </button>

            {/* View Document Button */}
            <button
              type="button"
              onClick={() => {
                if (mode === 'cv') {
                  setActiveTab('preview_cv');
                } else {
                  setActiveTab('preview_letter');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white shadow-xs transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{mode === 'cv' ? 'View CV Document' : 'View Cover Letter'}</span>
            </button>

            {/* Download PDF Button */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-all disabled:opacity-75 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Dynamic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Editor Controls & Tabs (Hidden when in preview mode on mobile) */}
          <div
            className={`lg:col-span-5 space-y-5 no-print ${
              isPreviewMode ? 'hidden lg:block' : 'block'
            }`}
          >
            {/* Mode & Category Subheader */}
            <div className="bg-white p-1.5 rounded-xl border border-stone-200 shadow-2xs flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSidebarTab('details')}
                className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                  sidebarTab === 'details'
                    ? 'bg-amber-500/10 text-amber-900 font-bold border border-amber-500/20'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Details & Passport</span>
              </button>

              {mode === 'cover_letter' ? (
                <button
                  type="button"
                  onClick={() => setSidebarTab('letter')}
                  className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                    sidebarTab === 'letter'
                      ? 'bg-amber-500/10 text-amber-900 font-bold border border-amber-500/20'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Letter Paragraphs</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setSidebarTab('cv_edit')}
                  className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                    sidebarTab === 'cv_edit'
                      ? 'bg-amber-500/10 text-amber-900 font-bold border border-amber-500/20'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Edit CV Sections</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setSidebarTab('guide')}
                className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                  sidebarTab === 'guide'
                    ? 'bg-amber-500/10 text-amber-900 font-bold border border-amber-500/20'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{details.targetCountry} Visa</span>
              </button>
            </div>

            {/* Sidebar Tab Contents */}
            {sidebarTab === 'details' && (
              <DetailsEditor
                details={details}
                onChange={handleDetailsChange}
                onCountryChange={handleCountryChange}
                onJobCategoryChange={handleJobCategoryChange}
                onNavigateToLetterView={handleNavigateToLetterView}
                onNavigateToCvView={handleNavigateToCvView}
              />
            )}

            {sidebarTab === 'letter' && (
              <LetterContentEditor
                content={content}
                details={details}
                onChange={handleContentChange}
                onResetToDefault={handleResetToDefault}
                onNavigateToLetterView={handleNavigateToLetterView}
              />
            )}

            {sidebarTab === 'cv_edit' && (
              <CvEditor
                details={details}
                cv={cv}
                onChange={handleCvChange}
                onResetCv={handleResetCv}
                onNavigateToPreview={handleNavigateToCvView}
              />
            )}

            {sidebarTab === 'guide' && (
              <CountryWorkPermitDrawer country={details.targetCountry} />
            )}
          </div>

          {/* Right Column: Live A4 Printable Preview (Cover Letter OR CV) */}
          <div
            className={`lg:col-span-7 flex justify-center ${
              !isPreviewMode ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {mode === 'cv' ? (
              <CvPreview
                details={details}
                cv={cv}
                onEditCv={() => {
                  setSidebarTab('cv_edit');
                  setActiveTab('edit_cv');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSwitchToCoverLetter={() => {
                  setMode('cover_letter');
                  setActiveTab('preview_letter');
                }}
                onUpdateCv={handleCvChange}
              />
            ) : (
              <CoverLetterPreview
                details={details}
                content={content}
                onContentChange={handleContentChange}
                onDetailsChange={handleDetailsChange}
                onPrint={handlePrint}
                onCopy={handleCopy}
                copied={copied}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-4 mt-auto no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <p>
            European Cover Letter & CV Builder • Supporting <strong>Poland, Turkey, Greece, Germany, Romania, Czech Republic, Croatia, Hungary, Albania, and more</strong>
          </p>
          <p className="flex items-center gap-1 text-stone-400">
            <span>Specialized for Indian & Non-EU Candidates seeking Work Permit Sponsorship</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
