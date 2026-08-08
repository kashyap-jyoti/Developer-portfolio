import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { useTilt } from '../hooks/useTilt';
import { useCounter } from '../hooks/useCounter';
import { useResponsive } from '../hooks/useResponsive';

export default function About() {
  const { tiltProps: tiltPropsMain } = useTilt(6, 1.01);
  const { tiltProps: tiltPropsEdu } = useTilt(8, 1.02);
  const { tiltProps: tiltPropsCert } = useTilt(8, 1.02);
  const { isMobile, isTablet } = useResponsive();
  const isNarrow = isMobile || isTablet;

  const [inView, setInView] = useState(false);

  const dsaCount = useCounter(500, inView);
  const projectCount = useCounter(15, inView);

  const highlights = [
    'Deep expertise in Core Java, OOPs principles & Multithreaded Programming.',
    'Full-Stack development mastery using Java (Spring Boot, React, REST APIs).',
    'Proficient in Data Structures, Algorithms, Complexity Analysis, and System Design.',
    'Experience building Spring Boot 3 microservices with REST API standards.',
    'BCA Computer Science undergraduate maintaining top academic honors.'
  ];

  const keyRoles = [
    { title: 'Software Engineer', bg: 'rgba(59, 130, 246, 0.12)', border: 'rgba(59, 130, 246, 0.3)', color: '#60A5FA' },
    { title: 'Java Developer', bg: 'rgba(234, 179, 8, 0.12)', border: 'rgba(234, 179, 8, 0.3)', color: '#EAB308' },
    { title: 'Problem Solver', bg: 'rgba(34, 197, 94, 0.12)', border: 'rgba(34, 197, 94, 0.3)', color: '#22C55E' },
    { title: 'BCA Student', bg: 'rgba(168, 85, 247, 0.12)', border: 'rgba(168, 85, 247, 0.3)', color: '#C084FC' },
    { title: 'DSA Enthusiast', bg: 'rgba(236, 72, 153, 0.12)', border: 'rgba(236, 72, 153, 0.3)', color: '#F472B6' }
  ];

  return (
    <section id="about" className="sec-wrap" style={{ paddingTop: '110px', paddingBottom: '110px' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        onViewportEnter={() => setInView(true)}
      >
        <div className="sec-lbl">
          <User size={16} />
          <span>About My Engineering Journey</span>
        </div>
        <h2 className="sec-ttl" style={{ marginBottom: '20px' }}>Passionate About Scalable Software & Algorithms</h2>
        <p className="sec-sub" style={{ marginBottom: '44px', lineHeight: 1.7 }}>
          I combine computer science fundamentals with modern software craftsmanship to create elegant, high-throughput applications.
        </p>

        {/* Animated Keyword Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '36px' }}>
          {keyRoles.map((role, idx) => (
            <motion.span
              key={role.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '999px',
                background: role.bg,
                border: `1px solid ${role.border}`,
                color: role.color,
                fontSize: '0.82rem',
                fontWeight: 600,
                fontFamily: "'JetBrains Mono', monospace",
                cursor: 'pointer'
              }}
            >
              <Sparkles size={13} />
              {role.title}
            </motion.span>
          ))}
        </div>

        {/* Animated Counters Banner */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div className="glass2 glass-shine" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#3B82F6', fontFamily: "'JetBrains Mono', monospace" }}>
              {dsaCount}+
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--t3)', marginTop: '4px', fontWeight: 500 }}>
              Algorithmic Problems Solved
            </div>
          </div>
          <div className="glass2 glass-shine" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#60A5FA', fontFamily: "'JetBrains Mono', monospace" }}>
              {projectCount}+
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--t3)', marginTop: '4px', fontWeight: 500 }}>
              Full-Stack & Java Repositories
            </div>
          </div>
          <div className="glass2 glass-shine" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#8B5CF6', fontFamily: "'JetBrains Mono', monospace" }}>
              Top 5%
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--t3)', marginTop: '4px', fontWeight: 500 }}>
              LeetCode & GFG Score
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '1.1fr 0.9fr', gap: isNarrow ? '24px' : '36px' }}>
          {/* Main About Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass glass-shine" {...tiltPropsMain} style={{ padding: '36px', ...tiltPropsMain.style }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--t1)', marginBottom: '20px' }}>
                Who I Am
              </h3>
              <p style={{ color: 'var(--t2)', lineHeight: 1.8, fontSize: '0.98rem', marginBottom: '20px' }}>
                I am an aspiring <strong style={{ color: '#60A5FA' }}>Java Developer</strong> and <strong style={{ color: '#60A5FA' }}>Software Engineer</strong> who thrives on solving complex engineering challenges. As a dedicated <strong style={{ color: '#C084FC' }}>BCA Student</strong> and <strong style={{ color: '#F472B6' }}>DSA Enthusiast</strong>, my core philosophy is writing clean, scalable, and high-performance code.
              </p>
              <p style={{ color: 'var(--t2)', lineHeight: 1.8, fontSize: '0.98rem', marginBottom: '28px' }}>
                Whether implementing graph algorithms in Java or architecting enterprise web platforms in Java Full Stack, I bring a methodical <strong style={{ color: '#22C55E' }}>Problem Solver</strong> mindset to every technical project.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {highlights.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
                  >
                    <CheckCircle2 size={19} color="#3B82F6" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ color: 'var(--t2)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Education & Certs Side Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            <div className="glass2 glass-shine" {...tiltPropsEdu} style={{ padding: '28px', ...tiltPropsEdu.style }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: '#3B82F6' }}>
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h4 style={{ color: 'var(--t1)', fontWeight: 700, fontSize: '1.05rem' }}>Bachelor of Computer Applications</h4>
                  <p style={{ color: 'var(--t3)', fontSize: '0.82rem', fontFamily: "'JetBrains Mono', monospace" }}>2022 — Present | CS Major</p>
                </div>
              </div>
              <p style={{ color: 'var(--t2)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                Coursework: Data Structures, Operating Systems, Database Management Systems (DBMS), Computer Networks, Software Engineering.
              </p>
            </div>

            <div className="glass2 glass-shine" {...tiltPropsCert} style={{ padding: '28px', ...tiltPropsCert.style }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <div style={{ padding: '12px', background: 'rgba(96, 165, 250, 0.1)', borderRadius: '12px', color: '#60A5FA' }}>
                  <Award size={24} />
                </div>
                <div>
                  <h4 style={{ color: 'var(--t1)', fontWeight: 700, fontSize: '1.05rem' }}>Certifications & Achievements</h4>
                  <p style={{ color: 'var(--t3)', fontSize: '0.82rem', fontFamily: "'JetBrains Mono', monospace" }}>Java & Full-Stack Verified</p>
                </div>
              </div>
              <p style={{ color: 'var(--t2)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                Oracle Certified Java Professional Candidate, Hackathon Winner, top scorer in Data Structures & Object-Oriented Analysis.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
