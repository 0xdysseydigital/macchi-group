"use client";

import { Fragment, useEffect, useRef, useState } from "react";

export default function RevealParagraph({
  text,
  className = "",
  delayStep = 0.025,
}: {
  text: string;
  className?: string;
  delayStep?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
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
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <p className={className} ref={ref}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="reveal-word">
            <span
              className={`reveal-word__inner${active ? " is-active" : ""}`}
              style={{ transitionDelay: `${i * delayStep}s` }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </p>
  );
}
