# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project
Qatar Portal — a Next.js 14 website aggregating prayer times, news, and job listings for Qatar/Gulf audiences. Goal: organic SEO traffic without paid marketing.

**Live site:** https://qatarportal.vercel.app
**Local dev:** http://localhost:3000

## Tech Stack
- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel (free tier, auto-deploys from GitHub)
- **Prayer times:** Aladhan API (free, no auth)
- **News:** RSS feeds (Al Jazeera, The Peninsula Qatar) parsed with regex in `lib/rss.ts`
- **Jobs:** RSS feeds (Bayt.com, GulfTalent) parsed in `lib/jobs.ts`
- **Database:** None — all data fetched live with Next.js `fetch` caching

## Project Structure
```
app/
├── page.tsx                  # Homepage (prayer + news + jobs)
├── icon.svg                  # Favicon — maroon square with golden date palm
├── news/
│   ├── page.tsx              # News list page
│   └── [slug]/page.tsx       # Individual article page (React cache dedup)
├── jobs/
│   ├── page.tsx              # Jobs list page
│   └── [slug]/page.tsx       # Individual job page (React cache dedup)
├── layout.tsx                # Shared layout + nav + WebSite JSON-LD + FooterScenery
├── sitemap.ts                # Dynamic sitemap (fetches all articles + jobs)
├── robots.ts                 # robots.txt
└── api/
    ├── prayer/
    │   ├── route.ts          # Today's prayer times
    │   └── monthly/route.ts  # Monthly calendar — validates year/month params
    ├── news/route.ts
    └── jobs/route.ts
components/
├── PrayerTimes.tsx           # Async server component (passes to SkyScene)
├── SkyScene.tsx              # "use client" — animated sky scene
├── NewsFeed.tsx              # Async server component, links to /news/[slug]
├── JobList.tsx               # Async server component, links to /jobs/[slug]
├── NewsSearch.tsx            # "use client" — client-side news filter
├── JobSearch.tsx             # "use client" — client-side job filter
└── FooterScenery.tsx         # Pure SVG date palm scene — renders above footer on all pages
lib/
├── prayer.ts                 # Aladhan API helper (revalidates 3600s)
├── rss.ts                    # RSS parser — regex, URL validation, 5s timeout, 5MB cap
└── jobs.ts                   # Jobs RSS fetcher — same safety measures
public/                       # Static assets (currently empty)
next.config.ts                # Security headers (CSP, X-Frame-Options, etc.)
```

## Common Commands
```bash
cd "c:\Users\asish\qatar news"
npm run dev       # Start local dev server
npm run build     # Production build
npm run lint      # ESLint
```

## Data Sources
| Data | Source | Revalidation |
|---|---|---|
| Prayer times | api.aladhan.com | 1 hour |
| News | Al Jazeera RSS, The Peninsula RSS | 15 min |
| Jobs | Bayt.com RSS, GulfTalent RSS | 30 min |

## Slug System
- `slug` field on `NewsItem` and `Job` = `Buffer.from(link).toString("base64url")`
- Decode in detail pages: `Buffer.from(slug, "base64url").toString()`
- Always validate URLs with `isValidHttpUrl()` before use
- Both `generateMetadata` and the page component share one fetch via React `cache()`

## Card Color System
- News cards: `bg-sky-50 border-sky-100` — distinct from `stone-50` page background
- Job cards: `bg-emerald-50 border-emerald-100`
- Prayer cards: `bg-violet-50 border-violet-100`

## SEO Strategy
- SSR on all pages + individual article/job pages (~43+ indexed URLs)
- JSON-LD per page: WebSite, Event, NewsArticle, JobPosting, ItemList
- Canonical tags + keyword metadata on every page
- Dynamic async sitemap includes all individual article + job URLs
- Favicon: `app/icon.svg` (Next.js App Router auto-serves as favicon)
- After deploy: submit sitemap to Google Search Console

## Security
- URL validation before rendering any external link
- 5s fetch timeout + 5MB payload cap on RSS fetches
- `res.ok` checked before reading response body in all RSS fetchers
- Year/month bounds validation (1900–2100, 1–12) on monthly prayer API
- PrayerSelector validates API response shape before setting state
- Security headers set in `next.config.ts`

## Deployment
- Push to GitHub, connect repo to Vercel — auto-deploys on every push
- No environment variables required (all APIs are public)
