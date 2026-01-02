import HeroParticleHacker from "../background/HeroParticleHacker";
import HeroThreeBackground from "../background/HeroThreeBackground";
import Events from "./Events";
import ContactSection from "../sections/ContactSection.jsx";

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

      {/* PARTICLES */}
      <div className="hero-particles">
        <HeroParticleHacker />
      </div>

      {/* HERO VISUAL CONTENT */}
      <div className="hero-content">
        <img
          src={hackerzpresents}
          alt="Hackerz Presents"
          className="hero-brand-image1"
        />

        <img
          src={silentBreachImg}
          alt="Silent Breach"
          className="hero-brand-image"
        />
      </div>

      {/* EVENTS + CONTACT — FLOW SECTION */}
      <div className="hero-events">
        <Events />
        <ContactSection /> {/* 👈 BELOW WORKSHOP CARD */}
      </div>
    </section>
  );
}
