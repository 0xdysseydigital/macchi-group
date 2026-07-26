import Link from "next/link";
import Reveal from "./Reveal";

export default function BrandStatement() {
  return (
    <section className="brand">
      <div className="brand__grid">
        <Reveal className="brand__intro">
          <p className="brand__eyebrow">Client Success</p>
          <h2 className="brand__heading">
            Results that speak for <em>themselves</em>
          </h2>
        </Reveal>

        <Reveal className="brand__body" delay={120}>
          <p className="brand__text">
            Every relationship starts with listening — to what a family
            needs today and where they&apos;re headed next. That approach
            has guided buyers and sellers through some of the most
            competitive stretches of the Southwest Florida market, and
            it&apos;s why so many return to work with us again.
          </p>
          <Link href="/about" className="btn btn--fill-navy brand__cta">
            Learn more
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
