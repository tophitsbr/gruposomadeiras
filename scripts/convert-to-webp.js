const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

async function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (/\.(jpg|jpeg|png)$/i.test(file) && !file.endsWith('.webp')) {
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);
      const webpPath = path.join(dirPath, `${baseName}.webp`);

      try {
        await sharp(fullPath)
          .webp({ quality: 82 })
          .toFile(webpPath);
        
        const origSize = (stat.size / 1024).toFixed(1);
        const webpSize = (fs.statSync(webpPath).size / 1024).toFixed(1);
        console.log(`✅ Convertido: ${file} (${origSize} KB -> ${webpSize} KB)`);
      } catch (err) {
        console.error(`❌ Erro ao converter ${file}:`, err.message);
      }
    }
  }
}

processDirectory(imagesDir).then(() => console.log('🎉 Conversão WebP concluída com sucesso!'));
