export type TargetCountry =
  | 'Poland'
  | 'Singapore'
  | 'Turkey'
  | 'Greece'
  | 'Romania'
  | 'Czech Republic'
  | 'Germany'
  | 'Hungary'
  | 'Croatia'
  | 'Albania'
  | 'Lithuania'
  | 'Slovakia'
  | 'Italy'
  | 'Portugal'
  | 'Spain'
  | 'Other';

export type JobCategory =
  | 'warehouse_worker'
  | 'helper'
  | 'fulfillment'
  | 'logistics'
  | 'delivery';

export type DocumentType = 'cover_letter' | 'cv';

export interface PassportDetails {
  passportNumber: string;
  issueDate: string;
  expiryDate: string;
  placeOfIssue: string;
  dateOfBirth: string;
}

export interface CandidateDetails {
  // Fixed & Personal Details
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  maritalStatus: string;
  dateOfBirth: string;
  currentAddress: string;
  cityCountry: string;

  // Passport info manually editable
  passport: PassportDetails;
  showPassportInLetter: boolean;

  // Work Permit & Relocation Profile
  visaStatus: string;
  targetCountry: TargetCountry;
  customCountryName?: string;
  jobCategory: JobCategory;
  targetJobTitle: string;
  targetCompany: string;
  targetCity: string;
  languages: string;
  shiftPreference: string;
  date: string;

  // Skills & Readiness
  hasDrivingLicense: boolean;
  drivingLicenseDetails: string;
  hasForkliftLicense: boolean;
  forkliftDetails: string;
  immediateRelocation: boolean;
  pccReady: boolean;
  includeRodoClause: boolean;
}

export interface LetterContent {
  salutation: string;
  paragraph1_intro: string;
  paragraph2_experience: string;
  paragraph3_skills_safety: string;
  paragraph4_eligibility_shifts: string;
  paragraph5_closing: string;
  signOff: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  responsibilities: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  year: string;
  details?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: string;
  levelBadge: string;
}

export interface CvContent {
  headline: string;
  professionalSummary: string;
  photoUrl?: string;
  showPhoto: boolean;
  photoWhiteBackground: boolean;
  experiences: WorkExperience[];
  education: EducationItem[];
  operationalSkills: string[];
  equipmentSkills?: string[];
  personalStrengths: string[];
  languages: LanguageItem[];
  certifications: string[];
  driverLicense: string;
  showPassportBox: boolean;
  showReadinessBadges: boolean;
  gdprClause: string;
  references?: string;
}

export interface CountryInfo {
  name: TargetCountry;
  flag: string;
  workPermitType: string;
  keyHubs: string[];
  visaProcessingTime: string;
  tips: string;
  region: 'Schengen' | 'EU' | 'Eurasia' | 'Non-EU Europe' | 'Asia-Pacific';
  gdprTitle: string;
  gdprText: string;
}

