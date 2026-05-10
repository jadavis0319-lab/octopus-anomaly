import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#000000',
          soft: '#0a0a0f',
          mid: '#0f0f1a',
          light: '#1a1a2e',
        },
        purple: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          900: '#3b0764',
          950: '#1e0435',
        },
        neon: {
          purple: '#a855f7',
          blue: '#3b82f6',
          yellow: '#fbbf24',
        },
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'var(--font-space-mono)', 'Courier New', 'monospace'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'tentacle-1': 'tentacleWave 4s ease-in-out infinite',
        'tentacle-2': 'tentacleWave 4s ease-in-out infinite 0.3s',
        'tentacle-3': 'tentacleWave 4s ease-in-out infinite 0.6s',
        'tentacle-4': 'tentacleWave 4s ease-in-out infinite 0.9s',
        'tentacle-5': 'tentacleWave 4s ease-in-out infinite 1.2s',
        'tentacle-6': 'tentacleWave 4s ease-in-out infinite 1.5s',
        'tentacle-7': 'tentacleWave 4s ease-in-out infinite 1.8s',
        'tentacle-8': 'tentacleWave 4s ease-in-out infinite 2.1s',
        'blink': 'blink 6s ease-in-out infinite',
        'blink-2': 'blink 6s ease-in-out infinite 2s',
        'scanline': 'scanline 8s linear infinite',
        'glitch': 'glitch 8s ease-in-out infinite',
        'glitch-2': 'glitch2 8s ease-in-out infinite 0.1s',
        'float': 'float 6s ease-in-out infinite',
        'pulse-purple': 'pulsePurple 3s ease-in-out infinite',
        'typing-cursor': 'typingCursor 1s step-end infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        tentacleWave: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-3px) rotate(1.5deg)' },
          '75%': { transform: 'translateY(3px) rotate(-1.5deg)' },
        },
        blink: {
          '0%, 88%, 100%': { transform: 'scaleY(1)' },
          '92%': { transform: 'scaleY(0.05)' },
          '96%': { transform: 'scaleY(1)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%, 94%, 100%': { clipPath: 'inset(0 0 100% 0)', transform: 'translateX(0)' },
          '95%': { clipPath: 'inset(15% 0 55% 0)', transform: 'translateX(-6px)', opacity: '0.8' },
          '96%': { clipPath: 'inset(55% 0 15% 0)', transform: 'translateX(6px)', opacity: '0.9' },
          '97%': { clipPath: 'inset(35% 0 35% 0)', transform: 'translateX(-3px)', opacity: '0.7' },
          '98%': { clipPath: 'inset(5% 0 85% 0)', transform: 'translateX(3px)' },
          '99%': { clipPath: 'inset(0 0 100% 0)', transform: 'translateX(0)' },
        },
        glitch2: {
          '0%, 94%, 100%': { clipPath: 'inset(100% 0 0% 0)', transform: 'translateX(0)' },
          '95%': { clipPath: 'inset(55% 0 15% 0)', transform: 'translateX(6px)', opacity: '0.6' },
          '96%': { clipPath: 'inset(15% 0 55% 0)', transform: 'translateX(-6px)', opacity: '0.8' },
          '97%': { clipPath: 'inset(75% 0 5% 0)', transform: 'translateX(3px)', opacity: '0.7' },
          '98%': { clipPath: 'inset(100% 0 0% 0)', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulsePurple: {
          '0%, 100%': { boxShadow: '0 0 10px #a855f7, 0 0 20px #a855f780' },
          '50%': { boxShadow: '0 0 20px #a855f7, 0 0 40px #a855f780, 0 0 60px #a855f740' },
        },
        typingCursor: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'grid-purple': 'linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
};

export default config;
