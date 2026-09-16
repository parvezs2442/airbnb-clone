import React, { useState } from 'react';
import { Star, CheckCircle, Key, MessageSquare, Map, Tag, Sparkles } from 'lucide-react';
import './Reviews.css';

export default function Reviews({ reviewsData }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleExpand = (id) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderIcon = (type) => {
    const props = { size: 28, strokeWidth: 1.5, color: '#222222' };
    switch (type) {
      case 'spray':
        return (
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 6H20V10H12z" />
            <path d="M16 10V14" />
            <path d="M11 14H21L23 28H9L11 14z" />
            <path d="M14 6L14 3" />
            <circle cx="23" cy="5" r="1" fill="currentColor" />
            <circle cx="26" cy="7" r="1" fill="currentColor" />
          </svg>
        );
      case 'check':
        return <CheckCircle {...props} />;
      case 'key':
        return <Key {...props} />;
      case 'message':
        return <MessageSquare {...props} />;
      case 'map':
        return <Map {...props} />;
      case 'tag':
        return <Tag {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  return (
    <section id="reviews-section" className="reviews-section" aria-label="Guest reviews">
      {/* 1. Giant Laurel Wreath Header */}
      <div className="reviews-laurel-header">
        <div className="laurel-wreath-score-box">
          <svg className="laurel-branch left" viewBox="0 0 50 100" width="48" height="96" fill="currentColor">
            <path d="M45,90 C35,75 25,60 25,45 C25,30 35,15 45,5 C40,15 30,30 30,45 C30,60 40,75 45,90 Z" />
            <circle cx="35" cy="20" r="4" />
            <circle cx="25" cy="35" r="4" />
            <circle cx="20" cy="52" r="4" />
            <circle cx="25" cy="70" r="4" />
            <circle cx="35" cy="85" r="4" />
          </svg>

          <span className="giant-score-text">4.95</span>

          <svg className="laurel-branch right" viewBox="0 0 50 100" width="48" height="96" fill="currentColor">
            <path d="M5,90 C15,75 25,60 25,45 C25,30 15,15 5,5 C10,15 20,30 20,45 C20,60 10,75 5,90 Z" />
            <circle cx="15" cy="20" r="4" />
            <circle cx="25" cy="35" r="4" />
            <circle cx="30" cy="52" r="4" />
            <circle cx="25" cy="70" r="4" />
            <circle cx="15" cy="85" r="4" />
          </svg>
        </div>

        <h3 className="gf-heading-title">Guest favourite</h3>
        <p className="gf-heading-sub">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button className="how-reviews-work-btn" onClick={() => alert("How reviews work dialog")}>
          How reviews work
        </button>
      </div>

      {/* 2. 7-Column Rating Scorecard */}
      <div className="reviews-scorecard-row">
        {/* Col 1: Overall rating bar chart */}
        <div className="scorecard-col overall-rating-col">
          <span className="scorecard-cat-title">Overall rating</span>
          <div className="overall-bars-stack">
            <div className="bar-row">
              <span className="bar-num">5</span>
              <div className="bar-line full" />
            </div>
            <div className="bar-row">
              <span className="bar-num">4</span>
              <div className="bar-line empty" />
            </div>
            <div className="bar-row">
              <span className="bar-num">3</span>
              <div className="bar-line empty" />
            </div>
            <div className="bar-row">
              <span className="bar-num">2</span>
              <div className="bar-line empty" />
            </div>
            <div className="bar-row">
              <span className="bar-num">1</span>
              <div className="bar-line empty" />
            </div>
          </div>
        </div>

        {/* Cols 2-7: Sub-category metrics */}
        {reviewsData.scorecard.map((item, idx) => (
          <div key={idx} className="scorecard-col">
            <span className="scorecard-cat-title">{item.label}</span>
            <span className="scorecard-cat-val">{item.score}</span>
            <div className="scorecard-icon-box">
              {renderIcon(item.icon)}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Review Filter Pills */}
      <div className="review-filters-bar">
        {reviewsData.filterTags.map((tag) => (
          <button
            key={tag.id}
            className={`filter-pill ${selectedTag === tag.id ? 'active' : ''}`}
            onClick={() => setSelectedTag(selectedTag === tag.id ? null : tag.id)}
          >
            <span className="pill-emoji">{tag.emoji}</span>
            <span className="pill-label">{tag.label}</span>
            <span className="pill-count">{tag.count}</span>
          </button>
        ))}
      </div>

      {/* 4. 2-Column Guest Review Cards Grid */}
      <div className="review-cards-layout-grid">
        {reviewsData.items.map((review) => {
          const isExpanded = expandedReviews[review.id];
          return (
            <div key={review.id} className="exact-review-card">
              <div className="exact-reviewer-header">
                <div 
                  className="exact-avatar" 
                  style={{ backgroundColor: review.avatarBg }}
                >
                  {review.avatarLetter}
                </div>
                <div className="exact-reviewer-info">
                  <h4 className="exact-author-name">{review.author}</h4>
                  <p className="exact-author-tenure">{review.tenure}</p>
                </div>
              </div>

              <div className="exact-stars-date-row">
                <div className="exact-stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={11} fill="#222222" color="#222222" />
                  ))}
                </div>
                <span className="exact-dot">·</span>
                <span className="exact-date">{review.date}</span>
              </div>

              <div className="exact-review-body">
                <p className={`exact-review-p ${isExpanded ? 'expanded' : ''}`}>
                  {review.text}
                </p>
                {review.expandable && (
                  <button 
                    className="review-show-more-toggle"
                    onClick={() => toggleExpand(review.id)}
                  >
                    {isExpanded ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
