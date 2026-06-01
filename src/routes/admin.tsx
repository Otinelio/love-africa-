import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Plus, Trash2, Save, Utensils, Calendar, ShoppingBag, Image as ImageIcon, Settings as SettingsIcon, Download, QrCode, Printer } from "lucide-react";
import { TableQrCard } from "@/components/TableQrCard";
import { useTables } from "@/store/tablesStore";
import { useQrBaseUrl } from "@/hooks/use-qr-base-url";
import { PinGuard } from "@/components/PinGuard";
import { useMenu } from "@/store/menuStore";
import { useEvents } from "@/store/eventsStore";
import { useOrders } from "@/store/ordersStore";
import { useGallery } from "@/store/galleryStore";
import { useSettings } from "@/store/settingsStore";
import { MENU_CATEGORIES, fmtFCFA, GALLERY_FILTERS } from "@/data/seed";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Love Africa" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: () => <PinGuard scope="Admin"><Admin /></PinGuard>,
});

const TABS = [
  { id: "menu", label: "Menu", icon: Utensils },
  { id: "events", label: "Événements", icon: Calendar },
  { id: "orders", label: "Commandes", icon: ShoppingBag },
  { id: "gallery", label: "Galerie", icon: ImageIcon },
  { id: "qr", label: "Codes QR", icon: QrCode },
  { id: "settings", label: "Paramètres", icon: SettingsIcon },
];

function Admin() {
  const [tab, setTab] = useState("menu");
  const logout = () => { sessionStorage.removeItem("pin_Admin"); location.reload(); };
  return (
    <div className="min-h-screen bg-off-white grid lg:grid-cols-[240px_1fr]">
      <aside className="no-print bg-black text-white p-5 lg:min-h-screen">
        <div className="font-display text-xl mb-6"><span className="text-yellow">LOVE</span> ADMIN</div>
        <nav className="space-y-1">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-display ${tab === t.id ? "bg-yellow text-black" : "hover:bg-white/10"}`}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </nav>
        <button onClick={logout} className="mt-8 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-yellow">
          <Lock className="w-4 h-4" /> Déconnexion
        </button>
      </aside>
      <main className="p-5 lg:p-8">
        {tab === "menu" && <MenuAdmin />}
        {tab === "events" && <EventsAdmin />}
        {tab === "orders" && <OrdersAdmin />}
        {tab === "gallery" && <GalleryAdmin />}
        {tab === "qr" && <QrCodesAdmin />}
        {tab === "settings" && <SettingsAdmin />}
      </main>
    </div>
  );
}

function MenuAdmin() {
  const { items, add, update, remove } = useMenu();
  const [draft, setDraft] = useState({ name: "", category: "plats", price: "", description: "", image: "" });
  const create = () => {
    if (!draft.name || !draft.price) return;
    add({ id: `n_${Date.now()}`, name: draft.name, category: draft.category, price: Number(draft.price), description: draft.description, image: draft.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=70", available: true });
    setDraft({ name: "", category: "plats", price: "", description: "", image: "" });
  };
  return (
    <div>
      <h1 className="font-display text-3xl mb-6">Gestion du Menu</h1>
      <div className="bg-white rounded-2xl p-5 mb-6 border-t-4 border-yellow">
        <h3 className="font-display font-bold mb-3">Ajouter un article</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <input placeholder="Nom" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="rounded-full bg-off-white border border-gray-light px-4 py-2" />
          <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className="rounded-full bg-off-white border border-gray-light px-4 py-2">
            {MENU_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <input type="number" placeholder="Prix FCFA" value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} className="rounded-full bg-off-white border border-gray-light px-4 py-2" />
          <input placeholder="URL image" value={draft.image} onChange={(e) => setDraft({ ...draft, image: e.target.value })} className="rounded-full bg-off-white border border-gray-light px-4 py-2 sm:col-span-2" />
          <button onClick={create} className="bg-yellow text-black font-display font-bold rounded-full px-4 py-2 flex items-center justify-center gap-1"><Plus className="w-4 h-4" /> Ajouter</button>
          <input placeholder="Description" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} className="rounded-full bg-off-white border border-gray-light px-4 py-2 sm:col-span-3" />
        </div>
      </div>
      <div className="space-y-2">
        {items.map((i) => (
          <div key={i.id} className="bg-white rounded-xl p-3 flex items-center gap-3">
            <img src={i.image} alt="" className="w-12 h-12 object-cover rounded-lg" />
            <input value={i.name} onChange={(e) => update(i.id, { name: e.target.value })} className="flex-1 bg-transparent font-display font-bold" />
            <input type="number" value={i.price} onChange={(e) => update(i.id, { price: Number(e.target.value) })} className="w-24 bg-off-white rounded px-2 py-1 text-sm font-mono-accent" />
            <label className="text-xs flex items-center gap-1">
              <input type="checkbox" checked={!i.soldOut} onChange={(e) => update(i.id, { soldOut: !e.target.checked })} /> Dispo
            </label>
            <button onClick={() => remove(i.id)} className="text-red-accent hover:bg-red-accent/10 p-2 rounded"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsAdmin() {
  const { events, add, update, remove } = useEvents();
  const [d, setD] = useState({ title: "", date: "", artist: "", description: "", image: "", capacity: 100 });
  const create = () => {
    if (!d.title || !d.date) return;
    add({ id: `e_${Date.now()}`, title: d.title, date: d.date, artist: d.artist, description: d.description, image: d.image || "https://images.unsplash.com/photo-1571266028243-d220bc562b1a?auto=format&fit=crop&w=900&q=70", capacity: d.capacity, rsvpActive: true });
    setD({ title: "", date: "", artist: "", description: "", image: "", capacity: 100 });
  };
  return (
    <div>
      <h1 className="font-display text-3xl mb-6">Événements</h1>
      <div className="bg-white rounded-2xl p-5 mb-6 border-t-4 border-yellow grid sm:grid-cols-2 gap-3">
        <input placeholder="Titre" value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} className="rounded-full bg-off-white border border-gray-light px-4 py-2" />
        <input type="datetime-local" value={d.date} onChange={(e) => setD({ ...d, date: e.target.value })} className="rounded-full bg-off-white border border-gray-light px-4 py-2" />
        <input placeholder="Artiste / DJ" value={d.artist} onChange={(e) => setD({ ...d, artist: e.target.value })} className="rounded-full bg-off-white border border-gray-light px-4 py-2" />
        <input type="number" placeholder="Capacité" value={d.capacity} onChange={(e) => setD({ ...d, capacity: Number(e.target.value) })} className="rounded-full bg-off-white border border-gray-light px-4 py-2" />
        <input placeholder="URL image" value={d.image} onChange={(e) => setD({ ...d, image: e.target.value })} className="rounded-full bg-off-white border border-gray-light px-4 py-2 sm:col-span-2" />
        <textarea placeholder="Description" value={d.description} onChange={(e) => setD({ ...d, description: e.target.value })} className="rounded-2xl bg-off-white border border-gray-light px-4 py-2 sm:col-span-2" />
        <button onClick={create} className="bg-yellow text-black font-display font-bold rounded-full px-4 py-2 sm:col-span-2"><Plus className="w-4 h-4 inline" /> Créer l'événement</button>
      </div>
      <div className="space-y-2">
        {events.map((e) => (
          <div key={e.id} className="bg-white rounded-xl p-3 flex items-center gap-3">
            <img src={e.image} alt="" className="w-14 h-14 object-cover rounded-lg" />
            <div className="flex-1">
              <input value={e.title} onChange={(ev) => update(e.id, { title: ev.target.value })} className="font-display font-bold bg-transparent w-full" />
              <div className="text-xs text-gray-text">{new Date(e.date).toLocaleString("fr-FR")} · {e.artist}</div>
            </div>
            <label className="text-xs flex items-center gap-1"><input type="checkbox" checked={e.rsvpActive} onChange={(ev) => update(e.id, { rsvpActive: ev.target.checked })} /> RSVP</label>
            <button onClick={() => remove(e.id)} className="text-red-accent p-2"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersAdmin() {
  const orders = useOrders((s) => s.orders);
  const exportCsv = () => {
    const rows = [["ID", "Table", "Total", "Statut", "Date", "Articles"]];
    orders.forEach((o) => rows.push([o.id, o.tableNumber, String(o.total), o.status, o.timestamp, o.items.map((i) => `${i.qty}x ${i.name}`).join("; ")]));
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
    a.download = `orders-${Date.now()}.csv`;
    a.click();
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-3xl">Historique des commandes</h1>
        <button onClick={exportCsv} className="bg-black text-white rounded-full px-4 py-2 text-sm flex items-center gap-1"><Download className="w-4 h-4" /> Export CSV</button>
      </div>
      <div className="bg-white rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black text-white text-left">
            <tr><th className="p-3">Date</th><th className="p-3">Table</th><th className="p-3">Articles</th><th className="p-3">Total</th><th className="p-3">Statut</th></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-gray-light">
                <td className="p-3 text-xs">{new Date(o.timestamp).toLocaleString("fr-FR")}</td>
                <td className="p-3 font-display font-bold">{o.tableNumber}</td>
                <td className="p-3 text-xs">{o.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}</td>
                <td className="p-3 font-mono-accent">{fmtFCFA(o.total)}</td>
                <td className="p-3 text-xs">{o.status}</td>
              </tr>
            ))}
            {orders.length === 0 && <tr><td colSpan={5} className="p-10 text-center text-gray-text">Aucune commande.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GalleryAdmin() {
  const { items, add, remove } = useGallery();
  const [d, setD] = useState({ url: "", category: "ambiance", alt: "" });
  return (
    <div>
      <h1 className="font-display text-3xl mb-6">Galerie</h1>
      <div className="bg-white rounded-2xl p-5 mb-6 border-t-4 border-yellow grid sm:grid-cols-3 gap-3">
        <input placeholder="URL image" value={d.url} onChange={(e) => setD({ ...d, url: e.target.value })} className="rounded-full bg-off-white border border-gray-light px-4 py-2 sm:col-span-2" />
        <select value={d.category} onChange={(e) => setD({ ...d, category: e.target.value })} className="rounded-full bg-off-white border border-gray-light px-4 py-2">
          {GALLERY_FILTERS.filter((f) => f.id !== "all").map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
        </select>
        <input placeholder="Description (alt)" value={d.alt} onChange={(e) => setD({ ...d, alt: e.target.value })} className="rounded-full bg-off-white border border-gray-light px-4 py-2 sm:col-span-2" />
        <button onClick={() => { if (d.url) { add({ id: `g_${Date.now()}`, ...d }); setD({ url: "", category: "ambiance", alt: "" }); } }} className="bg-yellow text-black font-display font-bold rounded-full px-4 py-2">Ajouter</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((g) => (
          <div key={g.id} className="relative group rounded-xl overflow-hidden aspect-square">
            <img src={g.url} alt={g.alt} className="w-full h-full object-cover" />
            <button onClick={() => remove(g.id)} className="absolute top-2 right-2 bg-red-accent text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-3 h-3" /></button>
            <div className="absolute bottom-2 left-2 bg-black/70 text-yellow text-xs px-2 py-1 rounded">{g.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QrCodesAdmin() {
  const { tables, add, remove } = useTables();
  const baseUrl = useQrBaseUrl();
  const { siteUrl, update } = useSettings();
  const [number, setNumber] = useState("");
  const [label, setLabel] = useState("");

  const addTable = () => {
    if (!number.trim()) return;
    add(number, label || undefined);
    setNumber("");
    setLabel("");
  };

  return (
    <div>
      <div className="no-print flex flex-wrap justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl">Codes QR — Tables</h1>
          <p className="mt-2 text-sm text-gray-text max-w-xl">
            Chaque code ouvre le splash puis le menu scan de la table (<code className="text-xs">/scan/…</code>).
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="bg-black text-white rounded-full px-4 py-2 text-sm font-display font-bold flex items-center gap-2"
        >
          <Printer className="w-4 h-4" /> Imprimer tous
        </button>
      </div>

      <div className="no-print bg-white rounded-2xl p-5 mb-6 border-t-4 border-yellow space-y-4">
        <label className="grid gap-1">
          <span className="text-sm text-gray-text">URL publique du site (pour les QR imprimés)</span>
          <input
            value={siteUrl}
            onChange={(e) => update({ siteUrl: e.target.value })}
            placeholder="https://votre-domaine.com"
            className="rounded-full bg-off-white border border-gray-light px-4 py-2"
          />
        </label>
        <p className="text-xs text-gray-text">
          Base utilisée : <strong className="text-black">{baseUrl || "—"}</strong>
        </p>
        <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-3 items-end pt-2 border-t border-gray-light">
          <label className="grid gap-1">
            <span className="text-sm text-gray-text">N° de table</span>
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="ex. 9, VIP-A"
              className="rounded-full bg-off-white border border-gray-light px-4 py-2"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-gray-text">Libellé (optionnel)</span>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Terrasse 9"
              className="rounded-full bg-off-white border border-gray-light px-4 py-2"
            />
          </label>
          <button
            type="button"
            onClick={addTable}
            className="bg-yellow text-black font-display font-bold rounded-full px-5 py-2 flex items-center justify-center gap-1"
          >
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>
      </div>

      {!baseUrl && (
        <p className="no-print text-sm text-red-accent mb-4">Configurez l&apos;URL publique ou ouvrez l&apos;admin depuis le site en production.</p>
      )}

      <div className="qr-print-area grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {tables.map((t) => (
          <div key={t.id} className="relative group">
            <TableQrCard table={t} baseUrl={baseUrl} />
            <button
              type="button"
              onClick={() => remove(t.id)}
              className="no-print absolute top-2 right-2 bg-red-accent text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              title="Supprimer la table"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      {tables.length === 0 && (
        <p className="text-center text-gray-text py-12">Aucune table. Ajoutez-en une ci-dessus.</p>
      )}
    </div>
  );
}

function SettingsAdmin() {
  const s = useSettings();
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 1500); };
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl mb-6">Paramètres</h1>
      <div className="bg-white rounded-2xl p-6 border-t-4 border-yellow space-y-4">
        {([
          ["Horaires", "hours"], ["WhatsApp", "whatsapp"], ["Instagram", "instagram"], ["Facebook", "facebook"], ["Tagline", "tagline"], ["URL du site (QR)", "siteUrl"],
        ] as const).map(([label, key]) => (
          <label key={key} className="grid gap-1">
            <span className="text-sm text-gray-text">{label}</span>
            <input value={s[key]} onChange={(e) => s.update({ [key]: e.target.value } as any)} className="rounded-full bg-off-white border border-gray-light px-4 py-2" />
          </label>
        ))}
        <label className="grid gap-1">
          <span className="text-sm text-gray-text">À propos</span>
          <textarea rows={5} value={s.about} onChange={(e) => s.update({ about: e.target.value })} className="rounded-2xl bg-off-white border border-gray-light px-4 py-2" />
        </label>
        <button onClick={save} className="bg-yellow text-black font-display font-bold px-6 py-3 rounded-full flex items-center gap-2">
          <Save className="w-4 h-4" /> {saved ? "Enregistré!" : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}
