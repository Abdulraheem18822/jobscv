import React, { useState } from 'react';
import {
  CandidateDetails,
  LetterContent,
  TargetCountry,
} from '../types';
import {
  Printer,
  Copy,
  Check,
  Download,
  FileText,
  ShieldCheck,
  Edit3,
  Calendar,
  Globe2,
  Sparkles,
  Loader2,
  User,
  CheckCircle2,
} from 'lucide-react';
import { exportCoverLetterToPdf, generateVectorPdf } from '../utils/pdfExport';

interface CoverLetterPreviewProps {
  details: CandidateDetails;
  content: LetterContent;
  onContentChange: (updated: Partial<LetterContent>) => void;
  onDetailsChange: (updated: Partial<CandidateDetails>) => void;
  onPrint: () => void;
  onCopy: () => void;
  copied: boolean;
  onEditLetter?: () => void;
  onEditDetails?: () => void;
}

export const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({
  details,
  content,
  onContentChange,
  onDetailsChange,
  onPrint,
  onCopy,
  copied,
  onEditLetter,
  onEditDetails,
}) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);

  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      const safeName = (details.fullName || 'Candidate').trim().replace(/\s+/g, '_');
      const safeCountry = details.targetCountry.replace(/\s+/g, '_');
      const safeJob = details.jobCategory.replace(/\s+/g, '_');
      const fileName = `${safeName}_Cover_Letter_${safeCountry}_${safeJob}.pdf`;

      await exportCoverLetterToPdf('printable-cover-letter', fileName, details, content, setIsGeneratingPdf);
      setPdfSuccess(true);
      setTimeout(() => setPdfSuccess(false), 3000);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDownloadVectorPdf = () => {
    try {
      const safeName = (details.fullName || 'Candidate').trim().replace(/\s+/g, '_');
      const safeCountry = details.targetCountry.replace(/\s+/g, '_');
      const safeJob = details.jobCategory.replace(/\s+/g, '_');
      const fileName = `${safeName}_Cover_Letter_${safeCountry}_${safeJob}_ATS.pdf`;
      generateVectorPdf(details, content, fileName);
      setPdfSuccess(true);
      setTimeout(() => setPdfSuccess(false), 3000);
    } catch (err) {
      console.error('Vector PDF generation error:', err);
      window.print();
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Top Document Controls Bar (Hidden during window.print()) */}
      <div className="bg-white p-3 sm:p-4 rounded-xl border border-stone-200 shadow-2xs space-y-3 no-print">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <FileText className="w-4 h-4 text-amber-600" />
              <h2 className="text-sm sm:text-base font-bold text-stone-900">
                Cover Letter Preview ({details.targetCountry})
              </h2>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                Click any text to edit inline
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Targeting employer work permit sponsorship in {details.targetCountry}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Direct Edit Letter Button */}
            {onEditLetter && (
              <button
                type="button"
                onClick={onEditLetter}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                <span>Edit Letter Content</span>
              </button>
            )}

            {/* Direct Edit Details Button */}
            {onEditDetails && (
              <button
                type="button"
                onClick={onEditDetails}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-stone-600" />
                <span>Edit Details & Country</span>
              </button>
            )}

            {/* Direct Download PDF Button */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white shadow-xs transition-all disabled:opacity-75 cursor-pointer"
              title="Download formatted A4 PDF file directly"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Preparing PDF...</span>
                </>
              ) : pdfSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>PDF Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            {/* Direct Clean ATS Vector PDF */}
            <button
              type="button"
              onClick={handleDownloadVectorPdf}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
              title="Download sharp vector text PDF (Instant, 100% ATS parseable)"
            >
              <FileText className="w-3.5 h-3.5 text-stone-600" />
              <span>ATS Clean PDF</span>
            </button>

            {/* Native Print */}
            <button
              type="button"
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
              title="Print or Save as PDF using browser printer"
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* Copy Full Text */}
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
              title="Copy letter text to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-600" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Edit Guidance Strip */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-2.5 text-xs text-amber-900 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Full Edit Access:</strong> You can click directly on any text or paragraph in the letter below to edit it immediately, or click <strong>&ldquo;Edit Letter Content&rdquo;</strong> above to write full customized paragraphs.
            </span>
          </div>
        </div>
      </div>

      {/* Printable Sheet (Standard A4 Dimension Style) */}
      <div
        id="printable-cover-letter"
        className="bg-white rounded-xl sm:rounded-2xl border border-stone-300 shadow-md p-6 sm:p-10 md:p-12 text-stone-800 max-w-[820px] mx-auto print:border-none print:shadow-none print:p-0 print:m-0 print:w-full print:max-w-none transition-all leading-relaxed"
        style={{ minHeight: '1050px' }}
      >
        {/* Header Block: Candidate Information */}
        <header className="border-b-2 border-stone-900 pb-5 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onDetailsChange({ fullName: e.currentTarget.innerText })}
                className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight cursor-text hover:bg-amber-50/50 rounded px-1 -mx-1"
                title="Click to edit name"
              >
                {details.fullName}
              </h1>
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onDetailsChange({ targetJobTitle: e.currentTarget.innerText })}
                className="text-sm sm:text-base font-medium text-amber-800 mt-1 cursor-text hover:bg-amber-50/50 rounded px-1 -mx-1"
                title="Click to edit job title"
              >
                {details.targetJobTitle}
              </p>
              <p className="text-xs text-stone-600 mt-1">
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => onDetailsChange({ nationality: e.currentTarget.innerText })}
                  className="font-semibold cursor-text hover:bg-amber-50/50 rounded px-0.5"
                >
                  {details.nationality}
                </span>
                {' • '}
                <span>
                  Marital Status:{' '}
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => onDetailsChange({ maritalStatus: e.currentTarget.innerText })}
                    className="cursor-text hover:bg-amber-50/50 rounded px-0.5"
                  >
                    {details.maritalStatus}
                  </span>
                </span>
              </p>
            </div>

            {/* Candidate Contacts */}
            <div className="text-xs text-stone-600 space-y-1 sm:text-right">
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onDetailsChange({ email: e.currentTarget.innerText })}
                className="font-medium text-stone-900 cursor-text hover:bg-amber-50/50 rounded px-1 -mx-1"
              >
                {details.email}
              </p>
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onDetailsChange({ phone: e.currentTarget.innerText })}
                className="cursor-text hover:bg-amber-50/50 rounded px-1 -mx-1"
              >
                {details.phone}
              </p>
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onDetailsChange({ cityCountry: e.currentTarget.innerText })}
                className="cursor-text hover:bg-amber-50/50 rounded px-1 -mx-1"
              >
                {details.currentAddress ? `${details.currentAddress}, ` : ''}{details.cityCountry}
              </p>
              <p className="text-[11px] text-amber-900 font-semibold bg-amber-50 inline-block px-2 py-0.5 rounded border border-amber-200">
                Target: {details.targetCountry} Work Permit
              </p>
            </div>
          </div>
        </header>

        {/* Passport & Candidate Verification Card */}
        {details.showPassportInLetter && (
          <div className="mb-6 p-3.5 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700">
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-2 mb-2">
              <span className="font-bold text-stone-900 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Candidate Identity & Work Permit Verification Summary</span>
              </span>
              <span className="text-[10px] text-stone-500 font-medium">Employment Candidate</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div>
                <span className="text-stone-500 block text-[10px]">Passport Number:</span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    onDetailsChange({
                      passport: { ...details.passport, passportNumber: e.currentTarget.innerText },
                    })
                  }
                  className="font-mono font-bold text-stone-900 cursor-text hover:bg-amber-50/50 rounded"
                >
                  {details.passport.passportNumber || 'Pending'}
                </span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Date of Birth:</span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    onDetailsChange({
                      passport: { ...details.passport, dateOfBirth: e.currentTarget.innerText },
                    })
                  }
                  className="font-medium text-stone-800 cursor-text hover:bg-amber-50/50 rounded"
                >
                  {details.passport.dateOfBirth}
                </span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Place of Issue:</span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    onDetailsChange({
                      passport: { ...details.passport, placeOfIssue: e.currentTarget.innerText },
                    })
                  }
                  className="font-medium text-stone-800 cursor-text hover:bg-amber-50/50 rounded"
                >
                  {details.passport.placeOfIssue}
                </span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Passport Validity:</span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    onDetailsChange({
                      passport: { ...details.passport, expiryDate: e.currentTarget.innerText },
                    })
                  }
                  className="font-medium text-stone-800 cursor-text hover:bg-amber-50/50 rounded"
                >
                  {details.passport.expiryDate ? `Exp: ${details.passport.expiryDate}` : 'Valid'}
                </span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-stone-200/60 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-stone-600">
              <span><strong>Status:</strong> {details.maritalStatus} (Ready for relocation)</span>
              <span>•</span>
              <span><strong>Police Clearance:</strong> {details.pccReady ? 'PCC Verified & Ready' : 'In process'}</span>
              <span>•</span>
              <span><strong>Medical Fitness:</strong> Fit for 8–12h physical shifts</span>
            </div>
          </div>
        )}

        {/* Date & Recipient Details */}
        <div className="mb-6 space-y-3 text-xs text-stone-700">
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onDetailsChange({ date: e.currentTarget.innerText })}
            className="cursor-text hover:bg-amber-50/50 rounded inline-block px-1 -mx-1 text-stone-600 font-medium"
          >
            {details.date}
          </p>

          <div className="space-y-0.5">
            <p className="font-semibold text-stone-900">To:</p>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onDetailsChange({ targetCompany: e.currentTarget.innerText })}
              className="font-medium text-stone-900 cursor-text hover:bg-amber-50/50 rounded px-1 -mx-1"
            >
              {details.targetCompany}
            </p>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onDetailsChange({ targetCity: e.currentTarget.innerText })}
              className="text-stone-600 cursor-text hover:bg-amber-50/50 rounded px-1 -mx-1"
            >
              {details.targetCity ? `${details.targetCity}, ` : ''}{details.targetCountry}
            </p>
          </div>

          <div className="pt-2 font-bold text-stone-900 text-sm border-t border-stone-100">
            <span>RE: Application for </span>
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onDetailsChange({ targetJobTitle: e.currentTarget.innerText })}
              className="underline decoration-amber-600 decoration-2 underline-offset-2 cursor-text hover:bg-amber-50/50 rounded px-1 -mx-1"
            >
              {details.targetJobTitle}
            </span>
            <span> — Work Permit Sponsorship Applicant</span>
          </div>
        </div>

        {/* Salutation */}
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onContentChange({ salutation: e.currentTarget.innerText })}
          className="text-xs sm:text-sm font-semibold text-stone-900 mb-4 cursor-text hover:bg-amber-50/50 rounded px-1 -mx-1"
        >
          {content.salutation}
        </p>

        {/* Letter Body Paragraphs */}
        <div className="space-y-3.5 text-xs sm:text-[13px] text-stone-700 leading-relaxed text-justify">
          {/* Paragraph 1: Introduction */}
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onContentChange({ paragraph1_intro: e.currentTarget.innerText })}
            className="cursor-text hover:bg-amber-50/50 rounded p-1 -m-1 transition-colors"
          >
            {content.paragraph1_intro}
          </p>

          {/* Paragraph 2: Physical Stamina & Experience */}
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onContentChange({ paragraph2_experience: e.currentTarget.innerText })}
            className="cursor-text hover:bg-amber-50/50 rounded p-1 -m-1 transition-colors"
          >
            {content.paragraph2_experience}
          </p>

          {/* Paragraph 3: Workplace Safety, Accuracy & 5S */}
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onContentChange({ paragraph3_skills_safety: e.currentTarget.innerText })}
            className="cursor-text hover:bg-amber-50/50 rounded p-1 -m-1 transition-colors"
          >
            {content.paragraph3_skills_safety}
          </p>

          {/* Equipment & Driving Details if checked */}
          {(details.hasForkliftLicense || details.hasDrivingLicense) && (
            <div className="p-2.5 bg-amber-50/60 rounded border border-amber-200/70 text-xs text-stone-800 space-y-1">
              {details.hasForkliftLicense && (
                <p>
                  <strong>Equipment Operator Credential:</strong> Experienced with manual & electric pallet jacks, stackers, and forklift material handling safety.
                </p>
              )}
              {details.hasDrivingLicense && (
                <p>
                  <strong>Driving License:</strong> Holds valid motor vehicle driving license with clear driving history.
                </p>
              )}
            </div>
          )}

          {/* Paragraph 4: Legal Eligibility & Shift Flexibility */}
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onContentChange({ paragraph4_eligibility_shifts: e.currentTarget.innerText })}
            className="cursor-text hover:bg-amber-50/50 rounded p-1 -m-1 transition-colors"
          >
            {content.paragraph4_eligibility_shifts}
          </p>

          {/* Paragraph 5: Closing & Relocation */}
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onContentChange({ paragraph5_closing: e.currentTarget.innerText })}
            className="cursor-text hover:bg-amber-50/50 rounded p-1 -m-1 transition-colors"
          >
            {content.paragraph5_closing}
          </p>
        </div>

        {/* Sign-off & Signature */}
        <div className="mt-6 pt-4 space-y-3">
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onContentChange({ signOff: e.currentTarget.innerText })}
            className="text-xs sm:text-sm font-medium text-stone-800 cursor-text hover:bg-amber-50/50 rounded px-1 -mx-1"
          >
            {content.signOff}
          </p>

          <div className="space-y-0.5">
            <p className="font-serif font-bold text-stone-900 text-base">
              {details.fullName}
            </p>
            <p className="text-xs text-stone-500">
              {details.nationality} • Candidate for {details.targetCountry} Employment Visa
            </p>
            <p className="text-xs text-stone-500 font-mono">
              Passport No: {details.passport.passportNumber || '[Pending manual entry]'}
            </p>
          </div>
        </div>

        {/* Poland RODO / GDPR clause if target country is Poland */}
        {details.targetCountry === 'Poland' && details.includeRodoClause && (
          <div className="mt-8 pt-4 border-t border-stone-200 text-[10px] text-stone-400 leading-snug">
            <p className="font-semibold text-stone-500 mb-0.5">Polish Employment GDPR / RODO Clause:</p>
            <p>
              Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji (zgodnie z ustawą z dnia 10 maja 2018 roku o ochronie danych osobowych (Dz. Ustaw z 2018, poz. 1000) oraz zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO)).
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
