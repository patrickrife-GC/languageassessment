'use client';

import { DemographicData } from '@/types';
import { formatPercentage, formatNumber } from '@/lib/utils/demographics';
import LanguageChart from './LanguageChart';

interface ResultsDisplayProps {
  data: DemographicData;
  formData: { zipCode: string; role: string };
  onReset: () => void;
}

export default function ResultsDisplay({ data, formData, onReset }: ResultsDisplayProps) {
  return (
    <div className="space-y-8">
      {/* Header with Reset Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-convey-dark">
            ZIP Code {data.zipCode} Language Demographics
          </h2>
          <p className="text-gray-600 mt-1">
            Population: {formatNumber(data.totalPopulation)}
          </p>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm text-convey-blue border border-convey-blue rounded-md hover:bg-convey-blue hover:text-white transition-colors no-print"
        >
          New Search
        </button>
      </div>

      {/* Headline Statistic */}
      <div className="bg-gradient-to-br from-convey-blue to-blue-600 text-white rounded-lg p-8 md:p-12 text-center shadow-xl">
        <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
          {formatPercentage(data.englishLessThanVeryWellPercentage)}
        </div>
        <p className="text-xl md:text-2xl font-medium">
          of your community speaks English less than very well
        </p>
        <p className="mt-4 text-lg opacity-90">
          That's approximately {formatNumber(data.englishLessThanVeryWellCount)} residents
        </p>
      </div>

      {/* Top Languages - Mobile Optimized */}
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-convey-dark mb-6">
          Top 10 Languages Spoken at Home
        </h3>

        <div className="space-y-4">
          {data.topLanguages.map((lang, index) => (
            <div
              key={lang.language}
              className="flex items-center justify-between p-4 bg-convey-gray rounded-lg hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-convey-blue text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <div className="font-semibold text-convey-dark">{lang.language}</div>
                  <div className="text-sm text-gray-600">
                    {formatNumber(lang.speakers)} speakers
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-convey-blue">
                  {formatPercentage(lang.percentage)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Visualization */}
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-convey-dark mb-6">
          Top 5 Languages Visualization
        </h3>
        <LanguageChart languages={data.topLanguages} maxLanguages={5} />
      </div>

      {/* Estimated Monthly Calls */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-amber-900 mb-4">
          Estimated Non-English Emergency Calls
        </h3>
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-4xl md:text-5xl font-bold text-amber-600">
            ~{formatNumber(data.estimatedMonthlyNonEnglishCalls)}
          </div>
          <div className="text-lg text-amber-800">calls per month</div>
        </div>
        <p className="text-amber-800 text-sm">
          Based on demographics, your area likely receives approximately{' '}
          <strong>{formatNumber(data.estimatedMonthlyNonEnglishCalls)}</strong> non-English emergency calls
          monthly, or approximately{' '}
          <strong>{formatNumber(data.estimatedMonthlyNonEnglishCalls * 12)}</strong> annually.
        </p>
        <details className="mt-4">
          <summary className="text-sm text-amber-700 cursor-pointer hover:text-amber-900">
            How is this calculated?
          </summary>
          <p className="mt-2 text-xs text-amber-700">
            Calculation: (Population × % English Less Than Very Well × Standard Call Rate) ÷ 1,000.
            We use a standard assumption of 0.5 emergency calls per 1,000 residents per month who speak
            English less than very well. This is an estimate based on industry averages.
          </p>
        </details>
      </div>

      {/* Why This Matters */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-convey-dark mb-4">
          Why This Matters for Emergency Services
        </h3>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Language barriers delay emergency response.</strong> Every second counts when lives are at
            stake. Callers who cannot effectively communicate in English experience longer call times and
            potential miscommunication of critical information.
          </p>
          <p>
            <strong>Compliance requirements.</strong> Title VI of the Civil Rights Act and ADA regulations
            require meaningful access to emergency services for Limited English Proficient (LEP) individuals.
          </p>
          <p>
            <strong>Modern solutions exist.</strong> PSAPs across the country are implementing language
            access technology that connects dispatchers with professional interpreters in seconds, reducing
            call times and improving outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}
