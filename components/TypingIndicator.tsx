'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Brain } from 'lucide-react';

export default function TypingIndicator() {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (indicatorRef.current) {
      gsap.fromTo(
        indicatorRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div ref={indicatorRef} className="flex items-start space-x-3">
      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
        <Brain className="w-4 h-4 text-white" />
      </div>
      
      <div className="glass rounded-2xl px-4 py-3 shadow-lg">
        <div className="flex items-center space-x-1">
          <div className="typing-indicator"></div>
          <div className="typing-indicator"></div>
          <div className="typing-indicator"></div>
        </div>
      </div>
    </div>
  );
}