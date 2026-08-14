import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        const diff = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + diff, 100);
      });
    }, 60);

    // Safety fallback: force-complete after 4 seconds no matter what
    const safetyTimer = setTimeout(() => {
      clearInterval(timer);
      setProgress(100);
      setIsLoading(false);
      if (onComplete) onComplete();
    }, 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(safetyTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: '#0F172A',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none'
          }}
        >
          {/* Glowing Initials Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'relative',
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 900,
              color: '#fff',
              boxShadow: '0 0 50px rgba(59, 130, 246, 0.5), 0 0 100px rgba(96, 165, 250, 0.2)',
              marginBottom: '32px'
            }}
          >
            JK
          </motion.div>

          {/* Title / Subtitle */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '28px' }}
          >
            <h2 style={{
              fontSize: '1.45rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.04em',
              marginBottom: '4px',
              textTransform: 'uppercase',
              filter: 'drop-shadow(0 0 16px rgba(59, 130, 246, 0.6))'
            }}>
              Jyoti Kashyap
            </h2>
            <p style={{ fontSize: '0.84rem', color: '#60A5FA', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
              Java Full Stack Software Engineer
            </p>
          </motion.div>

          {/* Progress Bar Container */}
          <div style={{ width: '220px', height: '4px', background: 'rgba(59, 130, 246, 0.15)', borderRadius: '999px', overflow: 'hidden', position: 'relative' }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
                borderRadius: '999px',
                boxShadow: '0 0 12px rgba(96, 165, 250, 0.8)',
                width: `${progress}%`
              }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>

          {/* Percentage */}
          <div style={{ marginTop: '12px', fontSize: '0.78rem', fontFamily: "'JetBrains Mono', monospace", color: '#64748B' }}>
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
