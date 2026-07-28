import { useState, useEffect } from 'react';

/**
 * Hook to detect if the user prefers reduced motion for accessibility.
 * Returns true if prefers-reduced-motion is active.
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener?.('change', handleChange) || mediaQuery.addListener?.(handleChange);

    return () => {
      mediaQuery.removeEventListener?.('change', handleChange) || mediaQuery.removeListener?.(handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
