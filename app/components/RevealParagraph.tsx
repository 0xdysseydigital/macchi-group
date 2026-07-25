"use client";

import { Fragment, useEffect, useRef, useState } from "react";

export default function RevealParagraph({
  text,
  className = "",
  delayStep = 0.025,
  startDelay = 150,
  as = "p",
  emphasize = [],
  active: activeProp,
}: {
  text: string;
  className?: string;
  delayStep?: number;
  startDelay?: number;
  as?: "p" | "h2";
  emphasize?: string[];
  /** When provided, the parent drives activation instead of the built-in viewport observer. */
  active?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);
  const [activeState, setActiveState] = useState(false);
  const controlled = activeProp !== undefined;
  const active = controlled ? activeProp : activeState;

  useEffect(() => {
    if (controlled) return;

    const el = ref.current;
    if (!el) return;

    let timeout: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeout = setTimeout(() => setActiveState(true), startDelay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [startDelay, controlled]);

  const words = text.split(" ");
  const emphasizeSet = new Set(emphasize.map((w) => w.toLowerCase()));

  const wordNodes = words.map((word, i) => {
    const bare = word.replace(/[.,]/g, "").toLowerCase();
    const inner = emphasizeSet.has(bare) ? <em>{word}</em> : word;
    return (
      <Fragment key={i}>
        <span className="reveal-word">
          <span
            className={`reveal-word__inner${active ? " is-active" : ""}`}
            style={{ transitionDelay: `${i * delayStep}s` }}
          >
            {inner}
          </span>
        </span>
        {i < words.length - 1 ? " " : ""}
      </Fragment>
    );
  });

  if (as === "h2") {
    return (
      <h2 className={className} ref={ref}>
        {wordNodes}
      </h2>
    );
  }

  return (
    <p className={className} ref={ref}>
      {wordNodes}
    </p>
  );
}
