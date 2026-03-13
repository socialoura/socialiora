const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, 'public');

async function modifyImageHash(imagePath) {
  try {
    const ext = path.extname(imagePath).toLowerCase();
    
    if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
      console.log(`⚠️  Format non supporté: ${imagePath}`);
      return false;
    }
    
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    const { data, info } = await image
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    if (data.length > 0) {
      data[0] = (data[0] + 1) % 256;
    }
    
    let outputImage = sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: info.channels
      }
    });
    
    if (ext === '.png') {
      outputImage = outputImage.png({ quality: 100, compressionLevel: 9 });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      outputImage = outputImage.jpeg({ quality: 95 });
    } else if (ext === '.webp') {
      outputImage = outputImage.webp({ quality: 95 });
    }
    
    await outputImage.toFile(imagePath + '.tmp');
    fs.renameSync(imagePath + '.tmp', imagePath);
    
    console.log(`✅ Modifié: ${path.relative(PUBLIC_DIR, imagePath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Erreur sur ${imagePath}:`, error.message);
    if (fs.existsSync(imagePath + '.tmp')) {
      fs.unlinkSync(imagePath + '.tmp');
    }
    return false;
  }
}

function getAllImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllImages(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

async function main() {
  console.log('🔍 Recherche des images dans /public...\n');
  
  const images = getAllImages(PUBLIC_DIR);
  
  if (images.length === 0) {
    console.log('Aucune image trouvée.');
    return;
  }
  
  console.log(`📸 ${images.length} image(s) trouvée(s)\n`);
  
  let modified = 0;
  
  for (const imagePath of images) {
    const success = await modifyImageHash(imagePath);
    if (success) modified++;
  }
  
  console.log(`\n✨ Terminé: ${modified}/${images.length} image(s) modifiée(s)`);
  console.log('💡 Les hash MD5 de toutes les images ont été changés.');
}

main().catch(console.error);
