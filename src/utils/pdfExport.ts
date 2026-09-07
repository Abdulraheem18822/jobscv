import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import { CandidateDetails, CvContent, LetterContent } from '../types';

/**
 * Generates a clean, ATS-friendly vector PDF directly using jsPDF primitives.
 * This guarantees 100% reliability, instant generation, sharp text, and zero CSS color parsing issues.
 */
export function generateVectorPdf(
  details: CandidateDetails,
  content: LetterContent,
  fileName: string
): boolean {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2; // 174mm
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      pdf.addPage();
      y = margin;
    }
  };

  // 1. Header Block
  // Full Name
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(20);
  pdf.setTextColor(28, 25, 23); // Stone 900
  pdf.text(details.fullName, margin, y);

  // Contacts Right-Aligned
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.5);
  pdf.setTextColor(68, 64, 60); // Stone 700
  const contactLines = [
    details.email,
    details.phone,
    `${details.currentAddress ? `${details.currentAddress}, ` : ''}${details.cityCountry}`,
    `Target: ${details.targetCountry} Work Permit`,
  ];
  let contactY = y - 1;
  contactLines.forEach((line) => {
    pdf.text(line, pageWidth - margin, contactY, { align: 'right' });
    contactY += 4;
  });

  y += 6;

  // Job Title
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(146, 64, 14); // Amber 800
  pdf.text(details.targetJobTitle, margin, y);
  y += 5;

  // Nationality & Marital status
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.5);
  pdf.setTextColor(87, 83, 78);
  pdf.text(`${details.nationality}  |  Marital Status: ${details.maritalStatus}`, margin, y);
  y += 6;

  // Horizontal divider
  pdf.setDrawColor(28, 25, 23);
  pdf.setLineWidth(0.5);
  pdf.line(margin, y, pageWidth - margin, y);
  y += 6;

  // 2. Candidate Passport & Verification Summary Card (if enabled)
  if (details.showPassportInLetter) {
    checkPageBreak(30);
    const cardHeight = 25;

    // Background fill & border
    pdf.setFillColor(248, 247, 246); // Stone 50
    pdf.setDrawColor(214, 211, 209); // Stone 300
    pdf.setLineWidth(0.3);
    pdf.roundedRect(margin, y, contentWidth, cardHeight, 2, 2, 'FD');

    // Title inside card
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(28, 25, 23);
    pdf.text('CANDIDATE IDENTITY & WORK PERMIT VERIFICATION SUMMARY', margin + 3, y + 5);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(120, 113, 108);
    pdf.text('Non-EU Employment Candidate', pageWidth - margin - 3, y + 5, { align: 'right' });

    // Inner divider
    pdf.setDrawColor(231, 229, 228);
    pdf.line(margin + 2, y + 7.5, pageWidth - margin - 2, y + 7.5);

    // 4 Columns of Data
    const colWidth = contentWidth / 4;
    const dataY = y + 12;

    // Col 1: Passport No
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(120, 113, 108);
    pdf.text('Passport Number:', margin + 3, dataY);
    pdf.setFont('courier', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(28, 25, 23);
    pdf.text(details.passport.passportNumber || 'Pending', margin + 3, dataY + 4);

    // Col 2: Date of Birth
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(120, 113, 108);
    pdf.text('Date of Birth:', margin + colWidth + 2, dataY);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(41, 37, 36);
    pdf.text(details.passport.dateOfBirth || details.dateOfBirth, margin + colWidth + 2, dataY + 4);

    // Col 3: Place of Issue
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(120, 113, 108);
    pdf.text('Place of Issue:', margin + colWidth * 2 + 2, dataY);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(41, 37, 36);
    pdf.text(details.passport.placeOfIssue || 'India', margin + colWidth * 2 + 2, dataY + 4);

    // Col 4: Expiry
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(120, 113, 108);
    pdf.text('Passport Validity:', margin + colWidth * 3 + 2, dataY);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(41, 37, 36);
    pdf.text(details.passport.expiryDate ? `Exp: ${details.passport.expiryDate}` : 'Valid', margin + colWidth * 3 + 2, dataY + 4);

    // Verification badges bottom row
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(87, 83, 78);
    pdf.text(
      `Status: ${details.maritalStatus} (Ready for relocation)  •  Police Clearance: ${
        details.pccReady ? 'PCC Ready & Verified' : 'In process'
      }  •  Medical Fitness: Fit for 8-12h shifts`,
      margin + 3,
      y + 22
    );

    y += cardHeight + 5;
  }

  // 3. Date
  checkPageBreak(12);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(87, 83, 78);
  pdf.text(details.date, margin, y);
  y += 5;

  // 4. Recipient block
  checkPageBreak(18);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(28, 25, 23);
  pdf.text('To:', margin, y);
  y += 4;
  pdf.setFont('helvetica', 'normal');
  pdf.text(details.targetCompany, margin, y);
  y += 4;
  pdf.text(`${details.targetCity ? `${details.targetCity}, ` : ''}${details.targetCountry}`, margin, y);
  y += 6;

  // 5. Subject Line
  checkPageBreak(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9.5);
  pdf.setTextColor(28, 25, 23);
  const subjectText = `RE: Application for ${details.targetJobTitle} — Work Permit Sponsorship Applicant`;
  pdf.text(subjectText, margin, y);
  y += 6;

  // 6. Salutation
  checkPageBreak(8);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9.5);
  pdf.text(content.salutation, margin, y);
  y += 6;

  // 7. Paragraphs Helper
  const printParagraph = (text: string, isEmphasis = false) => {
    pdf.setFont('helvetica', isEmphasis ? 'bold' : 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(isEmphasis ? 28 : 55, isEmphasis ? 25 : 50, isEmphasis ? 23 : 45); // Dark, readable

    const splitLines: string[] = pdf.splitTextToSize(text, contentWidth);
    const neededHeight = splitLines.length * 4.3 + 3.5;
    checkPageBreak(neededHeight);

    pdf.text(splitLines, margin, y, { lineHeightFactor: 1.25 });
    y += splitLines.length * 4.3 + 3.5;
  };

  printParagraph(content.paragraph1_intro);
  printParagraph(content.paragraph2_experience);
  printParagraph(content.paragraph3_skills_safety);

  // Equipment credentials if any
  if (details.hasForkliftLicense || details.hasDrivingLicense) {
    let credentialText = '';
    if (details.hasForkliftLicense) {
      credentialText += 'Equipment Skill: Experienced with manual & electric pallet trucks, stackers, and warehouse material handling.\n';
    }
    if (details.hasDrivingLicense) {
      credentialText += 'Driving Credential: Holds valid motor vehicle driving license with clear driving history.';
    }
    printParagraph(credentialText.trim(), true);
  }

  printParagraph(content.paragraph4_eligibility_shifts);
  printParagraph(content.paragraph5_closing);

  // 8. Sign-off & Signature
  checkPageBreak(25);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9.5);
  pdf.setTextColor(41, 37, 36);
  pdf.text(content.signOff, margin, y);
  y += 6;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(28, 25, 23);
  pdf.text(details.fullName, margin, y);
  y += 4.5;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.5);
  pdf.setTextColor(87, 83, 78);
  pdf.text(`Indian Citizen  •  Candidate for ${details.targetCountry} Employment Visa`, margin, y);
  y += 4;
  pdf.setFont('courier', 'normal');
  pdf.text(`Passport No: ${details.passport.passportNumber || '[Pending]'}`, margin, y);
  y += 6;

  // 9. Polish RODO Clause (if applicable)
  if (details.targetCountry === 'Poland' && details.includeRodoClause) {
    checkPageBreak(22);
    pdf.setDrawColor(214, 211, 209);
    pdf.setLineWidth(0.2);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 4;

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(6.5);
    pdf.setTextColor(120, 113, 108);
    pdf.text('Polish Employment GDPR / RODO Clause:', margin, y);
    y += 3;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.5);
    const rodoText =
      'Wyrazam zgode na przetwarzanie moich danych osobowych dla potrzeb niezbednych do realizacji procesu rekrutacji (zgodnie z ustawa z dnia 10 maja 2018 roku o ochronie danych osobowych (Dz. Ustaw z 2018, poz. 1000) oraz zgodnie z Rozporzadzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osob fizycznych w zwiazku z przetwarzaniem danych osobowych i w sprawie swobodnego przeplywu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO)).';
    const rodoLines: string[] = pdf.splitTextToSize(rodoText, contentWidth);
    pdf.text(rodoLines, margin, y, { lineHeightFactor: 1.2 });
  }

  pdf.save(fileName);
  return true;
}

/**
 * Export Cover Letter to PDF.
 * Uses html-to-image (which natively supports Tailwind CSS v4 and modern color functions like OKLCH via browser SVG rendering)
 * with an automatic, resilient fallback to generateVectorPdf.
 */
export async function exportCoverLetterToPdf(
  elementId: string,
  fileName: string,
  details: CandidateDetails,
  content: LetterContent,
  onProgress?: (status: boolean) => void
): Promise<boolean> {
  try {
    if (onProgress) onProgress(true);

    const element = document.getElementById(elementId);
    if (!element) {
      // If element is not found, immediately use vector generation
      return generateVectorPdf(details, content, fileName);
    }

    try {
      // Capture element using html-to-image (bypasses html2canvas completely, natively handles oklch)
      const dataUrl = await toPng(element, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        filter: (node) => {
          if (node instanceof HTMLElement && node.classList.contains('no-print')) {
            return false;
          }
          return true;
        },
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = 210;
      const pdfHeight = 297;

      // Get image aspect ratio
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load captured image'));
        img.src = dataUrl;
      });

      const imgWidth = pdfWidth;
      const imgHeight = (img.height * imgWidth) / img.width;

      if (imgHeight <= pdfHeight) {
        // Fits on single A4 page
        pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      } else {
        // Multi-page handling
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
          heightLeft -= pdfHeight;
        }
      }

      pdf.save(fileName);
      return true;
    } catch (renderError) {
      console.warn('html-to-image render encountered error, falling back to direct vector PDF:', renderError);
      return generateVectorPdf(details, content, fileName);
    }
  } catch (err) {
    console.error('Final fallback generating vector PDF due to error:', err);
    return generateVectorPdf(details, content, fileName);
  } finally {
    if (onProgress) onProgress(false);
  }
}

/**
 * Draws a professional vector passport portrait placeholder with a clean solid white background
 * directly in jsPDF to ensure zero rendering errors and crisp printing.
 */
function drawVectorPassportPhoto(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number
) {
  // Pure solid white background frame
  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(200, 195, 190);
  pdf.setLineWidth(0.3);
  pdf.roundedRect(x, y, w, h, 1, 1, 'FD');

  // Shoulders & Dark Suit Jacket
  pdf.setFillColor(30, 41, 59); // Slate 800
  pdf.roundedRect(x + 2, y + h - 11, w - 4, 10, 2, 2, 'F');

  // Crisp White Shirt Collar
  pdf.setFillColor(255, 255, 255);
  pdf.triangle(x + w / 2 - 3.5, y + h - 9, x + w / 2 + 3.5, y + h - 9, x + w / 2, y + h - 3, 'F');

  // Amber Tie
  pdf.setFillColor(180, 83, 9);
  pdf.triangle(x + w / 2 - 1.2, y + h - 8, x + w / 2 + 1.2, y + h - 8, x + w / 2, y + h - 1.5, 'F');

  // Neck
  pdf.setFillColor(232, 185, 142);
  pdf.rect(x + w / 2 - 2, y + h - 15, 4, 5.5, 'F');

  // Head Oval
  pdf.setFillColor(232, 185, 142);
  pdf.ellipse(x + w / 2, y + 10.5, 5.2, 6.8, 'F');

  // Hair
  pdf.setFillColor(35, 25, 20);
  pdf.ellipse(x + w / 2, y + 7.5, 5.5, 4.2, 'F');

  // Standard passport photo caption at bottom
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(4.8);
  pdf.setTextColor(140, 130, 120);
  pdf.text('35x45mm PASSPORT SPEC', x + w / 2, y + h - 0.6, { align: 'center' });
}

/**
 * Generates an ATS-compliant, vector-sharp European Standard Curriculum Vitae (CV) using jsPDF.
 * Guaranteed 100% reliable, minimum two full pages, ATS parseable, with passport photo,
 * work permit readiness, equipment matrix, and full GDPR/PDPA compliance.
 */
export function generateVectorCvPdf(
  details: CandidateDetails,
  cv: CvContent,
  fileName: string
): boolean {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2; // 178mm
  let y = margin;

  // Section Header helper
  const printSectionHeader = (title: string) => {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9.5);
    pdf.setTextColor(28, 25, 23);
    pdf.text(title.toUpperCase(), margin, y);
    y += 1.5;
    pdf.setDrawColor(180, 83, 9); // Amber line
    pdf.setLineWidth(0.4);
    pdf.line(margin, y, margin + 38, y);
    pdf.setDrawColor(214, 211, 209);
    pdf.setLineWidth(0.2);
    pdf.line(margin + 38, y, pageWidth - margin, y);
    y += 4;
  };

  // ==========================================
  // PAGE 1: Core Profile, Passport, Competencies & Primary Experience
  // ==========================================

  // Passport Photo (Top Right)
  const hasPhoto = cv.showPhoto !== false;
  const photoW = 23;
  const photoH = 29.5;
  const photoX = pageWidth - margin - photoW;
  const photoY = margin;

  if (hasPhoto) {
    if (cv.photoUrl && !cv.photoUrl.startsWith('data:image/svg')) {
      try {
        pdf.setFillColor(255, 255, 255);
        pdf.setDrawColor(200, 195, 190);
        pdf.setLineWidth(0.3);
        pdf.rect(photoX, photoY, photoW, photoH, 'FD');
        pdf.addImage(cv.photoUrl, 'PNG', photoX + 0.5, photoY + 0.5, photoW - 1, photoH - 1);
      } catch {
        drawVectorPassportPhoto(pdf, photoX, photoY, photoW, photoH);
      }
    } else {
      drawVectorPassportPhoto(pdf, photoX, photoY, photoW, photoH);
    }
  }

  // Left/Center: Candidate Name & Header details
  const headerLeftWidth = hasPhoto ? contentWidth - photoW - 4 : contentWidth;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(19);
  pdf.setTextColor(28, 25, 23); // Stone 900
  pdf.text(details.fullName, margin, y + 2);

  y += 7.5;

  // Headline / Target Job
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10.5);
  pdf.setTextColor(180, 83, 9); // Amber 700
  pdf.text(details.targetJobTitle, margin, y);

  y += 4.5;

  // Target Destination & Permit
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(87, 83, 78);
  const isSingapore = details.targetCountry === 'Singapore';
  const visaText = isSingapore
    ? 'Targeting: Singapore MOM Work Permit / S Pass  •  Indian Citizen (NTS Worker)'
    : `Targeting: ${details.targetCountry} European Work Permit  •  Indian Citizen (Non-EU)`;
  pdf.text(visaText, margin, y);

  y += 4;

  // Contact Info row
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.8);
  pdf.setTextColor(68, 64, 60);
  pdf.text(
    `Email: ${details.email}   |   Phone: ${details.phone}   |   Location: ${
      details.currentAddress ? `${details.currentAddress}, ` : ''
    }${details.cityCountry}`,
    margin,
    y
  );

  y += 3.8;

  // Marital Status & Relocation
  pdf.text(
    `Nationality: ${details.nationality}   |   Marital Status: ${details.maritalStatus}   |   DOB: ${details.dateOfBirth}`,
    margin,
    y
  );

  y += 5.5;

  // Top divider
  pdf.setDrawColor(28, 25, 23);
  pdf.setLineWidth(0.6);
  pdf.line(margin, y, pageWidth - margin, y);
  y += 4.5;

  // Candidate Passport & Work Permit Verification Card
  if (cv.showPassportBox) {
    const cardHeight = 21.5;
    pdf.setFillColor(248, 247, 246);
    pdf.setDrawColor(214, 211, 209);
    pdf.setLineWidth(0.3);
    pdf.roundedRect(margin, y, contentWidth, cardHeight, 1.5, 1.5, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(28, 25, 23);
    pdf.text(
      isSingapore
        ? 'CANDIDATE WORK PERMIT & MOM IMMIGRATION VERIFICATION'
        : 'CANDIDATE WORK PERMIT & PASSPORT VERIFICATION SUMMARY',
      margin + 3,
      y + 4.2
    );

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(120, 113, 108);
    pdf.text(
      isSingapore ? 'MOM In-Principle Approval (IPA) Candidate' : 'Non-EU European Employment Candidate',
      pageWidth - margin - 3,
      y + 4.2,
      { align: 'right' }
    );

    pdf.setDrawColor(231, 229, 228);
    pdf.line(margin + 2, y + 6, pageWidth - margin - 2, y + 6);

    const colWidth = contentWidth / 4;
    const dataY = y + 9.8;

    // Col 1
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.8);
    pdf.setTextColor(120, 113, 108);
    pdf.text('Passport Number:', margin + 3, dataY);
    pdf.setFont('courier', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(28, 25, 23);
    pdf.text(details.passport.passportNumber || 'Pending', margin + 3, dataY + 3.5);

    // Col 2
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.8);
    pdf.setTextColor(120, 113, 108);
    pdf.text('Date of Birth:', margin + colWidth + 2, dataY);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.8);
    pdf.setTextColor(41, 37, 36);
    pdf.text(details.passport.dateOfBirth || details.dateOfBirth, margin + colWidth + 2, dataY + 3.5);

    // Col 3
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.8);
    pdf.setTextColor(120, 113, 108);
    pdf.text('Place of Issue:', margin + colWidth * 2 + 2, dataY);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.8);
    pdf.setTextColor(41, 37, 36);
    pdf.text(details.passport.placeOfIssue || 'India', margin + colWidth * 2 + 2, dataY + 3.5);

    // Col 4
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.8);
    pdf.setTextColor(120, 113, 108);
    pdf.text('Passport Validity:', margin + colWidth * 3 + 2, dataY);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.8);
    pdf.setTextColor(41, 37, 36);
    pdf.text(details.passport.expiryDate ? `Exp: ${details.passport.expiryDate}` : 'Valid Long-Term', margin + colWidth * 3 + 2, dataY + 3.5);

    // Bottom note in passport box
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.8);
    pdf.setTextColor(87, 83, 78);
    pdf.text(
      `Relocation Availability: Immediate  •  Police Clearance (PCC): ${
        details.pccReady ? 'Ready & Verified' : 'In process'
      }  •  Shift Flexibility: 8-12h Shifts & Night Rotations`,
      margin + 3,
      y + 18.5
    );

    y += cardHeight + 4.5;
  }

  // Professional Summary
  printSectionHeader('Professional Profile & International Relocation Objective');
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.2);
  pdf.setTextColor(41, 37, 36);
  const summaryLines = pdf.splitTextToSize(cv.professionalSummary, contentWidth);
  pdf.text(summaryLines, margin, y, { lineHeightFactor: 1.25 });
  y += summaryLines.length * 3.6 + 4.5;

  // Operational Skills & Physical Stamina Matrix (Dual Column)
  printSectionHeader('Operational Competencies & Physical Capabilities');
  const halfSkills = Math.ceil(cv.operationalSkills.length / 2);
  const opCol1 = cv.operationalSkills.slice(0, halfSkills);
  const opCol2 = cv.operationalSkills.slice(halfSkills);
  const colW = contentWidth / 2 - 2;
  const skillStartY = y;

  opCol1.forEach((s, idx) => {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.8);
    pdf.setTextColor(41, 37, 36);
    pdf.text(`✓  ${s}`, margin, skillStartY + idx * 3.8);
  });

  opCol2.forEach((s, idx) => {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.8);
    pdf.setTextColor(41, 37, 36);
    pdf.text(`✓  ${s}`, margin + colW + 4, skillStartY + idx * 3.8);
  });

  y = skillStartY + Math.max(opCol1.length, opCol2.length) * 3.8 + 4.5;

  // Primary Work Experience (First 2 positions on Page 1)
  const page1Experiences = cv.experiences.slice(0, 2);
  if (page1Experiences.length > 0) {
    printSectionHeader('Professional Work Experience (Core Roles)');

    page1Experiences.forEach((exp) => {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(28, 25, 23);
      pdf.text(exp.role, margin, y);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(120, 113, 108);
      pdf.text(`${exp.startDate} – ${exp.endDate}`, pageWidth - margin, y, { align: 'right' });
      y += 3.8;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(180, 83, 9);
      pdf.text(`${exp.company}  •  ${exp.location}`, margin, y);
      y += 3.8;

      exp.responsibilities.forEach((resp) => {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(7.7);
        pdf.setTextColor(55, 50, 45);
        const bulletText = `•  ${resp}`;
        const bulletLines = pdf.splitTextToSize(bulletText, contentWidth - 4);
        pdf.text(bulletLines, margin + 2, y, { lineHeightFactor: 1.15 });
        y += bulletLines.length * 3.4 + 0.8;
      });
      y += 2.5;
    });
  }

  // Page 1 Footer
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(140, 135, 130);
  pdf.text(
    `Curriculum Vitae — Abdul Raheem  •  European Standard Format  •  Page 1 of 2`,
    pageWidth / 2,
    pageHeight - 8,
    { align: 'center' }
  );

  // ==========================================
  // PAGE 2: Earlier Work, Equipment Matrix, Safety, Education, Languages & GDPR
  // ==========================================
  pdf.addPage();
  y = margin;

  // Running Header on Page 2
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(120, 113, 108);
  pdf.text('ABDUL RAHEEM  |  CURRICULUM VITAE (EUROPASS STANDARD)', margin, y);
  pdf.text('PAGE 2 OF 2', pageWidth - margin, y, { align: 'right' });
  y += 2.5;

  pdf.setDrawColor(214, 211, 209);
  pdf.setLineWidth(0.3);
  pdf.line(margin, y, pageWidth - margin, y);
  y += 5;

  // Earlier Work Experience (Position 3)
  const page2Experiences = cv.experiences.slice(2);
  if (page2Experiences.length > 0) {
    printSectionHeader('Earlier Professional Experience & Depot Operations');

    page2Experiences.forEach((exp) => {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(28, 25, 23);
      pdf.text(exp.role, margin, y);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(120, 113, 108);
      pdf.text(`${exp.startDate} – ${exp.endDate}`, pageWidth - margin, y, { align: 'right' });
      y += 3.8;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(180, 83, 9);
      pdf.text(`${exp.company}  •  ${exp.location}`, margin, y);
      y += 3.8;

      exp.responsibilities.forEach((resp) => {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(7.7);
        pdf.setTextColor(55, 50, 45);
        const bulletText = `•  ${resp}`;
        const bulletLines = pdf.splitTextToSize(bulletText, contentWidth - 4);
        pdf.text(bulletLines, margin + 2, y, { lineHeightFactor: 1.15 });
        y += bulletLines.length * 3.4 + 0.8;
      });
      y += 3.5;
    });
  }

  // Material Handling Equipment & Technical Tools
  const eqSkills = cv.equipmentSkills && cv.equipmentSkills.length > 0
    ? cv.equipmentSkills
    : [
        'Manual Hydraulic Pallet Jacks (up to 2500 kg capacity)',
        'Semi-Electric Powered Pallet Trucks (PPT)',
        'Handheld RF Barcode & QR Scanners (Zebra / Honeywell)',
        'Heavy-Duty Stretch Film Dispensers & Banding Tools',
        'Hydraulic Dock Levelers & Container Unloading Ramps',
        'Industrial Digital Weighing Platforms & Parcel Cubing Systems',
      ];

  printSectionHeader('Material Handling Equipment & Industrial Systems');
  const halfEq = Math.ceil(eqSkills.length / 2);
  const eqCol1 = eqSkills.slice(0, halfEq);
  const eqCol2 = eqSkills.slice(halfEq);
  const eqStartY = y;

  eqCol1.forEach((eq, idx) => {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.7);
    pdf.setTextColor(41, 37, 36);
    pdf.text(`▪  ${eq}`, margin, eqStartY + idx * 3.8);
  });

  eqCol2.forEach((eq, idx) => {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.7);
    pdf.setTextColor(41, 37, 36);
    pdf.text(`▪  ${eq}`, margin + colW + 4, eqStartY + idx * 3.8);
  });

  y = eqStartY + Math.max(eqCol1.length, eqCol2.length) * 3.8 + 4.5;

  // Workplace Health, Safety & Physical Endurance Declaration
  printSectionHeader('Workplace Safety, Ergonomics & Physical Endurance');
  const safetyStatements = [
    'Physical Endurance: Proven stamina for sustained 8- to 12-hour continuous standing and active walking shifts.',
    'Ergonomic Manual Lifting: Trained in safe lifting techniques for loads up to 25 kg to prevent spinal strain.',
    '5S & Housekeeping: Strict compliance with visual staging aisles, hazard-free walkways, and neat bin storage.',
    'PPE Protocols: 100% adherence to safety boots (steel-toe), high-visibility vests, gloves, and helmet standards.',
    'Shift Availability: Unmarried with zero family restrictions; 100% available for rotating day, evening and night shifts.',
  ];

  safetyStatements.forEach((st) => {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.6);
    pdf.setTextColor(55, 50, 45);
    pdf.text(`✓  ${st}`, margin + 2, y);
    y += 3.6;
  });
  y += 2.5;

  // Education & Formal Training
  if (cv.education && cv.education.length > 0) {
    printSectionHeader('Education & Vocational Credentials');
    cv.education.forEach((edu) => {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8.2);
      pdf.setTextColor(28, 25, 23);
      pdf.text(edu.degree, margin, y);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7.8);
      pdf.setTextColor(120, 113, 108);
      pdf.text(edu.year, pageWidth - margin, y, { align: 'right' });
      y += 3.5;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7.6);
      pdf.setTextColor(68, 64, 60);
      pdf.text(`${edu.institution}  •  ${edu.location}${edu.details ? ` (${edu.details})` : ''}`, margin, y);
      y += 4;
    });
    y += 1.5;
  }

  // Languages (CEFR European Framework)
  printSectionHeader('Languages & CEFR Proficiencies');
  const langStartY = y;
  const halfLang = Math.ceil(cv.languages.length / 2);
  const langCol1 = cv.languages.slice(0, halfLang);
  const langCol2 = cv.languages.slice(halfLang);

  langCol1.forEach((l, idx) => {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.8);
    pdf.setTextColor(28, 25, 23);
    pdf.text(`${l.language}:`, margin, langStartY + idx * 4);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(68, 64, 60);
    pdf.text(` ${l.proficiency} [${l.levelBadge}]`, margin + 18, langStartY + idx * 4);
  });

  langCol2.forEach((l, idx) => {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.8);
    pdf.setTextColor(28, 25, 23);
    pdf.text(`${l.language}:`, margin + colW + 4, langStartY + idx * 4);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(68, 64, 60);
    pdf.text(` ${l.proficiency} [${l.levelBadge}]`, margin + colW + 22, langStartY + idx * 4);
  });

  y = langStartY + Math.max(langCol1.length, langCol2.length) * 4 + 4;

  // Driving License & Certifications
  if (cv.driverLicense || (cv.certifications && cv.certifications.length > 0)) {
    printSectionHeader('Licenses & Safety Certifications');
    if (cv.driverLicense) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.8);
      pdf.setTextColor(180, 83, 9);
      pdf.text(`Driving License:`, margin, y);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(41, 37, 36);
      pdf.text(`  ${cv.driverLicense}`, margin + 26, y);
      y += 3.8;
    }

    if (cv.certifications.length > 0) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7.5);
      pdf.setTextColor(55, 50, 45);
      const certText = cv.certifications.join('  •  ');
      const certLines = pdf.splitTextToSize(`Certifications: ${certText}`, contentWidth);
      pdf.text(certLines, margin, y);
      y += certLines.length * 3.4 + 2;
    }
    y += 1.5;
  }

  // Professional References
  printSectionHeader('Professional References');
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.6);
  pdf.setTextColor(68, 64, 60);
  const refText = cv.references || 'Professional and supervisory references from former logistics managers and warehouse supervisors available immediately upon request.';
  pdf.text(refText, margin, y);
  y += 5.5;

  // Data Protection & Consent Declaration (GDPR / Singapore PDPA)
  if (cv.gdprClause) {
    pdf.setDrawColor(214, 211, 209);
    pdf.setLineWidth(0.2);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 3;

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(6.5);
    pdf.setTextColor(120, 113, 108);
    pdf.text(
      isSingapore
        ? 'Singapore Personal Data Protection Act (PDPA 2012) Consent Clause:'
        : 'European General Data Protection Regulation (GDPR / EU 2016/679) Consent Clause:',
      margin,
      y
    );
    y += 2.6;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.2);
    const gdprLines = pdf.splitTextToSize(cv.gdprClause, contentWidth);
    pdf.text(gdprLines, margin, y, { lineHeightFactor: 1.15 });
    y += gdprLines.length * 2.8 + 2;

    // Signature Line
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7);
    pdf.setTextColor(28, 25, 23);
    pdf.text(`Candidate: ${details.fullName}`, margin, y);
    pdf.text(`Application Status: Ready for Work Permit Filing`, pageWidth - margin, y, { align: 'right' });
  }

  // Page 2 Footer
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(140, 135, 130);
  pdf.text(
    `Curriculum Vitae — Abdul Raheem  •  European Standard Format  •  Page 2 of 2`,
    pageWidth / 2,
    pageHeight - 8,
    { align: 'center' }
  );

  pdf.save(fileName);
  return true;
}

/**
 * Export CV to PDF.
 * Uses html-to-image with an automatic fallback to generateVectorCvPdf.
 */
export async function exportCvToPdf(
  elementId: string,
  fileName: string,
  details: CandidateDetails,
  cv: CvContent,
  onProgress?: (status: boolean) => void
): Promise<boolean> {
  try {
    if (onProgress) onProgress(true);

    const element = document.getElementById(elementId);
    if (!element) {
      return generateVectorCvPdf(details, cv, fileName);
    }

    try {
      const dataUrl = await toPng(element, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        filter: (node) => {
          if (node instanceof HTMLElement && node.classList.contains('no-print')) {
            return false;
          }
          return true;
        },
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = 210;
      const pdfHeight = 297;

      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load CV image'));
        img.src = dataUrl;
      });

      const imgWidth = pdfWidth;
      const imgHeight = (img.height * imgWidth) / img.width;

      if (imgHeight <= pdfHeight) {
        pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      } else {
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
          heightLeft -= pdfHeight;
        }
      }

      pdf.save(fileName);
      return true;
    } catch (renderError) {
      console.warn('html-to-image CV render error, falling back to direct vector CV PDF:', renderError);
      return generateVectorCvPdf(details, cv, fileName);
    }
  } catch (err) {
    console.error('Final fallback generating vector CV PDF due to error:', err);
    return generateVectorCvPdf(details, cv, fileName);
  } finally {
    if (onProgress) onProgress(false);
  }
}

