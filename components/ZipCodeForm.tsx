'use client';

import { useState, FormEvent } from 'react';
import { DemographicData, SUGGESTED_ROLES } from '@/types';
import { validateZipCode, lookupMetroData } from '@/lib/utils/demographics';

interface ZipCodeFormProps {
  onSubmit: (data: DemographicData, formData: { zipCode: string; role: string }) => void;
}

export default function ZipCodeForm({ onSubmit }: ZipCodeFormProps) {
  const [zipCode, setZipCode] = useState('');
  const [role, setRole] = useState('');
  const [showRoleSuggestions, setShowRoleSuggestions] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredRoles = SUGGESTED_ROLES.filter((r) =>
    r.toLowerCase().includes(role.toLowerCase())
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateZipCode(zipCode)) {
      setError('Please enter a valid 5-digit US ZIP code');
      return;
    }

    if (!role.trim()) {
      setError('Please enter your role');
      return;
    }

    setLoading(true);

    try {
      // Try pre-loaded data first
      const data = lookupMetroData(zipCode);

      if (data) {
        onSubmit(data, { zipCode, role });
      } else {
        // In production, this would call the Census API
        // For now, show error message
        setError(
          'This ZIP code is not yet available in our database. We currently support major metropolitan areas. Please try another ZIP code or contact us for assistance.'
        );
      }
    } catch (err) {
      setError('An error occurred while retrieving data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <div className="space-y-6">
        {/* ZIP Code Input */}
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
            placeholder="Enter 5-digit ZIP code"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-convey-blue focus:border-transparent text-lg"
            maxLength={5}
            required
          />
        </div>

        {/* Role Input with Autocomplete */}
        <div className="relative">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
            Your Role <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onFocus={() => setShowRoleSuggestions(true)}
            onBlur={() => setTimeout(() => setShowRoleSuggestions(false), 200)}
            placeholder="e.g., PSAP Manager"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-convey-blue focus:border-transparent"
            required
          />
          {showRoleSuggestions && filteredRoles.length > 0 && role.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredRoles.map((suggestedRole) => (
                <button
                  key={suggestedRole}
                  type="button"
                  onClick={() => {
                    setRole(suggestedRole);
                    setShowRoleSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-convey-gray transition-colors"
                >
                  {suggestedRole}
                </button>
              ))}
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-convey-blue text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Analyzing Demographics...
            </span>
          ) : (
            'Get Language Demographics'
          )}
        </button>
      </div>

      <p className="mt-4 text-xs text-gray-500 text-center">
        Data source: U.S. Census Bureau, 2023 American Community Survey
      </p>
    </form>
  );
}
