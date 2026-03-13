import { isValidHttpUrl } from "./utils";
import { redis, KV_TTL } from "./redis";

export interface NewsItem {
  title: string;
  link: string;
  slug: string;
  pubDate: string;
  contentSnippet?: string;
  source: string;
  imageUrl?: string;
}

const FEEDS = [
  { url: "https://www.aljazeera.com/xml/rss/all.xml", source: "Al Jazeera" },
  { url: "https://news.google.com/rss/search?q=qatar&hl=en-US&gl=US&ceid=US:en", source: "Google News" },
  { url: "https://feeds.bbci.co.uk/news/world/middle_east/rss.xml", source: "BBC Middle East" },
];

/** Fetch OG image from an article URL with a short timeout. Cached in Redis. */
async function fetchOgImage(slug: string, articleUrl: string): Promise<string | undefined> {
  // Check Redis cache first
  if (redis) {
    try {
      const cached = await redis.get<string>(`news:ogimage:${slug}`);
      if (cached) return cached;
    } catch { /* fall through */ }
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(articleUrl, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Qatar-Portal/1.0)" },
    });
    clearTimeout(timer);
    if (!res.ok) return undefined;

    const html = await res.text();
    const ogImage =
      html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/)?.[1] ||
      html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/)?.[1];

    const imageUrl = ogImage && isValidHttpUrl(ogImage) ? ogImage : undefined;

    // Cache result (even undefined stored as empty string to avoid re-fetching)
    if (redis) {
      try {
        await redis.set(`news:ogimage:${slug}`, imageUrl ?? "", { ex: KV_TTL });
      } catch { /* ignore */ }
    }

    return imageUrl;
  } catch {
    return undefined;
  }
}

export async function getNews(limit = 12): Promise<NewsItem[]> {
  const results = await Promise.allSettled(
    FEEDS.map(async ({ url, source }): Promise<NewsItem[]> => {
      const feedItems: NewsItem[] = [];
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(url, { signal: controller.signal, next: { revalidate: 900 } });
        clearTimeout(timer);
        if (!res.ok) return feedItems;
        const raw = await res.text();
        const text = raw.length > 5 * 1024 * 1024 ? raw.slice(0, 5 * 1024 * 1024) : raw;
        const matches = [...text.matchAll(/<item[^>]*>([\s\S]*?)<\/item>/g)];
        for (const m of matches.slice(0, 10)) {
          const block = m[1];
          const title = block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
            block.match(/<title>(.*?)<\/title>/)?.[1] || "";
          const link = block.match(/<link>(.*?)<\/link>/)?.[1] ||
            block.match(/<link[^>]+href="([^"]+)"/)?.[1] ||
            block.match(/<guid>(.*?)<\/guid>/)?.[1] || "";
          const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";
          const snippet = block.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] ||
            block.match(/<description>(.*?)<\/description>/)?.[1] || "";
          const rawImage =
            block.match(/<media:content[^>]+url="([^"]+)"/)?.[1] ||
            block.match(/<media:thumbnail[^>]+url="([^"]+)"/)?.[1] ||
            block.match(/<enclosure[^>]+url="([^"]+)"[^>]+type="image\//)?.[1] ||
            block.match(/<enclosure[^>]+type="image\/[^"]*"[^>]+url="([^"]+)"/)?.[1] ||
            snippet.match(/<img[^>]+src="([^"]+)"/)?.[1] || "";
          const imageUrl = rawImage && isValidHttpUrl(rawImage) ? rawImage : undefined;
          const cleanLink = link.trim();
          if (title && cleanLink && isValidHttpUrl(cleanLink)) {
            feedItems.push({
              title: title.trim(),
              link: cleanLink,
              slug: Buffer.from(cleanLink).toString("base64url"),
              pubDate: pubDate.trim(),
              contentSnippet: snippet.replace(/<[^>]+>/g, "").slice(0, 150),
              source,
              imageUrl,
            });
          }
        }
      } catch {
        // skip failed feeds
      }
      return feedItems;
    })
  );

  const items: NewsItem[] = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));

  // For items without images, fetch OG images in parallel (fire-and-forget)
  const itemsWithoutImage = items.filter((item) => !item.imageUrl);
  if (itemsWithoutImage.length > 0) {
    Promise.allSettled(
      itemsWithoutImage.map(async (item) => {
        const ogImage = await fetchOgImage(item.slug, item.link);
        if (ogImage) item.imageUrl = ogImage;
      })
    ).catch(() => {});
  }

  // Persist to Redis (fire-and-forget, 7-day TTL)
  if (redis && items.length > 0) {
    Promise.allSettled(
      items.map((item) => redis!.set(`news:${item.slug}`, item, { ex: KV_TTL, nx: true }))
    ).catch(() => {});
  }

  return items.slice(0, limit);
}
