# Airbnb Clone: Romantic Jacuzzi 1BHK Candolim | Mirashya UG10

A pixel-perfect, production-quality clone of the real Airbnb listing page based on the reference at [https://airbnb-clone-umber-two.vercel.app](https://airbnb-clone-umber-two.vercel.app).

---

## Deliverables Included

1. **Listing Page**: Full property page matching the layout, spacing, typography, colors, and interactions of the reference.
   - Fixed header with brand logo and 3-part search pill (`Anywhere | Anytime | Add guests`).
   - Title row with interactive `Share` dialog and `Save` heart toggle.
   - 5-photo asymmetrical hero grid with hover dimming and floating `Show all photos` pill.
   - Sticky sub-nav bar (`Photos | Amenities | Reviews | Location`) with scrollspy and dynamic mini reserve bar.
   - `Entire serviced apartment in Candolim, India` summary with guest counts.
   - `Guest favourite` badge card with laurel wreath emblem, 4.95 rating, 5 black stars, and 19 reviews.
   - Host brief (`Mirashya Homes`, 2 years hosting) and key highlights (Outdoor entertainment, Designed for staying cool, Self check-in).
   - Expandable description with emojis and `Show more >` modal.
   - `Where you'll sleep` cards with high-definition room photos.
   - `What this place offers` amenities preview + `Show all 50 amenities` categorized modal.
   - Interactive 2-month calendar (October 2026 – November 2026) with date range selection syncing dynamically with the booking widget.
   - Sticky `BookingWidget` with 10% discount promo claim, dynamic price recalculation, guest counter dropdown (adults, children, infants, pets), free cancellation note, and reservation confirmation modal.
   - Guest reviews with 6 category rating progress bars and testimonial cards.
   - Host profile with Superhost badge, response stats, and bio.
   - Interactive Candolim Goa map with custom pulsing Airbnb pin marker.
   - Complete multi-column Airbnb footer.

2. **Photo Tour Overlay**: Full-screen modal triggered by clicking `Show all photos` or any hero photo.
   - Fixed top header with back arrow (`←`), room category tabs, `Share`, and `Save`.
   - Category navigation tabs: `Living room 1`, `Living room 2`, `Full kitchen`, `Bedroom`, `Full bathroom`, `Gym`, `Exterior`, `Pool`, `Additional photos`.
   - Scroll-to-room navigation.
   - Rich room sections with amenities subtitles and high-resolution photo grids.
   - Clicking ANY photo opens the Lightbox directly for that photo.

3. **Lightbox Overlay**: Single-photo viewer triggered by clicking any gallery photo.
   - Solid white Airbnb backdrop matching reference.
   - Floating circular navigation buttons (`<` and `>`).
   - Full keyboard navigation:
     - `ArrowLeft`: Previous photo
     - `ArrowRight`: Next photo
     - `Escape`: Close lightbox
   - Close button (`✕`), photo counter (`X / Total`), and caption bar.
   - Deep-linking via URL query parameters (`/?view=tour`, `/?view=lightbox&photo=2`).

4. **Production Marketplace Architecture**:
   - `ARCHITECTURE_DIAGRAM.svg` (vector blueprint)
   - `ARCHITECTURE_DIAGRAM.png` (high-res render)
   - `ARCHITECTURE.md` (comprehensive scaling whitepaper covering Edge/CDN, SSR, Microservices, Search, Distributed Locking, Sharded Databases, and Kubernetes).

5. **AI Subagent Configurations**:
   - `.agents/skills/visual-qa/SKILL.md` (visual regression and typography auditor)
   - `.agents/skills/accessibility-auditor/SKILL.md` (WCAG & ARIA accessibility auditor)
   - `.agents/rules/code-quality.md` (clean code standards and anti-plagiarism guardrails)

6. **AI Prompts Log**:
   - `PROMPTS_LOG.md` (chronological sequence of prompts, agent reasoning, and actions).

---

## Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Open in browser
http://localhost:5173/
```

To build for production:
```bash
npm run build
```
"# airbnb-clone" 
