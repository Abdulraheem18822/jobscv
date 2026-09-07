import React from 'react';
import {
  FileText,
  Printer,
  Copy,
  Check,
  Download,
  RotateCcw,
  Globe2,
  User,
  ShieldCheck,
  Eye,
  Settings,
  Loader2,
  Briefcase,
  Layers,
} from 'lucide-react';
import { CandidateDetails, TargetCountry } from '../types';
import { COUNTRIES_DATA } from '../data/internationalJobData';

interface HeaderProps {
  details: CandidateDetails;
  mode: 'cover_letter' | 'cv';
  onModeChange: (mode: 'cover_letter' | 'cv') => void;
  onPrint: () => void;
  onDownloadPdf: () => void;
  isGeneratingPdf: boolean;
  onCopy: () => void;
  onDownloadTxt: () => void;
  onReset: () => void;
  copied: boolean;
  activeTab: 'edit_details' | 'edit_letter' | 'edit_cv' | 'preview_letter' | 'preview_cv';
  onTabChange: (tab: 'edit_details' | 'edit_letter' | 'edit_cv' | 'preview_letter' | 'preview_cv') => void;
}

export const Header: React.FC<HeaderProps> = ({
  details,
  mode,
  onModeChange,
  onPrint,
  onDownloadPdf,
  isGeneratingPdf,
  onCopy,
  onDownloadTxt,
  onReset,
  copied,
  activeTab,
  onTabChange,
}) => {
  const countryInfo = COUNTRIES_DATA[details.targetCountry] || COUNTRIES_DATA.Other;

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 shrink-0">
              {mode === 'cv' ? <Briefcase className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-stone-900 tracking-tight truncate text-base sm:text-lg">
                  {mode === 'cv' ? 'European CV Maker' : 'Cover Letter Builder'}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-900 border border-amber-200">
                  <span>{countryInfo.flag}</span>
                  <span>{details.targetCountry}</span>
                </span>
              </div>
              <p className="text-xs text-stone-500 truncate hidden md:block">
                Candidate: <strong className="text-stone-700">{details.fullName}</strong> • Indian Citizen (Non-EU) • {details.maritalStatus}
              </p>
            </div>
          </div>

          {/* Primary Document Mode Switcher (Cover Letter vs CV) */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl text-xs font-semibold border border-stone-200 shrink-0">
            <button
              type="button"
              onClick={() => {
                onModeChange('cover_letter');
                if (activeTab === 'preview_cv' || activeTab === 'edit_cv') {
                  onTabChange('preview_letter');
                }
              }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                mode === 'cover_letter'
                  ? 'bg-amber-600 text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Cover Letter</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onModeChange('cv');
                if (activeTab === 'preview_letter' || activeTab === 'edit_letter') {
                  onTabChange('preview_cv');
                }
              }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                mode === 'cv'
                  ? 'bg-amber-600 text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>CV / Resume</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500 text-white font-bold">
                NEW
              </span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Direct Download PDF Button */}
            <button
              type="button"
              onClick={onDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white shadow-xs transition-all disabled:opacity-75 cursor-pointer"
              title={mode === 'cv' ? 'Download PDF CV' : 'Download PDF Cover Letter'}
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="hidden sm:inline">Exporting PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {mode === 'cv' ? 'Download CV' : 'Download Letter'}
                  </span>
                  <span className="sm:hidden">PDF</span>
                </>
              )}
            </button>

            {/* Print */}
            <button
              type="button"
              onClick={onPrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
              title="Print document or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>Print</span>
            </button>

            {/* Reset */}
            <button
              type="button"
              onClick={onReset}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
              title="Reset to default template"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
