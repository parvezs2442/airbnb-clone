import React, { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Share, Heart } from 'lucide-react';
import './Lightbox.css';

export default function Lightbox({ 
  photos, 
  initialIndex = 0, 
  onClose 
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isSaved, setIsSaved] = useState(false);

  const totalPhotos = photos.length;
  const currentPhoto = photos[currentIndex] || photos[0];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalPhotos - 1 : prev - 1));
  }, [totalPhotos]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalPhotos - 1 ? 0 : prev + 1));
  }, [totalPhotos]);

  // Keyboard navigation: ArrowLeft, ArrowRight, Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!currentPhoto) return null;

  return (
    <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Photo Lightbox">
      {/* Top Header */}
      <header className="lightbox-header">
        <div className="lb-header-left">
          <button 
            className="lightbox-close-circle-btn" 
            onClick={onClose}
            aria-label="Close photo viewer"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className="lightbox-counter">
          <span>{currentIndex + 1} / {totalPhotos}</span>
        </div>

        <div className="lightbox-actions">
          <button className="lb-header-action-btn" aria-label="Share this photo">
            <Share size={16} strokeWidth={2.2} />
            <span>Share</span>
          </button>
          <button 
            className={`lb-header-action-btn ${isSaved ? 'saved' : ''}`}
            onClick={() => setIsSaved(!isSaved)}
            aria-label="Save photo"
          >
            <Heart 
              size={16} 
              strokeWidth={2.2} 
              fill={isSaved ? "#FF385C" : "none"} 
              color={isSaved ? "#FF385C" : "currentColor"} 
            />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </header>

      {/* Main Single Photo Viewing Area */}
      <main className="lightbox-main">
        {/* Floating Previous Button */}
        <button 
          className="lightbox-nav-circle prev" 
          onClick={handlePrev} 
          aria-label="Previous photo"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>

        {/* Central Display Image */}
        <div className="lightbox-stage">
          <img 
            key={currentIndex}
            src={currentPhoto.url} 
            alt={currentPhoto.caption || `Listing photo ${currentIndex + 1}`} 
            className="lightbox-central-img" 
          />
        </div>

        {/* Floating Next Button */}
        <button 
          className="lightbox-nav-circle next" 
          onClick={handleNext} 
          aria-label="Next photo"
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </main>

      {/* Footer Caption */}
      <footer className="lightbox-footer">
        {currentPhoto.caption && (
          <p className="lightbox-caption-text">{currentPhoto.caption}</p>
        )}
      </footer>
    </div>
  );
}
