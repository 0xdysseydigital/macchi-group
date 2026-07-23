"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  key: string;
  target: number;
  format: (value: number) => string;
  label: string;
};

const STATS: Stat[] = [
  {
    key: "transactions",
    target: 165,
    format: (n) => `${Math.round(n).toLocaleString()}+`,
    label: "Transactions closed",
  },
  {
    key: "volume",
    target: 203750000,
    format: (n) => `$${Math.round(n).toLocaleString()}`,
    label: "In sales volume",
  },
  {
    key: "ranking",
    target: 1,
    format: () => "Top 1%",
    label: "Coldwell Banker ranking",
  },
];

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let raf = 0;
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const value = useCountUp(stat.target, active);
  return (
    <div className="stats__item">
      <p className="stats__figure font-display">{stat.format(value)}</p>
      <p className="stats__label">{stat.label}</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="stats" ref={ref}>
      {STATS.map((stat) => (
        <StatItem key={stat.key} stat={stat} active={active} />
      ))}
    </div>
  );
}
