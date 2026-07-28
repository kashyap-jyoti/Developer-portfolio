import React, { useState, useEffect } from 'react';
import { Search, X, FolderGit2, User, Mail, Cpu, Code2 } from 'lucide-react';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else window.dispatchEvent(new CustomEvent('open-command-palette'));
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    { label: 'Jump to About Section', href: '#about', icon: User },
    { label: 'View Technical Skills', href: '#skills', icon: Cpu },
    { label: 'Browse Projects', href: '#projects', icon: FolderGit2 },
    { label: 'Explore DSA Competence', href: '#dsa', icon: Code2 },
    { label: 'Send Contact Message', href: '#contact', icon: Mail },
  ];

  const filtered = items.filter((it) => it.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(12px)',
        zIndex: 99990,
        display: 'flex',
        alignItems: 'flex-start',
        justify: 'center',
        paddingTop: '120px'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 40px rgba(59, 130, 246, 0.25)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderBottom: '1px solid rgba(59, 130, 246, 0.15)' }}>
          <Search size={18} color="#64748B" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: '0.98rem', fontFamily: 'inherit' }}
          />
          <kbd style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7rem', color: '#64748B', fontFamily: "'JetBrains Mono', monospace" }}>ESC</kbd>
        </div>

        <div style={{ padding: '8px', maxHeight: '320px', overflowY: 'auto' }}>
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  color: '#CBD5E1',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
                  <Icon size={16} />
                </div>
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
