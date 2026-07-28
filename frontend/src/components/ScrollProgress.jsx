import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #2563EB, #3B82F6, #60A5FA, #93C5FD)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 999999,
        boxShadow: '0 0 10px rgba(59, 130, 246, 0.7)'
      }}
    />
  );
}
