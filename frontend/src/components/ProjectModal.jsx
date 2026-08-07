import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, AlertCircle, Compass, Cpu, TriangleAlert, CheckCircle2, TrendingUp } from 'lucide-react';
import RippleButton from './RippleButton';

// ─── Case Study steps config ──────────────────────────────────────────────────
const STEPS = [
  {
    key: 'problem',
    label: 'Problem',
    icon: AlertCircle,
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.25)',
  },
  {
    key: 'approach',
    label: 'Approach',
    icon: Compass,
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.25)',
  },
  {
    key: 'technology',
    label: 'Technology',
    icon: Cpu,
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.25)',
  },
  {
    key: 'challenges',
    label: 'Challenges',
    icon: TriangleAlert,
    color: '#A855F7',
    bg: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.25)',
  },
  {
    key: 'solution',
    label: 'Solution',
    icon: CheckCircle2,
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.25)',
  },
  {
    key: 'result',
    label: 'Result',
    icon: TrendingUp,
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.25)',
  },
];

function CaseStudyStep({ step, text, index }) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      style={{
        display: 'flex',
        gap: '16px',
        position: 'relative',
      }}
    >
      {/* Vertical connector line */}
      {index < STEPS.length - 1 && (
        <div
          style={{
            position: 'absolute',
            left: '19px',
            top: '40px',
            width: '2px',
            bottom: '-24px',
            background: `linear-gradient(to bottom, ${step.color}40, transparent)`,
          }}
        />
      )}

      {/* Icon circle */}
      <div
        style={{
          flexShrink: 0,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: step.bg,
          border: `1.5px solid ${step.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 12px ${step.color}20`,
        }}
      >
        <Icon size={18} color={step.color} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: index < STEPS.length - 1 ? '24px' : '0' }}>
        <div
          style={{
            fontSize: '0.7rem',
            fontFamily: "'JetBrains Mono', monospace",
            color: step.color,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 700,
            marginBottom: '8px',
          }}
        >
          {step.label}
        </div>
        <p
          style={{
            fontSize: '0.9rem',
            color: '#CBD5E1',
            lineHeight: 1.7,
            background: step.bg,
            border: `1px solid ${step.border}`,
            borderRadius: '12px',
            padding: '14px 18px',
          }}
        >
          {text}
        </p>
      </div>
    </motion.div>
  );
}

export default function ProjectModal({ project, onClose }) {
  const scrollRef = useRef(null);

  // Reset scroll on open
  useEffect(() => {
    if (project && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [project]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!project) return null;

  const cs = project.caseStudy;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10, 16, 34, 0.88)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(13, 20, 40, 0.97)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '24px',
          boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(59,130,246,0.15)',
          overflow: 'hidden',
        }}
      >
        {/* ── Sticky Header ── */}
        <div
          style={{
            flexShrink: 0,
            padding: '24px 28px 20px',
            borderBottom: '1px solid rgba(59,130,246,0.12)',
            background: 'rgba(15,23,42,0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Top row: badge + close */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  color: '#60A5FA',
                  background: 'rgba(59, 130, 246, 0.12)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(59, 130, 246, 0.22)',
                }}
              >
                {project.category}
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  color: '#22C55E',
                  background: 'rgba(34,197,94,0.1)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(34,197,94,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22C55E', display: 'inline-block', boxShadow: '0 0 6px #22C55E' }} />
                Case Study
              </span>
            </div>

            <RippleButton
              onClick={onClose}
              style={{
                background: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                color: '#94A3B8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <X size={16} />
            </RippleButton>
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: 'clamp(1.3rem, 3vw, 1.75rem)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: '4px',
              letterSpacing: '-0.02em',
            }}
          >
            {project.title}
          </h2>
          <p style={{ color: '#60A5FA', fontSize: '0.88rem', fontWeight: 500, marginBottom: '16px' }}>
            {project.problem}
          </p>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {project.liveUrl && (
              <RippleButton href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-p" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
                <ExternalLink size={15} /> Live Demo
              </RippleButton>
            )}
            {project.githubUrl && (
              <RippleButton href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-s" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
                <Github size={15} /> GitHub
              </RippleButton>
            )}
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '28px 28px 32px',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(59,130,246,0.4) transparent',
          }}
        >
          {/* Tech stack pills */}
          {(project.techStack || project.tags) && (
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
                Tech Stack
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(project.techStack || project.tags?.map(t => ({ label: t, color: '#60A5FA' }))).map((tech) => (
                  <span
                    key={tech.label}
                    style={{
                      fontSize: '0.78rem',
                      padding: '4px 13px',
                      borderRadius: '8px',
                      background: `${tech.color}18`,
                      color: tech.color,
                      border: `1px solid ${tech.color}30`,
                      fontWeight: 600,
                    }}
                  >
                    {tech.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Timeline steps */}
          {cs ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {STEPS.map((step, i) =>
                cs[step.key] ? (
                  <CaseStudyStep
                    key={step.key}
                    step={step}
                    text={cs[step.key]}
                    index={i}
                  />
                ) : null
              )}
            </div>
          ) : (
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
              {project.longDescription || project.description}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
