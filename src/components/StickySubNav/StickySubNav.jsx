import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import './StickySubNav.css';

export default function StickySubNav({ onReserveClick, totalPrice, nights, rating, reviewCount }) {
  const [activeTab, setActiveTab] = useState('photos');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-grid-section');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsSticky(heroBottom <= 80); // 80px header height
      }

      // ScrollSpy for sections
      const sections = [
        { id: 'photos', el: document.querySelector('.hero-grid-section') },
        { id: 'amenities', el: document.querySelector('#amenities-section') },
        { id: 'reviews', el: document.querySelector('#reviews-section') },
        { id: 'location', el: document.querySelector('#location-section') },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.el) {
          const rect = sec.el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveTab(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveTab(id);
    let target = null;
    if (id === 'photos') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    } else if (id === 'amenities') {
      target = document.querySelector('#amenities-section');
    } else if (id === 'reviews') {
      target = document.querySelector('#reviews-section');
    } else if (id === 'location') {
      target = document.querySelector('#location-section');
    }

    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.pageYOffset - 140;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`sticky-subnav ${isSticky ? 'is-sticky' : ''}`} aria-label="Listing navigation tabs">
      <div className="container subnav-container">
        {/* Navigation Tabs */}
        <div className="subnav-tabs">
          <button 
            className={`subnav-tab ${activeTab === 'photos' ? 'active' : ''}`}
            onClick={() => scrollToSection('photos')}
          >
            Photos
          </button>
          <button 
            className={`subnav-tab ${activeTab === 'amenities' ? 'active' : ''}`}
            onClick={() => scrollToSection('amenities')}
          >
            Amenities
          </button>
          <button 
            className={`subnav-tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => scrollToSection('reviews')}
          >
            Reviews
          </button>
          <button 
            className={`subnav-tab ${activeTab === 'location' ? 'active' : ''}`}
            onClick={() => scrollToSection('location')}
          >
            Location
          </button>
        </div>

        {/* Right Sticky Reserve Bar (shown when scrolled down) */}
        <div className={`subnav-reserve-bar ${isSticky ? 'visible' : ''}`}>
          <div className="mini-price-info">
            <div className="mini-price-row">
              <span className="mini-price-val">₹{totalPrice.toLocaleString('en-IN')}</span>
              <span className="mini-price-sub"> for {nights} nights</span>
            </div>
            <div className="mini-rating-row">
              <Star size={11} fill="#222222" color="#222222" />
              <span className="mini-rating-text">{rating} · {reviewCount} reviews</span>
            </div>
          </div>
          <button className="mini-reserve-btn" onClick={onReserveClick}>
            Reserve
          </button>
        </div>
      </div>
    </nav>
  );
}
