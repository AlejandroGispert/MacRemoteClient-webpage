# Performance Optimization Guide

This document outlines the performance optimizations implemented in the Mac Remote Controller website.

## Implemented Optimizations

### 1. **Image Optimization**

- Using Astro's built-in `Image` component for automatic optimization
- Lazy loading for below-the-fold images
- Eager loading with high priority for hero images
- Automatic format conversion (WebP/AVIF when supported)
- Responsive image sizing

### 2. **JavaScript Optimization**

- Changed `client:load` to `client:idle` for non-critical components
- Components load when browser is idle, not immediately
- Reduces initial JavaScript bundle size

### 3. **Build Optimizations**

- CSS code splitting enabled
- Manual chunks for better caching
- HTML compression enabled
- Inline stylesheets optimization

### 4. **Resource Hints**

- Preconnect to external domains (Google Play)
- Preload critical images
- Optimized viewport meta tag

## Performance Best Practices

### Image Loading Strategy

**Hero Section (Above the fold):**

```astro
<Image
  loading="eager"
  fetchpriority="high"
/>
```

**Below the fold:**

```astro
<Image
  loading="lazy"
/>
```

### Component Loading Strategy

**Critical (Above the fold):**

- Use `client:load` for immediate interactivity
- Example: Navigation menu

**Non-critical (Below the fold):**

- Use `client:idle` - loads when browser is idle
- Use `client:visible` - loads when scrolled into view
- Example: Download buttons, feature cards

### Current Loading Strategy

- **Navbar**: `client:load` (needed immediately)
- **Download Buttons**: `client:idle` (can wait)
- **Other sections**: Static (no JavaScript needed)

## Additional Optimization Opportunities

### 1. **Font Optimization**

If adding custom fonts:

```html
<link
  rel="preload"
  href="/fonts/font.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

### 2. **Critical CSS**

Extract and inline critical CSS for above-the-fold content.

### 3. **Service Worker**

Add a service worker for offline support and caching:

```bash
bun add @astrojs/service-worker
```

### 4. **CDN**

Deploy to a CDN (Vercel, Netlify, Cloudflare Pages) for global edge caching.

### 5. **Analytics**

Use lightweight analytics:

- Consider privacy-friendly options
- Load asynchronously
- Use `client:idle` directive

## Performance Metrics

### Target Metrics

- **Lighthouse Score**: 90+ (Performance)
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Total Blocking Time (TBT)**: < 200ms
- **Cumulative Layout Shift (CLS)**: < 0.1

### Measuring Performance

1. **Lighthouse** (Chrome DevTools)

   - Run Lighthouse audit
   - Check Performance score

2. **WebPageTest**

   - Test from multiple locations
   - Check Core Web Vitals

3. **Chrome DevTools Performance Tab**
   - Record page load
   - Analyze bottlenecks

## Build Commands

```bash
# Development (fast refresh)
bun dev

# Production build (optimized)
bun build

# Preview production build
bun preview
```

## Monitoring

Consider adding:

- Real User Monitoring (RUM)
- Performance monitoring service
- Error tracking
- Analytics

## Notes

- Astro ships zero JavaScript by default
- Only interactive components need JavaScript
- Static content is pre-rendered at build time
- Images are optimized automatically with Astro Image component
