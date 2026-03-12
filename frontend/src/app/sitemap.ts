import { MetadataRoute } from 'next';
import { CALCULATORS } from '@/data/calculators';
import { CAUSES, COMBINATIONS, PROTOCOLS, PROTOCOL_MAP, ROUTINES } from '@/data/health-content';

const BASE_URL = 'https://www.dinaveda.com';

export default function sitemap(): MetadataRoute.Sitemap {
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
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }));

  // Tools
  const toolRoutes = Object.keys(CALCULATORS).map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Causes
  const causeRoutes = Object.keys(CAUSES).map((slug) => ({
    url: `${BASE_URL}/cause/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Health Combinations (Symptoms)
  const healthRoutes = Object.keys(COMBINATIONS).map((slug) => ({
    url: `${BASE_URL}/health/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Clinical Protocols
  const protocolRoutes = [
    ...Object.keys(PROTOCOLS),
    ...Object.keys(PROTOCOL_MAP),
  ].map((slug) => ({
    url: `${BASE_URL}/protocol/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Routines
  const routineRoutes = [
    ...Object.keys(ROUTINES),
    'morning-clinical',
    'midday-clinical',
    'evening-clinical',
  ].map((slug) => ({
    url: `${BASE_URL}/routine/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...routes,
    ...toolRoutes,
    ...causeRoutes,
    ...healthRoutes,
    ...protocolRoutes,
    ...routineRoutes,
  ];
}
