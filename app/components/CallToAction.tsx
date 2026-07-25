"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

const MAX_SCALE = 1.25;

export default function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;

      const progress = Math.min(Math.max(-rect.top / total, 0), 1);
      const scale = 1 + progress * (MAX_SCALE - 1);
      image.style.transform = `scale(${scale})`;
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
        <div className="cta__image" ref={imageRef}>
          <Image
            src="/images/cta/beachfront.jpg"
            alt="Beachfront homes along the Southwest Florida coast at dusk"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="cta__scrim" aria-hidden />

        <Reveal className="cta__content">
          <h2 className="cta__heading">
            Let&apos;s find your place on the coast
          </h2>
          <p className="cta__text">
            Tell us what you&apos;re looking for and a member of the Macchi
            Group will be in touch.
          </p>
          <Link href="/contact" className="btn btn--gold cta__button">
            Start the conversation
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
