import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ShoppingCart } from "lucide-react";
import { MenuCard } from "@/components/MenuCard";
import { useMenu } from "@/store/menuStore";
import { useCart } from "@/store/cartStore";
import { MENU_CATEGORIES } from "@/data/seed";

export const Route = createFileRoute("/_public/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Love Africa Lomé" },
      { name: "description", content: "Plats africains, fast-food, grillades, cocktails signature, bières et champagne." },
      { property: "og:title", content: "Le Menu — Love Africa" },
      { property: "og:description", content: "Découvrez notre carte et commandez en quelques clics via WhatsApp." },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

function MenuPage() {
  const items = useMenu((s) => s.items);
  const [cat, setCat] = useState(MENU_CATEGORIES[0].id);
  const setCartOpen = useCart((s) => s.setOpen);
  const count = useCart((s) => s.count());
  const filtered = items.filter((i) => i.category === cat);

  return (
    <>
      <section className="bg-black text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(247,228,0,0.3), transparent 60%)" }} />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-white/50 mb-4">
            <Link to="/" className="hover:text-yellow">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-yellow">Menu</span>
          </div>
          <h1 className="font-display text-7xl lg:text-9xl">
            <span className="text-yellow">LE</span> MENU
          </h1>
          <p className="mt-4 text-white/70 max-w-xl">Toute notre carte, à commander à table ou via WhatsApp.</p>
        </div>
      </section>

      <div className="sticky top-16 lg:top-20 z-30 bg-off-white/95 backdrop-blur border-b border-gray-light">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {MENU_CATEGORIES.map((c) => (
            <motion.button
              key={c.id}
              onClick={() => setCat(c.id)}
              whileTap={{ scale: 0.95 }}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-display font-bold transition ${
                cat === c.id ? "bg-yellow text-black" : "border border-black/20 text-black/70 hover:border-black"
              }`}
            >
              {c.label}
            </motion.button>
          ))}
        </div>
      </div>

      <section className="py-12 bg-off-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <motion.div key={cat} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((it) => <MenuCard key={it.id} item={it} />)}
          </motion.div>
        </div>
      </section>

      {count > 0 && (
        <button onClick={() => setCartOpen(true)} className="fixed bottom-6 right-6 z-40 bg-orange text-white font-display font-bold rounded-full pl-5 pr-6 py-4 shadow-2xl flex items-center gap-2 hover:brightness-110 transition">
          <ShoppingCart className="w-5 h-5" /> Panier ({count})
        </button>
      )}
    </>
  );
}
