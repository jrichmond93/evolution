import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_BASE = process.env.VITE_API_BASE || 'https://aievolutionexplorer.com/api';
const DIST_DIR = path.join(__dirname, '../dist');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');

async function fetchTopAnimals() {
  console.log('Fetching top 50 animals from API...');
  try {
    const response = await fetch(`${API_BASE}/animals`);
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('API did not return JSON. Response type:', contentType);
      console.log('Using fallback: hardcoded popular animals list');
      
      // Fallback list of popular animals
      return [
        { id: '1', common_name: 'Lion', scientific_name: 'Panthera leo', category: 'Mammals', popularity: 100 },
        { id: '2', common_name: 'Elephant', scientific_name: 'Loxodonta africana', category: 'Mammals', popularity: 95 },
        { id: '3', common_name: 'Tiger', scientific_name: 'Panthera tigris', category: 'Mammals', popularity: 90 },
        { id: '4', common_name: 'Giraffe', scientific_name: 'Giraffa camelopardalis', category: 'Mammals', popularity: 85 },
        { id: '5', common_name: 'Penguin', scientific_name: 'Spheniscidae', category: 'Birds', popularity: 80 },
        { id: '6', common_name: 'Dolphin', scientific_name: 'Delphinidae', category: 'Mammals', popularity: 78 },
        { id: '7', common_name: 'Wolf', scientific_name: 'Canis lupus', category: 'Mammals', popularity: 75 },
        { id: '8', common_name: 'Eagle', scientific_name: 'Aquila chrysaetos', category: 'Birds', popularity: 72 },
        { id: '9', common_name: 'Shark', scientific_name: 'Selachimorpha', category: 'Fish', popularity: 70 },
        { id: '10', common_name: 'Bear', scientific_name: 'Ursidae', category: 'Mammals', popularity: 68 }
      ];
    }
    
    const animals = await response.json();
    
    const topAnimals = animals
      .filter(a => a.popularity !== undefined)
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 50);
    
    console.log(`Found ${topAnimals.length} top animals`);
    return topAnimals;
  } catch (error) {
    console.error('Error fetching animals:', error.message);
    console.log('Using fallback animal list');
    
    // Return fallback list
    return [
      { id: '1', common_name: 'Lion', scientific_name: 'Panthera leo', category: 'Mammals', popularity: 100 },
      { id: '2', common_name: 'Elephant', scientific_name: 'Loxodonta africana', category: 'Mammals', popularity: 95 },
      { id: '3', common_name: 'Tiger', scientific_name: 'Panthera tigris', category: 'Mammals', popularity: 90 },
      { id: '4', common_name: 'Giraffe', scientific_name: 'Giraffa camelopardalis', category: 'Mammals', popularity: 85 },
      { id: '5', common_name: 'Penguin', scientific_name: 'Spheniscidae', category: 'Birds', popularity: 80 }
    ];
  }
}

function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function generateAnimalHTML(animal, baseHTML) {
  const title = `Explore ${animal.common_name} - Evolution Timeline`;
  const description = `Discover the evolutionary history of ${animal.common_name} (${animal.scientific_name}) with AI-generated timelines, fun facts, and detailed information about adaptation and natural selection.`;
  
  // Replace default meta tags with animal-specific ones
  let html = baseHTML
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${description}"`)
    .replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${title}"`)
    .replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${description}"`)
    .replace(/<meta name="twitter:title" content=".*?"/, `<meta name="twitter:title" content="${title}"`)
    .replace(/<meta name="twitter:description" content=".*?"/, `<meta name="twitter:description" content="${description}"`);
  
  // Add structured data for the animal
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": `https://www.aievolutionexplorer.com/explore/${sanitizeFilename(animal.common_name)}`,
    "about": {
      "@type": "Thing",
      "name": animal.common_name,
      "alternateName": animal.scientific_name
    }
  };
  
  const structuredDataScript = `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`;
  html = html.replace('</head>', `${structuredDataScript}\n</head>`);
  
  return html;
}

async function updateSitemap(animals) {
  console.log('\nUpdating sitemap.xml...');
  
  const publicSitemapPath = path.join(__dirname, '../public/sitemap.xml');
  
  // Copy sitemap from public to dist if not exists
  if (!fs.existsSync(SITEMAP_PATH) && fs.existsSync(publicSitemapPath)) {
    fs.copyFileSync(publicSitemapPath, SITEMAP_PATH);
  }
  
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.warn('Sitemap not found, skipping update');
    return;
  }
  
  let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');
  
  // Remove existing prerendered explore URLs
  sitemap = sitemap.replace(/<url>\s*<loc>https:\/\/www\.aievolutionexplorer\.com\/explore\/[^<]+<\/loc>[\s\S]*?<\/url>\s*/g, '');
  
  const today = new Date().toISOString().split('T')[0];
  const exploreUrls = animals
    .map(animal => {
      const filename = sanitizeFilename(animal.common_name);
      return `  <url>
    <loc>https://www.aievolutionexplorer.com/explore/${filename}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join('\n');
  
  sitemap = sitemap.replace('</urlset>', `${exploreUrls}\n</urlset>`);
  
  fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');
  console.log(`✓ Added ${animals.length} animal pages to sitemap.xml`);
  
  // Also copy the updated sitemap back to public/ so it gets committed to git
  fs.writeFileSync(publicSitemapPath, sitemap, 'utf8');
  console.log('✓ Updated public/sitemap.xml for git commit');
}

async function main() {
  console.log('🚀 Starting static page generation for SEO...\n');
  
  const animals = await fetchTopAnimals();
  
  if (animals.length === 0) {
    console.log('⚠️  No animals to prerender. Exiting.');
    return;
  }
  
  // Read base HTML template
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html not found. Run `npm run build:fast` first.');
    process.exit(1);
  }
  
  const baseHTML = fs.readFileSync(indexPath, 'utf8');
  
  // Create explore directory
  const exploreDir = path.join(DIST_DIR, 'explore');
  if (!fs.existsSync(exploreDir)) {
    fs.mkdirSync(exploreDir, { recursive: true });
  }
  
  console.log(`\nGenerating static HTML for ${animals.length} animals...\n`);
  
  // Generate HTML for each animal
  let count = 0;
  for (const animal of animals) {
    const filename = sanitizeFilename(animal.common_name);
    const html = generateAnimalHTML(animal, baseHTML);
    const outputPath = path.join(exploreDir, `${filename}.html`);
    
    fs.writeFileSync(outputPath, html, 'utf8');
    count++;
    
    if (count % 10 === 0) {
      console.log(`✓ Generated ${count}/${animals.length} pages...`);
    }
  }
  
  console.log(`\n✅ Successfully generated ${count} static HTML pages`);
  
  // Update sitemap
  await updateSitemap(animals);
  
  console.log('\n🎉 Prerender complete! SEO-optimized pages ready.\n');
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
