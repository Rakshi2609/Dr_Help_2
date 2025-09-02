'use client';

import { useEffect, useRef } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple smooth scrolling without locomotive scroll for now
    const smoothScrollTo = (target: number) => {
      const start = window.pageYOffset;
      const distance = target - start;
      const duration = 1000;
      let startTime: number;

      const animation = (currentTime: number) => {
        if (startTime === undefined) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      const ease = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(animation);
    };

    // Add smooth scroll behavior to links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector((link as HTMLElement).getAttribute('href') || '');
        if (target) {
          smoothScrollTo(target.getBoundingClientRect().top + window.pageYOffset);
        }
      });
    });

    console.log('🚂 Simple smooth scroll initialized');

    return () => {
      console.log('🧹 Cleaning up smooth scroll');
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="min-h-screen relative"
      style={{ 
        scrollBehavior: 'smooth',
        overflowX: 'hidden',
        width: '100%'
      }}
    >
      {children}
    </div>
  );
}
