import { useState, useEffect } from 'react';

/**
 * Hook to detect scroll direction ('up' or 'down') and current scroll offset.
 */
export function useScrollDirection(threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) > threshold) {
        setScrollDirection(currentScrollY > lastScrollY && currentScrollY > 100 ? 'down' : 'up');
        lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      }
      setScrollY(currentScrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { scrollDirection, scrollY };
}
