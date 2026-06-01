import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Clock as ClockIcon } from "lucide-react";
import { PinGuard } from "@/components/PinGuard";
import { useOrders, type OrderStatus } from "@/store/ordersStore";
import { fmtFCFA } from "@/data/seed";

export const Route = createFileRoute("/reception")({
  head: () => ({ meta: [{ title: "Réception — Love Africa" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: () => <PinGuard scope="Réception"><Reception /></PinGuard>,
});

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "En attente",
  preparing: "En préparation",
  ready: "Prêt",
  delivered: "Livré",
};
const STATUS_COLOR: Record<OrderStatus, string> = {
  pending: "bg-yellow",
  preparing: "bg-blue-500",
  ready: "bg-orange",
  delivered: "bg-green-500",
};

function playChime() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.setValueAtTime(880, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.4);
    g.gain.setValueAtTime(0.2, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    o.start(); o.stop(ctx.currentTime + 0.5);
  } catch {}
}

function Reception() {
  const { orders, setStatus } = useOrders();
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  const [now, setNow] = useState(new Date());
  const lastCount = useRef(orders.length);

  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const poll = setInterval(() => {
      const fresh = JSON.parse(localStorage.getItem("love-africa-orders") || "{}")?.state?.orders || [];
      if (fresh.length > lastCount.current) playChime();
      lastCount.current = fresh.length;
    }, 3000);
    return () => clearInterval(poll);
  }, []);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const today = useMemo(() => {
    const t0 = new Date(); t0.setHours(0, 0, 0, 0);
    return orders.filter((o) => new Date(o.timestamp) >= t0);
  }, [orders]);
  const revenue = today.reduce((s, o) => s + o.total, 0);
  const topItem = (() => {
    const m: Record<string, number> = {};
    today.forEach((o) => o.items.forEach((i) => { m[i.name] = (m[i.name] || 0) + i.qty; }));
    return Object.entries(m).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
  })();
  const avg = today.length ? Math.round(revenue / today.length) : 0;

  const logout = () => { sessionStorage.removeItem("pin_Réception"); location.reload(); };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-5 py-4 flex items-center justify-between">
        <div className="font-display text-2xl"><span className="text-yellow">LOVE AFRICA</span> · RÉCEPTION</div>
        <div className="flex items-center gap-4 text-sm">
          <span className="font-mono-accent flex items-center gap-1"><ClockIcon className="w-4 h-4 text-yellow" /> {now.toLocaleTimeString("fr-FR")}</span>
          <button onClick={logout} className="flex items-center gap-1 text-white/70 hover:text-yellow"><Lock className="w-4 h-4" /> Déconnexion</button>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-4 p-5 border-b border-white/10">
        {[
          ["Commandes du jour", String(today.length)],
          ["Revenu (FCFA)", fmtFCFA(revenue)],
          ["Top article", topItem],
          ["Panier moyen", fmtFCFA(avg)],
        ].map(([k, v]) => (
          <div key={k} className="bg-white/5 rounded-2xl p-4">
            <div className="text-xs text-white/50 uppercase tracking-wider">{k}</div>
            <div className="font-display text-2xl text-yellow mt-1 truncate">{v}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr] gap-5 p-5">
        <div>
          <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
            {[["all", "Tous"], ["pending", "En attente"], ["preparing", "En préparation"], ["ready", "Prêt"], ["delivered", "Livrés"]].map(([k, l]) => (
              <button key={k} onClick={() => setFilter(k as any)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-display ${filter === k ? "bg-yellow text-black" : "bg-white/10 hover:bg-white/20"}`}>
                {l}
              </button>
            ))}
          </div>
          {filtered.length === 0 && <p className="text-white/40 text-center py-20">Aucune commande pour le moment.</p>}
          <AnimatePresence>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((o) => (
                <motion.div key={o.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white/5 rounded-2xl p-4 border-l-4 border-yellow">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-display text-2xl">Table {o.tableNumber}</div>
                      <div className="text-xs text-white/50">{new Date(o.timestamp).toLocaleTimeString("fr-FR")}</div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`h-2 w-2 rounded-full ${STATUS_COLOR[o.status]}`} />
                      {STATUS_LABEL[o.status]}
                    </div>
                  </div>
                  <ul className="mt-3 text-sm space-y-1">
                    {o.items.map((i) => (
                      <li key={i.id} className="flex justify-between"><span><span className="text-yellow font-mono-accent">{i.qty}×</span> {i.name}</span><span className="text-white/60">{fmtFCFA(i.price * i.qty)}</span></li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-white/10 flex justify-between font-bold">
                    <span>Total</span><span className="text-yellow font-mono-accent">{fmtFCFA(o.total)}</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    {o.status === "pending" && <button onClick={() => setStatus(o.id, "preparing")} className="flex-1 bg-blue-500 text-white text-xs font-display font-bold py-2 rounded-full">Confirmer</button>}
                    {o.status === "preparing" && <button onClick={() => setStatus(o.id, "ready")} className="flex-1 bg-orange text-white text-xs font-display font-bold py-2 rounded-full">Prêt</button>}
                    {o.status === "ready" && <button onClick={() => setStatus(o.id, "delivered")} className="flex-1 bg-green-500 text-white text-xs font-display font-bold py-2 rounded-full">Livré</button>}
                    {o.status === "delivered" && <span className="flex-1 text-center text-xs text-green-400">Livré</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
