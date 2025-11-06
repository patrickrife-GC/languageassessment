/**
 * Analytics tracking utilities
 */

// Google Analytics
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '';

// Type definitions for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

/**
 * Track page views
 */
export const pageview = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

/**
 * Track custom events
 */
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}): void => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Predefined events for common actions
 */
export const trackZipCodeSubmit = (zipCode: string): void => {
  event({
    action: 'submit_zip_code',
    category: 'User Interaction',
    label: zipCode,
  });
};

export const trackFormSubmit = (organization: string): void => {
  event({
    action: 'submit_lead_form',
    category: 'Lead Generation',
    label: organization,
  });
};

export const trackPDFDownload = (zipCode: string): void => {
  event({
    action: 'download_pdf',
    category: 'Content',
    label: zipCode,
  });
};

export const trackResultsView = (zipCode: string): void => {
  event({
    action: 'view_results',
    category: 'User Engagement',
    label: zipCode,
  });
};
