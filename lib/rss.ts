import { isValidHttpUrl } from "./utils";
import { redis, KV_TTL } from "./redis";

export interface NewsItem {
  title: string;
  link: string;
  slug: string;
  pubDate: string;
  contentSnippet?: string;
  source: string;
}

const FEEDS = [
  { url: "https://www.aljazeera.com/xml/rss/all.xml", source: "Al Jazeera" },
  { url: "https://thepeninsulaqatar.com/rss/rss.xml", source: "The Peninsula Qatar" },
  { url: "https://www.gulf-times.com/rss/", source: "Gulf Times" },
  { url: "https://www.qna.org.qa/en/rss.xml", source: "Qatar News Agency" },
];
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
        for (const m of matches.slice(0, 6)) {
          const block = m[1];
          const title = block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
            block.match(/<title>(.*?)<\/title>/)?.[1] || "";
          const link = block.match(/<link>(.*?)<\/link>/)?.[1] ||
            block.match(/<link[^>]+href="([^"]+)"/)?.[1] ||
            block.match(/<guid>(.*?)<\/guid>/)?.[1] || "";
          const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";
          const snippet = block.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] ||
            block.match(/<description>(.*?)<\/description>/)?.[1] || "";
          const cleanLink = link.trim();
          if (title && cleanLink && isValidHttpUrl(cleanLink)) {
            feedItems.push({
              title: title.trim(),
              link: cleanLink,
              slug: Buffer.from(cleanLink).toString("base64url"),
              pubDate: pubDate.trim(),
              contentSnippet: snippet.replace(/<[^>]+>/g, "").slice(0, 150),
              source,
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

  // Persist to Redis (fire-and-forget, 7-day TTL)
  if (redis && items.length > 0) {
    Promise.allSettled(
      items.map((item) => redis!.set(`news:${item.slug}`, item, { ex: KV_TTL, nx: true }))
    ).catch(() => {});
  }

  return items.slice(0, limit);
}
