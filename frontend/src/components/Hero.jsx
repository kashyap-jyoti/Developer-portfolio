import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, ChevronDown, Terminal, Code, Sparkles, Cpu } from 'lucide-react';
import RippleButton from './RippleButton';
import LeetCodeIcon from './LeetCodeIcon';
import { useTilt } from '../hooks/useTilt';

export default function Hero() {
  const { tiltProps } = useTilt(8, 1.02);
  const [activeCodeTab, setActiveCodeTab] = useState('overview');
  const [avatarClicked, setAvatarClicked] = useState(false);

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

  // Staggered variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      style={{
        paddingTop: '140px',
        paddingBottom: '80px',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden'
      }}
    >
      {/* Mouse Follow Spotlight Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.12), transparent 80%)`,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Interactive Floating Tech Badges in Background */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 6 }}
        animate={{ y: [0, -14, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '18%',
          right: '8%',
          padding: '8px 14px',
          borderRadius: '999px',
          background: 'rgba(59, 130, 246, 0.12)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          color: '#60A5FA',
          fontSize: '0.78rem',
          fontFamily: "'JetBrains Mono', monospace",
          cursor: 'pointer',
          boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)',
          zIndex: 2
        }}
      >
        ☕ Java 21 & Spring Boot
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1, rotate: -6 }}
        animate={{ y: [0, 14, 0], rotate: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '4%',
          padding: '8px 14px',
          borderRadius: '999px',
          background: 'rgba(96, 165, 250, 0.12)',
          border: '1px solid rgba(96, 165, 250, 0.3)',
          color: '#3B82F6',
          fontSize: '0.78rem',
          fontFamily: "'JetBrains Mono', monospace",
          cursor: 'pointer',
          boxShadow: '0 0 15px rgba(96, 165, 250, 0.2)',
          zIndex: 2
        }}
      >
        ⚛️ React & Java Full Stack Architecture
      </motion.div>

      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}
        >
          {/* Left Text Content */}
          <div>
            {/* Status Pill */}
            <motion.div variants={itemVariants}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  background: 'rgba(59, 130, 246, 0.08)',
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                  fontSize: '0.8rem',
                  color: '#60A5FA',
                  fontFamily: "'JetBrains Mono', monospace",
                  marginBottom: '24px'
                }}
              >
                <span style={{ width: '8px', height: '8px', background: '#22C55E', borderRadius: '50%', boxShadow: '0 0 10px #22C55E' }}></span>
                Available for Full-Time Roles & Java Full Stack Opportunities
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: '3.6rem',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #FFFFFF 40%, #94A3B8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Hi, I'm <span style={{ background: 'linear-gradient(135deg, #3B82F6, #60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Jyoti Kashyap</span>
            </motion.h1>

            {/* Subtitle with Typewriter effect */}
            <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '28px', maxWidth: '600px', minHeight: '3.6em' }}>
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
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
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
            <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '540px' }}>
              <div className="glass2 glass-shine" style={{ padding: '16px 20px' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#3B82F6' }}>500+</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px', fontWeight: 500 }}>DSA Problems Solved</div>
              </div>
              <div className="glass2 glass-shine" style={{ padding: '16px 20px' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#60A5FA' }}>15+</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px', fontWeight: 500 }}>Full-Stack & Java Projects</div>
              </div>
              <div className="glass2 glass-shine" style={{ padding: '16px 20px' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#8B5CF6' }}>Top 5%</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px', fontWeight: 500 }}>LeetCode / GFG Rating</div>
              </div>
            </motion.div>
          </div>

          {/* Floating 3D Interactive Profile Card */}
          <motion.div
            variants={itemVariants}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          >
            <div
              className="glass glass-shine"
              {...tiltProps}
              style={{
                padding: '32px',
                position: 'relative',
                border: '1px solid rgba(96, 165, 250, 0.3)',
                boxShadow: '0 20px 50px rgba(15, 23, 42, 0.5), 0 0 30px rgba(59, 130, 246, 0.15)',
                ...tiltProps.style
              }}
            >
              {/* Header with Circular Profile Icon */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Interactive Glowing Circular Avatar */}
                  <motion.div
                    onClick={handleAvatarClick}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ position: 'relative', cursor: 'pointer' }}
                  >
                    {/* Animated spinning gradient ring border */}
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                      transition={{ rotate: { repeat: Infinity, duration: 8, ease: 'linear' }, scale: { repeat: Infinity, duration: 3, ease: 'easeInOut' } }}
                      style={{
                        position: 'absolute',
                        inset: -4,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3B82F6, #60A5FA, #2563EB, #8B5CF6)',
                        zIndex: 0,
                        boxShadow: '0 0 25px rgba(59, 130, 246, 0.6), 0 0 10px rgba(96, 165, 250, 0.4)'
                      }}
                    />

                    {/* Circle Image Container (Enlarged by 25%) */}
                    <img
                      src="/profile.png"
                      alt="Jyoti Kashyap"
                      style={{
                        width: '68px',
                        height: '68px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        position: 'relative',
                        zIndex: 1,
                        border: '2px solid #0F172A',
                        display: 'block'
                      }}
                    />

                    {/* Online Status Dot on Circle Edge */}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        right: '2px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: '#22C55E',
                        border: '2px solid #0F172A',
                        zIndex: 2,
                        boxShadow: '0 0 8px #22C55E'
                      }}
                    />

                    {/* Click feedback badge */}
                    <AnimatePresence>
                      {avatarClicked && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: -10 }}
                          style={{
                            position: 'absolute',
                            top: '-32px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#2563EB',
                            color: '#fff',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            zIndex: 10,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
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

                <span style={{ fontSize: '0.72rem', padding: '4px 10px', borderRadius: '999px', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                  BCA Senior
                </span>
              </div>

              {/* Interactive Tab Controls for Developer Code Block */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <button
                  onClick={() => setActiveCodeTab('overview')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    border: activeCodeTab === 'overview' ? '1px solid #3B82F6' : '1px solid transparent',
                    background: activeCodeTab === 'overview' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.04)',
                    color: activeCodeTab === 'overview' ? '#60A5FA' : '#94A3B8',
                    cursor: 'pointer'
                  }}
                >
                  developer.json
                </button>
                <button
                  onClick={() => setActiveCodeTab('stack')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    border: activeCodeTab === 'stack' ? '1px solid #3B82F6' : '1px solid transparent',
                    background: activeCodeTab === 'stack' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.04)',
                    color: activeCodeTab === 'stack' ? '#60A5FA' : '#94A3B8',
                    cursor: 'pointer'
                  }}
                >
                  architecture.ts
                </button>
              </div>

              {/* Dynamic Interactive Code Display */}
              <AnimatePresence mode="wait">
                {activeCodeTab === 'overview' ? (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '18px', borderRadius: '12px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '20px', lineHeight: 1.7 }}
                  >
                    <div><span style={{ color: '#ec4899' }}>const</span> developer = &#123;</div>
                    <div style={{ paddingLeft: '16px' }}><span style={{ color: '#60A5FA' }}>name</span>: <span style={{ color: '#22C55E' }}>"Jyoti Kashyap"</span>,</div>
                    <div style={{ paddingLeft: '16px' }}><span style={{ color: '#60A5FA' }}>primaryStack</span>: [<span style={{ color: '#22C55E' }}>"Java 21"</span>, <span style={{ color: '#22C55E' }}>"Java Full Stack"</span>, <span style={{ color: '#22C55E' }}>"Spring Boot"</span>],</div>
                    <div style={{ paddingLeft: '16px' }}><span style={{ color: '#60A5FA' }}>focus</span>: <span style={{ color: '#22C55E' }}>"Backend Architecture & DSA"</span>,</div>
                    <div style={{ paddingLeft: '16px' }}><span style={{ color: '#60A5FA' }}>location</span>: <span style={{ color: '#22C55E' }}>"India"</span></div>
                    <div>&#125;;</div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="stack"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '18px', borderRadius: '12px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '20px', lineHeight: 1.7 }}
                  >
                    <div><span style={{ color: '#3B82F6' }}>interface</span> SystemSkills &#123;</div>
                    <div style={{ paddingLeft: '16px' }}>concurrency: <span style={{ color: '#EAB308' }}>"Multithreading & Kafka"</span>;</div>
                    <div style={{ paddingLeft: '16px' }}>databases: [<span style={{ color: '#22C55E' }}>"MongoDB"</span>, <span style={{ color: '#22C55E' }}>"PostgreSQL"</span>];</div>
                    <div style={{ paddingLeft: '16px' }}>architecture: <span style={{ color: '#ec4899' }}>"Microservices & REST APIs"</span>;</div>
                    <div>&#125;</div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <RippleButton href="https://github.com/Kashyap-jyoti" target="_blank" rel="noreferrer" className="btn-s" style={{ padding: '8px 12px', fontSize: '0.8rem', flex: 1, justifyContent: 'center' }}>
                  <Github size={15} />
                  <span>GitHub</span>
                </RippleButton>
                <RippleButton href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn-s" style={{ padding: '8px 12px', fontSize: '0.8rem', flex: 1, justifyContent: 'center' }}>
                  <Linkedin size={15} />
                  <span>LinkedIn</span>
                </RippleButton>
                <RippleButton href="https://leetcode.com/u/Jyoti_Kashyap/" target="_blank" rel="noreferrer" className="btn-s" style={{ padding: '8px 12px', fontSize: '0.8rem', flex: 1, justifyContent: 'center' }}>
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
          style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}
        >
          <a href="#about" style={{ color: '#60A5FA', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textDecoration: 'none', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
            <span>SCROLL DOWN</span>
            <ChevronDown size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
