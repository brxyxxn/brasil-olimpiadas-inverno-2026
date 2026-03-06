import { athletes, type AthleteWithEvents } from "../data/athletes";

export function useAthletes() {
  return {
    data: athletes as AthleteWithEvents[],
    isLoading: false,
    error: null,
  };
}

export function useAthlete(id: number) {
  const athlete = athletes.find((a) => a.id === id);
  return {
    data: athlete as AthleteWithEvents | undefined,
    isLoading: false,
    error: athlete ? null : new Error("Athlete not found"),
  };
}

export function useEvents() {
  const allEvents = athletes.flatMap((a) => a.events);
  return {
    data: allEvents,
    isLoading: false,
    error: null,
  };
}
