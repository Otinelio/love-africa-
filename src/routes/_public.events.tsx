import { createFileRoute } from "@tanstack/react-router";
import { EventCard } from "@/components/EventCard";
import { useEvents } from "@/store/eventsStore";
import { Mic, ChefHat } from "lucide-react";

export const Route = createFileRoute("/_public/events")({
  head: () => ({
    meta: [
      { title: "Événements — Love Africa Lomé" },
      { name: "description", content: "Lives, Open Mic, Soirées DJ et Super Chef RCA. L'agenda du meilleur club de Lomé." },
      { property: "og:title", content: "Événements — Love Africa" },
      { property: "og:description", content: "Réservez votre place pour nos prochains événements via WhatsApp." },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: EventsPage,
});

function EventsPage() {
  const events = useEvents((s) => s.events);
  const upcoming = events.filter((e) => !e.past);
  const past = events.filter((e) => e.past);

  return (
    <>
      <section className="bg-black text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{ background: "radial-gradient(ellipse at top, rgba(247,228,0,0.25), transparent 60%)" }} />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <h1 className="font-display text-7xl lg:text-9xl text-yellow">ÉVÉNEMENTS</h1>
          <p className="mt-4 text-white/70 text-lg font-mono-accent">Lives · Open Mic · Soirées DJ · Super Chef RCA</p>
        </div>
      </section>

      <section className="bg-off-white py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <h2 className="font-display text-4xl mb-8">À venir</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcoming.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <h2 className="font-display text-4xl text-yellow mb-2">Revivez nos meilleurs moments</h2>
          <p className="text-white/60 mb-8">Souvenirs des soirées passées.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {past.map((e) => (
              <div key={e.id} className="aspect-[3/4] rounded-xl overflow-hidden relative group">
                <img src={e.image} alt={e.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black to-transparent">
                  <div className="text-xs text-yellow font-mono-accent">{new Date(e.date).toLocaleDateString("fr-FR")}</div>
                  <div className="font-display font-bold text-sm">{e.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-off-white py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 gap-6">
          <div className="bg-yellow rounded-3xl p-10 relative overflow-hidden">
            <Mic className="w-16 h-16 mb-4" />
            <h3 className="font-display text-4xl">Open Mic</h3>
            <p className="mt-3 max-w-md">Venez partager votre talent chaque jeudi soir. Slam, rap, chant, spoken word — la scène est à vous.</p>
          </div>
          <div className="bg-black text-white rounded-3xl p-10 relative overflow-hidden">
            <ChefHat className="w-16 h-16 text-yellow mb-4" />
            <h3 className="font-display text-4xl text-yellow">Super Chef RCA</h3>
            <p className="mt-3 text-white/80 max-w-md">La compétition culinaire de Lomé. Des chefs invités, des plats d'exception, un public passionné.</p>
          </div>
        </div>
      </section>
    </>
  );
}
