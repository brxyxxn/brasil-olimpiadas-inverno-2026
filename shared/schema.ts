import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const athletes = pgTable("athletes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  sport: text("sport").notNull(),
  confederation: text("confederation"),
  bio: text("bio"),
  imageUrl: text("image_url"),
  instagram: text("instagram"),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  athleteId: integer("athlete_id").notNull(),
  eventName: text("event_name").notNull(),
  date: text("date").notNull(), // e.g., '2026-02-14'
  time: text("time"), // e.g., '10:00 AM'
  result: text("result"), // e.g., 'Gold Medal', '13th Place', 'Scheduled'
  medal: text("medal"), // e.g., 'Gold', 'Silver', 'Bronze', null
});

// === RELATIONS ===
export const athletesRelations = relations(athletes, ({ many }) => ({
  events: many(events),
}));

export const eventsRelations = relations(events, ({ one }) => ({
  athlete: one(athletes, {
    fields: [events.athleteId],
    references: [athletes.id],
  }),
}));

// === BASE SCHEMAS ===
export const insertAthleteSchema = createInsertSchema(athletes).omit({ id: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true });

// === EXPLICIT API CONTRACT TYPES ===

// Base types
export type Athlete = typeof athletes.$inferSelect;
export type InsertAthlete = z.infer<typeof insertAthleteSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type AthleteWithEvents = Athlete & { events: Event[] };

// Request types
export type CreateAthleteRequest = InsertAthlete;
export type CreateEventRequest = InsertEvent;

// Response types
export type AthleteResponse = AthleteWithEvents;
export type AthletesListResponse = AthleteWithEvents[];
export type EventsListResponse = Event[];
