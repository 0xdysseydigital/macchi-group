"use client";

import { useEffect, useState } from "react";

const HOLD_MS = 1100;
const FADE_MS = 500;

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.add("is-loaded");
      setVisible(false);
      return;
    }

    const fadeTimer = setTimeout(() => setFading(true), HOLD_MS);
    const doneTimer = setTimeout(() => {
      root.classList.add("is-loaded");
      setVisible(false);
    }, HOLD_MS + FADE_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`loader${fading ? " loader--fade" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="loader__ring" aria-hidden>
        <span className="loader__mark">M</span>
      </div>
    </div>
  );
}
