import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import CallToAction from "../components/CallToAction";

export const metadata: Metadata = {
  title: "Testimonials | The Macchi Group",
  description:
    "What clients say about working with The Macchi Group across Naples, Bonita Springs, and Fort Myers.",
};

// Placeholder quotes for wireframing — swap in real client testimonials before launch.
const TESTIMONIALS = [
  {
    quote:
      "Tyler understood exactly what we wanted before we could fully put it into words. We closed on a home we didn't even know we were looking for.",
    name: "Sarah M.",
    location: "Naples, FL",
  },
  {
    quote:
      "Selling our waterfront home felt like it could be overwhelming. Brandon made every step feel considered, never rushed.",
    name: "The Whitfield Family",
    location: "Bonita Springs, FL",
  },
  {
    quote:
      "What stood out was how available the team stayed after closing. Questions still get answered months later.",
    name: "James R.",
    location: "Fort Myers, FL",
  },
  {
    quote:
      "We interviewed three agents before choosing The Macchi Group. The difference was obvious — they listened first.",
    name: "Elena K.",
    location: "Naples, FL",
  },
  {
    quote:
      "Buying from out of state is stressful. Tyler and Luke coordinated everything so it never felt that way.",
    name: "David & Priya S.",
    location: "Fort Myers Beach, FL",
  },
  {
    quote:
      "Brandon's knowledge of the private club communities saved us months of searching in the wrong places.",
    name: "Michael T.",
    location: "Bonita Springs, FL",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Client Success"
        heading="What clients say"
        lead="A few words from buyers and sellers we've had the privilege to work with across Southwest Florida."
      />

      <section className="testimonials">
        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              className="testimonial"
              delay={(i % 3) * 100}
            >
              <p className="testimonial__mark" aria-hidden>
                &ldquo;
              </p>
              <p className="testimonial__quote">{t.quote}</p>
              <p className="testimonial__name">{t.name}</p>
              <p className="testimonial__location">{t.location}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CallToAction />
    </>
  );
}
