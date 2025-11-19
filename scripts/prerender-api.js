import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_BASE = process.env.VITE_API_BASE || 'https://evolution.aisuretech.net/api/evolution';
const DIST_DIR = path.join(__dirname, '../dist');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');

async function fetchTopAnimals() {
  console.log('📡 Fetching top animals from API...');
  const url = `${API_BASE}/animals`;
  console.log(`   URL: ${url}`);
  
  try {
    const response = await fetch(url);
    console.log(`   Response status: ${response.status}`);
    console.log(`   Response headers:`, response.headers.get('content-type'));
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.warn(`   Response body (first 200 chars): ${text.substring(0, 200)}`);
      console.warn('⚠️  API did not return JSON. Using fallback list.');
      return getFallbackAnimals();
    }
    
    const animals = await response.json();
    
    if (!Array.isArray(animals) || animals.length === 0) {
      console.warn('⚠️  API returned empty array. Using fallback list.');
      return getFallbackAnimals();
    }
    
    // Sort by popularity if available, otherwise just take first 50
    const topAnimals = animals
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 50);
    
    console.log(`✓ Found ${topAnimals.length} animals`);
    
    if (topAnimals.length === 0) {
      console.warn('⚠️  No animals after filtering. Using fallback list.');
      return getFallbackAnimals();
    }
    
    return topAnimals;
  } catch (error) {
    console.warn(`⚠️  Error fetching animals: ${error.message}`);
    console.log('Using fallback animal list');
    return getFallbackAnimals();
  }
}

function getFallbackAnimals() {
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

function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function fetchAnimalTimeline(animal) {
  console.log(`  Fetching timeline for ${animal.common_name}...`);
  const url = `${API_BASE}/explore`;
  console.log(`    URL: ${url}`);
  console.log(`    Body: ${JSON.stringify({ animal_id: animal.id })}`);
  
  try {
    // Try the /explore endpoint with animal_id
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        animal_id: animal.id
      })
    });

    console.log(`    Response status: ${response.status}`);
    
    if (!response.ok) {
      const text = await response.text();
      console.warn(`    Response body: ${text.substring(0, 200)}`);
      throw new Error(`API returned ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('API did not return JSON');
    }

    const data = await response.json();
    console.log(`    ✓ Got ${data.events?.length || data.timeline_events?.length || 0} events`);
    return data;
  } catch (error) {
    console.warn(`    ⚠️  Could not fetch timeline: ${error.message}`);
    return null;
  }
}

function generateTimelineHTML(timeline) {
  if (!timeline || !timeline.events || timeline.events.length === 0) {
    return '<div class="alert alert-info">Timeline data is loading...</div>';
  }

  let html = '<div class="timeline-card">';
  html += `<h2 class="mb-4">${timeline.species_or_group_name || 'Evolution'} - Timeline</h2>`;
  html += '<div class="timeline-container">';
  
  timeline.events.forEach((event, idx) => {
    html += `<div class="timeline-event" data-event-${idx}>`;
    html += `<div class="timeline-marker"></div>`;
    html += `<div class="timeline-content">`;
    html += `<h3>${event.title || `Event ${idx + 1}`}</h3>`;
    html += `<p class="timeline-time"><strong>${event.time_period || 'Unknown period'}</strong></p>`;
    html += `<p>${event.description || ''}</p>`;
    if (event.significance) {
      html += `<p class="timeline-significance"><em>${event.significance}</em></p>`;
    }
    html += `</div></div>`;
  });
  
  html += '</div></div>';
  return html;
}

function generateAnimalHTML(animal, timeline, baseHTML) {
  const title = `Explore ${animal.common_name} - Evolution Timeline`;
  const description = `Discover the evolutionary history of ${animal.common_name} (${animal.scientific_name}) with AI-generated timelines, fun facts, and detailed information about adaptation and natural selection.`;
  const filename = sanitizeFilename(animal.common_name);
  const animalUrl = `https://www.aievolutionexplorer.com/explore/${filename}`;
  
  // Update meta tags
  let html = baseHTML
    .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?"/i, `<meta name="description" content="${description}"`)
    .replace(/<meta property="og:title" content=".*?"/i, `<meta property="og:title" content="${title}"`)
    .replace(/<meta property="og:description" content=".*?"/i, `<meta property="og:description" content="${description}"`)
    .replace(/<meta property="og:url" content=".*?"/i, `<meta property="og:url" content="${animalUrl}"`)
    .replace(/<meta name="twitter:title" content=".*?"/i, `<meta name="twitter:title" content="${title}"`)
    .replace(/<meta name="twitter:description" content=".*?"/i, `<meta name="twitter:description" content="${description}"`)
    .replace(/<link rel="canonical" href=".*?"/i, `<link rel="canonical" href="${animalUrl}"`);

  // Add structured data for the animal
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": animalUrl,
    "about": {
      "@type": "Thing",
      "name": animal.common_name,
      "alternateName": animal.scientific_name
    }
  };

  const structuredDataScript = `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`;
  html = html.replace('</head>', `${structuredDataScript}\n</head>`);

  // Inject prerendered content into the body
  const timelineHTML = generateTimelineHTML(timeline);
  const contentHTML = `
    <div id="prerendered-content" style="max-width: 1200px; margin: 0 auto; padding: 20px;">
      <div class="container">
        <h1 class="text-center mb-4">${animal.common_name}</h1>
        <p class="text-center lead mb-4"><em>${animal.scientific_name}</em></p>
        <p class="text-center text-muted mb-5">Category: ${animal.category || 'Unknown'}</p>
        ${timelineHTML}
        <div class="text-center mt-5">
          <p class="text-muted">This content was pre-rendered for search engines. <a href="/explore">Explore more animals</a></p>
        </div>
      </div>
    </div>
  `;
  
  // Insert content after opening body tag
  html = html.replace(/<div id="root"><\/div>/, `<div id="root">${contentHTML}</div>`);

  return html;
}

async function updateSitemap(animals) {
  console.log('\n📝 Updating sitemap.xml...');
  
  const publicSitemapPath = path.join(__dirname, '../public/sitemap.xml');
  
  if (!fs.existsSync(SITEMAP_PATH) && fs.existsSync(publicSitemapPath)) {
    fs.copyFileSync(publicSitemapPath, SITEMAP_PATH);
  }
  
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.warn('⚠️  Sitemap not found, skipping update');
    return;
  }
  
  let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');
  
  // Remove existing prerendered explore URLs
  sitemap = sitemap.replace(/<url>\s*<loc>https:\/\/www\.aievolutionexplorer\.com\/explore\/[^<]+<\/loc>[\s\S]*?<\/url>\s*/g, '');
  
  const today = new Date().toISOString().split('T')[0];
  const exploreUrls = animals
    .filter(a => a.success)
    .map(animal => {
      const filename = animal.filename;
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
  fs.writeFileSync(publicSitemapPath, sitemap, 'utf8');
  
  console.log(`✓ Added ${animals.filter(a => a.success).length} animal pages to sitemap.xml`);
}

async function main() {
  console.log('🎨 Starting API-based SSR prerendering...\n');
  
  try {
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

    console.log(`\n📄 Prerendering ${animals.length} animal pages...\n`);
    
    const results = [];
    
    for (let i = 0; i < animals.length; i++) {
      const animal = animals[i];
      console.log(`[${i + 1}/${animals.length}] ${animal.common_name}`);
      
      try {
        const timeline = await fetchAnimalTimeline(animal);
        const html = generateAnimalHTML(animal, timeline, baseHTML);
        const filename = sanitizeFilename(animal.common_name);
        const outputPath = path.join(exploreDir, `${filename}.html`);
        
        fs.writeFileSync(outputPath, html, 'utf8');
        console.log(`  ✓ Saved: ${filename}.html\n`);
        
        results.push({ filename, success: true, ...animal });
      } catch (error) {
        console.error(`  ❌ Error: ${error.message}\n`);
        results.push({ filename: sanitizeFilename(animal.common_name), success: false, error: error.message, ...animal });
      }
      
      // Small delay between requests
      if (i < animals.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }

    // Update sitemap
    await updateSitemap(results);

    // Summary
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 PRERENDER SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successful: ${successful}`);
    if (failed > 0) {
      console.log(`❌ Failed: ${failed}`);
      results.filter(r => !r.success).forEach(r => {
        console.log(`   - ${r.common_name}: ${r.error}`);
      });
    }
    console.log('='.repeat(60));
    console.log('\n🎉 SSR prerendering complete!\n');

  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});
