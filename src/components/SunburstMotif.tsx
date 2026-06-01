type Props = { className?: string; color?: string; opacity?: number };

export function SunburstMotif({ className = "", color = "#F7E400", opacity = 0.15 }: Props) {
  const rays = Array.from({ length: 36 });
  return (
    <svg
      viewBox="-100 -100 200 200"
      className={className}
      style={{ opacity }}
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {rays.map((_, i) => {
        const angle = (i / rays.length) * 360;
        return (
          <line
            key={i}
            x1="0"
            y1="0"
            x2="0"
            y2="-95"
            stroke={color}
            strokeWidth="0.5"
            transform={`rotate(${angle})`}
            strokeLinecap="round"
          />
        );
      })}
      {[20, 40, 60, 80].map((r) => (
        <circle key={r} cx="0" cy="0" r={r} fill="none" stroke={color} strokeWidth="0.3" opacity="0.6" />
      ))}
    </svg>
  );
}

export function WaveLines({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 80" className={className} aria-hidden preserveAspectRatio="none">
      <path d="M0 40 Q150 0 300 40 T600 40 T900 40 T1200 40" stroke="#F7E400" strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M0 50 Q150 10 300 50 T600 50 T900 50 T1200 50" stroke="#FF8A00" strokeWidth="2" fill="none" opacity="0.3" />
    </svg>
  );
}
