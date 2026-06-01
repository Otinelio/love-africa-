import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Clock, Phone } from "lucide-react";
import { SunburstMotif } from "./SunburstMotif";

export function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      <div className="absolute -right-40 -bottom-40 w-[600px] h-[600px] pointer-events-none">
        <SunburstMotif opacity={0.07} />
      </div>
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="font-display text-3xl">
            <span className="text-yellow">LOVE</span> AFRICA
          </div>
          <p className="mt-3 text-yellow/90 italic">"Le meilleur endroit à Lomé pour se défouler"</p>
          <div className="flex gap-3 mt-5">
            <a href="https://instagram.com/LoveAfricaTg" className="h-10 w-10 rounded-full bg-white/10 hover:bg-yellow hover:text-black grid place-items-center transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://facebook.com/LoveAfricaTg" className="h-10 w-10 rounded-full bg-white/10 hover:bg-yellow hover:text-black grid place-items-center transition">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg text-yellow mb-4">Navigation</h4>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <Link to="/" className="hover:text-yellow">Home</Link>
            <Link to="/menu" className="hover:text-yellow">Menu</Link>
            <Link to="/events" className="hover:text-yellow">Events</Link>
            <Link to="/gallery" className="hover:text-yellow">Gallery</Link>
            <Link to="/about" className="hover:text-yellow">À Propos</Link>
            <Link to="/reserve" className="hover:text-yellow">Réserver</Link>
            <Link to="/contact" className="hover:text-yellow">Contact</Link>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <h4 className="font-display text-lg text-yellow mb-4">Nous trouver</h4>
          <div className="flex gap-3"><MapPin className="w-5 h-5 text-yellow shrink-0" /><span>Tokoin Doumasséssé, 50m de l'EAMEAU, Lomé, Togo</span></div>
          <div className="flex gap-3"><Clock className="w-5 h-5 text-yellow shrink-0" /><span>Lun – Dim · à partir de 10h · 7j/7 · 24h/24</span></div>
          <div className="flex gap-3"><Phone className="w-5 h-5 text-yellow shrink-0" /><a href="tel:+22893231173" className="hover:text-yellow">+228 93 23 11 73</a></div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Love Africa — Tokoin, Lomé. Tous droits réservés.
      </div>
    </footer>
  );
}
