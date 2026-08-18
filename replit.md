# 089 Dach - Munich Roofing Company Funnel Website

## Overview
This project aims to develop a high-converting, NLP-optimized funnel website for 089dach.de, a Munich-based roofing and metal work company. The primary goal is to guide visitors through a 6-stage conversion process, from problem awareness to lead submission, leveraging Neuro-Linguistic Programming (NLP) techniques. The website targets the Munich area code (089) and surrounding regions, focusing on local SEO and a mobile-first user experience to generate qualified leads for roofing, metal work, storm damage repair, 24/7 emergency services, and roof inspections.

## User Preferences
The agent should prioritize iterative development and ask for confirmation before making significant changes. I prefer clear, concise explanations and code that emphasizes readability and maintainability. Do not make changes to the `attached_assets/generated_images/` folder.

## System Architecture
The system is designed as a single-page application (SPA) with a React frontend and an Express backend. The core UI/UX is centered around a 6-stage NLP conversion funnel, featuring a sticky emergency banner, a floating call button for mobile, and a multi-step contact form tailored to specific services. Design elements are responsive and mobile-first, with conversion-focused CTAs strategically placed throughout the funnel.

### UI/UX Decisions
- **NLP Funnel Structure:** Homepage is structured into 6 psychological stages: Awareness, Interest, Desire, Trust, Clarify, and Action.
- **Urgency & Scarcity:** Elements like an `EmergencyBanner` and specific CTAs emphasize urgency and limited-time offers.
- **Dynamic Contact Form:** A compact, multi-step contact form with conditional logic based on the selected service, capturing detailed project information, including optional photo uploads.
- **Geo-Targeting:** Dynamic district landing pages are generated for Munich and surrounding areas, providing localized content and SEO benefits.
- **Accessibility:** Mobile-first responsive design with clear CTAs and an accessible FAQ section.

### Technical Implementations
- **Frontend:** React with TypeScript, using Vite for fast builds.
- **Styling:** Tailwind CSS integrated with shadcn/ui components for a consistent design system.
- **Animations:** Framer Motion for smooth UI transitions and scroll animations.
- **Data Fetching:** TanStack Query manages asynchronous data operations.
- **SEO Optimization:** Dynamic meta titles/descriptions via a `useSEO` hook, comprehensive Schema.org structured data (LocalBusiness, FAQPage, Service), and optimized heading hierarchies. `robots.txt`, `sitemap.xml`, `llms.txt`, and `ai.txt` are configured.
  - **Completed (Dec 2025):** All 40 pages (7 main + 33 districts) have unique, emotional meta titles (≤60 chars) and descriptions (≤160 chars) with conversion-focused keywords.
  - **Favicon:** `.ico` format at `/favicon.ico` (32KB, multiple sizes).
  - **Server-Side SEO Pre-Rendering (Dec 2025):** Implemented to solve Google/AI crawler visibility issue for SPAs:
    - `server/seo-prerender.ts`: Contains SEO data for all 40+ pages and `injectSEOTags()` function
    - `server/static.ts`: Production handler reads index.html, injects path-specific SEO tags
    - `server/index.ts`: Development middleware intercepts HTML responses to inject SEO tags
    - Meta tags replaced: title, description, canonical, og:title, og:description, og:url, twitter:title, twitter:description, geo.placename
    - District pages use `/bezirk/:slug` route pattern with unique SEO data per district
  - **Schema.org Management (Jan 2026):** SSR is the single source of truth for all JSON-LD structured data:
    - SSR injects: RoofingContractor, LocalBusiness (with 30+ Munich districts), 6 Service schemas, FAQPage (when page has FAQs)
    - Client-side (useSEO.ts) only adds district-specific LocalBusiness for `/bezirk/:slug` pages
    - Homepage: 9 JSON-LD blocks; District pages: 8 JSON-LD blocks
    - DO NOT add hardcoded schemas to client/index.html - SSR handles everything dynamically
- **AI Chatbot:** An OpenAI GPT-4o-mini-powered chatbot is integrated, responding in German and sending email notifications for appointment requests.

### Feature Specifications
- **Core Services:** Roofing, metal work, storm damage, 24/7 emergency, and roof inspection.
- **Lead Capture:** Service-specific, multi-step contact forms that adapt questions based on the chosen service (e.g., "undichtes Dach" asks about water ingress severity and duration, "Sturmschaden" asks about insurance and type of damage).
- **Pricing:** Transparent pricing for services like Dachinspektion (150€).
- **SEO & Localization:** Extensive local SEO for Munich districts, including dynamic content generation and internal linking.
- **District Landing Pages (Dec 2025):** All 33 district pages now feature:
  - Auto-generated 1200-1800 word Fließtext per page via `enrichDistrict()` function
  - Main keyword targeting (e.g., "Dachdecker Allach München")
  - 25 secondary keywords per district for long-tail SEO
  - 6 content sections: intro, localExpertise, services, whyChooseUs, emergencyService, qualityPromise
  - Keywords displayed in badges for SEO relevance signals

## External Dependencies
- **OpenAI GPT-4o-mini:** Utilized for the AI chatbot functionality via a backend endpoint (`POST /api/chat`).
- **Google Maps API (implied):** For geo-coordinates and service area definitions in Schema.org.