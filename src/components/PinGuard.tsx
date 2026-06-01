import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Lock, Delete } from "lucide-react";

const PIN = "9999";

export function PinGuard({ scope, children }: { scope: string; children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(`pin_${scope}`) === "1") {
      setUnlocked(true);
    }
  }, [scope]);

  const submit = (val: string) => {
    if (val === PIN) {
      sessionStorage.setItem(`pin_${scope}`, "1");
      setUnlocked(true);
    } else {
      setErr(true);
      setTimeout(() => {
        setErr(false);
        setInput("");
      }, 600);
    }
  };

  const press = (d: string) => {
    if (input.length >= 4) return;
    const v = input + d;
    setInput(v);
    if (v.length === 4) setTimeout(() => submit(v), 150);
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen bg-black text-white grid place-items-center px-5">
      <motion.div
        animate={err ? { x: [-12, 12, -8, 8, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xs text-center"
      >
        <div className="font-display text-3xl mb-1">
          <span className="text-yellow">LOVE</span> AFRICA
        </div>
        <div className="text-xs uppercase tracking-widest text-yellow/70 mb-8 flex items-center justify-center gap-2">
          <Lock className="w-3 h-3" /> {scope}
        </div>
        <div className="flex justify-center gap-3 mb-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-4 w-4 rounded-full border-2 ${
                input.length > i ? "bg-yellow border-yellow" : "border-white/30"
              } ${err ? "!border-red-accent !bg-red-accent" : ""}`}
            />
          ))}
        </div>
        <div className={`text-xs h-5 ${err ? "text-red-accent" : "text-transparent"}`}>Code incorrect</div>
        <div className="grid grid-cols-3 gap-3 mt-6">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n) => (
            <button
              key={n}
              onClick={() => press(n)}
              className="h-16 rounded-2xl bg-white/5 hover:bg-yellow hover:text-black font-display text-2xl transition"
            >
              {n}
            </button>
          ))}
          <div />
          <button onClick={() => press("0")} className="h-16 rounded-2xl bg-white/5 hover:bg-yellow hover:text-black font-display text-2xl transition">0</button>
          <button onClick={() => setInput((s) => s.slice(0, -1))} className="h-16 rounded-2xl bg-white/5 hover:bg-white/10 grid place-items-center transition">
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
