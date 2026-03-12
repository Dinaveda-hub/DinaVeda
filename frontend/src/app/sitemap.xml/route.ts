import { CALCULATORS } from '@/data/calculators';
import { CAUSES, COMBINATIONS, PROTOCOL_GUIDES, PROTOCOL_MAP, ROUTINES } from '@/data';

const BASE_URL = 'https://www.dinaveda.com';

export async function GET() {
  const routes = [
    '',
    '/about',
    '/contact',
    '/faq',
    '/how-it-works',
    '/login',
    '/modules',
    '/pricing',
    '/privacy',
    '/prakriti',
    '/terms',
    '/tools',
  ];

  const toolRoutes = Object.keys(CALCULATORS).map(slug => `/tools/${slug}`);
  const causeRoutes = Object.keys(CAUSES).map(slug => `/cause/${slug}`);
  const healthRoutes = Object.keys(COMBINATIONS).map(slug => `/health/${slug}`);
  const protocolRoutes = [
    ...Object.keys(PROTOCOL_GUIDES),
    ...Object.keys(PROTOCOL_MAP),
  ].map(slug => `/protocol/${slug}`);
  const routineRoutes = [
    ...Object.keys(ROUTINES),
    'morning-clinical',
    'midday-clinical',
    'evening-clinical',
  ].map(slug => `/routine/${slug}`);

  const allRoutes = [
    ...routes,
    ...toolRoutes,
    ...causeRoutes,
    ...healthRoutes,
    ...protocolRoutes,
    ...routineRoutes,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes.map(route => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route === '' ? '1.0' : '0.7'}</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  });
}
