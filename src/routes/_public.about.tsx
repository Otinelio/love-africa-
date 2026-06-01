import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Heart, Flame, Music, Star } from "lucide-react";
import { useSettings } from "@/store/settingsStore";

export const Route = createFileRoute("/_public/about")({
  head: () => ({
    meta: [
      { title: "À Propos — Love Africa Lomé" },
      { name: "description", content: "Notre histoire : un espace 100% africain à Lomé, lieu de vie, de culture et de fierté." },
      { property: "og:title", content: "Notre Histoire — Love Africa" },
      { property: "og:description", content: "Né de la vision de créer un espace 100% africain à Lomé." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Heart, label: "Convivialité" },
  { icon: Flame, label: "Passion culinaire" },
  { icon: Music, label: "Culture & Live" },
  { icon: Star, label: "Excellence" },
];

function Counter({ to, suffix = "" }: { to: number | string; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof to === "string") return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let n = 0;
        const step = to / 40;
        const i = setInterval(() => {
          n += step;
          if (n >= to) { setV(to); clearInterval(i); } else setV(Math.floor(n));
        }, 25);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <div ref={ref} className="font-display text-6xl lg:text-7xl text-yellow">{typeof to === "string" ? to : v}{suffix}</div>;
}

function AboutPage() {
  const about = useSettings((s) => s.about);
  return (
    <>
      <section className="grid lg:grid-cols-2 min-h-[80vh]">
        <div className="bg-yellow relative grid place-items-center p-10 pt-32 overflow-hidden">
          <h1 className="font-display text-7xl sm:text-8xl lg:text-[10rem] leading-[0.85] text-black">
            LOVE<br />AFRICA
          </h1>
        </div>
        <div className="bg-black relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=70" alt="Love Africa venue" className="w-full h-full object-cover opacity-80" />
        </div>
      </section>

      <section className="bg-off-white py-24">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <h2 className="font-display text-5xl mb-8">Notre Histoire</h2>
          <p className="text-lg leading-relaxed text-gray-text">{about}</p>
          <div className="mt-12 relative">
            <span className="absolute -top-6 -left-2 font-display text-yellow text-9xl leading-none">"</span>
            <p className="font-display text-3xl lg:text-4xl text-black px-8">
              Le meilleur endroit à Lomé pour se défouler
            </p>
            <span className="absolute -bottom-12 -right-2 font-display text-yellow text-9xl leading-none">"</span>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <motion.div key={v.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="h-20 w-20 mx-auto bg-yellow text-black rounded-full grid place-items-center mb-4"><v.icon className="w-8 h-8" /></div>
              <div className="font-display text-2xl">{v.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-yellow text-black py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-3 gap-10 text-center">
          <div><Counter to="7j/7 · 24h/24" /><p className="mt-2 font-display">Toujours ouvert</p></div>
          <div><Counter to={4} suffix="+" /><p className="mt-2 font-display">Expériences en un lieu</p></div>
          <div><Counter to="Lomé" /><p className="mt-2 font-display">Adresse incontournable</p></div>
        </div>
      </section>
    </>
  );
}
