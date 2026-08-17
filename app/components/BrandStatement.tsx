import Link from "next/link";
import Reveal from "./Reveal";
import { TRANSACTIONS } from "../lib/transactions";

const FEATURED = TRANSACTIONS.slice(0, 3);

export default function BrandStatement() {
  return (
    <section className="brand">
      <div className="brand__grid">
        <Reveal className="brand__intro">
          <p className="brand__eyebrow">Client Success</p>
          <h2 className="brand__heading">
            Results that speak for <em>themselves</em>
          </h2>
        </Reveal>

        <Reveal className="brand__body" delay={120}>
          <p className="brand__text">
            Every relationship starts with listening — to what a family
            needs today and where they&apos;re headed next. That approach
            has guided buyers and sellers through some of the most
            competitive stretches of the Southwest Florida market, and
            it&apos;s why so many return to work with us again.
          </p>
          <Link href="/about" className="btn btn--fill-navy brand__cta">
            Learn more
          </Link>
        </Reveal>
      </div>

      <div className="brand__transactions">
        <div className="transactions__grid">
          {FEATURED.map((property, i) => (
            <Reveal
              key={property.address}
              className="property-card"
              delay={i * 100}
            >
              <div className="property-card__image" aria-hidden>
                <span className="property-card__status">Sold</span>
              </div>
              <div className="property-card__body">
                <p className="property-card__price">{property.price}</p>
                <p className="property-card__address">{property.address}</p>
                <p className="property-card__city">{property.city}</p>
                <p className="property-card__meta">
                  {property.beds} bd &middot; {property.baths} ba &middot;{" "}
                  {property.sqft} sqft
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="brand__transactions-cta-wrap" delay={FEATURED.length * 100}>
          <Link href="/transactions" className="btn btn--fill-navy brand__transactions-cta">
            View all transactions
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
