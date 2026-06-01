import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/store/cartStore";
import { fmtFCFA, WA_LINK } from "@/data/seed";

export function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, total, clear } = useCart();
  const t = total();

  const sendWhatsApp = () => {
    const msg =
      `Bonjour Love Africa! Voici ma commande:\n` +
      lines.map((l) => `- ${l.item.name} x${l.qty} — ${fmtFCFA(l.item.price * l.qty)}`).join("\n") +
      `\nTOTAL: ${fmtFCFA(t)}\nTable / Livraison: à compléter\nMerci!`;
    window.open(WA_LINK(msg), "_blank");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 z-[70]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-off-white z-[80] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-light bg-black text-white">
              <h3 className="font-display text-xl">Mon Panier</h3>
              <button onClick={() => setOpen(false)} className="h-9 w-9 grid place-items-center rounded-full hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {lines.length === 0 && (
                <p className="text-gray-text text-center py-20">Votre panier est vide.</p>
              )}
              {lines.map((l) => (
                <div key={l.item.id} className="bg-white rounded-2xl p-3 flex gap-3 border-t-4 border-yellow">
                  <img src={l.item.image} alt={l.item.name} className="w-20 h-20 rounded-xl object-cover" loading="lazy" />
                  <div className="flex-1">
                    <div className="font-display font-bold text-sm">{l.item.name}</div>
                    <div className="font-mono-accent text-orange font-semibold">{fmtFCFA(l.item.price)}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => setQty(l.item.id, l.qty - 1)} className="h-7 w-7 rounded-full bg-black text-white grid place-items-center"><Minus className="w-3 h-3" /></button>
                      <span className="font-mono-accent font-bold w-6 text-center">{l.qty}</span>
                      <button onClick={() => setQty(l.item.id, l.qty + 1)} className="h-7 w-7 rounded-full bg-yellow text-black grid place-items-center"><Plus className="w-3 h-3" /></button>
                      <button onClick={() => remove(l.item.id)} className="ml-auto text-red-accent hover:bg-red-accent/10 h-7 w-7 grid place-items-center rounded-full"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {lines.length > 0 && (
              <div className="p-5 border-t border-gray-light bg-white space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-text">Total</span>
                  <span className="font-mono-accent font-bold text-2xl text-black">{fmtFCFA(t)}</span>
                </div>
                <button onClick={sendWhatsApp} className="w-full bg-yellow hover:brightness-110 text-black font-display font-bold py-4 rounded-full flex items-center justify-center gap-2 transition">
                  <MessageCircle className="w-5 h-5" /> Commander via WhatsApp
                </button>
                <button onClick={clear} className="w-full text-xs text-gray-text hover:text-red-accent">Vider le panier</button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
