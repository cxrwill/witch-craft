const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const mobileMeta = `
  <meta name="theme-color" content="#0D0618">
  <meta name="description" content="探寻你的魔法本源，找到属于你的女巫之路">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="WitchCraft">
  <meta name="format-detection" content="telephone=no">
  <link rel="manifest" href="manifest.json">
`;

const touchCSS = `
  html,body{height:100%;width:100%;margin:0;padding:0;background-color:#0D0618;overflow:hidden}
  #root{display:flex;flex-direction:column;height:100%;min-height:100%}
  *{-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none}
  input,textarea{-webkit-user-select:auto;user-select:auto}
  html{-webkit-text-size-adjust:100%;touch-action:manipulation;overscroll-behavior:none}
  body{overscroll-behavior:none;-webkit-overflow-scrolling:touch}
`;

const swScript = `
  if('serviceWorker' in navigator){
    navigator.serviceWorker.getRegistrations().then(function(regs){
      regs.forEach(function(r){r.unregister()});
    });
    window.addEventListener('load',function(){
      navigator.serviceWorker.register('sw.js?v=2').catch(function(){});
    });
  }
`;

// Replace default viewport
html = html.replace(
  /<meta name="viewport"[^>]*>/,
  '<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover,shrink-to-fit=no">'
);

// Replace expo-reset CSS with mobile-optimized version
html = html.replace(
  /<style id="expo-reset">[\s\S]*?<\/style>/,
  `<style id="expo-reset">${touchCSS}</style>`
);

// Remove default theme-color and description (will re-add)
html = html.replace(/<meta name="theme-color"[^>]*>/g, '');
html = html.replace(/<meta name="description"[^>]*>/g, '');
html = html.replace(/<link rel="icon"[^>]*>/g, '');

// Add mobile meta after the charset meta
html = html.replace(
  '</title>',
  '</title>\n' + mobileMeta.trim().split('\n').map(s => '  ' + s.trim()).join('\n')
);

// Add favicon
html = html.replace(
  '<link rel="manifest"',
  '<link rel="icon" href="favicon.ico">\n  <link rel="manifest"'
);

// Add service worker before </body>
html = html.replace(
  '</body>',
  `<script>${swScript}</script>\n</body>`
);

fs.writeFileSync(indexPath, html, 'utf-8');
console.log('✓ Mobile web optimizations applied');

// Fix absolute paths for GitHub Pages subdirectory deployment
html = html.replace(/href="\/_expo/g, 'href="_expo');
html = html.replace(/src="\/_expo/g, 'src="_expo');
html = html.replace(/href="\/assets/g, 'href="assets');
html = html.replace(/src="\/assets/g, 'src="assets');
fs.writeFileSync(indexPath, html, 'utf-8');
console.log('✓ Fixed paths for GitHub Pages subdirectory');

// Copy static files from public to dist
const publicDir = path.join(__dirname, '..', 'public');
if (fs.existsSync(publicDir)) {
  fs.readdirSync(publicDir).forEach(file => {
    fs.copyFileSync(path.join(publicDir, file), path.join(distDir, file));
    console.log(`  Copied public/${file} to dist/`);
  });
}
