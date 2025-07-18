'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ChatInterface from '@/components/ChatInterface';
import FloatingParticles from '@/components/FloatingParticles';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial page load animations
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <FloatingParticles />
      <div className="relative z-10">
        <ChatInterface />
      </div>
    </div>
  );
}