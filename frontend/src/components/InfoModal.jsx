import React, { useEffect } from 'react';
import { X, Info, HelpCircle, Languages, Settings2, Sparkles } from 'lucide-react';

export default function InfoModal({ onClose }) {
  // Tutup dengan ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px',
        animation: 'fadeIn 0.3s ease'
      }}
    >
      <div 
        className="glass-panel modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '32px',
          position: 'relative',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            borderRadius: '50%',
            padding: '8px',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          <X size={20} />
        </button>

        <header style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent-gold)', marginBottom: '8px' }}>
            <Sparkles size={24} />
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>Panduan Batik AI</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Pelajari cara memaksimalkan hasil pewarnaan batik dengan teknologi AI.
          </p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#fff' }}>
              <Languages size={18} color="var(--accent-indigo)" />
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Dukungan Bahasa (ID/EN)</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Aplikasi ini dilengkapi dengan <strong>Translasi Otomatis</strong>. Anda bisa mengetik prompt dalam Bahasa Indonesia maupun Inggris. Sistem akan secara otomatis menerjemahkannya untuk mesin AI.
            </p>
          </section>

          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#fff' }}>
              <Settings2 size={18} color="var(--accent-gold)" />
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Pengaturan Lanjut</h3>
            </div>
            <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Inference Steps:</strong> Menentukan seberapa detail AI memproses gambar. Angka lebih tinggi (50+) biasanya lebih bagus tapi lebih lambat.</li>
              <li><strong>CFG Scale:</strong> Menentukan seberapa patuh AI terhadap teks prompt Anda. Semakin tinggi, semakin kuat pengaruh warna yang Anda tulis.</li>
              <li><strong>Color Scale:</strong> Mengatur <strong>kepekatan warna</strong>. Semakin tinggi angkanya, warna akan semakin mencolok dan tajam (vibrant). Semakin rendah, warna akan terlihat lebih kalem, lembut, atau pudar.</li>
            </ul>
          </section>

          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#fff' }}>
              <HelpCircle size={18} color="var(--accent-danger)" />
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Tips Hasil Terbaik</h3>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', fontSize: '0.88rem', borderLeft: '4px solid var(--accent-gold)' }}>
              Gunakan kata deskriptif seperti <em>"latar belakang biru dongker pekat"</em> atau <em>"aksen emas berkilau"</em> untuk hasil yang lebih spesifik.
            </div>
          </section>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={onClose}
          style={{ width: '100%', marginTop: '32px', padding: '12px' }}
        >
          Mengerti
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(30px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-content::-webkit-scrollbar {
          width: 6px;
        }
        .modal-content::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
