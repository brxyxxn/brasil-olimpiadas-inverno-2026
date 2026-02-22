import { db } from "./db";
import { athletes, events, type InsertAthlete, type InsertEvent, type AthleteWithEvents, type Athlete, type Event } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAthletes(): Promise<AthleteWithEvents[]>;
  getAthlete(id: number): Promise<AthleteWithEvents | undefined>;
  getEvents(): Promise<Event[]>;
  createAthlete(athlete: InsertAthlete): Promise<Athlete>;
  createEvent(event: InsertEvent): Promise<Event>;
}

export class DatabaseStorage implements IStorage {
  async getAthletes(): Promise<AthleteWithEvents[]> {
    const allAthletes = await db.query.athletes.findMany({
      with: {
        events: true,
      },
    });
    return allAthletes;
  }

  async getAthlete(id: number): Promise<AthleteWithEvents | undefined> {
    const athlete = await db.query.athletes.findFirst({
      where: eq(athletes.id, id),
      with: {
        events: true,
      },
    });
    return athlete;
  }

  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  async createAthlete(athlete: InsertAthlete): Promise<Athlete> {
    const [created] = await db.insert(athletes).values(athlete).returning();
    return created;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [created] = await db.insert(events).values(event).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();