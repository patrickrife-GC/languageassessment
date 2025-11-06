/**
 * Demographics calculation utilities
 */

import { DemographicData, LanguageData, MetroData, EMERGENCY_CALL_RATE } from '@/types';
import metroDataJson from '@/data/metro-data.json';

const metroData: MetroData[] = metroDataJson as MetroData[];

/**
 * Calculate estimated monthly non-English emergency calls
 * Formula: (Population × % English Less Than Very Well × Standard Call Rate) / 1000
 */
export function calculateEstimatedCalls(
  totalPopulation: number,
  englishLessThanVeryWellPercentage: number
): number {
  const englishLessThanVeryWellCount = Math.round(
    (totalPopulation * englishLessThanVeryWellPercentage) / 100
  );

  const estimatedCalls = Math.round(
    (englishLessThanVeryWellCount * EMERGENCY_CALL_RATE) / 1000
  );

  return Math.max(1, estimatedCalls); // Return at least 1 call
}

/**
 * Lookup demographic data for a ZIP code from pre-loaded metro data
 */
export function lookupMetroData(zipCode: string): DemographicData | null {
  const metro = metroData.find((m) => m.zipCode === zipCode);

  if (!metro) {
    return null;
  }

  const englishLessThanVeryWellCount = Math.round(
    (metro.totalPopulation * metro.englishLessThanVeryWellPercentage) / 100
  );

  const estimatedMonthlyNonEnglishCalls = calculateEstimatedCalls(
    metro.totalPopulation,
    metro.englishLessThanVeryWellPercentage
  );

  return {
    zipCode: metro.zipCode,
    totalPopulation: metro.totalPopulation,
    topLanguages: metro.languages,
    englishLessThanVeryWellPercentage: metro.englishLessThanVeryWellPercentage,
    englishLessThanVeryWellCount,
    estimatedMonthlyNonEnglishCalls,
    dataSource: 'preloaded',
    year: 2023,
  };
}

/**
 * Validate US ZIP code format
 */
export function validateZipCode(zipCode: string): boolean {
  return /^\d{5}$/.test(zipCode);
}

/**
 * Format percentage with one decimal place
 */
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

/**
 * Format number with commas
 */
export function formatNumber(value: number): string {
  return value.toLocaleString('en-US');
}

/**
 * Get all available ZIP codes from pre-loaded data
 */
export function getAvailableZipCodes(): string[] {
  return metroData.map((m) => m.zipCode);
}

/**
 * Search for metros by city name (for autocomplete)
 */
export function searchMetros(query: string): MetroData[] {
  const lowerQuery = query.toLowerCase();
  return metroData.filter(
    (m) =>
      m.city.toLowerCase().includes(lowerQuery) ||
      m.state.toLowerCase().includes(lowerQuery) ||
      m.zipCode.includes(query)
  );
}
