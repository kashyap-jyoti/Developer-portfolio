import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, ChevronDown, Terminal, Code, Sparkles, Cpu } from 'lucide-react';
import RippleButton from './RippleButton';
import LeetCodeIcon from './LeetCodeIcon';
import { useTilt } from '../hooks/useTilt';
import { useResponsive } from '../hooks/useResponsive';

export default function Hero({ onOpenResume }) {
  const { tiltProps } = useTilt(8, 1.02);
  const { isMobile, isTablet } = useResponsive();
  const [activeCodeTab, setActiveCodeTab] = useState('overview');
  const [avatarClicked, setAvatarClicked] = useState(false);

  const isNarrow = isMobile || isTablet;

  const techBadges = [
    { label: '☕ Java 21', tooltip: 'Primary backend language', bg: 'rgba(249, 115, 22, 0.12)', color: '#F97316', border: 'rgba(249, 115, 22, 0.3)' },
    { label: '🍃 Spring Boot', tooltip: 'Backend framework', bg: 'rgba(34, 197, 94, 0.12)', color: '#22C55E', border: 'rgba(34, 197, 94, 0.3)' },
    { label: '⚛️ React 18', tooltip: 'Frontend library', bg: 'rgba(56, 189, 248, 0.12)', color: '#38BDF8', border: 'rgba(56, 189, 248, 0.3)' },
    { label: '🐬 MySQL', tooltip: 'Relational database', bg: 'rgba(167, 139, 250, 0.12)', color: '#A78BFA', border: 'rgba(167, 139, 250, 0.3)' },
    { label: '⚡ REST APIs', tooltip: 'API architecture', bg: 'rgba(251, 146, 60, 0.12)', color: '#FB923C', border: 'rgba(251, 146, 60, 0.3)' },
    { label: '🧩 DSA & Algorithms', tooltip: 'Problem solving', bg: 'rgba(232, 121, 249, 0.12)', color: '#E879F9', border: 'rgba(232, 121, 249, 0.3)' }
  ];

  // Typewriter effect states
  const professions = [
    'Java Full Stack Software Engineer',
    'Backend Architecture & DSA Enthusiast',
    'BCA Computer Science Senior'
  ];
  const [textIndex, setTextIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === professions[textIndex].length + 1 && !isDeleting) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }
    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % professions.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, textIndex]);

  // Mouse spotlight position
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleAvatarClick = () => {
    setAvatarClicked(true);
    setTimeout(() => setAvatarClicked(false), 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      style={{
        paddingTop: isNarrow ? '100px' : '130px',
        paddingBottom: isNarrow ? '60px' : '80px',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden'
      }}
    >
      {/* Mouse Follow Spotlight */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.12), transparent 80%)`,
          pointerEvents: 'none', zIndex: 0
        }}
      />

      {/* Floating Tech Badges — hidden on mobile to avoid overflow */}
      {!isMobile && (
        <>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 6 }}
            animate={{ y: [0, -14, 0], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '18%', right: isTablet ? '2%' : '8%',
              padding: '8px 14px', borderRadius: '999px',
              background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#60A5FA', fontSize: '0.78rem', fontFamily: "'JetBrains Mono', monospace",
              cursor: 'pointer', boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)', zIndex: 2,
              whiteSpace: 'nowrap'
            }}
          >
            ☕ Java 21 & Spring Boot
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1, rotate: -6 }}
            animate={{ y: [0, 14, 0], rotate: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
            style={{
              position: 'absolute', bottom: '25%', left: isTablet ? '1%' : '4%',
              padding: '8px 14px', borderRadius: '999px',
              background: 'rgba(96, 165, 250, 0.12)', border: '1px solid rgba(96, 165, 250, 0.3)',
              color: '#3B82F6', fontSize: '0.78rem', fontFamily: "'JetBrains Mono', monospace",
              cursor: 'pointer', boxShadow: '0 0 15px rgba(96, 165, 250, 0.2)', zIndex: 2,
              whiteSpace: 'nowrap'
            }}
          >
            ⚛️ React & Java Full Stack Architecture
          </motion.div>
        </>
      )}

      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 24px)', position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: isNarrow ? '1fr' : '1.2fr 0.8fr',
            gap: isNarrow ? '32px' : '40px',
            alignItems: 'center'
          }}
        >
          {/* Left Text Content */}
          <div>
            {/* Status Pill */}
            <motion.div variants={itemVariants}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 14px', borderRadius: '999px',
                background: 'var(--sur2)', border: '1px solid var(--bor)',
                fontSize: isMobile ? '0.72rem' : '0.8rem', color: 'var(--t1)',
                fontWeight: 500, fontFamily: "'JetBrains Mono', monospace", marginBottom: '20px',
                flexWrap: 'wrap', maxWidth: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
              }}>
                <span style={{ width: '8px', height: '8px', background: '#22C55E', borderRadius: '50%', boxShadow: '0 0 10px #22C55E', flexShrink: 0, animation: 'pulseDot 2s ease-in-out infinite' }}></span>
                <span>Available for Full-Time Roles & Java Full Stack Opportunities</span>
              </div>
            </motion.div>

            {/* Name Focal Point Container */}
            <div style={{ position: 'relative', marginBottom: '20px', zIndex: 2 }}>
              {/* Radial ambient glow backdrop behind name */}
              <motion.div
                animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.95, 1.04, 0.95] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '-30%',
                  left: '-10%',
                  width: '120%',
                  height: '160%',
                  background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.28) 0%, rgba(96, 165, 250, 0.12) 50%, transparent 80%)',
                  filter: 'blur(30px)',
                  pointerEvents: 'none',
                  zIndex: -1
                }}
              />

              {/* Eyebrow Focal Tag */}
              <motion.div
                variants={itemVariants}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#60A5FA',
                  fontFamily: "'JetBrains Mono', monospace",
                  marginBottom: '10px'
                }}
              >
                <Sparkles size={14} style={{ color: '#3B82F6' }} />
                <span>Java Full Stack Software Engineer</span>
              </motion.div>

              {/* Main Name Heading */}
              <motion.h1
                variants={itemVariants}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                  fontSize: isMobile ? 'clamp(2.5rem, 9vw, 3.4rem)' : isTablet ? '3.8rem' : '4.6rem',
                  fontWeight: 900,
                  lineHeight: 1.02,
                  letterSpacing: '-0.035em',
                  margin: 0,
                  background: 'linear-gradient(135deg, var(--t1) 20%, #60A5FA 60%, #3B82F6 95%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  wordBreak: 'break-word',
                  filter: 'drop-shadow(0 4px 24px rgba(59, 130, 246, 0.4))'
                }}
              >
                Jyoti Kashyap
              </motion.h1>

              {/* Vibrant Gradient Focal Line */}
              <motion.div
                initial={{ width: '0%', opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
                style={{
                  height: '4px',
                  marginTop: '10px',
                  maxWidth: '320px',
                  background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 50%, transparent 100%)',
                  borderRadius: '999px',
                  boxShadow: '0 0 16px rgba(59, 130, 246, 0.7)'
                }}
              />
            </div>

            {/* Profession Typewriter Line */}
            <motion.div variants={itemVariants} style={{ marginBottom: '16px' }}>
              <p style={{
                fontSize: isMobile ? '1rem' : '1.15rem',
                fontWeight: 600,
                color: '#3B82F6',
                fontFamily: "'JetBrains Mono', monospace",
                margin: 0
              }}>
                BCA Student{' '}
                <span style={{ color: 'var(--t3)', margin: '0 6px' }}>|</span>
                Aspiring{' '}
                <span style={{ color: 'var(--t1)' }}>
                  {professions[textIndex].substring(0, subIndex)}
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    style={{ display: 'inline-block', width: '2px', height: '1em', background: '#3B82F6', marginLeft: '2px', verticalAlign: 'middle' }}
                  />
                </span>
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p variants={itemVariants} style={{
              fontSize: isMobile ? '0.95rem' : '1.05rem', color: 'var(--t3)',
              lineHeight: 1.7, marginBottom: '28px', maxWidth: '560px'
            }}>
              Building practical applications with{' '}
              <strong style={{ color: 'var(--t1)' }}>Java, Spring Boot, React & MySQL</strong>
              {' '}— focused on clean architecture, real-world impact, and continuous growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
              <RippleButton href="#projects" className="btn-p" style={{ boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)' }}>
                <span>View Projects</span>
                <ArrowUpRight size={18} />
              </RippleButton>
              <RippleButton
                onClick={onOpenResume}
                className="btn-s"
              >
                <Code size={16} />
                <span>Download Resume</span>
              </RippleButton>
              <RippleButton href="#contact" className="btn-s">
                <Mail size={16} />
                <span>Let's Connect</span>
              </RippleButton>
            </motion.div>

            {/* Tech Badges with Tooltips */}
            <motion.div variants={itemVariants} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
              {techBadges.map((badge) => (
                <motion.span
                  key={badge.label}
                  title={badge.tooltip}
                  whileHover={{ scale: 1.08, y: -2 }}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    background: badge.bg,
                    color: badge.color,
                    border: `1px solid ${badge.border}`,
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    fontFamily: "'JetBrains Mono', monospace",
                    cursor: 'pointer',
                    letterSpacing: '0.01em',
                    boxShadow: `0 0 10px ${badge.bg}`,
                  }}
                >
                  {badge.label}
                </motion.span>
              ))}
            </motion.div>

            {/* Quick Stats Grid */}
            <motion.div variants={itemVariants} style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '12px', maxWidth: isMobile ? '100%' : '540px'
            }}>
              <div className="glass2 glass-shine" style={{ padding: isMobile ? '12px 14px' : '16px 20px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3B82F6' }}>500+</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--t3)', marginTop: '2px', fontWeight: 500 }}>DSA Problems Solved</div>
              </div>
              <div className="glass2 glass-shine" style={{ padding: isMobile ? '12px 14px' : '16px 20px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2563EB' }}>15+</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--t3)', marginTop: '2px', fontWeight: 500 }}>Full-Stack & Java Projects</div>
              </div>
              <div className="glass2 glass-shine" style={{ padding: isMobile ? '12px 14px' : '16px 20px', gridColumn: isMobile ? 'span 2' : undefined }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#8B5CF6' }}>Top 5%</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--t3)', marginTop: '2px', fontWeight: 500 }}>LeetCode / GFG Rating</div>
              </div>
            </motion.div>
          </div>

          {/* Floating 3D Interactive Profile Card */}
          <motion.div
            variants={itemVariants}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            style={{ order: isNarrow ? -1 : undefined }}
          >
            <div
              className="glass glass-shine"
              {...tiltProps}
              style={{
                padding: isNarrow ? '24px' : '32px',
                position: 'relative',
                border: '1px solid var(--bor2)',
                boxShadow: 'var(--shadow-hover)',
                ...tiltProps.style
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Interactive Glowing Avatar */}
                  <motion.div
                    onClick={handleAvatarClick}
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ position: 'relative', cursor: 'pointer' }}
                  >
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                      transition={{ rotate: { repeat: Infinity, duration: 10, ease: 'linear' }, scale: { repeat: Infinity, duration: 3, ease: 'easeInOut' } }}
                      style={{
                        position: 'absolute', inset: -4, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3B82F6, #60A5FA, #2563EB, #8B5CF6)',
                        zIndex: 0, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                      }}
                    />
                    <img
                      src="/profile.png"
                      alt="Jyoti Kashyap"
                      style={{
                        width: '68px', height: '68px', borderRadius: '50%',
                        objectFit: 'cover', position: 'relative', zIndex: 1,
                        border: '2px solid var(--bg0)', display: 'block'
                      }}
                    />
                    <span style={{
                      position: 'absolute', bottom: '2px', right: '2px',
                      width: '12px', height: '12px', borderRadius: '50%',
                      background: '#22C55E', border: '2px solid var(--bg0)', zIndex: 2,
                      boxShadow: '0 0 8px #22C55E'
                    }} />
                    <AnimatePresence>
                      {avatarClicked && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: -10 }}
                          style={{
                            position: 'absolute', top: '-32px', left: '50%', transform: 'translateX(-50%)',
                            background: '#2563EB', color: '#fff', fontSize: '0.68rem', fontWeight: 700,
                            padding: '3px 8px', borderRadius: '6px', whiteSpace: 'nowrap',
                            pointerEvents: 'none', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                          }}
                        >
                          Hi there! 👋
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--t1)', background: 'linear-gradient(135deg, var(--t1) 40%, #60A5FA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      Jyoti Kashyap ✦
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: '#3B82F6', fontFamily: "'JetBrains Mono', monospace" }}>@kashyap-jyoti</p>
                  </div>
                </div>

                <span style={{
                  fontSize: '0.72rem', padding: '4px 10px', borderRadius: '999px',
                  background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                  BCA Senior
                </span>
              </div>

              {/* Interactive Tab Controls */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveCodeTab('overview')}
                  style={{
                    background: activeCodeTab === 'overview' ? 'rgba(59, 130, 246, 0.2)' : 'var(--btn-s-bg)',
                    border: activeCodeTab === 'overview' ? '1px solid #3B82F6' : '1px solid var(--bor)',
                    color: activeCodeTab === 'overview' ? '#3B82F6' : 'var(--t2)',
                    padding: '5px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600,
                    cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", transition: 'all 0.2s'
                  }}
                >
                  developer.json
                </button>
                <button
                  onClick={() => setActiveCodeTab('stack')}
                  style={{
                    background: activeCodeTab === 'stack' ? 'rgba(59, 130, 246, 0.2)' : 'var(--btn-s-bg)',
                    border: activeCodeTab === 'stack' ? '1px solid #3B82F6' : '1px solid var(--bor)',
                    color: activeCodeTab === 'stack' ? '#3B82F6' : 'var(--t2)',
                    padding: '5px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600,
                    cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", transition: 'all 0.2s'
                  }}
                >
                  architecture.ts
                </button>
              </div>

              {/* Dynamic Code Display */}
              <AnimatePresence mode="wait">
                {activeCodeTab === 'overview' ? (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    style={{
                      background: 'var(--sur2)', padding: '14px', borderRadius: '12px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: isMobile ? '0.74rem' : '0.82rem',
                      color: 'var(--t1)', marginBottom: '20px', lineHeight: 1.7,
                      border: '1px solid var(--bor)',
                      overflowX: 'auto', wordBreak: 'break-word'
                    }}
                  >
                    <div><span style={{ color: '#ec4899' }}>const</span> developer = &#123;</div>
                    <div style={{ paddingLeft: '14px' }}>
                      <span style={{ color: '#3B82F6' }}>name</span>: <span style={{ color: '#22C55E', background: 'rgba(34, 197, 94, 0.12)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(34, 197, 94, 0.25)', fontWeight: 700 }}>"Jyoti Kashyap"</span>,
                    </div>
                    <div style={{ paddingLeft: '14px' }}><span style={{ color: '#3B82F6' }}>primaryStack</span>: [<span style={{ color: '#22C55E' }}>"Java 21"</span>, <span style={{ color: '#22C55E' }}>"Spring Boot"</span>],</div>
                    <div style={{ paddingLeft: '14px' }}><span style={{ color: '#3B82F6' }}>focus</span>: <span style={{ color: '#22C55E' }}>"Backend Architecture & DSA"</span>,</div>
                    <div style={{ paddingLeft: '14px' }}><span style={{ color: '#3B82F6' }}>location</span>: <span style={{ color: '#22C55E' }}>"India"</span></div>
                    <div>&#125;<span style={{ display: 'inline-block', width: '8px', height: '14px', background: '#3B82F6', marginLeft: '4px', verticalAlign: 'middle', animation: 'cursorBlink 1s step-end infinite' }} /></div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="stack"
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    style={{
                      background: 'var(--sur2)', padding: '14px', borderRadius: '12px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: isMobile ? '0.74rem' : '0.82rem',
                      color: 'var(--t1)', marginBottom: '20px', lineHeight: 1.7,
                      border: '1px solid var(--bor)',
                      overflowX: 'auto', wordBreak: 'break-word'
                    }}
                  >
                    <div><span style={{ color: '#3B82F6' }}>interface</span> SystemSkills &#123;</div>
                    <div style={{ paddingLeft: '14px' }}>concurrency: <span style={{ color: '#EAB308' }}>"Multithreading & Kafka"</span>;</div>
                    <div style={{ paddingLeft: '14px' }}>databases: [<span style={{ color: '#22C55E' }}>"MongoDB"</span>, <span style={{ color: '#22C55E' }}>"PostgreSQL"</span>];</div>
                    <div style={{ paddingLeft: '14px' }}>architecture: <span style={{ color: '#ec4899' }}>"Microservices & REST APIs"</span>;</div>
                    <div>&#125;<span style={{ display: 'inline-block', width: '8px', height: '14px', background: '#3B82F6', marginLeft: '4px', verticalAlign: 'middle', animation: 'cursorBlink 1s step-end infinite' }} /></div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Social Links */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <RippleButton href="https://github.com/Kashyap-jyoti" target="_blank" rel="noreferrer" className="btn-s" style={{ padding: '8px 12px', fontSize: '0.8rem', flex: 1, justifyContent: 'center', minWidth: '80px' }}>
                  <Github size={15} />
                  <span>GitHub</span>
                </RippleButton>
                <RippleButton href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn-s" style={{ padding: '8px 12px', fontSize: '0.8rem', flex: 1, justifyContent: 'center', minWidth: '80px' }}>
                  <Linkedin size={15} />
                  <span>LinkedIn</span>
                </RippleButton>
                <RippleButton href="https://leetcode.com/u/Jyoti_Kashyap/" target="_blank" rel="noreferrer" className="btn-s" style={{ padding: '8px 12px', fontSize: '0.8rem', flex: 1, justifyContent: 'center', minWidth: '80px' }}>
                  <LeetCodeIcon size={15} color="#FFA116" />
                  <span>LeetCode</span>
                </RippleButton>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: isNarrow ? '40px' : '60px' }}
        >
          <a href="#about" style={{
            color: '#3B82F6', display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '4px', textDecoration: 'none', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace"
          }}>
            <ChevronDown size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
