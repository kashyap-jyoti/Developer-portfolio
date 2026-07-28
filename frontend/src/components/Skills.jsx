import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layers } from 'lucide-react';
import { fetchSkills } from '../services/api';
import { useTilt } from '../hooks/useTilt';

function SkillCard({ category, filtered, index }) {
  const { tiltProps } = useTilt(8, 1.02);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <div
        className="glass glass-shine"
        {...tiltProps}
        style={{
          padding: '28px',
          height: '100%',
          ...tiltProps.style
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}
          >
            <Layers size={18} />
          </motion.div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{category}</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map((skill) => (
            <div key={skill.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.86rem' }}>
                <span style={{ color: '#CBD5E1', fontWeight: 500 }}>{skill.name}</span>
                <span style={{ color: '#60A5FA', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem' }}>{skill.proficiency}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '999px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #3B82F6, #1D4ED8, #60A5FA)',
                    borderRadius: '999px',
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchSkills().then((data) => {
      setSkills(data);
    });
  }, []);

  const categories = ['Core Backend', 'Frontend & MERN', 'Database & Cloud', 'Tools & DevOps'];

  return (
    <section id="skills" className="sec-wrap">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="sec-lbl">
          <Cpu size={16} />
          <span>Technical Arsenal</span>
        </div>
        <h2 className="sec-ttl">Languages, Frameworks & Infrastructure</h2>
        <p className="sec-sub" style={{ marginBottom: '40px' }}>
          A comprehensive overview of my technical stack across Java enterprise backends, MERN applications, and database architectures.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {categories.map((category, idx) => {
            const filtered = skills.filter((s) => s.category === category);
            return <SkillCard key={category} category={category} filtered={filtered} index={idx} />;
          })}
        </div>
      </motion.div>
    </section>
  );
}
