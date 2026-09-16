import React, { useState } from 'react';
import { Search, Plus, Minus } from 'lucide-react';
import './LocationSection.css';

export default function LocationSection({ location }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.15, 1.4));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.15, 0.85));

  return (
    <section id="location-section" className="location-section" aria-label="Location and neighborhood">
      <h3 className="section-title">Where you'll be</h3>
      <p className="location-neighborhood-heading">{location.neighborhood}</p>

      {/* Styled Interactive Map Canvas matching Screenshot 1 */}
      <div className="exact-map-card">
        <div 
          className="exact-map-canvas"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Angled Coastal Water */}
          <div className="exact-water-zone">
            {/* Circle 1 near coast */}
            <div className="exact-green-circle circle-coast" />
          </div>

          {/* Land Grid Area */}
          <div className="exact-land-zone">
            {/* Grid overlay lines */}
            <div className="grid-line vertical line-1" />
            <div className="grid-line vertical line-2" />
            <div className="grid-line vertical line-3" />
            <div className="grid-line vertical line-4" />
            <div className="grid-line horizontal line-a" />
            <div className="grid-line horizontal line-b" />
            <div className="grid-line horizontal line-c" />

            {/* Circle 2 on land */}
            <div className="exact-green-circle circle-land" />

            {/* Center Airbnb Home Pin Badge */}
            <div className="exact-home-marker-badge">
              <svg 
                viewBox="0 0 24 24" 
                width="24" 
                height="24" 
                fill="none" 
                stroke="#FFFFFF" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M3 10.5L12 3l9 7.5" />
                <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
                <path d="M10 21v-7h4v7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Top-Left Search Button */}
        <button className="map-search-circle-btn" onClick={() => alert("Search Candolim area")} aria-label="Search map">
          <Search size={16} strokeWidth={2.5} />
        </button>

        {/* Top-Right Vertical Zoom Pill */}
        <div className="map-zoom-pill">
          <button className="zoom-btn in" onClick={handleZoomIn} aria-label="Zoom in">
            <Plus size={16} strokeWidth={2.5} />
          </button>
          <div className="zoom-divider" />
          <button className="zoom-btn out" onClick={handleZoomOut} aria-label="Zoom out">
            <Minus size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <p className="exact-location-subtext">
        Exact location will be provided after booking.
      </p>
    </section>
  );
}
