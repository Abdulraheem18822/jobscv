import React, { useState, useRef, useEffect } from 'react';
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
  Palette,
  Search,
  Plus,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Wrench,
  Truck,
  Box,
  HelpCircle,
} from 'lucide-react';
import { CandidateDetails, CvContent, CvPageCount, DocumentTheme, JobCategory, TargetCountry } from '../types';
import { COUNTRIES_DATA, JOB_CATEGORIES } from '../data/internationalJobData';
import { DOCUMENT_THEMES } from '../data/themes';

interface HeaderProps {
  details: CandidateDetails;
  cv: CvContent;
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
  onJobCategoryChange: (category: JobCategory, customTitle?: string) => void;
  onThemeChange: (theme: DocumentTheme) => void;
  onCvPageCountChange: (count: CvPageCount) => void;
  onCountryChange: (country: TargetCountry) => void;
}

export const Header: React.FC<HeaderProps> = ({
  details,
  cv,
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
  onJobCategoryChange,
  onThemeChange,
  onCvPageCountChange,
  onCountryChange,
}) => {
  const countryInfo = COUNTRIES_DATA[details.targetCountry] || COUNTRIES_DATA.Other;
  const currentThemeId = details.theme || 'classic_amber';
  const currentTheme = DOCUMENT_THEMES[currentThemeId] || DOCUMENT_THEMES.classic_amber;
  const currentCvPageCount: CvPageCount = cv.pageCount || 2;

  // Dropdown toggles
  const [isJobsOpen, setIsJobsOpen] = useState(false);
  const [isThemesOpen, setIsThemesOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  // Custom Job input state
  const [customJobInput, setCustomJobInput] = useState('');
  const [jobSearchQuery, setJobSearchQuery] = useState('');

  // Country search query
  const [countrySearchQuery, setCountrySearchQuery] = useState('');

  const jobsMenuRef = useRef<HTMLDivElement>(null);
  const themesMenuRef = useRef<HTMLDivElement>(null);
  const pagesMenuRef = useRef<HTMLDivElement>(null);
  const countryMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (jobsMenuRef.current && !jobsMenuRef.current.contains(e.target as Node)) {
        setIsJobsOpen(false);
      }
      if (themesMenuRef.current && !themesMenuRef.current.contains(e.target as Node)) {
        setIsThemesOpen(false);
      }
      if (pagesMenuRef.current && !pagesMenuRef.current.contains(e.target as Node)) {
        setIsPagesOpen(false);
      }
      if (countryMenuRef.current && !countryMenuRef.current.contains(e.target as Node)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApplyCustomJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (customJobInput.trim()) {
      onJobCategoryChange('custom', customJobInput.trim());
      setIsJobsOpen(false);
      setCustomJobInput('');
    }
  };

  // Filtered jobs for search
  const filteredJobs = JOB_CATEGORIES.filter((j) => {
    if (!jobSearchQuery.trim()) return true;
    const q = jobSearchQuery.toLowerCase();
    return (
      j.name.toLowerCase().includes(q) ||
      j.defaultTitle.toLowerCase().includes(q) ||
      j.description.toLowerCase().includes(q)
    );
  });

  // Group jobs for clear navigation
  const warehouseJobs = filteredJobs.filter((j) =>
    ['warehouse', 'order_picker', 'fulfillment', 'material_handler', 'crossdock', 'inventory'].includes(j.id)
  );
  const tradeJobs = filteredJobs.filter((j) =>
    ['forklift', 'driver', 'welder', 'electrician', 'construction'].includes(j.id)
  );
  const serviceJobs = filteredJobs.filter((j) =>
    ['cleaner', 'hospitality', 'retail', 'security', 'agriculture'].includes(j.id)
  );

  // Filtered countries for search
  const countryKeys = Object.keys(COUNTRIES_DATA) as TargetCountry[];
  const filteredCountries = countryKeys.filter((ck) => {
    if (!countrySearchQuery.trim()) return true;
    const q = countrySearchQuery.toLowerCase();
    const c = COUNTRIES_DATA[ck];
    return (
      c.name.toLowerCase().includes(q) ||
      c.workPermitType.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q)
    );
  });

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-xs no-print">
      {/* Top Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 gap-3">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 shrink-0">
              {mode === 'cv' ? <Briefcase className="w-4.5 h-4.5" /> : <FileText className="w-4.5 h-4.5" />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-900 tracking-tight truncate text-sm sm:text-base">
                  International CV & Cover Letter Studio
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200 shrink-0">
                  <span>{countryInfo.flag}</span>
                  <span>{details.targetCountry}</span>
                </span>
              </div>
              <p className="text-[11px] text-stone-500 truncate hidden lg:block">
                Customizable for any candidate • {details.fullName} • {details.targetJobTitle}
              </p>
            </div>
          </div>

          {/* Primary Document Mode Switcher (Cover Letter: 1 Page vs CV: 2-5 Pages) */}
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
              title="Cover Letter (Standard 1 Page)"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Cover Letter</span>
              <span className="px-1.5 py-0.2 rounded text-[9.5px] bg-white/20 text-white font-medium hidden sm:inline">
                1 Page
              </span>
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
              title="European & Gulf CV (2 to 5 Pages)"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>CV / Resume</span>
              <span className="px-1.5 py-0.2 rounded text-[9.5px] bg-emerald-600 text-white font-bold">
                {currentCvPageCount} Pgs
              </span>
            </button>
          </div>

          {/* Top Quick Actions */}
          <div className="flex items-center gap-2">
            {/* Download PDF */}
            <button
              type="button"
              onClick={onDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white shadow-xs transition-all disabled:opacity-75 cursor-pointer"
              title={mode === 'cv' ? `Download ${currentCvPageCount}-Page CV PDF` : 'Download 1-Page Cover Letter PDF'}
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="hidden sm:inline">Exporting...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {mode === 'cv' ? `Download CV (${currentCvPageCount}P)` : 'Download Letter (1P)'}
                  </span>
                  <span className="sm:hidden">PDF</span>
                </>
              )}
            </button>

            {/* Print */}
            <button
              type="button"
              onClick={onPrint}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
              title="Print document"
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>Print</span>
            </button>

            {/* Reset */}
            <button
              type="button"
              onClick={onReset}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
              title="Reset to clean template"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECOND ROW / TOP HEADER MENU: Jobs Option, Themes Option, Pages Option   */}
      {/* ========================================================================= */}
      <div className="bg-stone-50/90 border-t border-stone-200/80 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* 1. JOBS OPTION (On Top of Header Menu as Requested) */}
            <div className="relative" ref={jobsMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setIsJobsOpen(!isJobsOpen);
                  setIsThemesOpen(false);
                  setIsPagesOpen(false);
                  setIsCountryOpen(false);
                }}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  isJobsOpen
                    ? 'bg-amber-100/90 border-amber-400 text-amber-950 shadow-2xs'
                    : 'bg-white hover:bg-stone-100 border-stone-300 text-stone-800 shadow-2xs'
                }`}
                title="Select from all jobs fulfillment or add custom job manually"
              >
                <Briefcase className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className="text-stone-500 font-normal">Job:</span>
                <span className="max-w-[140px] sm:max-w-[180px] truncate text-stone-900 font-bold">
                  {details.targetJobTitle}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${isJobsOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Jobs Dropdown Menu */}
              {isJobsOpen && (
                <div className="absolute left-0 mt-1.5 w-[330px] sm:w-[420px] bg-white rounded-xl border border-stone-300 shadow-xl p-3 z-50 text-stone-900 max-h-[520px] overflow-y-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200 mb-2.5">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                        <span>All Jobs & Trades Fulfillment</span>
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Choose a standard trade or type your own custom job title.
                      </p>
                    </div>
                    <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                      {JOB_CATEGORIES.length} Roles
                    </span>
                  </div>

                  {/* Custom Job Manual Input Box */}
                  <form onSubmit={handleApplyCustomJob} className="mb-3 p-2.5 bg-amber-50/70 border border-amber-200 rounded-lg">
                    <label className="block text-[11px] font-bold text-amber-950 mb-1 flex items-center justify-between">
                      <span>Add Custom Job Manually:</span>
                      <span className="text-[10px] font-normal text-amber-800">Any Profession</span>
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={customJobInput}
                        onChange={(e) => setCustomJobInput(e.target.value)}
                        placeholder="e.g. Plumber, CNC Machinist, Security Supervisor..."
                        className="flex-1 text-xs px-2.5 py-1.5 bg-white border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 text-stone-900"
                      />
                      <button
                        type="submit"
                        disabled={!customJobInput.trim()}
                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-md text-xs font-bold shrink-0 transition-colors cursor-pointer"
                      >
                        Apply Job
                      </button>
                    </div>
                    <p className="text-[10px] text-stone-500 mt-1">
                      Tip: Generates custom summary, experience highlights, and cover letter for any job.
                    </p>
                  </form>

                  {/* Search input for jobs */}
                  <div className="relative mb-2">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
                    <input
                      type="text"
                      value={jobSearchQuery}
                      onChange={(e) => setJobSearchQuery(e.target.value)}
                      placeholder="Search fulfillment, trades, or service jobs..."
                      className="w-full text-xs pl-8 pr-3 py-1.5 border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  {/* Job Categories List */}
                  <div className="space-y-3">
                    {/* Warehouse & Logistics */}
                    {warehouseJobs.length > 0 && (
                      <div>
                        <span className="text-[10.5px] uppercase font-bold text-stone-500 block mb-1">
                          Warehouse & Logistics Fulfillment
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {warehouseJobs.map((j) => (
                            <button
                              key={j.id}
                              type="button"
                              onClick={() => {
                                onJobCategoryChange(j.id);
                                setIsJobsOpen(false);
                              }}
                              className={`text-left p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                                details.jobCategory === j.id
                                  ? 'bg-amber-50 border-amber-400 font-bold text-amber-950 ring-1 ring-amber-400'
                                  : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-semibold truncate">{j.name}</span>
                                <span className="text-[9px] px-1 py-0.2 bg-stone-100 rounded text-stone-600">
                                  {j.badge}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Industrial Trades & Equipment */}
                    {tradeJobs.length > 0 && (
                      <div>
                        <span className="text-[10.5px] uppercase font-bold text-stone-500 block mb-1">
                          Equipment, Driving & Skilled Trades
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {tradeJobs.map((j) => (
                            <button
                              key={j.id}
                              type="button"
                              onClick={() => {
                                onJobCategoryChange(j.id);
                                setIsJobsOpen(false);
                              }}
                              className={`text-left p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                                details.jobCategory === j.id
                                  ? 'bg-amber-50 border-amber-400 font-bold text-amber-950 ring-1 ring-amber-400'
                                  : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-semibold truncate">{j.name}</span>
                                <span className="text-[9px] px-1 py-0.2 bg-stone-100 rounded text-stone-600">
                                  {j.badge}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Services & Maintenance */}
                    {serviceJobs.length > 0 && (
                      <div>
                        <span className="text-[10.5px] uppercase font-bold text-stone-500 block mb-1">
                          Commercial Services & Facilities
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {serviceJobs.map((j) => (
                            <button
                              key={j.id}
                              type="button"
                              onClick={() => {
                                onJobCategoryChange(j.id);
                                setIsJobsOpen(false);
                              }}
                              className={`text-left p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                                details.jobCategory === j.id
                                  ? 'bg-amber-50 border-amber-400 font-bold text-amber-950 ring-1 ring-amber-400'
                                  : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-semibold truncate">{j.name}</span>
                                <span className="text-[9px] px-1 py-0.2 bg-stone-100 rounded text-stone-600">
                                  {j.badge}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 2. THEMES OPTION (Free Online Themes as Requested) */}
            <div className="relative" ref={themesMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setIsThemesOpen(!isThemesOpen);
                  setIsJobsOpen(false);
                  setIsPagesOpen(false);
                  setIsCountryOpen(false);
                }}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  isThemesOpen
                    ? 'bg-stone-200 border-stone-400 text-stone-900 shadow-2xs'
                    : 'bg-white hover:bg-stone-100 border-stone-300 text-stone-800 shadow-2xs'
                }`}
                title="Select free online CV and Cover Letter themes"
              >
                <Palette className="w-3.5 h-3.5 text-stone-600 shrink-0" />
                <span className="text-stone-500 font-normal">Theme:</span>
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block border border-black/20"
                  style={{ backgroundColor: currentTheme.swatchHex }}
                />
                <span className="truncate max-w-[120px] font-bold text-stone-900">{currentTheme.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${isThemesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Themes Dropdown */}
              {isThemesOpen && (
                <div className="absolute left-0 mt-1.5 w-[290px] sm:w-[350px] bg-white rounded-xl border border-stone-300 shadow-xl p-3 z-50 text-stone-900">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200 mb-2">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                        <Palette className="w-3.5 h-3.5 text-amber-600" />
                        <span>Free Online Themes</span>
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        100% Free styling for CV & Cover Letter.
                      </p>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-1.5 py-0.5 rounded">
                      6 Free Themes
                    </span>
                  </div>

                  <div className="space-y-1.5 max-h-[380px] overflow-y-auto">
                    {Object.values(DOCUMENT_THEMES).map((th) => {
                      const isSelected = currentThemeId === th.id;
                      return (
                        <button
                          key={th.id}
                          type="button"
                          onClick={() => {
                            onThemeChange(th.id);
                            setIsThemesOpen(false);
                          }}
                          className={`w-full text-left p-2 rounded-lg border text-xs transition-colors flex items-start gap-2.5 cursor-pointer ${
                            isSelected
                              ? 'border-amber-600 bg-amber-50/80 ring-1 ring-amber-500 font-bold'
                              : 'border-stone-200 bg-white hover:bg-stone-50'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full mt-0.5 shrink-0 border border-black/20"
                            style={{ backgroundColor: th.swatchHex }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-stone-900">{th.name}</span>
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                            </div>
                            <p className="text-[10.5px] text-stone-500 leading-tight mt-0.5">{th.subtitle}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 3. PAGES OPTION (CV: 2 to 5 Pages, Cover Letter: 1 Page Only as Requested) */}
            <div className="relative" ref={pagesMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setIsPagesOpen(!isPagesOpen);
                  setIsJobsOpen(false);
                  setIsThemesOpen(false);
                  setIsCountryOpen(false);
                }}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  isPagesOpen
                    ? 'bg-stone-200 border-stone-400 text-stone-900 shadow-2xs'
                    : 'bg-white hover:bg-stone-100 border-stone-300 text-stone-800 shadow-2xs'
                }`}
                title="Configure page count (CV: 2-5 pages, Cover Letter: 1 page)"
              >
                <Layers className="w-3.5 h-3.5 text-stone-600 shrink-0" />
                <span className="text-stone-500 font-normal">Pages:</span>
                <span className="font-bold text-stone-900">
                  {mode === 'cv' ? `CV: ${currentCvPageCount} Pages` : 'Letter: 1 Page'}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${isPagesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Pages Dropdown Menu */}
              {isPagesOpen && (
                <div className="absolute left-0 mt-1.5 w-[300px] sm:w-[360px] bg-white rounded-xl border border-stone-300 shadow-xl p-3 z-50 text-stone-900">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200 mb-2">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-amber-600" />
                        <span>Document Pages Setup</span>
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Select CV length (2 to 5 pages) or Cover Letter (1 page).
                      </p>
                    </div>
                  </div>

                  {/* Cover letter notice */}
                  <div className="mb-3 p-2 bg-stone-100 rounded-lg text-[11px] text-stone-700 flex items-start gap-2">
                    <FileText className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900">Cover Letter: 1 Page Only</strong>
                      <p className="text-stone-500 text-[10.5px]">
                        Strict international diplomatic standard. Always structured for concise 1-sheet review.
                      </p>
                    </div>
                  </div>

                  {/* CV Page Count Selector (2 to 5 Pages) */}
                  <div>
                    <label className="block text-xs font-bold text-stone-900 mb-1.5">
                      Curriculum Vitae (CV) Page Options:
                    </label>
                    <div className="space-y-1.5">
                      {[
                        {
                          count: 2 as CvPageCount,
                          title: '2 Pages (Standard Europass & GCC)',
                          desc: 'Full 2-page format with core roles, CEFR languages & GDPR clause.',
                        },
                        {
                          count: 3 as CvPageCount,
                          title: '3 Pages (Specialist & Projects)',
                          desc: 'Adds high-volume freight cross-docking & bin audits section.',
                        },
                        {
                          count: 4 as CvPageCount,
                          title: '4 Pages (Senior / Multi-Facility)',
                          desc: 'Adds overseas terminal deployments & hazardous cargo protocols.',
                        },
                        {
                          count: 5 as CvPageCount,
                          title: '5 Pages (Executive & Master Safety)',
                          desc: 'Adds full vocational training history & master verification seal.',
                        },
                      ].map((item) => {
                        const isSelected = currentCvPageCount === item.count;
                        return (
                          <button
                            key={item.count}
                            type="button"
                            onClick={() => {
                              onCvPageCountChange(item.count);
                              if (mode !== 'cv') onModeChange('cv');
                              setIsPagesOpen(false);
                            }}
                            className={`w-full text-left p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                              isSelected
                                ? 'border-amber-600 bg-amber-50 font-bold text-amber-950 ring-1 ring-amber-500'
                                : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold">{item.title}</span>
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                            </div>
                            <p className="text-[10px] text-stone-500 mt-0.5 leading-tight">{item.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. TARGET COUNTRY QUICK SELECTOR */}
            <div className="relative" ref={countryMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setIsCountryOpen(!isCountryOpen);
                  setIsJobsOpen(false);
                  setIsThemesOpen(false);
                  setIsPagesOpen(false);
                }}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  isCountryOpen
                    ? 'bg-stone-200 border-stone-400 text-stone-900 shadow-2xs'
                    : 'bg-white hover:bg-stone-100 border-stone-300 text-stone-800 shadow-2xs'
                }`}
                title="Switch destination country"
              >
                <Globe2 className="w-3.5 h-3.5 text-stone-600 shrink-0" />
                <span className="text-stone-500 font-normal">Country:</span>
                <span>{countryInfo.flag}</span>
                <span className="font-bold text-stone-900 truncate max-w-[90px] sm:max-w-[120px]">
                  {details.targetCountry}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Country Menu Dropdown */}
              {isCountryOpen && (
                <div className="absolute left-0 sm:right-0 sm:left-auto mt-1.5 w-[280px] sm:w-[320px] bg-white rounded-xl border border-stone-300 shadow-xl p-3 z-50 text-stone-900">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200 mb-2">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                        <Globe2 className="w-3.5 h-3.5 text-amber-600" />
                        <span>Target Country</span>
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Select European, Gulf, or Global destination.
                      </p>
                    </div>
                    <span className="text-[10px] bg-stone-100 font-bold px-1.5 py-0.5 rounded">
                      {countryKeys.length} Total
                    </span>
                  </div>

                  <div className="relative mb-2">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
                    <input
                      type="text"
                      value={countrySearchQuery}
                      onChange={(e) => setCountrySearchQuery(e.target.value)}
                      placeholder="Search countries..."
                      className="w-full text-xs pl-8 pr-3 py-1.5 border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="max-h-[300px] overflow-y-auto space-y-1">
                    {filteredCountries.map((ck) => {
                      const c = COUNTRIES_DATA[ck];
                      const isSelected = details.targetCountry === ck;
                      return (
                        <button
                          key={ck}
                          type="button"
                          onClick={() => {
                            onCountryChange(ck);
                            setIsCountryOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-amber-100 text-amber-950 font-bold'
                              : 'hover:bg-stone-100 text-stone-800'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span>{c.flag}</span>
                            <span className="truncate">{c.name}</span>
                          </div>
                          <span className="text-[10px] text-stone-500 shrink-0 ml-1">
                            {c.region}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Tab Switch (Edit vs Preview) */}
          <div className="flex items-center gap-1 shrink-0">
            {mode === 'cv' ? (
              <>
                <button
                  type="button"
                  onClick={() => onTabChange('edit_cv')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'edit_cv'
                      ? 'bg-amber-600 text-white font-bold shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-300'
                  }`}
                >
                  Edit CV
                </button>
                <button
                  type="button"
                  onClick={() => onTabChange('preview_cv')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'preview_cv'
                      ? 'bg-amber-600 text-white font-bold shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-300'
                  }`}
                >
                  Preview CV
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => onTabChange('edit_letter')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'edit_letter'
                      ? 'bg-amber-600 text-white font-bold shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-300'
                  }`}
                >
                  Edit Letter
                </button>
                <button
                  type="button"
                  onClick={() => onTabChange('preview_letter')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'preview_letter'
                      ? 'bg-amber-600 text-white font-bold shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-300'
                  }`}
                >
                  Preview Letter
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

