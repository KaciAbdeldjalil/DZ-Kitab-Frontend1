console.log('=== Starting DZ Kitab Frontend ===');
console.log('Node version:', process.version);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('VITE_API_URL:', process.env.VITE_API_URL);
console.log('Current directory:', process.cwd());
console.log('Directory contents:');
const fs = require('fs');
fs.readdirSync('.').forEach(file => console.log(' -', file));
console.log('Dist contents:');
if (fs.existsSync('./dist')) {
  fs.readdirSync('./dist').forEach(file => console.log(' -', file));
}
console.log('==================================');