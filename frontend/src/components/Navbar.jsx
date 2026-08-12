import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, FileText, Sun, Moon } from 'lucide-react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useResponsive } from '../hooks/useResponsive';
import { useTheme } from '../context/ThemeContext';
import RippleButton from './RippleButton';

export default function Navbar({ onOpenCmd, onOpenResume }) {
  const { scrollDirection, scrollY } = useScrollDirection();
  const { isMobile, isTablet } = useResponsive();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredLink, setHoveredLink] = useState(null);

  const scrolled = scrollY > 30;
  const isHidden = scrollDirection === 'down' && scrollY > 180 && !mobileOpen;
  const showHamburger = isMobile || isTablet;

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!showHamburger) setMobileOpen(false);
  }, [showHamburger]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'GitHub', href: '#github' },
    { label: 'DSA', href: '#dsa' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  // Active section tracker on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'services', 'projects', 'github', 'dsa', 'experience', 'contact'];
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
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Main Navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9990,
        padding: '0 clamp(16px, 4vw, 32px)',
        background: scrolled
          ? 'var(--nav-bg)'
          : (theme === 'dark' ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.8)'),
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: scrolled ? '1px solid var(--bor)' : '1px solid transparent',
        boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.15)' : 'none',
        transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      <div style={{
        maxWidth: '1160px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: scrolled ? '60px' : '68px',
        transition: 'height 0.3s ease',
        gap: '16px'
      }}>
        {/* Brand Logo: [JK] Jyoti Kashyap */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Jyoti Kashyap - Home"
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}
        >
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: '0.9rem', color: '#ffffff',
            boxShadow: '0 0 18px rgba(59, 130, 246, 0.5), 0 0 8px rgba(96, 165, 250, 0.4)',
            border: '2px solid rgba(96, 165, 250, 0.7)', flexShrink: 0
          }}>
            JK
          </div>
          <span style={{
            fontWeight: 800, fontSize: '1.05rem',
            background: 'linear-gradient(135deg, var(--t1) 30%, #60A5FA 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em', whiteSpace: 'nowrap',
            filter: 'drop-shadow(0 2px 8px rgba(59, 130, 246, 0.2))'
          }}>
            Jyoti Kashyap
          </span>
        </motion.a>

        {/* Desktop Navigation Links — Clean text with subtle bottom active indicator */}
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
                  color: isActive ? '#3B82F6' : (isHovered ? 'var(--t1)' : 'var(--t2)'),
                  fontSize: '0.86rem', fontWeight: isActive ? 600 : 500,
                  textDecoration: 'none', padding: '8px 12px',
                  transition: 'color 0.2s ease',
                  display: 'inline-block'
                }}
              >
                {link.label}
                {/* Active Section Indicator: Small subtle bottom underline bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    style={{
                      position: 'absolute', bottom: '2px', left: '12px', right: '12px',
                      height: '2px', background: '#3B82F6', borderRadius: '999px',
                      boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)'
                    }}
                  />
                )}
                {/* Hover subtle line indicator */}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="hoverNavLine"
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute', bottom: '2px', left: '12px', right: '12px',
                      height: '2px', background: 'rgba(59, 130, 246, 0.4)', borderRadius: '999px'
                    }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Action Controls: Search, Theme Switcher Icon, Resume CTA Button */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
          {/* Search Button — [ 🔍 Search  Ctrl+K ] */}
          <RippleButton
            onClick={onOpenCmd}
            aria-label="Search portfolio (Ctrl+K)"
            title="Search (Ctrl+K)"
            className="desktop-search-btn"
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              background: 'var(--btn-s-bg)', border: '1px solid var(--bor)',
              borderRadius: '10px', padding: '7px 12px', color: 'var(--t2)',
              fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.2s ease'
            }}
          >
            <Search size={14} color="#3B82F6" />
            <span className="search-text">Search</span>
            {!isTablet && (
              <kbd className="search-kbd" style={{
                background: 'rgba(128,128,128,0.14)', border: '1px solid var(--bor)',
                padding: '2px 5px', borderRadius: '5px', fontSize: '0.65rem',
                color: 'var(--t3)', fontFamily: "'JetBrains Mono', monospace"
              }}>
                Ctrl+K
              </kbd>
            )}
          </RippleButton>

          {/* Theme Switcher — Single 38px Circular Icon Button */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              width: '38px', height: '38px', borderRadius: '50%',
              background: 'var(--btn-s-bg)', border: '1px solid var(--bor)',
              color: theme === 'dark' ? '#F59E0B' : '#3B82F6',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease', boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          {/* Resume Button — Primary CTA */}
          {!showHamburger && (
            <RippleButton
              onClick={onOpenResume}
              aria-label="View Resume"
              className="btn-p desktop-resume-btn"
              style={{
                padding: '8px 18px', fontSize: '0.84rem', borderRadius: '10px',
                boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
                display: 'inline-flex', alignItems: 'center', gap: '6px'
              }}
            >
              <FileText size={15} />
              <span>Resume</span>
            </RippleButton>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            style={{
              background: 'var(--btn-s-bg)', border: '1px solid var(--bor)',
              borderRadius: '10px', color: 'var(--t1)', cursor: 'pointer',
              display: 'none', padding: '7px 9px', alignItems: 'center', justifyContent: 'center'
            }}
            className="mobile-toggle"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--modal-bg)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderTop: '1px solid var(--bor)',
              padding: '16px clamp(16px, 4vw, 24px) 24px',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navLinks.map((link) => {
                const sectionId = link.href.substring(1);
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      color: isActive ? '#3B82F6' : 'var(--t1)',
                      fontSize: '0.98rem', fontWeight: isActive ? 600 : 500,
                      textDecoration: 'none', padding: '12px 8px',
                      borderBottom: '1px solid var(--bor)', display: 'flex',
                      alignItems: 'center', justifyContent: 'space-between',
                      transition: 'color 0.2s ease'
                    }}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        background: '#3B82F6', boxShadow: '0 0 8px #3B82F6'
                      }} />
                    )}
                  </a>
                );
              })}

              <div style={{ paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <RippleButton
                  onClick={() => { onOpenCmd(); setMobileOpen(false); }}
                  className="btn-s"
                  style={{ width: '100%', justifyContent: 'center', gap: '8px', padding: '11px 16px' }}
                >
                  <Search size={16} color="#3B82F6" />
                  <span>Search Portfolio</span>
                </RippleButton>

                <RippleButton
                  onClick={() => { onOpenResume(); setMobileOpen(false); }}
                  className="btn-p"
                  style={{ width: '100%', justifyContent: 'center', gap: '8px', padding: '11px 16px' }}
                >
                  <FileText size={16} />
                  <span>View Resume</span>
                </RippleButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
