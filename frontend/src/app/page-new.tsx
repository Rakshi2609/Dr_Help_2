'use client';

import { EnhancedNavigation } from '@/components/EnhancedNavigation';
import { EnhancedHomePage } from '@/components/EnhancedHomePage';

export default function HomePage() {
  return (
    <main className="relative">
      <EnhancedNavigation />
      <EnhancedHomePage />
    </main>
  );
}
