export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <p className="font-body text-[11px] font-normal uppercase tracking-[0.24em] text-[var(--color-muted)]">
        26.142&deg; N &middot; 81.795&deg; W &mdash; Southwest Florida
      </p>
      <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] uppercase leading-[0.95] tracking-[0.005em] text-[var(--color-ink)]">
        The
        <br />
        Macchi
        <br />
        Group
      </h1>
      <p className="max-w-md font-body text-[15px] leading-[1.8] text-[var(--color-soft)]">
        Boutique Southwest Florida real estate &mdash; Naples, Bonita Springs,
        Fort Myers. Site in progress.
      </p>
    </main>
  );
}
