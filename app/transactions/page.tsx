import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import CallToAction from "../components/CallToAction";

export const metadata: Metadata = {
  title: "Transactions | The Macchi Group",
  description:
    "A sample of past sales across Naples, Bonita Springs, and Fort Myers.",
};

// Placeholder listings for wireframing — swap in real closed transactions before launch.
const TRANSACTIONS = [
  {
    address: "412 Seagrove Ln",
    city: "Naples, FL",
    price: "$3,250,000",
    beds: 4,
    baths: 4.5,
    sqft: "4,820",
  },
  {
    address: "88 Harbourview Dr",
    city: "Bonita Springs, FL",
    price: "$1,890,000",
    beds: 3,
    baths: 3,
    sqft: "3,110",
  },
  {
    address: "215 Palmetto Course Rd",
    city: "Fort Myers, FL",
    price: "$2,475,000",
    beds: 4,
    baths: 4,
    sqft: "3,960",
  },
  {
    address: "1601 Gulfshore Way",
    city: "Naples, FL",
    price: "$5,600,000",
    beds: 5,
    baths: 5.5,
    sqft: "6,340",
  },
  {
    address: "74 Estuary Point",
    city: "Bonita Springs, FL",
    price: "$1,325,000",
    beds: 3,
    baths: 2.5,
    sqft: "2,640",
  },
  {
    address: "930 Sanderling Cove",
    city: "Fort Myers Beach, FL",
    price: "$2,150,000",
    beds: 3,
    baths: 3,
    sqft: "2,980",
  },
];

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
