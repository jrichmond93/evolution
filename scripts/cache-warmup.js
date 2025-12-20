#!/usr/bin/env node

/**
 * Cache Warmup Script
 * Loads all animal explore pages to trigger backend API caching
 */

const animals = [
  'african-elephant',
  'alligator',
  'allosaurus',
  'american-robin',
  'ankylosaurus',
  'apatosaurus',
  'atlantic-cod',
  'atlantic-salmon',
  'bald-eagle',
  'ball-python',
  'bearded-dragon',
  'blue-jay',
  'brachiosaurus',
  'brown-bear',
  'canada-goose',
 /*  'chicken',
  'clownfish',
  'cow',
  'crocodile',
  'diplodocus',
  'dolphin',
  'domestic-cat',
  'domestic-dog',
  'european-starling',
  'horse',
  'house-sparrow',
  'human',
  'iguana-green',
  'king-cobra',
  'komodo-dragon',
  'largemouth-bass',
  'leopard-gecko',
  'lion',
  'mahi-mahi',
  'mallard',
  'mourning-dove',
  'northern-cardinal',
  'rattlesnake',
  'rock-pigeon',
  'sardine',
  'sea-turtle-green',
  'shark-great-white',
  'spinosaurus',
  'stegosaurus',
  't-rex',
  'tiger',
  'triceratops',
  'trout-rainbow',
  'tuna-bluefin',
  'tuna-yellowfin' */
];

const BASE_URL = 'https://www.aievolutionexplorer.com/explore';
//const BASE_URL = 'http://localhost:5173/explore';

const DELAY_MS = 9000; // 2 seconds between requests

async function warmupCache() {
  console.log(`Starting cache warmup for ${animals.length} animals...\n`);
  
  let successful = 0;
  let failed = 0;
  
  for (let i = 0; i < animals.length; i++) {
    const animal = animals[i];
    const url = `${BASE_URL}/${animal}`;
    
    try {
      console.log(`[${i + 1}/${animals.length}] Loading: ${animal}`);
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      if (response.ok) {
        console.log(`  ✓ Success (${response.status}) - ${url}`);
        successful++;
      } else {
        console.log(`  ✗ Failed (${response.status}) - ${url}`);
        failed++;
      }
      
    } catch (error) {
      console.log(`  ✗ Error: ${error.message} - ${url}`);
      failed++;
    }
    
    // Wait before next request to avoid overwhelming the server
    if (i < animals.length - 1) {
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    }
  }
  
  console.log(`\n=== Cache Warmup Complete ===`);
  console.log(`Total: ${animals.length}`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);
}

// Run the warmup
warmupCache().catch(console.error);
