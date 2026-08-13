import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bug, Search, Terminal, Home } from 'lucide-react';
import RippleButton from './RippleButton';

export default function NotFound({ onGoHome }) {
  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 140px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 60px',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden'
      }}
    >
      {/* Background Decorative Glow Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(29, 78, 216, 0.05) 50%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: '640px',
          width: '100%',
          textAlign: 'center',
          background: 'var(--sur)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--bor)',
          borderRadius: '24px',
          padding: 'clamp(32px, 5vw, 48px) clamp(24px, 4vw, 40px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2), 0 0 30px rgba(59, 130, 246, 0.1)'
        }}
      >
        {/* Status Tag Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'var(--btn-s-bg)',
            border: '1px solid var(--bor)',
            color: '#3B82F6',
            fontSize: '0.82rem',
            fontWeight: 600,
            marginBottom: '20px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase'
          }}
        >
          <Bug size={15} color="#3B82F6" />
          <span>Error 404 • Resource Not Found</span>
        </motion.div>

        {/* 404 Large Animated Heading */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 15 }}
          style={{
            fontSize: 'clamp(5rem, 14vw, 8.5rem)',
            fontWeight: 900,
            lineHeight: 1,
            margin: '0 0 12px',
            background: 'linear-gradient(135deg, #93C5FD 0%, #3B82F6 45%, #1D4ED8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 4px 20px rgba(59, 130, 246, 0.3))',
            letterSpacing: '-0.04em'
          }}
        >
          404
        </motion.h1>

        {/* Message Headings */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          style={{
            fontSize: 'clamp(1.3rem, 3vw, 1.75rem)',
            fontWeight: 700,
            color: 'var(--t1)',
            marginBottom: '10px',
            letterSpacing: '-0.01em'
          }}
        >
          Looks like this page went missing.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            color: 'var(--t2)',
            marginBottom: '28px',
            lineHeight: 1.6
          }}
        >
          Even my debugger couldn't find it. 😄
        </motion.p>

        {/* Developer Terminal Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          style={{
            background: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid var(--bor)',
            borderRadius: '14px',
            padding: '16px 20px',
            textAlign: 'left',
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: '0.82rem',
            color: 'var(--t3)',
            marginBottom: '32px',
            boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <Terminal size={14} color="#3B82F6" />
            <span style={{ color: 'var(--t2)', fontWeight: 600 }}>debugger.log</span>
          </div>
          <div style={{ color: '#EF4444', marginBottom: '4px' }}>
            <span style={{ color: '#94A3B8' }}>&gt;</span> Status: 404_PAGE_NOT_FOUND
          </div>
          <div style={{ color: '#F59E0B', marginBottom: '4px' }}>
            <span style={{ color: '#94A3B8' }}>&gt;</span> Route: <span style={{ color: '#60A5FA' }}>"{typeof window !== 'undefined' ? window.location.pathname : '/unknown'}"</span>
          </div>
          <div style={{ color: '#10B981' }}>
            <span style={{ color: '#94A3B8' }}>&gt;</span> Recommendation: Return to portfolio or use command palette (Ctrl+K)
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <RippleButton
            onClick={onGoHome}
            className="btn-p"
            style={{
              padding: '12px 24px',
              fontSize: '0.95rem',
              borderRadius: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 600,
              boxShadow: '0 8px 24px rgba(59, 130, 246, 0.35)'
            }}
          >
            <ArrowLeft size={18} />
            <span>Back to Portfolio</span>
          </RippleButton>

          <RippleButton
            onClick={handleOpenSearch}
            className="btn-s"
            style={{
              padding: '12px 20px',
              fontSize: '0.95rem',
              borderRadius: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 500
            }}
          >
            <Search size={17} color="#3B82F6" />
            <span>Search Portfolio</span>
          </RippleButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
