import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const SOURCE_DIR = './attached_assets/generated_images';
const OUTPUT_DIR = './client/public/images/optimized';

async function optimizeImages() {
  console.log('Starting image optimization...');
  
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  const files = await fs.readdir(SOURCE_DIR);
  const pngFiles = files.filter(f => f.endsWith('.png'));
  
  console.log(`Found ${pngFiles.length} PNG files to optimize`);
  
  for (const file of pngFiles) {
    const inputPath = path.join(SOURCE_DIR, file);
    const baseName = path.basename(file, '.png');
    const webpPath = path.join(OUTPUT_DIR, `${baseName}.webp`);
    const jpgPath = path.join(OUTPUT_DIR, `${baseName}.jpg`);
    
    try {
      const stats = await fs.stat(inputPath);
      console.log(`\nProcessing: ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
      
      await sharp(inputPath)
        .resize(1200, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: 80 })
        .toFile(webpPath);
      
      const webpStats = await fs.stat(webpPath);
      console.log(`  -> WebP: ${(webpStats.size / 1024).toFixed(0)} KB`);
      
      await sharp(inputPath)
        .resize(1200, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: 80, progressive: true })
        .toFile(jpgPath);
      
      const jpgStats = await fs.stat(jpgPath);
      console.log(`  -> JPG: ${(jpgStats.size / 1024).toFixed(0)} KB`);
      
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
  
  console.log('\nOptimization complete!');
}

optimizeImages().catch(console.error);
