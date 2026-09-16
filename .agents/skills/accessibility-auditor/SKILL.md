---
name: accessibility-auditor
description: Specialized subagent skill for auditing WAI-ARIA semantics, keyboard navigation, focus management, and accessibility standards across overlays and widgets.
---

# Accessibility Auditor Skill

## Purpose
Ensures complete keyboard navigation, focus management, and WCAG 2.1 AA compliance across all components, particularly modal overlays (Photo Tour and Lightbox) and interactive widgets (Calendar and Booking form).

## Audit Guidelines

### 1. Keyboard Navigation Standards
- **Lightbox Navigation**:
  - `ArrowLeft`: Navigate to previous image without page reload.
  - `ArrowRight`: Navigate to next image without page reload.
  - `Escape`: Close lightbox immediately and return focus to triggering element.
- **Photo Tour Navigation**:
  - `Escape`: Close photo tour and restore body scrolling.
  - `Tab` / `Shift+Tab`: Focusable category buttons with descriptive labels.
- **Calendar Navigation**:
  - Arrow buttons accessible via keyboard and screen readers (`aria-label="Previous month"`, `aria-label="Next month"`).
  - Date cells have explicit readable date labels (`aria-label="18 October 2026"`).

### 2. ARIA Roles & Semantics
- Modal overlays must specify `role="dialog"`, `aria-modal="true"`, and `aria-label` or `aria-labelledby`.
- Interactive buttons must feature appropriate `aria-expanded` and `aria-label` tags when icons represent the primary visual affordance.
- Body scroll locking must be enabled on modal mount and cleanly unlocked on unmount.

### 3. Focus Management
- Interactive elements must provide visible focus indicators (`:focus-visible` with `outline: 2px solid #222222; outline-offset: 2px`).
- Form inputs in search and booking cards must have connected `<label>` elements.
