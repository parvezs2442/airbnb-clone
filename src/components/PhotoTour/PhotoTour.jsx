import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Share, Heart } from 'lucide-react';
import './PhotoTour.css';

export default function PhotoTour({ 
  categories, 
  onClose, 
  onSelectPhoto 
}) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '');
  const [isSaved, setIsSaved] = useState(false);
  const containerRef = useRef(null);

  // Flatten all photos for easy global index referencing
  const allPhotos = [];
  categories.forEach(cat => {
    cat.photos.forEach(photo => {
      allPhotos.push({
        ...photo,
        categoryName: cat.name,
        categoryId: cat.id
      });
    });
  });

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll while Photo Tour is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const scrollToCategory = (catId) => {
    setActiveCategory(catId);
    const target = document.getElementById(`tour-cat-${catId}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePhotoClick = (photo) => {
    const globalIdx = allPhotos.findIndex(p => p.id === photo.id);
    onSelectPhoto(globalIdx >= 0 ? globalIdx : 0);
  };

  return (
    <div className="photo-tour-overlay fade-in" ref={containerRef}>
      {/* Top Fixed Header */}
      <header className="tour-header">
        <div className="tour-header-left">
          <button 
            className="tour-back-btn" 
            onClick={onClose} 
            aria-label="Back to listing"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Category Tabs */}
        <nav className="tour-categories-nav" aria-label="Photo tour room categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`tour-category-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => scrollToCategory(cat.id)}
            >
              <div className="tab-thumb-icon">
                <img src={cat.photos[0]?.url} alt="" />
              </div>
              <span className="tab-text">{cat.name}</span>
            </button>
          ))}
        </nav>

        <div className="tour-header-right">
          <button className="tour-action-btn" aria-label="Share photo tour">
            <Share size={16} strokeWidth={2.2} />
            <span>Share</span>
          </button>
          <button 
            className={`tour-action-btn ${isSaved ? 'saved' : ''}`} 
            onClick={() => setIsSaved(!isSaved)}
            aria-label="Save listing"
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

      {/* Main Scrollable Photo Tour Body */}
      <main className="tour-main-content">
        <div className="tour-content-inner">
          {categories.map((cat) => (
            <section key={cat.id} id={`tour-cat-${cat.id}`} className="tour-category-section">
              <div className="tour-section-header">
                <h2 className="tour-room-title">{cat.name}</h2>
                {cat.subtitle && (
                  <p className="tour-room-subtitle">{cat.subtitle}</p>
                )}
              </div>

              <div className={`tour-photos-grid ${cat.photos.length === 1 ? 'single-photo' : ''}`}>
                {cat.photos.map((photo, pIdx) => (
                  <div 
                    key={photo.id} 
                    className={`tour-photo-wrapper ${pIdx === 0 && cat.photos.length > 2 ? 'featured' : ''}`}
                    onClick={() => handlePhotoClick(photo)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handlePhotoClick(photo)}
                    aria-label={`View photo in lightbox: ${photo.caption || cat.name}`}
                  >
                    <img src={photo.url} alt={photo.caption || cat.name} className="tour-photo-img" loading="lazy" />
                    <div className="tour-photo-overlay" />
                    {photo.caption && (
                      <div className="tour-photo-caption-tag">
                        <span>{photo.caption}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
