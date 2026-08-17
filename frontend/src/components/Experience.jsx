import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useTilt } from '../hooks/useTilt';
import { useResponsive } from '../hooks/useResponsive';

function ExperienceCard({ exp, index }) {
  const { tiltProps } = useTilt(6, 1.01);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ position: 'relative' }}
    >
      <div
        className="glass glass-shine"
        {...tiltProps}
        style={{
          padding: '28px',
          ...tiltProps.style
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>{exp.role}</h3>
            <p style={{ fontSize: '0.9rem', color: '#60A5FA', fontWeight: 500, marginTop: '2px' }}>{exp.company}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.8rem', color: '#64748B', fontFamily: "'JetBrains Mono', monospace" }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={14} /> {exp.period}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} /> {exp.location}
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.92rem', color: '#CBD5E1', lineHeight: 1.65, marginBottom: '20px' }}>
          {exp.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {exp.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.75rem',
                padding: '4px 10px',
                borderRadius: '999px',
                background: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                color: '#60A5FA'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { isMobile } = useResponsive();
  const experiences = [
    {
      role: 'Java Full Stack Developer (Projects)',
      company: 'Self-Driven Software Engineering',
      period: '2023 — Present',
      location: 'India',
      description: 'Built enterprise-grade distributed banking backends and Java Full Stack portfolio platforms featuring high concurrency, JWT security, and interactive AI chat interfaces.',
      tags: ['Java 21', 'Spring Boot', 'React', 'Node.js', 'Express', 'MongoDB', 'Kafka']
    },
    {
      role: 'Artificial Intelligence & Machine Learning Minor',
      company: 'IIT Mandi (Executive Program)',
      period: '2023 — 2024',
      location: 'IIT Mandi, India',
      description: 'Completed specialized Minor/Executive Program in AI & ML from Indian Institute of Technology (IIT) Mandi, focusing on Neural Networks, Deep Learning architectures, Natural Language Processing, and Applied Machine Learning.',
      tags: ['IIT Mandi', 'AI & Machine Learning', 'Deep Learning', 'Neural Networks', 'Python', 'Predictive Analytics']
    },
    {
      role: 'Computer Science & Software Engineering Student',
      company: 'BCA Degree Program',
      period: '2022 — Present',
      location: 'India',
      description: 'Mastered Core Computer Science paradigms including Data Structures, Graph Theory, Relational Databases (SQL), System Architecture, and Object-Oriented Software Design.',
      tags: ['DSA', 'OOPs', 'DBMS', 'Operating Systems', 'System Design']
    }
  ];

  return (
    <section id="experience" className="sec-wrap">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="sec-lbl">
          <Briefcase size={16} />
          <span>Experience & Milestones</span>
        </div>
        <h2 className="sec-ttl">Engineering Trajectory</h2>
        <p className="sec-sub" style={{ marginBottom: '40px' }}>
          Key academic and practical highlights building distributed software systems.
        </p>

        {/* Timeline Container with Scroll Progress Line */}
        <div style={{ position: 'relative', paddingLeft: isMobile ? '16px' : '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Vertical Progress Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: '7px',
              top: '10px',
              bottom: '10px',
              width: '2px',
              background: 'linear-gradient(to bottom, #3B82F6, #1D4ED8, #60A5FA)',
              transformOrigin: 'top',
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
            }}
          />

          {experiences.map((exp, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              {/* Pulsing Timeline Node */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], boxShadow: ['0 0 0px #3B82F6', '0 0 12px #3B82F6', '0 0 0px #3B82F6'] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  left: isMobile ? '-15px' : '-23px',
                  top: '28px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#3B82F6',
                  border: '3px solid var(--bg0)',
                  zIndex: 2
                }}
              />
              <ExperienceCard exp={exp} index={idx} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
