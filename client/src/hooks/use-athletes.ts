import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { AthleteWithEvents } from "@shared/schema";

export function useAthletes() {
  return useQuery<AthleteWithEvents[]>({
    queryKey: [api.athletes.list.path],
    queryFn: async () => {
      const res = await fetch(api.athletes.list.path);
      if (!res.ok) throw new Error("Failed to fetch athletes");
      return await res.json();
    },
  });
}

export function useAthlete(id: number) {
  return useQuery<AthleteWithEvents>({
    queryKey: ["/api/athletes", id],
    queryFn: async () => {
      const url = buildUrl(api.athletes.get.path, { id });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Athlete not found");
      return await res.json();
    },
    enabled: !!id,
  });
}

export function useEvents() {
  return useQuery({
    queryKey: [api.events.list.path],
    queryFn: async () => {
      const res = await fetch(api.events.list.path);
      if (!res.ok) throw new Error("Failed to fetch events");
      return await res.json();
    },
  });
}
