import React, { useState } from 'react';
import { Tag, ChevronDown, ChevronUp, Flag, Plus, Minus, Check, X } from 'lucide-react';
import './BookingWidget.css';

export default function BookingWidget({ 
  pricing, 
  checkIn, 
  checkOut, 
  nights, 
  totalPrice,
  onReserveClick
}) {
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const [discountClaimed, setDiscountClaimed] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  const totalGuests = adults + children;

  const formatDateStr = (date) => {
    if (!date) return '';
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    const y = date.getFullYear();
    return `${m}/${d}/${y}`;
  };

  const effectiveTotal = discountClaimed ? Math.round(totalPrice * 0.9) : totalPrice;

  const handleReserve = () => {
    setShowSuccessModal(true);
    if (onReserveClick) onReserveClick();
  };

  return (
    <div className="booking-widget-wrapper">
      {/* 10% Discount Promotion Card */}
      <div className="discount-promo-card">
        <div className="discount-left">
          <div className="discount-tag-icon">
            <Tag size={18} color="#008A05" />
          </div>
          <div className="discount-text">
            <p className="discount-title">Get 10% off your next stay.</p>
            <button className="terms-link" onClick={() => alert("10% promotional discount valid for autumn 2026 bookings.")}>
              Terms apply
            </button>
          </div>
        </div>
        <button 
          className={`claim-discount-btn ${discountClaimed ? 'claimed' : ''}`}
          onClick={() => setDiscountClaimed(!discountClaimed)}
        >
          {discountClaimed ? 'Claimed' : 'Claim'}
        </button>
      </div>

      {/* Main Reservation Card */}
      <div className="booking-card">
        {/* Price Row */}
        <div className="booking-price-header">
          <div className="price-tag-row">
            <span className="price-amount">₹{effectiveTotal.toLocaleString('en-IN')}</span>
            <span className="price-nights-text"> for {nights} nights</span>
          </div>
          {discountClaimed && (
            <span className="applied-discount-badge">10% applied</span>
          )}
        </div>

        {/* Date & Guest Input Matrix Box */}
        <div className="selector-box">
          <div className="selector-dates-row">
            <div className="selector-date-col left">
              <span className="selector-label">CHECK-IN</span>
              <span className="selector-val">{formatDateStr(checkIn)}</span>
            </div>
            <div className="selector-date-divider" />
            <div className="selector-date-col right">
              <span className="selector-label">CHECKOUT</span>
              <span className="selector-val">{formatDateStr(checkOut)}</span>
            </div>
          </div>

          <div 
            className="selector-guests-row" 
            onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
            role="button"
            tabIndex={0}
            aria-expanded={showGuestsDropdown}
          >
            <div className="guests-info">
              <span className="selector-label">GUESTS</span>
              <span className="selector-val">
                {totalGuests} guest{totalGuests > 1 ? 's' : ''}
                {infants > 0 ? `, ${infants} infant${infants > 1 ? 's' : ''}` : ''}
                {pets > 0 ? `, ${pets} pet${pets > 1 ? 's' : ''}` : ''}
              </span>
            </div>
            <div className="guests-chevron">
              {showGuestsDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>

          {/* Guests Popover Dropdown */}
          {showGuestsDropdown && (
            <div className="guests-dropdown-popover slide-up" onClick={(e) => e.stopPropagation()}>
              <div className="guest-counter-row">
                <div>
                  <div className="guest-type-name">Adults</div>
                  <div className="guest-type-sub">Age 13+</div>
                </div>
                <div className="counter-controls">
                  <button 
                    className="counter-btn" 
                    disabled={adults <= 1}
                    onClick={() => setAdults(adults - 1)}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="counter-val">{adults}</span>
                  <button 
                    className="counter-btn" 
                    disabled={adults + children >= 3}
                    onClick={() => setAdults(adults + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="guest-counter-row">
                <div>
                  <div className="guest-type-name">Children</div>
                  <div className="guest-type-sub">Ages 2–12</div>
                </div>
                <div className="counter-controls">
                  <button 
                    className="counter-btn" 
                    disabled={children <= 0}
                    onClick={() => setChildren(children - 1)}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="counter-val">{children}</span>
                  <button 
                    className="counter-btn" 
                    disabled={adults + children >= 3}
                    onClick={() => setChildren(children + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="guest-counter-row">
                <div>
                  <div className="guest-type-name">Infants</div>
                  <div className="guest-type-sub">Under 2</div>
                </div>
                <div className="counter-controls">
                  <button 
                    className="counter-btn" 
                    disabled={infants <= 0}
                    onClick={() => setInfants(infants - 1)}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="counter-val">{infants}</span>
                  <button 
                    className="counter-btn" 
                    disabled={infants >= 2}
                    onClick={() => setInfants(infants + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="guest-counter-row">
                <div>
                  <div className="guest-type-name">Pets</div>
                  <div className="guest-type-sub">Bringing a service animal?</div>
                </div>
                <div className="counter-controls">
                  <button 
                    className="counter-btn" 
                    disabled={pets <= 0}
                    onClick={() => setPets(pets - 1)}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="counter-val">{pets}</span>
                  <button 
                    className="counter-btn" 
                    disabled={pets >= 2}
                    onClick={() => setPets(pets + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="popover-footer">
                <button className="popover-close-btn" onClick={() => setShowGuestsDropdown(false)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Free Cancellation Pill */}
        <div className="cancellation-pill">
          <span>Free cancellation before {pricing.cancellationDate}</span>
        </div>

        {/* Primary Reserve Button */}
        <button className="primary-reserve-btn" onClick={handleReserve}>
          Reserve
        </button>

        {/* Subtext */}
        <p className="no-charge-text">You won't be charged yet</p>

        {/* Price Breakdown Calculation */}
        <div className="price-breakdown-details">
          <div className="breakdown-row">
            <span className="breakdown-label">
              ₹{Math.round(pricing.basePricePerNight).toLocaleString('en-IN')} × {nights} nights
            </span>
            <span className="breakdown-val">₹{(Math.round(pricing.basePricePerNight) * nights).toLocaleString('en-IN')}</span>
          </div>
          <div className="breakdown-row">
            <span className="breakdown-label">Cleaning fee</span>
            <span className="breakdown-val">₹{pricing.cleaningFee.toLocaleString('en-IN')}</span>
          </div>
          <div className="breakdown-row">
            <span className="breakdown-label">Airbnb service fee</span>
            <span className="breakdown-val">₹{pricing.serviceFee.toLocaleString('en-IN')}</span>
          </div>
          {discountClaimed && (
            <div className="breakdown-row discount">
              <span className="breakdown-label">10% Autumn promotion</span>
              <span className="breakdown-val">-₹{Math.round(totalPrice * 0.1).toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="breakdown-divider" />
          <div className="breakdown-total-row">
            <span className="total-label">Total before taxes</span>
            <span className="total-val">₹{effectiveTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Report this listing button */}
      <div className="report-listing-wrapper">
        <button className="report-listing-btn" onClick={() => alert("Report listing modal opened")}>
          <Flag size={14} />
          <span>Report this listing</span>
        </button>
      </div>

      {/* Reservation Confirmed Modal */}
      {showSuccessModal && (
        <div className="modal-backdrop fade-in" onClick={() => setShowSuccessModal(false)}>
          <div className="modal-box reservation-modal slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <button className="modal-close-btn" onClick={() => setShowSuccessModal(false)}>
                <X size={20} />
              </button>
              <h3 className="modal-title">Booking Confirmation Preview</h3>
            </div>
            <div className="modal-body">
              <div className="booking-modal-success-badge">
                <Check size={28} color="#FFFFFF" />
              </div>
              <h4 className="booking-confirmed-heading">Dates are held!</h4>
              <p className="booking-confirmed-sub">
                Romantic Jacuzzi 1BHK Candolim | Mirashya UG10
              </p>
              <div className="booking-summary-box">
                <p><strong>Dates:</strong> {formatDateStr(checkIn)} – {formatDateStr(checkOut)} ({nights} nights)</p>
                <p><strong>Guests:</strong> {totalGuests} guests</p>
                <p><strong>Total Amount:</strong> ₹{effectiveTotal.toLocaleString('en-IN')}</p>
                <p><strong>Cancellation:</strong> Free until {pricing.cancellationDate}</p>
              </div>
              <button className="primary-reserve-btn" onClick={() => setShowSuccessModal(false)}>
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
