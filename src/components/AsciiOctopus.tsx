'use client';

import Image from 'next/image';

// size prop kept for API compatibility — image sizing is CSS-based
interface AsciiOctopusProps {
  size?: 'hero' | 'medium' | 'small';
  className?: string;
}

export default function AsciiOctopus({ className = '' }: AsciiOctopusProps) {
  return (
    <div className={`octopus-body-wrap ${className}`}>
      <Image
        src="/octopus-hero-v2.png"
        alt="Octopus"
        width={500}
        height={500}
        className="octopus-image"
        priority
      />
    </div>
  );
}
