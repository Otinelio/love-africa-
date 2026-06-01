import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronDown, Utensils, Wine, Music, Disc3, Star, MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { SunburstMotif, WaveLines } from "@/components/SunburstMotif";
import { MenuCard } from "@/components/MenuCard";
import { EventCard } from "@/components/EventCard";
import { useMenu } from "@/store/menuStore";
import { useEvents } from "@/store/eventsStore";
import { useGallery } from "@/store/galleryStore";
import { WA_LINK } from "@/data/seed";

export const Route = createFileRoute("/_public/")({
  head: () => ({
    meta: [
      { title: "Love Africa — Restaurant · Lounge · Club · Lomé" },
      { name: "description", content: "Le meilleur endroit à Lomé pour se défouler. Cuisine africaine, cocktails, live events et nightclub à Tokoin." },
      { property: "og:title", content: "Love Africa — Lomé" },
      { property: "og:description", content: "Restaurant, Lounge, Bar et Club à Tokoin Doumasséssé. Ouvert 7j/7 · 24h/24." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const HIGHLIGHTS = [
  { icon: Utensils, label: "Cuisine & Fast-food", desc: "Plats africains, burgers, grillades." },
  { icon: Wine, label: "Bar & Cocktails", desc: "Notre signature Love Africa." },
  { icon: Music, label: "Live Events & Open Mic", desc: "Chaque semaine, la scène vibre." },
  { icon: Disc3, label: "NightClub", desc: "Jusqu'au bout de la nuit." },
];

const TESTIMONIALS = [
  { name: "Yao A.", stars: 5, text: "Super restaurant — ambiance au top, service rapide. Je recommande." },
  { name: "Kossi M.", stars: 5, text: "Chic — l'endroit est magnifique, les cocktails sont divins." },
  { name: "Ezenwata B.", stars: 5, text: "Amazing place with lots of beautiful lights and very good African music." },
];

function HomePage() {
  const items = useMenu((s) => s.items);
  const allEvents = useEvents((s) => s.events);
  const allGallery = useGallery((s) => s.items);
  const events = useMemo(() => allEvents.filter((e) => !e.past).slice(0, 3), [allEvents]);
  const gallery = useMemo(() => allGallery.slice(0, 6), [allGallery]);
  const featured = useMemo(
    () => items.filter((i) => ["p3", "p4", "c1", "g1", "f1", "ch1"].includes(i.id)),
    [items],
  );

  const [form, setForm] = useState({ name: "", date: "", time: "", people: "2" });
  const submitReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Bonjour Love Africa, je souhaite réserver une table. Nom: ${form.name}, Date: ${form.date}, Heure: ${form.time}, Personnes: ${form.people}. Merci.`;
    window.open(WA_LINK(msg), "_blank");
  };

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen bg-black text-white overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] rounded-full"
            style={{ background: "radial-gradient(circle at center, rgba(247,228,0,0.55), rgba(247,228,0,0.05) 40%, transparent 65%)" }} />
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=70"
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        <div className="absolute top-24 right-5 lg:right-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-full pl-3 pr-4 py-2 flex items-center gap-2 text-xs font-mono-accent">
          <span className="h-2 w-2 rounded-full bg-green-400 pulse-dot" />
          Ouvert 7j/7 · 24h/24
        </div>
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-32 w-full">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="font-display text-7xl sm:text-8xl lg:text-[11rem] leading-[0.85] tracking-tighter">
            <span className="block text-yellow text-shadow-glow">LOVE</span>
            <span className="block text-white">AFRICA</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-6 text-lg lg:text-xl text-white/80 font-mono-accent tracking-wide">
            Club · Lounge · Resto · Events — Lomé, Togo
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-10 flex flex-wrap gap-4">
            <Link to="/menu" className="bg-yellow text-black font-display font-bold px-7 py-4 rounded-full hover:brightness-110 transition">Voir le Menu</Link>
            <Link to="/reserve" className="border-2 border-white/70 hover:bg-white hover:text-black text-white font-display font-bold px-7 py-4 rounded-full transition">Réserver une Table</Link>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bounce-chev text-yellow">
          <ChevronDown className="w-8 h-8" />
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div key={h.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="snap-start shrink-0 w-72 bg-black text-white rounded-2xl p-6 border-t-4 border-yellow hover:shadow-2xl hover:shadow-orange/30 transition">
              <div className="h-12 w-12 rounded-full bg-yellow text-black grid place-items-center mb-4"><h.icon className="w-6 h-6" /></div>
              <div className="font-display text-xl">{h.label}</div>
              <p className="text-sm text-white/70 mt-1">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MENU TEASER */}
      <section className="bg-off-white py-20 relative overflow-hidden">
        <WaveLines className="absolute top-0 inset-x-0 h-20" />
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-orange font-mono-accent">Le menu du soir</span>
              <h2 className="font-display text-5xl lg:text-6xl mt-2">Ce soir, on mange quoi ?</h2>
            </div>
            <Link to="/menu" className="hidden sm:inline-flex font-display text-sm font-bold border-b-2 border-black hover:text-orange hover:border-orange transition">Voir tout le menu</Link>
          </div>
          <div className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-5 px-5">
            {featured.map((it) => (
              <div key={it.id} className="snap-start shrink-0 w-72"><MenuCard item={it} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS TEASER */}
      <section className="relative bg-black text-white py-20 overflow-hidden">
        <div className="absolute -left-40 top-10 w-[500px] h-[500px] pointer-events-none"><SunburstMotif opacity={0.06} /></div>
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <h2 className="font-display text-5xl lg:text-6xl text-yellow">Prochains Événements</h2>
          <p className="text-white/60 mt-2">Lives, DJ sets, open mics — ne ratez rien.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {events.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section className="bg-off-white py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-5xl">La Galerie</h2>
            <Link to="/gallery" className="font-display text-sm font-bold border-b-2 border-black hover:text-orange hover:border-orange">Tout voir</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((g) => (
              <Link key={g.id} to="/gallery" className="relative aspect-square overflow-hidden rounded-xl group">
                <img src={g.url} alt={g.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-yellow/0 group-hover:bg-yellow/40 transition grid place-items-center">
                  <span className="opacity-0 group-hover:opacity-100 font-display font-bold text-black">Voir la Galerie</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVATION STRIP */}
      <section className="bg-yellow text-black py-16 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-[400px] h-[400px] pointer-events-none"><SunburstMotif color="#111111" opacity={0.08} /></div>
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-[1fr_2fr] gap-10 items-center">
          <div>
            <h2 className="font-display text-5xl lg:text-6xl leading-none">Réservez<br />votre table</h2>
            <p className="mt-3 font-mono-accent">Confirmation immédiate via WhatsApp.</p>
          </div>
          <form onSubmit={submitReservation} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <input required placeholder="Votre nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-black/90 text-white placeholder:text-white/40 rounded-full px-5 py-3 font-mono-accent" />
            <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="bg-black/90 text-white rounded-full px-5 py-3 font-mono-accent" />
            <input required type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="bg-black/90 text-white rounded-full px-5 py-3 font-mono-accent" />
            <button type="submit" className="bg-black text-yellow font-display font-bold rounded-full px-5 py-3 hover:bg-orange hover:text-white transition flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" /> Réserver
            </button>
            <input min={1} required type="number" placeholder="N° personnes" value={form.people} onChange={(e) => setForm({ ...form, people: e.target.value })}
              className="bg-black/90 text-white placeholder:text-white/40 rounded-full px-5 py-3 font-mono-accent sm:col-span-2" />
          </form>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-off-white py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <h2 className="font-display text-5xl mb-10">Ils nous adorent</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border-t-4 border-yellow">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow text-yellow" />)}
                </div>
                <p className="text-gray-text italic">"{t.text}"</p>
                <div className="mt-4 font-display font-bold">{t.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
