import React from 'react';
import { Calendar, Key, Shield, ChevronRight } from 'lucide-react';
import './ThingsToKnow.css';

export default function ThingsToKnow({ data }) {
  return (
    <section className="things-to-know-section" aria-label="Things to know">
      <h3 className="section-title">Things to know</h3>

      <div className="things-grid">
        {/* Col 1: Cancellation policy */}
        <div className="things-col">
          <div className="things-icon-wrapper">
            <Calendar size={22} strokeWidth={1.8} />
          </div>
          <h4 className="things-col-title">{data.cancellation.title}</h4>
          <p className="things-desc">{data.cancellation.text}</p>
          <p className="things-subdesc">{data.cancellation.subtext}</p>
          <button className="things-learn-more-btn" onClick={() => alert("Cancellation policy details")}>
            <span>Learn more</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Col 2: House rules */}
        <div className="things-col">
          <div className="things-icon-wrapper">
            <Key size={22} strokeWidth={1.8} />
          </div>
          <h4 className="things-col-title">{data.houseRules.title}</h4>
          <ul className="things-rules-list">
            {data.houseRules.rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
          <button className="things-learn-more-btn" onClick={() => alert("House rules details")}>
            <span>Learn more</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Col 3: Safety & property */}
        <div className="things-col">
          <div className="things-icon-wrapper">
            <Shield size={22} strokeWidth={1.8} />
          </div>
          <h4 className="things-col-title">{data.safety.title}</h4>
          <ul className="things-rules-list">
            {data.safety.points.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
          <button className="things-learn-more-btn" onClick={() => alert("Safety and property details")}>
            <span>Learn more</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
