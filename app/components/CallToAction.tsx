"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RevealParagraph from "./RevealParagraph";

const INITIAL_INSET = 96;
const INITIAL_IMAGE_SCALE = 1.15;
const TEXT_THRESHOLD = 0.3;

export default function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [textActive, setTextActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTextActive(true);
      return;
    }

    const section = sectionRef.current;
    const frame = frameRef.current;
    const image = imageRef.current;
    if (!section || !frame || !image) return;

    const initialSideInset = parseFloat(getComputedStyle(frame).left) || 0;

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

      const sideInset = initialSideInset * (1 - progress);
      frame.style.left = `${sideInset}px`;
      frame.style.right = `${sideInset}px`;

      const scale = INITIAL_IMAGE_SCALE - progress * (INITIAL_IMAGE_SCALE - 1);
      image.style.transform = `scale(${scale})`;

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
          <div className="cta__image" ref={imageRef}>
            <Image
              src="/images/cta/beachfront.jpg"
              alt="Beachfront homes along the Southwest Florida coast at dusk"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            className={`cta__scrim${textActive ? " is-active" : ""}`}
            aria-hidden
          />
        </div>

        <div className="cta__content">
          <RevealParagraph
            as="h2"
            className="cta__heading"
            text="Let's make your move"
            emphasize={["move"]}
            active={textActive}
          />
          <div className={`reveal-block${textActive ? " is-active" : ""}`}>
            <Link href="/contact" className="btn btn--white cta__button">
              Start the conversation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
