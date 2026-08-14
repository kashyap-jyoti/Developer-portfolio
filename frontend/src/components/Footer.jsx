import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import RippleButton from './RippleButton';
import LeetCodeIcon from './LeetCodeIcon';
import { useResponsive } from '../hooks/useResponsive';

export default function Footer() {
  const { isMobile } = useResponsive();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ position: 'relative', zIndex: 1, background: 'var(--nav-bg)', transition: 'background 0.3s ease' }}
    >
      {/* Animated Gradient Wave Line Divider */}
      <div className="gradient-wave-line" />

      <div style={{ borderTop: '1px solid var(--bor)', padding: '40px 24px' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: isMobile ? 'center' : 'space-between', gap: '20px', textAlign: isMobile ? 'center' : 'left' }}>
          <div>
            <h4 style={{ color: 'var(--t1)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '4px' }}>Jyoti Kashyap</h4>
            <p style={{ color: 'var(--t3)', fontSize: '0.82rem' }}>
              Built with React, Spring Boot, Java & REST APIs (Java Full Stack Architecture).
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <RippleButton href="https://github.com/Kashyap-jyoti" target="_blank" rel="noreferrer" title="GitHub Profile" style={{ color: 'var(--t3)', background: 'none', border: 'none', padding: '6px' }}>
              <Github size={20} />
            </RippleButton>
            <RippleButton href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn Profile" style={{ color: 'var(--t3)', background: 'none', border: 'none', padding: '6px' }}>
              <Linkedin size={20} />
            </RippleButton>
            <RippleButton href="https://leetcode.com/u/Jyoti_Kashyap/" target="_blank" rel="noreferrer" title="LeetCode Profile" style={{ color: 'var(--t3)', background: 'none', border: 'none', padding: '6px' }}>
              <LeetCodeIcon size={20} color="#FFA116" />
            </RippleButton>
            <RippleButton href="mailto:jyoti33604mah@gmail.com" title="Send Email" style={{ color: 'var(--t3)', background: 'none', border: 'none', padding: '6px' }}>
              <Mail size={20} />
            </RippleButton>

            {/* Rocket Launch Back to Top Button */}
            <button
              onClick={scrollToTop}
              title="Back to Top"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)'
              }}
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
