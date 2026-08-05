import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Trophy,
  Target,
  Flame,
  ShieldCheck,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Zap,
  Compass,
  Award,
  Sparkles,
  Lock,
  Star
} from 'lucide-react';
import { useTilt } from '../hooks/useTilt';
import { useCounter } from '../hooks/useCounter';
import RippleButton from './RippleButton';
import LeetCodeIcon from './LeetCodeIcon';
import { useResponsive } from '../hooks/useResponsive';

export default function DSA() {
  const [inView, setInView] = useState(false);
  const { isMobile, isTablet } = useResponsive();
  const isNarrow = isMobile || isTablet;

  // Animated counters triggered when section enters view
  const solvedCount = useCounter(500, inView);
  const streakCount = useCounter(124, inView);
  const readinessCount = useCounter(88, inView);
  const progressCount = useCounter(86, inView);

  // Mouse spotlight position
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Learning Milestones Roadmap
  const milestones = [
    { id: 1, title: 'Programming Fundamentals', status: 'completed', desc: 'Syntax, Logic & Core Foundations' },
    { id: 2, title: 'Problem Solving Basics', status: 'completed', desc: 'Elementary Logic & Patterns' },
    { id: 3, title: 'Data Structures', status: 'completed', desc: 'Memory Layouts & Node Structures' },
    { id: 4, title: 'Algorithms', status: 'completed', desc: 'Sorting, Searching & Traversals' },
    { id: 5, title: 'Optimization Techniques', status: 'current', desc: 'Time & Space Complexity Pruning' },
    { id: 6, title: 'Interview Preparation', status: 'current', desc: 'Mock Engineering Technical Rounds' },
    { id: 7, title: 'Continuous Learning', status: 'future', desc: 'Advanced System Architecture' }
  ];

  // Achievement Badges
  const achievements = [
    { title: 'Consistency', metric: '100+ Days Active Coding', icon: Flame, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
    { title: 'Problem Solver', metric: '500+ Solved Challenges', icon: Trophy, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
    { title: 'Algorithm Explorer', metric: 'Multi-Paradigm Mastery', icon: Compass, color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
    { title: 'Quick Learner', metric: 'Rapid Pattern Recognition', icon: Zap, color: '#EC4899', bg: 'rgba(236, 72, 153, 0.1)' },
    { title: '100+ Problems', metric: 'Milestone Excellence', icon: Award, color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' }
  ];

  return (
    <section
      id="dsa"
      onMouseMove={handleMouseMove}
      className="sec-wrap"
      style={{ position: 'relative', overflow: 'hidden', paddingTop: '100px', paddingBottom: '100px' }}
    >
      {/* Background Mouse Spotlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(700px circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.08), transparent 80%)`,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => setInView(true)}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '44px', gap: '20px' }}
        >
          <div>
            <div className="sec-lbl">
              <Code2 size={16} />
              <span>Algorithmic Growth & Problem Solving</span>
            </div>
            <h2 className="sec-ttl">DSA Journey</h2>
            <p className="sec-sub" style={{ lineHeight: 1.7, margin: 0 }}>
              A snapshot of my continuous journey to strengthen problem-solving skills through consistent practice and algorithmic thinking.
            </p>
          </div>

          <RippleButton
            href="https://leetcode.com/u/Jyoti_Kashyap/"
            target="_blank"
            rel="noreferrer"
            className="btn-s"
            style={{ padding: '10px 18px', fontSize: '0.85rem' }}
          >
            <LeetCodeIcon size={18} color="#FFA116" />
            <span>Visit LeetCode Profile</span>
          </RippleButton>
        </motion.div>

        {/* SUMMARY CARDS GRID */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginBottom: '50px' }}
        >
          {/* Card 1: Total Solved */}
          <motion.div whileHover={{ y: -4, scale: 1.02 }} className="glass2 glass-shine" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600 }}>Total Problems Solved</span>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.12)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trophy size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', fontFamily: "'JetBrains Mono', monospace" }}>
              {solvedCount}+
            </div>
            <div style={{ fontSize: '0.72rem', color: '#60A5FA', marginTop: '4px', fontFamily: "'JetBrains Mono', monospace" }}>
              LeetCode & GFG Score
            </div>
          </motion.div>

          {/* Card 2: Current Learning Focus */}
          <motion.div whileHover={{ y: -4, scale: 1.02 }} className="glass2 glass-shine" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600 }}>Current Learning Focus</span>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.12)', color: '#A855F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Target size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#A855F7', marginTop: '6px', lineHeight: 1.3 }}>
              Advanced Optimization & System Design
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '6px' }}>
              Time/Space Pruning Focus
            </div>
          </motion.div>

          {/* Card 3: Coding Streak */}
          <motion.div whileHover={{ y: -4, scale: 1.02 }} className="glass2 glass-shine" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600 }}>Coding Streak</span>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.12)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Flame size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#F59E0B', fontFamily: "'JetBrains Mono', monospace" }}>
              {streakCount} Days
            </div>
            <div style={{ fontSize: '0.72rem', color: '#F59E0B', marginTop: '4px', fontFamily: "'JetBrains Mono', monospace" }}>
              Active Daily Practice 🔥
            </div>
          </motion.div>

          {/* Card 4: Interview Readiness */}
          <motion.div whileHover={{ y: -4, scale: 1.02 }} className="glass2 glass-shine" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600 }}>Interview Readiness</span>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.12)', color: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#22C55E', fontFamily: "'JetBrains Mono', monospace" }}>
              {readinessCount}%
            </div>
            <div style={{ fontSize: '0.72rem', color: '#22C55E', marginTop: '4px', fontWeight: 600 }}>
              SDE Technical Round Ready
            </div>
          </motion.div>

          {/* Card 5: Overall Progress */}
          <motion.div whileHover={{ y: -4, scale: 1.02 }} className="glass2 glass-shine" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600 }}>Overall Progress</span>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(96, 165, 250, 0.12)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#60A5FA', fontFamily: "'JetBrains Mono', monospace" }}>
              {progressCount}%
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>
              Milestones Mastered
            </div>
          </motion.div>

          {/* Card 6: Last Updated */}
          <motion.div whileHover={{ y: -4, scale: 1.02 }} className="glass2 glass-shine" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600 }}>Last Updated</span>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.08)', color: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginTop: '6px' }}>
              July 2026
            </div>
            <div style={{ fontSize: '0.72rem', color: '#60A5FA', marginTop: '6px', fontFamily: "'JetBrains Mono', monospace" }}>
              Active Sync
            </div>
          </motion.div>
        </motion.div>

        {/* PROGRESS TIMELINE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '50px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
            <TrendingUp size={20} color="#3B82F6" />
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>Learning Progress Timeline</h3>
          </div>

          <div
            className="glass"
            style={{
              padding: '30px 24px',
              overflowX: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              scrollbarWidth: 'thin'
            }}
          >
            {milestones.map((m, idx) => {
              const isCompleted = m.status === 'completed';
              const isCurrent = m.status === 'current';

              return (
                <React.Fragment key={m.id}>
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    style={{
                      flexShrink: 0,
                      width: '210px',
                      padding: '16px 18px',
                      borderRadius: '14px',
                      background: isCurrent
                        ? 'rgba(168, 85, 247, 0.15)'
                        : isCompleted
                        ? 'rgba(59, 130, 246, 0.1)'
                        : 'rgba(15, 23, 42, 0.5)',
                      border: isCurrent
                        ? '1px solid #A855F7'
                        : isCompleted
                        ? '1px solid rgba(59, 130, 246, 0.35)'
                        : '1px solid rgba(255,255,255,0.06)',
                      boxShadow: isCurrent
                        ? '0 0 20px rgba(168, 85, 247, 0.35)'
                        : isCompleted
                        ? '0 0 15px rgba(59, 130, 246, 0.15)'
                        : 'none',
                      opacity: m.status === 'future' ? 0.45 : 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.7rem', color: '#64748B', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                        STEP 0{m.id}
                      </span>
                      {isCompleted ? (
                        <motion.div
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                        >
                          <CheckCircle2 size={18} color="#3B82F6" />
                        </motion.div>
                      ) : isCurrent ? (
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#A855F7', boxShadow: '0 0 12px #A855F7' }}
                        />
                      ) : (
                        <Lock size={15} color="#64748B" />
                      )}
                    </div>

                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: isCurrent ? '#A855F7' : isCompleted ? '#fff' : '#64748B' }}>
                      {m.title}
                    </h4>
                    <p style={{ fontSize: '0.74rem', color: '#94A3B8', lineHeight: 1.4 }}>
                      {m.desc}
                    </p>
                  </motion.div>

                  {idx < milestones.length - 1 && (
                    <ArrowRight size={16} color="#64748B" style={{ flexShrink: 0 }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </motion.div>

        {/* ACHIEVEMENTS & INTERVIEW READINESS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '1.2fr 0.8fr', gap: '28px' }}>
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Sparkles size={20} color="#EAB308" />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>Achievements & Badges</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: '16px' }}>
              {achievements.map((a, idx) => {
                const IconComp = a.icon;
                return (
                  <motion.div
                    key={a.title}
                    whileHover={{ scale: 1.05, y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="glass2 glass-shine"
                    style={{
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '10px',
                      border: `1px solid ${a.color}35`,
                      boxShadow: `0 8px 25px rgba(0,0,0,0.3), 0 0 15px ${a.color}1F`
                    }}
                  >
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: a.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: a.color
                      }}
                    >
                      <IconComp size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{a.title}</h4>
                      <p style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '2px', fontFamily: "'JetBrains Mono', monospace" }}>{a.metric}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Interview Readiness Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <ShieldCheck size={20} color="#22C55E" />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>Interview Readiness</h3>
            </div>

            <div className="glass glass-shine" style={{ padding: '28px', height: 'calc(100% - 44px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.86rem', color: '#CBD5E1', fontWeight: 600 }}>Current Preparation Level</span>
                  <span style={{ fontSize: '0.86rem', color: '#22C55E', fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>88% Ready</span>
                </div>

                <div style={{ width: '100%', height: '8px', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '999px', overflow: 'hidden', marginBottom: '20px' }}>
                  <div style={{ width: '88%', height: '100%', background: 'linear-gradient(90deg, #22C55E, #3B82F6)', borderRadius: '999px' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ color: '#94A3B8' }}>Confidence Meter:</span>
                    <span style={{ color: '#60A5FA', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>8.5 / 10</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ color: '#94A3B8' }}>Practice Consistency:</span>
                    <span style={{ color: '#22C55E', fontWeight: 700 }}>High (Daily Solving)</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ color: '#94A3B8' }}>Next Goal:</span>
                    <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.82rem', lineHeight: 1.4 }}>
                      Mastering Complex System Architecture & High-Concurrency Systems
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
