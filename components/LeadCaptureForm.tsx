'use client';

import { useState, FormEvent } from 'react';
import { DemographicData, LeadCaptureData } from '@/types';

interface LeadCaptureFormProps {
  demographicData: DemographicData;
  formData: { zipCode: string; role: string };
  onSubmit: () => void;
}

export default function LeadCaptureForm({ demographicData, formData, onSubmit }: LeadCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const submissionData = {
        email,
        organization,
        phone,
        zipCode: formData.zipCode,
        role: formData.role,
        demographics: {
          topLanguages: demographicData.topLanguages,
          englishLessThanVeryWellPercentage: demographicData.englishLessThanVeryWellPercentage,
          englishLessThanVeryWellCount: demographicData.englishLessThanVeryWellCount,
          estimatedMonthlyNonEnglishCalls: demographicData.estimatedMonthlyNonEnglishCalls,
          totalPopulation: demographicData.totalPopulation,
        },
        submissionDate: new Date().toISOString(),
      };

      // Submit to API endpoint (which will trigger Zapier webhook)
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      // Track conversion event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'Lead Generation',
          event_label: 'Language Demographics Tool',
        });
      }

      onSubmit();
    } catch (err) {
      setError('An error occurred. Please try again or contact us directly.');
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-convey-blue to-blue-600 rounded-lg p-8 md:p-10 text-white shadow-xl">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Get Your Complete Community Language Readiness Report
          </h2>
          <p className="text-lg opacity-90">
            Download your personalized report with detailed language demographics, compliance insights, and
            actionable recommendations for your organization.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address <span className="text-red-300">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@organization.com"
              className="w-full px-4 py-3 rounded-md text-gray-900 focus:ring-2 focus:ring-white"
              required
            />
          </div>

          {/* Organization */}
          <div>
            <label htmlFor="organization" className="block text-sm font-medium mb-2">
              Organization Name <span className="text-red-300">*</span>
            </label>
            <input
              type="text"
              id="organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="Your PSAP or Organization"
              className="w-full px-4 py-3 rounded-md text-gray-900 focus:ring-2 focus:ring-white"
              required
            />
          </div>

          {/* Phone (Optional) */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone Number <span className="text-sm opacity-75">(Optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full px-4 py-3 rounded-md text-gray-900 focus:ring-2 focus:ring-white"
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-300 rounded-md p-4 text-red-800 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-convey-blue py-3 px-6 rounded-md font-semibold hover:bg-gray-100 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Generating Report...
              </span>
            ) : (
              'Download Report & Get Insights'
            )}
          </button>

          <p className="text-xs text-center opacity-75 mt-4">
            By submitting, you agree to receive communication from Convey911. We respect your privacy and will
            never share your information. View our{' '}
            <a href="https://www.convey911.com/privacy" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
