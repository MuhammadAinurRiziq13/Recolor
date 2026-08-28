import React, { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, Wand2, Download, Settings, ChevronDown, ChevronUp, Palette, Activity, Info } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import TemplateGrid from './components/TemplateGrid';
import PromptPanel from './components/PromptPanel';
import ResultDisplay from './components/ResultDisplay';
import LoadingOverlay from './components/LoadingOverlay';
import InfoModal from './components/InfoModal';

function App() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [negPrompt, setNegPrompt] = useState('');



  // UI States
  const [showInfo, setShowInfo] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [steps, setSteps] = useState(50);
  const [cfgScale, setCfgScale] = useState(12.0);
  const [colorScale, setColorScale] = useState(0.8);

  // Result State
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Templates
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    // Fetch templates from backend
    fetch('/api/templates')
      .then(res => res.json())
      .then(data => {
        if (data.templates) setTemplates(data.templates);
      })
      .catch(err => console.error("Failed to load templates:", err));
  }, []);

  const handleImageSelect = (selectedFile, previewUrl) => {
    setFile(selectedFile);
    setImagePreview(previewUrl);
    setResult(null); // Clear previous result
  };

  const handleTemplateSelect = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setCustomPrompt(template.positive_indo);
      setNegPrompt(template.negative_indo);
    }
    setSelectedTemplateId(templateId);
  };

  const handleColorize = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('prompt_mode', 'custom');
    formData.append('template_id', selectedTemplateId ?? 1);
    formData.append('custom_prompt', customPrompt);
    formData.append('neg_prompt', negPrompt);
    // Fine-Tuned params
    formData.append('steps', steps);
    formData.append('cfg_scale', cfgScale);
    formData.append('color_scale', colorScale);

    try {
      const response = await fetch('/api/colorize', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to colorize image');
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in">
      {isLoading && <LoadingOverlay />}
      {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}

      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="logo-wrapper">
            <Palette className="logo-icon" />
            <h1 className="logo-text">Batik AI Colorizer</h1>
          </div>
          <button
            onClick={() => setShowInfo(true)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--accent-gold)',
              transition: 'all 0.2s'
            }}
            title="Informasi Penggunaan"
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <Info size={18} />
          </button>
        </div>
        <div className="status-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }}></span>
          GPU Ready
        </div>
      </header>

      <main className="grid-layout">
        {/* LEFT COLUMN: Controls */}
        <div className="sidebar glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <ImageUploader
            imagePreview={imagePreview}
            onImageSelect={handleImageSelect}
          />

          <PromptPanel
            customPrompt={customPrompt}
            setCustomPrompt={setCustomPrompt}
            negPrompt={negPrompt}
            setNegPrompt={setNegPrompt}
          />

          <div className="advanced-settings">
            <button
              className="btn btn-outline"
              style={{ width: '100%', justifyContent: 'space-between', border: 'none', background: 'rgba(0,0,0,0.2)' }}
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings size={16} /> Advanced Settings
              </div>
              {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showAdvanced && (
              <div className="animate-fade-in" style={{ padding: '16px', background: 'rgba(0,0,0,0.1)', borderRadius: 'var(--radius-md)', marginTop: '8px' }}>

                {/* Fine-Tuned params */}
                {pipelineMode === 'finetuned' && (<>
                  <div className="input-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label className="input-label">Inference Steps</label>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)' }}>{steps}</span>
                    </div>
                    <input type="range" min="10" max="100" step="1" value={steps} onChange={e => setSteps(parseInt(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label className="input-label">CFG Scale</label>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)' }}>{cfgScale}</span>
                    </div>
                    <input type="range" min="1.0" max="20.0" step="0.5" value={cfgScale} onChange={e => setCfgScale(parseFloat(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label className="input-label">Color Scale</label>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)' }}>{colorScale}</span>
                    </div>
                    <input type="range" min="0.1" max="1.5" step="0.1" value={colorScale} onChange={e => setColorScale(parseFloat(e.target.value))} />
                  </div>
                </>)}


              </div>
            )}
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}
            onClick={handleColorize}
            disabled={!file || isLoading}
          >
            <Wand2 size={20} /> Colorize Batik
          </button>

          {error && (
            <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--accent-danger)', borderRadius: 'var(--radius-md)', color: '#FCA5A5', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Content */}
        <div className="main-content">
          {!result ? (
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Palette size={24} color="var(--accent-gold)" /> Color Palettes
              </h2>
              <TemplateGrid
                templates={templates}
                selectedId={selectedTemplateId}
                onSelect={handleTemplateSelect}
              />
            </div>
          ) : (
            <ResultDisplay result={result} onReset={() => setResult(null)} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
