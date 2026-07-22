export default function Hero() {
  return (
    <header className="hero">
      <video
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
        poster="/media/hero-poster.jpg"
      >
        <source src="/media/hero-coastline.mp4" type="video/mp4" />
      </video>

      <div className="hero__scrim-top" aria-hidden />
      <div className="hero__scrim-bottom" aria-hidden />

      <div className="hero__content">
        <p className="hero__coord">
          26.142&deg; N &middot; 81.795&deg; W &mdash; Southwest Florida
        </p>
        <h1 className="wordmark">
          <span className="rv">
            <span>The</span>
          </span>
          <span className="rv">
            <span>Macchi</span>
          </span>
          <span className="rv">
            <span>Group</span>
          </span>
        </h1>
      </div>

      <span className="hero__scroll">Scroll</span>
    </header>
  );
}
