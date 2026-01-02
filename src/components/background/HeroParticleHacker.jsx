import { useEffect, useRef } from "react";
import hackerImg from "../../assets/images/hacker.png";

export default function HeroParticleHacker() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const imgRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const density = 6;
    let animationId;

    const resizeCanvas = () => {
      const hero = canvas.parentElement;
      canvas.width = hero.clientWidth;
      canvas.height = hero.clientHeight;
      generateParticles();
    };

    const generateParticles = () => {
      const img = imgRef.current;
      if (!img) return;

      const { width, height } = canvas;
      const temp = document.createElement("canvas");
      const tctx = temp.getContext("2d");

      const scale = Math.min(width / img.width, height / img.height) * 0.65;
      const iw = img.width * scale;
      const ih = img.height * scale;
      const ix = (width - iw) / 2;
      const iy = (height - ih) / 2;

      temp.width = width;
      temp.height = height;
      tctx.clearRect(0, 0, width, height);
      tctx.drawImage(img, ix, iy, iw, ih);

      const data = tctx.getImageData(0, 0, width, height).data;
      particlesRef.current = [];

      for (let y = 0; y < height; y += density) {
        for (let x = 0; x < width; x += density) {
          const i = (y * width + x) * 4;
          if (data[i + 3] > 150) {
            particlesRef.current.push({
              ox: x,
              oy: y,
              x,
              y,
              phase: Math.random() * Math.PI * 2,
              size: Math.random() * 0.8 + 0.3,
             color: "rgba(251, 249, 249, 1)",

            });
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() * 0.002;

      for (const p of particlesRef.current) {
        const drift = Math.sin(t + p.phase) * 0.6;
        p.x = p.ox + drift;
        p.y = p.oy + Math.cos(t + p.phase) * 0.6;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
ctx.shadowBlur = window.innerWidth < 768 ? 0 : 4;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    imgRef.current = new Image();
    imgRef.current.src = hackerImg;
    imgRef.current.onload = () => {
      resizeCanvas();
      animate();
    };

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-particle-hacker"
    />
  );
}
