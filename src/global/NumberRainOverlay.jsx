import { useEffect, useRef, useState } from "react";
import "../styles/numberRain.css";

export default function NumberRainOverlay() {
  const canvasRef = useRef(null);
  const [showTap, setShowTap] = useState(true);
  const [fading, setFading] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const chars = "01X$#@%&";
    const fontSize = 18; // ⬆️ slightly bigger
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(0);

    const draw = () => {
      /* 🔥 VERY LIGHT FADE (DOES NOT DIM) */
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);

      /* 🔴 BRIGHT NEON RED */
      ctx.font = `bold ${fontSize}px monospace`;
      ctx.fillStyle = "#ff0033";

      /* ✨ GLOW EFFECT */
      ctx.shadowColor = "#ff0033";
      ctx.shadowBlur = 0;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.97) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      /* reset shadow to avoid performance hit */
      ctx.shadowBlur = 0;
    };

    const interval = setInterval(draw, 30); // ⬅️ smoother (30fps)

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize);

    // Show the tap-to-enable audio hint, fade it out over 3s and then remove it
    const startFade = setTimeout(() => setFading(true), 100);
    const removeTap = setTimeout(() => setShowTap(false), 3100);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", onResize);
      clearTimeout(startFade);
      clearTimeout(removeTap);
    };
  }, []);

  return (
    <div className="number-rain-overlay">
      {showTap && (
        <div className={`tap-audio ${fading ? "fade" : ""}`}>Tap screen to enable audio</div>
      )}
      <canvas ref={canvasRef} />
    </div>
  );
}
