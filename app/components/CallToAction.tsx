"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RevealParagraph from "./RevealParagraph";

const INITIAL_INSET = 96;
const TEXT_THRESHOLD = 0.3;

export default function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [textActive, setTextActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTextActive(true);
      return;
    }

    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;

      const progress = Math.min(Math.max(-rect.top / total, 0), 1);
      const inset = INITIAL_INSET * (1 - progress);
      frame.style.top = `${inset}px`;
      frame.style.bottom = `${inset}px`;

      const shouldShowText = progress > TEXT_THRESHOLD;
      setTextActive((prev) => (prev === shouldShowText ? prev : shouldShowText));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="cta" ref={sectionRef}>
      <div className="cta__stage">
        <div className="cta__frame" ref={frameRef}>
          <div className="cta__image">
            <Image
              src="/images/cta/beachfront.jpg"
              alt="Beachfront homes along the Southwest Florida coast at dusk"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="cta__scrim" aria-hidden />
        </div>

        <div className="cta__content">
          <RevealParagraph
            as="h2"
            className="cta__heading"
            text="Let's find your home on the coast"
            active={textActive}
          />
          <RevealParagraph
            className="cta__text"
            text="Tell us what you're looking for and a member of the Macchi Group will be in touch."
            active={textActive}
          />
          <div className={`reveal-block${textActive ? " is-active" : ""}`}>
            <Link href="/contact" className="btn btn--primary cta__button">
              Start the conversation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
