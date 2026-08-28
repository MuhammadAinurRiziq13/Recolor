import React, { useRef, useState } from 'react';
import { Upload, Camera, Image as ImageIcon } from 'lucide-react';
import WebcamModal from './WebcamModal';

export default function ImageUploader({ imagePreview, onImageSelect }) {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelect(file, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleCameraClick = (e) => {
    e.stopPropagation();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // Pada mobile, gunakan native camera picker yang lebih handal
      cameraInputRef.current?.click();
    } else {
      // Pada desktop/laptop, buka Webcam Modal
      setShowWebcam(true);
    }
  };

  const handleWebcamCapture = (file, previewUrl) => {
    onImageSelect(file, previewUrl);
    setShowWebcam(false);
  };

  return (
    <>
      <div
        className="upload-area"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${isDragging ? 'var(--accent-gold)' : 'var(--border-light)'}`,
          borderRadius: 'var(--radius-md)',
          padding: imagePreview ? '8px' : '40px 20px',
          textAlign: 'center',
          background: isDragging ? 'rgba(212, 175, 55, 0.05)' : 'rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        
        <input
          type="file"
          ref={cameraInputRef}
          onChange={handleFileChange}
          accept="image/*"
          capture="environment"
          style={{ display: 'none' }}
        />

        {imagePreview ? (
          <div style={{ position: 'relative', width: '100%', height: '200px', borderRadius: '8px', overflow: 'hidden' }} className="group">
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'rgba(0,0,0,0.6)', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '12px',
                opacity: 0, 
                transition: 'opacity 0.2s' 
              }} 
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0}
            >
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }} 
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                >
                  <Upload size={16} /> Upload
                </button>
                <button 
                  className="btn btn-outline" 
                  style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)' }} 
                  onClick={handleCameraClick}
                >
                  <Camera size={16} /> Camera
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Upload or Capture Batik</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Drag & drop or choose an option below</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
               <button 
                  className="btn btn-primary"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}
               >
                  <Upload size={18} /> Upload Image
               </button>
               <button 
                  className="btn btn-outline"
                  onClick={handleCameraClick}
                  style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)' }}
               >
                  <Camera size={18} /> Take Photo
               </button>
            </div>
          </div>
        )}
      </div>

      {showWebcam && (
        <WebcamModal 
          onCapture={handleWebcamCapture}
          onClose={() => setShowWebcam(false)}
        />
      )}
    </>
  );
}
