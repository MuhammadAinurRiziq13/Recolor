import React from 'react';
import { Palette } from 'lucide-react';

export default function LoadingOverlay() {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(11, 12, 16, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-main)'
    }}>
      <div className="glass-panel" style={{
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <div style={{ position: 'relative' }}>
          {/* Outer rotating ring */}
          <div className="loader-spin" style={{
            position: 'absolute',
            inset: '-10px',
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: 'var(--accent-gold)',
            borderBottomColor: 'var(--accent-indigo)'
          }} />
          
          {/* Inner pulsating icon */}
          <div style={{
            width: '64px', height: '64px',
            borderRadius: '50%',
            background: 'rgba(212, 175, 55, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 2s infinite'
          }}>
            <Palette size={32} color="var(--accent-gold)" />
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Colorizing Batik...</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            This process involves advanced AI inference (UNet & VAE) and may take up to a minute depending on your GPU. Please do not close this window.
          </p>
        </div>
        
        {/* Progress bar mock */}
        <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', 
            background: 'linear-gradient(90deg, var(--accent-indigo), var(--accent-gold))',
            width: '50%',
            animation: 'pulse 1s infinite alternate' // fake progress
          }} />
        </div>
      </div>
    </div>
  );
}
