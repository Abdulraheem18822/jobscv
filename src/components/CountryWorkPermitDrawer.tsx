import React from 'react';
import {
  HelpCircle,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Globe2,
  FileCheck,
  AlertTriangle,
  Building,
} from 'lucide-react';
import { TargetCountry } from '../types';
import { COUNTRIES_DATA } from '../data/internationalJobData';

interface CountryWorkPermitDrawerProps {
  country: TargetCountry;
}

export const CountryWorkPermitDrawer: React.FC<CountryWorkPermitDrawerProps> = ({ country }) => {
  const info = COUNTRIES_DATA[country];

  return (
    <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-2xs space-y-4 no-print">
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{info.flag}</span>
          <h3 className="text-sm font-semibold text-stone-900">
            {country} Work Permit & Hiring Guide for Indian Citizens
          </h3>
        </div>
        <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 font-medium">
          Non-EU Guide
        </span>
      </div>

      {/* Key Permit Pathway Card */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 text-xs space-y-2 text-stone-800">
        <p className="font-semibold text-amber-950 flex items-center gap-1.5">
          <FileCheck className="w-3.5 h-3.5 text-amber-700" />
          <span>Required Work Authorization: {info.workPermitType}</span>
        </p>
        <p className="text-stone-700 leading-relaxed text-[11px]">
          {info.tips}
        </p>
        <div className="flex items-center justify-between text-[11px] text-stone-600 pt-1 border-t border-amber-200/50">
          <span>Processing Timeline: <strong>{info.visaProcessingTime}</strong></span>
        </div>
      </div>

      {/* Checklist for Indian Candidates */}
      <div className="space-y-2.5 text-xs">
        <h4 className="font-semibold text-stone-800 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Non-EU Candidate Checklist for {country}</span>
        </h4>

        <div className="bg-stone-50 rounded-lg p-3 space-y-2 border border-stone-200/70 text-[11px] text-stone-700">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Original Indian Passport:</strong> Must have at least 1 to 2 years of remaining validity and at least 2–3 blank visa pages.
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Police Clearance Certificate (PCC):</strong> Issued by Regional Passport Office (RPO) / Passport Seva Kendra (PSK) in India, usually authenticated/apostilled by the Ministry of External Affairs (MEA).
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Medical Fitness Certificate:</strong> Showing fit for physical warehouse handling, heavy lifting, and standing shifts.
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Unmarried Status Benefit:</strong> European employers offering hostel/dormitory staff accommodation usually prefer single candidates due to single-occupancy worker facilities.
            </div>
          </div>
        </div>
      </div>

      {/* Country Logistics Hubs */}
      <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/70 text-xs">
        <p className="font-semibold text-stone-800 flex items-center gap-1.5 mb-1.5">
          <Building className="w-3.5 h-3.5 text-stone-600" />
          <span>Major Logistics & Warehousing Hubs in {country}:</span>
        </p>
        <div className="flex flex-wrap gap-1.5">
          {info.keyHubs.map((hub, idx) => (
            <span key={idx} className="bg-white border border-stone-200 px-2 py-0.5 rounded text-[11px] text-stone-700">
              {hub}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
