/**
 * PDF Report Generator
 * Generates personalized language demographics reports
 */

import { jsPDF } from 'jspdf';
import { DemographicData } from '@/types';
import { formatPercentage, formatNumber } from './demographics';

interface ReportData {
  zipCode: string;
  organization: string;
  role: string;
  demographics: DemographicData;
  generatedDate: string;
}

export async function generatePDFReport(data: ReportData): Promise<Blob> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Helper function to add text with wrapping
  const addText = (text: string, size: number = 12, isBold: boolean = false) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
    doc.text(lines, margin, yPosition);
    yPosition += lines.length * size * 0.5 + 5;
  };

  // Helper to check if new page is needed
  const checkNewPage = (spaceNeeded: number = 30) => {
    if (yPosition + spaceNeeded > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }
  };

  // Cover Page
  doc.setFillColor(0, 102, 204); // Convey Blue
  doc.rect(0, 0, pageWidth, 80, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('Community Language', pageWidth / 2, 30, { align: 'center' });
  doc.text('Readiness Report', pageWidth / 2, 45, { align: 'center' });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(`ZIP Code ${data.zipCode}`, pageWidth / 2, 60, { align: 'center' });

  yPosition = 100;
  doc.setTextColor(0, 0, 0);

  // Organization Details
  addText(`Prepared for: ${data.organization}`, 14, true);
  addText(`Role: ${data.role}`, 12);
  addText(`Generated: ${new Date(data.generatedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}`, 10);

  yPosition += 10;

  // Executive Summary
  checkNewPage(60);
  doc.setDrawColor(0, 102, 204);
  doc.setLineWidth(1);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  addText('Executive Summary', 18, true);
  addText(
    `This report provides detailed language demographics for ZIP code ${data.zipCode}, ` +
    `helping your organization understand language access needs in your service area.`,
    12
  );

  // Key Statistics Box
  checkNewPage(70);
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, yPosition, pageWidth - 2 * margin, 60, 3, 3, 'F');
  yPosition += 15;

  doc.setTextColor(0, 102, 204);
  addText('KEY STATISTICS', 16, true);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(
    formatPercentage(data.demographics.englishLessThanVeryWellPercentage),
    pageWidth / 2,
    yPosition,
    { align: 'center' }
  );
  yPosition += 15;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'of residents speak English less than very well',
    pageWidth / 2,
    yPosition,
    { align: 'center' }
  );
  yPosition += 10;

  doc.setFontSize(10);
  doc.text(
    `(${formatNumber(data.demographics.englishLessThanVeryWellCount)} residents)`,
    pageWidth / 2,
    yPosition,
    { align: 'center' }
  );
  yPosition += 20;

  // Top Languages
  checkNewPage(100);
  doc.setDrawColor(0, 102, 204);
  doc.setLineWidth(1);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  addText('Top 10 Languages Spoken at Home', 16, true);

  data.demographics.topLanguages.forEach((lang, index) => {
    checkNewPage(15);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${lang.language}`, margin, yPosition);

    doc.setFont('helvetica', 'normal');
    const statsText = `${formatPercentage(lang.percentage)} (${formatNumber(lang.speakers)} speakers)`;
    doc.text(statsText, pageWidth - margin, yPosition, { align: 'right' });
    yPosition += 8;
  });

  yPosition += 10;

  // Estimated Emergency Calls
  checkNewPage(70);
  doc.setFillColor(255, 243, 224);
  doc.roundedRect(margin, yPosition, pageWidth - 2 * margin, 55, 3, 3, 'F');
  yPosition += 15;

  doc.setTextColor(180, 83, 9);
  addText('ESTIMATED NON-ENGLISH EMERGENCY CALLS', 14, true);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(
    `~${formatNumber(data.demographics.estimatedMonthlyNonEnglishCalls)} calls/month`,
    pageWidth / 2,
    yPosition,
    { align: 'center' }
  );
  yPosition += 12;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `(~${formatNumber(data.demographics.estimatedMonthlyNonEnglishCalls * 12)} calls/year)`,
    pageWidth / 2,
    yPosition,
    { align: 'center' }
  );
  yPosition += 20;

  // New Page for Why This Matters
  doc.addPage();
  yPosition = margin;

  addText('Why Language Diversity Matters to Emergency Response', 18, true);
  yPosition += 5;

  addText('Language barriers delay emergency response', 14, true);
  addText(
    'Every second counts when lives are at stake. Callers who cannot effectively communicate in English ' +
    'experience longer call times and potential miscommunication of critical information such as location, ' +
    'nature of emergency, and medical conditions.',
    11
  );
  yPosition += 5;

  addText('Compliance requirements', 14, true);
  addText(
    'Title VI of the Civil Rights Act and ADA regulations require meaningful access to emergency services ' +
    'for Limited English Proficient (LEP) individuals. PSAPs must take reasonable steps to provide language ' +
    'access services.',
    11
  );
  yPosition += 5;

  addText('Modern solutions are available', 14, true);
  addText(
    'PSAPs across the country are implementing language access technology that connects dispatchers with ' +
    'professional interpreters in seconds, reducing call times and improving outcomes for non-English speakers.',
    11
  );
  yPosition += 15;

  // Call to Action
  checkNewPage(80);
  doc.setFillColor(0, 102, 204);
  doc.roundedRect(margin, yPosition, pageWidth - 2 * margin, 70, 3, 3, 'F');
  yPosition += 15;

  doc.setTextColor(255, 255, 255);
  addText('See How Other PSAPs Are Solving This', 16, true);

  doc.setFontSize(11);
  doc.text(
    'Learn how modern PSAPs are providing instant language access',
    pageWidth / 2,
    yPosition,
    { align: 'center' }
  );
  yPosition += 10;

  doc.text(
    'for emergency callers with proven technology solutions.',
    pageWidth / 2,
    yPosition,
    { align: 'center' }
  );
  yPosition += 15;

  doc.setFontSize(10);
  doc.text(
    'Visit: www.convey911.com/solutions',
    pageWidth / 2,
    yPosition,
    { align: 'center' }
  );
  yPosition += 10;

  doc.setTextColor(0, 0, 0);

  // Footer on last page
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text(
    'Data Source: U.S. Census Bureau, 2023 American Community Survey (ACS 5-Year Estimates)',
    pageWidth / 2,
    pageHeight - 15,
    { align: 'center' }
  );
  doc.text(
    'Generated by Convey911 Language Demographics Assessment Tool',
    pageWidth / 2,
    pageHeight - 10,
    { align: 'center' }
  );

  // Return PDF as Blob
  return doc.output('blob');
}

/**
 * Generate and download PDF report
 */
export async function downloadPDFReport(data: ReportData): Promise<void> {
  const blob = await generatePDFReport(data);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Language-Demographics-Report-${data.zipCode}-${Date.now()}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
