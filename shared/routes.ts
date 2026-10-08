import { z } from 'zod';
import { 
  insertCompetitorSchema, 
  insertCompetitorRatingSchema,
  insertKeyVulnerabilitySchema,
  insertComparisonTableEntrySchema,
  insertStrategySchema,
  insertStrategyItemSchema,
  insertSwotEntrySchema,
  insertMarketInsightSchema,
  competitors,
  competitorRatings,
  keyVulnerabilities,
  comparisonTableEntries,
  strategies,
  strategyItems,
  swotEntries,
  marketInsights
} from './schema';

export const errorSchemas = {
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  competitors: {
    list: {
      method: 'GET' as const,
      path: '/api/competitors',
      responses: {
        200: z.array(z.custom<typeof competitors.$inferSelect & {
          ratings: typeof competitorRatings.$inferSelect[];
          vulnerabilities: typeof keyVulnerabilities.$inferSelect[];
        }>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/competitors/:id',
      responses: {
        200: z.custom<typeof competitors.$inferSelect & {
          ratings: typeof competitorRatings.$inferSelect[];
          vulnerabilities: typeof keyVulnerabilities.$inferSelect[];
          swotEntries: typeof swotEntries.$inferSelect[];
          strategies: (typeof strategies.$inferSelect & { items: typeof strategyItems.$inferSelect[] })[];
        }>(),
        404: errorSchemas.notFound,
      },
    },
  },
  comparisonTable: {
    list: {
      method: 'GET' as const,
      path: '/api/comparison-table',
      responses: {
        200: z.array(z.custom<typeof comparisonTableEntries.$inferSelect>()),
      },
    },
  },
  strategies: {
    list: {
      method: 'GET' as const,
      path: '/api/strategies',
      responses: {
        200: z.array(z.custom<typeof strategies.$inferSelect & { items: typeof strategyItems.$inferSelect[] }>()),
      },
    },
  },
  swot: {
    list: {
      method: 'GET' as const,
      path: '/api/swot',
      responses: {
        200: z.array(z.custom<typeof swotEntries.$inferSelect & { competitorName: string }>()),
      },
    },
  },
  marketInsights: {
    list: {
      method: 'GET' as const,
      path: '/api/market-insights',
      responses: {
        200: z.array(z.custom<typeof marketInsights.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
