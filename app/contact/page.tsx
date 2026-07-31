import type { Metadata } from "next";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Contact | The Macchi Group",
  description: "Get in touch with The Macchi Group.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        heading="Let's talk"
        image="/images/about/naples-5th.jpg"
        alt="Fifth Avenue South, Naples, Florida"
      />

      <section className="placeholder-section">
        <p className="placeholder-section__text">
          The contact form is coming soon.
        </p>
      </section>
    </>
  );
}
