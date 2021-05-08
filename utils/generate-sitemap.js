const sitemap = require('nextjs-sitemap-generator');

// const BUILD_ID = fs.readFileSync('.next/BUILD_ID').toString();

sitemap({
  baseUrl: 'https://ipg-site.github.io',
  pagesDirectory: __dirname + '/../out',
  targetDirectory: 'out/',
  ignoredExtensions: ['js', 'map'],
  ignoredPaths: ['[fallback]'],
});
