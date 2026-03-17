# Qatar Portal

A fast, SEO-optimised web portal for Qatar and Gulf audiences — combining **prayer times**, **news**, and **job listings** in one place.

**Live site:** https://qatar-portal.vercel.app

---

## Features

- **Prayer Times** — Doha + 11 Gulf/Asian cities, animated sky scene, Hijri calendar
- **News Feed** — Al Jazeera, The Peninsula, Google News Qatar with AI summaries (Groq)
- **Job Listings** — Bayt.com, GulfTalent RSS aggregated and categorised
- **Ramadan 2026 Guide** — Suhoor/Iftar timetable for Qatar
- **Qatar Labour Law** — Working hours, minimum wage, end-of-service, leave rules
- **Qatar Salary Guide** — 5 job categories with seniority tiers
- **News Categories** — Qatar, Business, Sports, World, Gulf filtered feeds

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS |
| Hosting | Vercel (auto-deploy from GitHub) |
| Prayer Times | Aladhan API (free, no auth) |
| News/Jobs | RSS feeds parsed with regex |
| AI Summaries | Groq API — llama-3.1-8b-instant |
| Cache | Upstash Redis (serverless) |
| Analytics | Google Analytics 4 |

## Project Structure

```
app/
├── page.tsx                    # Homepage
├── news/[slug]/page.tsx        # Article detail + AI summary
├── jobs/[slug]/page.tsx        # Job detail
├── prayer/[city]/page.tsx      # Prayer times by city
├── hijri-calendar/page.tsx     # Hijri ↔ Gregorian calendar
├── ramadan-2026/page.tsx       # Ramadan 2026 timetable
├── qatar-labour-law/page.tsx   # Labour law reference
├── qatar-salary-guide/page.tsx # Salary guide
└── news-category/[cat]/        # Filtered news by category
components/
├── SkyScene.tsx                # Animated sky (time-of-day)
├── PrayerTimes.tsx             # Prayer times server component
├── NewsFeed.tsx                # News cards
├── JobList.tsx                 # Job cards
└── FooterScenery.tsx           # SVG date palm scene
lib/
├── rss.ts                      # RSS parser (regex, OG scraping)
├── jobs.ts                     # Jobs RSS fetcher
├── groq.ts                     # AI summarizer
├── prayer.ts                   # Aladhan API helper
└── rateLimit.ts                # Redis per-IP rate limiting
```

## Getting Started

```bash
git clone https://github.com/vinnych/Qatar-portal.git
cd Qatar-portal
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env.local` file:

```env
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
GROQ_API_KEY=your_groq_key
PEXELS_API_KEY=your_pexels_key
```

All are optional — the site works without them (no AI summaries or image fallbacks).

## SEO

- Server-side rendered on all pages
- JSON-LD structured data (NewsArticle, JobPosting, FAQPage, BreadcrumbList)
- Dynamic sitemap with 50+ URLs
- Canonical tags, OG tags, Twitter cards on every page

## License

MIT © 2026 vinnych
