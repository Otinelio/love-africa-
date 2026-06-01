import { create } from "zustand";
import { persist } from "zustand/middleware";

type Settings = {
  hours: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  tagline: string;
  about: string;
  /** Public site URL for QR codes (e.g. https://loveafrica.tg). Empty = current domain. */
  siteUrl: string;
};

type S = Settings & { update: (patch: Partial<Settings>) => void };

export const useSettings = create<S>()(
  persist(
    (set) => ({
      hours: "Lundi – Dimanche · à partir de 10h00 · ouvert 7j/7 24h/24",
      whatsapp: "+228 93 23 11 73",
      instagram: "@LoveAfricaTg",
      facebook: "@LoveAfricaTg",
      tagline: "Le meilleur endroit à Lomé pour se défouler",
      about:
        "Né de la vision de créer un espace 100% africain à Lomé, Love Africa est bien plus qu'un restaurant. C'est un lieu de vie, de culture et de fierté. Du décor aux sonorités, de la cuisine à l'ambiance, tout ici célèbre l'Afrique dans toute sa richesse.",
      siteUrl: "",
      update: (patch) => set((s) => ({ ...s, ...patch })),
    }),
    { name: "love-africa-settings" }
  )
);
