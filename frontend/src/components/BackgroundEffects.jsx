import React from 'react';

export default function BackgroundEffects() {
  return (
    <>
      {/* Grid Overlay */}
      <div id="grid-ol" />

      {/* Static Aurora Color Orbs — gentle CSS opacity breathe only */}
      <div
        className="orb-bg"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(37, 99, 235, 0.04) 70%, transparent 100%)',
          top: '-100px',
          left: '-150px'
        }}
      />

      <div
        className="orb-bg"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(29, 78, 216, 0.1) 0%, rgba(96, 165, 250, 0.03) 70%, transparent 100%)',
          bottom: '-80px',
          right: '-100px'
        }}
      />

      <div
        className="orb-bg"
        style={{
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.08) 0%, transparent 70%)',
          top: '40%',
          left: '60%'
        }}
      />
    </>
  );
}
