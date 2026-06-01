import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageCircle, Plus, Minus } from "lucide-react";
import { WA_LINK } from "@/data/seed";

export const Route = createFileRoute("/_public/reserve")({
  head: () => ({
    meta: [
      { title: "Réserver — Love Africa Lomé" },
      { name: "description", content: "Réservez votre table, lounge ou VIP en quelques étapes. Confirmation immédiate via WhatsApp." },
      { property: "og:title", content: "Réservez votre table — Love Africa" },
      { property: "og:description", content: "Restaurant, Lounge, Club VIP, Événement privé." },
    ],
    links: [{ rel: "canonical", href: "/reserve" }],
  }),
  component: ReservePage,
});

const TYPES = [
  { id: "table", label: "Table restaurant", desc: "Dîner classique en salle" },
  { id: "lounge", label: "Lounge", desc: "Cocktails et bonne ambiance" },
  { id: "vip", label: "Club VIP", desc: "Carré privé en discothèque" },
  { id: "prive", label: "Événement privé", desc: "Anniversaire, soirée, corpo" },
];

function ReservePage() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState({ type: "", date: "", time: "", people: 2, firstName: "", lastName: "", phone: "", note: "" });

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const send = () => {
    const msg = `Bonjour Love Africa! Je souhaite réserver. Type: ${d.type}, Date: ${d.date}, Heure: ${d.time}, Personnes: ${d.people}, Nom: ${d.firstName} ${d.lastName}, Tel: ${d.phone}. Note: ${d.note || "—"}. Merci!`;
    window.open(WA_LINK(msg), "_blank");
  };

  return (
    <>
      <section className="bg-black text-white pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <h1 className="font-display text-6xl lg:text-8xl text-yellow">RÉSERVEZ VOTRE TABLE</h1>
        </div>
      </section>

      <section className="bg-off-white py-12">
        <div className="max-w-2xl mx-auto px-5 lg:px-8">
          <div className="flex gap-2 mb-8">
            {[0, 1, 2, 3].map((s) => (
              <div key={s} className={`flex-1 h-1.5 rounded-full ${s <= step ? "bg-yellow" : "bg-gray-light"}`} />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="bg-white rounded-3xl p-6 lg:p-10 border-t-4 border-yellow">
              {step === 0 && (
                <>
                  <h2 className="font-display text-3xl mb-6">1. Type de réservation</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {TYPES.map((t) => (
                      <button key={t.id} onClick={() => setD({ ...d, type: t.label })}
                        className={`text-left p-5 rounded-2xl border-2 transition ${d.type === t.label ? "border-yellow bg-yellow/10" : "border-gray-light hover:border-black"}`}>
                        <div className="font-display font-bold text-lg">{t.label}</div>
                        <div className="text-sm text-gray-text mt-1">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  <h2 className="font-display text-3xl mb-6">2. Date & personnes</h2>
                  <div className="grid gap-4">
                    <label className="grid gap-1"><span className="text-sm">Date</span>
                      <input type="date" required value={d.date} onChange={(e) => setD({ ...d, date: e.target.value })} className="rounded-full bg-off-white border border-gray-light px-5 py-3" />
                    </label>
                    <label className="grid gap-1"><span className="text-sm">Heure</span>
                      <input type="time" required value={d.time} onChange={(e) => setD({ ...d, time: e.target.value })} className="rounded-full bg-off-white border border-gray-light px-5 py-3" />
                    </label>
                    <div>
                      <span className="text-sm">Nombre de personnes</span>
                      <div className="flex items-center gap-4 mt-2">
                        <button onClick={() => setD({ ...d, people: Math.max(1, d.people - 1) })} className="h-12 w-12 bg-black text-white rounded-full grid place-items-center"><Minus /></button>
                        <span className="font-display text-3xl w-12 text-center">{d.people}</span>
                        <button onClick={() => setD({ ...d, people: d.people + 1 })} className="h-12 w-12 bg-yellow rounded-full grid place-items-center"><Plus /></button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <h2 className="font-display text-3xl mb-6">3. Vos coordonnées</h2>
                  <div className="grid gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input required placeholder="Prénom" value={d.firstName} onChange={(e) => setD({ ...d, firstName: e.target.value })} className="rounded-full bg-off-white border border-gray-light px-5 py-3" />
                      <input required placeholder="Nom" value={d.lastName} onChange={(e) => setD({ ...d, lastName: e.target.value })} className="rounded-full bg-off-white border border-gray-light px-5 py-3" />
                    </div>
                    <input required placeholder="Téléphone" value={d.phone} onChange={(e) => setD({ ...d, phone: e.target.value })} className="rounded-full bg-off-white border border-gray-light px-5 py-3" />
                    <textarea rows={3} placeholder="Note spéciale (optionnel)" value={d.note} onChange={(e) => setD({ ...d, note: e.target.value })} className="rounded-2xl bg-off-white border border-gray-light px-5 py-3" />
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <h2 className="font-display text-3xl mb-6">4. Récapitulatif</h2>
                  <dl className="grid gap-2 text-sm">
                    {[
                      ["Type", d.type], ["Date", d.date], ["Heure", d.time], ["Personnes", String(d.people)],
                      ["Nom", `${d.firstName} ${d.lastName}`], ["Téléphone", d.phone], ["Note", d.note || "—"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between border-b border-gray-light pb-2">
                        <dt className="text-gray-text">{k}</dt><dd className="font-display font-bold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <button onClick={send} className="mt-6 w-full bg-yellow text-black font-display font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:brightness-110">
                    <MessageCircle className="w-5 h-5" /> Envoyer la réservation
                  </button>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            <button onClick={back} disabled={step === 0} className="flex items-center gap-1 font-display font-bold text-sm disabled:opacity-30">
              <ChevronLeft className="w-4 h-4" /> Précédent
            </button>
            {step < 3 && (
              <button onClick={next} className="bg-black text-white font-display font-bold rounded-full px-6 py-3 flex items-center gap-1">
                Suivant <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
