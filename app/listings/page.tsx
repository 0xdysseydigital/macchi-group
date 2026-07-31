import type { Metadata } from "next";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Listings | The Macchi Group",
  description: "Active listings across Naples, Bonita Springs, and Fort Myers.",
};

export default function ListingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Active Inventory"
        heading="Listings"
        image="/images/cta/beachfront.jpg"
        alt="Beachfront homes along the Southwest Florida coast at dusk"
      />

      <section className="placeholder-section">
        <p className="placeholder-section__text">
          Listings are coming soon.
        </p>
      </section>
    </>
  );
}
