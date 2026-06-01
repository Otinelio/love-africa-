import { useEffect } from "react";
import { motion } from "framer-motion";
import { SunburstMotif } from "@/components/SunburstMotif";

type Props = {
  tableNumber?: string;
  durationMs?: number;
  onComplete: () => void;
};

export function SplashScreen({ tableNumber, durationMs = 2600, onComplete }: Props) {
  useEffect(() => {
    const t = window.setTimeout(onComplete, durationMs);
    return () => window.clearTimeout(t);
  }, [durationMs, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white grid place-items-center overflow-hidden">
      <SunburstMotif className="absolute w-[min(120vw,900px)] h-[min(120vw,900px)] animate-spin-slow" color="#F7E400" opacity={0.2} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(247,228,0,0.35), rgba(17,17,17,0.9) 55%, #111 100%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-mono-accent text-xs uppercase tracking-[0.35em] text-yellow/80"
        >
          Bienvenue
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="font-display text-6xl sm:text-7xl leading-none mt-3"
        >
          <span className="text-yellow text-shadow-glow">LOVE</span>
          <span className="block text-white">AFRICA</span>
        </motion.h1>
        {tableNumber && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-4 font-display text-2xl text-yellow"
          >
            Table {tableNumber}
          </motion.p>
        )}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-sm text-white/60"
        >
          Chargement du menu…
        </motion.p>
        <motion.div
          className="mx-auto mt-8 h-1 w-32 rounded-full bg-white/10 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-yellow"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: durationMs / 1000, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
