# Engineering & Code Quality Rules

## 1. Originality & Anti-Plagiarism Standard
- All source code, styles, and data structures must be independently authored from scratch.
- Never directly copy minified javascript bundles or obfuscated HTML from scraped websites.
- Use clean modern React functional components, hooks (`useState`, `useEffect`, `useMemo`, `useCallback`), and modular CSS styling.

## 2. Component Architecture
- Separate concerns into distinct component modules (`Header`, `TitleBar`, `HeroGrid`, `StickySubNav`, `ListingDetails`, `BookingWidget`, `Reviews`, `HostSection`, `LocationSection`, `Footer`, `PhotoTour`, `Lightbox`).
- Keep state cleanly lifted to `App.jsx` for synchronized pricing, date range selection, and modal overlay coordination.
- Leverage clean design tokens in `index.css` (`--airbnb-coral`, `--text-primary`, `--border-light`, etc.).

## 3. Performance & Asset Optimization
- Deliver modern WebP/JPEG optimized image assets with responsive dimensions.
- Use CSS transitions for micro-interactions (`transform`, `opacity`, `box-shadow`) to maintain 60fps animations.
- Ensure build bundles are lean, tree-shaken, and compile without warnings or linter errors.
