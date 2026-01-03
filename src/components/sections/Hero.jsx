import HeroParticleHacker from "../background/HeroParticleHacker";
import HeroThreeBackground from "../background/HeroThreeBackground";
import Events from "./Events";

import silentBreachImg from "../../assets/images/silent_breach.png";
import hackerzpresents from "../../assets/images/hackerz-represents.png";

import "../../styles/hero.css";

export default function Hero() {
  return (
    <section className="hero">
      {/* BACKGROUND */}
      <div className="hero-three-bg">
        <HeroThreeBackground />
      </div>
      {/* TOP BRAND (Hackerz Presents) */}
      <div className="hero-top-brand">
        <img
          src={hackerzpresents}
          alt="Hackerz Presents"
          className="hero-brand-image1"
        />
      </div>

      {/* PARTICLES (placed after top brand) */}
      <div className="hero-particles">
        <HeroParticleHacker />
      </div>

      {/* MAIN LOGO (Silent Breach) */}
      <div className="hero-main-logo">
        <img
          src={silentBreachImg}
          alt="Silent Breach"
          className="hero-brand-image"
        />
      </div>

      {/* EVENTS SECTION */}
      <div className="hero-events">
        <Events />
      </div>
    </section>
  );
}
