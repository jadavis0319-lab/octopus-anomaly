import Scanlines from '@/components/Scanlines';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Anomaly from '@/components/Anomaly';
import HowToBuy from '@/components/HowToBuy';
import Tokenomics from '@/components/Tokenomics';
import Community from '@/components/Community';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

// Page is a server component — all heavy client logic lives inside
// child components marked 'use client'.
export default function Home() {
  return (
    <>
      <Scanlines />
      <Navbar />

      <main>
        <Hero />
        <Anomaly />
        <HowToBuy />
        <Tokenomics />
        <Community />
        <FAQ />
      </main>

      <Footer />
    </>
  );
}
