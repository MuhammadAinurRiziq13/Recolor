import React, { useRef, useState, useEffect } from 'react';
import { Camera, X } from 'lucide-react';

export default function WebcamModal({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState(null);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    // Request camera access
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then((mediaStream) => {
        streamRef.current = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
        setError("Gagal mengakses kamera. Pastikan Anda telah memberikan izin.");
      });

    // Cleanup on unmount
    return () => {
      stopCamera();
    };
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to file
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
          const previewUrl = canvas.toDataURL('image/jpeg');
          
          stopCamera();
          onCapture(file, previewUrl);
        }
      }, 'image/jpeg', 0.9);
    }
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '640px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Ambil Foto</h3>
          <button 
            onClick={handleClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
        </div>

        {error ? (
          <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', color: '#FCA5A5', borderRadius: '8px', textAlign: 'center' }}>
            {error}
          </div>
        ) : (
          <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#000', aspectRatio: '4/3' }}>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
        )}

        {!error && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button 
              className="btn btn-primary"
              onClick={handleCapture}
              style={{ padding: '12px 32px', borderRadius: '32px', display: 'flex', gap: '8px', fontSize: '1.1rem' }}
            >
              <Camera size={20} /> Ambil Foto
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
