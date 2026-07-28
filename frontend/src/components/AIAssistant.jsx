import React, { useState } from 'react';
import { Bot, Send, Sparkles, X } from 'lucide-react';
import { sendAIChatMessage } from '../services/api';

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I'm Nova, your interactive portfolio guide. I'll help you explore Jyoti Kashyap's skills, projects, technical journey, and achievements. Feel free to click any topic below to learn more."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    "Tell me about Java & DSA",
    "What is Jyoti's MERN Stack experience?",
    "Featured Banking & Portfolio projects",
    "How to contact Jyoti?"
  ];

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    const res = await sendAIChatMessage(query);
    setLoading(false);

    setMessages((prev) => [
      ...prev,
      { sender: 'ai', text: res.reply || "I am connected to the Express backend API!" }
    ]);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: '26px',
          left: '26px',
          zIndex: 9900,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(15, 23, 42, 0.92)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(96, 165, 250, 0.35)',
          borderRadius: '999px',
          padding: '10px 20px',
          color: '#fff',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4), 0 0 25px rgba(59, 130, 246, 0.3)',
          fontFamily: 'inherit'
        }}
      >
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={15} />
        </div>
        <span style={{ fontWeight: 600, fontSize: '0.86rem' }}>Nova Assistant</span>
        <span style={{ width: '8px', height: '8px', background: '#22C55E', borderRadius: '50%', boxShadow: '0 0 8px #22C55E' }}></span>
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '26px',
        left: '26px',
        zIndex: 9900,
        width: '380px',
        maxWidth: '90vw',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(96, 165, 250, 0.3)',
        borderRadius: '20px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(59, 130, 246, 0.2)',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div style={{ padding: '16px 20px', background: 'rgba(30, 41, 59, 0.6)', borderBottom: '1px solid rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <Sparkles size={16} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>Nova</h4>
            <p style={{ fontSize: '0.7rem', color: '#60A5FA', fontFamily: "'JetBrains Mono', monospace" }}>Digital Portfolio Assistant</p>
          </div>
        </div>
        <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
          <X size={18} />
        </button>
      </div>

      {/* Messages Body */}
      <div style={{ padding: '16px', height: '260px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              background: msg.sender === 'user' ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' : 'rgba(30, 41, 59, 0.85)',
              border: msg.sender === 'user' ? 'none' : '1px solid rgba(59, 130, 246, 0.2)',
              color: '#fff',
              padding: '10px 14px',
              borderRadius: '14px',
              fontSize: '0.85rem',
              lineHeight: 1.5
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div style={{ fontSize: '0.8rem', color: '#60A5FA', fontStyle: 'italic' }}>Nova is analyzing query...</div>}
      </div>

      {/* Prompts */}
      <div style={{ padding: '8px 16px', display: 'flex', flexWrap: 'wrap', gap: '6px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            style={{
              padding: '4px 10px',
              borderRadius: '999px',
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              color: '#60A5FA',
              fontSize: '0.72rem',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: '12px 16px', background: 'rgba(15, 23, 42, 0.8)', borderTop: '1px solid rgba(59, 130, 246, 0.15)', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Nova Assistant..."
          style={{ flex: 1, background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.84rem', outline: 'none' }}
        />
        <button onClick={() => handleSend()} style={{ background: '#2563EB', border: 'none', borderRadius: '8px', padding: '8px 12px', color: '#fff', cursor: 'pointer' }}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
