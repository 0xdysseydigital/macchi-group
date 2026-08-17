import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import CallToAction from "../components/CallToAction";
import { TRANSACTIONS } from "../lib/transactions";

export const metadata: Metadata = {
  title: "Transactions | The Macchi Group",
  description:
    "A sample of past sales across Naples, Bonita Springs, and Fort Myers.",
};

export default function TransactionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Past Transactions"
        heading="A track record on the coast"
        image="/images/cta/beachfront.jpg"
        alt="Beachfront homes along the Southwest Florida coast at dusk"
      />

      <section className="transactions">
        <div className="transactions__grid">
          {TRANSACTIONS.map((property, i) => (
            <Reveal
              key={property.address}
              className="property-card"
              delay={(i % 3) * 100}
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
      </section>

      <CallToAction />
    </>
  );
}
