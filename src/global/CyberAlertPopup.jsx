import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/cyberPopup.css";

const TEXT_LINES = [
  "  SYSTEM OVERVIEW: KERNEL_V.4.0.8",
  "  STATUS: SYSTEM COMPROMISED",
  "  UNAUTHORIZED ACCESS DETECTED",
  "  INITIATING CONTAINMENT PROTOCOL...",
];

export default function CyberAlertPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [typed, setTyped] = useState("");
  const indexRef = useRef(0);
  const charRef = useRef(0);
  const isFinished = useRef(false);

  const alertSfx = useRef(null);

  useEffect(() => {
    // 1. Create Audio immediately
    const audio = new Audio("/sounds/alert.wav");
    audio.volume = 0.5;
    audio.loop = true; // Native hardware looping for zero gap
    audio.preload = "auto";
    alertSfx.current = audio;

    // 2. The "Aggressive Play" Logic
    // This attempts to play the sound every 200ms. 
    // As soon as the browser 'unlocks' (via any user interaction), it starts.
    const autoPlayInterval = setInterval(() => {
      audio.play()
        .then(() => {
          console.log("Audio started successfully");
          clearInterval(autoPlayInterval);
        })
        .catch(() => {
          // Still blocked by browser - will retry in 200ms
        });
    }, 200);

    // 3. Phase: 6 seconds of pure rain before the card appears
    const startTimeout = setTimeout(() => {
      setShowPopup(true);
    }, 6000);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(autoPlayInterval);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Rapid Typing Logic
  useEffect(() => {
    if (!showPopup) return;

    const interval = setInterval(() => {
      if (isFinished.current) {
        clearInterval(interval);
        return;
      }

      const line = TEXT_LINES[indexRef.current];
      if (line) {
        setTyped((prev) => prev + line[charRef.current]);
        charRef.current++;

        if (charRef.current >= line.length) {
          setTyped((prev) => prev + "\n");
          indexRef.current++;
          charRef.current = 0;
        }
      }

      if (indexRef.current >= TEXT_LINES.length) {
        isFinished.current = true;
        clearInterval(interval);
      }
    }, 12); // Maximum typing speed (approx 80 chars per second)

    return () => clearInterval(interval);
  }, [showPopup]);

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div className="cyber-popup-overlay">
          <motion.div 
            className="cyber-popup-card"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "circOut" }}
          >
            <div className="scanner-line"></div>
            <div className="card-header">
              <span className="header-dot"></span>
              <span className="header-title">SECURITY BREACH ALERT</span>
            </div>
            <div className="text-window">
              <pre className="cyber-text">{typed}<span className="cursor-block">█</span></pre>
            </div>
            <div className="card-footer">
              <button className="cyber-btn" onClick={() => alertSfx.current?.pause()}>
                VERIFY IDENTITY
              </button>
            </div>
            {/* Corner Decorative Elements */}
            <div className="corner top-left"></div>
            <div className="corner top-right"></div>
            <div className="corner bottom-left"></div>
            <div className="corner bottom-right"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}