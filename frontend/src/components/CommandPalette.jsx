import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FolderGit2, Cpu, Download, Github, Linkedin, Mail, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function CommandPalette({ isOpen, onClose, onOpenResume }) {
  const { theme, setTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  /* ── Open / close keyboard shortcut ── */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else window.dispatchEvent(new CustomEvent('open-command-palette'));
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  /* ── Reset on open ── */
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  /* ── Command definitions ── */
  const commands = [
    {
      group: 'Navigation',
      items: [
        { id: 'projects', label: 'View Projects',  icon: FolderGit2, href: '#projects' },
        { id: 'skills',   label: 'View Skills',    icon: Cpu,        href: '#skills'   },
        { id: 'contact',  label: 'Contact Jyoti',  icon: Mail,       href: '#contact'  },
      ],
    },
    {
      group: 'Actions',
      items: [
        {
          id: 'resume',
          label: 'Download Resume',
          icon: Download,
          action: () => { onOpenResume?.(); onClose(); },
        },
      ],
    },
    {
      group: 'Theme',
      items: [
        {
          id: 'theme-light',
          label: 'Switch to Light Mode ☀️',
          icon: Sun,
          action: () => { setTheme('light'); onClose(); },
        },
        {
          id: 'theme-dark',
          label: 'Switch to Dark Mode 🌙',
          icon: Moon,
          action: () => { setTheme('dark'); onClose(); },
        },
      ],
    },
    {
      group: 'Social',
      items: [
        { id: 'github',   label: 'Open GitHub',   icon: Github,   href: 'https://github.com/Kashyap-jyoti', external: true },
        { id: 'linkedin', label: 'Open LinkedIn',  icon: Linkedin, href: 'https://linkedin.com',              external: true },
      ],
    },
  ];

  const allItems = commands.flatMap((g) => g.items);

  const filtered = query.trim()
    ? allItems.filter((it) => it.label.toLowerCase().includes(query.toLowerCase()))
    : allItems;

  const groupedFiltered = query.trim()
    ? [{ group: 'Results', items: filtered }]
    : commands.map((g) => ({
        group: g.group,
        items: g.items.filter((it) => filtered.includes(it)),
      })).filter((g) => g.items.length > 0);

  /* ── Arrow-key + Enter navigation ── */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = filtered[activeIndex];
        if (!item) return;
        if (item.action) {
          item.action();
        } else if (item.href) {
          if (item.external) window.open(item.href, '_blank', 'noreferrer');
          else { window.location.hash = item.href.slice(1); onClose(); }
        }
      }
    },
    [filtered, activeIndex, onClose]
  );

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  useEffect(() => setActiveIndex(0), [query]);

  if (!isOpen) return null;

  let runningIndex = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(7, 15, 33, 0.75)',
            backdropFilter: 'blur(14px)',
            zIndex: 99990,
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            paddingTop: 'clamp(60px, 12vh, 140px)',
            paddingLeft: '16px', paddingRight: '16px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -14 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: '580px',
              background: 'var(--modal-bg)',
              border: '1px solid var(--bor)',
              borderRadius: '20px', overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px var(--bor)',
            }}
          >
            {/* Search input */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '16px 20px',
              borderBottom: '1px solid var(--bor)',
            }}>
              <Search size={18} color="#3B82F6" style={{ flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search portfolio..."
                style={{
                  flex: 1, background: 'none', border: 'none', outline: 'none',
                  color: 'var(--t1)', fontSize: '1rem', fontFamily: 'inherit',
                }}
              />
              <kbd style={{
                background: 'var(--btn-s-bg)', borderRadius: '5px',
                padding: '2px 7px', fontSize: '0.68rem', color: 'var(--t3)',
                fontFamily: "'JetBrains Mono', monospace",
                border: '1px solid var(--bor)', flexShrink: 0,
              }}>ESC</kbd>
            </div>

            {/* Command list */}
            <div ref={listRef} style={{ padding: '8px', maxHeight: '360px', overflowY: 'auto' }}>
              {filtered.length === 0 ? (
                <div style={{
                  padding: '32px 16px', textAlign: 'center',
                  color: 'var(--t3)', fontSize: '0.88rem',
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  No results for "{query}"
                </div>
              ) : (
                groupedFiltered.map((group) => (
                  <div key={group.group}>
                    <div style={{
                      padding: '8px 14px 4px',
                      fontSize: '0.67rem', fontWeight: 700,
                      letterSpacing: '0.09em', textTransform: 'uppercase',
                      color: 'var(--t3)', fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {group.group}
                    </div>

                    {group.items.map((item) => {
                      const idx = runningIndex++;
                      const isActive = idx === activeIndex;
                      const Icon = item.icon;

                      const inner = (
                        <motion.div
                          data-index={idx}
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={() => {
                            if (item.action) item.action();
                            else if (item.href) {
                              if (item.external) window.open(item.href, '_blank', 'noreferrer');
                              else { window.location.hash = item.href.slice(1); onClose(); }
                            }
                          }}
                          animate={{ background: isActive ? 'rgba(59, 130, 246, 0.12)' : 'transparent' }}
                          transition={{ duration: 0.12 }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '14px',
                            padding: '11px 14px', borderRadius: '10px', cursor: 'pointer',
                            border: isActive ? '1px solid var(--bor2)' : '1px solid transparent',
                          }}
                        >
                          <div style={{
                            width: '34px', height: '34px', borderRadius: '9px', flexShrink: 0,
                            background: isActive ? 'rgba(59,130,246,0.2)' : 'var(--btn-s-bg)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: isActive ? '#3B82F6' : 'var(--t3)',
                            transition: 'all 0.15s',
                          }}>
                            <Icon size={16} />
                          </div>

                          <span style={{
                            flex: 1, fontSize: '0.9rem',
                            color: isActive ? 'var(--t1)' : 'var(--t2)',
                            fontWeight: isActive ? 600 : 400,
                            transition: 'color 0.12s',
                          }}>
                            {item.label}
                          </span>

                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, x: -4 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -4 }}
                                transition={{ duration: 0.12 }}
                              >
                                <ArrowRight size={14} color="#3B82F6" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );

                      return item.href && !item.action ? (
                        <a
                          key={item.id}
                          href={item.href}
                          target={item.external ? '_blank' : '_self'}
                          rel={item.external ? 'noreferrer' : ''}
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div key={item.id}>{inner}</div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer hint bar */}
            <div style={{
              padding: '10px 20px',
              borderTop: '1px solid var(--bor)',
              display: 'flex', gap: '16px', alignItems: 'center',
            }}>
              {[
                { keys: ['↑', '↓'], label: 'navigate' },
                { keys: ['↵'],       label: 'select'   },
                { keys: ['esc'],     label: 'close'    },
              ].map(({ keys, label }) => (
                <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  {keys.map((k) => (
                    <kbd key={k} style={{
                      background: 'var(--btn-s-bg)', borderRadius: '4px',
                      padding: '1px 6px', fontSize: '0.65rem', color: 'var(--t3)',
                      fontFamily: "'JetBrains Mono', monospace",
                      border: '1px solid var(--bor)',
                    }}>{k}</kbd>
                  ))}
                  <span style={{ fontSize: '0.7rem', color: 'var(--t3)' }}>{label}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
