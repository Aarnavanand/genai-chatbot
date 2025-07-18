'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create floating particles
    const particles = Array.from({ length: 50 }, (_, i) => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 6}s`;
      particle.style.animationDuration = `${4 + Math.random() * 4}s`;
      return particle;
    });

    particles.forEach(particle => {
      containerRef.current?.appendChild(particle);
    });

    // Animate particles with GSAP
    gsap.to(particles, {
      y: '-=50',
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: 'none',
      stagger: {
        amount: 5,
        from: 'random'
      }
    });

    return () => {
      particles.forEach(particle => {
        particle.remove();
      });
    };
  }, []);

  return <div ref={containerRef} className="floating-particles" />;
}