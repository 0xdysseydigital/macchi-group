# SEO Guide

Reference doc for what real estate SEO agencies actually charge ~$1000/mo for, split
into what can be solved in this codebase vs. what requires ongoing manual/off-site work.

## 1. Technical / on-page (buildable in this repo)

- [ ] Unique `<title>` and meta description per page (home, about, team, transactions,
      neighborhoods, listings, contact, testimonials) — no shared boilerplate
- [ ] Structured data (JSON-LD): `RealEstateAgent` / `LocalBusiness` sitewide,
      `RealEstateListing` per listing page
- [ ] Alt text on all property/team photos
- [ ] Semantic heading hierarchy (one `<h1>` per page, logical `<h2>`/`<h3>` nesting)
- [ ] `sitemap.xml` and `robots.txt`
- [ ] Canonical tags
- [ ] Clean, descriptive URLs (avoid query-string-only routes for listings/neighborhoods)
- [ ] Internal linking between neighborhood pages, listings, and team bios
- [ ] Core Web Vitals check — watch LCP/INP on the hero shader (WebGL canvas can be
      heavy); confirm it isn't blocking paint or costing mobile performance

## 2. Local SEO / Google Business Profile (not code — manual setup + upkeep)

- Fully filled-out GBP: categories, service areas, hours, photos, regular posts
- NAP (name/address/phone) consistency across site footer, GBP, socials, directories
- This is usually the single biggest ranking lever for "realtor near me" style searches

## 3. Reviews (manual outreach)

- Actively solicit Google / Zillow / Realtor.com reviews
- Respond to reviews — volume, recency, and response rate all factor into local
  pack ranking

## 4. Backlinks / citations (manual outreach)

- Local directories, chamber of commerce, real estate portals
- Partner links: title companies, mortgage brokers, local news mentions
- This is the labor-intensive "grinding" work agencies bill the most for

## 5. Content

- Neighborhood guides, market reports, "best schools in X" style long-tail posts
- Needs to be genuinely useful and locally specific — thin/AI-spam content is
  actively discounted by Google now
- Can build the system (blog/CMS structure) but someone has to write real content
  on a regular cadence

## Honest take

Bucket 1 is a few hours of engineering work, doable now at no recurring cost.
Buckets 2–4 are the actual recurring labor an agency charges for — legitimate if
done well, often low-effort/low-value if not. Bucket 5 is a hybrid: build the
system, but content quality depends on ongoing human effort.

## 6. Content section: "Insights" page

Decided to add a content/publications section named **Insights** (market reports,
neighborhood guides, firm news) — chosen over Journal, News & Insights, and
Resources for its authoritative-but-not-blog tone.

Future idea: set up an agent to help draft/publish posts on a cadence once the
page exists. Not scoped yet — needs a plan for cadence, review/approval step
before publish, and where content sourcing/facts come from (don't want AI-spam
that Google discounts).

## Status

Holding off on all SEO work (including the Insights page) until the rest of the
site build is complete. Revisit bucket 1 (technical/on-page) first once we
resume, since it's self-contained engineering work.
