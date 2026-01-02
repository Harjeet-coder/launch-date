import { useEffect, useRef } from "react";

export default function HeroBinaryRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width, height;
    const fontSize = 14;
    let columns;
    let drops;

    const resize = () => {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    };

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? "0" : "1";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.97) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      requestAnimationFrame(draw);
    }

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-binary"
    />
  );
}
