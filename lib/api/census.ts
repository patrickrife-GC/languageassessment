/**
 * Census API integration for ZIP codes not in pre-loaded data
 */

import { CensusAPIResponse, LanguageData } from '@/types';

const CENSUS_API_BASE = 'https://api.census.gov/data/2022/acs/acs5';
const CENSUS_REPORTER_BASE = 'https://api.censusreporter.org/1.0';

/**
 * Fetch demographic data from Census API
 * This is a fallback for ZIP codes not in pre-loaded metro data
 */
export async function fetchCensusData(zipCode: string): Promise<CensusAPIResponse | null> {
  try {
    // Try Census Reporter API first (easier to use, no API key needed)
    const response = await fetch(
      `${CENSUS_REPORTER_BASE}/data/show/latest?table_ids=B16001&geo_ids=86000US${zipCode}`
    );

    if (!response.ok) {
      throw new Error('Census Reporter API request failed');
    }

    const data = await response.json();

    // Parse Census Reporter response
    // Note: This is a simplified parser - actual implementation would need
    // to handle the complex Census Reporter data structure
    const parsed = parseCensusReporterData(data, zipCode);

    return parsed;
  } catch (error) {
    console.error('Census API error:', error);
    return null;
  }
}

/**
 * Parse Census Reporter API response
 * Note: This is a simplified version. Real implementation needs to handle
 * the actual Census Reporter data structure for table B16001 (Language Spoken at Home)
 */
function parseCensusReporterData(data: any, zipCode: string): CensusAPIResponse {
  // Placeholder implementation
  // In production, this would parse the actual Census data structure

  // For now, return mock data structure
  // Real implementation would extract:
  // - Total population
  // - Language counts from table B16001
  // - Calculate percentages

  const totalPopulation = data?.data?.[`86000US${zipCode}`]?.B16001?.estimate?.B16001001 || 0;

  // Extract top languages (simplified)
  const languages: LanguageData[] = [
    { language: 'Spanish', percentage: 15, speakers: Math.round(totalPopulation * 0.15) },
    { language: 'Chinese', percentage: 3, speakers: Math.round(totalPopulation * 0.03) },
    { language: 'Vietnamese', percentage: 2, speakers: Math.round(totalPopulation * 0.02) },
    { language: 'Arabic', percentage: 1.5, speakers: Math.round(totalPopulation * 0.015) },
    { language: 'French', percentage: 1, speakers: Math.round(totalPopulation * 0.01) },
    { language: 'Korean', percentage: 1, speakers: Math.round(totalPopulation * 0.01) },
    { language: 'Tagalog', percentage: 1, speakers: Math.round(totalPopulation * 0.01) },
    { language: 'Russian', percentage: 0.8, speakers: Math.round(totalPopulation * 0.008) },
    { language: 'German', percentage: 0.7, speakers: Math.round(totalPopulation * 0.007) },
    { language: 'Hindi', percentage: 0.6, speakers: Math.round(totalPopulation * 0.006) },
  ];

  return {
    zipCode,
    totalPopulation,
    languages,
    englishLessThanVeryWellPercentage: 10, // Default estimate
  };
}

/**
 * Alternative: Direct Census Bureau API
 * Requires API key and more complex querying
 */
export async function fetchDirectCensusData(
  zipCode: string,
  apiKey?: string
): Promise<CensusAPIResponse | null> {
  if (!apiKey) {
    console.warn('Census API key not provided');
    return null;
  }

  try {
    // Example Census Bureau API call
    // Table B16001: Language Spoken at Home by Ability to Speak English
    const response = await fetch(
      `${CENSUS_API_BASE}?get=NAME,B16001_001E,B16001_002E&for=zip%20code%20tabulation%20area:${zipCode}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('Census Bureau API request failed');
    }

    const data = await response.json();

    // Parse and return
    // This is also simplified - real implementation needed
    return null;
  } catch (error) {
    console.error('Census Bureau API error:', error);
    return null;
  }
}
