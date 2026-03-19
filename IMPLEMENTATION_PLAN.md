# Homeo Frontend Implementation Plan

## Phase 1 - Foundation
- Initialize Next.js + TypeScript + Tailwind + shadcn/ui
- Set global theme, typography, and base layout
- Add core dependencies (Framer Motion, Zustand)

Status: Completed

## Phase 2 - Data Layer (Current Focus)
- Define domain types for products, cart, filters, and currency
- Seed mock product catalog for bottled and pill medicines
- Add currency configuration for INR default + switchable currencies
- Implement Zustand stores: `cartStore`, `currencyStore`
- Add API helpers and Next.js API routes:
  - `GET /api/products`
  - `GET /api/products/[slug]`

Status: Completed (pass 2 added API route automated tests)

## Phase 3 - Core Storefront Pages
- Homepage with hero, categories, featured products, and benefits sections
- Product listing page with filters and sorting
- Product detail page with potency selection and related products
- Cart page with quantity controls and summary

Status: Completed

## Phase 4 - Auth UI (Future backend integration)
- Login page
- Signup page
- Forgot password page

Status: Completed (UI only)

## Phase 5 - Motion and Visual Polish
- Scroll and entrance animations
- Hover interactions on cards and controls
- Natural/holistic visual direction across pages

Status: Completed (initial pass)

## Phase 6 - QA and Build Verification
- ESLint verification
- Production build verification

Status: Completed

## Phase 7 - Responsive and UX Hardening
- Improve mobile spacing and interactions
- Keep layout consistency across breakpoints

Status: Completed (baseline)

## Phase 8 - Deferred Enhancements (Implement Later)
- Add mobile navigation drawer in header (completed)
- Add checkout page skeleton (UI flow only) (completed)
- Add richer product imagery and category banner assets (completed)

Status: Completed
