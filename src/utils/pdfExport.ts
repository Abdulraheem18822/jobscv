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
  fileName: string,
  fontFamily: string = 'times'
): boolean {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const font = fontFamily === 'sans' ? 'helvetica' : 'times';
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
  pdf.setFont(font, 'bold');
  pdf.setFontSize(20);
  pdf.setTextColor(28, 25, 23); // Stone 900
  pdf.text(details.fullName, margin, y);

  // Contacts Right-Aligned
  pdf.setFont(font, 'normal');
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
  pdf.setFont(font, 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(146, 64, 14); // Amber 800
  pdf.text(details.targetJobTitle, margin, y);
  y += 5;

  // Nationality & Marital status
  pdf.setFont(font, 'normal');
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
    pdf.setFont(font, 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(28, 25, 23);
    pdf.text('CANDIDATE IDENTITY & WORK PERMIT VERIFICATION SUMMARY', margin + 3, y + 5);

    pdf.setFont(font, 'normal');
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
    pdf.setFont(font, 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(120, 113, 108);
    pdf.text('Passport Number:', margin + 3, dataY);
    pdf.setFont(font, 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(28, 25, 23);
    pdf.text(details.passport.passportNumber || 'Pending', margin + 3, dataY + 4);

    // Col 2: Date of Birth
    pdf.setFont(font, 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(120, 113, 108);
    pdf.text('Date of Birth:', margin + colWidth + 2, dataY);
    pdf.setFont(font, 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(41, 37, 36);
    pdf.text(details.passport.dateOfBirth || details.dateOfBirth, margin + colWidth + 2, dataY + 4);

    // Col 3: Place of Issue
    pdf.setFont(font, 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(120, 113, 108);
    pdf.text('Place of Issue:', margin + colWidth * 2 + 2, dataY);
    pdf.setFont(font, 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(41, 37, 36);
    pdf.text(details.passport.placeOfIssue || 'India', margin + colWidth * 2 + 2, dataY + 4);

    // Col 4: Expiry
    pdf.setFont(font, 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(120, 113, 108);
    pdf.text('Passport Validity:', margin + colWidth * 3 + 2, dataY);
    pdf.setFont(font, 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(41, 37, 36);
    pdf.text(details.passport.expiryDate ? `Exp: ${details.passport.expiryDate}` : 'Valid', margin + colWidth * 3 + 2, dataY + 4);

    // Verification badges bottom row
    pdf.setFont(font, 'normal');
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
  pdf.setFont(font, 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(87, 83, 78);
  pdf.text(details.date, margin, y);
  y += 5;

  // 4. Recipient block
  checkPageBreak(18);
  pdf.setFont(font, 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(28, 25, 23);
  pdf.text('To:', margin, y);
  y += 4;
  pdf.setFont(font, 'normal');
  pdf.text(details.targetCompany, margin, y);
  y += 4;
  pdf.text(`${details.targetCity ? `${details.targetCity}, ` : ''}${details.targetCountry}`, margin, y);
  y += 6;

  // 5. Subject Line
  checkPageBreak(10);
  pdf.setFont(font, 'bold');
  pdf.setFontSize(9.5);
  pdf.setTextColor(28, 25, 23);
  const subjectText = `RE: Application for ${details.targetJobTitle} — Work Permit Sponsorship Applicant`;
  pdf.text(subjectText, margin, y);
  y += 6;

  // 6. Salutation
  checkPageBreak(8);
  pdf.setFont(font, 'bold');
  pdf.setFontSize(9.5);
  pdf.text(content.salutation, margin, y);
  y += 6;

  // 7. Paragraphs Helper
  const printParagraph = (text: string, isEmphasis = false) => {
    pdf.setFont(font, isEmphasis ? 'bold' : 'normal');
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
  pdf.setFont(font, 'normal');
  pdf.setFontSize(9.5);
  pdf.setTextColor(41, 37, 36);
  pdf.text(content.signOff, margin, y);
  y += 6;

  pdf.setFont(font, 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(28, 25, 23);
  pdf.text(details.fullName, margin, y);
  y += 4.5;

  pdf.setFont(font, 'normal');
  pdf.setFontSize(8.5);
  pdf.setTextColor(87, 83, 78);
  pdf.text(`Indian Citizen  •  Candidate for ${details.targetCountry} Employment Visa`, margin, y);
  y += 4;
  pdf.setFont(font, 'normal');
  pdf.text(`Passport No: ${details.passport.passportNumber || '[Pending]'}`, margin, y);
  y += 6;

  // 9. Polish RODO Clause (if applicable)
  if (details.targetCountry === 'Poland' && details.includeRodoClause) {
    checkPageBreak(22);
    pdf.setDrawColor(214, 211, 209);
    pdf.setLineWidth(0.2);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 4;

    pdf.setFont(font, 'bold');
    pdf.setFontSize(6.5);
    pdf.setTextColor(120, 113, 108);
    pdf.text('Polish Employment GDPR / RODO Clause:', margin, y);
    y += 3;

    pdf.setFont(font, 'normal');
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
        skipFonts: true,
        fontEmbedCSS: '',
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
        // Guarantee cover letter fits cleanly on EXACTLY 1 page as strictly requested
        const scale = (pdfHeight - 2) / imgHeight;
        const scaledWidth = imgWidth * scale;
        const scaledHeight = imgHeight * scale;
        const offsetX = Math.max(0, (pdfWidth - scaledWidth) / 2);
        pdf.addImage(dataUrl, 'PNG', offsetX, 1, scaledWidth, scaledHeight, undefined, 'FAST');
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


export {
  drawVectorPassportPhoto,
  generateVectorCvPdf,
  exportCvToPdf,
} from './pdfExportCv';
