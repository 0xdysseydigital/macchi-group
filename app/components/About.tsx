import Link from "next/link";

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
            The Macchi Group is a boutique real estate team built on
            relationships and results, known for a highly personalized,
            white-glove experience from first conversation to closing and
            beyond.
          </p>
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
