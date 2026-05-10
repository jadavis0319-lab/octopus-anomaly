'use client';

import { useEffect, useRef } from 'react';

// Binary rain effect rendered on a canvas for performance.
// Characters fall in columns; older characters fade to create depth.

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ'.split('');
    const FONT_SIZE = 13;
    const COLOR_DIM = 'rgba(168, 85, 247, 0.12)';
    const COLOR_BRIGHT = 'rgba(192, 132, 252, 0.35)';
    const COLOR_HEAD = 'rgba(245, 245, 245, 0.7)';

    let cols: number;
    let drops: number[];

    function init() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      cols = Math.floor(canvas!.width / FONT_SIZE);
      drops = Array.from({ length: cols }, () => Math.random() * -100);
    }

    function draw() {
      // Slightly opaque overlay creates the fading trail
      ctx!.fillStyle = 'rgba(0, 0, 0, 0.055)';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      ctx!.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        // Head character is bright
        ctx!.fillStyle = COLOR_HEAD;
        ctx!.fillText(char, x, y);

        // Body slightly dimmer
        if (drops[i] > 2) {
          ctx!.fillStyle = COLOR_BRIGHT;
          ctx!.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - FONT_SIZE);
        }

        // Dim the rest
        ctx!.fillStyle = COLOR_DIM;

        // Reset drop to top after it passes the bottom, with random delay
        if (drops[i] * FONT_SIZE > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5; // Slow fall speed for atmosphere
      }
    }

    init();

    const resizeObserver = new ResizeObserver(() => {
      init();
    });
    resizeObserver.observe(canvas);

    function loop() {
      draw();
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas w-full h-full opacity-60"
      aria-hidden="true"
    />
  );
}
