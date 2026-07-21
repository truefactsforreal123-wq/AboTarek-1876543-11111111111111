# 🔥 مطاعم المصطفى للمشويات — El Mostafa Grill Website Plan

## 1. Project Overview

Official website for **مطاعم المصطفى للمشويات** (El Mostafa Grill Restaurants) — an Egyptian charcoal-grill restaurant chain.

- **Facebook:** [@elmostafagrill](https://web.facebook.com/elmostafagrill) — 106K followers, 92% recommend (68 reviews)
- **Brand:** Crimson red + gold badge logo (cloche, laurel, 5 stars) — "سلسلة مطاعم / مشويات المصطفى"
- **Languages:** Arabic (default, RTL) + English (toggle, LTR)

### Branches

| # | Location (AR) | Location (EN) | Phone |
|---|---|---|---|
| 1 | البرانية، أشمون — المنوفية | El Baraneya, Ashmoun, Monufia | 01004384300 |
| 2 | أشمون — أمام مدرسة الزراعة | Ashmoun — in front of the Agricultural School | 01010994054 |
| 3 | قرية دهب، سنتريس — أول طريق القناطر الخيرية | Dahab Village, Sentris — El Qanater El Khayreya Rd. | 01091928262 |
| 4 | الشروق — خلف الجامعة الفرنسية | El Shorouk — behind the French University | 01064347555 |

---

## 2. Tech Stack

### Frontend (Phase 1 — current)
| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router) | SSR/SSG → great SEO, image optimization, API routes built-in |
| Language | **TypeScript** | Type safety, scales to backend phase |
| Styling | **Tailwind CSS v4** | Fast custom design system matching brand |
| Animations | **Framer Motion** + CSS keyframes | Rich playful motion: preloader, ember particles, scroll reveals, staggered menu cards, counters, marquee |
| Icons | **lucide-react** | Clean, tree-shakable |
| Font | **Cairo** (next/font/google) | Single family covering Arabic + Latin, weights 400–900 |
| i18n | Custom AR/EN context + dictionaries | Arabic-first RTL with `<html dir>` switching |

### Backend (Phase 2 — later)
| Layer | Choice |
|---|---|
| API | Next.js API routes / server actions |
| ORM | **Prisma** |
| Database | **Supabase** (managed Postgres + Auth + Storage for food photos) |
| Features (TBD) | Admin panel (menu/price CRUD), online ordering, table reservations, review submissions |

---

## 3. Design System

- **Colors:** deep charcoal `#120B0B` bg · crimson `#B91C1C`/`#7F1D1D` · gold `#F5B942`/`#E8A31C` · cream `#FFF7E8` text
- **Vibe:** charcoal + fire — dark warm surfaces, gold accents, red glows, floating ember particles
- **Creative direction:** restaurant-led editorial design. Avoid generic split heroes, excessive floating cards, filler copy, and decorative effects that do not support the food or the brand.
- **Signature animations:** logo preloader → hero entrance, ember particles, animated stat counters (106K followers · 4 branches · 92% recommend), marquee strip, staggered menu cards, hover glow/lift, gallery zoom, floating WhatsApp pulse

## 4. Site Structure (multi-page)

- `/` — preloader, cinematic hero, moving food showcase, marquee, feature highlights, verified social proof
- `/about` — brand story and social proof
- `/menu` — categorized interactive menu
- `/branches` — four branch cards with call, WhatsApp, and directions
- Shared navigation, bilingual AR/EN switch, footer, and floating WhatsApp action

## 5. Phase 2 Data Model (draft)

`Branch` (name, address, phone, mapsUrl) · `Category` (name_ar, name_en, order) · `MenuItem` (categoryId, name_ar/en, desc_ar/en, price, sizes json, image, available) · `Review` (name, rating, text, approved) · `Order`/`Reservation` (if enabled)

## 6. Roadmap

- [x] Confirm brand, branches, stack
- [ ] **Phase 1:** Next.js frontend — full design + animations, placeholder food photos (Unsplash), editable data files
- [ ] Replace placeholders with real food photos (Supabase Storage)
- [ ] **Phase 2:** Supabase + Prisma schema, seed menu, API routes
- [ ] **Phase 3:** Admin panel → then ordering/reservations/reviews (discussed later)
- [ ] Deploy: Vercel + custom domain

> Notes: menu prices are placeholders in EGP — owner edits in `src/lib/data.ts` (Phase 1) or admin panel (Phase 3).
