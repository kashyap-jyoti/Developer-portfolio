import React from 'react';
import { motion } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';
import RippleButton from './RippleButton';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 350, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(96, 165, 250, 0.35)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 50px rgba(59, 130, 246, 0.25)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <RippleButton
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            color: '#CBD5E1',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </RippleButton>

        <span style={{ fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", color: '#60A5FA', background: 'rgba(59, 130, 246, 0.1)', padding: '4px 12px', borderRadius: '6px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          {project.category}
        </span>

        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginTop: '14px', marginBottom: '6px' }}>
          {project.title}
        </h2>
        <p style={{ color: '#60A5FA', fontSize: '0.95rem', fontWeight: 500, marginBottom: '20px' }}>
          {project.subtitle}
        </p>

        <p style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '24px' }}>
          {project.longDescription || project.description}
        </p>

        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '10px' }}>Technologies & Architecture</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.tags?.map((tag) => (
              <span key={tag} style={{ fontSize: '0.78rem', padding: '5px 12px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', color: '#60A5FA', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '14px' }}>
          {project.githubUrl && (
            <RippleButton href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-p">
              <Github size={18} />
              <span>View Source Code</span>
            </RippleButton>
          )}
          {project.liveUrl && (
            <RippleButton href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-s">
              <ExternalLink size={18} />
              <span>Live Demo</span>
            </RippleButton>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
