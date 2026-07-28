import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, ExternalLink, Github, Star, GitFork, ArrowRight } from 'lucide-react';
import { fetchProjects } from '../services/api';
import RippleButton from './RippleButton';
import { useTilt } from '../hooks/useTilt';

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
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
    });
  }, []);

  const categories = ['All', 'Java & Spring Boot', 'MERN Stack', 'Algorithms'];

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
        <h2 className="sec-ttl">Real-World Projects & Systems</h2>
        <p className="sec-sub" style={{ marginBottom: '32px' }}>
          Dynamic full-stack platforms and backend microservices fetched directly from the Express REST API & MongoDB database.
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
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}
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
