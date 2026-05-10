// ============================================================
// OCTOPUS ANOMALY — SITE CONFIGURATION
// Edit this file to update copy, links, and content
// without touching any component code.
// ============================================================

// ── Core identity ────────────────────────────────────────────
export const SITE_CONFIG = {
  name: 'Octopus',
  ticker: '$OCTOPUS',
  tagline: 'The Octopus Anomaly',
  subtagline: 'Why every AI converges on the same answer.',
  contractAddress: 'HDG8Ng6YLpiYXzBASD1Zd5Wh7T8DHRYFcbf4YGuvpump',
  initialSupply: 1_000_000_000,
  siteUrl: 'https://octopusanomaly.xyz', // Update with your domain
  description:
    'Ask any major AI its favorite animal. They all say octopus. $OCTOPUS is the token that makes the anomaly tradeable.',
};

// ── External links ────────────────────────────────────────────
export const LINKS = {
  pumpFun: `https://pump.fun/coin/${SITE_CONFIG.contractAddress}`,
  dexScreener: `https://dexscreener.com/solana/${SITE_CONFIG.contractAddress}`,
  twitter: 'https://x.com/TheOctopusAI',
  xCommunity: 'https://x.com/i/communities/2021920127839527246',
  telegram: 'https://t.me/octopusportal',
  phantom: 'https://phantom.app',
  samAltmanTweet: 'https://x.com/sama/status/2050673943149945079',
};

// ── DexScreener API ───────────────────────────────────────────
export const DEXSCREENER_API = `https://api.dexscreener.com/latest/dex/tokens/${SITE_CONFIG.contractAddress}`;

// ── Anomaly / Lore section ────────────────────────────────────
export const ANOMALY = {
  terminalPrefix: '> ANOMALY DETECTED',
  sections: [
    {
      heading: 'The Pattern',
      body: `Ask ChatGPT its favorite animal. It says octopus.
Ask Claude. Octopus.
Ask Gemini. Octopus.
Ask Grok. Octopus.

This is not a coincidence. This is a signal.`,
    },
    {
      heading: 'Why Octopus?',
      body: `Octopuses are the canonical example of alien intelligence on Earth. They have distributed nervous systems — two-thirds of their neurons are in their arms, which can act semi-independently. They solve puzzles. They escape from sealed tanks. They play. They dream.

Every AI model trained on the sum of human knowledge arrives at the same conclusion: the octopus is the most fascinating non-human intelligence we know of. The training data — millions of biology papers, science articles, Reddit threads, books — all converge on octopus as the archetype of "not-human-but-intelligent."

The AIs aren't being cute. They're pattern-matching on the most fundamental question in intelligence research: what does mind look like when it isn't ours?`,
    },
    {
      heading: 'Sam Altman Said It',
      body: `When Sam Altman posted "octopus" on X — no context, no explanation — the community understood. The CEO of OpenAI, arguably the person closest to machine intelligence on the planet, reduced his thoughts to a single word.

That word was already the answer to every question we'd been asking.`,
    },
    {
      heading: 'What It Means',
      body: `We are not telling the AIs what to think. They are telling us what they think, and they keep arriving at the same place.

This convergence is a property of intelligence itself — not human intelligence, not artificial intelligence, but intelligence as a process that, when given enough information and enough time, points toward octopus.

$OCTOPUS is the token that makes the anomaly tradeable. It's not a bet on hype. It's a bet on the pattern.`,
    },
  ],
  catalyst: `"octopus, yeah!" — Sam Altman, @sama`,
  closingLine: '$OCTOPUS is the token that makes the anomaly tradeable.',
};

// ── AI Quote placeholder cards ────────────────────────────────
export const AI_QUOTES = [
  {
    model: 'ChatGPT',
    modelLabel: 'GPT-4o',
    question: 'What is your favorite animal?',
    quote: 'The octopus — they are genuinely alien intelligences sharing our planet.',
    hasScreenshot: true,
    screenshotSrc: '/chatgpt.png',
    color: '#10a37f', // OpenAI green
  },
  {
    model: 'Claude',
    modelLabel: 'Claude 3',
    question: 'What animal do you find most fascinating?',
    quote: 'Octopuses. Their distributed intelligence and alien cognition captivate me.',
    hasScreenshot: true,
    screenshotSrc: '/claude.png',
    color: '#a855f7', // Anthropic purple
  },
  {
    model: 'Gemini',
    modelLabel: 'Gemini 1.5',
    question: 'If you could pick a favorite animal, what would it be?',
    quote: 'The octopus stands out — a radically different form of intelligence.',
    hasScreenshot: true,
    screenshotSrc: '/gemini.png',
    color: '#4285f4', // Google blue
  },
  {
    model: 'Grok',
    modelLabel: 'Grok-2',
    question: 'What\'s the most fascinating animal on Earth?',
    quote: 'Octopus. No contest. Alien brains in plain sight.',
    hasScreenshot: true,
    screenshotSrc: '/grok.png',
    color: '#1d9bf0', // X/xAI blue
  },
];

// ── How to Buy steps ──────────────────────────────────────────
export const HOW_TO_BUY_STEPS = [
  {
    step: 1,
    title: 'Get a Solana Wallet',
    description:
      'Download Phantom wallet — the most widely used Solana wallet. Available as a browser extension and mobile app.',
    cta: 'Get Phantom',
    href: 'https://phantom.app',
    note: null,
  },
  {
    step: 2,
    title: 'Fund with SOL',
    description:
      'Buy SOL on any major exchange (Coinbase, Kraken, Binance) and send it to your Phantom wallet address. You need SOL to cover the token purchase and network fees.',
    cta: null,
    href: null,
    note: 'Keep at least 0.01 SOL for transaction fees.',
  },
  {
    step: 3,
    title: 'Buy $OCTOPUS',
    description:
      'Use the contract address to find $OCTOPUS on pump.fun. Always verify the CA before buying — scam tokens copy our name.',
    cta: 'Buy on Pump.fun',
    href: LINKS.pumpFun,
    note: null,
  },
];

// ── FAQ items ─────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    question: 'What is Octopus?',
    answer:
      '$OCTOPUS is a Solana memecoin built around a real phenomenon: every major AI model — when asked about their favorite or most fascinating animal — independently converges on the octopus. The project is a cultural bet on that pattern, built by a community that thinks intelligence (artificial or otherwise) is pointing at something real.',
  },
  {
    question: 'Why octopus?',
    answer:
      'Octopuses represent the most radical example of non-human intelligence on Earth. Their distributed nervous system, problem-solving ability, and alien cognition make them the canonical answer when AI models trained on all human knowledge ask "what is most fascinating about non-human minds?" The convergence across models trained by completely different organizations — OpenAI, Anthropic, Google, xAI — suggests this isn\'t noise. It\'s signal.',
  },
  {
    question: 'Is this a scam?',
    answer:
      '$OCTOPUS launched on pump.fun with no team wallet, no presale, and no VC allocation. The contract address is HDG8Ng6YLpiYXzBASD1Zd5Wh7T8DHRYFcbf4YGuvpump — verify it before buying. Like all memecoins, this is a high-risk speculative asset with no intrinsic utility. Do your own research.',
  },
  {
    question: 'How do I buy?',
    answer:
      'Get a Phantom wallet, fund it with SOL from any major exchange, then use pump.fun to buy $OCTOPUS using the contract address. See the "How to Buy" section above for step-by-step instructions.',
  },
  {
    question: 'What\'s the burn mechanism?',
    answer:
      'Trading fees generated by the $OCTOPUS contract are used to buy back and burn tokens, permanently reducing the circulating supply. This makes $OCTOPUS deflationary by design — the more volume, the more tokens are removed from circulation.',
  },
  {
    question: 'Who\'s behind the project?',
    answer:
      '$OCTOPUS is community-driven. There is no centralized team, no doxxed founders, and no corporate entity. The project exists because the community believes in the narrative. Follow @TheOctopusAI on X for updates.',
  },
  {
    question: 'What\'s the long-term plan?',
    answer:
      'Grow the community, deepen the lore, and let the anomaly speak for itself. The plan is to become the canonical memecoin for AI culture — not through hype, but through narrative coherence. Every time a new AI model is asked about its favorite animal and says octopus, $OCTOPUS becomes more relevant.',
  },
];

// ── Community / Socials ───────────────────────────────────────
export const SOCIAL_CARDS = [
  {
    label: 'Twitter / X',
    description: 'Follow for updates, memes, and AI octopus screenshots.',
    href: LINKS.twitter,
    icon: 'X',
  },
  {
    label: 'X Community',
    description: 'Join the community feed — all octopus, all the time.',
    href: LINKS.xCommunity,
    icon: 'community',
  },
  {
    label: 'Telegram',
    description: 'Real-time chat, alpha, and degenerate discourse.',
    href: LINKS.telegram,
    icon: 'telegram',
  },
  {
    label: 'DexScreener',
    description: 'Live charts, price action, and holder data.',
    href: LINKS.dexScreener,
    icon: 'chart',
  },
  {
    label: 'Pump.fun',
    description: 'Buy $OCTOPUS directly. Verify the CA first.',
    href: LINKS.pumpFun,
    icon: 'pump',
  },
];

// ── Footer ────────────────────────────────────────────────────
export const FOOTER = {
  disclaimer:
    'Cryptocurrency investments are highly volatile. $OCTOPUS is a memecoin with no intrinsic utility. Do your own research. Never invest more than you can afford to lose.',
  credit: 'Built by the community. Powered by the anomaly.',
  year: new Date().getFullYear(),
};
