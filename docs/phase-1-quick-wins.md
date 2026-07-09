# Phase 1 — Peak Season Quick Wins

| | |
|---|---|
| **Branch** | `v2` |
| **Timeline** | 4–6 weeks (July–August 2026) |
| **Goal** | Convert more of existing traffic **without** a full visual redesign |
| **Ref** | `docs/website-recon-v2.md` §9 |
| **Out of scope** | Brand redesign, blog/content hub, new IA, payment integration (Phase 2+) |

---

## Success Criteria

Phase 1 is done when:

1. A visitor can reach WhatsApp with **context** from any top package or deal page in one tap
2. Homepage hero shows stats **once**, not per slide
3. Kenya signature packages (Migration, Pwani, Mara) are **merchandised above the fold**
4. "How to Book" journey is visible on homepage
5. Trust signals (rating, licensed operator) appear sitewide or on key pages
6. All broken links/CTAs are fixed
7. Phone/WhatsApp numbers come from **one CMS source**

### Metrics to track (baseline now, review at end of Phase 1)

| Metric | Tool | Target |
|---|---|---|
| WhatsApp click rate | Facebook Pixel / GTM | +30% vs baseline |
| Contact form submissions | Admin contacts | Maintain or improve |
| Bounce rate on homepage | GA4 | −10% |
| Time on package pages | GA4 | +15% |
| 404 errors | GSC / server logs | Zero for `/terms`, footer links |

---

## Sprint Plan

| Sprint | Weeks | Focus |
|---|---|---|
| **Sprint 1** | 1–2 | Fixes + WhatsApp foundation |
| **Sprint 2** | 2–3 | Homepage cleanup + merchandising |
| **Sprint 3** | 3–4 | Trust + booking journey + seasonal |
| **Sprint 4** | 4–6 | QA, polish, deploy, measure |

---

## Task Backlog

### P0 — Must ship (conversion + broken UX)

---

#### P1-01 · Unify phone & WhatsApp from CMS settings

**Problem:** `contactPhone` and `whatsappNumber` exist in Prisma/admin but front-end hardcodes different numbers. Footer shows `+254 113 039 737`; floating actions use `+254793041888`.

**Files to change:**
- `components/floating-actions.tsx`
- `components/top-banner.tsx`
- `components/footer.tsx`
- `app/destinations/[country]/[slug]/destination-content.tsx`
- `components/ai-chat-widget.tsx`
- `components/contact-info.tsx`

**Implementation:**
1. Create `lib/contact-settings.ts` helper:
   - `getWhatsAppUrl(number, message?)` — strips `+`, builds `wa.me` link with encoded `?text=`
   - `getTelUrl(number)` — normalizes phone for `tel:` links
2. Pass `settings` from server components OR fetch once in a client provider
3. Replace all hardcoded numbers with `settings.whatsappNumber` / `settings.contactPhone`
4. Confirm admin settings match production numbers before deploy

**Acceptance criteria:**
- [ ] One WhatsApp number site-wide (from CMS)
- [ ] One primary phone number site-wide (from CMS)
- [ ] Changing number in `/denmar-portal/settings` updates front-end without code deploy

**Effort:** S · **Owner:** Dev

---

#### P1-02 · Contextual WhatsApp CTAs on package pages

**Problem:** Package detail only links to contact form. Bonfire/TrippyGO win on WhatsApp-first with pre-filled trip context.

**Files:**
- `app/packages/[slug]/package-details.tsx`
- `lib/contact-settings.ts` (from P1-01)

**Implementation:**
1. Add primary CTA: **"Chat on WhatsApp"** with pre-filled message:
   ```
   Hi Denmar, I'm interested in the {package.name} package ({duration}, from {price}). Please share availability and a quote.
   ```
2. Keep secondary CTA: "Request Quote" → `/contact?package={slug}`
3. Update contact form to read `?package=` query param and pre-fill destination/message
4. Fire `trackWhatsAppClick` with package name label

**Acceptance criteria:**
- [ ] WhatsApp button visible above fold on package detail
- [ ] Message includes package name, duration, price
- [ ] Contact form pre-fills when arriving via `?package=`

**Effort:** S · **Depends on:** P1-01

---

#### P1-03 · Contextual WhatsApp CTAs on deal pages

**Problem:** "Book This Deal" goes to generic `/contact` with no deal context.

**Files:**
- `app/deals/[slug]/page.tsx`
- `components/contact-form.tsx`

**Implementation:**
1. Add WhatsApp CTA with message:
   ```
   Hi Denmar, I'd like to book the {deal.title} deal ({discount}% off, from {discountedPrice}). Is it still available?
   ```
2. Update contact link: `/contact?deal={slug}`
3. Contact form reads `?deal=` and pre-fills message field

**Acceptance criteria:**
- [ ] WhatsApp + contact CTAs on every deal detail page
- [ ] Deal name and price in pre-filled message

**Effort:** S · **Depends on:** P1-01

---

#### P1-04 · Fix broken links and CTAs

**Problem:** Multiple dead or misrouted paths hurt trust and SEO.

| Issue | File | Fix |
|---|---|---|
| `/terms` 404 | `components/footer.tsx` | Create `app/terms/page.tsx` OR link to existing policy URL |
| Privacy/Terms not linked | `components/footer.tsx` | Wire bottom bar links |
| "Browse Packages" → `/deals` | `components/ready-to-plan-section.tsx` | Change `href` to `/packages` |
| Services CTAs no href | `app/services/[slug]/page.tsx` | Link to `/contact?service={slug}` + WhatsApp |
| Duplicate TopBanner | `app/page.tsx` + `components/navbar.tsx` | Remove `TopBanner` from `app/page.tsx` (navbar already renders it) |
| Footer destination slug mismatch | `components/footer.tsx` | Align with `/destinations/[country]/[slug]` pattern or use DB-driven links |

**Acceptance criteria:**
- [ ] Zero 404s from footer/nav links
- [ ] All CTA buttons have working destinations
- [ ] Top banner appears once on homepage

**Effort:** S–M

---

### P1 — High impact (homepage + merchandising)

---

#### P1-05 · Homepage hero cleanup — dedupe stats

**Problem:** Stats block (35+ / 500+ / 4.9) repeats on every hero slide — visible on live site as duplicated content.

**Files:**
- `components/hero-section.tsx`

**Implementation:**
1. Move `heroStats` **outside** the slide map — render once below hero content or in a fixed trust ribbon
2. Keep stats visible on mobile and desktop without re-rendering per slide
3. Optional: add subtle enter animation once on load (not per slide change)

**Acceptance criteria:**
- [ ] Stats appear exactly once regardless of slide count
- [ ] No layout shift when slides change
- [ ] Mobile Featured Inspirations panel unaffected

**Effort:** S

---

#### P1-06 · Slide-aware featured packages in hero

**Problem:** Every slide shows the same two Dubai packages in "Featured Inspirations" regardless of slide theme (Cultural Journeys, Cape Town, Thailand).

**Files:**
- `components/hero-section.tsx`
- `app/page.tsx`
- `app/denmar-portal/hero-slides/hero-slide-form.tsx` (optional: add `linkedPackageIds` field)

**Implementation (choose one):**

**Option A — Quick (no schema change):**
- Pass a mixed `highlightPackages` array from homepage: include Kenya packages (Mara, Pwani) + top international
- Rotate or randomize which 2 show per slide index

**Option B — Proper (recommended):**
- Add optional `linkedPackageSlugs` JSON field to `HeroSlide` model
- Admin can assign 1–2 packages per slide
- Hero reads slide-specific packages; falls back to featured if empty

**Acceptance criteria:**
- [ ] Safari slide shows safari/Kenya packages
- [ ] International slides show relevant destination packages
- [ ] No slide shows irrelevant Dubai cards when theme is Kenya/coast

**Effort:** S (Option A) · M (Option B)

---

#### P1-07 · Promote Kenya packages in homepage featured slots

**Problem:** 4 of 6 featured packages are Dubai; Kenya signature journeys buried.

**Files:**
- `app/page.tsx` (package query logic)
- `components/packages-section.tsx`
- Admin: reorder featured packages in portal

**Implementation:**
1. Update homepage query to **prioritize Kenya categories**:
   - Maasai Mara / Migration 2026
   - Pwani / Coast
   - Amboseli / Safari
2. Cap international featured at 2 of 6 slots
3. Ensure hero `highlightPackages` pulls from Kenya-first list
4. Content team: mark Kenya packages `featured: true` in admin

**Acceptance criteria:**
- [ ] At least 3 of 6 homepage featured packages are Kenya-based
- [ ] Migration 2026 / Mara package visible without scrolling on desktop
- [ ] Featured order editable via admin without code change

**Effort:** S (query + admin) · **Owner:** Dev + Marketing

---

#### P1-08 · "How to Book with Denmar" 3-step section

**Problem:** Year 1 roadmap priority; competitors show clear booking journey. First-time visitors don't know what happens next.

**Files:**
- New: `components/how-to-book-section.tsx`
- `app/page.tsx` (insert after Why Us or before Testimonials)

**Content (draft):**

| Step | Title | Description |
|---|---|---|
| 1 | **Tell us your dream trip** | Share destination, dates, and budget via WhatsApp or our quick quote form |
| 2 | **We design your itinerary** | A Denmar travel specialist crafts a personalized quote within 24 hours |
| 3 | **Confirm & travel** | Secure your booking, receive your voucher, and enjoy 24/7 support |

**Design notes:**
- Simple horizontal 3-step on desktop; stacked on mobile
- Each step has icon + short copy
- CTA below: "Start on WhatsApp" + "Request a Quote"
- Use brand colors; no heavy animation

**Acceptance criteria:**
- [ ] Section live on homepage
- [ ] WhatsApp CTA uses unified number (P1-01)
- [ ] Mobile-readable in under 5 seconds scan time

**Effort:** S

---

#### P1-09 · Trust bar component

**Problem:** Trust signals scattered and inconsistent (35+ vs 50+ countries). No Google review visibility.

**Files:**
- New: `components/trust-bar.tsx`
- `app/page.tsx` (below hero or above footer)
- Optional: `app/packages/[slug]/layout.tsx`, destination layouts

**Content (use verified numbers only):**

| Signal | Source |
|---|---|
| ★ 4.9 guest satisfaction | Hero stat (confirm with team) |
| 500+ custom itineraries | Hero stat |
| Licensed tour operator | Why Us copy |
| Google reviews | **TBD** — need Google Business Profile link + count from marketing |

**Implementation:**
1. Build slim horizontal bar: icon + stat + label, 3–4 items
2. Single source of truth: `lib/site-stats.ts` constants used by hero, about, trust bar
3. If Google review count available, add badge with link to Google Business Profile
4. Do **not** invent review counts — use real data or omit until marketing provides

**Acceptance criteria:**
- [ ] Stats consistent across homepage, about, trust bar
- [ ] Trust bar visible on homepage
- [ ] Optional: trust bar on package + destination detail pages

**Effort:** S · **Blocked by:** Marketing confirming Google review count/link

---

### P2 — Should ship (seasonal + polish)

---

#### P1-10 · Enable seasonal collection block

**Problem:** `ChristmasPackages` and `ValentinesPackages` components exist but are commented out. TrippyGO leads with Migration 2026.

**Files:**
- `components/xmass-packages.tsx` OR new `components/seasonal-collection.tsx`
- `app/page.tsx`

**Implementation:**
1. Create generic `SeasonalCollection` component (reusable for any campaign)
2. For peak season: feature **"2026 Wildebeest Migration"** collection
3. Query packages where name/category/tags match migration/safari
4. Insert between Top Destinations and Packages sections
5. Manage title/visibility via admin (optional: `SiteSettings.seasonalCollectionEnabled`)

**Acceptance criteria:**
- [ ] One seasonal block live on homepage
- [ ] Links to relevant packages/deals
- [ ] Can be disabled via admin or env flag without code deploy

**Effort:** M

---

#### P1-11 · Contact form context pre-fill (package + deal + service)

**Problem:** Forms don't carry context from product pages.

**Files:**
- `components/contact-form.tsx`
- `components/mini-quote-form.tsx`

**Implementation:**
1. Read URL params: `?package=`, `?deal=`, `?service=`, `?destination=`
2. Pre-fill destination dropdown or message field
3. Add hidden field or tag for admin CRM: source page type + slug
4. Fire Facebook `Lead` pixel on mini-quote submit (already on full form)

**Acceptance criteria:**
- [ ] Arriving from package page pre-fills package name
- [ ] Admin contact submission shows source context

**Effort:** S · **Depends on:** P1-02, P1-03

---

#### P1-12 · Floating WhatsApp brand styling

**Problem:** Floating actions use generic `green-500` / `blue-500` — off-brand.

**Files:**
- `components/floating-actions.tsx`

**Implementation:**
1. WhatsApp button: `#25D366` (official WA green) is fine, or brand-success
2. Phone button: `bg-brand-accent` or `bg-brand-primary`
3. Pass settings for dynamic numbers (P1-01)

**Acceptance criteria:**
- [ ] FAB colors align with brand palette
- [ ] No generic Tailwind blue/green unless intentional

**Effort:** XS · **Depends on:** P1-01

---

#### P1-13 · Admin auth middleware

**Problem:** No `middleware.ts` — admin routes may be unprotected at edge.

**Files:**
- New: `middleware.ts`
- `lib/auth.config.ts`

**Implementation:**
1. Protect `/denmar-portal/*` except `/denmar-portal/login`
2. Redirect unauthenticated users to login
3. Verify NextAuth session check works in production

**Acceptance criteria:**
- [ ] Unauthenticated access to `/denmar-portal` redirects to login
- [ ] Public routes unaffected

**Effort:** S · **Priority:** Security — ship in Sprint 1

---

### P3 — Nice to have (if time allows)

---

#### P1-14 · Deals popup WhatsApp option

Add "Chat on WhatsApp" beside "View Deal" in `components/deals-popup.tsx`.

**Effort:** XS

---

#### P1-15 · Testimonials on top 3 package pages

Embed 2–3 relevant testimonials on highest-traffic package detail pages.

**Effort:** S

---

#### P1-16 · Homepage floating actions z-index audit

Ensure FABs don't overlap carousel arrows or mobile Featured Inspirations (known issue from prior work).

**Effort:** XS

---

## Single Source of Truth — Site Stats

Create `lib/site-stats.ts` to end stat inconsistencies:

```ts
export const SITE_STATS = {
  countries: "35+",
  itineraries: "500+",
  satisfaction: "4.9",
  yearsExperience: "10+",
  travelers: "10K+", // confirm with marketing before using
} as const
```

Replace hardcoded values in:
- `components/hero-section.tsx`
- `components/show-you-world-section.tsx`
- `components/trust-bar.tsx` (new)
- `components/footer-schema.tsx`

---

## WhatsApp Message Templates

Centralize in `lib/whatsapp-messages.ts`:

| Context | Template |
|---|---|
| General | `Hi Denmar, I'd like help planning a trip.` |
| Destination | `Hi Denmar, I'm interested in {destination} packages.` |
| Package | `Hi Denmar, I'm interested in {package} ({duration}, from {price}).` |
| Deal | `Hi Denmar, I'd like to book {deal} ({discount}% off).` |
| Service | `Hi Denmar, I need help with {service}.` |

---

## Testing Checklist (pre-deploy)

### Functional
- [ ] WhatsApp opens with correct pre-filled message on package, deal, destination pages
- [ ] Contact form pre-fills from `?package=`, `?deal=`, `?destination=`
- [ ] All footer links resolve (no 404)
- [ ] Services page CTAs work
- [ ] Top banner appears once on homepage
- [ ] Admin settings change reflects on front-end
- [ ] Deals popup still works after changes
- [ ] Mobile: FABs don't block content

### Cross-browser / device
- [ ] Chrome mobile (Android)
- [ ] Safari mobile (iOS) — WhatsApp deep link
- [ ] Desktop Chrome

### Analytics
- [ ] `whatsapp_click` fires on all new WhatsApp buttons
- [ ] `Lead` pixel fires on contact + mini-quote forms
- [ ] UTM params preserved through contact flow

---

## Deployment Notes

1. **Branch:** `v2` → PR to `main` when Sprint 3 complete
2. **CMS:** Confirm phone/WhatsApp in admin before deploy
3. **Content:** Marketing to flag Kenya packages as featured + verify stat claims
4. **Rollback:** Each task is independently deployable where possible

---

## Task Summary

| ID | Task | Priority | Effort | Sprint |
|---|---|---|---|---|
| P1-01 | Unify phone/WhatsApp from CMS | P0 | S | 1 |
| P1-02 | WhatsApp on package pages | P0 | S | 1 |
| P1-03 | WhatsApp on deal pages | P0 | S | 1 |
| P1-04 | Fix broken links/CTAs | P0 | S–M | 1 |
| P1-05 | Hero stats dedupe | P1 | S | 2 |
| P1-06 | Slide-aware featured packages | P1 | S–M | 2 |
| P1-07 | Kenya-first featured packages | P1 | S | 2 |
| P1-08 | How to Book section | P1 | S | 2 |
| P1-09 | Trust bar | P1 | S | 3 |
| P1-10 | Seasonal collection block | P2 | M | 3 |
| P1-11 | Contact form pre-fill | P2 | S | 2 |
| P1-12 | FAB brand styling | P2 | XS | 1 |
| P1-13 | Admin auth middleware | P2 | S | 1 |
| P1-14 | Deals popup WhatsApp | P3 | XS | 4 |
| P1-15 | Testimonials on packages | P3 | S | 4 |
| P1-16 | FAB z-index audit | P3 | XS | 4 |

**Total estimated effort:** ~3–4 dev weeks + marketing input for stats/reviews

---

## What we are NOT doing in Phase 1

- Full visual redesign or new brand system
- Blog / content hub
- Homepage package finder (TrippyGO-style)
- New navigation / mega-menu IA
- Google Reviews API integration (manual badge only if data provided)
- Payment / deposit flow
- Package page template rewrite

These are **Phase 2** — see `docs/website-recon-v2.md` §9.

---

## Next Action

**Start Sprint 1:** P1-01 → P1-04 → P1-13 → P1-12

Say the word and we implement Sprint 1 on branch `v2`.
