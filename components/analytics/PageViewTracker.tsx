"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Enregistrer la visite de la page
    const trackPageView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pageUrl: pathname,
            referrer: document.referrer || null,
          }),
        });
      } catch (error) {
        // Silently fail - analytics shouldn't block the app
        console.debug('Analytics tracking failed:', error);
      }
    };

    trackPageView();
  }, [pathname]); // Exécuter à chaque changement de page

  return null; // Ce composant ne rend rien visuellement
}
