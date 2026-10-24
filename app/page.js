'use client';

import React, { useState, useRef, useEffect } from 'react';

// Preset sample sketches rendered as data URLs for instant hackathon demonstrations
const SAMPLE_PRESETS = [
  {
    id: 'saas',
    name: 'SaaS Landing Page',
    prompt: 'Modern SaaS landing page with hero banner, 3-column feature highlights, testimonial quote, and a newsletter signup form.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none">
      <rect width="600" height="400" fill="#fdfcff" stroke="#7c3aed" stroke-width="3" stroke-dasharray="6 6"/>
      <!-- Header -->
      <rect x="25" y="20" width="80" height="24" rx="4" fill="#ede9fe" stroke="#6d28d9" stroke-width="2"/>
      <line x1="380" y1="32" x2="430" y2="32" stroke="#6d28d9" stroke-width="3" stroke-linecap="round"/>
      <line x1="445" y1="32" x2="495" y2="32" stroke="#6d28d9" stroke-width="3" stroke-linecap="round"/>
      <rect x="510" y="20" width="65" height="25" rx="12" fill="#7c3aed"/>
      <!-- Hero -->
      <line x1="140" y1="90" x2="460" y2="90" stroke="#4c1d95" stroke-width="8" stroke-linecap="round"/>
      <line x1="180" y1="115" x2="420" y2="115" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>
      <rect x="240" y="140" width="120" height="34" rx="17" fill="#7c3aed"/>
      <!-- 3 Feature Cards -->
      <rect x="35" y="210" width="160" height="130" rx="8" fill="#ffffff" stroke="#a78bfa" stroke-width="2"/>
      <circle cx="65" cy="240" r="14" fill="#ddd6fe"/>
      <line x1="50" y1="275" x2="160" y2="275" stroke="#4c1d95" stroke-width="4" stroke-linecap="round"/>
      <line x1="50" y1="295" x2="140" y2="295" stroke="#a78bfa" stroke-width="3" stroke-linecap="round"/>

      <rect x="220" y="210" width="160" height="130" rx="8" fill="#ffffff" stroke="#a78bfa" stroke-width="2"/>
      <circle cx="250" cy="240" r="14" fill="#ddd6fe"/>
      <line x1="235" y1="275" x2="345" y2="275" stroke="#4c1d95" stroke-width="4" stroke-linecap="round"/>
      <line x1="235" y1="295" x2="325" y2="295" stroke="#a78bfa" stroke-width="3" stroke-linecap="round"/>

      <rect x="405" y="210" width="160" height="130" rx="8" fill="#ffffff" stroke="#a78bfa" stroke-width="2"/>
      <circle cx="435" cy="240" r="14" fill="#ddd6fe"/>
      <line x1="420" y1="275" x2="530" y2="275" stroke="#4c1d95" stroke-width="4" stroke-linecap="round"/>
      <line x1="420" y1="295" x2="510" y2="295" stroke="#a78bfa" stroke-width="3" stroke-linecap="round"/>
      <!-- Wireframe Note -->
      <text x="300" y="375" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#6d28d9">[ HAND-DRAWN WIREFRAME PRESET: SAAS LANDING ]</text>
    </svg>`,
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Store',
    prompt: 'Clean e-commerce product showcase page with navigation search bar, category filters, and a grid of 4 product cards with Add to Cart buttons.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none">
      <rect width="600" height="400" fill="#fcfaff" stroke="#7c3aed" stroke-width="3" stroke-dasharray="6 6"/>
      <!-- Nav -->
      <rect x="25" y="20" width="90" height="24" rx="4" fill="#ede9fe" stroke="#6d28d9" stroke-width="2"/>
      <rect x="140" y="20" width="280" height="24" rx="12" fill="#ffffff" stroke="#a78bfa" stroke-width="2"/>
      <circle cx="480" cy="32" r="12" fill="#ede9fe"/>
      <circle cx="525" cy="32" r="12" fill="#7c3aed"/>
      <!-- Category Chips -->
      <rect x="30" y="65" width="60" height="20" rx="10" fill="#7c3aed"/>
      <rect x="100" y="65" width="70" height="20" rx="10" fill="#ede9fe"/>
      <rect x="180" y="65" width="70" height="20" rx="10" fill="#ede9fe"/>
      <!-- 3 Products Grid -->
      <rect x="30" y="110" width="160" height="230" rx="8" fill="#ffffff" stroke="#c4b5fd" stroke-width="2"/>
      <rect x="45" y="125" width="130" height="110" rx="6" fill="#f5f3ff"/>
      <line x1="45" y1="255" x2="140" y2="255" stroke="#4c1d95" stroke-width="4" stroke-linecap="round"/>
      <line x1="45" y1="275" x2="90" y2="275" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>
      <rect x="45" y="295" width="130" height="28" rx="6" fill="#7c3aed"/>

      <rect x="220" y="110" width="160" height="230" rx="8" fill="#ffffff" stroke="#c4b5fd" stroke-width="2"/>
      <rect x="235" y="125" width="130" height="110" rx="6" fill="#f5f3ff"/>
      <line x1="235" y1="255" x2="330" y2="255" stroke="#4c1d95" stroke-width="4" stroke-linecap="round"/>
      <line x1="235" y1="275" x2="280" y2="275" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>
      <rect x="235" y="295" width="130" height="28" rx="6" fill="#7c3aed"/>

      <rect x="410" y="110" width="160" height="230" rx="8" fill="#ffffff" stroke="#c4b5fd" stroke-width="2"/>
      <rect x="425" y="125" width="130" height="110" rx="6" fill="#f5f3ff"/>
      <line x1="425" y1="255" x2="520" y2="255" stroke="#4c1d95" stroke-width="4" stroke-linecap="round"/>
      <line x1="425" y1="275" x2="470" y2="275" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>
      <rect x="425" y="295" width="130" height="28" rx="6" fill="#7c3aed"/>
      <!-- Label -->
      <text x="300" y="375" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#6d28d9">[ HAND-DRAWN WIREFRAME PRESET: E-COMMERCE ]</text>
    </svg>`,
  },
  {
    id: 'portfolio',
    name: 'Creative Portfolio',
    prompt: 'Personal portfolio with bio avatar, skill badges, gallery grid of projects, and a clean contact form.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none">
      <rect width="600" height="400" fill="#faf8ff" stroke="#7c3aed" stroke-width="3" stroke-dasharray="6 6"/>
      <!-- Profile Header -->
      <circle cx="80" cy="75" r="35" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/>
      <line x1="135" y1="65" x2="350" y2="65" stroke="#4c1d95" stroke-width="6" stroke-linecap="round"/>
      <line x1="135" y1="88" x2="280" y2="88" stroke="#a78bfa" stroke-width="4" stroke-linecap="round"/>
      <!-- Project Gallery -->
      <rect x="35" y="145" width="250" height="135" rx="8" fill="#ffffff" stroke="#c4b5fd" stroke-width="2"/>
      <rect x="50" y="160" width="220" height="80" rx="4" fill="#ede9fe"/>
      <line x1="50" y1="258" x2="180" y2="258" stroke="#4c1d95" stroke-width="4" stroke-linecap="round"/>

      <rect x="315" y="145" width="250" height="135" rx="8" fill="#ffffff" stroke="#c4b5fd" stroke-width="2"/>
      <rect x="330" y="160" width="220" height="80" rx="4" fill="#ede9fe"/>
      <line x1="330" y1="258" x2="460" y2="258" stroke="#4c1d95" stroke-width="4" stroke-linecap="round"/>

      <!-- Contact Banner -->
      <rect x="35" y="300" width="530" height="50" rx="8" fill="#7c3aed"/>
      <line x1="60" y1="325" x2="300" y2="325" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
      <rect x="420" y="310" width="125" height="30" rx="15" fill="#ffffff"/>
      <!-- Label -->
      <text x="300" y="380" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#6d28d9">[ HAND-DRAWN WIREFRAME PRESET: PORTFOLIO ]</text>
    </svg>`,
  },
];

const PROMPT_SUGGESTIONS = [
  'Modern purple SaaS landing page with responsive nav and cards',
  'Dark themed portfolio with interactive hover cards and contact form',
  'Minimalist startup hero section with email capture and testimonials',
  'E-commerce product grid with responsive cart drawer and filter tabs',
];

const EDIT_SUGGESTIONS = [
  'Change the primary accent color to vibrant indigo/blue',
  'Add a 3-tier pricing table section before the footer',
  'Make the navigation header sticky with a frosted glass effect',
  'Add dark mode styling with smooth background transitions',
  'Add an interactive FAQ accordion section',
];

export default function HomePage() {
  // Input states
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [promptText, setPromptText] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  // Output states
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [htmlHistory, setHtmlHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'code'
  const [deviceView, setDeviceView] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [copiedCode, setCopiedCode] = useState(false);

  // Edit states
  const [editInstruction, setEditInstruction] = useState('');

  // Status & Validation states
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fileInputRef = useRef(null);
  const previewIframeRef = useRef(null);

  // Keep sandboxed iframe updated with generated HTML
  useEffect(() => {
    if (previewIframeRef.current && generatedHtml) {
      const doc = previewIframeRef.current.contentDocument || previewIframeRef.current.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(generatedHtml);
        doc.close();
      }
    }
  }, [generatedHtml, activeTab]);

  // Handle file selection and validation (client-side)
  const handleFileProcess = (file) => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!file) return;

    // Validate MIME type
    const validMimes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validMimes.includes(file.type.toLowerCase())) {
      setErrorMessage('Please upload a valid PNG, JPEG, or WEBP image.');
      return;
    }

    // Validate Size: 5MB = 5 * 1024 * 1024 bytes
    const maxBytes = 5 * 1024 * 1024;
    if (file.size > maxBytes) {
      setErrorMessage(`The selected image (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds the 5 MB limit.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedFile(file);
      setImagePreviewUrl(reader.result);
      setSuccessMessage(`Loaded "${file.name}" (${(file.size / 1024).toFixed(0)} KB) successfully.`);
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read image file. Please try another image.');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreviewUrl('');
    setErrorMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Select sample preset for instant testing
  const handleSelectSample = (preset) => {
    setErrorMessage('');
    const base64Data = typeof window !== 'undefined' ? window.btoa(preset.svg) : '';
    const dataUrl = `data:image/svg+xml;base64,${base64Data}`;
    
    // Create synthetic file-like object for metadata display
    setSelectedFile({
      name: `${preset.id}-sketch-sample.png`,
      size: 45 * 1024,
      type: 'image/png',
    });
    setImagePreviewUrl(dataUrl);
    setPromptText(preset.prompt);
    setSuccessMessage(`Preset "${preset.name}" selected! Click "Generate Website" to start.`);
  };

  // Convert image preview URL to pure base64 for API
  const getImageBase64Data = () => {
    if (!imagePreviewUrl) return null;
    return imagePreviewUrl;
  };

  // Trigger Website Generation via Next.js API route
  const handleGenerate = async () => {
    if (!imagePreviewUrl) {
      setErrorMessage('Please upload a hand-drawn sketch or select a preset sample first.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    setLoadingPhase('Analyzing sketch structure with Gemma 4...');

    try {
      const phaseTimer1 = setTimeout(() => {
        setLoadingPhase('Extracting layout hierarchy, cards, navigation and controls...');
      }, 3500);

      const phaseTimer2 = setTimeout(() => {
        setLoadingPhase('Writing clean responsive HTML5 and modern CSS styling...');
      }, 7000);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate',
          imageBase64: getImageBase64Data(),
          mimeType: selectedFile?.type || 'image/png',
          prompt: promptText,
        }),
      });

      clearTimeout(phaseTimer1);
      clearTimeout(phaseTimer2);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server responded with status ${response.status}`);
      }

      if (!data.html) {
        throw new Error('No HTML code returned from Gemma AI.');
      }

      // Save to history for undo capability
      setHtmlHistory((prev) => [...prev, data.html]);
      setGeneratedHtml(data.html);
      setActiveTab('preview');
      setSuccessMessage('Website successfully generated by Gemma 4!');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to generate website. Please check your API key and connection.');
    } finally {
      setIsLoading(false);
      setLoadingPhase('');
    }
  };

  // Trigger AI Edit / Revision
  const handleEdit = async () => {
    if (!generatedHtml) {
      setErrorMessage('Generate a website first before requesting edits.');
      return;
    }
    if (!editInstruction.trim()) {
      setErrorMessage('Please type an instruction for the AI (e.g. "change button to purple").');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    setLoadingPhase(`Applying edit: "${editInstruction.trim()}"...`);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'edit',
          currentHtml: generatedHtml,
          instruction: editInstruction.trim(),
          imageBase64: imagePreviewUrl || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server responded with status ${response.status}`);
      }

      if (!data.html) {
        throw new Error('No updated HTML code returned from Gemma AI.');
      }

      // Update history and active code
      setHtmlHistory((prev) => [...prev, data.html]);
      setGeneratedHtml(data.html);
      setEditInstruction('');
      setActiveTab('preview');
      setSuccessMessage('Website successfully updated with your instructions!');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to edit website. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingPhase('');
    }
  };

  // Revert / Undo to previous version
  const handleUndo = () => {
    if (htmlHistory.length <= 1) return;
    const newHistory = [...htmlHistory];
    newHistory.pop(); // remove current
    const previous = newHistory[newHistory.length - 1];
    setHtmlHistory(newHistory);
    setGeneratedHtml(previous);
    setSuccessMessage(`Reverted to version ${newHistory.length}.`);
  };

  // Copy HTML source to clipboard
  const handleCopyCode = async () => {
    if (!generatedHtml) return;
    try {
      await navigator.clipboard.writeText(generatedHtml);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } catch (err) {
      setErrorMessage('Failed to copy code to clipboard.');
    }
  };

  // Download standalone HTML file
  const handleDownload = () => {
    if (!generatedHtml) return;
    const blob = new Blob([generatedHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sketch2app-output-v${htmlHistory.length || 1}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="brand">
            <div className="brand-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <div>
              <div className="brand-title">Sketch2App AI</div>
              <div className="brand-subtitle">Gemma 4 Multimodal Engine</div>
            </div>
          </div>

          <div className="header-badges">
            <span className="badge badge-purple">
              <span className="badge-dot"></span>
              Model: gemma-4-26b-a4b-it
            </span>
            <span className="badge" style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1' }}>
              Hackathon Edition
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="main-wrapper">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Google Gen AI + Gemma 4 Powered
          </div>
          <h1 className="hero-title">
            Transform Hand-Drawn Sketches into <span className="gradient-text">Functional Web Apps</span>
          </h1>
          <p className="hero-desc">
            Upload your paper sketch, napkin wireframe, or UI mockup. Gemma 4 analyses your layout,
            extracts design elements, and generates production-ready, responsive HTML & CSS in seconds.
          </p>
        </section>

        {/* Global Feedback Banners */}
        {errorMessage && (
          <div className="alert alert-danger" style={{ maxWidth: 1100, margin: '0 auto 1.5rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div style={{ flex: 1 }}>
              <strong>Notice:</strong> {errorMessage}
            </div>
            <button
              onClick={() => setErrorMessage('')}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', fontWeight: 'bold' }}
            >
              ✕
            </button>
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success" style={{ maxWidth: 1100, margin: '0 auto 1.5rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <div style={{ flex: 1 }}>{successMessage}</div>
            <button
              onClick={() => setSuccessMessage('')}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', fontWeight: 'bold' }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Workspace Grid */}
        <div className="app-grid">
          {/* Left Column: Input and Configuration */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                1. Upload Wireframe Sketch
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary-600)' }}>
                Max 5 MB
              </span>
            </div>

            <div className="card-body">
              {/* Dropzone */}
              {!imagePreviewUrl ? (
                <div
                  className={`upload-dropzone ${isDragOver ? 'dragover' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleFileProcess(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="upload-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <div className="upload-title">Click to upload or drag & drop</div>
                  <div className="upload-subtitle">Hand-drawn sketch, wireframe, or mockup</div>
                  <span className="upload-limits">PNG, JPEG, WEBP up to 5 MB</span>
                </div>
              ) : (
                /* Preview Box */
                <div className="preview-thumbnail-box">
                  <div className="preview-thumbnail-header">
                    <span>
                      📷 {selectedFile?.name || 'Uploaded Sketch'}
                      {selectedFile?.size ? ` (${(selectedFile.size / 1024).toFixed(0)} KB)` : ''}
                    </span>
                    <button
                      type="button"
                      className="btn-remove-preview"
                      onClick={handleRemoveImage}
                      title="Clear image"
                    >
                      ✕ Remove
                    </button>
                  </div>
                  <div className="preview-img-wrapper">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imagePreviewUrl} alt="Uploaded wireframe preview" />
                  </div>
                </div>
              )}

              {/* Quick Preset Samples for Hackathon Demonstration */}
              <div className="samples-wrapper">
                <div className="samples-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  No sketch ready? Try a sample:
                </div>
                <div className="samples-grid">
                  {SAMPLE_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      className="sample-chip"
                      onClick={() => handleSelectSample(preset)}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Prompt Field */}
              <div className="form-group">
                <label className="form-label" htmlFor="design-prompt">
                  <span>Design Instructions & Notes</span>
                  <span className="form-label-tag">Optional</span>
                </label>
                <textarea
                  id="design-prompt"
                  className="textarea-custom"
                  rows={3}
                  placeholder="e.g. Modern purple SaaS layout, dark buttons, include a working contact form with responsive grid..."
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                />

                {/* Prompt Suggestions */}
                <div className="prompt-chips">
                  {PROMPT_SUGGESTIONS.map((sug, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="chip-btn"
                      onClick={() => setPromptText(sug)}
                    >
                      + {sug.split(' ')[0]} {sug.split(' ')[1]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Action Button */}
              <button
                type="button"
                className="btn-primary"
                onClick={handleGenerate}
                disabled={isLoading || !imagePreviewUrl}
              >
                {isLoading ? (
                  <>
                    <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2, margin: 0 }}></span>
                    Synthesizing with Gemma 4...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    Generate Website (Gemma 4)
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Output, Preview, Code & AI Editing */}
          <div className="card">
            <div className="card-header">
              <div className="output-header-controls">
                {/* Tabs: Preview vs Code */}
                <div className="tabs-wrapper">
                  <button
                    type="button"
                    className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('preview')}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    Live Preview (Sandboxed)
                  </button>
                  <button
                    type="button"
                    className={`tab-btn ${activeTab === 'code' ? 'active' : ''}`}
                    onClick={() => setActiveTab('code')}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                    Source Code
                  </button>
                </div>

                {/* Device Viewport Switcher (Active on Preview) */}
                {activeTab === 'preview' && generatedHtml && (
                  <div className="device-switcher">
                    <button
                      type="button"
                      className={`device-btn ${deviceView === 'desktop' ? 'active' : ''}`}
                      onClick={() => setDeviceView('desktop')}
                      title="Desktop view"
                    >
                      🖥️ Desktop
                    </button>
                    <button
                      type="button"
                      className={`device-btn ${deviceView === 'tablet' ? 'active' : ''}`}
                      onClick={() => setDeviceView('tablet')}
                      title="Tablet view (768px)"
                    >
                      📱 Tablet
                    </button>
                    <button
                      type="button"
                      className={`device-btn ${deviceView === 'mobile' ? 'active' : ''}`}
                      onClick={() => setDeviceView('mobile')}
                      title="Mobile view (375px)"
                    >
                      📲 Mobile
                    </button>
                  </div>
                )}

                {/* Actions: Copy & Download */}
                {generatedHtml && (
                  <div className="action-buttons-group">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={handleCopyCode}
                      title="Copy raw HTML to clipboard"
                    >
                      {copiedCode ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          Copy HTML
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={handleDownload}
                      title="Download website as standalone HTML file"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download HTML
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="card-body">
              {/* Output Content Area */}
              {isLoading ? (
                <div className="loading-view">
                  <div className="spinner"></div>
                  <div className="loading-title">Gemma 4 is crafting your application...</div>
                  <div className="loading-subtitle">{loadingPhase}</div>
                  <div className="loading-steps">
                    <div className="loading-step-item active">
                      <span>✓</span> Upload & image payload validated
                    </div>
                    <div className="loading-step-item active">
                      <span>✓</span> Transmitting to Gemma 4 Vision (`gemma-4-26b-a4b-it`)
                    </div>
                    <div className="loading-step-item">
                      <span>•</span> Synthesizing single-page HTML5, CSS styles, & scripts
                    </div>
                  </div>
                </div>
              ) : !generatedHtml ? (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  </div>
                  <div className="empty-state-title">Ready to Generate Your Web App</div>
                  <div className="empty-state-desc">
                    Upload a sketch or choose one of our demo presets on the left, then click{' '}
                    <strong>Generate Website</strong>. Your interactive sandboxed website will appear here!
                  </div>
                </div>
              ) : activeTab === 'preview' ? (
                /* Sandboxed Interactive Iframe */
                <div className="preview-viewport-wrapper">
                  <iframe
                    ref={previewIframeRef}
                    className={`preview-iframe ${deviceView}`}
                    title="Sketch2App Generated Website"
                    sandbox="allow-scripts allow-modals allow-forms"
                  />
                </div>
              ) : (
                /* Source Code Editor View */
                <div className="code-editor-wrapper">
                  <div className="code-editor-bar">
                    <span>index.html ({generatedHtml.split('\n').length} lines, {generatedHtml.length} chars)</span>
                    <span>HTML5 + CSS + JS</span>
                  </div>
                  <pre className="code-pre">
                    <code>{generatedHtml}</code>
                  </pre>
                </div>
              )}

              {/* AI Editing Feature Panel */}
              {generatedHtml && !isLoading && (
                <div className="ai-edit-panel">
                  <div className="ai-edit-header">
                    <div className="ai-edit-title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                      AI Website Editor
                      <span className="version-badge">v{htmlHistory.length}</span>
                    </div>

                    {htmlHistory.length > 1 && (
                      <div className="history-controls">
                        <button type="button" className="btn-undo" onClick={handleUndo}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <polyline points="1 4 1 10 7 10" />
                            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                          </svg>
                          Revert to v{htmlHistory.length - 1}
                        </button>
                      </div>
                    )}
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEdit();
                    }}
                    className="ai-edit-form"
                  >
                    <input
                      type="text"
                      className="ai-edit-input"
                      placeholder="e.g. Change button color to royal blue, add a sticky navigation bar..."
                      value={editInstruction}
                      onChange={(e) => setEditInstruction(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btn-ai-edit"
                      disabled={isLoading || !editInstruction.trim()}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                      Update Website
                    </button>
                  </form>

                  {/* Quick Edit Suggestions */}
                  <div className="quick-edit-chips">
                    {EDIT_SUGGESTIONS.map((suggestion, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="quick-chip"
                        onClick={() => setEditInstruction(suggestion)}
                      >
                        ⚡ {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <strong>Sketch2App AI</strong> — Built with Next.js App Router, React, Google Gen AI SDK, and Gemma 4 (`gemma-4-26b-a4b-it`).
          </div>
          <div className="footer-links">
            <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer">
              Google AI Studio
            </a>
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
              Deploy to Vercel
            </a>
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
              Next.js Docs
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
