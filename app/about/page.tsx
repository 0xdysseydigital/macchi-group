import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import RevealParagraph from "../components/RevealParagraph";
import Reveal from "../components/Reveal";
import Stats from "../components/Stats";
import CallToAction from "../components/CallToAction";
import { TEAM } from "../lib/team";

export const metadata: Metadata = {
  title: "About | The Macchi Group",
  description:
    "A boutique Southwest Florida real estate team built on relationships and results — Naples, Bonita Springs, Fort Myers.",
};

const PILLARS = [
  {
    title: "Strategic guidance",
    text: "Clear, considered advice at every step — from the first walkthrough to closing day.",
  },
  {
    title: "An exceptional experience",
    text: "Personalized, discreet service, end to end, shaped around how each client actually lives.",
  },
  {
    title: "An unwavering commitment",
    text: "Fully invested in every client's success, long after the transaction closes.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About The Macchi Group"
        heading="More than a transaction"
        lead="A boutique Southwest Florida real estate team built on relationships and results."
      />

      <section className="prose-section">
        <div className="prose-section__inner">
          <RevealParagraph
            className="prose-section__text"
            text="The Macchi Group was founded on a simple belief: real estate is a long-term partnership, not a single transaction. We work with a deliberately small number of clients at a time, so every search, every negotiation, and every closing gets the same level of attention."
          />
          <RevealParagraph
            className="prose-section__text"
            text="That approach has carried us across Naples, Bonita Springs, and Fort Myers — through waterfront estates, private club communities, and first coastal homes alike. Whatever the goal, it starts with listening."
          />
        </div>
      </section>

      <section className="pillars">
        <div className="pillars__grid">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} className="pillar" delay={i * 120}>
              <span className="pillar__index">0{i + 1}</span>
              <h3 className="pillar__title">{pillar.title}</h3>
              <p className="pillar__text">{pillar.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="about-page__stats">
        <Stats />
      </section>

      <section className="team-section">
        <div className="team-section__inner">
          <p className="eyebrow">Meet the team</p>
          <div className="team-grid">
            {TEAM.map((member) => (
              <article className="team-card" key={member.slug}>
                <div className="team-card__image">
                  {member.image && (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 560px) 100vw, 320px"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <div className="team-card__body">
                  <h3 className="team-card__name">{member.name}</h3>
                  <p className="team-card__role">{member.role}</p>
                  <p className="team-card__bio">{member.bio}</p>
                  <Link
                    href={`/team/${member.slug}`}
                    className="team-card__link"
                  >
                    Full bio
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <path
                        d="M3 8H13"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M9 4L13 8L9 12"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
