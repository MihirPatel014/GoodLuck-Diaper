import fs from 'fs';
import { getProducts, getCategories } from '../src/lib/products';
import { storeConfig } from '../src/config/store';

const BASE_URL = 'https://goodluckdiaper.com';

async function generateSitemap() {
  const products = getProducts();
  const categories = getCategories();

  const staticRoutes = [
    '',
    '/shop',
    '/about',
    '/faq',
  ];

  const productRoutes = products.map((p) => `/shop/${p.slug}`);
  const categoryRoutes = categories.map((c) => `/shop?category=${encodeURIComponent(c)}`);

  const allRoutes = [...staticRoutes, ...productRoutes, ...categoryRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map((route) => {
    const url = `${BASE_URL}${route}`;
    const changefreq = route === '' ? 'daily' : route.startsWith('/shop/') ? 'weekly' : 'monthly';
    const priority = route === '' ? '1.0' : route.startsWith('/shop/') ? '0.8' : '0.6';
    return `  <url>
    <loc>${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  const outputPath = 'dist/sitemap.xml';
  fs.writeFileSync(outputPath, sitemap);
  console.log(`✅ Sitemap generated at ${outputPath} with ${allRoutes.length} URLs`);
}

generateSitemap().catch(console.error);