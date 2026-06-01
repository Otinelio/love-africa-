import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SEED_GALLERY, type GalleryItem } from "@/data/seed";

type S = {
  items: GalleryItem[];
  add: (i: GalleryItem) => void;
  remove: (id: string) => void;
  update: (id: string, patch: Partial<GalleryItem>) => void;
};

export const useGallery = create<S>()(
  persist(
    (set) => ({
      items: SEED_GALLERY,
      add: (i) => set((s) => ({ items: [...s.items, i] })),
      remove: (id) => set((s) => ({ items: s.items.filter((x) => x.id !== id) })),
      update: (id, patch) => set((s) => ({ items: s.items.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
    }),
    { name: "love-africa-gallery" }
  )
);
