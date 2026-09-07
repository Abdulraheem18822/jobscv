import {
  CandidateDetails,
  CountryInfo,
  CvContent,
  JobCategory,
  LetterContent,
  TargetCountry,
} from '../types';
import { DEFAULT_WHITE_BG_PASSPORT_PHOTO } from '../utils/defaultPhoto';

export const COUNTRIES_DATA: Record<TargetCountry, CountryInfo> = {
  Poland: {
    name: 'Poland',
    flag: '🇵🇱',
    region: 'Schengen',
    workPermitType: 'Type A Work Permit (Zezwolenie na pracę typu A / Oświadczenie)',
    keyHubs: ['Wrocław', 'Poznań', 'Warsaw', 'Katowice / Sosnowiec', 'Łódź', 'Szczecin'],
    visaProcessingTime: 'Approx. 4–10 weeks for Voivodeship permit',
    tips: 'Poland is a premier logistics hub in Central Europe with major facilities (Amazon, DHL, InPost, DPD). Employers require valid passport and PCC for work permit submission.',
    gdprTitle: 'Polish Employment GDPR / RODO Clause',
    gdprText:
      'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji (zgodnie z ustawą z dnia 10 maja 2018 roku o ochronie danych osobowych (Dz. Ustaw z 2018, poz. 1000) oraz zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO)).',
  },
  Singapore: {
    name: 'Singapore',
    flag: '🇸🇬',
    region: 'Asia-Pacific',
    workPermitType: 'MOM Work Permit (Indian / Non-Traditional Source Worker) & S Pass',
    keyHubs: ['Changi Airfreight Centre', 'Jurong Port Logistics Hub', 'Tuas Industrial Hub', 'Pioneer & Clementi Logistics Parks', 'Greenwich Drive Hub'],
    visaProcessingTime: 'Approx. 2–5 weeks via Ministry of Manpower (MOM WP Online / In-Principle Approval - IPA)',
    tips: 'Singapore requires an In-Principle Approval (IPA) letter issued by the Ministry of Manpower (MOM) prior to departure. Employers sponsor security bond, medical checkup, and housing. Workers must pass medical screening in Singapore and follow Workplace Safety and Health (WSH) guidelines.',
    gdprTitle: 'Singapore Personal Data Protection Act (PDPA 2012) Consent',
    gdprText:
      'I hereby authorize prospective employers and recruitment agencies in Singapore to collect, use, and process my personal data in accordance with the Singapore Personal Data Protection Act 2012 (PDPA) for the purpose of recruitment evaluation, background verification, and Ministry of Manpower (MOM) Work Permit / In-Principle Approval (IPA) application.',
  },
  Turkey: {
    name: 'Turkey',
    flag: '🇹🇷',
    region: 'Eurasia',
    workPermitType: 'Foreigner Work Permit (Yabancı Çalışma İzni via Ministry of Labour - ÇSGB)',
    keyHubs: ['Istanbul (European/Asian sides)', 'Kocaeli (Gebze Logistics Zone)', 'Bursa', 'Izmir', 'Ankara', 'Mersin Port'],
    visaProcessingTime: 'Approx. 30–45 days via Turkish Ministry of Labour & Consular Reference Code',
    tips: 'Turkey is a transcontinental manufacturing, freight and cross-docking hub between Europe and Asia. Non-EU applicants obtain a 16-digit Reference Code from Turkish Consulates to enable employer work permit applications.',
    gdprTitle: 'Turkish Personal Data Protection (KVKK) Clause',
    gdprText:
      '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, iş başvurusu ve vize/çalışma izni süreçlerinin yürütülmesi amacıyla kişisel verilerimin işlenmesine ve ilgili işveren/yetkili kurumlarla paylaşılmasına muvafakat ederim.',
  },
  Greece: {
    name: 'Greece',
    flag: '🇬🇷',
    region: 'Schengen',
    workPermitType: 'National Type D Visa for Dependent Employment (Metaklisi / Law 4251/2014 & Law 5038/2023)',
    keyHubs: ['Athens (Aspropyrgos Logistics Hub)', 'Thessaloniki (Sindos Industrial Area)', 'Piraeus Port Corridor', 'Patras', 'Larissa'],
    visaProcessingTime: 'Approx. 45–75 days through decentralized administrative labor quotas (Metaklisi)',
    tips: 'Greece offers bilateral employer-sponsored third-country national work entry in warehouse logistics, packaging, agricultural supply chain, and transport hubs. Piraeus and Aspropyrgos have high demand for container loaders and warehouse handlers.',
    gdprTitle: 'Greek Employment GDPR Declaration (Law 4624/2019 & EU 2016/679)',
    gdprText:
      'I hereby authorize the processing of my personal data for recruitment, selection, and employment visa sponsorship purposes in Greece pursuant to EU Regulation 2016/679 (GDPR) and Greek Law 4624/2019.',
  },
  Romania: {
    name: 'Romania',
    flag: '🇷🇴',
    region: 'Schengen',
    workPermitType: 'Work Authorization Notice (Aviz de Muncă) via IGI',
    keyHubs: ['Bucharest', 'Cluj-Napoca', 'Timișoara', 'Ploiești', 'Brașov', 'Constanța'],
    visaProcessingTime: 'Approx. 30–60 days for IGI work notice + D/AM employment visa',
    tips: 'Romania welcomes over 100,000 Non-EU contingent workers annually in warehousing, manufacturing, and retail fulfillment with structured employer work permit quotas and hostel accommodations.',
    gdprTitle: 'Romanian Employment GDPR Clause (Law 190/2018 & EU 2016/679)',
    gdprText:
      'Îmi exprim acordul cu privire la prelucrarea datelor mele cu caracter personal în scopul recrutării și obținerii avizului de muncă, în conformitate cu Regulamentul (UE) 2016/679 (GDPR) și Legea nr. 190/2018.',
  },
  'Czech Republic': {
    name: 'Czech Republic',
    flag: '🇨🇿',
    region: 'Schengen',
    workPermitType: 'Employee Card (Zaměstnanecká Karta) / Work Permit (Úřad práce)',
    keyHubs: ['Prague Region (Jirny / Říčany)', 'Brno', 'Plzeň (CTPark)', 'Ostrava', 'Pardubice'],
    visaProcessingTime: 'Approx. 60–90 days for Employment Card processing',
    tips: 'Czechia features major Central European industrial parks (CTPark, Prologis, P3) with substantial demand for physically fit warehouse operatives and order fulfillment staff.',
    gdprTitle: 'Czech GDPR Employment Consent (Act No. 110/2019 Coll. & GDPR)',
    gdprText:
      'Souhlasím se zpracováním svých osobních údajů pro účely výběrového řízení a vyřízení zaměstnanecké karty v souladu s Nařízením Evropského parlamentu a Rady (EU) 2016/679 (GDPR) a zákonem č. 110/2019 Sb.',
  },
  Germany: {
    name: 'Germany',
    flag: '🇩🇪',
    region: 'Schengen',
    workPermitType: 'Skilled & Logistics Worker Visa / Federal Employment Agency Approval (BA / Section 18 AufenthG)',
    keyHubs: ['Frankfurt am Main (CargoCity)', 'Duisburg (Logport)', 'Hamburg', 'Munich', 'Leipzig / Halle (DHL Hub)', 'Nuremberg'],
    visaProcessingTime: 'Approx. 6–12 weeks through German Missions & Bundesagentur für Arbeit approval',
    tips: 'Germany is Europe’s largest logistics market. Demand is strong for warehouse pickers, parcel sorters, and logistics operatives willing to work night shifts and rotating rosters.',
    gdprTitle: 'German Employment GDPR Consent (BDSG § 26 & Art. 6 DSGVO)',
    gdprText:
      'Ich willige ein, dass meine personenbezogenen Daten zum Zweck der Durchführung des Bewerbungsverfahrens und der Visumbeantragung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 26 BDSG verarbeitet werden.',
  },
  Hungary: {
    name: 'Hungary',
    flag: '🇭🇺',
    region: 'Schengen',
    workPermitType: 'Guest Worker Residence Permit for Employment (Vendégmunkás-tartózkodási engedély)',
    keyHubs: ['Budapest (Biatorbágy / Üllő / Szigetszentmiklós logistics belt)', 'Debrecen', 'Győr', 'Kecskemét'],
    visaProcessingTime: 'Approx. 30–50 days through OIF (National Directorate-General for Aliens Policing)',
    tips: 'Hungary has an established guest worker framework for South Asian / Indian workers in manufacturing, e-commerce warehousing, and logistics parks.',
    gdprTitle: 'Hungarian GDPR Employment Declaration',
    gdprText:
      'Hozzájárulok ahhoz, hogy személyes adataimat a toborzási folyamat és a munkavállalási engedély ügyintézése céljából a 2016/679/EU rendelet (GDPR) előírásainak megfelelően kezeljék.',
  },
  Croatia: {
    name: 'Croatia',
    flag: '🇭🇷',
    region: 'Schengen',
    workPermitType: 'Stay and Work Permit (Dozvola za boravak i rad via MUP & HZZ)',
    keyHubs: ['Zagreb Logistics Zone (Sveta Nedelja / Rugvica)', 'Rijeka Port', 'Split', 'Varaždin', 'Osijek'],
    visaProcessingTime: 'Approx. 40–70 days via Croatian Ministry of Interior (MUP) & Labor Market Test exemption',
    tips: 'Croatia has become one of the top Mediterranean EU destinations recruiting tens of thousands of Indian workers for logistics, construction, storage, and food manufacturing.',
    gdprTitle: 'Croatian GDPR Data Processing Consent',
    gdprText:
      'Dajem privolu za obradu mojih osobnih podataka u svrhu zapošljavanja i podnošenja zahtjeva za boravišnu i radnu dozvolu u skladu s Uredbom (EU) 2016/679 (GDPR).',
  },
  Albania: {
    name: 'Albania',
    flag: '🇦🇱',
    region: 'Non-EU Europe',
    workPermitType: 'Single Permit for Work & Residence (Leje Pune e Integruar via e-Albania)',
    keyHubs: ['Tirana Logistics Parks', 'Durrës Port Zone', 'Shkodër', 'Vlorë'],
    visaProcessingTime: 'Approx. 20–45 days via e-Albania electronic permit service',
    tips: 'Albania features simplified digital e-permits with fast turnaround for foreign workers across wholesale distribution, port cargo, and industrial warehousing.',
    gdprTitle: 'Albanian Personal Data Protection Consent (Law No. 9887)',
    gdprText:
      'Deklaroj pëlqimin tim për përpunimin e të dhënave të mia personale për qëllime rekrutimi dhe procedurash për leje pune sipas Ligjit Nr. 9887 "Për mbrojtjen e të dhënave personale".',
  },
  Lithuania: {
    name: 'Lithuania',
    flag: '🇱🇹',
    region: 'Schengen',
    workPermitType: 'National D Visa & Temporary Residence Permit for Work (Užimtumo Tarnyba)',
    keyHubs: ['Vilnius (Gariūnai / Logistics corridor)', 'Kaunas (Free Economic Zone)', 'Klaipėda Port'],
    visaProcessingTime: 'Approx. 30–60 days through Employment Service and MIGRIS',
    tips: 'Lithuania is a central European transport & haulage hub with significant warehousing hubs catering to Scandinavian and European freight lanes.',
    gdprTitle: 'Lithuanian GDPR Consent Clause',
    gdprText:
      'Sutinku, kad mano asmens duomenys būtų tvarkomi atrankos ir darbo leidimo gavimo tikslais pagal Bendrąjį duomenų apsaugos reglamentą (ES) 2016/679 (BDAR).',
  },
  Slovakia: {
    name: 'Slovakia',
    flag: '🇸🇰',
    region: 'Schengen',
    workPermitType: 'Single Permit for Residence & Employment (Prechodný pobyt na účel zamestnania)',
    keyHubs: ['Bratislava Region (Senec Logistics Hub)', 'Trnava', 'Nitra', 'Žilina', 'Košice'],
    visaProcessingTime: 'Approx. 60–90 days through Foreign Police (Cudzinecká polícia)',
    tips: 'Slovakia’s Senec hub is one of the largest warehouse clusters in Central Europe, hosting major retail distribution centers requiring order pickers, material handlers, and sorters.',
    gdprTitle: 'Slovak GDPR Employment Declaration',
    gdprText:
      'Súhlasím so spracovaním svojich osobných údajov pre účely výberového konania a udelenia prechodného pobytu na účel zamestnania v zmysle Nariadenia (EÚ) 2016/679 (GDPR).',
  },
  Italy: {
    name: 'Italy',
    flag: '🇮🇹',
    region: 'Schengen',
    workPermitType: 'Decreto Flussi Work Authorization (Nulla Osta al Lavoro subordinato)',
    keyHubs: ['Milan Logistics Belt (Agrate / Piacenza / Novara)', 'Bologna Freight Village (Interporto)', 'Verona', 'Rome'],
    visaProcessingTime: 'Based on annual government decree quotas & Sportello Unico per l’Immigrazione',
    tips: 'Italy’s Northern logistics quadrant (Piacenza, Bologna, Novara) handles massive containerized cargo and e-commerce distribution with strong demand for logistics assistants.',
    gdprTitle: 'Italian GDPR Consent (D.Lgs. 196/2003 & EU 2016/679)',
    gdprText:
      'Autorizzo il trattamento dei miei dati personali ai sensi del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003 ai fini delle attività di selezione e pratiche di visto lavorativo.',
  },
  Portugal: {
    name: 'Portugal',
    flag: '🇵🇹',
    region: 'Schengen',
    workPermitType: 'Subordinate Work Visa (Visto D1) / Work Residence Permit (AIMA)',
    keyHubs: ['Lisbon Region (Azambuja / Vila Franca de Xira)', 'Porto', 'Setúbal', 'Leiria'],
    visaProcessingTime: 'Approx. 45–90 days through AIMA and Portuguese Consulates',
    tips: 'Portugal actively employs foreign workers in logistics parks, distribution hubs, port storage, and agriculture, offering clear residency pathways for dedicated workers.',
    gdprTitle: 'Portuguese GDPR Consent Declaration',
    gdprText:
      'Autorizo o tratamento dos meus dados pessoais para efeitos de recrutamento e instrução de visto de trabalho, nos termos do Regulamento (UE) 2016/679 (RGPD).',
  },
  Spain: {
    name: 'Spain',
    flag: '🇪🇸',
    region: 'Schengen',
    workPermitType: 'Work and Residence Visa for Employed Worker (Cuenta Ajena via Extranjería)',
    keyHubs: ['Madrid Logistics Corridor (Henares Valley / Guadalajara)', 'Barcelona (Zona Franca / El Prat)', 'Valencia', 'Zaragoza (PLAZA)'],
    visaProcessingTime: 'Approx. 60–90 days via Provincial Foreigners Office (Oficina de Extranjería)',
    tips: 'Spain’s Zaragoza (PLAZA) and Madrid-Henares corridors are among Europe’s largest dry ports and logistics hubs, employing thousands in parcel fulfillment and container staging.',
    gdprTitle: 'Spanish Data Protection & GDPR Clause (LOPDGDD 3/2018 & GDPR)',
    gdprText:
      'Doy mi consentimiento para el tratamiento de mis datos personales para fines de selección de personal y tramitación de visado de trabajo de acuerdo con el Reglamento (UE) 2016/679 y la Ley Orgánica 3/2018.',
  },
  Other: {
    name: 'Other',
    flag: '🌐',
    region: 'EU',
    workPermitType: 'National Work Permit & Residence Visa for Non-EU Employment',
    keyHubs: ['European Transport & Distribution Corridors', 'Industrial Zones'],
    visaProcessingTime: 'Standard Non-EU consular procedure (approx. 30–90 days)',
    tips: 'Ensure your passport has at least 1–2 years validity and all educational and police clearance documents are duly authenticated and apostilled.',
    gdprTitle: 'General European Union GDPR Declaration (EU 2016/679)',
    gdprText:
      'I hereby give consent for my personal data included in my application documents to be processed for the purposes of the recruitment process and visa sponsorship under Regulation (EU) 2016/679 of the European Parliament and of the Council (GDPR).',
  },
};

export const INITIAL_CANDIDATE_DETAILS: CandidateDetails = {
  fullName: 'Abdul Raheem',
  email: 'abdulraheem18822@gmail.com',
  phone: '+91 00000 00000',
  nationality: 'Indian Citizen (Non-EU)',
  maritalStatus: 'Unmarried (Single)',
  dateOfBirth: '15/08/1998',
  currentAddress: 'House No. 124, Street Road',
  cityCountry: 'New Delhi, India',

  passport: {
    passportNumber: 'Z1234567',
    issueDate: '10/01/2022',
    expiryDate: '09/01/2032',
    placeOfIssue: 'Delhi, India',
    dateOfBirth: '15/08/1998',
  },
  showPassportInLetter: true,

  visaStatus: 'Non-EU Indian Citizen seeking Work Permit & Visa Sponsorship (Documents Ready)',
  targetCountry: 'Poland',
  jobCategory: 'warehouse_worker',
  targetJobTitle: 'Warehouse Worker / Warehouse Operative',
  targetCompany: 'Hiring Company / Logistics Recruitment Team',
  targetCity: 'Warsaw / Wrocław Region',
  languages: 'English (Fluent / Communicative), Hindi (Native), Basic Polish/Local language learner',
  shiftPreference: 'Full-time • Flexible for 8 to 12-Hour Shifts, Night Rotations & Overtime',
  date: new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),

  hasDrivingLicense: false,
  drivingLicenseDetails: 'Valid Driving License (Light / Heavy Motor Vehicle)',
  hasForkliftLicense: false,
  forkliftDetails: 'Certified Forklift Operator / Material Handling experience',
  immediateRelocation: true,
  pccReady: true,
  includeRodoClause: true,
};

export const JOB_CATEGORIES: {
  id: JobCategory;
  name: string;
  defaultTitle: string;
  description: string;
  badge: string;
}[] = [
  {
    id: 'warehouse_worker',
    name: 'Warehouse Worker',
    defaultTitle: 'Warehouse Worker / General Warehouse Operative',
    description: 'Picking, packing, palletizing, loading, and inventory sorting',
    badge: 'High Demand',
  },
  {
    id: 'helper',
    name: 'General Helper',
    defaultTitle: 'General Warehouse & Logistics Helper',
    description: 'Assisting senior technicians, heavy loading, cleaning, and material movement',
    badge: 'No Prior Experience Needed',
  },
  {
    id: 'fulfillment',
    name: 'Fulfillment Jobs',
    defaultTitle: 'Fulfillment Associate / Order Picker & Packer',
    description: 'Barcode scanning, e-commerce order processing, bin replenishment, conveyor lines',
    badge: 'Amazon / E-commerce',
  },
  {
    id: 'logistics',
    name: 'Logistics Jobs',
    defaultTitle: 'Logistics Operative / Material Handler',
    description: 'Inbound container offloading, dispatch staging, cross-docking, inventory transfer',
    badge: 'Supply Chain',
  },
  {
    id: 'delivery',
    name: 'Delivery Jobs',
    defaultTitle: 'Delivery Associate / Courier Driver Assistant',
    description: 'Parcel sorting, route dispatch assistance, safe cargo loading, customer drop-offs',
    badge: 'Transport & Fleet',
  },
];

export function generateCoverLetterContent(
  category: JobCategory,
  country: TargetCountry,
  candidate: CandidateDetails
): LetterContent {
  const countryData = COUNTRIES_DATA[country] || COUNTRIES_DATA.Other;
  const permitName = countryData.workPermitType;
  const countryName = country === 'Other' ? (candidate.customCountryName || 'Europe') : country;
  const isSingapore = country === 'Singapore';

  if (category === 'warehouse_worker') {
    return {
      salutation: `Dear Hiring Manager / Logistics Recruitment Team in ${countryName},`,
      paragraph1_intro: isSingapore
        ? `I am writing with great enthusiasm to formally apply for the Warehouse Worker position with your organization in Singapore under the Ministry of Manpower (MOM) Work Permit / S Pass sponsorship framework. As a dedicated, physically resilient, and disciplined professional from India, I am eager to contribute my high-volume warehousing stamina and strong work ethic to your operations.`
        : `I am writing with keen interest to apply for the Warehouse Worker position with your esteemed organization in ${countryName}. As an energetic, reliable, and hardworking professional from India, I am eager to contribute my physical endurance, meticulous attention to detail, and strong work ethic to your daily warehouse operations.`,
      paragraph2_experience: `I possess solid practical stamina and experience handling demanding physical warehouse duties. I am accustomed to working on my feet for prolonged 8- to 12-hour shifts, manually lifting and shifting boxes up to 25 kg in strict accordance with workplace ergonomic safety, operating manual pallet jacks, and executing fast-paced picking, packing, sorting, and palletizing tasks without error.`,
      paragraph3_skills_safety: isSingapore
        ? `Workplace safety is my utmost priority. I strictly adhere to Singapore Workplace Safety and Health (WSH) standards, 5S visual warehouse housekeeping, and Personal Protective Equipment (PPE) rules. I quickly adapt to digital warehouse management tools, RF barcode scanners, and fast-moving freight staging in major hubs such as Changi and Jurong.`
        : `Workplace health and safety is my utmost priority. I strictly observe Personal Protective Equipment (PPE) guidelines, maintain neat and hazard-free 5S aisles, and quickly adapt to digital warehouse management tools and barcode scanners. I collaborate with utmost respect within multicultural teams, take initiative under minimal supervision, and follow standard operating procedures precisely.`,
      paragraph4_eligibility_shifts: isSingapore
        ? `As an Indian citizen seeking employment in Singapore, I am requesting employer sponsorship for a Ministry of Manpower (MOM) Work Permit. I am unmarried with zero relocation restrictions, enabling me to commit 100% of my dedication to rotating 8- to 12-hour shifts, night duties, and peak volume periods. My passport is valid long-term, and my Police Clearance Certificate (PCC) and medical fitness are in order for immediate In-Principle Approval (IPA) filing.`
        : `As a non-EU Indian citizen, I am seeking an employer-sponsored ${permitName}. I am unmarried with zero family obligations that would impede my availability, enabling me to commit 100% of my focus to my job, rotating day/night shifts, and seasonal overtime. My passport is valid for long-term travel, and I have my Police Clearance Certificate (PCC) and medical fitness certificates ready for immediate visa filing.`,
      paragraph5_closing: isSingapore
        ? `I am prepared to travel and commence work in Singapore immediately upon issuance of the MOM In-Principle Approval (IPA) letter. Thank you for your time and consideration of my application. I would welcome an interview at your convenience to discuss how my dedication will benefit your logistics team.`
        : `I am prepared to relocate to ${countryName} immediately upon visa issuance. Thank you for your valuable time and consideration of my application. I would welcome an interview at your convenience to discuss how my dedication and stamina will benefit your warehouse team.`,
      signOff: 'Yours sincerely,',
    };
  }

  if (category === 'helper') {
    return {
      salutation: `Dear Hiring Manager / Site Supervisor in ${countryName},`,
      paragraph1_intro: isSingapore
        ? `I am writing to express my earnest enthusiasm in applying for the General Helper position with your company in Singapore under the Ministry of Manpower (MOM) Work Permit framework. I am an industrious, physically fit, and disciplined worker from India, eager to assist your operational team with loading, moving materials, and site maintenance.`
        : `I am writing to express my earnest enthusiasm in applying for the General Helper position with your company in ${countryName}. I am an industrious, physically fit, and disciplined worker from India, eager to assist your operational team with loading, moving materials, site maintenance, and all essential helper duties.`,
      paragraph2_experience: `I take pride in being a dependable, fast-learning helper who is ready to undertake any manual task assigned by supervisors. My capabilities include offloading commercial cargo, carrying heavy materials, assisting equipment operators, staging goods, sweeping and tidying work bays, and packaging items securely for transport. I handle strenuous physical activity with great stamina and a positive attitude.`,
      paragraph3_skills_safety: isSingapore
        ? `I believe in total punctuality, respect for team leaders, and strict compliance with Singapore WSH safety regulations and protective gear. I listen attentively to instructions, execute tasks quickly, and communicate clearly in English to ensure smooth everyday collaboration on the floor.`
        : `I believe in total punctuality, respect for team leaders, and strict compliance with safety rules and protective gear. I listen attentively to instructions, execute tasks quickly, and communicate clearly in English while actively learning essential local language phrases to ensure smooth everyday collaboration on the floor.`,
      paragraph4_eligibility_shifts: isSingapore
        ? `I hold Indian citizenship and require employer MOM Work Permit sponsorship. Being single and unmarried, I have complete personal flexibility for extended hours, 8- to 12-hour shifts, and weekends. My passport is in order, my background is completely clean with police clearance ready, and my medical fitness is verified.`
        : `I hold Indian citizenship and require employer work permit support (${permitName}). I am single and unmarried, which allows me complete flexibility to work extended shifts, weekends, and early morning or late night hours. My passport is in order, my background is completely clean with police verification readily obtainable, and my medical status is verified healthy.`,
      paragraph5_closing: isSingapore
        ? `I am genuinely motivated to build a lasting, trustworthy working relationship with your company in Singapore. Thank you for reviewing my profile. I look forward to an interview to demonstrate my willingness to work hard from day one.`
        : `I am genuinely motivated to build a lasting, trustworthy working relationship with your company in ${countryName}. Thank you for reviewing my profile. I look forward to the opportunity to speak with you and demonstrate my willingness to work hard from day one.`,
      signOff: 'Respectfully yours,',
    };
  }

  if (category === 'fulfillment') {
    return {
      salutation: `Dear Recruitment Manager / Fulfillment Center Team in ${countryName},`,
      paragraph1_intro: isSingapore
        ? `I am delighted to submit my application for the Fulfillment Associate (Picker, Packer & Stower) role at your modern logistics center in Singapore under the MOM Work Permit sponsorship program. Driven by accuracy, high energy, and a customer-first mindset, I am excited about the opportunity to join your high-velocity order fulfillment operations.`
        : `I am delighted to submit my application for the Fulfillment Associate (Picker, Packer & Stower) role at your modern logistics center in ${countryName}. Driven by accuracy, high energy, and a customer-first mindset, I am excited about the opportunity to join your high-velocity e-commerce order fulfillment operations.`,
      paragraph2_experience: `In fulfillment environments, precision and speed are vital. I excel at navigating high-density warehouse aisles with handheld RF barcode scanners, verifying SKU numbers, inspecting products for zero defects, and packing parcels to exact dimensional and packaging standards. I understand how to maintain high unit-per-hour (UPH) productivity rates while maintaining immaculate bin and inventory integrity.`,
      paragraph3_skills_safety: isSingapore
        ? `I strictly respect company safety rules, conveyor safety protocols, and 5S clean-desk principles under Singapore WSH guidelines. I thrive in organized, technology-driven logistics hubs, learn automated warehouse management systems (WMS) rapidly, and take personal responsibility for ensuring every customer order is packed securely.`
        : `I strictly respect company safety rules, conveyor safety protocols, and 5S clean-desk principles. I thrive in organized, technology-driven logistics hubs, learn automated warehouse management systems (WMS) rapidly, and take personal responsibility for ensuring every customer order is packed securely and dispatched without delay.`,
      paragraph4_eligibility_shifts: isSingapore
        ? `As an Indian citizen, I am actively seeking Ministry of Manpower (MOM) Work Permit sponsorship in Singapore. Being unmarried, I have complete flexibility to work rotating shift patterns, night shifts, and demanding peak volume periods. My passport has long validity, and my background verification is prepared for immediate IPA filing.`
        : `As an Indian citizen, I am actively seeking work permit sponsorship (${permitName}) in ${countryName}. Being unmarried, I have complete personal flexibility to work 4x10-hour or rotating shift patterns, night shifts, and demanding peak holiday rush periods. My passport is valid with long validity, and my documentation (PCC, medicals) is in order for swift consular processing.`,
      paragraph5_closing: isSingapore
        ? `Thank you for considering my application for your Singapore fulfillment team. I look forward to the opportunity to discuss my qualifications during an interview and prove my value as a reliable associate.`
        : `Thank you for considering my application for your fulfillment team. I look forward to the opportunity to discuss my qualifications during an interview and prove my value as a reliable, hardworking associate in ${countryName}.`,
      signOff: 'Sincerely,',
    };
  }

  if (category === 'logistics') {
    return {
      salutation: `Dear Logistics Manager / Supply Chain Recruitment in ${countryName},`,
      paragraph1_intro: isSingapore
        ? `I am writing to formally present my candidature for the Logistics Operative / Material Handler position at your logistics facility in Singapore. With a strong background in manual cargo handling, transport staging, and inventory coordination, I am eager to contribute to your supply chain efficiency under the MOM Work Permit framework.`
        : `I am writing to formally present my candidature for the Logistics Operative / Material Handler position at your logistics facility in ${countryName}. With a strong background in manual cargo handling, transport staging, and inventory coordination, I am eager to contribute to your supply chain efficiency.`,
      paragraph2_experience: `My hands-on experience includes unshipping inbound transport trailers, segregating goods according to destination manifests, wrapping and strapping pallets for secure transit, and operating manual and electric pallet trucks. I am adept at verifying delivery waybills against physical stock counts to eliminate discrepancies and shrinkage.`,
      paragraph3_skills_safety: isSingapore
        ? `Safety and accuracy form the foundation of my daily work. I maintain keen situational awareness in busy staging lanes, adhere strictly to load ratings and weight distribution limits, and wear all required personal protective equipment according to Singapore WSH protocols. I coordinate smoothly with dispatchers and operations leads.`
        : `Safety and accuracy form the foundation of my daily work. I maintain keen situational awareness in busy staging lanes, adhere strictly to load ratings and weight distribution limits, and wear all required personal protective equipment. I am a team player with communicative English proficiency who coordinates smoothly with drivers, dispatchers, and warehouse supervisors.`,
      paragraph4_eligibility_shifts: isSingapore
        ? `I am an Indian national seeking employment sponsorship under Singapore MOM Work Permit regulations. Being unmarried, I am free from relocation hurdles and completely dedicated to meeting your schedule, whether on standard day shifts, overnight freight cycles, or weekend rosters. My passport and PCC documents are ready.`
        : `I am an Indian national seeking employment sponsorship under ${permitName}. Being unmarried, I am free from relocation hurdles and completely dedicated to meeting your production schedule, whether on standard day shifts, overnight freight cycles, or weekend rosters. My passport is up to date and all verification papers are prepared.`,
      paragraph5_closing: isSingapore
        ? `I would be privileged to contribute my diligence and stamina to your logistics operations in Singapore. Thank you for your time and review. I look forward to an interview opportunity.`
        : `I would be privileged to contribute my diligence and stamina to your logistics operations in ${countryName}. Thank you for your time and review. I look forward to an interview opportunity.`,
      signOff: 'Best regards,',
    };
  }

  // Delivery jobs
  return {
    salutation: `Dear Transport & Fleet Recruitment Team in ${countryName},`,
    paragraph1_intro: isSingapore
      ? `I am writing to express my strong interest in the Delivery Associate / Courier Assistant position with your distribution operations in Singapore under the MOM Work Permit sponsorship program. I am energetic, physically agile, and customer-focused, eager to assist with timely parcel delivery across Singapore.`
      : `I am writing to express my strong interest in the Delivery Associate / Courier Driver Assistant position with your distribution operations in ${countryName}. I am an energetic, physically agile, and customer-focused individual from India who is passionate about timely parcel distribution and smooth fleet operations.`,
    paragraph2_experience: `I am experienced in package sorting by geographical routes, safe parcel handling, loading delivery vans to optimize drop sequence, and assisting with last-mile deliveries. I take great care to protect customer packages against damage or moisture, double-check addresses and dispatch manifests, and communicate politely with customers during handoffs.`,
    paragraph3_skills_safety: `I maintain strict standards of road and cargo safety, cargo security, and vehicle cleanliness. I am comfortable with smartphone GPS navigation apps, handheld delivery scanners, and digital signature capture. My strong physical stamina allows me to make rapid stops, climb stairs, and carry parcels up to 25 kg throughout full delivery shifts.`,
    paragraph4_eligibility_shifts: isSingapore
      ? `As an Indian national, I am eager to obtain the necessary MOM Work Permit with your sponsorship in Singapore. I am single and unmarried, highly punctual, and fully available for early morning dispatch schedules, weekend deliveries, and seasonal volume increases. My passport is in good standing and all necessary background clearance documents are ready.`
      : `As a non-EU Indian national, I am eager to obtain the necessary work permit (${permitName}) with your sponsorship in ${countryName}. I am single and unmarried, highly punctual, and fully available for early morning dispatch schedules, weekend deliveries, and seasonal volume increases. My passport is in good standing and all necessary background clearance documents are ready.`,
    paragraph5_closing: isSingapore
      ? `Thank you for your consideration of my profile. I am eager to bring my enthusiasm, stamina, and reliable service to your delivery team in Singapore, and I look forward to speaking with you soon.`
      : `Thank you for your consideration of my profile. I am eager to bring my enthusiasm, stamina, and reliable service to your delivery team in ${countryName}, and I hope to speak with you soon in an interview.`,
    signOff: 'Yours faithfully,',
  };
}

export function generateCvContent(
  category: JobCategory,
  country: TargetCountry,
  candidate: CandidateDetails
): CvContent {
  const countryData = COUNTRIES_DATA[country] || COUNTRIES_DATA.Other;
  const countryName = country === 'Other' ? (candidate.customCountryName || 'Europe') : country;
  const permitName = countryData.workPermitType;
  const isSingapore = country === 'Singapore';

  // Local destination language learner mapping
  const localLangMap: Record<TargetCountry, string> = {
    Poland: 'Polish',
    Singapore: 'English & Basic Workplace Malay',
    Turkey: 'Turkish',
    Greece: 'Greek',
    Romania: 'Romanian',
    'Czech Republic': 'Czech',
    Germany: 'German',
    Hungary: 'Hungarian',
    Croatia: 'Croatian',
    Albania: 'Albanian',
    Lithuania: 'Lithuanian',
    Slovakia: 'Slovak',
    Italy: 'Italian',
    Portugal: 'Portuguese',
    Spain: 'Spanish',
    Other: 'European Local Language',
  };

  const localLang = localLangMap[country] || 'Local Language';

  let roleTitle = 'Warehouse Worker / Warehouse Operative';
  let exp1Role = 'Senior Warehouse Logistics & Material Handler';
  let exp2Role = 'Warehouse Associate & Order Picker';
  let exp3Role = 'Freight Staging & Logistics Helper';

  if (category === 'helper') {
    roleTitle = 'General Helper / Warehouse & Logistics Assistant';
    exp1Role = 'General Logistics & Material Helper';
    exp2Role = 'Site & Warehouse Loading Helper';
    exp3Role = 'Cargo Staging & Packaging Helper';
  } else if (category === 'fulfillment') {
    roleTitle = 'Fulfillment Associate / Order Picker & Packer';
    exp1Role = 'E-commerce Fulfillment Lead Associate (Picker & Packer)';
    exp2Role = 'Inventory & Packaging Associate';
    exp3Role = 'Inbound Sorting & Bin Stowing Associate';
  } else if (category === 'logistics') {
    roleTitle = 'Logistics Operative / Material Handler';
    exp1Role = 'Logistics Operative & Cross-Dock Specialist';
    exp2Role = 'Dispatch Assistant & Stock Handler';
    exp3Role = 'Inbound Container & Cargo Staging Assistant';
  } else if (category === 'delivery') {
    roleTitle = 'Delivery Associate / Courier Driver Assistant';
    exp1Role = 'Delivery & Route Dispatch Associate';
    exp2Role = 'Parcel Sorter & Van Loading Assistant';
    exp3Role = 'Distribution Depot & Courier Assistant';
  }

  const destinationPermitLabel = isSingapore
    ? 'Singapore Ministry of Manpower (MOM) Work Permit / IPA'
    : `${countryName} ${permitName.split('(')[0].trim()}`;

  const summary = isSingapore
    ? `Disciplined, physically resilient, and detail-oriented Indian professional seeking employer sponsorship for a Ministry of Manpower (MOM) Work Permit / S Pass in Singapore. Proven track record across high-velocity logistics hubs, container offloading, pallet truck handling, barcode RF scanning, and strict 5S warehouse organization. Fully accustomed to demanding physical labor, standing for 8- to 12-hour rotating shifts, and lifting loads up to 25 kg safely under Workplace Safety and Health (WSH) guidelines. Valid passport with long-term validity, Police Clearance Certificate (PCC) verified, and ready for immediate deployment upon In-Principle Approval (IPA) issuance.`
    : `Diligent, physically resilient, and disciplined Non-EU Indian professional seeking an employer-sponsored work permit (${permitName.split('(')[0].trim()}) in ${countryName}. Proven track record in fast-paced warehousing, heavy manual handling, pallet truck operation, order picking, and goods dispatch. Accustomed to sustained physical labor, standing for 8- to 12-hour shifts, and lifting loads up to 25 kg safely. Valid passport with long validity, Police Clearance Certificate (PCC) ready, medically fit, and fully prepared for immediate international relocation with flexible availability for rotating day, evening, night, and weekend shifts.`;

  return {
    headline: `${roleTitle} | Candidate for ${destinationPermitLabel}`,
    professionalSummary: summary,
    photoUrl: DEFAULT_WHITE_BG_PASSPORT_PHOTO,
    showPhoto: true,
    photoWhiteBackground: true,
    experiences: [
      {
        id: 'exp-1',
        role: exp1Role,
        company: 'Apex Logistics & Freight Hub',
        location: 'New Delhi, India',
        startDate: 'January 2022',
        endDate: 'Present',
        isCurrent: true,
        responsibilities: [
          'Operate manual and semi-electric pallet jacks to stage, transfer, and palletize heavy cartons across dispatch bays.',
          'Execute high-speed order picking and packing with RF barcode handheld scanners, maintaining over 99.6% inventory accuracy.',
          'Offload inbound commercial freight trailers and 40ft shipping containers, inspecting cargo for transit damage and verifying shipping manifests.',
          'Enforce strict 5S housekeeping, personal protective equipment (PPE) guidelines, and workplace ergonomic lifting protocols.',
        ],
      },
      {
        id: 'exp-2',
        role: exp2Role,
        company: 'Metro Distribution & Wholesale Center',
        location: 'New Delhi, India',
        startDate: 'March 2019',
        endDate: 'December 2021',
        isCurrent: false,
        responsibilities: [
          'Assisted senior warehouse staff with bulk inventory unpacking, bin sorting, barcode relabeling, and shelf replenishment.',
          'Handled daily manual lifting, sorting, and wrapping of outbound boxes weighing 15 to 25 kg for high-volume retail fulfillment.',
          'Assisted dispatch drivers with secure van loading, order verification against bills of lading, and cargo strapping.',
          'Conducted daily cycle counts and stock segregation to minimize shrinkage, damaged goods, and inventory discrepancies.',
        ],
      },
      {
        id: 'exp-3',
        role: exp3Role,
        company: 'SwiftCargo Storage & Cross-Dock Depot',
        location: 'New Delhi, India',
        startDate: 'August 2017',
        endDate: 'February 2019',
        isCurrent: false,
        responsibilities: [
          'Supported fast-turnaround freight cross-docking, moving bulk shipments from inbound trucks directly to outbound departure lanes.',
          'Wrapped pallets with heavy-duty stretch film and applied corner edge protectors and nylon strapping for secure transit.',
          'Conducted routine cleaning and maintenance of warehouse staging zones, dock levelers, and manual material handling equipment.',
          'Demonstrated 100% adherence to safety protocols during peak seasonal rushes, consistently meeting daily loading targets.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Senior Secondary School Certificate (10+2 Examination)',
        institution: 'Central Board of Secondary Education (CBSE)',
        location: 'Delhi, India',
        year: '2016 – 2018',
        details: 'Completed with Good Standing • Focus on General Studies, English & Mathematics',
      },
      {
        id: 'edu-2',
        degree: 'Secondary School Certificate (10th Standard)',
        institution: 'State Education Board',
        location: 'Delhi, India',
        year: '2014 – 2016',
        details: 'Foundational secondary education with Science, Mathematics and English',
      },
      {
        id: 'edu-3',
        degree: 'Vocational Certificate in Warehouse & Logistics Practices',
        institution: 'National Vocational Training Institute',
        location: 'Delhi, India',
        year: '2018 – 2019',
        details: 'Coursework: Inventory Staging, Safe Material Handling, PPE Standards & Barcode Systems',
      },
    ],
    operationalSkills: [
      'Manual & Semi-Electric Pallet Truck (PPT) Handling',
      'RF Handheld Barcode & QR Scanning (Zebra / Honeywell)',
      'High-Speed Order Picking, Sorting & Packing',
      'Heavy Manual Lifting (up to 25 kg with ergonomic form)',
      'Inbound Container Offloading & Cross-Dock Staging',
      'Pallet Wrapping, Strapping & Corner Guard Protection',
      '5S Warehouse Safety, Aisle Organization & PPE Compliance',
      'Inventory Cycle Counting, Discrepancy Checks & Bin Audits',
    ],
    equipmentSkills: [
      'Manual Hydraulic Pallet Jacks (up to 2500 kg capacity)',
      'Semi-Electric Powered Pallet Trucks (PPT)',
      'Handheld RF Scanners & Digital Inventory Terminals',
      'Heavy-Duty Stretch Film Dispensers & Banding Tools',
      'Hydraulic Dock Levelers & Container Unloading Ramps',
      'Industrial Digital Weighing Platforms & Parcel Cubing Systems',
    ],
    personalStrengths: [
      'High Physical Stamina (Proven endurance for 8- to 12-hour continuous standing shifts)',
      'Punctuality & Strict Work Ethic (Flawless attendance record)',
      'Ready for Rotating Day, Evening, Night Shifts & Weekend Overtime',
      'Unmarried with Zero Relocation Dependencies or Personal Restrictions',
      'Fast Learner & Disciplined Collaborator in Multicultural Teams',
      'Zero Disciplinary Record & Clean Police Record (PCC Verified)',
    ],
    languages: [
      {
        id: 'lang-1',
        language: 'English',
        proficiency: 'Communicative / Fluent (Floor instructions, dispatch manifests, safety manuals)',
        levelBadge: 'B2 Level',
      },
      {
        id: 'lang-2',
        language: 'Hindi',
        proficiency: 'Native / Mother Tongue',
        levelBadge: 'C2 Native',
      },
      {
        id: 'lang-3',
        language: 'Urdu',
        proficiency: 'Fluent Speaking & Understanding',
        levelBadge: 'C1 Fluent',
      },
      {
        id: 'lang-4',
        language: isSingapore ? 'Workplace Malay / English' : `${localLang} (Destination)`,
        proficiency: isSingapore
          ? 'Active Learner of Singapore logistics terminology and basic local workplace vocabulary'
          : 'Active Learner (studying greetings, safety phrases, numbers and basic warehouse vocabulary)',
        levelBadge: 'A1 Learner',
      },
    ],
    certifications: [
      'Certificate in Warehouse Safety & Ergonomic Manual Handling',
      'Occupational Health & Personal Protective Equipment (PPE) Training',
      'Basic Workplace First Aid & Hazard Communication',
      'Hazardous Material & Cargo Segregation Awareness',
    ],
    driverLicense: 'Valid Motor Vehicle Driving License (LMV - Light Motor Vehicle, Clean Record)',
    showPassportBox: true,
    showReadinessBadges: true,
    gdprClause: countryData.gdprText,
    references: 'Professional references from former warehouse supervisors and logistics operations managers available immediately upon request.',
  };
}

