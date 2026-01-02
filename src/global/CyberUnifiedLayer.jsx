import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../styles/cyberUnified.css";

export default function CyberUnifiedLayer({ showPopup, typedText }) {
  const canvasRef = useRef(null);

  /* ================= NUMBER RAIN ================= */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const chars = "01X$#@%&%@*#)&%@&()(@%@(*&#$@%&";
    const fontSize = 18;
    const columns = Math.floor(w / fontSize);
    const drops = Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `bold ${fontSize}px monospace`;
      ctx.fillStyle = "#ff0033";
      ctx.shadowColor = "#ff0033";
      ctx.shadowBlur = 18;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > h && Math.random() > 0.97) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      ctx.shadowBlur = 0;
      requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <div className="cyber-unified-layer">
      {/* CANVAS */}
      <canvas ref={canvasRef} />

      {/* POPUP CARD */}
      {showPopup && (
        <motion.div
          className="cyber-popup-card"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          <h2 className="hud-title">SYSTEM OVERVIEW</h2>

          <p className="hud-line danger">{typedText[0]}</p>
          <p className="hud-line">{typedText[1]}</p>
          <p className="hud-line">{typedText[2]}</p>

          <button className="cyber-btn">VERIFY ACCESS</button>
        </motion.div>
      )}
    </div>
  );
}
