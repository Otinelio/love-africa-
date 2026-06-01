import { Calendar, MessageCircle, Users } from "lucide-react";
import type { EventItem } from "@/data/seed";
import { WA_LINK } from "@/data/seed";
import { motion } from "framer-motion";

export function EventCard({ event }: { event: EventItem }) {
  const d = new Date(event.date);
  const day = d.toLocaleDateString("fr-FR", { day: "2-digit" });
  const month = d.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase();
  const time = d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  const rsvp = () =>
    window.open(WA_LINK(`Bonjour, je souhaite m'inscrire pour l'événement ${event.title} du ${d.toLocaleDateString("fr-FR")}.`), "_blank");

  return (
    <motion.div whileHover={{ y: -6 }} className="relative bg-black text-white rounded-2xl overflow-hidden group">
      <div className="aspect-[4/5] relative overflow-hidden">
        <img src={event.image} alt={event.title} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-60 transition duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute top-4 right-4 bg-yellow text-black rounded-xl px-3 py-2 text-center font-display">
          <div className="text-xs leading-none">{month}</div>
          <div className="text-2xl leading-none font-extrabold">{day}</div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-2xl leading-tight">{event.title}</h3>
        <p className="text-sm text-white/70 mt-1 flex items-center gap-2"><Calendar className="w-3 h-3" /> {time} · {event.artist}</p>
        <p className="text-sm text-white/60 mt-2 line-clamp-2">{event.description}</p>
        {event.past ? (
          <span className="mt-3 inline-flex items-center gap-1 text-xs text-white/40"><Users className="w-3 h-3" /> Événement passé</span>
        ) : event.rsvpActive ? (
          <button onClick={rsvp} className="mt-4 bg-yellow hover:brightness-110 text-black font-display font-bold text-sm px-4 py-2 rounded-full flex items-center gap-1.5 transition">
            <MessageCircle className="w-4 h-4" /> RSVP WhatsApp
          </button>
        ) : (
          <span className="mt-4 inline-block bg-red-accent text-white text-xs font-bold px-3 py-1.5 rounded-full">Sold Out</span>
        )}
      </div>
    </motion.div>
  );
}
