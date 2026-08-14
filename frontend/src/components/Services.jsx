import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  Code2,
  Server,
  Database,
  BrainCircuit,
  Globe,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { useTilt } from '../hooks/useTilt';

const SERVICES = [
  {
    id: 1,
    icon: Layers,
    title: 'Java Full Stack Development',
    description:
      'Building complete web applications using Java, Spring Boot, REST APIs, databases and modern frontend technologies.',
    technologies: ['Java', 'Spring Boot', 'REST API', 'React', 'MySQL'],
    iconColor: '#3B82F6',
    iconBg: 'rgba(59, 130, 246, 0.12)',
    glowColor: 'rgba(59, 130, 246, 0.22)'
  },
  {
    id: 2,
    icon: Code2,
    title: 'Frontend Development',
    description:
      'Creating responsive, modern and interactive user interfaces with clean design and smooth user experience.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript'],
    iconColor: '#60A5FA',
    iconBg: 'rgba(96, 165, 250, 0.12)',
    glowColor: 'rgba(96, 165, 250, 0.22)'
  },
  {
    id: 3,
    icon: Server,
    title: 'Backend Development',
    description:
      'Developing secure and scalable backend systems with well-structured APIs, authentication and database integration.',
    technologies: ['Java', 'Spring Boot', 'Spring Security', 'REST API'],
    iconColor: '#818CF8',
    iconBg: 'rgba(129, 140, 248, 0.12)',
    glowColor: 'rgba(129, 140, 248, 0.22)'
  },
  {
    id: 4,
    icon: Database,
    title: 'Database Development',
    description:
      'Designing and managing structured databases with efficient queries, relationships and reliable data handling.',
    technologies: ['MySQL', 'PostgreSQL', 'SQL'],
    iconColor: '#34D399',
    iconBg: 'rgba(52, 211, 153, 0.12)',
    glowColor: 'rgba(52, 211, 153, 0.22)'
  },
  {
    id: 5,
    icon: BrainCircuit,
    title: 'AI-Powered Applications',
    description:
      'Integrating AI into applications to create intelligent, personalized and automation-focused software solutions.',
    technologies: ['Python', 'AI APIs', 'Gemini/OpenAI API', 'LangChain'],
    iconColor: '#C084FC',
    iconBg: 'rgba(192, 132, 252, 0.12)',
    glowColor: 'rgba(192, 132, 252, 0.22)'
  },
  {
    id: 6,
    icon: Globe,
    title: 'Portfolio & Business Websites',
    description:
      'Developing responsive and visually engaging websites for personal brands, startups and small businesses.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Spring Boot'],
    iconColor: '#F472B6',
    iconBg: 'rgba(244, 114, 182, 0.12)',
    glowColor: 'rgba(244, 114, 182, 0.22)'
  }
];

function ServiceCard({ service, index }) {
  const { tiltProps } = useTilt(7, 1.03);
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ height: '100%' }}
    >
      <div
        className="glass glass-shine"
        {...tiltProps}
        role="article"
        aria-label={`Service: ${service.title}`}
        style={{
          padding: '32px 28px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'default',
          boxShadow: hovered
            ? `0 20px 50px rgba(0,0,0,0.35), 0 0 35px ${service.glowColor}`
            : '0 4px 20px rgba(0,0,0,0.18)',
          borderColor: hovered ? service.iconColor + '55' : 'rgba(59, 130, 246, 0.18)',
          transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
          ...tiltProps.style
        }}
      >
        {/* Animated top-edge accent line */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${service.iconColor}, transparent)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.35s ease'
          }}
        />

        {/* Icon box */}
        <motion.div
          aria-hidden="true"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: service.iconBg,
            border: `1px solid ${service.iconColor}33`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            color: service.iconColor,
            flexShrink: 0
          }}
        >
          <Icon size={24} />
        </motion.div>

        {/* Service title */}
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--t1)',
            marginBottom: '12px',
            lineHeight: 1.35
          }}
        >
          {service.title}
        </h3>

        {/* Description — always visible, not hidden behind hover */}
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--t2)',
            lineHeight: 1.7,
            marginBottom: '22px',
            flexGrow: 1
          }}
        >
          {service.description}
        </p>

        {/* Technology tags */}
        <div
          aria-label="Technologies used"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '24px' }}
        >
          {service.technologies.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
              style={{
                fontSize: '0.72rem',
                padding: '4px 10px',
                background: 'var(--sur2)',
                borderRadius: '6px',
                color: 'var(--t3)',
                border: '1px solid var(--bor)',
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.02em'
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Learn More CTA */}
        <div
          style={{
            paddingTop: '16px',
            borderTop: '1px solid rgba(255,255,255,0.06)'
          }}
        >
          <motion.span
            animate={{ x: hovered ? 5 : 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.84rem',
              fontWeight: 600,
              color: service.iconColor,
              userSelect: 'none'
            }}
            aria-label={`Learn more about ${service.title}`}
          >
            Learn More
            <ArrowRight size={15} aria-hidden="true" />
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="sec-wrap" aria-labelledby="services-heading">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Section label */}
        <div className="sec-lbl">
          <Briefcase size={16} aria-hidden="true" />
          <span>What I Offer</span>
        </div>

        {/* Heading */}
        <h2 id="services-heading" className="sec-ttl">
          Services
        </h2>

        {/* Subtitle */}
        <p className="sec-sub" style={{ marginBottom: '52px' }}>
          Building practical, scalable and user-focused digital solutions.
        </p>

        {/* Cards grid — responsive via CSS class */}
        <div className="services-grid">
          {SERVICES.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
