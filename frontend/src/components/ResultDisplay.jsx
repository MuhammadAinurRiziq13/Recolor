import React, { useState } from 'react';
import { Download, Clock, Activity, HardDrive, ZoomIn } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

export default function ResultDisplay({ result, onReset }) {
  const [lightboxData, setLightboxData] = useState(null);

  if (!result) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `data:image/jpeg;base64,${result.output_image_b64}`;
    link.download = `batik_colorized_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openLightbox = (src, alt, label) => {
    setLightboxData({ src, alt, label });
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {lightboxData && (
        <ImageLightbox
          {...lightboxData}
          onClose={() => setLightboxData(null)}
        />
      )}

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {/* Inference Time */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '10px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '8px', color: 'var(--accent-gold)' }}>
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Inference Time</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{result.metrics.time.toFixed(1)}s</div>
          </div>
        </div>

        {/* SSIM */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '10px', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '8px', color: 'var(--accent-indigo)' }}>
            <Activity size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>SSIM</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>
              {result.metrics.ssim != null ? result.metrics.ssim.toFixed(4) : '—'}
            </div>
          </div>
        </div>

        {/* PSNR */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: '#10B981' }}>
            <HardDrive size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PSNR</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>
              {result.metrics.psnr != null ? `${result.metrics.psnr.toFixed(2)} dB` : '—'}
            </div>
          </div>
        </div>
      </div>

      {/* Images Side-by-Side */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>Result: {result.template_name}</h2>
            {/* Badge pipeline */}
            {result.pipeline_mode && (
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '6px',
                letterSpacing: '0.04em',
                background: result.pipeline_mode === 'finetuned'
                  ? 'rgba(212, 175, 55, 0.12)'
                  : 'rgba(99, 102, 241, 0.12)',
                color: result.pipeline_mode === 'finetuned'
                  ? 'var(--accent-gold)'
                  : '#818CF8',
                border: `1px solid ${result.pipeline_mode === 'finetuned' ? 'rgba(212,175,55,0.35)' : 'rgba(99,102,241,0.35)'}`,
              }}>
                {result.pipeline_mode === 'finetuned' ? '🎨 Fine-Tuned' : '🧩 ControlNet'}
              </span>
            )}
            <button
              className="btn btn-outline"
              style={{ padding: '6px 12px', fontSize: '0.85rem' }}
              onClick={onReset}
            >
              Try Another Palette
            </button>
          </div>
          <button className="btn btn-primary" onClick={handleDownload}>
            <Download size={18} /> Download High-Res
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="image-container-hover">
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px', textAlign: 'center' }}>Original Input (Grayscale)</div>
            <div
              style={{ position: 'relative', cursor: 'zoom-in' }}
              onClick={() => openLightbox(`data:image/jpeg;base64,${result.input_image_b64}`, "Input", "Original Input")}
            >
              <img
                src={`data:image/jpeg;base64,${result.input_image_b64}`}
                alt="Input"
                style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border-light)', transition: 'transform 0.2s' }}
              />
              <div className="hover-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', borderRadius: '8px', opacity: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.2s' }}>
                <ZoomIn color="#fff" size={32} />
              </div>
            </div>
          </div>
          <div className="image-container-hover">
            <div style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', marginBottom: '8px', textAlign: 'center', fontWeight: 500 }}>Colorized Output</div>
            <div
              style={{ position: 'relative', cursor: 'zoom-in' }}
              onClick={() => openLightbox(`data:image/jpeg;base64,${result.output_image_b64}`, "Output", `Colorized Output (${result.template_name})`)}
            >
              <img
                src={`data:image/jpeg;base64,${result.output_image_b64}`}
                alt="Output"
                style={{ width: '100%', borderRadius: '8px', border: '2px solid var(--accent-gold)', boxShadow: 'var(--shadow-glow)', transition: 'transform 0.2s' }}
              />
              <div className="hover-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', borderRadius: '8px', opacity: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.2s' }}>
                <ZoomIn color="var(--accent-gold)" size={32} />
              </div>
            </div>
          </div>
        </div>

        {/* Prompt Info */}
        <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Prompt Used:</div>
          <p style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>"{result.prompt_used.positive_indo}"</p>
        </div>
      </div>

      <style>{`
        .image-container-hover:hover .hover-overlay {
          opacity: 1 !important;
        }
        .image-container-hover:hover img {
          transform: scale(1.01);
        }
      `}</style>
    </div>
  );
}
