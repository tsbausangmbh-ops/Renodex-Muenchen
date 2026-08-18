# Design Guidelines: 089dach.de Funnel Website

## Color Scheme
**Primary Colors: Rot (Red), Anthrazit (Anthracite), Grau (Gray)**
- **Primary (Rot)**: HSL 0 75% 50% - Used for CTAs, highlights, and branding accents
- **Foreground (Anthrazit)**: HSL 0 0% 18% - Dark gray for main text and headings
- **Background (Grau)**: HSL 0 0% 97% - Light gray background for clean appearance
- **Cards**: Pure white with subtle gray borders
- **Dark Mode**: Anthracite backgrounds (HSL 0 0% 12%) with lighter grays for text

## Design Approach
**System-Based Approach** using Material Design principles adapted for professional trades services. Focus on clear hierarchy, trust-building, and immediate action pathways for emergency services.

## Typography Hierarchy
- **Primary Font**: Roboto (Google Fonts) - professional, highly legible
- **Headings**: Bold weights (700) for H1/H2, Medium (500) for H3/H4
- **Body Text**: Regular (400), line-height 1.6 for readability
- **Emergency CTA**: All caps, semibold (600) for urgency
- **Scale**: H1: text-5xl, H2: text-4xl, H3: text-2xl, Body: text-base, Small: text-sm

## Layout System
**Tailwind Spacing**: Use units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-16 (desktop), py-12 (mobile)
- Component spacing: gap-8 between major elements, gap-4 within components
- Container: max-w-6xl for content sections
- Emergency banner: Fixed top, full-width

## Component Library

### Hero Section
Full-width hero with professional roofing imagery (worker on roof, completed project)
- Height: 70vh minimum
- Overlay gradient for text readability
- Dual CTA: Primary "Notdienst anrufen" (prominent, blurred background) + Secondary "Angebot anfragen"
- Trust indicator: "24/7 Erreichbar • 15+ Jahre Erfahrung • München & Umgebung"

### Emergency Contact Banner
Sticky top banner (dismissible)
- Red/urgent treatment with phone icon
- "Sturmschaden? Notdienst: [Phone] - 24/7 verfügbar"
- Click-to-call functionality

### Funnel Stages

**Stage 1: Problem Awareness**
- 4-column grid (2 on tablet, 1 on mobile): Sturmschaden, Undichtes Dach, Sanierung, Wartung
- Icon + heading + brief description
- Each card clickable to scroll/navigate to details

**Stage 2: Service Details**
- Alternating 2-column layouts (image left/right)
- Service categories with detailed descriptions
- Checkmark lists for included services
- "Mehr erfahren" expansion panels

**Stage 3: Trust Building**
- Before/After image gallery (3 columns desktop, masonry-style)
- Testimonial cards with customer name, location, rating
- Certifications/badges row (horizontal scroll on mobile)
- Stats counter: Projekte abgeschlossen, Jahre Erfahrung, Zufriedene Kunden

**Stage 4: Contact Funnel**
Multi-step form with progress indicator:
- Step 1: Service type selection (large clickable cards)
- Step 2: Urgency level (Notfall/Dringend/Normal)
- Step 3: Contact details + brief description
- Step 4: Confirmation with estimated response time

### Navigation
- Sticky header with logo left, menu center, emergency phone right
- Mobile: Hamburger menu with prominent emergency call button
- Menu items: Leistungen, Referenzen, Über uns, Kontakt

### Footer
- 3-column layout: Company info + Quick links + Contact details
- Google Maps integration showing service area
- Social proof: "Meisterbetrieb seit 2008" badge
- Newsletter signup for maintenance tips

## Images
**Essential Images:**
1. **Hero Image**: Professional roofer working on pitched roof, bright daylight, safety equipment visible - creates trust and professionalism
2. **Before/After Gallery**: 6-8 project transformations showing storm damage repairs, new installations
3. **Service Images**: High-quality photos for each service category (roofing work, metal work, emergency repairs)
4. **Team Photo**: Optional section showing crew and vehicles - builds local trust
5. **Certification Images**: Trade certifications, insurance badges, manufacturer partnerships

## Interactions & Animations
**Minimal, purposeful only:**
- Smooth scroll between funnel stages
- Form step transitions (slide effect)
- Card hover: subtle lift (translate-y-1)
- Emergency banner pulse effect (subtle) on load
- NO decorative animations

## Accessibility
- High contrast for all text
- Form labels clearly associated
- Phone links for mobile devices
- Keyboard navigation through all funnel steps
- ARIA labels for icon-only buttons

## Mobile-First Considerations
- Emergency call button: Fixed bottom on mobile (floating action button)
- Form: Single column, larger touch targets
- Images: Optimized loading, lazy load below fold
- Service cards: Stack vertically with full-width
- Before/After: Swipeable gallery instead of grid