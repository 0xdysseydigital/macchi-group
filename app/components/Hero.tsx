import { ShaderBackground } from "@/components/ui/oceanic-currents";

export default function Hero() {
  return (
    <header className="hero">
      <ShaderBackground className="hero__shader" />

      <div className="hero__scrim-top" aria-hidden />
      <div className="hero__scrim-bottom" aria-hidden />

      <div className="hero__content">
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
