import React, { useState } from 'react';
import { 
  Star, ShoppingBag, Fan, DoorOpen, ChevronRight, X, 
  Utensils, Wifi, Laptop, Car, Waves, Bath, 
  Camera, BellOff, ShieldAlert, ChevronLeft
} from 'lucide-react';
import './ListingDetails.css';

export default function ListingDetails({ 
  listing, 
  checkIn, 
  checkOut, 
  setCheckIn, 
  setCheckOut, 
  nights,
  onOpenPhotoTour
}) {
  const [showDescModal, setShowDescModal] = useState(false);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(9); // October (0-indexed: 9 = October)
  const [calendarYear, setCalendarYear] = useState(2026);
  const [selectingDateType, setSelectingDateType] = useState('checkIn'); // 'checkIn' or 'checkOut'

  // Helper for rendering amenity preview icons
  const getAmenityIcon = (iconName, unavailable) => {
    const props = { size: 24, strokeWidth: 1.6, color: unavailable ? '#717171' : '#222222' };
    switch (iconName) {
      case 'utensils': return <Utensils {...props} />;
      case 'wifi': return <Wifi {...props} />;
      case 'laptop': return <Laptop {...props} />;
      case 'car': return <Car {...props} />;
      case 'waves': return <Waves {...props} />;
      case 'bath': return <Bath {...props} />;
      case 'paw-print': return <span style={{ fontSize: '22px' }}>🐾</span>;
      case 'camera': return <Camera {...props} />;
      case 'shield-alert': return <ShieldAlert {...props} />;
      case 'bell-off': return <BellOff {...props} />;
      default: return <Utensils {...props} />;
    }
  };

  // Calendar generation helpers
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

  const handleDateClick = (year, month, day) => {
    const clickedDate = new Date(year, month, day);
    if (selectingDateType === 'checkIn') {
      setCheckIn(clickedDate);
      // Auto move checkout if clicked after current checkout
      if (checkOut && clickedDate >= checkOut) {
        const nextDay = new Date(clickedDate);
        nextDay.setDate(clickedDate.getDate() + 1);
        setCheckOut(nextDay);
      }
      setSelectingDateType('checkOut');
    } else {
      if (clickedDate <= checkIn) {
        setCheckIn(clickedDate);
      } else {
        setCheckOut(clickedDate);
        setSelectingDateType('checkIn');
      }
    }
  };

  const isDateSelected = (year, month, day) => {
    const target = new Date(year, month, day);
    if (!checkIn || !checkOut) return false;
    return target >= checkIn && target <= checkOut;
  };

  const isDateStart = (year, month, day) => {
    if (!checkIn) return false;
    return (
      checkIn.getFullYear() === year &&
      checkIn.getMonth() === month &&
      checkIn.getDate() === day
    );
  };

  const isDateEnd = (year, month, day) => {
    if (!checkOut) return false;
    return (
      checkOut.getFullYear() === year &&
      checkOut.getMonth() === month &&
      checkOut.getDate() === day
    );
  };

  const renderMonth = (year, month) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const totalDays = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const blanks = Array.from({ length: firstDay }, (_, i) => i);
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);

    return (
      <div className="calendar-month-col">
        <div className="calendar-month-title">
          {monthNames[month]} {year}
        </div>
        <div className="calendar-weekdays-row">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
            <span key={idx} className="weekday-label">{day}</span>
          ))}
        </div>
        <div className="calendar-days-grid">
          {blanks.map((b) => (
            <div key={`blank-${b}`} className="calendar-day-cell empty" />
          ))}
          {days.map((day) => {
            const isStart = isDateStart(year, month, day);
            const isEnd = isDateEnd(year, month, day);
            const inRange = isDateSelected(year, month, day);

            let cellClass = 'calendar-day-cell active-day';
            if (isStart) cellClass += ' range-start';
            if (isEnd) cellClass += ' range-end';
            if (inRange && !isStart && !isEnd) cellClass += ' in-range';

            return (
              <button
                key={`day-${day}`}
                className={cellClass}
                onClick={() => handleDateClick(year, month, day)}
                aria-label={`${day} ${monthNames[month]} ${year}`}
              >
                <span>{day}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const nextMonth = calendarMonth === 11 ? 0 : calendarMonth + 1;
  const nextYear = calendarMonth === 11 ? calendarYear + 1 : calendarYear;

  const formatDateRange = () => {
    if (!checkIn || !checkOut) return listing.dates.rangeText;
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return `${checkIn.toLocaleDateString('en-GB', options)} - ${checkOut.toLocaleDateString('en-GB', options)}`;
  };

  return (
    <div className="listing-details-container">
      {/* Property Heading & Specs */}
      <div className="listing-summary-header">
        <h2 className="property-type-heading">{listing.type}</h2>
        <p className="property-specs-text">{listing.specs}</p>
      </div>

      {/* Guest Favourite Badge Banner */}
      <div className="guest-favourite-card">
        <div className="gf-left">
          <div className="gf-wreath-icon">
            <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M7 23C7 16 11 11 16 9M25 23C25 16 21 11 16 9M16 26V8" />
              <circle cx="10" cy="14" r="1.5" fill="currentColor" />
              <circle cx="22" cy="14" r="1.5" fill="currentColor" />
              <circle cx="8" cy="19" r="1.5" fill="currentColor" />
              <circle cx="24" cy="19" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div className="gf-text-col">
            <span className="gf-title">Guest favourite</span>
            <span className="gf-subtitle">One of the most loved homes on Airbnb, according to guests</span>
          </div>
        </div>

        <div className="gf-rating-col">
          <span className="gf-rating-number">{listing.rating}</span>
          <div className="gf-stars-row">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} fill="#222222" color="#222222" />
            ))}
          </div>
        </div>

        <div className="gf-divider-line" />

        <div className="gf-reviews-col">
          <span className="gf-reviews-number">{listing.reviewCount}</span>
          <span className="gf-reviews-label">Reviews</span>
        </div>
      </div>

      {/* Host Information */}
      <div className="host-brief-section">
        <div 
          className="host-avatar" 
          style={{ backgroundColor: listing.host.avatarBg }}
          aria-label={`Hosted by ${listing.host.name}`}
        >
          {listing.host.avatarText}
        </div>
        <div className="host-brief-info">
          <h3 className="host-name">Hosted by {listing.host.name}</h3>
          <p className="host-tenure">{listing.host.tenure}</p>
        </div>
      </div>

      <div className="section-divider" />

      {/* Key Highlights */}
      <div className="listing-highlights-section">
        <div className="highlight-item">
          <div className="highlight-icon">
            <ShoppingBag size={24} strokeWidth={1.6} />
          </div>
          <div className="highlight-text">
            <h4 className="highlight-title">Outdoor entertainment</h4>
            <p className="highlight-desc">The pool and alfresco dining are great for summer trips.</p>
          </div>
        </div>

        <div className="highlight-item">
          <div className="highlight-icon">
            <Fan size={24} strokeWidth={1.6} />
          </div>
          <div className="highlight-text">
            <h4 className="highlight-title">Designed for staying cool</h4>
            <p className="highlight-desc">Beat the heat with the A/C and ceiling fan.</p>
          </div>
        </div>

        <div className="highlight-item">
          <div className="highlight-icon">
            <DoorOpen size={24} strokeWidth={1.6} />
          </div>
          <div className="highlight-text">
            <h4 className="highlight-title">Self check-in</h4>
            <p className="highlight-desc">You can check in with the building staff.</p>
          </div>
        </div>
      </div>

      <div className="section-divider" />

      {/* Automatic Translation Banner */}
      <div className="translation-banner">
        <span>Some info has been automatically translated. </span>
        <button className="show-original-btn" onClick={() => alert("Showing original English text")}>
          Show original
        </button>
      </div>

      {/* Description Paragraph */}
      <div className="description-section">
        <p className="description-text">{listing.description.short}</p>
        <button className="show-more-btn" onClick={() => setShowDescModal(true)}>
          <span>Show more</span>
          <ChevronRight size={16} strokeWidth={2.5} />
        </button>
      </div>

      <div className="section-divider" />

      {/* Where you'll sleep */}
      <div className="where-you-sleep-section">
        <h3 className="section-title">Where you'll sleep</h3>
        <div className="sleeping-cards-grid">
          {listing.sleepingArrangements.map((item, idx) => (
            <div 
              key={item.id} 
              className="sleeping-card" 
              onClick={() => onOpenPhotoTour(idx === 0 ? 3 : 0)}
              role="button"
              tabIndex={0}
            >
              <div className="sleeping-img-wrapper">
                <img src={item.image} alt={item.room} className="sleeping-img" />
              </div>
              <h4 className="sleeping-room-name">{item.room}</h4>
              <p className="sleeping-bed-type">{item.beds}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider" />

      {/* What this place offers */}
      <div id="amenities-section" className="amenities-section">
        <h3 className="section-title">What this place offers</h3>
        <div className="amenities-preview-grid">
          {listing.amenities.preview.map((amenity) => (
            <div key={amenity.id} className={`amenity-item ${amenity.unavailable ? 'unavailable' : ''}`}>
              <div className="amenity-icon-box">
                {getAmenityIcon(amenity.icon, amenity.unavailable)}
              </div>
              <span className={`amenity-label ${amenity.unavailable ? 'strike' : ''}`}>
                {amenity.label}
              </span>
            </div>
          ))}
        </div>
        <button className="show-all-amenities-btn" onClick={() => setShowAmenitiesModal(true)}>
          Show all 50 amenities
        </button>
      </div>

      <div className="section-divider" />

      {/* Calendar Section */}
      <div className="calendar-section">
        <h3 className="section-title">{nights} nights in Candolim</h3>
        <p className="calendar-subtitle">{formatDateRange()}</p>

        <div className="calendar-box">
          <div className="calendar-nav-row">
            <button className="calendar-nav-btn prev" onClick={handlePrevMonth} aria-label="Previous month">
              <ChevronLeft size={18} />
            </button>
            <button className="calendar-nav-btn next" onClick={handleNextMonth} aria-label="Next month">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="calendar-months-dual">
            {renderMonth(calendarYear, calendarMonth)}
            {renderMonth(nextYear, nextMonth)}
          </div>
        </div>
      </div>

      {/* Full Description Modal */}
      {showDescModal && (
        <div className="modal-backdrop fade-in" onClick={() => setShowDescModal(false)}>
          <div className="modal-box desc-modal slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <button className="modal-close-btn" onClick={() => setShowDescModal(false)}>
                <X size={20} />
              </button>
              <h3 className="modal-title">About this space</h3>
            </div>
            <div className="modal-body">
              <div className="modal-desc-content">
                {listing.description.full.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="desc-modal-p">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 50 Amenities Modal */}
      {showAmenitiesModal && (
        <div className="modal-backdrop fade-in" onClick={() => setShowAmenitiesModal(false)}>
          <div className="modal-box amenities-modal slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <button className="modal-close-btn" onClick={() => setShowAmenitiesModal(false)}>
                <X size={20} />
              </button>
              <h3 className="modal-title">What this place offers</h3>
            </div>
            <div className="modal-body scrollable">
              {listing.amenities.fullCategories.map((cat, idx) => (
                <div key={idx} className="amenity-modal-category">
                  <h4 className="amenity-cat-title">{cat.category}</h4>
                  <div className="amenity-cat-items">
                    {cat.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="amenity-modal-row">
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  {idx < listing.amenities.fullCategories.length - 1 && <div className="cat-divider" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
