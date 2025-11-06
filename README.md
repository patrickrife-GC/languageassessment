# Language Demographics Assessment Tool

A lead generation tool for Convey911 that helps PSAPs, 911 Directors, and emergency services decision-makers understand their community's language diversity and emergency communication needs.

## 🎯 Overview

The Language Demographics Assessment tool visualizes Census-based demographic data to create demand for Convey911's product suite while educating users on language barriers in their service area.

**Key Features:**
- Instant demographic insights for ZIP codes
- Visual representation of top languages spoken
- Estimated non-English emergency calls calculation
- Lead capture with PDF report generation
- Mobile-first responsive design
- HubSpot/Zapier integration for CRM

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd languageassessment
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/
CENSUS_API_KEY=your_census_api_key_here (optional)
NEXT_PUBLIC_GA_TRACKING_ID=your_ga_tracking_id (optional)
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
languageassessment/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   └── submit/           # Form submission endpoint
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Main page
│   ├── globals.css           # Global styles
│   └── analytics.tsx         # Analytics component
├── components/               # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ZipCodeForm.tsx
│   ├── ResultsDisplay.tsx
│   ├── LanguageChart.tsx
│   └── LeadCaptureForm.tsx
├── lib/                      # Utilities and libraries
│   ├── api/
│   │   └── census.ts         # Census API integration
│   └── utils/
│       ├── demographics.ts   # Data lookup and calculations
│       ├── pdf-generator.ts  # PDF report generation
│       └── analytics.ts      # Analytics tracking
├── data/                     # Pre-loaded data
│   └── metro-data.json       # Top 25+ metro ZIP codes
├── types/                    # TypeScript definitions
│   └── index.ts
├── public/                   # Static assets
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── package.json
```

## 🔧 Configuration

### Zapier Webhook

1. Create a Zap in Zapier with a **Webhook trigger** (Catch Hook)
2. Copy the webhook URL
3. Add it to your `.env` file as `ZAPIER_WEBHOOK_URL`

**Webhook Payload:**
```json
{
  "email": "user@example.com",
  "organization": "Baltimore City PSAP",
  "phone": "410-555-0123",
  "zipCode": "21201",
  "role": "PSAP Manager",
  "demographics": {
    "topLanguages": [...],
    "englishLessThanVeryWellPercentage": 14.2,
    "estimatedMonthlyNonEnglishCalls": 45
  },
  "submissionDate": "2025-11-06T10:30:00Z",
  "tool": "Language Demographics Assessment"
}
```

### HubSpot Integration

Connect your Zapier webhook to HubSpot:
1. Action: Create/Update Contact
2. Map fields:
   - Email → Email
   - Organization → Company
   - Phone → Phone
   - ZIP Code → Custom field: `tool_submission_zipcode`
   - Role → Custom field: `tool_submission_role`
   - Demographics → Custom field: `tool_submission_demographics`

### Google Analytics

1. Get your GA4 Measurement ID (G-XXXXXXXXXX)
2. Add it to `.env` as `NEXT_PUBLIC_GA_TRACKING_ID`
3. Analytics will track:
   - Page views
   - ZIP code submissions
   - Form completions
   - PDF downloads

## 📊 Data Sources

### Pre-loaded Metro Data

The tool includes pre-loaded data for 25+ major metropolitan areas, covering:
- New York, Los Angeles, Chicago, Houston, Phoenix
- Philadelphia, San Antonio, San Diego, Dallas, San Jose
- Austin, Jacksonville, Fort Worth, Columbus, Charlotte
- And more...

Data includes:
- Total population
- Top 10 languages spoken at home
- Percentage speaking English less than very well
- Based on 2023 ACS 5-Year Estimates

### Census API Fallback

For ZIP codes not in pre-loaded data:
- Automatically queries Census Reporter API
- Real-time data retrieval
- Graceful error handling with cached fallback

## 🎨 Customization

### Adding More Metro Data

Edit `data/metro-data.json` and add new entries:

```json
{
  "zipCode": "12345",
  "city": "City Name",
  "state": "ST",
  "totalPopulation": 50000,
  "languages": [
    { "language": "Spanish", "percentage": 25.0, "speakers": 12500 },
    ...
  ],
  "englishLessThanVeryWellPercentage": 15.0
}
```

### Customizing Calculations

The emergency call rate is defined in `types/index.ts`:

```typescript
export const EMERGENCY_CALL_RATE = 0.5; // per 1,000 residents per month
```

Adjust this value based on your data or research.

### Branding

Update colors in `tailwind.config.js`:

```javascript
colors: {
  'convey-blue': '#0066CC',
  'convey-dark': '#1a1a1a',
  'convey-gray': '#f5f5f5',
}
```

## 🚢 Deployment

### Netlify (Recommended)

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. Deploy!

The tool will be accessible at `/tools/language-demographics` if deploying as subdirectory.

### Vercel

```bash
vercel --prod
```

### Environment Variables for Production

Make sure to set in your deployment platform:
- `ZAPIER_WEBHOOK_URL`
- `NEXT_PUBLIC_GA_TRACKING_ID` (optional)
- `CENSUS_API_KEY` (optional)

## 📈 Analytics & Metrics

### Tracked Events

- **Page View**: User lands on tool
- **ZIP Code Submit**: User enters ZIP and role
- **Results View**: Demographics displayed
- **Form Submit**: Lead capture completed
- **PDF Download**: Report downloaded

### Success Metrics (First 90 Days)

- **Target**: 400 qualified leads
- **Email engagement**: 25%+ open rate, 4%+ CTR
- **Form completion**: 15%+ of visitors

## 🧪 Testing

Run type checking:
```bash
npm run type-check
```

Run linting:
```bash
npm run lint
```

Build production version:
```bash
npm run build
```

Test production build locally:
```bash
npm run build && npm start
```

## 📱 Mobile Responsiveness

The tool is optimized for mobile devices:
- Primary viewport: 375px (iPhone SE/12/13 mini)
- All data visible above fold on mobile
- Touch-optimized form inputs
- Responsive charts and visualizations

## 🔒 Privacy & Compliance

- GDPR compliant (US-only data collection)
- Privacy policy link required
- Secure data transmission (HTTPS only)
- No third-party data sharing
- Data stored securely in HubSpot

## 📞 Support

For questions or issues:
- Email: info@convey911.com
- Documentation: [Convey911 Docs](https://www.convey911.com/docs)

## 📄 License

Copyright © 2025 Convey911. All rights reserved.

---

## 🛠️ Development Notes

### Phase 2 Features (Future)

- Year-over-year trend comparison
- Benchmarking against similar metros
- Advanced filtering and comparison tools
- Video testimonials in dashboard
- Compliance recommendations
- Authenticated dashboard with login

### Known Limitations

- Census API integration is simplified (needs full implementation)
- PDF generation is basic (can be enhanced with charts/graphs)
- Pre-loaded data covers ~25 metros (expand to 50-75)

### Contributing

This is an internal Convey911 project. For contributions:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit pull request for review

---

**Built with Next.js 14, React 18, TypeScript, and Tailwind CSS**

**Deployed on Netlify at convey911.com/tools/language-demographics**
