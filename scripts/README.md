# Prerendered Pages

Pre-generated static HTML files for SEO purposes. These files are automatically created during the build process.

## How it works

1. `npm run build` triggers the prerender script after Vite build completes
2. The script fetches the top 50 most popular animals from the API
3. For each animal, it renders the `/explore` page and saves static HTML
4. The `sitemap.xml` is automatically updated with all prerendered URLs

## Files

- `prerender.js` - Main script that renders pages using Puppeteer
- `prerender-runner.js` - Wrapper that manages the preview server lifecycle
- `prerender.bat` - Windows batch file (alternative runner)

## Manual execution

```bash
# Build first
npm run build:fast

# Then prerender
npm run prerender
```

## Skip prerendering

If you need a fast build without prerendering:

```bash
npm run build:fast
```
