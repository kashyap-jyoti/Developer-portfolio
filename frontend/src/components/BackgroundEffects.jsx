import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundEffects() {
  return (
    <>
      {/* Grid Overlay */}
      <div id="grid-ol" />

      {/* Floating Aurora Color Orbs */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        className="orb-bg"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(37, 99, 235, 0.04) 70%, transparent 100%)',
          top: '-100px',
          left: '-150px'
        }}
      />

      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.95, 1.15, 1]
        }}
        transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut', delay: 2 }}
        className="orb-bg"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(29, 78, 216, 0.1) 0%, rgba(96, 165, 250, 0.03) 70%, transparent 100%)',
          bottom: '-80px',
          right: '-100px'
        }}
      />

      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 1 }}
        className="orb-bg"
        style={{
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.08) 0%, transparent 70%)',
          top: '40%',
          left: '60%'
        }}
      />
    </>
  );
}
