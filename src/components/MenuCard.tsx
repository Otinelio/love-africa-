import { motion } from "framer-motion";
import { Plus, BanIcon } from "lucide-react";
import type { MenuItem } from "@/data/seed";
import { fmtFCFA } from "@/data/seed";
import { useCart } from "@/store/cartStore";

export function MenuCard({ item }: { item: MenuItem }) {
  const add = useCart((s) => s.add);
  const setOpen = useCart((s) => s.setOpen);
  const soldOut = item.soldOut || !item.available;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden border-t-4 border-yellow shadow-sm hover:shadow-xl hover:shadow-orange/10 transition relative"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-light relative">
        <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
        {soldOut && (
          <div className="absolute inset-0 bg-black/70 grid place-items-center">
            <span className="bg-red-accent text-white font-display px-4 py-1 rounded-full text-sm flex items-center gap-1"><BanIcon className="w-3 h-3" /> Rupture</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-lg leading-tight">{item.name}</h3>
        <p className="text-sm text-gray-text mt-1 line-clamp-2">{item.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono-accent font-bold text-orange text-lg">{fmtFCFA(item.price)}</span>
          {!soldOut && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => { add(item); setOpen(true); }}
              className="bg-black hover:bg-yellow hover:text-black text-white text-sm font-display font-bold px-4 py-2 rounded-full flex items-center gap-1 transition"
            >
              <Plus className="w-4 h-4" /> Ajouter
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
