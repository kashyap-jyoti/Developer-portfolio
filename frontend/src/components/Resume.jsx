import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Upload, Download, Eye, X,
  CheckCircle2, Sparkles, ZoomIn, ZoomOut, RotateCcw
} from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  const [resumeUrl, setResumeUrl] = useState(null);
  const [resumeName, setResumeFileName] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [fullView, setFullView] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || file.type !== 'application/pdf') return;
    const url = URL.createObjectURL(file);
    setResumeUrl(url);
    setResumeFileName(file.name);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 2500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleDownload = () => {
    if (!resumeUrl) return;
    const a = document.createElement('a');
    a.href = resumeUrl;
    a.download = resumeName || 'resume.pdf';
    a.click();
  };

  const highlights = [
    'Java Full Stack Developer – Spring Boot, React, REST APIs',
    '500+ DSA Problems – LeetCode, GFG (Top 5%)',
    'Microservices & Backend Architecture Specialist',
    'Oracle Java Professional Candidate',
    'Open to Full-Time & Internship Opportunities',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 9995,
              background: 'rgba(7, 11, 22, 0.82)',
              backdropFilter: 'blur(12px)',
            }}
          />

          {/* Modal Panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9996,
              width: '92vw',
              maxWidth: '980px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'var(--modal-bg)',
              backdropFilter: 'blur(24px)',
              borderRadius: '20px',
              border: '1px solid var(--bor)',
              boxShadow: 'var(--shadow-hover)',
              padding: '32px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  padding: '10px',
                  background: 'rgba(59, 130, 246, 0.12)',
                  borderRadius: '12px',
                  border: '1px solid var(--bor)',
                  display: 'flex',
                }}>
                  <FileText size={20} color="#3B82F6" />
                </div>
                <div>
                  <h2 style={{ color: 'var(--t1)', fontWeight: 700, fontSize: '1.25rem', margin: 0 }}>My Resume</h2>
                  <p style={{ color: 'var(--t3)', fontSize: '0.8rem', margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>
                    Upload · Preview · Download
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: '10px', padding: '8px',
                  color: '#F87171', cursor: 'pointer', display: 'flex',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
              >
                <X size={18} />
              </button>
            </div>

            {/* Body Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '28px', alignItems: 'start' }}>

              {/* Left: Highlights + Upload */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* At a Glance */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(59, 130, 246, 0.15)',
                  borderRadius: '14px', padding: '22px',
                }}>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} color="#60A5FA" /> At a Glance
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {highlights.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.07, duration: 0.35 }}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '9px' }}
                      >
                        <CheckCircle2 size={15} color="#3B82F6" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span style={{ color: '#CBD5E1', fontSize: '0.84rem', lineHeight: 1.55 }}>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Upload Zone */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2px dashed ${isDragging ? '#3B82F6' : 'rgba(59, 130, 246, 0.35)'}`,
                    borderRadius: '14px', padding: '28px 20px',
                    textAlign: 'center', cursor: 'pointer',
                    background: isDragging ? 'rgba(59, 130, 246, 0.08)' : 'rgba(15, 23, 42, 0.4)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <input ref={fileInputRef} type="file" accept="application/pdf" style={{ display: 'none' }} onChange={handleFileChange} />
                  <AnimatePresence mode="wait">
                    {uploadSuccess ? (
                      <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle2 size={32} color="#22C55E" />
                        <p style={{ color: '#22C55E', fontWeight: 600, fontSize: '0.88rem' }}>Uploaded!</p>
                        <p style={{ color: '#64748B', fontSize: '0.74rem' }}>{resumeName}</p>
                      </motion.div>
                    ) : (
                      <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
                          <Upload size={30} color={isDragging ? '#3B82F6' : '#60A5FA'} />
                        </motion.div>
                        <p style={{ color: '#CBD5E1', fontWeight: 600, fontSize: '0.9rem' }}>
                          {resumeUrl ? 'Replace Resume PDF' : 'Upload Your Resume'}
                        </p>
                        <p style={{ color: '#64748B', fontSize: '0.76rem' }}>
                          Drag & drop or <span style={{ color: '#3B82F6' }}>click to browse</span> · PDF only
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action Buttons */}
                {resumeUrl && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => setFullView(true)}
                      style={{
                        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                        padding: '11px 14px', borderRadius: '10px',
                        border: '1px solid rgba(59, 130, 246, 0.4)',
                        background: 'rgba(59, 130, 246, 0.12)',
                        color: '#60A5FA', fontSize: '0.84rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.22)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.12)'}
                    >
                      <Eye size={15} /> View Full
                    </button>
                    <button
                      onClick={handleDownload}
                      style={{
                        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                        padding: '11px 14px', borderRadius: '10px',
                        border: '1px solid rgba(34, 197, 94, 0.4)',
                        background: 'rgba(34, 197, 94, 0.1)',
                        color: '#22C55E', fontSize: '0.84rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(34, 197, 94, 0.1)'}
                    >
                      <Download size={15} /> Download
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Right: PDF Inline Preview */}
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '16px', overflow: 'hidden',
                minHeight: '480px', display: 'flex', flexDirection: 'column',
              }}>
                {/* Viewer Toolbar */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
                  background: 'rgba(15, 23, 42, 0.6)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EAB308' }} />
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22C55E' }} />
                    </div>
                    <span style={{ color: '#64748B', fontSize: '0.74rem', fontFamily: "'JetBrains Mono', monospace" }}>
                      {resumeName || 'resume.pdf'}
                    </span>
                  </div>
                  {resumeUrl && (
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <button onClick={() => setZoom(z => Math.max(60, z - 20))} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '3px' }} title="Zoom Out"><ZoomOut size={14} /></button>
                      <span style={{ color: '#64748B', fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", minWidth: '36px', textAlign: 'center' }}>{zoom}%</span>
                      <button onClick={() => setZoom(z => Math.min(200, z + 20))} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '3px' }} title="Zoom In"><ZoomIn size={14} /></button>
                      <button onClick={() => setZoom(100)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '3px' }} title="Reset"><RotateCcw size={13} /></button>
                    </div>
                  )}
                </div>

                {/* PDF Content */}
                <div style={{ flex: 1, overflow: 'auto', minHeight: '430px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {resumeUrl ? (
                    <iframe
                      src={`${resumeUrl}#zoom=${zoom}`}
                      title="Resume Preview"
                      style={{ width: '100%', height: '430px', border: 'none', display: 'block' }}
                    />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '40px 24px', textAlign: 'center' }}>
                      <motion.div
                        animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                        style={{
                          width: '68px', height: '68px', borderRadius: '16px',
                          background: 'rgba(59, 130, 246, 0.08)',
                          border: '1px solid rgba(59, 130, 246, 0.2)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        <FileText size={30} color="#60A5FA" />
                      </motion.div>
                      <p style={{ color: '#CBD5E1', fontWeight: 600, fontSize: '0.95rem', margin: 0 }}>No Resume Uploaded</p>
                      <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.6, margin: 0 }}>Upload a PDF on the left to preview it here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Full-Screen Overlay */}
          <AnimatePresence>
            {fullView && resumeUrl && (
              <motion.div
                key="fullview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed', inset: 0, zIndex: 10000,
                  background: 'rgba(7, 11, 22, 0.97)',
                  backdropFilter: 'blur(16px)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}
              >
                <div style={{
                  width: '100%', maxWidth: '900px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 24px',
                  borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={17} color="#60A5FA" />
                    <span style={{ color: '#CBD5E1', fontWeight: 600, fontSize: '0.92rem' }}>{resumeName}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button onClick={handleDownload} style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '7px 14px', borderRadius: '8px',
                      border: '1px solid rgba(34,197,94,0.4)',
                      background: 'rgba(34,197,94,0.1)',
                      color: '#22C55E', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                    }}>
                      <Download size={14} /> Download
                    </button>
                    <button onClick={() => setFullView(false)} style={{
                      background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
                      borderRadius: '8px', padding: '7px', color: '#F87171', cursor: 'pointer', display: 'flex',
                    }}>
                      <X size={17} />
                    </button>
                  </div>
                </div>
                <div style={{ flex: 1, width: '100%', maxWidth: '900px', overflow: 'auto', padding: '16px 24px 24px' }}>
                  <iframe src={resumeUrl} title="Resume Full View" style={{ width: '100%', height: '82vh', border: 'none', borderRadius: '12px' }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
