import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, ChevronDown, Terminal, Code, Sparkles, Cpu } from 'lucide-react';
import RippleButton from './RippleButton';
import LeetCodeIcon from './LeetCodeIcon';
import { useTilt } from '../hooks/useTilt';
import { useResponsive } from '../hooks/useResponsive';

export default function Hero() {
  const { tiltProps } = useTilt(8, 1.02);
  const { isMobile, isTablet } = useResponsive();
  const [activeCodeTab, setActiveCodeTab] = useState('overview');
  const [avatarClicked, setAvatarClicked] = useState(false);

  const isNarrow = isMobile || isTablet;

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
        paddingTop: isNarrow ? '100px' : '140px',
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
                background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.25)',
                fontSize: isMobile ? '0.72rem' : '0.8rem', color: '#60A5FA',
                fontFamily: "'JetBrains Mono', monospace", marginBottom: '24px',
                flexWrap: 'wrap', maxWidth: '100%'
              }}>
                <span style={{ width: '8px', height: '8px', background: '#22C55E', borderRadius: '50%', boxShadow: '0 0 10px #22C55E', flexShrink: 0 }}></span>
                <span>Available for Full-Time Roles & Java Full Stack Opportunities</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: isMobile ? 'clamp(1.9rem, 8vw, 2.6rem)' : isTablet ? '2.8rem' : '3.6rem',
                fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '20px',
                background: 'linear-gradient(135deg, #FFFFFF 40%, #94A3B8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                wordBreak: 'break-word'
              }}
            >
              Hi, I'm <span style={{ background: 'linear-gradient(135deg, #3B82F6, #60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Jyoti Kashyap</span>
            </motion.h1>

            {/* Subtitle with Typewriter */}
            <motion.p variants={itemVariants} style={{
              fontSize: isMobile ? '0.95rem' : '1.2rem', color: '#CBD5E1',
              lineHeight: 1.6, marginBottom: '28px', maxWidth: '600px',
              minHeight: isMobile ? '4.8em' : '3.6em'
            }}>
              Aspiring{' '}
              <strong style={{ color: '#60A5FA', fontFamily: "'JetBrains Mono', monospace" }}>
                {professions[textIndex].substring(0, subIndex)}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  style={{ display: 'inline-block', width: '2px', height: '1.1em', background: '#60A5FA', marginLeft: '2px', verticalAlign: 'middle' }}
                />
              </strong>
              , building high-throughput backends and modern full-stack Web Applications.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '36px' }}>
              <RippleButton href="#projects" className="btn-p">
                <span>View Featured Projects</span>
                <ArrowUpRight size={18} />
              </RippleButton>
              <RippleButton href="#contact" className="btn-s">
                <Mail size={18} />
                <span>Contact Me</span>
              </RippleButton>
            </motion.div>

            {/* Quick Stats Grid */}
            <motion.div variants={itemVariants} style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '12px', maxWidth: isMobile ? '100%' : '540px'
            }}>
              <div className="glass2 glass-shine" style={{ padding: isMobile ? '12px 14px' : '16px 20px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3B82F6' }}>500+</div>
                <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '2px', fontWeight: 500 }}>DSA Problems Solved</div>
              </div>
              <div className="glass2 glass-shine" style={{ padding: isMobile ? '12px 14px' : '16px 20px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#60A5FA' }}>15+</div>
                <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '2px', fontWeight: 500 }}>Full-Stack & Java Projects</div>
              </div>
              <div className="glass2 glass-shine" style={{ padding: isMobile ? '12px 14px' : '16px 20px', gridColumn: isMobile ? 'span 2' : undefined }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#8B5CF6' }}>Top 5%</div>
                <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '2px', fontWeight: 500 }}>LeetCode / GFG Rating</div>
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
                border: '1px solid rgba(96, 165, 250, 0.3)',
                boxShadow: '0 20px 50px rgba(15, 23, 42, 0.5), 0 0 30px rgba(59, 130, 246, 0.15)',
                ...tiltProps.style
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Interactive Glowing Avatar */}
                  <motion.div
                    onClick={handleAvatarClick}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ position: 'relative', cursor: 'pointer' }}
                  >
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                      transition={{ rotate: { repeat: Infinity, duration: 8, ease: 'linear' }, scale: { repeat: Infinity, duration: 3, ease: 'easeInOut' } }}
                      style={{
                        position: 'absolute', inset: -4, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3B82F6, #60A5FA, #2563EB, #8B5CF6)',
                        zIndex: 0, boxShadow: '0 0 25px rgba(59, 130, 246, 0.6), 0 0 10px rgba(96, 165, 250, 0.4)'
                      }}
                    />
                    <img
                      src="/profile.png"
                      alt="Jyoti Kashyap"
                      style={{
                        width: '68px', height: '68px', borderRadius: '50%',
                        objectFit: 'cover', position: 'relative', zIndex: 1,
                        border: '2px solid #0F172A', display: 'block'
                      }}
                    />
                    <span style={{
                      position: 'absolute', bottom: '2px', right: '2px',
                      width: '12px', height: '12px', borderRadius: '50%',
                      background: '#22C55E', border: '2px solid #0F172A', zIndex: 2,
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
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Jyoti Kashyap</h3>
                    <p style={{ fontSize: '0.78rem', color: '#60A5FA', fontFamily: "'JetBrains Mono', monospace" }}>@kashyap-jyoti</p>
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
                    padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    border: activeCodeTab === 'overview' ? '1px solid #3B82F6' : '1px solid transparent',
                    background: activeCodeTab === 'overview' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.04)',
                    color: activeCodeTab === 'overview' ? '#60A5FA' : '#94A3B8', cursor: 'pointer'
                  }}
                >
                  developer.json
                </button>
                <button
                  onClick={() => setActiveCodeTab('stack')}
                  style={{
                    padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    border: activeCodeTab === 'stack' ? '1px solid #3B82F6' : '1px solid transparent',
                    background: activeCodeTab === 'stack' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.04)',
                    color: activeCodeTab === 'stack' ? '#60A5FA' : '#94A3B8', cursor: 'pointer'
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
                      background: 'rgba(15, 23, 42, 0.8)', padding: '14px', borderRadius: '12px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: isMobile ? '0.74rem' : '0.82rem',
                      color: '#CBD5E1', marginBottom: '20px', lineHeight: 1.7,
                      overflowX: 'auto', wordBreak: 'break-word'
                    }}
                  >
                    <div><span style={{ color: '#ec4899' }}>const</span> developer = &#123;</div>
                    <div style={{ paddingLeft: '14px' }}><span style={{ color: '#60A5FA' }}>name</span>: <span style={{ color: '#22C55E' }}>"Jyoti Kashyap"</span>,</div>
                    <div style={{ paddingLeft: '14px' }}><span style={{ color: '#60A5FA' }}>primaryStack</span>: [<span style={{ color: '#22C55E' }}>"Java 21"</span>, <span style={{ color: '#22C55E' }}>"Spring Boot"</span>],</div>
                    <div style={{ paddingLeft: '14px' }}><span style={{ color: '#60A5FA' }}>focus</span>: <span style={{ color: '#22C55E' }}>"Backend Architecture & DSA"</span>,</div>
                    <div style={{ paddingLeft: '14px' }}><span style={{ color: '#60A5FA' }}>location</span>: <span style={{ color: '#22C55E' }}>"India"</span></div>
                    <div>&#125;;</div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="stack"
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    style={{
                      background: 'rgba(15, 23, 42, 0.8)', padding: '14px', borderRadius: '12px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: isMobile ? '0.74rem' : '0.82rem',
                      color: '#CBD5E1', marginBottom: '20px', lineHeight: 1.7,
                      overflowX: 'auto', wordBreak: 'break-word'
                    }}
                  >
                    <div><span style={{ color: '#3B82F6' }}>interface</span> SystemSkills &#123;</div>
                    <div style={{ paddingLeft: '14px' }}>concurrency: <span style={{ color: '#EAB308' }}>"Multithreading & Kafka"</span>;</div>
                    <div style={{ paddingLeft: '14px' }}>databases: [<span style={{ color: '#22C55E' }}>"MongoDB"</span>, <span style={{ color: '#22C55E' }}>"PostgreSQL"</span>];</div>
                    <div style={{ paddingLeft: '14px' }}>architecture: <span style={{ color: '#ec4899' }}>"Microservices & REST APIs"</span>;</div>
                    <div>&#125;</div>
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
            color: '#60A5FA', display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '4px', textDecoration: 'none', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace"
          }}>
            <span>SCROLL DOWN</span>
            <ChevronDown size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
