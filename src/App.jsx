import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header/Header';
import TitleBar from './components/TitleBar/TitleBar';
import HeroGrid from './components/HeroGrid/HeroGrid';
import StickySubNav from './components/StickySubNav/StickySubNav';
import ListingDetails from './components/ListingDetails/ListingDetails';
import BookingWidget from './components/BookingWidget/BookingWidget';
import Reviews from './components/Reviews/Reviews';
import LocationSection from './components/LocationSection/LocationSection';
import HostSection from './components/HostSection/HostSection';
import ThingsToKnow from './components/ThingsToKnow/ThingsToKnow';
import MoreStaysNearby from './components/MoreStaysNearby/MoreStaysNearby';
import Footer from './components/Footer/Footer';
import PhotoTour from './components/PhotoTour/PhotoTour';
import Lightbox from './components/Lightbox/Lightbox';
import { LISTING_DATA } from './data/listingData';
import './App.css';

export default function App() {
  const [checkIn, setCheckIn] = useState(LISTING_DATA.dates.defaultCheckIn);
  const [checkOut, setCheckOut] = useState(LISTING_DATA.dates.defaultCheckOut);

  // Overlay states
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);

  // Deep linking via URL params (e.g. ?view=tour or ?view=lightbox&photo=1)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    const photoIdx = parseInt(params.get('photo') || '0', 10);

    if (view === 'tour') {
      setIsPhotoTourOpen(true);
    } else if (view === 'lightbox') {
      setLightboxInitialIndex(isNaN(photoIdx) ? 0 : photoIdx);
      setIsLightboxOpen(true);
    }
  }, []);

  // Calculate nights
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return LISTING_DATA.pricing.defaultNights;
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [checkIn, checkOut]);

  // Calculate dynamic total price
  const totalPrice = useMemo(() => {
    if (nights === 5) return LISTING_DATA.pricing.defaultTotal;
    return Math.round(nights * LISTING_DATA.pricing.basePricePerNight);
  }, [nights]);

  // Flatten all photos for lightbox navigation
  const allPhotos = useMemo(() => {
    const list = [];
    LISTING_DATA.photoTourCategories.forEach((cat) => {
      cat.photos.forEach((photo) => {
        list.push({
          ...photo,
          categoryName: cat.name,
          categoryId: cat.id
        });
      });
    });
    return list;
  }, []);

  const handleOpenPhotoTour = (initialPhotoIdx = 0) => {
    setIsPhotoTourOpen(true);
    const url = new URL(window.location);
    url.searchParams.set('view', 'tour');
    window.history.pushState({}, '', url);
  };

  const handleClosePhotoTour = () => {
    setIsPhotoTourOpen(false);
    const url = new URL(window.location);
    url.searchParams.delete('view');
    url.searchParams.delete('photo');
    window.history.pushState({}, '', url);
  };

  const handleOpenLightbox = (photoIndex) => {
    setLightboxInitialIndex(photoIndex);
    setIsLightboxOpen(true);
    const url = new URL(window.location);
    url.searchParams.set('view', 'lightbox');
    url.searchParams.set('photo', photoIndex.toString());
    window.history.pushState({}, '', url);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    const url = new URL(window.location);
    if (isPhotoTourOpen) {
      url.searchParams.set('view', 'tour');
      url.searchParams.delete('photo');
    } else {
      url.searchParams.delete('view');
      url.searchParams.delete('photo');
    }
    window.history.pushState({}, '', url);
  };

  const handleReserveScroll = () => {
    const bookingWidget = document.querySelector('.booking-widget-wrapper');
    if (bookingWidget) {
      bookingWidget.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="airbnb-app-root">
      {/* 1. Global Navigation Bar */}
      <Header />

      {/* 2. Listing Title & Action Bar */}
      <div className="container">
        <TitleBar title={LISTING_DATA.title} />

        {/* 3. Hero 5-Photo Grid */}
        <HeroGrid 
          images={LISTING_DATA.heroImages} 
          onOpenPhotoTour={handleOpenPhotoTour} 
        />
      </div>

      {/* 4. Sticky Sub-Nav with ScrollSpy and Mini Reserve Bar */}
      <StickySubNav 
        onReserveClick={handleReserveScroll}
        totalPrice={totalPrice}
        nights={nights}
        rating={LISTING_DATA.rating}
        reviewCount={LISTING_DATA.reviewCount}
      />

      {/* 5. Main 2-Column Property Details & Booking Area */}
      <div className="container main-content-wrapper">
        {/* Left Column: Details, Amenities, Calendar */}
        <div className="main-left-column">
          <ListingDetails 
            listing={LISTING_DATA}
            checkIn={checkIn}
            checkOut={checkOut}
            setCheckIn={setCheckIn}
            setCheckOut={setCheckOut}
            nights={nights}
            onOpenPhotoTour={handleOpenPhotoTour}
          />
        </div>

        {/* Right Column: Sticky Reservation Widget */}
        <div className="main-right-column">
          <BookingWidget 
            pricing={LISTING_DATA.pricing}
            checkIn={checkIn}
            checkOut={checkOut}
            nights={nights}
            totalPrice={totalPrice}
            onReserveClick={handleReserveScroll}
          />
        </div>
      </div>

      {/* 6. Full-Width Lower Sections */}
      <div className="container lower-sections-container">
        {/* Reviews Section */}
        <Reviews reviewsData={LISTING_DATA.reviews} />

        {/* Location Section */}
        <LocationSection location={LISTING_DATA.location} />

        {/* Meet Your Host Section */}
        <HostSection host={LISTING_DATA.host} />

        {/* Things to Know Section */}
        <ThingsToKnow data={LISTING_DATA.thingsToKnow} />

        {/* More Stays Nearby Section */}
        <MoreStaysNearby stays={LISTING_DATA.moreStaysNearby} />
      </div>

      {/* 7. Footer */}
      <Footer />

      {/* OVERLAY VIEW 1: Photo Tour Modal */}
      {isPhotoTourOpen && (
        <PhotoTour 
          categories={LISTING_DATA.photoTourCategories}
          onClose={handleClosePhotoTour}
          onSelectPhoto={(idx) => {
            handleOpenLightbox(idx);
          }}
        />
      )}

      {/* OVERLAY VIEW 2: Lightbox Modal */}
      {isLightboxOpen && (
        <Lightbox 
          photos={allPhotos}
          initialIndex={lightboxInitialIndex}
          onClose={handleCloseLightbox}
        />
      )}
    </div>
  );
}
