import Link from "next/link";
import Stats from "./Stats";

const TEAM = [
  {
    name: "Tyler Macchi",
    bio: "Born and raised in Southwest Florida, Tyler brings unmatched local knowledge to every conversation about the coast. He guides clients through Naples, Bonita Springs, and Fort Myers with the perspective only a native can offer.",
    href: "/team/tyler-macchi",
  },
  {
    name: "Brandon Shirk",
    bio: "Brandon's years inside some of the country's most exclusive golf clubs shaped a rare fluency in luxury lifestyles and private club living. He brings that insight to every client seeking more than just a home.",
    href: "/team/brandon-shirk",
  },
];

export default function About() {
  return (
    <section className="about">
      <div className="about__inner">
        <div className="about__intro">
          <p className="eyebrow">Boutique &middot; Southwest Florida</p>
          <h2 className="about__heading">
            More than a <em>transaction</em>
          </h2>
          <p className="about__lead">
            Southwest Florida&apos;s coast is more than our market — it&apos;s
            home. We&apos;ve watched Naples, Bonita Springs, and Fort Myers
            grow from the inside, and that closeness shows up in every
            recommendation we make, from the right block to the right moment
            to make an offer.
          </p>
          <p className="about__lead">
            The Macchi Group was built on a simple belief: real estate is a
            long-term partnership, not a single transaction. Clients get
            strategic guidance grounded in real market fluency, a discreet
            and highly personalized experience, and a level of commitment
            that doesn&apos;t end at closing.
          </p>

          <Link href="/about" className="btn btn--secondary about__cta">
            About the group
          </Link>

          <Stats />
        </div>

        <div className="about__team">
          {TEAM.map((member) => (
            <article className="team-card" key={member.name}>
              <div className="team-card__image" aria-hidden />
              <div className="team-card__body">
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__bio">{member.bio}</p>
                <Link href={member.href} className="team-card__link">
                  Full bio
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path d="M3 8H13" stroke="currentColor" strokeWidth="1.2" />
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
  );
}
