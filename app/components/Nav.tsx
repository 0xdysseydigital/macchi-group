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

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Hero and PageHero are both exactly 100svh, so the viewport height
    // itself is a reliable "past the hero" threshold on every page —
    // no need to measure a specific element (which went stale across
    // client-side navigations since Nav lives in the root layout and
    // never remounts).
    let ticking = false;

    const update = () => {
      ticking = false;
      setVisible(window.scrollY > window.innerHeight * 0.9);
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
