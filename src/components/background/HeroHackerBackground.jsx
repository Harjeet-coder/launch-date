import { useEffect, useRef } from "react";
import "../../styles/heroBackground.css";

export default function HeroHackerBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width, height;
    const fontSize = 14;
    let columns = [];
    let drops = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    };

    resize();
    window.addEventListener("resize", resize);

    // Skull mask (math-based ellipse + cutouts)
    function isInsideSkull(x, y) {
      const cx = width / 2;
      const cy = height / 2;
      const rx = width * 0.18;
      const ry = height * 0.28;

      const nx = (x - cx) / rx;
      const ny = (y - cy) / ry;

      // Main skull ellipse
      if (nx * nx + ny * ny > 1) return false;

      // Eyes cutout
      const eyeY = cy - ry * 0.1;
      if (
        ((x < cx - rx * 0.2 && y > eyeY - 30 && y < eyeY + 30) ||
          (x > cx + rx * 0.2 && y > eyeY - 30 && y < eyeY + 30))
      ) {
        return false;
      }

      return true;
    }

    function draw() {
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const insideSkull = isInsideSkull(x, y);

        ctx.fillStyle = insideSkull ? "#00ff41" : "rgba(0,255,65,0.4)";
        ctx.shadowColor = insideSkull ? "#00ff41" : "transparent";
        ctx.shadowBlur = insideSkull ? 10 : 0;

        const text = Math.random() > 0.5 ? "0" : "1";
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }

      requestAnimationFrame(draw);
    }

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="hero-hacker-canvas" />;
}
