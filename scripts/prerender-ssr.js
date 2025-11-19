import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_BASE = process.env.VITE_API_BASE || 'https://aievolutionexplorer.com/api';
const DIST_DIR = path.join(__dirname, '../dist');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');
let DEV_SERVER_PORT = 4173; // Will be updated if port changes

async function fetchTopAnimals() {
  console.log('📡 Fetching top animals from API...');
  try {
    const response = await fetch(`${API_BASE}/animals`);
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('⚠️  API did not return JSON. Using fallback list.');
      return getFallbackAnimals();
    }
    
    const animals = await response.json();
    
    const topAnimals = animals
      .filter(a => a.popularity !== undefined)
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 2); // Start with just 2 for testing
    
    console.log(`✓ Found ${topAnimals.length} animals`);
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

async function fetchAnimalTimeline(animalId) {
  console.log(`  Fetching timeline for animal ID: ${animalId}...`);
  try {
    const response = await fetch(`${API_BASE}/explore`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ animal_id: animalId })
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('API did not return JSON');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`    ⚠️  Could not fetch timeline: ${error.message}`);
    return null;
  }
}

async function prerenderAnimalPage(browser, animal, baseUrl) {
  const page = await browser.newPage();
  
  try {
    const filename = sanitizeFilename(animal.common_name);
    const url = `${baseUrl}/explore?prerender=true&animal_id=${animal.id}&animal_name=${encodeURIComponent(animal.common_name)}`;
    
    console.log(`  🌐 Loading: ${url}`);
    
    // Navigate to the page
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Wait for the main content to be rendered
    await page.waitForSelector('#root', { timeout: 10000 });
    
    // Give React time to fully render and API calls to complete
    await page.waitForTimeout(3000);

    // Get the rendered HTML
    const html = await page.content();
    
    // Update meta tags for this specific animal
    const title = `Explore ${animal.common_name} - Evolution Timeline`;
    const description = `Discover the evolutionary history of ${animal.common_name} (${animal.scientific_name}) with AI-generated timelines, fun facts, and detailed information about adaptation and natural selection.`;
    const animalUrl = `https://www.aievolutionexplorer.com/explore/${filename}`;
    
    let updatedHtml = html
      .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
      .replace(/<meta name="description" content=".*?"/i, `<meta name="description" content="${description}"`)
      .replace(/<meta property="og:title" content=".*?"/i, `<meta property="og:title" content="${title}"`)
      .replace(/<meta property="og:description" content=".*?"/i, `<meta property="og:description" content="${description}"`)
      .replace(/<meta property="og:url" content=".*?"/i, `<meta property="og:url" content="${animalUrl}"`)
      .replace(/<meta name="twitter:title" content=".*?"/i, `<meta name="twitter:title" content="${title}"`)
      .replace(/<meta name="twitter:description" content=".*?"/i, `<meta name="twitter:description" content="${description}"`)
      .replace(/<link rel="canonical" href=".*?"/i, `<link rel="canonical" href="${animalUrl}"`);

    // Add structured data
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
    updatedHtml = updatedHtml.replace('</head>', `${structuredDataScript}\n</head>`);

    // Save to file
    const exploreDir = path.join(DIST_DIR, 'explore');
    if (!fs.existsSync(exploreDir)) {
      fs.mkdirSync(exploreDir, { recursive: true });
    }

    const outputPath = path.join(exploreDir, `${filename}.html`);
    fs.writeFileSync(outputPath, updatedHtml, 'utf8');
    
    console.log(`  ✓ Saved: ${filename}.html`);
    
    return { filename, success: true };
  } catch (error) {
    console.error(`  ❌ Error prerendering ${animal.common_name}:`, error.message);
    return { filename: sanitizeFilename(animal.common_name), success: false, error: error.message };
  } finally {
    await page.close();
  }
}

async function updateSitemap(animals) {
  console.log('\n📝 Updating sitemap.xml...');
  
  const publicSitemapPath = path.join(__dirname, '../public/sitemap.xml');
  
  // Copy sitemap from public to dist if not exists
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

async function startPreviewServer() {
  console.log('\n🚀 Starting preview server...');
  
  const { spawn } = await import('child_process');
  
  return new Promise((resolve, reject) => {
    const server = spawn('npm', ['run', 'preview'], {
      cwd: path.join(__dirname, '..'),
      shell: true
    });

    let resolved = false;

    server.stdout.on('data', (data) => {
      const output = data.toString();
      console.log('   ', output.trim());
      
      // Extract port number from output
      const portMatch = output.match(/Local:\s+http:\/\/localhost:(\d+)/);
      if (portMatch && !resolved) {
        DEV_SERVER_PORT = parseInt(portMatch[1]);
        console.log(`   ✓ Server running on port ${DEV_SERVER_PORT}`);
        resolved = true;
        // Wait a bit for server to be fully ready
        setTimeout(() => resolve(server), 2000);
      }
    });

    server.stderr.on('data', (data) => {
      console.error('Server error:', data.toString());
    });

    server.on('error', (error) => {
      if (!resolved) {
        resolved = true;
        reject(error);
      }
    });

    // Timeout after 15 seconds
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        reject(new Error('Server start timeout'));
      }
    }, 15000);
  });
}

async function main() {
  console.log('🎨 Starting SSR prerendering with actual content...\n');
  
  let server = null;
  let browser = null;

  try {
    // Fetch animals
    const animals = await fetchTopAnimals();
    
    if (animals.length === 0) {
      console.log('⚠️  No animals to prerender. Exiting.');
      return;
    }

    // Start preview server
    server = await startPreviewServer();
    const baseUrl = `http://localhost:${DEV_SERVER_PORT}`;

    // Launch browser
    console.log('\n🌐 Launching headless browser...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      dumpio: false
    });
    console.log('✓ Browser ready\n');

    // Prerender each animal page
    console.log(`📄 Prerendering ${animals.length} animal pages...\n`);
    const results = [];
    
    for (let i = 0; i < animals.length; i++) {
      const animal = animals[i];
      console.log(`[${i + 1}/${animals.length}] ${animal.common_name}`);
      
      const result = await prerenderAnimalPage(browser, animal, baseUrl);
      results.push({ ...result, ...animal });
      
      // Small delay between requests to avoid overwhelming the server
      if (i < animals.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
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
  } finally {
    // Cleanup
    if (browser) {
      await browser.close();
      console.log('✓ Browser closed');
    }
    
    if (server) {
      server.kill();
      console.log('✓ Preview server stopped');
    }
  }
}

main().catch(error => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});
