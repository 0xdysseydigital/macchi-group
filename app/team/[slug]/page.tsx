import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import RevealParagraph from "../../components/RevealParagraph";
import CallToAction from "../../components/CallToAction";
import { TEAM, getTeamMember } from "../../lib/team";

export function generateStaticParams() {
  return TEAM.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return {};

  return {
    title: `${member.name} | The Macchi Group`,
    description: member.bio,
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  return (
    <>
      <header className="profile-hero" data-nav-theme="dark">
        <div className="profile-hero__image">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority
            />
          ) : (
            <div className="profile-hero__placeholder" aria-hidden />
          )}
          <div className="profile-hero__scrim" aria-hidden />
        </div>
        <div className="profile-hero__content">
          <p className="profile-hero__eyebrow">{member.role}</p>
          <h1 className="profile-hero__name">{member.name}</h1>
        </div>
      </header>

      <section className="prose-section">
        <div className="prose-section__inner">
          {member.fullBio.map((paragraph, i) => (
            <RevealParagraph
              key={i}
              className="prose-section__text"
              text={paragraph}
            />
          ))}

          <div className="profile-bio__contact">
            <a href={`mailto:${member.email}`} className="footer__link">
              {member.email}
            </a>
            <a
              href={`tel:${member.phone.replace(/[^\d+]/g, "")}`}
              className="footer__link"
            >
              {member.phone}
            </a>
          </div>

          <Link href="/about" className="btn btn--fill-navy profile-bio__back">
            Back to the team
          </Link>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
