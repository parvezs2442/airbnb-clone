import React from 'react';
import { Globe } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="airbnb-footer">
      <div className="container footer-container">
        <div className="footer-columns-grid">
          <div className="footer-col">
            <h5 className="footer-col-title">Support</h5>
            <ul className="footer-links-list">
              <li><a href="#">Help Centre</a></li>
              <li><a href="#">AirCover</a></li>
              <li><a href="#">Anti-discrimination</a></li>
              <li><a href="#">Disability support</a></li>
              <li><a href="#">Cancellation options</a></li>
              <li><a href="#">Report neighbourhood concern</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="footer-col-title">Hosting</h5>
            <ul className="footer-links-list">
              <li><a href="#">Airbnb your home</a></li>
              <li><a href="#">AirCover for Hosts</a></li>
              <li><a href="#">Hosting resources</a></li>
              <li><a href="#">Community forum</a></li>
              <li><a href="#">Hosting responsibly</a></li>
              <li><a href="#">Join a free Hosting class</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="footer-col-title">Airbnb</h5>
            <ul className="footer-links-list">
              <li><a href="#">Newsroom</a></li>
              <li><a href="#">New features</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Investors</a></li>
              <li><a href="#">Airbnb.org emergency stays</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-legal-left">
            <span>© 2026 Airbnb, Inc.</span>
            <span className="dot-sep">·</span>
            <a href="#">Privacy</a>
            <span className="dot-sep">·</span>
            <a href="#">Terms</a>
            <span className="dot-sep">·</span>
            <a href="#">Sitemap</a>
            <span className="dot-sep">·</span>
            <a href="#">Company details</a>
          </div>

          <div className="footer-prefs-right">
            <button className="pref-item">
              <Globe size={16} />
              <span>English (IN)</span>
            </button>
            <button className="pref-item">
              <span>₹ INR</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
