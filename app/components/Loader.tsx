"use client";

import { useEffect, useState } from "react";

const HOLD_MS = 1400;
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
        <svg className="loader__ring-svg" viewBox="0 0 88 88">
          <circle className="loader__ring-track" cx="44" cy="44" r="40" />
          <circle className="loader__ring-fill" cx="44" cy="44" r="40" />
        </svg>
        <span className="loader__mark">M</span>
      </div>
    </div>
  );
}
