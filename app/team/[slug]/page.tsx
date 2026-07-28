import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "../../components/PageHero";
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
      <PageHero
        eyebrow={member.role}
        heading={member.name}
        image={member.image ?? "/images/about/naples-5th.jpg"}
        alt={member.name}
      />

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
