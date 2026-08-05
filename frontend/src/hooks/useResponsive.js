import { useState, useEffect } from 'react';

/**
 * Returns responsive breakpoint flags, updated on every window resize.
 * isMobile  : width ≤ 767px
 * isTablet  : width 768px – 1024px
 * isDesktop : width > 1024px
 */
export function useResponsive() {
  const getBreakpoints = () => {
    const w = window.innerWidth;
    return {
      isMobile: w <= 767,
      isTablet: w >= 768 && w <= 1024,
      isDesktop: w > 1024,
      isSmallMobile: w <= 480,
    };
  };

  const [bp, setBp] = useState(getBreakpoints);

  useEffect(() => {
    const handleResize = () => setBp(getBreakpoints());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return bp;
}
