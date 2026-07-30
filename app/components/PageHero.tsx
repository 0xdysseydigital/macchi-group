"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const PARALLAX_SPEED = 0.5;

export default function PageHero({
  eyebrow,
  heading,
  image,
  alt,
}: {
  eyebrow?: string;
  heading: string;
  image: string;
  alt: string;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const hero = heroRef.current;
    const image = imageRef.current;
    if (!hero || !image) return;

    let ticking = false;

    const applyOffset = () => {
      ticking = false;
      const rect = hero.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

      const scrolled = Math.min(Math.max(0, -rect.top), rect.height);
      image.style.transform = `translate3d(0, ${scrolled * PARALLAX_SPEED}px, 0)`;
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
    <header className="page-hero" ref={heroRef}>
      <div className="page-hero__image" ref={imageRef}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      <div className="hero__scrim-top" aria-hidden />
      <div className="hero__scrim-bottom" aria-hidden />

      <div className="page-hero__content">
        {eyebrow && (
          <p className="page-hero__eyebrow">
            <span className="rv page-hero__rv">
              <span>{eyebrow}</span>
            </span>
          </p>
        )}
        <h1 className="page-hero__heading">
          <span className="rv page-hero__rv">
            <span>{heading}</span>
          </span>
        </h1>
      </div>

      <span className="hero__scroll">Scroll</span>
    </header>
  );
}
