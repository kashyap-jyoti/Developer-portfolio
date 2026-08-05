import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, ExternalLink, Github, Star, GitFork, ArrowRight } from 'lucide-react';
import { fetchProjects } from '../services/api';
import RippleButton from './RippleButton';
import { useTilt } from '../hooks/useTilt';

// Fallback static projects – shown when backend is unavailable
const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'Enterprise Banking Platform',
    subtitle: 'High-Concurrency Distributed Backend',
    description: 'Production-grade banking system with Spring Boot microservices, JWT security, Kafka event streaming, and real-time transaction processing supporting 10,000+ concurrent users.',
    longDescription: 'Built with Spring Boot 3, Java 21, PostgreSQL, and Kafka for event-driven architecture. Includes JWT-based authentication, role-based access control, and distributed transaction management.',
    category: 'Java & Spring Boot',
    tags: ['Java 21', 'Spring Boot 3', 'Kafka', 'PostgreSQL', 'JWT', 'Microservices', 'Docker'],
    githubUrl: 'https://github.com/Kashyap-jyoti',
    stars: 24,
    forks: 7
  },
  {
    id: 2,
    title: 'Java Full Stack Portfolio Platform',
    subtitle: 'Interactive Developer Portfolio with AI Chat',
    description: 'This portfolio platform itself — a full-stack web application with Java Spring Boot backend, React frontend, MySQL database, and an integrated AI assistant powered by a custom REST API.',
    longDescription: 'Built with React, Java Spring Boot, MySQL, and GSAP animations. Features a Nova AI assistant, command palette, animated sections, custom cursor, and smooth page transitions.',
    category: 'Java Full Stack',
    tags: ['React', 'Java', 'Spring Boot', 'MySQL', 'REST API', 'GSAP', 'Framer Motion'],
    githubUrl: 'https://github.com/Kashyap-jyoti',
    stars: 18,
    forks: 4
  },
  {
    id: 3,
    title: 'DSA Algorithm Visualizer',
    subtitle: 'Interactive Algorithm & Data Structure Demos',
    description: 'A web-based visualizer for sorting algorithms, graph traversals (BFS/DFS), dynamic programming problems, and tree operations with step-by-step execution playback.',
    longDescription: 'Demonstrates 30+ algorithms including QuickSort, MergeSort, Dijkstra, Bellman-Ford, and various DP patterns with animated step-by-step visualization.',
    category: 'Algorithms',
    tags: ['Java', 'React', 'Algorithms', 'Data Structures', 'Graph Theory', 'Dynamic Programming'],
    githubUrl: 'https://github.com/Kashyap-jyoti',
    stars: 31,
    forks: 12
  },
  {
    id: 4,
    title: 'E-Commerce Microservices',
    subtitle: 'Scalable Online Retail Platform',
    description: 'Full-featured e-commerce backend with product catalog, order management, inventory tracking, and payment processing built on Spring Boot microservices architecture.',
    longDescription: 'Microservices include: Product Service, Order Service, Inventory Service, Payment Service, and API Gateway — all communicating via REST APIs and Kafka events.',
    category: 'Java & Spring Boot',
    tags: ['Spring Boot', 'Java', 'Microservices', 'MySQL', 'Redis', 'Docker', 'Kafka'],
    githubUrl: 'https://github.com/Kashyap-jyoti',
    stars: 15,
    forks: 5
  }
];

function ProjectCard({ project, onSelectProject, index }) {
  const { tiltProps } = useTilt(6, 1.01);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
    >
      <div
        className="glass glass-shine"
        {...tiltProps}
        style={{
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          position: 'relative',
          ...tiltProps.style
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span
              style={{
                fontSize: '0.74rem',
                fontFamily: "'JetBrains Mono', monospace",
                color: '#60A5FA',
                background: 'rgba(59, 130, 246, 0.1)',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}
            >
              {project.category}
            </span>

            <div style={{ display: 'flex', gap: '12px', color: '#64748B', fontSize: '0.8rem' }}>
              {project.stars !== undefined && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={14} color="#EAB308" /> {project.stars}
                </span>
              )}
              {project.forks !== undefined && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <GitFork size={14} /> {project.forks}
                </span>
              )}
            </div>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
            {project.title}
          </h3>
          <p style={{ fontSize: '0.84rem', color: '#60A5FA', marginBottom: '14px', fontWeight: 500 }}>
            {project.subtitle}
          </p>
          <p style={{ fontSize: '0.9rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '20px' }}>
            {project.description}
          </p>

          {/* Tags with staggered animation */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
            {project.tags?.map((tag, tagIdx) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: tagIdx * 0.05 }}
                style={{
                  fontSize: '0.74rem',
                  padding: '3px 9px',
                  background: 'rgba(15, 23, 42, 0.7)',
                  borderRadius: '6px',
                  color: '#94A3B8',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {project.githubUrl && (
              <RippleButton href={project.githubUrl} target="_blank" rel="noreferrer" style={{ color: '#CBD5E1', background: 'none', border: 'none', padding: '6px' }}>
                <Github size={20} />
              </RippleButton>
            )}
            {project.liveUrl && (
              <RippleButton href={project.liveUrl} target="_blank" rel="noreferrer" style={{ color: '#CBD5E1', background: 'none', border: 'none', padding: '6px' }}>
                <ExternalLink size={20} />
              </RippleButton>
            )}
          </div>

          <RippleButton
            onClick={() => onSelectProject(project)}
            style={{
              background: 'none',
              border: 'none',
              color: '#3B82F6',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'inherit',
              padding: '6px 12px',
              borderRadius: '8px'
            }}
          >
            <span>Details</span>
            <ArrowRight size={14} />
          </RippleButton>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ onSelectProject }) {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchProjects().then((data) => {
      if (data && data.length > 0) {
        setProjects(data);
      }
      // If backend returns empty/fails, keep showing fallback data
    }).catch(() => {
      // Silently keep fallback data
    });
  }, []);

  const categories = ['All', 'Java & Spring Boot', 'Java Full Stack', 'Algorithms'];

  const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

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
          Dynamic full-stack platforms and backend microservices — from enterprise banking backends to AI-powered portfolio platforms.
        </p>

        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                position: 'relative',
                padding: '8px 18px',
                borderRadius: '999px',
                border: filter === cat ? '1px solid #3B82F6' : '1px solid rgba(59, 130, 246, 0.18)',
                background: filter === cat ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                color: filter === cat ? '#fff' : '#CBD5E1',
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit'
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Project Cards Grid with Layout Animations */}
        <motion.div
          layout
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', gap: '28px' }}
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
