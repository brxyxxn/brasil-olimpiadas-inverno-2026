import { z } from 'zod';
import { insertAthleteSchema, insertEventSchema, athletes, events } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  athletes: {
    list: {
      method: 'GET' as const,
      path: '/api/athletes' as const,
      responses: {
        200: z.array(z.custom<any>()), // Returns AthleteWithEvents[]
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/athletes/:id' as const,
      responses: {
        200: z.custom<any>(), // Returns AthleteWithEvents
        404: errorSchemas.notFound,
      },
    },
  },
  events: {
    list: {
      method: 'GET' as const,
      path: '/api/events' as const,
      responses: {
        200: z.array(z.custom<typeof events.$inferSelect>()),
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

export type AthletesListResponse = z.infer<typeof api.athletes.list.responses[200]>;
export type EventsListResponse = z.infer<typeof api.events.list.responses[200]>;
