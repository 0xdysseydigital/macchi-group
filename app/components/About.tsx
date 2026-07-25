import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import RevealParagraph from "./RevealParagraph";
import Stats from "./Stats";

const TEAM = [
  {
    name: "Tyler Macchi",
    role: "Team Lead",
    bio: "Born and raised in Southwest Florida, Tyler brings unmatched local knowledge to every conversation about the coast. He guides clients through Naples, Bonita Springs, and Fort Myers with the perspective only a native can offer.",
    href: "/team/tyler-macchi",
    image: "/images/team/tyler-macchi.jpg",
  },
  {
    name: "Brandon Shirk",
    role: "Sales Executive",
    bio: "Brandon's years inside some of the country's most exclusive golf clubs shaped a rare fluency in luxury lifestyles and private club living. He brings that insight to every client seeking more than just a home.",
    href: "/team/brandon-shirk",
    image: "/images/team/brandon-shirk.jpg",
  },
  {
    name: "Luke Groff",
    role: "Operations Manager",
    bio: "Luke's background is in a rapidly growing restaurant group in Pennsylvania, where digital marketing skills turned into hands-on experience launching and operating new restaurant concepts from the ground up. That same builder's instinct now shapes how The Macchi Group tells its story and reaches new clients.",
    href: "/team/luke-groff",
    image: null,
  },
];

export default function About() {
  return (
    <section className="about">
      <div className="about__top">
        <div className="about__intro">
          <RevealParagraph
            as="h2"
            className="about__heading"
            text="Southwest Florida, made personal"
            emphasize={["personal"]}
          />
          <RevealParagraph
            className="about__lead"
            text="Southwest Florida's coast is more than our market — it's home. We've watched Naples, Bonita Springs, and Fort Myers grow from the inside, and that closeness shows up in every recommendation we make, from the right block to the right moment to make an offer."
          />
          <RevealParagraph
            className="about__lead"
            text="The Macchi Group was built on a simple belief: real estate is a long-term partnership, not a single transaction. Clients get strategic guidance grounded in real market fluency, a discreet and highly personalized experience, and a level of commitment that doesn't end at closing."
          />

          <Link href="/about" className="btn btn--secondary about__cta">
            About the group
          </Link>

          <Stats />
        </div>

        <div className="about__team">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={500 + i * 160}>
              <article className="team-card">
                <div className="team-card__image">
                  {member.image && (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 560px) 100vw, 360px"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <div className="team-card__body">
                  <h3 className="team-card__name">{member.name}</h3>
                  <p className="team-card__role">{member.role}</p>
                  <p className="team-card__bio">{member.bio}</p>
                  <Link href={member.href} className="team-card__link">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
