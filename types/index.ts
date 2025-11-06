/**
 * Language Demographics Assessment Tool
 * Type Definitions
 */

export interface LanguageData {
  language: string;
  percentage: number;
  speakers: number;
}

export interface DemographicData {
  zipCode: string;
  totalPopulation: number;
  topLanguages: LanguageData[];
  englishLessThanVeryWellPercentage: number;
  englishLessThanVeryWellCount: number;
  estimatedMonthlyNonEnglishCalls: number;
  dataSource: 'preloaded' | 'census-api';
  year: number;
}

export interface FormData {
  zipCode: string;
  role: string;
}

export interface LeadCaptureData {
  email: string;
  organization: string;
  phone?: string;
}

export interface SubmissionData extends LeadCaptureData, FormData {
  demographics: DemographicData;
  submissionDate: string;
}

export interface MetroData {
  zipCode: string;
  city: string;
  state: string;
  totalPopulation: number;
  languages: LanguageData[];
  englishLessThanVeryWellPercentage: number;
}

export interface CensusAPIResponse {
  zipCode: string;
  totalPopulation: number;
  languages: LanguageData[];
  englishLessThanVeryWellPercentage: number;
}

export const SUGGESTED_ROLES = [
  '911 Director',
  'Communications Manager',
  'PSAP Manager',
  'Emergency Services IT',
  'Emergency Communications Director',
  'Public Safety Director',
  'Other',
] as const;

export type Role = typeof SUGGESTED_ROLES[number];

// Constants
export const EMERGENCY_CALL_RATE = 0.5; // per 1,000 residents per month who speak English less than very well
