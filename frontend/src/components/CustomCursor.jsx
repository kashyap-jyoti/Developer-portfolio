import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [ripples, setRipples] = useState([]);

  // Mouse position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for trailing dot
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch screen device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 700);
    };

    const handleMouseUp = () => setIsClicking(false);

    // Hover target listener
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, .glass, .glass2, [role="button"]');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice || prefersReduced) return null;

  return (
    <>
      {/* Outer Glowing Cursor Circle */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '48px' : '28px',
          height: isHovered ? '48px' : '28px',
          borderRadius: '50%',
          border: '1.5px solid rgba(96, 165, 250, 0.6)',
          background: isHovered ? 'rgba(59, 130, 246, 0.12)' : 'rgba(59, 130, 246, 0.05)',
          boxShadow: isHovered ? '0 0 20px rgba(59, 130, 246, 0.5)' : 'none',
          pointerEvents: 'none',
          zIndex: 9999999,
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isClicking ? 0.8 : 1
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      />

      {/* Inner Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#60A5FA',
          boxShadow: '0 0 10px #3B82F6',
          pointerEvents: 'none',
          zIndex: 9999999,
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />

      {/* Click Ripple Effects */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          initial={{ scale: 0.2, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            top: r.y,
            left: r.x,
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            border: '2px solid #60A5FA',
            boxShadow: '0 0 15px #3B82F6',
            pointerEvents: 'none',
            zIndex: 9999998,
            translateX: '-50%',
            translateY: '-50%'
          }}
        />
      ))}
    </>
  );
}
