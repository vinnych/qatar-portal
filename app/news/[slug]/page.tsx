import { getNews } from "@/lib/rss";
import { safeJsonLd } from "@/lib/utils";
import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const getCachedNews = cache(() => getNews(48));

const SITE_URL = "https://qatarportal.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  let link: string;
  try {
    link = Buffer.from(params.slug, "base64url").toString();
  } catch {
    return {};
  }
  const news = await getCachedNews();
  const item = news.find((n) => n.link === link);
  if (!item) return {};
  return {
    title: `${item.title} | Qatar Portal`,
    description: item.contentSnippet || `Read the latest news from ${item.source} on Qatar Portal.`,
    alternates: { canonical: `${SITE_URL}/news/${params.slug}` },
    openGraph: {
      title: item.title,
      description: item.contentSnippet || `Read the latest news from ${item.source} on Qatar Portal.`,
      url: `${SITE_URL}/news/${params.slug}`,
      siteName: "Qatar Portal",
      type: "article",
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  let link: string;
  try {
    link = Buffer.from(params.slug, "base64url").toString();
  } catch {
    return notFound();
  }

  const news = await getCachedNews();
  const item = news.find((n) => n.link === link);
  if (!item) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    url: item.link,
    datePublished: item.pubDate,
    publisher: { "@type": "Organization", name: item.source },
    description: item.contentSnippet,
    mainEntityOfPage: `${SITE_URL}/news/${params.slug}`,
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
