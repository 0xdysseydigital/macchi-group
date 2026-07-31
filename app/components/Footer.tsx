import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/listings", label: "Listings" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/transactions", label: "Transactions" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <Link href="/" className="footer__wordmark font-display">
            The Macchi Group
          </Link>
          <p className="footer__tagline">
            Boutique real estate for Naples, Bonita Springs &amp; Fort Myers.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="footer__link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="footer__contact">
          <a href="tel:+12398250700" className="footer__link">
            (239) 825-0700
          </a>
          <p className="footer__address">550 5th Ave S, Naples, FL 34102</p>
          <div className="footer__social">
            <a href="#" className="footer__link">
              Instagram
            </a>
            <a href="#" className="footer__link">
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="footer__legal">
        <p>
          &copy; {new Date().getFullYear()} The Macchi Group. Each
          Coldwell Banker&reg; office is independently owned and operated.
          Equal Housing Opportunity.
        </p>
      </div>
    </footer>
  );
}
