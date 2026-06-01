import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/store/cartStore";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reserve", label: "Reserve" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useRouterState({ select: (s) => s.location });
  const setCartOpen = useCart((s) => s.setOpen);
  const count = useCart((s) => s.count());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl lg:text-3xl tracking-tight">
            <span className="text-yellow">LOVE</span>{" "}
            <span className="text-white">AFRICA</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => {
              const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`relative px-4 py-2 text-sm font-medium transition ${
                    active ? "text-yellow" : "text-white/80 hover:text-white"
                  }`}
                >
                  {n.label}
                  {active && <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-yellow" />}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCartOpen(true)}
              className="relative h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-white transition"
              aria-label="Panier"
            >
              <ShoppingCart className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange text-white text-[10px] font-bold rounded-full h-5 min-w-5 px-1 grid place-items-center">
                  {count}
                </span>
              )}
            </button>
            <Link
              to="/menu"
              className="hidden sm:inline-flex items-center font-display font-bold text-sm bg-yellow text-black px-5 py-2.5 rounded-full hover:brightness-110 transition"
            >
              Commander
            </Link>
            <button
              className="lg:hidden h-10 w-10 grid place-items-center rounded-full bg-white/10 text-white"
              onClick={() => setOpen(true)}
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col">
          <div className="flex items-center justify-between p-5">
            <span className="font-display text-2xl">
              <span className="text-yellow">LOVE</span> <span className="text-white">AFRICA</span>
            </span>
            <button className="h-10 w-10 grid place-items-center text-yellow" onClick={() => setOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center items-start gap-2 px-8">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="font-display text-5xl text-white hover:text-yellow transition"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/reserve"
              className="mt-6 inline-flex items-center font-display font-bold bg-yellow text-black px-7 py-3 rounded-full"
            >
              Réserver
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
