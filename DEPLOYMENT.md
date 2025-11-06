# Deployment Guide

## Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] All environment variables are configured
- [ ] Zapier webhook is set up and tested
- [ ] HubSpot integration is configured
- [ ] Google Analytics tracking ID is added (if using)
- [ ] Pre-loaded metro data is complete and validated
- [ ] Mobile responsiveness tested on real devices
- [ ] Forms and data validation tested
- [ ] PDF generation tested
- [ ] All links point to correct URLs
- [ ] Privacy policy and terms links are updated

## Netlify Deployment

### Initial Setup

1. **Connect Repository**
   - Log in to Netlify
   - Click "New site from Git"
   - Choose your Git provider (GitHub, GitLab, Bitbucket)
   - Select the languageassessment repository

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Environment Variables**
   Go to Site settings → Environment variables and add:
   ```
   ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/
   NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
   NODE_ENV=production
   ```

4. **Deploy Site**
   - Click "Deploy site"
   - Wait for build to complete
   - Site will be live at your Netlify subdomain

### Custom Domain Setup

1. Go to Site settings → Domain management
2. Add custom domain: `tools.convey911.com` or subdirectory
3. Configure DNS:
   - Add CNAME record pointing to your Netlify site
   - Or configure A records for apex domain

### Subdirectory Deployment

To deploy at `convey911.com/tools/language-demographics`:

1. Update `next.config.js`:
   ```javascript
   basePath: '/tools/language-demographics',
   assetPrefix: '/tools/language-demographics',
   ```

2. Configure Netlify proxy:
   Add to `netlify.toml`:
   ```toml
   [[redirects]]
     from = "/tools/language-demographics/*"
     to = "/:splat"
     status = 200
   ```

## Vercel Deployment

### Quick Deploy

```bash
npm install -g vercel
vercel --prod
```

### Environment Variables

Set via Vercel dashboard or CLI:

```bash
vercel env add ZAPIER_WEBHOOK_URL
vercel env add NEXT_PUBLIC_GA_TRACKING_ID
```

## Manual/Custom Server Deployment

### Build for Production

```bash
npm run build
npm start
```

### Using PM2 (Process Manager)

```bash
npm install -g pm2
pm2 start npm --name "language-demographics" -- start
pm2 save
pm2 startup
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name tools.convey911.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Post-Deployment Verification

### Testing Checklist

1. **Form Submission Test**
   - Submit a test ZIP code
   - Verify results display correctly
   - Complete lead capture form
   - Check if webhook fires to Zapier
   - Verify HubSpot contact creation

2. **Analytics Test**
   - Open Google Analytics Real-Time view
   - Navigate through the tool
   - Verify events are tracked

3. **Mobile Test**
   - Test on iPhone (375px viewport)
   - Test on Android device
   - Verify all content above fold
   - Test form inputs and buttons

4. **Performance Test**
   - Run Lighthouse audit
   - Target scores:
     - Performance: 90+
     - Accessibility: 95+
     - Best Practices: 95+
     - SEO: 90+

5. **Cross-Browser Test**
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)

## Monitoring & Maintenance

### Regular Tasks

**Weekly:**
- Check error logs in Netlify/Vercel dashboard
- Monitor form submission rate
- Review Google Analytics data

**Monthly:**
- Update metro data if new Census data available
- Review and optimize based on usage patterns
- Check and update dependencies

**Quarterly:**
- Review lead quality with sales team
- Optimize based on conversion metrics
- Update copy/messaging if needed

### Alerts Setup

Configure Netlify/Vercel alerts for:
- Build failures
- High error rate (4xx, 5xx)
- Increased response time
- Downtime

### Rollback Procedure

If deployment fails:

1. **Netlify:**
   - Go to Deploys tab
   - Find last working deploy
   - Click "Publish deploy"

2. **Vercel:**
   - Go to Deployments
   - Select previous deployment
   - Click "Promote to Production"

## Troubleshooting

### Common Issues

**Build Fails:**
- Check Node.js version (must be 18+)
- Verify all dependencies installed
- Check for TypeScript errors: `npm run type-check`

**Webhook Not Firing:**
- Verify `ZAPIER_WEBHOOK_URL` is set correctly
- Check Zapier dashboard for errors
- Test webhook manually with curl

**Analytics Not Tracking:**
- Verify `NEXT_PUBLIC_GA_TRACKING_ID` is set
- Check browser console for errors
- Ensure Analytics component is in layout

**PDF Generation Fails:**
- Check browser console for jsPDF errors
- Verify data is properly formatted
- Test with smaller dataset

## Performance Optimization

### Image Optimization
- Use Next.js Image component
- Compress images before upload
- Use WebP format when possible

### Code Splitting
- Lazy load PDF generation library
- Split large components
- Use dynamic imports

### Caching
- Configure appropriate cache headers
- Use CDN for static assets
- Enable Netlify/Vercel edge caching

## Security

### Best Practices
- Always use HTTPS
- Validate all user inputs
- Sanitize data before sending to webhook
- Rate limit API endpoints
- Monitor for suspicious activity

### Environment Variables
- Never commit `.env` to Git
- Rotate webhook URLs if compromised
- Use different webhooks for dev/prod

---

## Support Contacts

**Technical Issues:**
- Development Team: dev@convey911.com

**Deployment Issues:**
- DevOps: devops@convey911.com

**Content/Marketing:**
- Marketing Team: marketing@convey911.com

---

**Last Updated:** November 6, 2025
**Version:** 1.0.0
