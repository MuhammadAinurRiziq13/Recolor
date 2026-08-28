import React from 'react';

export default function PromptPanel({
  customPrompt, setCustomPrompt,
  negPrompt, setNegPrompt,
}) {
  return (
    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Prompt inputs */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 500, margin: 0 }}>Custom Prompt</h3>
          <span style={{ fontSize: '0.7rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
            ID/EN Supported
          </span>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 12px 0' }}>
          💡 Klik template di sebelah kanan atau ketik sendiri (Bisa Bahasa Indonesia).
        </p>

        <div className="animate-fade-in">
          <div className="input-group">
            <label className="input-label">Positive Prompt</label>
            <textarea
              className="textarea-field"
              placeholder="Contoh: kain batik motif parang, warna cokelat sogan dan krem, detail halus..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
            />
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">Negative Prompt (Optional)</label>
            <textarea
              className="textarea-field"
              style={{ minHeight: '60px' }}
              placeholder="e.g. grainy, black and white, blurry, bad anatomy..."
              value={negPrompt}
              onChange={(e) => setNegPrompt(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
