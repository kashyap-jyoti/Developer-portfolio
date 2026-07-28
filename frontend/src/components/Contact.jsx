import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, MapPin, Github, Linkedin, CheckCircle2 } from 'lucide-react';
import { sendContactMessage } from '../services/api';
import RippleButton from './RippleButton';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, message: '' });

    const result = await sendContactMessage(formData);
    if (result.success) {
      setStatus({ loading: false, success: true, message: 'Your message was successfully sent and saved in MongoDB!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setStatus({ loading: false, success: false, message: result.error || 'Failed to send message.' });
    }
  };

  return (
    <section id="contact" className="sec-wrap">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="sec-lbl">
          <Mail size={16} />
          <span>Get In Touch</span>
        </div>
        <h2 className="sec-ttl">Let's Build Something Impactful</h2>
        <p className="sec-sub" style={{ marginBottom: '40px' }}>
          Have an open position, project inquiry, or collaboration idea? Send a message directly into my MongoDB database below!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '36px' }}>
          {/* Contact info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <motion.div
              whileHover={{ scale: 1.02, x: 4 }}
              className="glass2 glass-shine"
              style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}
            >
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
                <Mail size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Email Direct</div>
                <a href="mailto:jyoti33604mah@gmail.com" style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>jyoti33604mah@gmail.com</a>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, x: 4 }}
              className="glass2 glass-shine"
              style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}
            >
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(96, 165, 250, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA' }}>
                <MapPin size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Location</div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>India (Open to Remote / Relocation)</div>
              </div>
            </motion.div>

            <div className="glass2 glass-shine" style={{ padding: '24px' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase' }}>Social Profiles</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <RippleButton href="https://github.com/Kashyap-jyoti" target="_blank" rel="noreferrer" className="btn-s" style={{ padding: '10px 16px', fontSize: '0.82rem' }}>
                  <Github size={18} /> GitHub
                </RippleButton>
                <RippleButton href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn-s" style={{ padding: '10px 16px', fontSize: '0.82rem' }}>
                  <Linkedin size={18} /> LinkedIn
                </RippleButton>
              </div>
            </div>
          </div>

          {/* Contact Form with animations */}
          <form onSubmit={handleSubmit} className="glass glass-shine" style={{ padding: '32px' }}>
            <AnimatePresence>
              {status.success && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '14px 18px', borderRadius: '12px', color: '#22C55E', fontSize: '0.9rem', marginBottom: '20px' }}
                >
                  <CheckCircle2 size={20} />
                  <span>{status.message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '6px', fontWeight: 500 }}>Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jyoti Kashyap"
                  className="input-focus-glow"
                  style={{ width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '10px', padding: '12px 14px', color: '#fff', fontFamily: 'inherit', outline: 'none', transition: 'all 0.2s ease' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '6px', fontWeight: 500 }}>Your Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="input-focus-glow"
                  style={{ width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '10px', padding: '12px 14px', color: '#fff', fontFamily: 'inherit', outline: 'none', transition: 'all 0.2s ease' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '6px', fontWeight: 500 }}>Subject</label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Software Engineer Role / Project Inquiry"
                className="input-focus-glow"
                style={{ width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '10px', padding: '12px 14px', color: '#fff', fontFamily: 'inherit', outline: 'none', transition: 'all 0.2s ease' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '6px', fontWeight: 500 }}>Message</label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Hello Jyoti, I reviewed your Java & MERN portfolio and would like to connect..."
                className="input-focus-glow"
                style={{ width: '100%', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '10px', padding: '12px 14px', color: '#fff', fontFamily: 'inherit', outline: 'none', resize: 'vertical', transition: 'all 0.2s ease' }}
              ></textarea>
            </div>

            <RippleButton type="submit" className="btn-p" style={{ width: '100%', justifyContent: 'center' }} disabled={status.loading}>
              <Send size={18} />
              <span>{status.loading ? 'Transmitting to MongoDB...' : 'Send Message'}</span>
            </RippleButton>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
