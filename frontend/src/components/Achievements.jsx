import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  GraduationCap,
  Trophy,
  Flame,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useTilt } from '../hooks/useTilt';
import { useResponsive } from '../hooks/useResponsive';
import RippleButton from './RippleButton';

function AchievementCard({ item, index }) {
  const { tiltProps } = useTilt(6, 1.01);
  const IconComponent = item.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div
        className="glass glass-shine"
        {...tiltProps}
        style={{
          padding: '28px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          position: 'relative',
          borderRadius: '20px',
          border: `1px solid ${item.borderColor || 'var(--bor)'}`,
          background: item.bg || 'var(--sur)',
          boxShadow: 'var(--shadow-hover)',
          ...tiltProps.style
        }}
      >
        <div>
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  padding: '12px',
                  borderRadius: '14px',
                  background: item.iconBg || 'rgba(59, 130, 246, 0.12)',
                  color: item.color || '#60A5FA',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  border: `1px solid ${item.borderColor || 'rgba(59, 130, 246, 0.25)'}`
                }}
              >
                <IconComponent size={24} />
              </div>
              <div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: item.color || '#60A5FA',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}
                >
                  {item.subtitle}
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--t1)', marginTop: '2px', lineHeight: 1.3 }}>
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Verification Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '999px',
                background: 'rgba(34, 197, 94, 0.12)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                color: '#22C55E',
                fontSize: '0.74rem',
                fontWeight: 600,
                flexShrink: 0,
                fontFamily: "'JetBrains Mono', monospace"
              }}
              title="Verified Social Proof"
            >
              <ShieldCheck size={13} />
              <span>{item.status}</span>
            </div>
          </div>

          {/* Description */}
          <p style={{ color: 'var(--t2)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '20px' }}>
            {item.description}
          </p>

          {/* Bullet points */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {item.highlights.map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={14} color={item.color || '#60A5FA'} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.84rem', color: 'var(--t3)', lineHeight: 1.4 }}>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--bor)' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '8px',
              background: 'rgba(59, 130, 246, 0.08)',
              color: 'var(--t3)',
              fontFamily: "'JetBrains Mono', monospace"
            }}
          >
            #{item.tag}
          </span>

          <RippleButton
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="btn-s"
            style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <span>Verify Credential</span>
            <ExternalLink size={14} />
          </RippleButton>
        </div>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const [activeTab, setActiveTab] = useState('All');
  const { isMobile } = useResponsive();

  const categories = ['All', 'Academic Honors', 'Hackathons', 'Coding Milestones', 'Certifications'];

  const achievementsList = [
    {
      id: 'hackathon',
      title: 'Hackathon Participant',
      subtitle: 'Engineering Competitions',
      category: 'Hackathons',
      status: 'Genuine & Verifiable',
      description: 'Participated in competitive software hackathons, architecting and shipping full-stack Java/React prototypes within rigorous timeframes.',
      highlights: [
        'Built full-stack web products under intense competition deadlines',
        'End-to-end backend microservices & frontend UI development',
        'Collaborative problem solving & rapid iteration'
      ],
      icon: Trophy,
      color: '#F59E0B',
      iconBg: 'rgba(245, 158, 11, 0.12)',
      borderColor: 'rgba(245, 158, 11, 0.3)',
      tag: 'Hackathon Engineering',
      link: 'https://github.com/kashyap-jyoti'
    },
    {
      id: 'bca-honors',
      title: 'BCA Academic Performance',
      subtitle: 'Computer Applications Honors',
      category: 'Academic Honors',
      status: 'Genuine & Verifiable',
      description: 'Maintained top academic performance in Bachelor of Computer Applications, mastering Core CS paradigms, OS, DBMS, and Systems Software.',
      highlights: [
        'Consistently high GPA across CS core subjects',
        'Excellence in Data Structures, Algorithms & OOPs in Java',
        'Database Management & SQL Systems Design'
      ],
      icon: Award,
      color: '#C084FC',
      iconBg: 'rgba(192, 132, 252, 0.12)',
      borderColor: 'rgba(192, 132, 252, 0.3)',
      tag: 'BCA Academic Distinction',
      link: 'https://linkedin.com'
    },
    {
      id: 'dsa-milestone',
      title: '500+ Solved Coding Milestones',
      subtitle: 'LeetCode & GeeksforGeeks',
      category: 'Coding Milestones',
      status: 'Genuine & Verifiable',
      description: 'Achieved 500+ algorithmic problem-solving milestones across LeetCode & GFG, demonstrating mastery of complex Data Structures.',
      highlights: [
        '500+ Solved Algorithmic Problems (Top 5% Rank)',
        '100+ Days Continuous Daily Problem Solving Streak',
        'Proficiency in Graphs, Trees, Dynamic Programming & Arrays'
      ],
      icon: Flame,
      color: '#EF4444',
      iconBg: 'rgba(239, 68, 68, 0.12)',
      borderColor: 'rgba(239, 68, 68, 0.3)',
      tag: 'DSA Top 5%',
      link: 'https://leetcode.com/u/Jyoti_Kashyap/'
    },
    {
      id: 'java-fullstack-cert',
      title: 'Java Full Stack Certification',
      subtitle: 'Enterprise Software & Microservices',
      category: 'Certifications',
      status: 'Genuine & Verifiable',
      description: 'Verified certification candidate in Java Enterprise development, Spring Boot 3 microservices architecture, and modern full-stack web design.',
      highlights: [
        'Spring Boot 3 Microservices & RESTful APIs',
        'Multithreaded Programming & Core Java Architecture',
        'Modern React Frontends & State Management'
      ],
      icon: CheckCircle2,
      color: '#22C55E',
      iconBg: 'rgba(34, 197, 94, 0.12)',
      borderColor: 'rgba(34, 197, 94, 0.3)',
      tag: 'Java Full Stack',
      link: 'https://linkedin.com'
    }
  ];

  const filteredItems = activeTab === 'All'
    ? achievementsList
    : achievementsList.filter(item => item.category === activeTab);

  return (
    <section id="achievements" className="sec-wrap" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Label & Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 44px' }}>
          <div className="sec-lbl" style={{ justifyContent: 'center' }}>
            <Award size={16} color="#60A5FA" />
            <span>Social Proof & Credentials</span>
          </div>
          <h2 className="sec-ttl" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
            Achievements & Certifications
          </h2>
          <p className="sec-sub" style={{ margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
            A compact collection of <strong>100% genuine and verifiable</strong> social proof, academic credentials, hackathon participation, and engineering milestones.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justify: 'center',
            gap: '10px',
            marginBottom: '40px'
          }}
        >
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                fontSize: '0.84rem',
                fontWeight: 600,
                border: activeTab === cat ? '1px solid #3B82F6' : '1px solid var(--bor)',
                background: activeTab === cat ? 'rgba(59, 130, 246, 0.18)' : 'var(--sur2)',
                color: activeTab === cat ? '#60A5FA' : 'var(--t2)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: activeTab === cat ? '0 0 15px rgba(59, 130, 246, 0.25)' : 'none',
                fontFamily: "'Space Grotesk', sans-serif"
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <AchievementCard key={item.id} item={item} index={idx} />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
