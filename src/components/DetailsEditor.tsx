import React, { useState, useMemo } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe2,
  Calendar,
  FileCheck,
  ShieldCheck,
  Truck,
  Briefcase,
  Layers,
  Car,
  CreditCard,
  Search,
  CheckCircle2,
  Sparkles,
  Building,
  Flag,
} from 'lucide-react';
import { CandidateDetails, JobCategory, TargetCountry, CvStyle, CvPageCount, DocumentTheme } from '../types';
import { COUNTRIES_DATA, JOB_CATEGORIES } from '../data/internationalJobData';
import { DOCUMENT_THEMES } from '../data/themes';

interface DetailsEditorProps {
  details: CandidateDetails;
  onChange: (updated: Partial<CandidateDetails>) => void;
  onCountryChange: (country: TargetCountry) => void;
  onJobCategoryChange: (category: JobCategory, customTitle?: string) => void;
  onNavigateToLetterView: () => void;
  onNavigateToCvView?: () => void;
  pageCount?: CvPageCount;
  onPageCountChange?: (pages: CvPageCount) => void;
  onThemeChange?: (theme: DocumentTheme) => void;
}

export const DetailsEditor: React.FC<DetailsEditorProps> = ({
  details,
  onChange,
  onCountryChange,
  onJobCategoryChange,
  onNavigateToLetterView,
  onNavigateToCvView,
  pageCount = 2,
  onPageCountChange,
  onThemeChange,
}) => {
  const [countryFilter, setCountryFilter] = useState<'all' | 'schengen' | 'gulf' | 'global'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [customJobInput, setCustomJobInput] = useState('');

  const currentCountryInfo = COUNTRIES_DATA[details.targetCountry] || COUNTRIES_DATA.Other;

  // Filter countries based on region tab and search query
  const filteredCountries = useMemo(() => {
    const allCountryKeys = Object.keys(COUNTRIES_DATA) as TargetCountry[];
    return allCountryKeys.filter((countryKey) => {
      const info = COUNTRIES_DATA[countryKey];
      if (!info) return false;

      // Region Filter
      let matchesRegion = true;
      if (countryFilter === 'schengen') {
        matchesRegion = info.region === 'Schengen' || info.region === 'EU' || info.region === 'Non-EU Europe';
      } else if (countryFilter === 'gulf') {
        matchesRegion = info.region === 'Gulf';
      } else if (countryFilter === 'global') {
        matchesRegion = info.region === 'Asia-Pacific' || info.region === 'Global';
      }

      // Search Filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchesSearch =
          info.name.toLowerCase().includes(q) ||
          info.workPermitType.toLowerCase().includes(q) ||
          (info.keyHubs && info.keyHubs.some((hub) => hub.toLowerCase().includes(q)));
      }

      return matchesRegion && matchesSearch;
    });
  }, [countryFilter, searchQuery]);

  const activeCvStyle = details.cvStyle || 'european';

  return (
    <div className="space-y-6">
      {/* 1. Target Destination Country Selection with Scroll Bar Menu */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-amber-600" />
              <span>Target Destination Country</span>
            </label>
            <p className="text-[11px] text-stone-500">
              Browse all Schengen / European nations, Gulf (GCC) countries, and Global hubs.
            </p>
          </div>
          <span className="text-[11px] text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-medium shrink-0 self-start sm:self-auto">
            {Object.keys(COUNTRIES_DATA).length} Countries Available
          </span>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-lg text-xs font-medium mb-3 overflow-x-auto">
          <button
            type="button"
            onClick={() => setCountryFilter('all')}
            className={`px-3 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
              countryFilter === 'all'
                ? 'bg-white text-stone-900 font-bold shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Countries
          </button>
          <button
            type="button"
            onClick={() => setCountryFilter('schengen')}
            className={`px-3 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
              countryFilter === 'schengen'
                ? 'bg-white text-stone-900 font-bold shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🇪🇺 Schengen & Europe
          </button>
          <button
            type="button"
            onClick={() => setCountryFilter('gulf')}
            className={`px-3 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
              countryFilter === 'gulf'
                ? 'bg-white text-stone-900 font-bold shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🇦🇪 Gulf (GCC)
          </button>
          <button
            type="button"
            onClick={() => setCountryFilter('global')}
            className={`px-3 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
              countryFilter === 'global'
                ? 'bg-white text-stone-900 font-bold shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🌏 Asia-Pacific & Global
          </button>
        </div>

        {/* Search Box */}
        <div className="relative mb-3">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search country or city (e.g. Dubai, Poland, Germany, Qatar, Romania...)"
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900 bg-stone-50/50"
          />
        </div>

        {/* Scrollable Countries Menu */}
        <div className="max-h-64 overflow-y-auto pr-1 border border-stone-200 rounded-lg p-1.5 bg-stone-50/30 space-y-1 scrollbar-thin">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1.5">
            {filteredCountries.map((c) => {
              const isSelected = details.targetCountry === c;
              const info = COUNTRIES_DATA[c];
              if (!info) return null;

              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => onCountryChange(c)}
                  className={`p-2 rounded-lg border text-left transition-all flex items-start justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/90 ring-1 ring-amber-600 shadow-2xs'
                      : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base leading-none">{info.flag}</span>
                      <p className={`text-xs font-bold leading-tight truncate ${isSelected ? 'text-amber-950' : 'text-stone-900'}`}>
                        {info.name}
                      </p>
                    </div>
                    <p className="text-[10px] text-stone-500 truncate mt-1">
                      {info.workPermitType.split('(')[0]}
                    </p>
                  </div>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-semibold shrink-0 uppercase ${
                      info.region === 'Gulf'
                        ? 'bg-emerald-100 text-emerald-800'
                        : info.region === 'Schengen'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {info.region}
                  </span>
                </button>
              );
            })}
          </div>

          {filteredCountries.length === 0 && (
            <div className="text-center py-6 text-xs text-stone-500">
              No country found matching &ldquo;{searchQuery}&rdquo;. Try another name or select &ldquo;Other&rdquo;.
            </div>
          )}
        </div>

        {/* Custom Country Name Input if Other selected */}
        {details.targetCountry === 'Other' && (
          <div className="mt-3 pt-3 border-t border-stone-200">
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Specify Custom Country Name:
            </label>
            <input
              type="text"
              value={details.customCountryName || ''}
              onChange={(e) => onChange({ customCountryName: e.target.value })}
              placeholder="e.g. Luxembourg, Iceland, Brazil..."
              className="w-full text-xs p-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 text-stone-900"
            />
          </div>
        )}

        {/* Selected Country Permit Summary Card */}
        <div className="mt-3 p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-700 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-stone-900">{currentCountryInfo.flag} {currentCountryInfo.name} Work Permit:</span>
              <span className="font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 text-[11px]">
                {currentCountryInfo.workPermitType}
              </span>
            </div>
            <p className="text-stone-600 text-[11px] leading-relaxed">{currentCountryInfo.tips}</p>
            <div className="text-[10px] text-stone-500 flex items-center gap-1.5 flex-wrap">
              <strong>Major Logistics Hubs:</strong>
              <span>{currentCountryInfo.keyHubs?.join(' • ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Professional CV Styles Selector */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Professional CV Style Format</span>
            </label>
            <p className="text-[11px] text-stone-500">
              Select the formatting style standard for your target employer region.
            </p>
          </div>
          <span className="text-[11px] text-stone-500">3 Formats</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* European Style */}
          <button
            type="button"
            onClick={() => onChange({ cvStyle: 'european' })}
            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
              activeCvStyle === 'european'
                ? 'border-amber-600 bg-amber-50/80 ring-1 ring-amber-600 shadow-xs'
                : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm">🇪🇺</span>
              {activeCvStyle === 'european' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />}
            </div>
            <p className={`text-xs font-bold mt-1.5 ${activeCvStyle === 'european' ? 'text-amber-950' : 'text-stone-900'}`}>
              European Style
            </p>
            <p className="text-[10px] text-stone-500 mt-0.5 leading-snug">
              Europass 2-page standard, CEFR languages, white-bg photo & EU GDPR clause.
            </p>
          </button>

          {/* Gulf Style */}
          <button
            type="button"
            onClick={() => onChange({ cvStyle: 'gulf' })}
            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
              activeCvStyle === 'gulf'
                ? 'border-emerald-600 bg-emerald-50/80 ring-1 ring-emerald-600 shadow-xs'
                : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm">🇦🇪</span>
              {activeCvStyle === 'gulf' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            </div>
            <p className={`text-xs font-bold mt-1.5 ${activeCvStyle === 'gulf' ? 'text-emerald-950' : 'text-stone-900'}`}>
              Gulf Style (GCC)
            </p>
            <p className="text-[10px] text-stone-500 mt-0.5 leading-snug">
              UAE/Saudi/Qatar/Kuwait/Oman/Bahrain format with visa status & GCC license readiness.
            </p>
          </button>

          {/* Indian Corporate Style */}
          <button
            type="button"
            onClick={() => onChange({ cvStyle: 'indian' })}
            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
              activeCvStyle === 'indian'
                ? 'border-blue-600 bg-blue-50/80 ring-1 ring-blue-600 shadow-xs'
                : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm">🇮🇳</span>
              {activeCvStyle === 'indian' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
            </div>
            <p className={`text-xs font-bold mt-1.5 ${activeCvStyle === 'indian' ? 'text-blue-950' : 'text-stone-900'}`}>
              Indian Style
            </p>
            <p className="text-[10px] text-stone-500 mt-0.5 leading-snug">
              Comprehensive career objective, technical skills, personal particulars & formal declaration.
            </p>
          </button>
        </div>
      </div>

      {/* 3. Target Job Category Selection (Full List & Custom Manual Entry) */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-amber-600" />
            <span>Target Job Category & Custom Profession</span>
          </label>
          <span className="text-[11px] text-stone-500 font-medium">
            {JOB_CATEGORIES.length} Categories + Manual Input
          </span>
        </div>

        {/* Manual Custom Job Input Card */}
        <div className="p-3 bg-amber-50/70 border border-amber-300/80 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Add Custom Job / Profession Manually:</span>
            </span>
            <span className="text-[10px] text-amber-800 font-semibold bg-amber-100 px-2 py-0.5 rounded">
              Any Profession Supported
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={customJobInput}
              onChange={(e) => setCustomJobInput(e.target.value)}
              placeholder="e.g. Amazon Fulfillment Associate, HVAC Technician, Scaffolder, Barista..."
              className="flex-1 text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-stone-900 font-medium"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (customJobInput.trim()) {
                    onJobCategoryChange('custom', customJobInput.trim());
                    setCustomJobInput('');
                  }
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (customJobInput.trim()) {
                  onJobCategoryChange('custom', customJobInput.trim());
                  setCustomJobInput('');
                }
              }}
              className="px-3.5 py-2 rounded-lg text-xs font-bold bg-amber-700 hover:bg-amber-800 text-white shadow-2xs transition-colors shrink-0 cursor-pointer"
            >
              Apply Job
            </button>
          </div>
          <p className="text-[10px] text-amber-800/80 leading-tight">
            Currently targeting:{' '}
            <strong className="text-amber-950 underline">{details.targetJobTitle}</strong>.
            Typing any profession here customizes both your CV and Cover Letter.
          </p>
        </div>

        {/* Category Search Filter */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={jobSearchQuery}
            onChange={(e) => setJobSearchQuery(e.target.value)}
            placeholder="Search all job categories (e.g. driver, construction, helper, warehouse)..."
            className="w-full text-xs pl-8 pr-3 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50"
          />
        </div>

        {/* Job Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
          {JOB_CATEGORIES.filter((job) => {
            if (!jobSearchQuery.trim()) return true;
            const q = jobSearchQuery.toLowerCase();
            return (
              job.name.toLowerCase().includes(q) ||
              job.description.toLowerCase().includes(q) ||
              job.badge.toLowerCase().includes(q)
            );
          }).map((job) => {
            const isSelected = details.jobCategory === job.id;
            return (
              <button
                key={job.id}
                type="button"
                onClick={() => onJobCategoryChange(job.id)}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50/80 ring-1 ring-amber-600 shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? 'text-amber-950' : 'text-stone-900'}`}>
                    {job.name}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      isSelected ? 'bg-amber-200/60 text-amber-900' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {job.badge}
                  </span>
                </div>
                <p className="text-[10px] text-stone-500 mt-1 leading-tight">{job.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3b. Free Document Themes (6 Free Themes) */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Free Document Themes (CV & Cover Letter)</span>
          </label>
          <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
            6 Free Themes
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.values(DOCUMENT_THEMES).map((theme) => {
            const isSelected = (details.theme || 'classic_amber') === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => onThemeChange && onThemeChange(theme.id)}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-stone-900 bg-stone-50 ring-2 ring-stone-900 shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/60'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0 shadow-2xs"
                      style={{ backgroundColor: theme.swatchHex }}
                    />
                    <span className="text-xs font-bold text-stone-900 truncate">
                      {theme.name}
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500 line-clamp-2 leading-snug">
                    {theme.subtitle}
                  </p>
                </div>
                {isSelected && (
                  <span className="mt-2 inline-flex items-center gap-1 text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded self-start border border-emerald-200">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    Active Theme
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3c. CV Length & Page Count (2 to 5 Pages) */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>CV Document Length (Pages)</span>
          </label>
          <span className="text-[10px] text-stone-500 font-medium">
            Cover Letter = 1 Page Fixed
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {([2, 3, 4, 5] as CvPageCount[]).map((pages) => {
            const isSelected = pageCount === pages;
            const descriptions: Record<CvPageCount, string> = {
              2: 'Standard Europass Core Format',
              3: 'Includes Industrial Projects & Audits',
              4: 'Includes Multi-Facility Hubs & Hazmat',
              5: 'Master Dossier & Notarized Affidavit',
            };
            return (
              <button
                key={pages}
                type="button"
                onClick={() => onPageCountChange && onPageCountChange(pages)}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50 ring-1 ring-amber-600 shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? 'text-amber-950' : 'text-stone-900'}`}>
                    {pages} Pages
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  )}
                </div>
                <p className="text-[10px] text-stone-500 mt-0.5 leading-snug">
                  {descriptions[pages]}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Candidate Personal Details (100% Fully Accessible & Editable For Any Visitor) */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-600" />
              <span>Candidate Personal Information</span>
            </h3>
            <p className="text-[11px] text-stone-500">
              Enter your own name and contact details. Fully customizable for any applicant.
            </p>
          </div>
          <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
            100% Editable
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Full Name *</label>
            <div className="relative">
              <User className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={details.fullName}
                onChange={(e) => onChange({ fullName: e.target.value })}
                placeholder="e.g. John Doe / Rahul Sharma"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900 font-bold"
              />
            </div>
          </div>

          {/* Nationality */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Nationality & Citizenship *</label>
            <div className="relative">
              <Globe2 className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={details.nationality}
                onChange={(e) => onChange({ nationality: e.target.value })}
                placeholder="e.g. Indian Citizen"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900 font-medium"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400 pointer-events-none" />
              <input
                type="email"
                value={details.email}
                onChange={(e) => onChange({ email: e.target.value })}
                placeholder="e.g. yourname@email.com"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Phone / WhatsApp *</label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400 pointer-events-none" />
              <input
                type="tel"
                value={details.phone}
                onChange={(e) => onChange({ phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900"
              />
            </div>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Marital Status</label>
            <input
              type="text"
              value={details.maritalStatus}
              onChange={(e) => onChange({ maritalStatus: e.target.value })}
              placeholder="e.g. Unmarried (Single) / Married"
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900"
            />
          </div>

          {/* Father's Name / Guardian */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Father&apos;s Name / Guardian <span className="text-stone-400 font-normal">(Indian & Gulf CVs)</span>
            </label>
            <input
              type="text"
              value={details.fatherName || ''}
              onChange={(e) => onChange({ fatherName: e.target.value })}
              placeholder="e.g. Ram Sharma"
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900"
            />
          </div>

          {/* Current Address */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Current Residential Address</label>
            <input
              type="text"
              value={details.currentAddress}
              onChange={(e) => onChange({ currentAddress: e.target.value })}
              placeholder="House / Street details"
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900"
            />
          </div>

          {/* City / Country */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">City & Country of Residence</label>
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={details.cityCountry}
                onChange={(e) => onChange({ cityCountry: e.target.value })}
                placeholder="e.g. New Delhi, India"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Passport & Work Permit Verification */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-600" />
              <span>Passport & Verification Details</span>
            </h3>
            <p className="text-[11px] text-stone-500">
              International employers require these passport details to file visa / work permit petitions.
            </p>
          </div>
          <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
            For Work Permit
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Passport Number */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Passport Number *</label>
            <input
              type="text"
              value={details.passport.passportNumber}
              onChange={(e) =>
                onChange({
                  passport: { ...details.passport, passportNumber: e.target.value.toUpperCase() },
                })
              }
              placeholder="e.g. Z1234567"
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900 font-mono font-medium tracking-wider"
            />
          </div>

          {/* Place of Issue */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Place of Issue *</label>
            <input
              type="text"
              value={details.passport.placeOfIssue}
              onChange={(e) =>
                onChange({
                  passport: { ...details.passport, placeOfIssue: e.target.value },
                })
              }
              placeholder="e.g. Delhi, India"
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Date of Birth *</label>
            <input
              type="text"
              value={details.passport.dateOfBirth}
              onChange={(e) =>
                onChange({
                  passport: { ...details.passport, dateOfBirth: e.target.value },
                  dateOfBirth: e.target.value,
                })
              }
              placeholder="DD/MM/YYYY"
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900"
            />
          </div>

          {/* Issue Date */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Passport Issue Date</label>
            <input
              type="text"
              value={details.passport.issueDate}
              onChange={(e) =>
                onChange({
                  passport: { ...details.passport, issueDate: e.target.value },
                })
              }
              placeholder="DD/MM/YYYY"
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900"
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Passport Expiry Date</label>
            <input
              type="text"
              value={details.passport.expiryDate}
              onChange={(e) =>
                onChange({
                  passport: { ...details.passport, expiryDate: e.target.value },
                })
              }
              placeholder="DD/MM/YYYY"
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900"
            />
          </div>

          {/* Gulf Visa Status (Shown if Gulf style is active or Gulf country selected) */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Visa / Relocation Status</label>
            <input
              type="text"
              value={details.gulfVisaStatus || ''}
              onChange={(e) => onChange({ gulfVisaStatus: e.target.value })}
              placeholder="e.g. Employment Visa / Visit Visa / Immediate Relocation"
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900"
            />
          </div>
        </div>

        {/* Toggle Passport Info Box in Cover Letter */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <label className="text-xs font-medium text-stone-800 cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={details.showPassportInLetter}
              onChange={(e) => onChange({ showPassportInLetter: e.target.checked })}
              className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
            />
            <span>Display Passport & Candidate Verification Card in Cover Letter</span>
          </label>
        </div>
      </div>

      {/* 6. Target Employer & Job Specifics */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-600" />
            <span>Job Specifics & Recipient</span>
          </h3>
          <span className="text-[11px] text-stone-400">Customizable</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Target Job Title */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Target Job Title</label>
            <input
              type="text"
              value={details.targetJobTitle}
              onChange={(e) => onChange({ targetJobTitle: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900 font-medium"
            />
          </div>

          {/* Target Company */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Target Company / Recruitment Agency</label>
            <input
              type="text"
              value={details.targetCompany}
              onChange={(e) => onChange({ targetCompany: e.target.value })}
              placeholder="e.g. Logistics Recruitment Team / Hiring Company"
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900 font-medium"
            />
          </div>

          {/* Languages */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Languages Spoken</label>
            <input
              type="text"
              value={details.languages}
              onChange={(e) => onChange({ languages: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900"
            />
          </div>

          {/* Shift Preference */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Shift & Overtime Availability</label>
            <input
              type="text"
              value={details.shiftPreference}
              onChange={(e) => onChange({ shiftPreference: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900"
            />
          </div>
        </div>

        {/* Checkboxes: PCC ready, Medical ready, Driving/Forklift */}
        <div className="space-y-2 pt-2 border-t border-stone-100">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={details.pccReady}
              onChange={(e) => onChange({ pccReady: e.target.checked })}
              className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
            />
            <span className="text-xs font-medium text-stone-800">
              Police Clearance Certificate (PCC) & Clean Background Ready
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={details.hasDrivingLicense}
              onChange={(e) => onChange({ hasDrivingLicense: e.target.checked })}
              className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
            />
            <span className="text-xs font-medium text-stone-800">
              I hold a valid Driving License (Light / Heavy Motor Vehicle)
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={details.hasForkliftLicense}
              onChange={(e) => onChange({ hasForkliftLicense: e.target.checked })}
              className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
            />
            <span className="text-xs font-medium text-stone-800">
              Forklift / Material Handling Equipment Experience
            </span>
          </label>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onNavigateToLetterView}
          className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-black active:bg-stone-800 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <FileCheck className="w-4 h-4 text-amber-400" />
          <span>Preview Cover Letter</span>
        </button>

        <button
          type="button"
          onClick={onNavigateToCvView || onNavigateToLetterView}
          className="py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Briefcase className="w-4 h-4" />
          <span>Preview CV ({details.cvStyle ? details.cvStyle.toUpperCase() : 'EUROPEAN'} Style)</span>
        </button>
      </div>
    </div>
  );
};
