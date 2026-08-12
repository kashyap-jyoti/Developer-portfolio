import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  GitCommit,
  GitFork,
  Star,
  BookOpen,
  Code2,
  Activity,
  Flame,
  Calendar,
  ExternalLink,
  Search,
  Filter,
  Sparkles,
  Zap,
  TrendingUp,
  FolderGit2,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { fetchGithubData } from '../services/githubService';
import { useResponsive } from '../hooks/useResponsive';
import { useCounter } from '../hooks/useCounter';
import RippleButton from './RippleButton';

export default function GithubActivity() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [repoFilter, setRepoFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredDay, setHoveredDay] = useState(null);
  const [inView, setInView] = useState(false);

  const { isMobile, isTablet } = useResponsive();
  const isNarrow = isMobile || isTablet;

  useEffect(() => {
    let mounted = true;
    fetchGithubData().then((res) => {
      if (mounted) {
        setData(res);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Counters for numbers when section enters view
  const totalContributionsCount = useCounter(data?.contributions?.totalContributions || 486, inView);
  const streakCount = useCounter(data?.contributions?.currentStreak || 14, inView);
  const reposCount = useCounter(data?.profile?.public_repos || 6, inView);
  const activeDaysCount = useCounter(data?.contributions?.activeDays || 178, inView);

  // Months labels positioning for heatmap
  const monthLabels = useMemo(() => {
    if (!data?.contributions?.days) return [];
    const labels = [];
    let lastMonth = '';

    data.contributions.days.forEach((day, index) => {
      if (day.month !== lastMonth && index % 7 === 0) {
        labels.push({ month: day.month, index: Math.floor(index / 7) });
        lastMonth = day.month;
      }
    });
    return labels;
  }, [data]);

  // Filter Repositories
  const filteredRepos = useMemo(() => {
    if (!data?.repos) return [];
    return data.repos.filter((repo) => {
      // Language match
      if (selectedLanguage !== 'All' && repo.language !== selectedLanguage) {
        return false;
      }
      // Type/Filter match
      if (repoFilter === 'Starred' && repo.stargazers_count === 0) {
        return false;
      }
      if (repoFilter === 'Featured' && !['Developer-portfolio', 'Paint-shop-website', 'smart-lms-mern'].includes(repo.name)) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = repo.name.toLowerCase().includes(q);
        const descMatch = (repo.description || '').toLowerCase().includes(q);
        const langMatch = (repo.language || '').toLowerCase().includes(q);
        return nameMatch || descMatch || langMatch;
      }
      return true;
    });
  }, [data, selectedLanguage, repoFilter, searchQuery]);

  if (loading || !data) {
    return (
      <section id="github" className="sec-wrap" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="glass" style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            style={{ display: 'inline-block', color: '#3B82F6', marginBottom: '16px' }}
          >
            <Github size={36} />
          </motion.div>
          <div style={{ color: 'var(--t2)', fontSize: '0.95rem' }}>Fetching live GitHub data...</div>
        </div>
      </section>
    );
  }

  const { profile, contributions, languages, events } = data;

  return (
    <section
      id="github"
      className="sec-wrap"
      style={{ position: 'relative', overflow: 'hidden', paddingTop: '100px', paddingBottom: '100px' }}
    >
      {/* Background Glow Overlay */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.07) 0%, transparent 70%)',
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
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '44px',
            gap: '20px'
          }}
        >
          <div>
            <div className="sec-lbl">
              <Github size={16} />
              <span>Verified Engineering Footprint</span>
            </div>
            <h2 className="sec-ttl">GitHub Activity</h2>
            <p className="sec-sub" style={{ lineHeight: 1.7, margin: 0 }}>
              Live activity metrics, open-source contribution heatmap, repository breakdown, and language distribution for{' '}
              <strong style={{ color: '#60A5FA' }}>@{data.username}</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Actively Building Status Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '999px',
                background: 'rgba(34, 197, 94, 0.12)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                color: '#22C55E',
                fontSize: '0.8rem',
                fontWeight: 600,
                fontFamily: "'JetBrains Mono', monospace"
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 10px #22C55E' }}
              />
              <span>Actively Building</span>
            </div>

            <RippleButton
              href={profile.html_url}
              target="_blank"
              rel="noreferrer"
              className="btn-s"
              style={{ padding: '10px 18px', fontSize: '0.85rem' }}
            >
              <Github size={18} />
              <span>Visit GitHub Profile</span>
              <ExternalLink size={14} style={{ opacity: 0.7 }} />
            </RippleButton>
          </div>
        </motion.div>

        {/* METRICS SUMMARY CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '18px',
            marginBottom: '40px'
          }}
        >
          {/* Card 1: Total Contributions */}
          <motion.div whileHover={{ y: -4, scale: 1.02 }} className="glass2 glass-shine" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--t3)', fontWeight: 600 }}>Total Contributions</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.14)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GitCommit size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--t1)', fontFamily: "'JetBrains Mono', monospace" }}>
              {totalContributionsCount}+
            </div>
            <div style={{ fontSize: '0.72rem', color: '#60A5FA', marginTop: '4px', fontFamily: "'JetBrains Mono', monospace" }}>
              Commits & Pull Requests (1 Year)
            </div>
          </motion.div>

          {/* Card 2: Public Repositories */}
          <motion.div whileHover={{ y: -4, scale: 1.02 }} className="glass2 glass-shine" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--t3)', fontWeight: 600 }}>Public Repositories</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.14)', color: '#A855F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#A855F7', fontFamily: "'JetBrains Mono', monospace" }}>
              {reposCount}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--t3)', marginTop: '4px' }}>
              Open Source Repositories
            </div>
          </motion.div>

          {/* Card 3: Active Streak */}
          <motion.div whileHover={{ y: -4, scale: 1.02 }} className="glass2 glass-shine" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--t3)', fontWeight: 600 }}>Current Commit Streak</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.14)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Flame size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#F59E0B', fontFamily: "'JetBrains Mono', monospace" }}>
              {streakCount} Days
            </div>
            <div style={{ fontSize: '0.72rem', color: '#F59E0B', marginTop: '4px', fontWeight: 600 }}>
              Max Streak: {contributions.maxStreak} Days 🔥
            </div>
          </motion.div>

          {/* Card 4: Active Coding Days */}
          <motion.div whileHover={{ y: -4, scale: 1.02 }} className="glass2 glass-shine" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--t3)', fontWeight: 600 }}>Active Coding Days</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.14)', color: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#22C55E', fontFamily: "'JetBrains Mono', monospace" }}>
              {activeDaysCount} Days
            </div>
            <div style={{ fontSize: '0.72rem', color: '#22C55E', marginTop: '4px', fontWeight: 600 }}>
              {Math.round((contributions.activeDays / 365) * 100)}% Annual Active Frequency
            </div>
          </motion.div>
        </motion.div>

        {/* 1. CONTRIBUTIONS HEATMAP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '50px' }}
        >
          <div className="glass glass-shine" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Activity size={20} color="#3B82F6" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--t1)', margin: 0 }}>
                  Contributions Calendar (365 Days)
                </h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--t3)', fontFamily: "'JetBrains Mono', monospace" }}>
                <span>Less</span>
                <span style={{ width: '11px', height: '11px', borderRadius: '2px', background: 'var(--sur2)', border: '1px solid var(--bor)' }} />
                <span style={{ width: '11px', height: '11px', borderRadius: '2px', background: 'rgba(59, 130, 246, 0.35)' }} />
                <span style={{ width: '11px', height: '11px', borderRadius: '2px', background: 'rgba(59, 130, 246, 0.65)' }} />
                <span style={{ width: '11px', height: '11px', borderRadius: '2px', background: '#3B82F6' }} />
                <span style={{ width: '11px', height: '11px', borderRadius: '2px', background: '#60A5FA', boxShadow: '0 0 6px #60A5FA' }} />
                <span>More</span>
              </div>
            </div>

            {/* Heatmap Grid Container */}
            <div style={{ position: 'relative', overflowX: 'auto', paddingBottom: '8px' }}>
              {/* Month Labels Bar */}
              <div style={{ display: 'flex', marginLeft: '32px', marginBottom: '8px', fontSize: '0.7rem', color: 'var(--t3)', fontFamily: "'JetBrains Mono', monospace" }}>
                {monthLabels.map((lbl, idx) => (
                  <div key={idx} style={{ position: 'absolute', left: `${lbl.index * 15 + 32}px` }}>
                    {lbl.month}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '4px', marginTop: '20px' }}>
                {/* Day of Week Labels */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '0.65rem', color: 'var(--t3)', fontFamily: "'JetBrains Mono', monospace", width: '26px', flexShrink: 0 }}>
                  <span style={{ height: '11px', lineHeight: '11px' }}></span>
                  <span style={{ height: '11px', lineHeight: '11px' }}>Mon</span>
                  <span style={{ height: '11px', lineHeight: '11px' }}></span>
                  <span style={{ height: '11px', lineHeight: '11px' }}>Wed</span>
                  <span style={{ height: '11px', lineHeight: '11px' }}></span>
                  <span style={{ height: '11px', lineHeight: '11px' }}>Fri</span>
                  <span style={{ height: '11px', lineHeight: '11px' }}></span>
                </div>

                {/* 52 Columns Grid */}
                <div style={{ display: 'flex', gap: '3px', flex: 1 }}>
                  {Array.from({ length: 52 }).map((_, colIdx) => {
                    const colDays = contributions.days.slice(colIdx * 7, colIdx * 7 + 7);
                    return (
                      <div key={colIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {colDays.map((day, rowIdx) => {
                          const getBg = (lvl) => {
                            if (lvl === 0) return 'var(--sur2)';
                            if (lvl === 1) return 'rgba(59, 130, 246, 0.35)';
                            if (lvl === 2) return 'rgba(59, 130, 246, 0.65)';
                            if (lvl === 3) return '#3B82F6';
                            return '#60A5FA';
                          };
                          const getBoxShadow = (lvl) => {
                            if (lvl === 4) return '0 0 8px rgba(96, 165, 250, 0.8)';
                            if (lvl === 3) return '0 0 5px rgba(59, 130, 246, 0.5)';
                            return 'none';
                          };

                          return (
                            <motion.div
                              key={day.date || rowIdx}
                              whileHover={{ scale: 1.4, zIndex: 10 }}
                              onMouseEnter={() => setHoveredDay(day)}
                              onMouseLeave={() => setHoveredDay(null)}
                              style={{
                                width: '11px',
                                height: '11px',
                                borderRadius: '2px',
                                background: getBg(day.level),
                                boxShadow: getBoxShadow(day.level),
                                border: day.level === 0 ? '1px solid var(--bor)' : 'none',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Hover Tooltip Info */}
              <div style={{ minHeight: '24px', marginTop: '14px', fontSize: '0.78rem', color: '#60A5FA', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
                {hoveredDay ? (
                  <span>
                    ⚡ <strong>{hoveredDay.count}</strong> contributions on {hoveredDay.date}
                  </span>
                ) : (
                  <span style={{ color: 'var(--t3)', fontWeight: 400 }}>Hover over any cell to inspect daily commit counts</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. MOST-USED LANGUAGES */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '50px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Code2 size={20} color="#A855F7" />
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--t1)', margin: 0 }}>
              Most-Used Languages
            </h3>
          </div>

          <div className="glass glass-shine" style={{ padding: '26px' }}>
            {/* Stacked Percentage Bar */}
            <div style={{ width: '100%', height: '12px', borderRadius: '999px', overflow: 'hidden', display: 'flex', marginBottom: '22px', border: '1px solid var(--bor)' }}>
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  title={`${lang.name}: ${lang.percentage}%`}
                  style={{
                    width: `${lang.percentage}%`,
                    height: '100%',
                    background: lang.color,
                    transition: 'width 0.6s ease'
                  }}
                />
              ))}
            </div>

            {/* Language Breakdown Cards & Interactive Filters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedLanguage('All')}
                style={{
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: selectedLanguage === 'All' ? 'rgba(59, 130, 246, 0.15)' : 'var(--sur2)',
                  border: selectedLanguage === 'All' ? '1px solid #3B82F6' : '1px solid var(--bor)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Filter size={16} color="#3B82F6" />
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--t1)' }}>All Languages</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#60A5FA', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                  {data.repos.length} repos
                </span>
              </motion.div>

              {languages.map((lang) => {
                const isSelected = selectedLanguage === lang.name;
                return (
                  <motion.div
                    key={lang.name}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setSelectedLanguage(isSelected ? 'All' : lang.name)}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '12px',
                      background: isSelected ? `${lang.color}25` : 'var(--sur2)',
                      border: isSelected ? `1px solid ${lang.color}` : '1px solid var(--bor)',
                      boxShadow: isSelected ? `0 0 14px ${lang.color}40` : 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: lang.color, boxShadow: `0 0 6px ${lang.color}` }} />
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--t1)' }}>{lang.name}</span>
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: lang.color, fontFamily: "'JetBrains Mono', monospace" }}>
                      {lang.percentage}%
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* 3. REPOSITORIES GRID */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '50px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FolderGit2 size={20} color="#3B82F6" />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--t1)', margin: 0 }}>
                Repositories ({filteredRepos.length})
              </h3>
            </div>

            {/* Filter Pills & Search Input */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', width: isNarrow ? '100%' : 'auto' }}>
              {/* Search Box */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--sur2)',
                  border: '1px solid var(--bor)',
                  borderRadius: '10px',
                  padding: '6px 12px',
                  flex: isNarrow ? 1 : 'none',
                  minWidth: '180px'
                }}
              >
                <Search size={14} color="var(--t3)" />
                <input
                  type="text"
                  placeholder="Filter repos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--t1)',
                    fontSize: '0.82rem',
                    width: '100%',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Filter Tabs */}
              {['All', 'Featured', 'Starred'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setRepoFilter(tab)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: repoFilter === tab ? 700 : 500,
                    background: repoFilter === tab ? '#3B82F6' : 'var(--sur2)',
                    color: repoFilter === tab ? '#ffffff' : 'var(--t2)',
                    border: repoFilter === tab ? '1px solid #3B82F6' : '1px solid var(--bor)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Repositories Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '20px' }}>
            <AnimatePresence>
              {filteredRepos.map((repo) => (
                <motion.div
                  key={repo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="glass glass-shine"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    gap: '16px',
                    border: '1px solid var(--bor)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: 'none', color: 'var(--t1)' }}
                      >
                        <h4
                          style={{
                            fontSize: '1.05rem',
                            fontWeight: 800,
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#60A5FA',
                            wordBreak: 'break-word'
                          }}
                        >
                          <BookOpen size={16} color="#3B82F6" style={{ flexShrink: 0 }} />
                          {repo.name}
                        </h4>
                      </a>

                      <RippleButton
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        title="View Repo"
                        style={{ padding: '6px', background: 'none', border: 'none', color: 'var(--t3)' }}
                      >
                        <ExternalLink size={16} />
                      </RippleButton>
                    </div>

                    <p style={{ fontSize: '0.82rem', color: 'var(--t2)', lineHeight: 1.5, marginBottom: '14px' }}>
                      {repo.description}
                    </p>

                    {/* Topics badges if available */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                        {repo.topics.slice(0, 4).map((topic) => (
                          <span
                            key={topic}
                            style={{
                              fontSize: '0.68rem',
                              padding: '2px 8px',
                              borderRadius: '6px',
                              background: 'rgba(59, 130, 246, 0.1)',
                              color: '#60A5FA',
                              border: '1px solid rgba(59, 130, 246, 0.2)',
                              fontFamily: "'JetBrains Mono', monospace"
                            }}
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer Info */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--bor)', fontSize: '0.75rem', color: 'var(--t3)', fontFamily: "'JetBrains Mono', monospace" }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: repo.language === 'Java' ? '#B07219' : repo.language === 'JavaScript' ? '#F7DF1E' : repo.language === 'Python' ? '#3572A5' : '#3B82F6' }} />
                      <span style={{ fontWeight: 600, color: 'var(--t1)' }}>{repo.language}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={13} color="#F59E0B" />
                        {repo.stargazers_count}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <GitFork size={13} color="#3B82F6" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 4. RECENT PROJECTS & ACTIVITY STREAM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
            <Clock size={20} color="#22C55E" />
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--t1)', margin: 0 }}>
              Recent GitHub Activity
            </h3>
          </div>

          <div className="glass glass-shine" style={{ padding: '26px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {events.map((evt) => (
                <motion.div
                  key={evt.id}
                  whileHover={{ x: 4 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: 'var(--sur2)',
                    border: '1px solid var(--bor)'
                  }}
                >
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '10px',
                      background: evt.type === 'PushEvent' ? 'rgba(59, 130, 246, 0.15)' : evt.type === 'CreateEvent' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: evt.type === 'PushEvent' ? '#3B82F6' : evt.type === 'CreateEvent' ? '#22C55E' : '#F59E0B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {evt.type === 'PushEvent' ? <GitCommit size={18} /> : evt.type === 'CreateEvent' ? <Sparkles size={18} /> : <Star size={18} />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
                      <a
                        href={evt.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: '0.88rem', fontWeight: 700, color: '#60A5FA', textDecoration: 'none' }}
                      >
                        {evt.repo}
                      </a>
                      <span style={{ fontSize: '0.72rem', color: 'var(--t3)', fontFamily: "'JetBrains Mono', monospace" }}>
                        {evt.time}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--t1)', fontFamily: "'JetBrains Mono', monospace" }}>
                      {evt.message}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
