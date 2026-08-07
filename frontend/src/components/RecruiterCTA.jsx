import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import RippleButton from './RippleButton';

export default function RecruiterCTA() {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(40px, 6vw, 72px) clamp(16px, 4vw, 24px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: '820px',
          margin: '0 auto',
          background:
            'linear-gradient(135deg, rgba(37,99,235,0.13) 0%, rgba(30,41,59,0.82) 60%, rgba(96,165,250,0.08) 100%)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          border: '1px solid rgba(59,130,246,0.22)',
          borderRadius: '24px',
          padding: 'clamp(32px, 5vw, 56px) clamp(24px, 6vw, 64px)',
          textAlign: 'center',
          boxShadow:
            '0 0 0 1px rgba(96,165,250,0.06), 0 32px 64px rgba(0,0,0,0.35), 0 0 60px rgba(59,130,246,0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle top-left glow orb */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-60px',
            left: '-60px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        {/* Bottom-right glow orb */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-40px',
            right: '-40px',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(96,165,250,0.14) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Eyebrow label */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            color: '#3B82F6',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            marginBottom: '18px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#3B82F6',
              boxShadow: '0 0 8px #3B82F6',
              animation: 'ctaPulse 2s ease-in-out infinite',
            }}
          />
          Open to Opportunities
        </div>

        {/* Heading */}
        <h2
          style={{
            fontSize: 'clamp(1.55rem, 4vw, 2.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            background: 'linear-gradient(135deg, #FFFFFF 40%, #CBD5E1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '14px',
          }}
        >
          Have an opportunity or interesting project?
        </h2>

        {/* Subtext */}
        <p
          style={{
            color: '#94A3B8',
            fontSize: 'clamp(0.92rem, 2.2vw, 1.05rem)',
            lineHeight: 1.65,
            maxWidth: '480px',
            margin: '0 auto 36px',
          }}
        >
          I'd love to connect and discuss it.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <RippleButton
            href="mailto:jyoti33604mah@gmail.com"
            id="cta-email-btn"
            className="btn-p"
            style={{ padding: '13px 28px', fontSize: '0.92rem' }}
          >
            <Mail size={18} />
            Email Me
          </RippleButton>

          <RippleButton
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            id="cta-linkedin-btn"
            className="btn-s"
            style={{ padding: '13px 28px', fontSize: '0.92rem' }}
          >
            <Linkedin size={18} />
            LinkedIn
          </RippleButton>

          <RippleButton
            href="https://github.com/Kashyap-jyoti"
            target="_blank"
            rel="noreferrer"
            id="cta-github-btn"
            className="btn-s"
            style={{ padding: '13px 28px', fontSize: '0.92rem' }}
          >
            <Github size={18} />
            GitHub
          </RippleButton>
        </div>
      </motion.div>

      {/* Pulse keyframe injected once */}
      <style>{`
        @keyframes ctaPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
}
