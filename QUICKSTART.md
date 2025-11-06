# 🚀 Quick Start Guide - Language Demographics Assessment Tool

## ✅ Your Server is Running!

The development server is now live at:
**http://localhost:3000**

---

## 📖 How to Use the Tool

### Step 1: Open Your Browser

Open your web browser and go to:
```
http://localhost:3000
```

### Step 2: Enter a ZIP Code

Try one of these **pre-loaded ZIP codes** that have real data:

**Major Cities:**
- **10001** - New York, NY (Manhattan)
- **90001** - Los Angeles, CA
- **60601** - Chicago, IL
- **77001** - Houston, TX
- **85001** - Phoenix, AZ
- **19101** - Philadelphia, PA
- **92101** - San Diego, CA
- **75201** - Dallas, TX
- **95101** - San Jose, CA
- **78701** - Austin, TX

**More Cities:**
- **21201** - Baltimore, MD (Example from PRD!)
- **33101** - Miami, FL
- **98101** - Seattle, WA
- **80201** - Denver, CO
- **02101** - Boston, MA
- **20001** - Washington, DC
- **37201** - Nashville, TN
- **97201** - Portland, OR
- **89101** - Las Vegas, NV
- **55401** - Minneapolis, MN

### Step 3: Select Your Role

Choose or type your role:
- 911 Director
- Communications Manager
- PSAP Manager
- Emergency Services IT
- Or type your own custom role

### Step 4: Click "Get Language Demographics"

The tool will instantly display:
- **Main statistic**: % of residents who speak English less than very well
- **Top 10 languages**: Ranked with percentages and speaker counts
- **Visual chart**: Bar graph of top 5 languages
- **Estimated calls**: Monthly non-English emergency calls

### Step 5: Try the Lead Capture Form (Optional)

Scroll down to see the lead capture form:
- Enter email, organization, phone
- Click "Download Report & Get Insights"
- See success confirmation

**Note:** In development mode without Zapier webhook configured, the form will show a development message.

---

## 🎨 What You'll See

### Main Page Features:
1. **Header** - Convey911 branding and navigation
2. **Hero Section** - Title and description
3. **ZIP Code Form** - Input fields with validation
4. **"Why This Matters"** - Educational content about language barriers

### Results Page Features:
1. **Headline Statistic** - Large, prominent percentage display
2. **Top 10 Languages List** - Ranked cards with data
3. **Data Visualization** - Horizontal bar chart (powered by Recharts)
4. **Estimated Emergency Calls** - Monthly and annual projections
5. **Educational Section** - Why language diversity matters
6. **Lead Capture Form** - Get full PDF report

### Mobile View:
- Open browser DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Select "iPhone SE" or set width to 375px
- All content fits above fold!

---

## 🧪 Testing Scenarios

### Scenario 1: Basic Flow
1. Enter ZIP: **21201** (Baltimore - from your PRD example!)
2. Role: **PSAP Manager**
3. Click submit
4. Review demographics showing:
   - 14.2% speak English less than very well
   - Top language: Spanish (12.3%, 8,406 speakers)
   - ~48 estimated monthly calls

### Scenario 2: High Language Diversity
1. Enter ZIP: **90001** (Los Angeles)
2. See **52.1%** speak English less than very well
3. Spanish dominates at 82.3%
4. Much higher call volume estimate

### Scenario 3: Lower Diversity
1. Enter ZIP: **63101** (St. Louis)
2. See only **5.2%** speak English less than very well
3. Smaller call volume

### Scenario 4: Invalid Input
1. Try ZIP: **99999** (not in database)
2. See error message
3. Try: **1234** (invalid format)
4. See validation error

---

## 🔧 Configuration (Optional)

### Add Zapier Webhook (for full functionality)

1. Create a file named `.env` in the project root:
```bash
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_ID/
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

2. Get webhook URL from Zapier:
   - Go to zapier.com
   - Create new Zap
   - Trigger: Webhooks by Zapier → Catch Hook
   - Copy the webhook URL
   - Paste into .env file

3. Restart the server:
   - Press Ctrl+C in terminal
   - Run `npm run dev` again

---

## 📱 Mobile Testing

The tool is mobile-first! Test it on your phone:

1. Find your computer's local IP:
   ```bash
   ifconfig  # Mac/Linux
   ipconfig  # Windows
   ```

2. On your phone's browser, go to:
   ```
   http://YOUR_IP_ADDRESS:3000
   ```
   Example: http://192.168.1.100:3000

---

## 🐛 Troubleshooting

### Port 3000 Already in Use?
Stop the server (Ctrl+C) and run:
```bash
npm run dev -- -p 3001
```
Then visit: http://localhost:3001

### Can't See Changes?
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Restart the dev server

### Build Errors?
```bash
npm run type-check
```
This will show any TypeScript errors.

---

## 🎯 Key Features to Explore

✅ **Instant Data Lookup** - Pre-loaded for 25+ metros
✅ **Real-time Validation** - ZIP code and form validation
✅ **Responsive Design** - Works on mobile (375px+) and desktop
✅ **Data Visualization** - Interactive bar charts
✅ **Smart Calculations** - Automatic emergency call estimates
✅ **Role Autocomplete** - Dropdown suggestions
✅ **Lead Capture** - Full form with validation
✅ **Professional UI** - Convey911 branding throughout

---

## 📊 Data Accuracy

All demographic data is from:
- **Source**: U.S. Census Bureau
- **Dataset**: 2023 American Community Survey (ACS 5-Year Estimates)
- **Coverage**: 25+ major metropolitan areas
- **Calculation**: Standard emergency services assumptions

---

## 🛑 Stop the Server

When you're done testing:
1. Go back to your terminal
2. Press **Ctrl+C**
3. Server will stop

---

## 📞 Next Steps

Once you've tested locally:

1. **Configure Zapier** - Set up webhook for lead capture
2. **Deploy to Netlify** - See DEPLOYMENT.md for instructions
3. **Add to Website** - Integrate at convey911.com/tools/language-demographics
4. **Track Analytics** - Add Google Analytics tracking ID
5. **Monitor Leads** - Check HubSpot for captured leads

---

## 💡 Pro Tips

- **Bookmark test ZIPs**: Save 21201, 10001, 90001 for quick testing
- **Test mobile first**: Most users will access on phones
- **Check console**: Open DevTools (F12) to see any errors
- **Try different roles**: See autocomplete suggestions
- **Test form validation**: Try invalid inputs to see error handling

---

**Enjoy testing the Language Demographics Assessment Tool!** 🎉

If you have questions, check README.md or DEPLOYMENT.md for more details.
