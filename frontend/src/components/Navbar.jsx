import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Search, FileText } from 'lucide-react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import RippleButton from './RippleButton';

export default function Navbar({ onOpenCmd, onOpenResume }) {
  const { scrollDirection, scrollY } = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredLink, setHoveredLink] = useState(null);

  const scrolled = scrollY > 40;
  const isHidden = scrollDirection === 'down' && scrollY > 150 && !mobileOpen;

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'DSA', href: '#dsa' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  // Active section tracker
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'services', 'projects', 'dsa', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isHidden ? -100 : 0, opacity: isHidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9990,
        padding: '0 24px',
        background: scrolled ? 'rgba(15, 23, 42, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(59, 130, 246, 0.15)' : '1px solid transparent',
        boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.2)' : 'none'
      }}
    >
      <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        {/* Brand Logo with pulse hover */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.06, rotate: 3 }}
          whileTap={{ scale: 0.94 }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
        >
          <div
            style={{
              position: 'relative',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.88rem',
              color: '#fff',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 8px rgba(96, 165, 250, 0.4)',
              border: '2px solid rgba(96, 165, 250, 0.6)'
            }}
          >
            JK
          </div>
          <span style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', letterSpacing: '-0.01em' }}>
            Jyoti Kashyap
          </span>
        </motion.a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="desktop-links">
          {navLinks.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            const isHovered = hoveredLink === link.label;

            return (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  position: 'relative',
                  color: isActive || isHovered ? '#60A5FA' : '#CBD5E1',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  transition: 'color 0.2s ease'
                }}
              >
                {link.label}

                {/* Animated active pill background */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(59, 130, 246, 0.12)',
                      borderRadius: '8px',
                      border: '1px solid rgba(59, 130, 246, 0.25)',
                      zIndex: -1
                    }}
                  />
                )}

                {/* Hover Underline effect */}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="hoverNavLine"
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: '14px',
                      right: '14px',
                      height: '2px',
                      background: '#60A5FA',
                      borderRadius: '999px'
                    }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <RippleButton
            onClick={onOpenCmd}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '9px',
              padding: '7px 12px',
              color: '#CBD5E1',
              fontSize: '0.78rem',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            <Search size={14} />
            <span>Search</span>
            <kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 5px', borderRadius: '4px', fontSize: '0.68rem' }}>Ctrl+K</kbd>
          </RippleButton>

          <RippleButton onClick={onOpenResume} className="btn-p" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
            <FileText size={14} />
            <span>Resume</span>
          </RippleButton>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', display: 'none' }}
            className="mobile-toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(59, 130, 246, 0.15)',
              padding: '16px 24px 24px',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: '#CBD5E1',
                    fontSize: '1rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
