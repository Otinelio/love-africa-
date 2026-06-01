import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ShoppingCart, Check, Trash2 } from "lucide-react";
import { MENU_CATEGORIES, fmtFCFA } from "@/data/seed";
import { useMenu } from "@/store/menuStore";
import { useOrders } from "@/store/ordersStore";
import type { CartLine } from "@/store/cartStore";

export const Route = createFileRoute("/table/$tableNumber")({
  head: () => ({
    meta: [
      { title: "Table — Love Africa" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: TablePage,
});

function TablePage() {
  const { tableNumber } = Route.useParams();
  const items = useMenu((s) => s.items);
  const addOrder = useOrders((s) => s.add);
  const [cat, setCat] = useState(MENU_CATEGORIES[0].id);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [sent, setSent] = useState(false);

  const filtered = items.filter((i) => i.category === cat);
  const total = lines.reduce((s, l) => s + l.item.price * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  const addLine = (item: typeof items[number]) => {
    setLines((ls) => {
      const ex = ls.find((l) => l.item.id === item.id);
      if (ex) return ls.map((l) => (l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l));
      return [...ls, { item, qty: 1 }];
    });
  };
  const setQty = (id: string, qty: number) =>
    setLines((ls) => qty <= 0 ? ls.filter((l) => l.item.id !== id) : ls.map((l) => l.item.id === id ? { ...l, qty } : l));

  const submit = () => {
    addOrder(tableNumber, lines);
    setLines([]);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-yellow grid place-items-center px-5">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
          <div className="h-24 w-24 mx-auto rounded-full bg-black text-yellow grid place-items-center mb-6"><Check className="w-12 h-12" /></div>
          <h1 className="font-display text-4xl lg:text-5xl">Votre commande a été envoyée!</h1>
          <p className="mt-4 text-black/70">Notre équipe arrive dans quelques instants à la Table {tableNumber}.</p>
          <button onClick={() => setSent(false)} className="mt-8 bg-black text-yellow font-display font-bold px-6 py-3 rounded-full">Nouvelle commande</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white pb-32">
      <section className="bg-yellow text-black py-10 px-5 text-center relative overflow-hidden">
        <div className="font-display text-sm uppercase tracking-widest">Love Africa</div>
        <div className="font-display text-6xl lg:text-7xl mt-1">TABLE {tableNumber}</div>
        <p className="mt-2 max-w-md mx-auto text-sm">Bienvenue! Parcourez notre menu et commandez directement depuis votre table.</p>
      </section>

      <div className="sticky top-0 z-30 bg-off-white/95 backdrop-blur border-b border-gray-light">
        <div className="px-3 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {MENU_CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-display font-bold transition ${cat === c.id ? "bg-yellow text-black" : "border border-black/20 text-black/70"}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 p-3">
        {filtered.map((it) => {
          const ex = lines.find((l) => l.item.id === it.id);
          return (
            <div key={it.id} className="bg-white rounded-2xl overflow-hidden border-t-4 border-yellow flex gap-3 p-3">
              <img src={it.image} alt={it.name} loading="lazy" className="w-20 h-20 object-cover rounded-xl" />
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-sm">{it.name}</div>
                <div className="font-mono-accent text-orange text-sm">{fmtFCFA(it.price)}</div>
                <div className="mt-2 flex items-center gap-2">
                  {ex ? (
                    <>
                      <button onClick={() => setQty(it.id, ex.qty - 1)} className="h-7 w-7 bg-black text-white rounded-full grid place-items-center"><Minus className="w-3 h-3" /></button>
                      <span className="font-bold w-5 text-center">{ex.qty}</span>
                      <button onClick={() => setQty(it.id, ex.qty + 1)} className="h-7 w-7 bg-yellow rounded-full grid place-items-center"><Plus className="w-3 h-3" /></button>
                    </>
                  ) : (
                    <button onClick={() => addLine(it)} className="bg-black text-white text-xs font-display font-bold px-3 py-1.5 rounded-full flex items-center gap-1"><Plus className="w-3 h-3" /> Ajouter</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {count > 0 && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-0 inset-x-0 bg-black text-white p-4 z-50 shadow-2xl">
            <div className="max-h-40 overflow-y-auto mb-3">
              {lines.map((l) => (
                <div key={l.item.id} className="flex items-center gap-2 text-sm py-1">
                  <span className="text-yellow font-mono-accent">{l.qty}×</span>
                  <span className="flex-1 truncate">{l.item.name}</span>
                  <span className="text-yellow">{fmtFCFA(l.item.price * l.qty)}</span>
                  <button onClick={() => setQty(l.item.id, 0)} className="text-red-accent"><Trash2 className="w-3 h-3" /></button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="text-xs text-white/60">Total ({count} articles)</div>
                <div className="font-mono-accent font-bold text-2xl text-yellow">{fmtFCFA(total)}</div>
              </div>
              <button onClick={submit} className="bg-yellow text-black font-display font-bold px-6 py-3 rounded-full flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" /> Commander
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
