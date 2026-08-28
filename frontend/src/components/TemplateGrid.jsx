import React from 'react';

// Fungsi bantuan untuk mengekstrak warna dari prompt untuk swatch visual
const extractColors = (name) => {
  const map = {
    "Sogan": ["#1A237E", "#8D6E63", "#F5F5DC"],
    "Pesisir": ["#D32F2F", "#00ACC1", "#FBC02D"],
    "Keraton": ["#1A237E", "#FFF8E1", "#FFD700"],
    "Hutan": ["#1B5E20", "#2E7D32", "#5D4037"],
    "Sunset": ["#E65100", "#FFB300", "#B71C1C"],
    "Laut": ["#000051", "#00838F", "#00BCD4"],
    "Purple": ["#4A148C", "#311B92", "#FFD700"],
    "Midnight": ["#000000", "#212121", "#FFD700"],
    "Pastel": ["#F8BBD0", "#E1BEE7", "#B3E5FC"],
    "Sakura": ["#F48FB1", "#FAFAFA", "#C8E6C9"],
    "Harmoni": ["#558B2F", "#1B5E20", "#F9A825"],
    "Lembayung": ["#311B92", "#7E57C2", "#FFCA28"],
  };

  for (const key in map) {
    if (name.includes(key)) return map[key];
  }
  return ["#D4AF37", "#4F46E5", "#15161A"]; // default
};

export default function TemplateGrid({ templates, selectedId, onSelect }) {
  if (!templates || templates.length === 0) {
    return <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading templates...</div>;
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '16px'
    }}>
      {templates.map((template) => {
        const isSelected = selectedId === template.id;
        const colors = extractColors(template.name);

        return (
          <div
            key={template.id}
            onClick={() => onSelect(template.id)}
            style={{
              background: isSelected ? 'rgba(212, 175, 55, 0.1)' : 'rgba(25, 27, 33, 0.5)',
              border: `1px solid ${isSelected ? 'var(--accent-gold)' : 'var(--border-light)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isSelected ? 'var(--shadow-glow)' : 'none',
              transform: isSelected ? 'translateY(-2px)' : 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>{template.name}</h3>
              {isSelected && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-gold)' }} />}
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {template.positive_indo}
            </p>

            {/* Color Swatches */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {colors.map((color, i) => (
                <div
                  key={i}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    background: color,
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
