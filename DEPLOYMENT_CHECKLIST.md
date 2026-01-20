# 🚀 Deployment Checklist

## Pre-Deployment

### 1. Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (keep secret!)
- [ ] `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token
- [ ] `NEXT_PUBLIC_SITE_URL` - Your production domain

### 2. Database Setup (Supabase)
- [ ] Run `supabase-schema.sql` in Supabase SQL Editor
- [ ] Verify all tables are created (events, rsvps, etc.)
- [ ] Check RLS policies are enabled
- [ ] Test database connection

### 3. Vercel Blob Setup
- [ ] Create Vercel Blob store in Vercel dashboard
- [ ] Copy BLOB_READ_WRITE_TOKEN to environment variables
- [ ] Test image upload functionality

### 4. Build Test
```bash
cd rsvp-platform
npm run build
```
- [ ] Build completes successfully
- [ ] No critical errors in console
- [ ] All routes generated correctly

### 5. Code Quality
- [ ] All console.logs removed or commented
- [ ] No hardcoded credentials
- [ ] Error boundaries in place
- [ ] Loading states implemented

## Deployment Steps

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Root directory: `rsvp-platform`

3. **Configure Environment Variables**
   - Add all variables from `.env.local`
   - Make sure to use production values

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Test the live site

### Option 2: Other Platforms

#### Netlify
```bash
# Build command
npm run build

# Publish directory
.next

# Environment variables
Add all from .env.local
```

#### Railway
```bash
# Start command
npm start

# Build command
npm run build
```

## Post-Deployment

### 1. Functionality Tests
- [ ] Homepage loads correctly
- [ ] Create event works
- [ ] Host login works
- [ ] Dashboard displays events
- [ ] RSVP form works
- [ ] Image upload works
- [ ] QR code generation works
- [ ] Email notifications work (if enabled)
- [ ] Dark/Light theme toggle works
- [ ] Mobile responsive design works

### 2. Performance Tests
- [ ] Lighthouse score > 90
- [ ] Page load time < 3s
- [ ] Images load properly
- [ ] Animations are smooth (60fps)
- [ ] No console errors

### 3. Browser Tests
- [ ] Chrome (Desktop & Mobile)
- [ ] Firefox
- [ ] Safari (Desktop & Mobile)
- [ ] Edge

### 4. SEO Verification
- [ ] Meta tags present
- [ ] OpenGraph tags working
- [ ] Twitter cards working
- [ ] Sitemap accessible
- [ ] Robots.txt configured

### 5. Security Checks
- [ ] HTTPS enabled
- [ ] Security headers present
- [ ] No exposed API keys
- [ ] CORS configured correctly
- [ ] Rate limiting in place (if needed)

## Monitoring

### Setup Analytics
- [ ] Vercel Analytics enabled
- [ ] Error tracking configured
- [ ] Performance monitoring active

### Regular Checks
- [ ] Monitor error logs daily
- [ ] Check performance metrics weekly
- [ ] Review user feedback
- [ ] Update dependencies monthly

## Rollback Plan

If something goes wrong:

1. **Vercel**: Use "Rollback to Previous Deployment" in dashboard
2. **GitHub**: Revert commit and redeploy
3. **Database**: Have backup ready (Supabase auto-backups)

## Support

### Common Issues

**Build fails:**
- Check Node.js version (18+)
- Clear `.next` folder and rebuild
- Verify all dependencies installed

**Database connection fails:**
- Verify Supabase URL and keys
- Check RLS policies
- Ensure service role key is correct

**Images not uploading:**
- Verify BLOB_READ_WRITE_TOKEN
- Check file size limits (10MB)
- Ensure Vercel Blob store exists

**Slow performance:**
- Enable Vercel Edge caching
- Optimize images
- Check database queries

## Success Criteria

✅ Site loads in < 3 seconds
✅ All features work correctly
✅ Mobile responsive
✅ No console errors
✅ Lighthouse score > 90
✅ Dark/Light theme works
✅ Database operations successful
✅ Image uploads working

---

**Status**: Ready for Production 🎉
**Last Updated**: January 2026
