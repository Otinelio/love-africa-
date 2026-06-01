import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MenuItem } from "@/data/seed";

export type CartLine = { item: MenuItem; qty: number };

type CartState = {
  lines: CartLine[];
  open: boolean;
  add: (item: MenuItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  setOpen: (v: boolean) => void;
  total: () => number;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      open: false,
      add: (item) =>
        set((s) => {
          const ex = s.lines.find((l) => l.item.id === item.id);
          if (ex) return { lines: s.lines.map((l) => (l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l)) };
          return { lines: [...s.lines, { item, qty: 1 }] };
        }),
      remove: (id) => set((s) => ({ lines: s.lines.filter((l) => l.item.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          lines: qty <= 0 ? s.lines.filter((l) => l.item.id !== id) : s.lines.map((l) => (l.item.id === id ? { ...l, qty } : l)),
        })),
      clear: () => set({ lines: [] }),
      setOpen: (v) => set({ open: v }),
      total: () => get().lines.reduce((s, l) => s + l.item.price * l.qty, 0),
      count: () => get().lines.reduce((s, l) => s + l.qty, 0),
    }),
    { name: "love-africa-cart" }
  )
);
