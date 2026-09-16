---
name: visual-qa
description: Specialized subagent skill for inspecting and enforcing pixel-perfect UI fidelity, Airbnb typography tokens, spacing grids, and interactive states.
---

# Visual QA Subagent Skill

## Purpose
This skill equips AI agents to systematically inspect, evaluate, and certify visual and behavioral fidelity against reference design targets for Airbnb listing pages and overlay views.

## Verification Checklist

### 1. Typography & Hierarchy
- Enforce font family stack: `Plus Jakarta Sans`, `-apple-system`, `BlinkMacSystemFont`, `Roboto`, `Helvetica Neue`.
- Main Title: `26px`, font-weight `600`, line-height `1.25`, color `#222222`.
- Section Headings: `22px`, font-weight `600`, color `#222222`.
- Subheadings & Room Names: `16px`, font-weight `600`.
- Secondary text: `14px`, color `#717171`.

### 2. Color Tokens & Brand System
- Brand Primary: `#FF385C` (Airbnb Coral Red) / `#E00B41`.
- Gradient: `radial-gradient(circle at center, #FF385C 0%, #E00B41 100%)`.
- Text Primary: `#222222`.
- Text Muted: `#717171`.
- Border Light: `#EBEBEB` / `#DDDDDD`.
- Tag Green: `#008A05` (Background `#E8F5E9`).

### 3. Layout & Spacing
- Container max-width: `1120px` centered.
- Desktop column split: Left column `62%`, Right sticky sidebar `34%`, Gap `80px`.
- Hero Grid: 5 photos, height `440px`, corner radius `12px`, gap `8px`.
- "Show all photos" button: floating in bottom-right corner with 9-dot grid icon.

### 4. Overlays & Modals
- **Photo Tour**: Full-screen modal, fixed header with back arrow, room category tabs with thumbnails, room sections with subtitles and photo grids.
- **Lightbox**: Solid white or clean backdrop, centered high-res photo, floating chevron navigation buttons (`<` and `>`), photo counter (`X / Total`), caption.
- **Interactive Calendar**: 2-month display (October–November 2026), circular highlight on start/end dates, in-between range highlight.
