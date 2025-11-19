import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_BASE = process.env.VITE_API_BASE || 'https://aievolutionexplorer.com/api';
const SITE_URL = 'http://localhost:5173';
const DIST_DIR = path.join(__dirname, '../dist');
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');

async function fetchTopAnimals() {
  console.log('Fetching top animals from API...');
  try {
    const response = await fetch(`${API_BASE}/animals`);
    const animals = await response.json();
    
    // Sort by popularity and get top 50
    const topAnimals = animals
      .filter(a => a.popularity !== undefined)
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 50);
    
    console.log(`Found ${topAnimals.length} top animals to prerender`);
    return topAnimals;
  } catch (error) {
    console.error('Error fetching animals:', error);
    return [];
  }
}

function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function prerenderAnimalPage(browser, animal) {
  const page = await browser.newPage();
  
  try {
    const animalName = animal.common_name;
    const filename = sanitizeFilename(animalName);
    
    console.log(`Prerendering: ${animalName}...`);
    
    // Navigate to the explore page with the animal
    const url = `${SITE_URL}/explore`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Simulate selecting the animal and navigating
    await page.evaluate((animalData) => {
      // Store animal in session/state for the page
      window.history.replaceState(
        { animal: animalData, user_session_id: 'PRERENDER-SESSION' },
        '',
        '/explore'
      );
      // Trigger a custom event to notify the app
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, animal);
    
    // Wait for content to load (adjust timeout as needed)
    await page.waitForTimeout(5000);
    
    // Get the rendered HTML
    const html = await page.content();
    
    // Create explore directory if it doesn't exist
    const exploreDir = path.join(DIST_DIR, 'explore');
    if (!fs.existsSync(exploreDir)) {
      fs.mkdirSync(exploreDir, { recursive: true });
    }
    
    // Save HTML file
    const outputPath = path.join(exploreDir, `${filename}.html`);
    fs.writeFileSync(outputPath, html, 'utf8');
    
    console.log(`✓ Saved: /explore/${filename}.html`);
    
    return {
      url: `/explore/${filename}`,
      animal: animalName,
      filename
    };
  } catch (error) {
    console.error(`Error prerendering ${animal.common_name}:`, error.message);
    return null;
  } finally {
    await page.close();
  }
}

async function updateSitemap(prerenderedPages) {
  console.log('Updating sitemap.xml...');
  
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.warn('Sitemap not found, skipping update');
    return;
  }
  
  let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');
  
  // Remove existing explore URLs (if any)
  sitemap = sitemap.replace(/<url>\s*<loc>https:\/\/aievolutionexplorer\.com\/explore\/[^<]+<\/loc>[\s\S]*?<\/url>\s*/g, '');
  
  // Generate new explore URLs
  const today = new Date().toISOString().split('T')[0];
  const exploreUrls = prerenderedPages
    .filter(p => p !== null)
    .map(page => `  <url>
    <loc>https://aievolutionexplorer.com${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`)
    .join('\n');
  
  // Insert before closing </urlset>
  sitemap = sitemap.replace('</urlset>', `${exploreUrls}\n</urlset>`);
  
  fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');
  console.log(`✓ Added ${prerenderedPages.length} animal pages to sitemap.xml`);
}

async function main() {
  console.log('Starting prerender process...\n');
  
  // Fetch top animals
  const animals = await fetchTopAnimals();
  
  if (animals.length === 0) {
    console.log('No animals to prerender. Exiting.');
    return;
  }
  
  // Launch browser
  console.log('\nLaunching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const prerenderedPages = [];
    
    // Prerender each animal page
    for (const animal of animals) {
      const result = await prerenderAnimalPage(browser, animal);
      if (result) {
        prerenderedPages.push(result);
      }
    }
    
    console.log(`\n✓ Successfully prerendered ${prerenderedPages.length} pages`);
    
    // Update sitemap
    await updateSitemap(prerenderedPages);
    
    console.log('\n✅ Prerender complete!');
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
