import React from 'react';
import { Grid } from 'lucide-react';
import './HeroGrid.css';

export default function HeroGrid({ images, onOpenPhotoTour }) {
  const [main, img1, img2, img3, img4] = images;

  return (
    <section className="hero-grid-section" aria-label="Photo gallery preview">
      <div className="hero-grid-container">
        {/* Main Large Photo (Left) */}
        <div 
          className="hero-grid-item main-photo" 
          onClick={() => onOpenPhotoTour(0)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onOpenPhotoTour(0)}
          aria-label="View photo tour: Main terrace and jacuzzi"
        >
          <img src={main.url} alt={main.title} className="hero-img" />
          <div className="hero-img-overlay" />
        </div>

        {/* 2x2 Grid (Right) */}
        <div className="hero-subgrid">
          <div 
            className="hero-grid-item sub-photo top-left" 
            onClick={() => onOpenPhotoTour(1)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpenPhotoTour(1)}
            aria-label="View photo tour: Terrace seating"
          >
            <img src={img1.url} alt={img1.title} className="hero-img" />
            <div className="hero-img-overlay" />
          </div>

          <div 
            className="hero-grid-item sub-photo top-right" 
            onClick={() => onOpenPhotoTour(2)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpenPhotoTour(2)}
            aria-label="View photo tour: Teak jacuzzi deck"
          >
            <img src={img2.url} alt={img2.title} className="hero-img" />
            <div className="hero-img-overlay" />
          </div>

          <div 
            className="hero-grid-item sub-photo bottom-left" 
            onClick={() => onOpenPhotoTour(3)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpenPhotoTour(3)}
            aria-label="View photo tour: Bedroom"
          >
            <img src={img3.url} alt={img3.title} className="hero-img" />
            <div className="hero-img-overlay" />
          </div>

          <div 
            className="hero-grid-item sub-photo bottom-right" 
            onClick={() => onOpenPhotoTour(4)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpenPhotoTour(4)}
            aria-label="View photo tour: Apartment exterior"
          >
            <img src={img4.url} alt={img4.title} className="hero-img" />
            <div className="hero-img-overlay" />
            
            {/* Show All Photos Floating Pill Button */}
            <button 
              className="show-all-photos-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenPhotoTour(0);
              }}
              aria-label="Show all photos in full gallery tour"
            >
              <svg className="grid-icon-svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                <circle cx="2" cy="2" r="1.5" />
                <circle cx="8" cy="2" r="1.5" />
                <circle cx="14" cy="2" r="1.5" />
                <circle cx="2" cy="8" r="1.5" />
                <circle cx="8" cy="8" r="1.5" />
                <circle cx="14" cy="8" r="1.5" />
                <circle cx="2" cy="14" r="1.5" />
                <circle cx="8" cy="14" r="1.5" />
                <circle cx="14" cy="14" r="1.5" />
              </svg>
              <span>Show all photos</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
