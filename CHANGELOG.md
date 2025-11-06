# Changelog

All notable changes to the Language Demographics Assessment Tool will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-06

### Added
- Initial release of Language Demographics Assessment Tool
- ZIP code input form with role autocomplete
- Real-time demographic data lookup from pre-loaded metro database
- Results display with:
  - Headline statistic (% speaking English less than very well)
  - Top 10 languages ranked with percentages and speaker counts
  - Visual bar chart of top 5 languages
  - Estimated monthly non-English emergency calls calculation
- Lead capture form with email, organization, and phone fields
- Zapier webhook integration for HubSpot CRM
- PDF report generation with demographic insights
- Mobile-first responsive design (optimized for 375px viewport)
- Google Analytics tracking integration
- Census API fallback for non-preloaded ZIP codes
- Pre-loaded data for 25+ major metropolitan areas:
  - New York, Los Angeles, Chicago, Houston, Phoenix
  - Philadelphia, San Antonio, San Diego, Dallas, San Jose
  - Austin, Orlando, Baltimore, Miami, Seattle
  - Denver, Boston, Washington DC, Nashville, Portland
  - Las Vegas, St. Louis, Minneapolis, Atlanta, Cleveland
  - Indianapolis, Milwaukee, Albuquerque

### Technical Features
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Recharts for data visualization
- jsPDF for PDF generation
- Server-side API routes for form submission
- Environment-based configuration

### Documentation
- Comprehensive README with setup instructions
- API documentation for Zapier webhook
- Development and deployment guides
- Environment variable configuration guide

## [Unreleased]

### Planned Features (Phase 2)
- Year-over-year demographic trend comparison
- Benchmarking against similar-sized metropolitan areas
- Authenticated dashboard with user login
- Advanced filtering and comparison tools
- Video testimonials integration
- Compliance recommendations based on demographics
- Expand pre-loaded data to 50-75 metros
- Enhanced Census API integration
- Improved PDF generation with embedded charts

---

## Version History

### Version 1.0.0 (2025-11-06)
Initial public release for Convey911 marketing team.
