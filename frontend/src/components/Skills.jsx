import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Layout, Server, Database, Wrench, Sparkles } from 'lucide-react';

/* ── Tech stack data ─────────────────────────────────────────────── */
const STACK = [
  {
    id: 'languages',
    label: 'Languages',
    icon: Code2,
    accent: '#F97316',
    bg: 'rgba(249,115,22,0.12)',
    border: 'rgba(249,115,22,0.3)',
    glow: 'rgba(249,115,22,0.15)',
    description: 'Core programming languages I write in',
    items: [
      { name: 'Java',   emoji: '☕' },
      { name: 'C',      emoji: '⚙️' },
      { name: 'Python', emoji: '🐍' },
      { name: 'PHP',    emoji: '🐘' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: Layout,
    accent: '#38BDF8',
    bg: 'rgba(56,189,248,0.12)',
    border: 'rgba(56,189,248,0.3)',
    glow: 'rgba(56,189,248,0.15)',
    description: 'Building responsive, interactive UIs',
    items: [
      { name: 'HTML',       emoji: '🌐' },
      { name: 'CSS',        emoji: '🎨' },
      { name: 'JavaScript', emoji: '⚡' },
      { name: 'React',      emoji: '⚛️' },
      { name: 'TypeScript', emoji: '🔷' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: Server,
    accent: '#22C55E',
    bg: 'rgba(34,197,94,0.12)',
    border: 'rgba(34,197,94,0.3)',
    glow: 'rgba(34,197,94,0.15)',
    description: 'Scalable server-side systems & APIs',
    items: [
      { name: 'Java',            emoji: '☕' },
      { name: 'Spring Boot',     emoji: '🍃' },
      { name: 'Spring Security', emoji: '🔐' },
      { name: 'REST API',        emoji: '🔗' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    icon: Database,
    accent: '#A78BFA',
    bg: 'rgba(167,139,250,0.12)',
    border: 'rgba(167,139,250,0.3)',
    glow: 'rgba(167,139,250,0.15)',
    description: 'Relational databases & data modeling',
    items: [
      { name: 'MySQL',      emoji: '🐬' },
      { name: 'PostgreSQL', emoji: '🐘' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: Wrench,
    accent: '#FB923C',
    bg: 'rgba(251,146,60,0.12)',
    border: 'rgba(251,146,60,0.3)',
    glow: 'rgba(251,146,60,0.15)',
    description: 'Development workflow & productivity',
    items: [
      { name: 'Git',     emoji: '🌿' },
      { name: 'GitHub',  emoji: '🐙' },
      { name: 'VS Code', emoji: '💻' },
      { name: 'IntelliJ IDEA', emoji: '🧠' },
      { name: 'Maven',   emoji: '📦' },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    icon: Sparkles,
    accent: '#E879F9',
    bg: 'rgba(232,121,249,0.12)',
    border: 'rgba(232,121,249,0.3)',
    glow: 'rgba(232,121,249,0.15)',
    description: 'AI integrations & intelligent features',
    items: [
      { name: 'Python',      emoji: '🐍' },
      { name: 'Gemini API',  emoji: '✨' },
      { name: 'OpenAI API',  emoji: '🤖' },
    ],
  },
];

/* ── Tech badge ──────────────────────────────────────────────────── */
function Badge({ name, emoji, accent, bg, border }) {
  return (
    <motion.div
      whileHover={{ scale: 1.07, y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '7px',
        padding: '8px 16px', borderRadius: '999px',
        background: bg, border: `1px solid ${border}`,
        cursor: 'default',
        boxShadow: `0 0 14px ${bg}`,
      }}
    >
      <span style={{ fontSize: '1rem', lineHeight: 1 }}>{emoji}</span>
      <span style={{
        fontSize: '0.85rem', fontWeight: 600,
        color: accent, letterSpacing: '0.01em',
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        {name}
      </span>
    </motion.div>
  );
}

/* ── Category panel ──────────────────────────────────────────────── */
function CategoryPanel({ category }) {
  const Icon = category.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--sur)',
        border: `1px solid ${category.border}`,
        borderRadius: '20px',
        padding: '32px',
        boxShadow: `0 0 40px ${category.glow}, var(--shadow-hover)`,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '12px',
          background: category.bg, border: `1px solid ${category.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: category.accent,
          boxShadow: `0 0 16px ${category.glow}`,
        }}>
          <Icon size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--t1)', margin: 0 }}>
            {category.label}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--t3)', margin: 0, marginTop: '2px' }}>
            {category.description}
          </p>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span style={{
            padding: '4px 12px', borderRadius: '999px',
            background: category.bg, border: `1px solid ${category.border}`,
            color: category.accent, fontSize: '0.72rem',
            fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
          }}>
            {category.items.length} tech{category.items.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: `linear-gradient(90deg, ${category.border}, transparent)`,
        margin: '20px 0',
      }} />

      {/* Badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {category.items.map((item) => (
          <Badge
            key={item.name}
            name={item.name}
            emoji={item.emoji}
            accent={category.accent}
            bg={category.bg}
            border={category.border}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main component ──────────────────────────────────────────────── */
export default function Skills() {
  const [active, setActive] = useState('languages');
  const current = STACK.find((s) => s.id === active);

  return (
    <section id="skills" className="sec-wrap">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Section header */}
        <div className="sec-lbl">
          <Code2 size={16} />
          <span>Tech Stack</span>
        </div>
        <h2 className="sec-ttl">Tools of the Trade</h2>
        <p className="sec-sub" style={{ marginBottom: '44px' }}>
          A categorised view of my technical skills — from languages and frameworks
          to databases, tools, and AI integrations.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: '28px' }}>
          {/* Tab bar */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '8px',
          }}>
            {STACK.map((cat) => {
              const Icon = cat.icon;
              const isActive = active === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '7px',
                    padding: '9px 18px', borderRadius: '999px', cursor: 'pointer',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.82rem', fontWeight: 700,
                    border: isActive ? `1px solid ${cat.border}` : '1px solid rgba(255,255,255,0.08)',
                    background: isActive ? cat.bg : 'rgba(255,255,255,0.04)',
                    color: isActive ? cat.accent : '#64748B',
                    boxShadow: isActive ? `0 0 18px ${cat.glow}` : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon size={14} />
                  {cat.label}
                </motion.button>
              );
            })}
          </div>

          {/* Category panel */}
          <AnimatePresence mode="wait">
            <CategoryPanel key={active} category={current} />
          </AnimatePresence>

          {/* All-categories overview grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p style={{
              fontSize: '0.75rem', color: '#334155', textTransform: 'uppercase',
              letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700, marginBottom: '20px',
            }}>
              All Technologies
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '16px' }}>
              {STACK.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    onClick={() => { setActive(cat.id); window.scrollTo({ top: document.getElementById('skills').offsetTop - 80, behavior: 'smooth' }); }}
                    style={{
                      textAlign: 'left', cursor: 'pointer',
                      background: active === cat.id ? cat.bg : 'rgba(255,255,255,0.03)',
                      border: active === cat.id ? `1px solid ${cat.border}` : '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '14px', padding: '16px 18px',
                      transition: 'all 0.2s',
                      boxShadow: active === cat.id ? `0 0 20px ${cat.glow}` : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <div style={{
                        width: '30px', height: '30px', borderRadius: '8px',
                        background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: cat.accent, flexShrink: 0,
                      }}>
                        <Icon size={15} />
                      </div>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: active === cat.id ? cat.accent : '#94A3B8' }}>
                        {cat.label}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {cat.items.map((item) => (
                        <span key={item.name} style={{
                          fontSize: '0.72rem', padding: '2px 9px', borderRadius: '999px',
                          background: 'rgba(255,255,255,0.06)', color: '#64748B',
                          fontFamily: "'JetBrains Mono', monospace",
                        }}>
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
