import React, { useState } from 'react';
import { Share, Heart, Copy, Check, X } from 'lucide-react';
import './TitleBar.css';

export default function TitleBar({ title }) {
  const [isSaved, setIsSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="title-bar-section">
      <div className="title-container">
        <h1 className="listing-main-title">{title}</h1>
        <div className="title-actions">
          <button 
            className="action-btn share-btn" 
            onClick={() => setShowShareModal(true)}
            aria-label="Share listing"
          >
            <Share size={16} strokeWidth={2.2} />
            <span className="action-text">Share</span>
          </button>
          <button 
            className={`action-btn save-btn ${isSaved ? 'saved' : ''}`}
            onClick={() => setIsSaved(!isSaved)}
            aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
          >
            <Heart 
              size={16} 
              strokeWidth={2.2} 
              fill={isSaved ? "#FF385C" : "none"} 
              color={isSaved ? "#FF385C" : "currentColor"} 
            />
            <span className="action-text">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {showShareModal && (
        <div className="share-modal-backdrop fade-in" onClick={() => setShowShareModal(false)}>
          <div className="share-modal-box slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-top">
              <button className="close-share-btn" onClick={() => setShowShareModal(false)} aria-label="Close share dialog">
                <X size={18} />
              </button>
              <h3 className="share-modal-title">Share this place</h3>
            </div>
            <div className="share-modal-body">
              <div className="share-preview-card">
                <img src="/images/hero_jacuzzi_patio.jpg" alt="Preview" className="share-preview-img" />
                <div className="share-preview-info">
                  <p className="share-preview-title">{title}</p>
                  <p className="share-preview-subtitle">Entire serviced apartment · Candolim</p>
                </div>
              </div>
              <div className="share-copy-row">
                <input 
                  type="text" 
                  readOnly 
                  value={window.location.href} 
                  className="share-url-input" 
                />
                <button className="copy-url-btn" onClick={handleCopyLink}>
                  {copied ? <Check size={16} color="#008A05" /> : <Copy size={16} />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
