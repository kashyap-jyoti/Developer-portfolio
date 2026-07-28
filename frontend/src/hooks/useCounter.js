import { useState, useEffect } from 'react';

/**
 * Number counter animation hook.
 * Counts up from 0 to target end number over duration (in ms) when trigger is true.
 */
export function useCounter(end, trigger = true, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    // Extract numeric part if end contains characters like "500+"
    const target = typeof end === 'number' ? end : parseInt(String(end).replace(/\D/g, ''), 10) || 0;
    if (target === 0) {
      setCount(0);
      return;
    }

    let startTime = null;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // Ease out expo formula
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, trigger, duration]);

  return count;
}
