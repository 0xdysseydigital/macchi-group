"use client";

import { useEffect, useRef } from "react";
// Two shader-based hero backgrounds were explored and are on hold, not
// deleted — swap the <video> block below for either to bring one back:
//   - Ripple-distorted video/image with cinematic grading + hover color
//     reveal: components/ui/water-ripple-image.tsx
//     (import { WaterRippleImage } from "@/components/ui/water-ripple-image";
//      then render <WaterRippleImage className="hero__shader" />)
//   - Animated ocean-current shader: components/ui/oceanic-currents.tsx
//     (import { ShaderBackground } from "@/components/ui/oceanic-currents";
//      then render <ShaderBackground className="hero__shader" />)

const PARALLAX_SPEED = 0.5;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const hero = heroRef.current;
    const video = videoRef.current;
    if (!hero || !video) return;

    let ticking = false;

    const applyOffset = () => {
      ticking = false;
      const rect = hero.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

      const scrolled = Math.min(Math.max(0, -rect.top), rect.height);
      video.style.transform = `translate3d(0, ${scrolled * PARALLAX_SPEED}px, 0)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyOffset);
      }
    };

    applyOffset();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="hero" ref={heroRef}>
      <video
        className="hero__video"
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/media/hero-poster.jpg"
      >
        <source src="/media/hero-coastline.mp4" type="video/mp4" />
      </video>

      <div className="hero__scrim-top" aria-hidden />
      <div className="hero__scrim-bottom" aria-hidden />

      <div className="hero__content">
        <h1 className="wordmark">
          <span className="rv">
            <span>The</span>
          </span>
          <span className="rv">
            <span>Macchi</span>
          </span>
          <span className="rv">
            <span>Group</span>
          </span>
        </h1>
      </div>

      <span className="hero__scroll">Scroll</span>
    </header>
  );
}
