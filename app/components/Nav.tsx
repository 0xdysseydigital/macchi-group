"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/testimonials", label: "Testimonials" },
];

const FALLBACK_THRESHOLD = 120;

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      setSolid(window.scrollY > threshold);
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
    <header
      className={`nav${solid ? " nav--solid" : ""}${menuOpen ? " nav--open" : ""}`}
    >
      <div className="nav__inner">
        <Link href="/" className="nav__wordmark font-display">
          The Macchi Group
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="nav__link">
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`btn nav__cta${solid ? " btn--fill-navy" : " btn--white"}`}
          >
            Start a conversation
          </Link>
        </nav>

        <button
          type="button"
          className="nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className="nav__mobile">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn btn--primary nav__mobile-cta"
            onClick={() => setMenuOpen(false)}
          >
            Start a conversation
          </Link>
        </div>
      )}
    </header>
  );
}
