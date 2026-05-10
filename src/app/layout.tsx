import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Space_Mono, Inter } from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '@/config/constants';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
  weight: ['400', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const DESCRIPTION =
  'Why every AI converges on the same answer. $OCTOPUS — the token that makes the anomaly tradeable.';

export const metadata: Metadata = {
  title: SITE_CONFIG.tagline,
  description: DESCRIPTION,
  keywords: ['octopus', 'solana', 'memecoin', 'AI', 'anomaly', 'OCTOPUS', 'crypto'],
  openGraph: {
    title: SITE_CONFIG.tagline,
    description: DESCRIPTION,
    type: 'website',
    url: SITE_CONFIG.siteUrl,
    images: [{ url: '/octopus-hero.png', alt: SITE_CONFIG.tagline }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.tagline,
    description: DESCRIPTION,
    creator: '@TheOctopusAI',
    images: ['/octopus-hero.png'],
  },
  icons: {
    icon: '/octopus-hero.png',
    apple: '/octopus-hero.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${spaceMono.variable} ${inter.variable}`}
    >
      <body className="bg-void text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
