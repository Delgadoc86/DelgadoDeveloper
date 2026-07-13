"use client";

import { useEffect, useRef } from "react";

const DOT_RGB = "244, 244, 245";
const LINE_RGB = "156, 147, 247";
const LINK_DISTANCE = 110;

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Puntos a la deriva que se conectan con líneas finas cuando están cerca.
 * Se desactiva por completo si el usuario prefiere menos movimiento.
 */
export function HeroConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let frameId: number;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = canvas!.width = rect.width * dpr;
      height = canvas!.height = rect.height * dpr;

      const count = Math.max(18, Math.round((rect.width * rect.height) / 26000));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      }));
    }

    function draw() {
      const dpr = window.devicePixelRatio || 1;
      const linkDistance = LINK_DISTANCE * dpr;

      ctx!.clearRect(0, 0, width, height);

      for (const p of points) {
        p.x += p.vx * dpr;
        p.y += p.vy * dpr;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          if (!a || !b) continue;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDistance) {
            ctx!.strokeStyle = `rgba(${LINE_RGB}, ${(1 - dist / linkDistance) * 0.25})`;
            ctx!.lineWidth = dpr;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const p of points) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.6 * dpr, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${DOT_RGB}, 0.5)`;
        ctx!.fill();
      }

      frameId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    />
  );
}
