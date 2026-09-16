import React, { useState } from 'react';
import { Search, Globe, Menu, User, Home, X } from 'lucide-react';
import './Header.css';

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchTab, setSearchTab] = useState('stays');

  return (
    <header className="airbnb-header">
      <div className="container header-container">
        {/* Left: Airbnb Brand Logo */}
        <div className="header-left">
          <a href="#" className="header-logo-link" aria-label="Airbnb Homepage">
            <svg
              className="airbnb-logo-svg"
              viewBox="0 0 1000 1000"
              role="img"
              aria-hidden="true"
              focusable="false"
            >
              <path d="m499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-11 49-41 105-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-111 0-172.1 94-148.1 203.1 14 59 51 126.1 110 201.1-37 41-72 70-103 88-24 13-47 21-69 23-101 15-180.1-83-144.1-184.1 25-70 91-147.1 187.1-220.1-57-81-83-157.1-69-218.1 14-61 58-103 118.1-112 50-8 99 9 135.1 47 43 45 61 107 50 171.1-11 65-49 139.1-104 213.1 79 59 148.1 125.1 199.1 190.1 63 80 87 149.1 65 198.1zm115.1-408.2c-15-84-59-153.1-125.1-197.1-66-44-146.1-57-226.1-37-124.1 31-218.1 133.1-236.1 256.1-9 61 1 123.1 28 178.1-112 85-188.1 176.1-218.1 262.1-40 112-25 228.1 41 314.1 66 86 169.1 126.1 281.1 109.1 47-7 94-27 140.1-59 52-36 102-83 150.1-141.1 68 81 146.1 137.1 226.1 161.1 36 11 74 15 111 12 104-9 193.1-66 237.1-152.1 46-89 39-195.1-19-293.1-40-69-99-139.1-170.1-209.1 24-40 40-84 48-129.1 11-64 4-129.1-20-191.1z" />
            </svg>
            <span className="header-logo-text">airbnb</span>
          </a>
        </div>

        {/* Center: Search Bar Pill */}
        <div className="header-center">
          <button 
            className="search-pill" 
            onClick={() => setShowSearchModal(true)}
            aria-label="Search destinations, dates, and guests"
          >
            <div className="search-pill-item stays-item">
              <span className="stay-icon">🏠</span>
              <span className="pill-text font-bold">Anywhere</span>
            </div>
            <span className="search-pill-divider" />
            <div className="search-pill-item">
              <span className="pill-text font-bold">Anytime</span>
            </div>
            <span className="search-pill-divider" />
            <div className="search-pill-item guests-item">
              <span className="pill-text text-muted">Add guests</span>
              <div className="search-icon-circle">
                <Search size={14} color="#FFFFFF" strokeWidth={3} />
              </div>
            </div>
          </button>
        </div>

        {/* Right: User Menu & Host Link */}
        <div className="header-right">
          <button className="host-btn" onClick={() => alert("Airbnb your home feature demo")}>
            Become a host
          </button>
          <button className="globe-btn" aria-label="Choose language and currency" onClick={() => alert("Currency: ₹ INR | Language: English")}>
            <Globe size={18} />
          </button>
          <div className="user-menu-wrapper">
            <button
              className="user-profile-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="Main navigation menu"
              aria-expanded={showUserMenu}
            >
              <Menu size={18} strokeWidth={2.5} />
              <div className="user-avatar-circle">
                <User size={14} color="#717171" strokeWidth={2.5} />
              </div>
            </button>

            {showUserMenu && (
              <div className="user-dropdown-menu slide-up">
                <button className="dropdown-item bold" onClick={() => setShowUserMenu(false)}>Sign up</button>
                <button className="dropdown-item" onClick={() => setShowUserMenu(false)}>Log in</button>
                <div className="dropdown-divider" />
                <button className="dropdown-item" onClick={() => setShowUserMenu(false)}>Airbnb your home</button>
                <button className="dropdown-item" onClick={() => setShowUserMenu(false)}>Help Centre</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Global Search Modal */}
      {showSearchModal && (
        <div className="search-modal-overlay fade-in" onClick={() => setShowSearchModal(false)}>
          <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-header">
              <div className="search-tabs">
                <button 
                  className={`search-tab ${searchTab === 'stays' ? 'active' : ''}`}
                  onClick={() => setSearchTab('stays')}
                >
                  Stays
                </button>
                <button 
                  className={`search-tab ${searchTab === 'experiences' ? 'active' : ''}`}
                  onClick={() => setSearchTab('experiences')}
                >
                  Experiences
                </button>
              </div>
              <button className="search-modal-close" onClick={() => setShowSearchModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="search-modal-body">
              <div className="search-expanded-bar">
                <div className="expanded-input-group">
                  <label>Where</label>
                  <input type="text" defaultValue="Candolim, Goa, India" placeholder="Search destinations" />
                </div>
                <div className="expanded-input-group">
                  <label>Check in</label>
                  <input type="text" defaultValue="18 Oct 2026" />
                </div>
                <div className="expanded-input-group">
                  <label>Check out</label>
                  <input type="text" defaultValue="23 Oct 2026" />
                </div>
                <div className="expanded-input-group">
                  <label>Who</label>
                  <input type="text" defaultValue="2 guests" />
                </div>
                <button className="search-submit-btn" onClick={() => setShowSearchModal(false)}>
                  <Search size={16} strokeWidth={2.5} />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
