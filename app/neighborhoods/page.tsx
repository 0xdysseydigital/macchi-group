import type { Metadata } from "next";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Neighborhoods | The Macchi Group",
  description:
    "A guide to Naples, Bonita Springs, and Fort Myers neighborhoods.",
};

export default function NeighborhoodsPage() {
  return (
    <>
      <PageHero
        eyebrow="Where To Live"
        heading="Neighborhoods"
        image="/images/about/naples-5th.jpg"
        alt="Fifth Avenue South, Naples, Florida"
      />

      <section className="placeholder-section">
        <p className="placeholder-section__text">
          Neighborhood guides are coming soon.
        </p>
      </section>
    </>
  );
}
