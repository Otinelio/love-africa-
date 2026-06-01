import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useGallery } from "@/store/galleryStore";
import { GALLERY_FILTERS } from "@/data/seed";

export const Route = createFileRoute("/_public/gallery")({
  head: () => ({
    meta: [
      { title: "Galerie — Love Africa Lomé" },
      { name: "description", content: "Ambiance, cocktails, cuisine, événements — découvrez Love Africa en images." },
      { property: "og:title", content: "Galerie — Love Africa" },
      { property: "og:description", content: "Plongez dans l'univers Love Africa." },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const items = useGallery((s) => s.items);
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<number | null>(null);
  const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);

  const next = () => setActive((i) => (i === null ? null : (i + 1) % filtered.length));
  const prev = () => setActive((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));

  return (
    <>
      <section className="bg-yellow text-black pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <h1 className="font-display text-7xl lg:text-9xl">LA GALERIE</h1>
          <p className="mt-4 font-mono-accent">Une nuit à Love Africa, sans filtre.</p>
        </div>
      </section>

      <div className="sticky top-16 lg:top-20 z-30 bg-off-white/95 backdrop-blur border-b border-gray-light">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {GALLERY_FILTERS.map((f) => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-display font-bold transition ${
                filter === f.id ? "bg-black text-yellow" : "border border-black/20 text-black/70 hover:border-black"
              }`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <section className="bg-off-white py-12">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 masonry-3">
          {filtered.map((g, i) => (
            <button key={g.id} onClick={() => setActive(i)} className="block w-full relative group rounded-xl overflow-hidden">
              <img src={g.url} alt={g.alt} loading="lazy" className="w-full" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition grid place-items-center">
                <Maximize2 className="w-8 h-8 text-yellow opacity-0 group-hover:opacity-100 transition" />
              </div>
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {active !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[80] grid place-items-center p-4">
            <button onClick={() => setActive(null)} className="absolute top-5 right-5 text-white h-10 w-10 grid place-items-center rounded-full bg-white/10"><X /></button>
            <button onClick={prev} className="absolute left-3 lg:left-8 text-white h-12 w-12 grid place-items-center rounded-full bg-white/10 hover:bg-yellow hover:text-black"><ChevronLeft /></button>
            <button onClick={next} className="absolute right-3 lg:right-8 text-white h-12 w-12 grid place-items-center rounded-full bg-white/10 hover:bg-yellow hover:text-black"><ChevronRight /></button>
            <motion.img key={filtered[active].id} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              src={filtered[active].url} alt={filtered[active].alt} className="max-w-full max-h-[85vh] rounded-xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
