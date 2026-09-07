import React from 'react';
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
  HeartHandshake,
  Briefcase,
  Layers,
  Car,
  Award,
  CreditCard,
  CheckCircle2,
} from 'lucide-react';
import { CandidateDetails, JobCategory, TargetCountry } from '../types';
import { COUNTRIES_DATA, JOB_CATEGORIES } from '../data/internationalJobData';

interface DetailsEditorProps {
  details: CandidateDetails;
  onChange: (updated: Partial<CandidateDetails>) => void;
  onCountryChange: (country: TargetCountry) => void;
  onJobCategoryChange: (category: JobCategory) => void;
  onNavigateToLetterView: () => void;
  onNavigateToCvView?: () => void;
}

export const DetailsEditor: React.FC<DetailsEditorProps> = ({
  details,
  onChange,
  onCountryChange,
  onJobCategoryChange,
  onNavigateToLetterView,
  onNavigateToCvView,
}) => {
  const currentCountryInfo = COUNTRIES_DATA[details.targetCountry] || COUNTRIES_DATA.Other;

  // Highlighted European countries
  const featuredCountries: TargetCountry[] = [
    'Poland',
    'Turkey',
    'Greece',
    'Germany',
    'Romania',
    'Czech Republic',
    'Hungary',
    'Croatia',
    'Albania',
    'Lithuania',
    'Slovakia',
    'Italy',
    'Portugal',
    'Spain',
    'Other',
  ];

  return (
    <div className="space-y-6">
      {/* Target Destination Country Selection */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Target Destination Country (Europe, Eurasia & Singapore)</span>
          </label>
          <span className="text-[11px] text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-medium">
            International Work Permit Sponsorship
          </span>
        </div>

        {/* Responsive grid of countries */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
          {featuredCountries.map((c) => {
            const isSelected = details.targetCountry === c;
            const info = COUNTRIES_DATA[c] || COUNTRIES_DATA.Other;
            return (
              <button
                key={c}
                type="button"
                onClick={() => onCountryChange(c)}
                className={`p-2 rounded-lg border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50/90 ring-1 ring-amber-600 shadow-2xs'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-base">{info.flag}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-amber-600"></span>}
                </div>
                <div className="mt-1">
                  <p className={`text-xs font-bold leading-tight ${isSelected ? 'text-amber-950' : 'text-stone-900'}`}>
                    {c}
                  </p>
                  <p className="text-[10px] text-stone-500 truncate mt-0.5">
                    {c === 'Poland'
                      ? 'Type A Permit'
                      : c === 'Singapore'
                      ? 'MOM Permit / IPA'
                      : c === 'Turkey'
                      ? 'Çalışma İzni'
                      : c === 'Greece'
                      ? 'Metaklisi D-Visa'
                      : c === 'Germany'
                      ? 'BA Approval'
                      : c === 'Romania'
                      ? 'Aviz de Muncă'
                      : c === 'Czech Republic'
                      ? 'Zaměstnanecká'
                      : c === 'Croatia'
                      ? 'MUP Permit'
                      : c === 'Hungary'
                      ? 'Guest Worker'
                      : c === 'Albania'
                      ? 'Leje Pune'
                      : 'National Visa'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom Country Name Input if Other selected */}
        {details.targetCountry === 'Other' && (
          <div className="mt-3 pt-3 border-t border-stone-200">
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Specify Destination Country Name:
            </label>
            <input
              type="text"
              value={details.customCountryName || ''}
              onChange={(e) => onChange({ customCountryName: e.target.value })}
              placeholder="e.g. Austria, Belgium, Sweden, Ireland..."
              className="w-full text-xs p-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500"
            />
          </div>
        )}

        {/* Selected Country Permit Notice */}
        <div className="mt-3 p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-700 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-stone-900">{currentCountryInfo.name} Work Permit Pathway:</span>
              <span className="font-medium text-emerald-800">{currentCountryInfo.workPermitType}</span>
            </div>
            <p className="text-stone-600 mt-1">{currentCountryInfo.tips}</p>
            <div className="mt-1 text-[11px] text-stone-500 flex items-center gap-1.5">
              <strong>Major Logistics Hubs:</strong>
              <span>{currentCountryInfo.keyHubs?.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Job Category Selection */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-amber-600" />
            <span>Select Target Job Category</span>
          </label>
          <span className="text-[11px] text-stone-500">5 Essential Categories</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {JOB_CATEGORIES.map((job) => {
            const isSelected = details.jobCategory === job.id;
            return (
              <button
                key={job.id}
                type="button"
                onClick={() => onJobCategoryChange(job.id)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50/80 ring-1 ring-amber-600 shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? 'text-amber-950' : 'text-stone-900'}`}>
                    {job.name}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    isSelected ? 'bg-amber-200/60 text-amber-900' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {job.badge}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1 leading-snug">{job.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Manual Passport & Travel Identity Details */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-amber-600" />
            <span>Passport & Verification Details (Fill Manually)</span>
          </h3>
          <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
            For Work Permit
          </span>
        </div>

        <p className="text-xs text-stone-600">
          European employers and immigration agencies in <strong>{details.targetCountry}</strong> require these passport details to initiate work permit applications. You can edit them manually below:
        </p>

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
              placeholder="DD/MM/YYYY (Min 2 yrs recommended)"
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900"
            />
          </div>

          {/* Marital Status (Unmarried) */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Marital Status (Fixed)</label>
            <input
              type="text"
              value={details.maritalStatus}
              onChange={(e) => onChange({ maritalStatus: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 bg-stone-50 font-medium text-stone-800"
            />
          </div>
        </div>

        {/* Toggle Passport Info Box in Cover Letter */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div>
            <label className="text-xs font-medium text-stone-800 cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={details.showPassportInLetter}
                onChange={(e) => onChange({ showPassportInLetter: e.target.checked })}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
              />
              <span>Display Passport & Candidate Verification Card in Letter</span>
            </label>
            <p className="text-[11px] text-stone-500 pl-5">
              Enables HR and recruiters in {details.targetCountry} to immediately review your passport details for permit sponsorship.
            </p>
          </div>
        </div>
      </div>

      {/* Candidate Personal Contact Details */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-2">
            <User className="w-4 h-4 text-amber-600" />
            <span>Candidate Contact & Profile</span>
          </h3>
          <span className="text-[11px] text-stone-400">Fixed & Editable</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={details.fullName}
                onChange={(e) => onChange({ fullName: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900 font-bold"
              />
            </div>
          </div>

          {/* Nationality */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Nationality & Citizenship</label>
            <div className="relative">
              <Globe2 className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={details.nationality}
                onChange={(e) => onChange({ nationality: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-200 bg-stone-50 text-stone-900 font-semibold"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400 pointer-events-none" />
              <input
                type="email"
                value={details.email}
                onChange={(e) => onChange({ email: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Phone / WhatsApp Number</label>
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
                placeholder="New Delhi, India"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Target Employer & Readiness Preferences */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-600" />
            <span>Job Specifics & Target Recipient</span>
          </h3>
          <span className="text-[11px] text-stone-400">Customizable</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Target Job Title */}
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Specific Job Title in Letter</label>
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
              placeholder="e.g. Amazon Poland Sp. z o.o. / Logistics Recruitment Team"
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
              I hold a valid Driving License (Useful for Delivery & Mobile Helper roles)
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

      {/* Navigation Buttons: Cover Letter or CV View */}
      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onNavigateToLetterView}
          className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-black active:bg-stone-800 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
        >
          <FileCheck className="w-4 h-4 text-amber-400" />
          <span>Proceed to Cover Letter & Download</span>
        </button>

        <button
          type="button"
          onClick={onNavigateToCvView || onNavigateToLetterView}
          className="py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Briefcase className="w-4 h-4" />
          <span>Proceed to CV (Curriculum Vitae)</span>
        </button>
      </div>
    </div>
  );
};
