import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runPrerender() {
  console.log('Starting preview server...');
  
  // Start vite preview server
  const previewServer = spawn('npx', ['vite', 'preview', '--port', '5173'], {
    stdio: 'pipe',
    shell: true
  });
  
  // Wait for server to be ready
  await new Promise((resolve) => {
    previewServer.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Local:') || output.includes('http://localhost:5173')) {
        console.log('Preview server ready!');
        setTimeout(resolve, 2000); // Give it extra 2 seconds to be stable
      }
    });
  });
  
  try {
    // Run prerender script
    console.log('Running prerender script...\n');
    const prerenderProcess = spawn('node', [path.join(__dirname, 'prerender.js')], {
      stdio: 'inherit',
      shell: true
    });
    
    await new Promise((resolve, reject) => {
      prerenderProcess.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Prerender failed with code ${code}`));
        }
      });
    });
  } finally {
    // Kill preview server
    console.log('\nStopping preview server...');
    previewServer.kill();
    
    // On Windows, need to kill the process tree
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', previewServer.pid, '/f', '/t'], { shell: true });
    }
  }
}

runPrerender().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
