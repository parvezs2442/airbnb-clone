import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';
import './MoreStaysNearby.css';

export default function MoreStaysNearby({ stays }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [savedStays, setSavedStays] = useState({});
  const scrollContainerRef = useRef(null);

  const toggleSave = (id) => {
    setSavedStays((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleScrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
      setCurrentPage(1);
    }
  };

  const handleScrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      setCurrentPage(2);
    }
  };

  return (
    <section className="more-stays-section" aria-label="More stays nearby">
      <div className="more-stays-header">
        <h3 className="section-title">More stays nearby</h3>
        <div className="stays-pagination-controls">
          <span className="pagination-counter">{currentPage} / 2</span>
          <button 
            className="pagination-arrow-btn" 
            onClick={handleScrollPrev}
            disabled={currentPage === 1}
            aria-label="Previous stays"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>
          <button 
            className="pagination-arrow-btn" 
            onClick={handleScrollNext}
            disabled={currentPage === 2}
            aria-label="Next stays"
          >
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="stays-cards-scroll-track" ref={scrollContainerRef}>
        {stays.map((stay) => {
          const isSaved = savedStays[stay.id];
          return (
            <div key={stay.id} className="stay-card-item">
              <div className="stay-image-box">
                <img src={stay.image} alt={stay.title} className="stay-thumb-img" />
                <button 
                  className={`stay-heart-btn ${isSaved ? 'saved' : ''}`}
                  onClick={() => toggleSave(stay.id)}
                  aria-label="Save to wishlist"
                >
                  <Heart 
                    size={18} 
                    fill={isSaved ? "#FF385C" : "rgba(0,0,0,0.5)"} 
                    color={isSaved ? "#FF385C" : "#FFFFFF"} 
                    strokeWidth={2}
                  />
                </button>
                {stay.badge && (
                  <span className="stay-card-badge">{stay.badge}</span>
                )}
              </div>

              <div className="stay-meta-box">
                <h4 className="stay-title-text">{stay.title}</h4>
                <div className="stay-price-rating-row">
                  {stay.price && <span className="stay-price-bold">{stay.price}</span>}
                  {stay.rating && (
                    <div className="stay-rating-val">
                      <Star size={12} fill="#222222" color="#222222" />
                      <span>{stay.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
