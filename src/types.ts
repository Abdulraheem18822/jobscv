export type CvStyle = 'european' | 'gulf' | 'indian';

export type TargetCountry =
  // Schengen & EU
  | 'Poland'
  | 'Germany'
  | 'Czech Republic'
  | 'Romania'
  | 'Greece'
  | 'Hungary'
  | 'Croatia'
  | 'Italy'
  | 'Spain'
  | 'Portugal'
  | 'France'
  | 'Netherlands'
  | 'Austria'
  | 'Belgium'
  | 'Sweden'
  | 'Denmark'
  | 'Finland'
  | 'Norway'
  | 'Switzerland'
  | 'Lithuania'
  | 'Latvia'
  | 'Estonia'
  | 'Slovakia'
  | 'Slovenia'
  | 'Bulgaria'
  | 'Cyprus'
  | 'Malta'
  | 'Albania'
  | 'Serbia'
  | 'United Kingdom'
  | 'Ireland'
  // Gulf & Middle East (GCC)
  | 'United Arab Emirates'
  | 'Saudi Arabia'
  | 'Qatar'
  | 'Kuwait'
  | 'Oman'
  | 'Bahrain'
  | 'Turkey'
  // Asia-Pacific & Global
  | 'Singapore'
  | 'Malaysia'
  | 'Japan'
  | 'South Korea'
  | 'Canada'
  | 'Australia'
  | 'New Zealand'
  | 'United States'
  | 'Other';

export type JobCategory =
  | 'warehouse_worker'
  | 'helper'
  | 'fulfillment'
  | 'logistics'
  | 'delivery'
  | 'driver'
  | 'construction'
  | 'cleaning'
  | 'hospitality'
  | 'manufacturing'
  | 'welder'
  | 'electrician'
  | 'agriculture'
  | 'retail'
  | 'security'
  | 'custom';

export type DocumentTheme =
  | 'classic_amber'
  | 'modern_navy'
  | 'emerald_gcc'
  | 'monochrome'
  | 'burgundy'
  | 'nordic_slate';

export type CvPageCount = 2 | 3 | 4 | 5;

export type DocumentType = 'cover_letter' | 'cv';

export interface PassportDetails {
  passportNumber: string;
  issueDate: string;
  expiryDate: string;
  placeOfIssue: string;
  dateOfBirth: string;
}

export interface CandidateDetails {
  // Personal Details (100% Fully Editable)
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  maritalStatus: string;
  dateOfBirth: string;
  currentAddress: string;
  cityCountry: string;

  // Additional style & visual customization
  fatherName?: string;
  religion?: string;
  cvStyle?: CvStyle;
  theme?: DocumentTheme;
  gulfVisaStatus?: string;
  hasGulfLicense?: boolean;
  gulfLicenseDetails?: string;

  // Passport info manually editable
  passport: PassportDetails;
  showPassportInLetter: boolean;

  // Work Permit & Relocation Profile
  visaStatus: string;
  targetCountry: TargetCountry;
  customCountryName?: string;
  jobCategory: JobCategory;
  targetJobTitle: string;
  customJobTitle?: string;
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

export interface CvProjectItem {
  id: string;
  title: string;
  clientOrFacility: string;
  duration: string;
  highlights: string[];
}

export interface CvDeploymentItem {
  id: string;
  location: string;
  role: string;
  duration: string;
  details: string;
}

export interface CvContent {
  style?: CvStyle;
  pageCount?: CvPageCount;
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
  // Font and layout download settings
  fontFamily?: 'times' | 'sans' | 'serif';
  headerLayout?: 'center_face' | 'split';
  sideMarginMm?: number;
  // Gulf style specific declarations
  gulfDeclaration?: string;
  // Indian style specific declaration
  indianDeclaration?: string;
  // Extra pages content for 3, 4, and 5-page CVs
  projects?: CvProjectItem[];
  deployments?: CvDeploymentItem[];
  vocationalTrainings?: string[];
  safetyProtocols?: string[];
}

export interface CountryInfo {
  name: TargetCountry;
  flag: string;
  workPermitType: string;
  keyHubs: string[];
  visaProcessingTime: string;
  tips: string;
  region: 'Schengen' | 'EU' | 'Eurasia' | 'Non-EU Europe' | 'Gulf' | 'Asia-Pacific' | 'Global';
  gdprTitle: string;
  gdprText: string;
}

