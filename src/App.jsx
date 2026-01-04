import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";

import Header from "./components/layout/Header";
import Hero from "./components/sections/Hero";
import Footer from "./components/layout/Footer";

// 🎨 THREE.JS BACKGROUND
import HackerBackground from "./components/background/HeroHackerBackground";

// 🌧️ NUMBER RAIN OVERLAY
import NumberRainOverlay from "./global/NumberRainOverlay";

// 🚨 CYBER POPUP
import CyberAlertPopup from "./global/CyberAlertPopup";

export default function App() {
  const [showCyberMode, setShowCyberMode] = useState(false);

  /* ---------------- LENIS SCROLL ---------------- */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      smoothWheel: true,
      smoothTouch: false,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  /* ---------------- CYBER MODE TRIGGER ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCyberMode(true);
    }, 5000); // ⏱️ 7 seconds after page load

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 🎨 THREE.JS BACKGROUND — ONLY BEFORE CYBER MODE */}
      {!showCyberMode && <HackerBackground />}

      {/* 🌐 SITE CONTENT */}
      <Header />
      <Hero />
      <Footer />

      
      {/* 🌧️ NUMBER RAIN (FULLSCREEN) */}
      
      {showCyberMode && <NumberRainOverlay />}

      {/* 🚨 CYBER ALERT POPUP (ON TOP) */}
      {showCyberMode && <CyberAlertPopup />}
    </>
  );
}
