import { getNews, type NewsItem } from "@/lib/rss";
import { safeJsonLd, isValidHttpUrl } from "@/lib/utils";
import { redis } from "@/lib/redis";
import { cache } from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

const getCachedNews = cache(() => getNews(48));

const SITE_URL = "https://qatar-portal.vercel.app";

async function getNewsItem(slug: string): Promise<NewsItem | null> {
  // 1. Try Redis (persisted up to 7 days)
  if (redis) {
    try {
      const cached = await redis.get<NewsItem>(`news:${slug}`);
      if (cached) return cached;
    } catch { /* fall through */ }
  }
  // 2. Fall back to live feed
  const news = await getCachedNews();
  return news.find((n) => n.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) return {};
  return {
    title: `${item.title} | Qatar Portal`,
    description: item.contentSnippet || `Read the latest news from ${item.source} on Qatar Portal.`,
    alternates: { canonical: `${SITE_URL}/news/${slug}` },
    openGraph: {
      title: item.title,
      description: item.contentSnippet || `Read the latest news from ${item.source} on Qatar Portal.`,
      url: `${SITE_URL}/news/${slug}`,
      siteName: "Qatar Portal",
      type: "article",
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) {
    let link: string | null = null;
    try {
      const decoded = Buffer.from(slug, "base64url").toString();
      if (isValidHttpUrl(decoded)) link = decoded;
    } catch { /* invalid slug */ }
    if (link) redirect(link);
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    url: item.link,
    datePublished: item.pubDate,
    publisher: { "@type": "Organization", name: item.source },
    description: item.contentSnippet,
    mainEntityOfPage: `${SITE_URL}/news/${slug}`,
  };

  return (
    <div className="max-w-2xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <div className="mb-6">
        <a href="/news" className="text-sm text-sky-700 hover:underline font-medium">
          ← Back to News
        </a>
      </div>
      <span className="inline-block text-xs text-sky-700 font-semibold uppercase tracking-wide bg-sky-50 border border-sky-200 px-3 py-1 rounded-full mb-3">
        {item.source}
      </span>
      <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-3 leading-snug">
        {item.title}
      </h1>
      {item.pubDate && (
        <p className="text-xs text-gray-400 mb-6">{item.pubDate}</p>
      )}
      {item.contentSnippet && (
        <p className="text-gray-600 mb-8 leading-relaxed text-base">
          {item.contentSnippet}
        </p>
      )}
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-sky-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-800 transition-colors"
      >
        Read Full Article on {item.source} →
      </a>
    </div>
  );
}
