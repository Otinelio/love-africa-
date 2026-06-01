import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RestaurantTable = {
  id: string;
  number: string;
  label?: string;
};

const DEFAULT_TABLES: RestaurantTable[] = Array.from({ length: 8 }, (_, i) => {
  const n = String(i + 1);
  return { id: `t_${n}`, number: n, label: `Table ${n}` };
});

type TablesState = {
  tables: RestaurantTable[];
  add: (number: string, label?: string) => void;
  remove: (id: string) => void;
  update: (id: string, patch: Partial<Pick<RestaurantTable, "number" | "label">>) => void;
  reset: () => void;
};

export const useTables = create<TablesState>()(
  persist(
    (set) => ({
      tables: DEFAULT_TABLES,
      add: (number, label) => {
        const trimmed = number.trim();
        if (!trimmed) return;
        set((s) => {
          if (s.tables.some((t) => t.number === trimmed)) return s;
          return {
            tables: [
              ...s.tables,
              {
                id: `t_${Date.now()}`,
                number: trimmed,
                label: label?.trim() || `Table ${trimmed}`,
              },
            ],
          };
        });
      },
      remove: (id) => set((s) => ({ tables: s.tables.filter((t) => t.id !== id) })),
      update: (id, patch) =>
        set((s) => ({
          tables: s.tables.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        })),
      reset: () => set({ tables: DEFAULT_TABLES }),
    }),
    { name: "love-africa-tables" },
  ),
);
