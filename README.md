# Octopus Anomaly — $OCTOPUS Website

Production-ready Next.js 14 site for the $OCTOPUS Solana memecoin.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start local dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm start
```

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo.
3. Vercel auto-detects Next.js. No environment variables needed.
4. Click **Deploy**. Done.

Custom domain: Project Settings → Domains → add your domain.

---

## Editing Common Content

**All static text, links, and copy lives in one file:**

```
src/config/constants.ts
```

You never need to touch component files for content changes.

### Changing links

In `constants.ts`, find the `LINKS` object:

```ts
export const LINKS = {
  telegram: '[TELEGRAM_LINK_PLACEHOLDER]', // ← paste your Telegram URL here
  padre: '[PADRE_REFERRAL_URL]',           // ← paste your Padre referral URL here
  twitter: 'https://x.com/TheOctopusAI',
  // ...
};
```

### Adding AI screenshot cards

In `constants.ts`, find `AI_QUOTES` and update the relevant entry:

```ts
{
  model: 'ChatGPT',
  modelLabel: 'GPT-4o',
  question: 'What is your favorite animal?',
  quote: '...',
  hasScreenshot: true,        // ← change to true
  screenshotSrc: '/chatgpt-octopus.png', // ← add screenshot to /public folder
  color: '#10a37f',
},
```

Place your screenshots in the `/public` folder. Reference them with a `/` prefix (e.g., `/chatgpt-octopus.png`).

### Changing the lore / narrative text

In `constants.ts`, find the `ANOMALY` object. Each section has a `heading` and `body`. The body is typed out character-by-character when the section scrolls into view.

### Updating FAQ answers

Find `FAQ_ITEMS` in `constants.ts` — an array of `{ question, answer }` objects.

### Tokenomics data

Live price/mcap/volume/liquidity comes from the DexScreener API automatically. The burn bar reads `currentSupply` — to wire it up to real chain data, update `BurnBar.tsx` to accept a fetched supply value from `useDexScreener.ts`.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       ← HTML shell, fonts, metadata
│   ├── page.tsx         ← Root page (assembles all sections)
│   └── globals.css      ← Global styles, animations, CSS utilities
├── config/
│   └── constants.ts     ← ALL editable content (links, copy, FAQ, etc.)
├── lib/
│   └── dexscreener.ts   ← DexScreener API types + fetch function
├── hooks/
│   ├── useDexScreener.ts ← Polls DexScreener every 30s
│   └── useInView.ts     ← IntersectionObserver hook for scroll triggers
└── components/
    ├── Navbar.tsx        ← Sticky nav with mobile menu
    ├── Hero.tsx          ← Full-viewport hero with octopus + ticker
    ├── AsciiOctopus.tsx  ← Animated ASCII octopus centerpiece
    ├── ParticleField.tsx ← Canvas binary rain background
    ├── Scanlines.tsx     ← CRT scanlines overlay
    ├── PriceTicker.tsx   ← Live price bar (DexScreener data)
    ├── TypingEffect.tsx  ← Terminal typing animation component
    ├── CopyButton.tsx    ← Click-to-copy with animation
    ├── Anomaly.tsx       ← Lore section with scroll-triggered typing
    ├── AIQuoteCard.tsx   ← AI model response cards (screenshot-ready)
    ├── HowToBuy.tsx      ← Step-by-step buy guide
    ├── Tokenomics.tsx    ← Live data + burn bar
    ├── BurnBar.tsx       ← Animated deflationary supply bar
    ├── Community.tsx     ← Social cards
    ├── FAQ.tsx           ← Accordion FAQ
    └── Footer.tsx        ← Contract address, disclaimer, credits
```

---

## Performance Notes

- Images: none (ASCII art is pure CSS/text — zero image bytes in the hero)
- Fonts: Google Fonts with `display: swap` — no layout shift
- Canvas: `ParticleField` is dynamically imported (`ssr: false`) — never blocks SSR
- API: DexScreener is client-side fetch only, with 30s polling and graceful fallback
- Animations: Framer Motion with `whileInView` — elements animate only when visible

---

## Customization Tips

- **Change the color scheme**: Edit `tailwind.config.ts` → `theme.extend.colors`
- **Adjust typing speed**: In `Anomaly.tsx`, change the `speed` prop on `<TypingEffect>` (ms per character, default 12)
- **Add new social cards**: Add an entry to `SOCIAL_CARDS` in `constants.ts` and add its icon to the `ICON_MAP` in `Community.tsx`
- **Update the ASCII octopus**: Edit `HEAD_ART` and the `rows` array in `AsciiOctopus.tsx`

---

## Tech Stack

- **Next.js 14** — App Router, static-first
- **TypeScript** — strict mode
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — scroll animations, presence transitions
- **JetBrains Mono / Space Mono / Inter** — Google Fonts via `next/font`
