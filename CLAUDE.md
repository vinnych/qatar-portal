# CLAUDE.md

## Project
Qatar Portal — Next.js 16 App Router site for Qatar/Gulf audiences: prayer times, news, jobs, weather, currency, Hijri calendar.
- **Live:** https://qatar-portal.vercel.app | **Local:** http://localhost:3000
- **Repo:** `vinnych/Qatar-portal` (GitHub) | **Deploy:** Vercel auto-deploy on push to master

## Stack
Next.js 16 · TypeScript · Tailwind CSS · Upstash Redis · Groq API · Vercel

## Commands
```bash
cd "c:\Users\asish\qatar news"
npm run dev && npm run build && npm run lint
```

## Key Files
| File | Purpose |
|---|---|
| `app/page.tsx` | Homepage — `space-y-3`, editorial SectionLabel, title+DohaTime row, prayer, weather/currency, news+jobs grid, FAQ |
| `app/layout.tsx` | Nav (h-11, Inter body), footer (2-col mobile grid), GA, AdSense, WebSite JSON-LD |
| `app/sitemap.ts` | Dynamic sitemap — 50+ URLs incl. all articles + jobs |
| `lib/prayer.ts` | Aladhan API — today + monthly by city or coords, revalidate 3600s/86400s |
| `lib/rss.ts` | RSS parser — regex, OG scrape, Pexels fallback, 5s timeout, 5MB cap |
| `lib/jobs.ts` | Jobs RSS — same safety measures |
| `lib/groq.ts` | Groq llama-3.1-8b-instant AI summaries, Redis-cached 7 days |
| `lib/redis.ts` | Upstash Redis — graceful null if env missing |
| `lib/rateLimit.ts` | Per-IP rate limit 30 req/min via Redis INCR |
| `lib/utils.ts` | `toSlug()`, `safeJsonLd()`, `isValidHttpUrl()` |
| `components/PrayerSelector.tsx` | `"use client"` — city dropdown + geolocation detect, fetches `/api/prayer` |
| `components/SkyScene.tsx` | `"use client"` — animated sky (sun/moon/stars/clouds) |
| `components/NewsFeed.tsx` | Server component — `rounded-xl` white cards, `h-28` images, scale hover, `text-[13px]` title |
| `components/JobList.tsx` | Server component — `rounded-xl` white cards, `p-3`, plain-text source |
| `components/AdUnit.tsx` | `"use client"` — AdSense `<ins>` wrapper, slot prop |
| `components/NewsletterCTA.tsx` | `"use client"` — dismissible amber banner → qatarportal.substack.com |
| `components/FooterScenery.tsx` | SVG date palm scenery above footer |
| `public/ads.txt` | `google.com, pub-7212871157824722, DIRECT, f08c47fec0942fa0` |

## Slug System
- `slug` = `toSlug(title, url)` — kebab-case title + 4-char hash (e.g. `qatar-fuel-a3f9`)
- Old base64 slugs still work via fallback decode (backward compat)
- React `cache()` deduplicates fetch between `generateMetadata` and page

## Design System
- **Body font:** Inter (next/font/google) · Playfair Display for "QATAR" wordmark only
- **Font smoothing:** antialiased + optimizeLegibility in globals.css
- **Colors:** `rose-900` header/brand · `amber-300` gold accent · `stone-50` bg · neutral grays for text
- **Cards:** `bg-white border border-stone-200 rounded-xl` — hover: `border-stone-300 shadow-md` · duration-200 transition
- **Section labels:** `<div className="flex items-center gap-3 mb-2">` with thin `h-px bg-stone-200` separator line
- **Typography scale:** body `text-xs`/`text-[11px]` · titles `text-[13px] font-semibold` · labels `text-[10px] font-bold uppercase tracking-widest`
- **Header:** `h-11` fixed height · `bg-rose-900` solid · nav `text-[11px] font-semibold gap-5` · hover `text-white` from `text-white/70`
- **Footer:** `text-[11px]` · `grid grid-cols-2 sm:flex` on mobile · neutral `hover:text-gray-600`
- **DohaTime:** inline monospace `text-[11px] font-mono text-gray-400 tabular-nums` — no card wrapper
- **Interactions:** all transitions `duration-150`–`duration-200` · news images scale on hover · FAQ chevron rotates
- **Touch targets:** FAQ `<summary>` min-h-[44px] · job cards min-h via p-3

## Frontend Review (Ongoing)
After every significant UI change, audit for:
1. **Mobile (375px):** tap targets ≥44px, text ≥11px, no horizontal scroll, cards stack cleanly
2. **Consistency:** all new cards use the standard card pattern above
3. **Typography:** Inter applied, correct weight/size hierarchy
4. **Interactions:** hover states smooth (duration-200), no jarring color jumps
5. **Performance:** no new heavy dependencies, images use `loading="lazy"`

## API Routes
| Route | Notes |
|---|---|
| `GET /api/prayer` | `?city=&country=` or `?lat=&lng=` — rate limited |
| `GET /api/prayer/monthly` | `?city=&country=&year=&month=` or `?lat=&lng=` — validates year 1900-2100, month 1-12 |
| `GET /api/news` | Rate limited |
| `GET /api/jobs` | Rate limited |

## Redis Keys
| Key | TTL |
|---|---|
| `news:{slug}`, `job:{slug}` | 7 days (nx:true) |
| `news:summary:{slug}` | 7 days |
| `news:ogimage:{slug}` | 7 days |
| `ratelimit:{ip}:{minute}` | 90s |

## Env Vars
`UPSTASH_REDIS_REST_URL` · `UPSTASH_REDIS_REST_TOKEN` · `GROQ_API_KEY` · `PEXELS_API_KEY`

## Analytics & Monetization
- **GA:** `G-VPREJS079K` · **AdSense:** `ca-pub-7212871157824722` (awaiting approval) · **Search Console:** verified

## SEO
- JSON-LD per page: `WebSite`, `FAQPage`, `NewsArticle`, `JobPosting`, `ItemList`, `BreadcrumbList`
- Canonical + OG + Twitter cards on all pages
- Prayer page uses `WebPage` schema — NOT `Event` (caused Search Console errors)

## Security
- `isValidHttpUrl()` on all external links · `safeJsonLd()` escapes `<>` for XSS prevention
- 5s timeout + 5MB cap on RSS · 2s on OG image scrapes
- CSP in `next.config.ts` covers AdSense, GA, Groq, Pexels, Aladhan

## Gotchas
- `create-next-app` hangs interactively — scaffold manually
- Next.js 16: `params` is a Promise — must `await params` before accessing `slug`
- All RSS parsing uses regex — no rss-parser library
- Gemini geo-restricted in Qatar — use Groq
