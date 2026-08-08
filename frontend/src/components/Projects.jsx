import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2, ExternalLink, Github, Star, GitFork, BookOpen, CheckCircle2
} from 'lucide-react';
import { fetchProjects } from '../services/api';
import RippleButton from './RippleButton';
import { useTilt } from '../hooks/useTilt';

// ─── Enriched project data ────────────────────────────────────────────────────
const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'Enterprise Banking Platform',
    subtitle: 'High-Concurrency Distributed Backend',
    problem: 'Banks lacked a reliable backend capable of handling 10,000+ simultaneous transactions without data races or latency spikes.',
    category: 'Java & Spring Boot',
    techStack: [
      { label: 'Java 21',      color: '#F89820' },
      { label: 'Spring Boot 3',color: '#6DB33F' },
      { label: 'Kafka',        color: '#0D7CE9' },
      { label: 'PostgreSQL',   color: '#336791' },
      { label: 'JWT',          color: '#FB015B' },
      { label: 'Docker',       color: '#2496ED' },
    ],
    features: [
      'JWT authentication & RBAC',
      'Distributed transaction management',
      'Real-time Kafka event streaming',
      'REST API with OpenAPI docs',
    ],
    tags: ['Java 21', 'Spring Boot 3', 'Kafka', 'PostgreSQL', 'JWT', 'Microservices', 'Docker'],
    githubUrl: 'https://github.com/Kashyap-jyoti',
    liveUrl: '',
    stars: 24,
    forks: 7,
    caseStudy: {
      problem:    `Existing banking backends were monolithic and frequently deadlocked under high concurrency, causing failed transactions and customer-facing errors during peak hours.`,
      approach:   `Decomposed the system into independent microservices (Auth, Transaction, Notification) each owning its own database, connected via Kafka topics to ensure eventual consistency without distributed locks.`,
      technology: `Java 21 virtual threads for I/O concurrency, Spring Boot 3 + Spring Security for JWT/RBAC, Apache Kafka for event streaming, PostgreSQL with optimistic locking, Docker Compose for local orchestration.`,
      challenges: `Handling idempotency across retried Kafka messages was tricky — a consumer could process the same event twice on broker restart. Also, configuring Spring Security's method-level RBAC without leaking internal roles to JWT payloads took multiple iterations.`,
      solution:   `Introduced an outbox pattern in the Transaction Service: events are written atomically to the DB and a separate relay polls & publishes them to Kafka, guaranteeing at-least-once delivery with idempotency keys checked on the consumer side.`,
      result:     `System sustains 10,000+ concurrent users at <80ms p95 latency. Zero deadlock incidents post-deployment. Transaction success rate improved from 94% to 99.97% in load tests.`,
    },
  },
  {
    id: 2,
    title: 'Java Full Stack Portfolio Platform',
    subtitle: 'Interactive Developer Portfolio with AI Chat',
    problem: `Static portfolio sites don't demonstrate backend skills. Recruiters couldn't verify that the developer could actually build and operate a real full-stack system.`,
    category: 'Java Full Stack',
    techStack: [
      { label: 'React 18',     color: '#61DAFB' },
      { label: 'Java',         color: '#F89820' },
      { label: 'Spring Boot',  color: '#6DB33F' },
      { label: 'MySQL',        color: '#4479A1' },
      { label: 'REST API',     color: '#FF6B35' },
      { label: 'GSAP',         color: '#88CE02' },
    ],
    features: [
      'Contact form persisted in MongoDB',
      'Nova AI assistant via REST API',
      'Command palette (⌘K)',
      'Animated glassmorphism UI',
    ],
    tags: ['React', 'Java', 'Spring Boot', 'MySQL', 'REST API', 'GSAP', 'Framer Motion'],
    githubUrl: 'https://github.com/Kashyap-jyoti',
    liveUrl: '',
    stars: 18,
    forks: 4,
    caseStudy: {
      problem:    `Most portfolios are static HTML/CSS pages that give no evidence of the developer's backend or systems-design skills. Recruiters and engineers couldn't easily assess the candidate's real-world full-stack capabilities.`,
      approach:   `Build the portfolio itself as a production-quality full-stack app: React SPA on the frontend, Spring Boot REST API on the backend, MySQL for structured data (projects/experience), MongoDB for contact messages, and a custom AI assistant endpoint.`,
      technology: `React 18 + Framer Motion + GSAP for the UI, Spring Boot 3 + Spring Data JPA for the API layer, MySQL (projects/experience), MongoDB (contact messages), Vite for bundling.`,
      challenges: `Keeping the UI animated and performant while co-existing with GSAP (imperative) and Framer Motion (declarative) required careful scoping — GSAP was limited to one-shot micro-animations; Framer Motion handled layout and page transitions.`,
      solution:   `Introduced a layered animation strategy: Framer Motion for mount/exit and scroll-triggered reveals, GSAP purely for the rocket launch button and cursor trail, CSS keyframes for background orbs. Each library stays in its lane.`,
      result:     `Portfolio loads in <1.2s on mobile, scores 94 on Lighthouse Performance, and has attracted positive feedback from engineering managers who appreciated seeing the backend architecture rather than a static template.`,
    },
  },
  {
    id: 3,
    title: 'DSA Algorithm Visualizer',
    subtitle: 'Interactive Algorithm & Data Structure Demos',
    problem: 'DSA concepts are abstract and hard to learn from text alone; students needed a tool to see algorithms execute step-by-step in real time.',
    category: 'Algorithms',
    techStack: [
      { label: 'Java',         color: '#F89820' },
      { label: 'React',        color: '#61DAFB' },
      { label: 'Canvas API',   color: '#E44D26' },
      { label: 'Graph Theory', color: '#A855F7' },
    ],
    features: [
      '30+ algorithms with playback controls',
      'BFS / DFS graph traversal',
      'Dynamic programming visualiser',
      'Step-by-step execution log',
    ],
    tags: ['Java', 'React', 'Algorithms', 'Data Structures', 'Graph Theory', 'Dynamic Programming'],
    githubUrl: 'https://github.com/Kashyap-jyoti',
    liveUrl: '',
    stars: 31,
    forks: 12,
    caseStudy: {
      problem:    `Students studying DSA struggled to build intuition from pseudocode alone. Existing visualisers were limited to a single algorithm or had no speed controls, making it hard to follow along.`,
      approach:   `Create a unified visualiser where the algorithm engine runs in a Web Worker, emitting a stream of "step" events. The React UI subscribes and renders each step, independent of algorithm logic.`,
      technology: `Java backend for algorithm correctness tests and persisted user progress, React + Canvas API for rendering, Web Workers to offload computation, React Context for global speed/step state.`,
      challenges: `Synchronising the Canvas animation frame rate with user-controlled playback speed without dropped or duplicated frames required a token-bucket scheduler rather than a simple setInterval.`,
      solution:   `Implemented a frame scheduler that buffers emitted steps and drains them at a configurable rate, pausing when the buffer empties or the user hits pause. This decouples computation speed from animation speed entirely.`,
      result:     `31 GitHub stars, 12 forks in 3 months. Used by a local university's intro-to-algorithms course as a supplementary teaching tool.`,
    },
  },
  {
    id: 4,
    title: 'E-Commerce Microservices',
    subtitle: 'Scalable Online Retail Platform',
    problem: `Traditional monolithic e-commerce backends can't scale individual bottlenecks (e.g. checkout) independently, causing site-wide slowdowns during flash sales.`,
    category: 'Java & Spring Boot',
    techStack: [
      { label: 'Spring Boot',  color: '#6DB33F' },
      { label: 'MySQL',        color: '#4479A1' },
      { label: 'Redis',        color: '#DC382D' },
      { label: 'Kafka',        color: '#0D7CE9' },
      { label: 'Docker',       color: '#2496ED' },
    ],
    features: [
      'Product, Order & Inventory services',
      'Redis cache for product catalog',
      'Kafka-driven order events',
      'API Gateway with rate limiting',
    ],
    tags: ['Spring Boot', 'Java', 'Microservices', 'MySQL', 'Redis', 'Docker', 'Kafka'],
    githubUrl: 'https://github.com/Kashyap-jyoti',
    liveUrl: '',
    stars: 15,
    forks: 5,
    caseStudy: {
      problem:    `Flash-sale traffic would overwhelm the checkout service of a monolith, cascading failures across unrelated services like product search and user accounts.`,
      approach:   `Split into five bounded-context microservices (Product, Order, Inventory, Payment, Notification), each with its own DB schema. Services communicate asynchronously via Kafka topics; only synchronous calls are made when the caller needs an immediate response.`,
      technology: `Spring Boot 3 per service, MySQL per service (no shared DB), Redis for product catalog caching (TTL 5 min), Kafka for order-placed / inventory-reserved / payment-confirmed events, Spring Cloud Gateway for API Gateway + rate limiting.`,
      challenges: `Ensuring inventory is not oversold when two orders arrive simultaneously for the last stock unit required a compare-and-swap operation rather than a naive read-then-write.`,
      solution:   `Inventory reservation uses a SQL UPDATE inventory SET quantity = quantity - 1 WHERE id = ? AND quantity > 0 with the affected-rows count checked — zero rows means out-of-stock and the order is rejected before payment is attempted.`,
      result:     `System handled a simulated flash-sale of 5,000 concurrent orders in a load test with 0 oversells and <200ms p99 checkout latency. Inventory and payment services can be scaled independently of product search.`,
    },
  },
];

// ─── Tech badge ───────────────────────────────────────────────────────────────
function TechBadge({ label, color }) {
  return (
    <span
      style={{
        fontSize: '0.72rem',
        padding: '3px 10px',
        borderRadius: '6px',
        background: `${color}18`,
        color: color,
        border: `1px solid ${color}30`,
        fontWeight: 600,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

// ─── Feature row ──────────────────────────────────────────────────────────────
function FeatureItem({ text }) {
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        fontSize: '0.82rem',
        color: '#CBD5E1',
      }}
    >
      <CheckCircle2 size={13} color="#3B82F6" style={{ flexShrink: 0 }} />
      {text}
    </li>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, onSelectProject, index }) {
  const { tiltProps } = useTilt(5, 1.01);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      style={{ height: '100%' }}
    >
      <div
        className="glass glass-shine"
        {...tiltProps}
        style={{
          padding: '26px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          ...tiltProps.style,
        }}
      >
        {/* ── Header ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span
            style={{
              fontSize: '0.72rem',
              fontFamily: "'JetBrains Mono', monospace",
              color: '#60A5FA',
              background: 'rgba(59, 130, 246, 0.1)',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(59, 130, 246, 0.2)',
            }}
          >
            {project.category}
          </span>

          <div style={{ display: 'flex', gap: '10px', color: 'var(--t3)', fontSize: '0.78rem' }}>
            {project.stars !== undefined && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={13} color="#EAB308" /> {project.stars}
              </span>
            )}
            {project.forks !== undefined && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <GitFork size={13} /> {project.forks}
              </span>
            )}
          </div>
        </div>

        {/* ── Title & problem ── */}
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--t1)', marginBottom: '6px', lineHeight: 1.3 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.83rem', color: '#3B82F6', fontStyle: 'italic', marginBottom: '18px', lineHeight: 1.5 }}>
          {project.problem}
        </p>

        {/* ── Tech Stack ── */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
            Tech Stack
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {(project.techStack || project.tags?.map(t => ({ label: t, color: '#60A5FA' }))).map((tech) => (
              <TechBadge key={tech.label} label={tech.label} color={tech.color} />
            ))}
          </div>
        </div>

        {/* ── Key Features ── */}
        {project.features && (
          <div style={{ marginBottom: '22px', flex: 1 }}>
            <div style={{ fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
              Key Features
            </div>
            <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px' }}>
              {project.features.map((f) => (
                <FeatureItem key={f} text={f} />
              ))}
            </ul>
          </div>
        )}

        {/* ── Actions ── */}
        <div
          style={{
            paddingTop: '16px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {project.liveUrl && (
            <RippleButton
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-s"
              style={{ padding: '8px 14px', fontSize: '0.8rem', gap: '6px' }}
            >
              <ExternalLink size={14} />
              Live Demo
            </RippleButton>
          )}

          {project.githubUrl && (
            <RippleButton
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-s"
              style={{ padding: '8px 14px', fontSize: '0.8rem', gap: '6px' }}
            >
              <Github size={14} />
              GitHub
            </RippleButton>
          )}

          <RippleButton
            onClick={() => onSelectProject(project)}
            className="btn-p"
            style={{ padding: '8px 16px', fontSize: '0.8rem', gap: '6px', marginLeft: 'auto' }}
          >
            <BookOpen size={14} />
            Case Study
          </RippleButton>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Projects section ────────────────────────────────────────────────────
export default function Projects({ onSelectProject }) {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        if (data && data.length > 0) setProjects(data);
      })
      .catch(() => {});
  }, []);

  const categories = ['All', 'Java & Spring Boot', 'Java Full Stack', 'Algorithms'];
  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="sec-wrap">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="sec-lbl">
          <FolderGit2 size={16} />
          <span>Featured Engineering Works</span>
        </div>
        <h2 className="sec-ttl">Real-World Projects &amp; Systems</h2>
        <p className="sec-sub" style={{ marginBottom: '32px' }}>
          End-to-end full-stack platforms and backend systems — each card shows the engineering story behind the code. Click{' '}
          <strong style={{ color: '#60A5FA' }}>Case Study</strong> to see the real problem-solving process.
        </p>

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                border: filter === cat ? '1px solid #3B82F6' : '1px solid var(--bor)',
                background: filter === cat ? 'rgba(59, 130, 246, 0.2)' : 'var(--btn-s-bg)',
                color: filter === cat ? '#3B82F6' : 'var(--t2)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Cards grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
            gap: '28px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id || project._id || idx}
                project={project}
                onSelectProject={onSelectProject}
                index={idx}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
