'use client';

import { useState } from 'react';
import { DemographicData } from '@/types';
import ZipCodeForm from '@/components/ZipCodeForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [demographicData, setDemographicData] = useState<DemographicData | null>(null);
  const [formData, setFormData] = useState<{ zipCode: string; role: string } | null>(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (data: DemographicData, formValues: { zipCode: string; role: string }) => {
    setDemographicData(data);
    setFormData(formValues);
    setShowLeadCapture(true);
  };

  const handleLeadCaptureSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setDemographicData(null);
    setFormData(null);
    setShowLeadCapture(false);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {!demographicData ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-convey-dark mb-4">
                Understand Your Community's Language Diversity
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Get instant insights into language barriers and emergency communication needs in your service area
              </p>
            </div>

            <ZipCodeForm onSubmit={handleFormSubmit} />

            <div className="mt-12 bg-convey-gray rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4">Why This Matters</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-convey-blue mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Every second counts in emergency response - language barriers can delay critical help</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-convey-blue mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Language diversity in your community is measurable and actionable</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-convey-blue mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Modern PSAPs are solving language barriers with proven technology solutions</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <ResultsDisplay
              data={demographicData}
              formData={formData!}
              onReset={handleReset}
            />

            {showLeadCapture && !submitted && (
              <div className="mt-12 max-w-3xl mx-auto">
                <LeadCaptureForm
                  demographicData={demographicData}
                  formData={formData!}
                  onSubmit={handleLeadCaptureSubmit}
                />
              </div>
            )}

            {submitted && (
              <div className="mt-12 max-w-3xl mx-auto bg-green-50 border border-green-200 rounded-lg p-6 md:p-8 text-center">
                <div className="mb-4">
                  <svg className="w-16 h-16 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-2">Thank You!</h3>
                <p className="text-green-800 mb-4">
                  Your complete Community Language Readiness Report has been sent to your email.
                </p>
                <p className="text-green-700 text-sm">
                  Check your inbox for a detailed PDF report with recommendations and next steps.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
