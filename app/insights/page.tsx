import type { Metadata } from "next";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Insights | The Macchi Group",
  description:
    "Market reports, neighborhood guides, and news from The Macchi Group.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Market Reports & News"
        heading="Insights"
        image="/images/cta/beachfront.jpg"
        alt="Beachfront homes along the Southwest Florida coast at dusk"
      />

      <section className="placeholder-section">
        <p className="placeholder-section__text">
          Insights are coming soon.
        </p>
      </section>
    </>
  );
}
