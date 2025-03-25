const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: 'https://placehold.co/1920x1080/1A1F2C/ffffff/png?text=Hero+Background',
    filename: 'hero-bg.jpg'
  },
  {
    url: 'https://placehold.co/200x80/ffffff/1A1F2C/png?text=ARTEMOVA',
    filename: 'logo.png'
  }
];

const imagesDir = path.join(process.cwd(), 'public', 'images');

// Create images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Download each image
images.forEach(({ url, filename }) => {
  const filepath = path.join(imagesDir, filename);
  
  https.get(url, (response) => {
    if (response.statusCode === 200) {
      response.pipe(fs.createWriteStream(filepath));
      console.log(`Downloaded ${filename}`);
    } else {
      console.error(`Failed to download ${filename}: ${response.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}:`, err);
  });
}); 