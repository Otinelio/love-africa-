import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import { WA_LINK } from "@/data/seed";

export const Route = createFileRoute("/_public/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Love Africa Lomé" },
      { name: "description", content: "Tokoin Doumasséssé, 50m de l'EAMEAU. Tél/WhatsApp +228 93 23 11 73. Ouvert 7j/7 24h/24." },
      { property: "og:title", content: "Nous trouver — Love Africa" },
      { property: "og:description", content: "Adresse, horaires et contact WhatsApp." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [f, setF] = useState({ name: "", email: "", phone: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Bonjour Love Africa! Je vous contacte depuis votre site. Nom: ${f.name}, Tel: ${f.phone}. ${f.message}`;
    window.open(WA_LINK(msg), "_blank");
  };
  return (
    <>
      <section className="bg-black text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <h1 className="font-display text-7xl lg:text-9xl text-yellow">NOUS TROUVER</h1>
        </div>
      </section>

      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-3 gap-5">
          {[
            { icon: MapPin, title: "Adresse", body: "Tokoin Doumasséssé, Rue Tandjouaré, 50m de l'EAMEAU, Lomé, Togo" },
            { icon: Clock, title: "Horaires", body: "Lundi – Dimanche · 10h00 – 24h/24 · ouvert 7j/7" },
            { icon: Phone, title: "Téléphone", body: "+228 93 23 11 73" },
          ].map((c) => (
            <div key={c.title} className="bg-white rounded-2xl p-6 border-t-4 border-yellow">
              <div className="h-12 w-12 rounded-full bg-yellow text-black grid place-items-center mb-3"><c.icon className="w-6 h-6" /></div>
              <div className="font-display text-xl">{c.title}</div>
              <p className="mt-2 text-gray-text text-sm">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-off-white pb-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="rounded-3xl overflow-hidden border-4 border-yellow aspect-[16/9]">
            <iframe
              title="Carte Love Africa"
              src="https://www.google.com/maps?q=Tokoin+Doumass%C3%A9ss%C3%A9+Lom%C3%A9+Togo&output=embed"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="bg-yellow text-black py-10">
        <a href={WA_LINK("Bonjour Love Africa!")} className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-center gap-3 font-display font-bold text-xl lg:text-2xl hover:opacity-80 transition">
          <MessageCircle className="w-6 h-6" /> Contactez-nous sur WhatsApp
        </a>
      </section>

      <section className="bg-off-white py-20">
        <div className="max-w-2xl mx-auto px-5 lg:px-8">
          <h2 className="font-display text-4xl mb-6">Écrivez-nous</h2>
          <form onSubmit={submit} className="grid gap-3">
            <input required placeholder="Nom" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className="rounded-full bg-white border border-gray-light px-5 py-3 font-mono-accent" />
            <input type="email" required placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className="rounded-full bg-white border border-gray-light px-5 py-3 font-mono-accent" />
            <input required placeholder="Téléphone" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} className="rounded-full bg-white border border-gray-light px-5 py-3 font-mono-accent" />
            <textarea required placeholder="Message" rows={5} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} className="rounded-2xl bg-white border border-gray-light px-5 py-3 font-mono-accent" />
            <button className="bg-orange text-white font-display font-bold rounded-full px-7 py-4 hover:brightness-110 transition flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" /> Envoyer via WhatsApp
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
