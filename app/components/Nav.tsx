"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

const FALLBACK_THRESHOLD = 120;

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const darkBand = document.querySelector<HTMLElement>(
      "[data-nav-theme='dark']",
    );
    const threshold = darkBand
      ? Math.max(darkBand.offsetHeight - 96, 0)
      : FALLBACK_THRESHOLD;

    let ticking = false;

    const update = () => {
      ticking = false;
      setVisible(window.scrollY > threshold);
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

  useEffect(() => {
    if (!open) return;

    document.documentElement.classList.add("sidebar-open");
    return () => document.documentElement.classList.remove("sidebar-open");
  }, [open]);

  return (
    <>
      <div className={`menu-bar${visible ? " menu-bar--visible" : ""}`}>
        <button
          type="button"
          className="btn btn--fill-navy menu-bar__toggle"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      <div
        className={`sidebar${open ? " sidebar--open" : ""}`}
        aria-hidden={!open}
      >
        <div
          className="sidebar__backdrop"
          onClick={() => setOpen(false)}
          aria-hidden
        />
        <div className="sidebar__panel" role="dialog" aria-modal="true">
          <button
            type="button"
            className="btn btn--fill-navy sidebar__close"
            onClick={() => setOpen(false)}
          >
            Close
          </button>

          <nav className="sidebar__links" aria-label="Primary">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="sidebar__link"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
