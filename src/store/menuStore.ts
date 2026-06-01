import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SEED_MENU, type MenuItem } from "@/data/seed";

type MenuState = {
  items: MenuItem[];
  add: (item: MenuItem) => void;
  update: (id: string, patch: Partial<MenuItem>) => void;
  remove: (id: string) => void;
  reset: () => void;
};

export const useMenu = create<MenuState>()(
  persist(
    (set) => ({
      items: SEED_MENU,
      add: (item) => set((s) => ({ items: [...s.items, item] })),
      update: (id, patch) => set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      reset: () => set({ items: SEED_MENU }),
    }),
    { name: "love-africa-menu" }
  )
);
