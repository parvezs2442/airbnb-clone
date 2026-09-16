import React from 'react';
import { ShieldCheck, Check, GraduationCap } from 'lucide-react';
import './HostSection.css';

export default function HostSection({ host }) {
  return (
    <section className="host-section" aria-label="Meet your host">
      <h3 className="section-title">Meet your host</h3>

      <div className="host-card-container">
        {/* Left: Host Identity Badge Card */}
        <div className="host-profile-card-wrapper">
          <div className="host-profile-card">
            <div className="host-card-inner">
              <div className="host-avatar-badge-box">
                <div className="host-avatar-large" style={{ backgroundColor: host.avatarBg }}>
                  <span>{host.avatarText}</span>
                </div>
                <div className="host-verified-check">
                  <Check size={12} strokeWidth={3} color="#FFFFFF" />
                </div>
              </div>
              <h4 className="host-profile-name">{host.name}</h4>
              <p className="host-profile-role">Host</p>
            </div>

            <div className="host-stats-stack">
              <div className="host-stat-item">
                <span className="stat-number">{host.reviewsCount}</span>
                <span className="stat-label">Reviews</span>
              </div>
              <div className="host-stat-hdivider" />
              <div className="host-stat-item">
                <span className="stat-number">{host.ratingScore}</span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="host-stat-hdivider" />
              <div className="host-stat-item">
                <span className="stat-number">{host.tenure.split(' ')[0]}</span>
                <span className="stat-label">Years hosting</span>
              </div>
            </div>
          </div>

          {/* Under card bio tags */}
          <div className="host-under-card-tags">
            <div className="host-bio-tag-row">
              <span className="bio-tag-icon">🎈</span>
              <span className="bio-tag-text">Born in the 80s</span>
            </div>
            <div className="host-bio-tag-row">
              <GraduationCap size={18} strokeWidth={1.8} className="bio-tag-icon-svg" />
              <span className="bio-tag-text">Where I went to school: NICMAR GOA</span>
            </div>
          </div>
        </div>

        {/* Right: Co-Hosts & Host Details */}
        <div className="host-details-col">
          <div className="co-hosts-section">
            <h4 className="co-hosts-heading">Co-Hosts</h4>
            <div className="co-hosts-grid">
              {host.coHosts.map((co, idx) => (
                <div key={idx} className="co-host-item">
                  <div 
                    className="co-host-avatar" 
                    style={{ backgroundColor: co.avatarBg }}
                  >
                    {co.letter || co.name[0]}
                  </div>
                  <span className="co-host-name">{co.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="host-operational-details">
            <h4 className="operational-title">Host details</h4>
            <p className="operational-item">Response rate: {host.responseRate}</p>
            <p className="operational-item">Responds {host.responseTime}</p>
          </div>

          <button className="message-host-btn" onClick={() => alert("Message host thread opened")}>
            Message host
          </button>

          <div className="security-note">
            <ShieldCheck size={20} color="#FF385C" className="security-shield-icon" />
            <p>To help protect your payment, always use Airbnb to send money and communicate with hosts.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
