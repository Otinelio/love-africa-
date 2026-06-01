import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SEED_EVENTS, type EventItem } from "@/data/seed";

type S = {
  events: EventItem[];
  add: (e: EventItem) => void;
  update: (id: string, patch: Partial<EventItem>) => void;
  remove: (id: string) => void;
};

export const useEvents = create<S>()(
  persist(
    (set) => ({
      events: SEED_EVENTS,
      add: (e) => set((s) => ({ events: [...s.events, e] })),
      update: (id, patch) => set((s) => ({ events: s.events.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
      remove: (id) => set((s) => ({ events: s.events.filter((x) => x.id !== id) })),
    }),
    { name: "love-africa-events" }
  )
);
