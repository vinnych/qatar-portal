"use client";

import { useState, useMemo } from "react";
import type { NewsItem } from "@/lib/rss";

export default function NewsSearch({ items }: { items: NewsItem[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.contentSnippet?.toLowerCase().includes(q)
    );
  }, [query, items]);

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          type="search"
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300 transition"
        />
        {query && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-8">No articles found for &ldquo;{query}&rdquo;</p>
      ) : (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <a
              key={item.link}
              href={`/news/${item.slug}`}
              className="bg-sky-50 rounded-xl border border-sky-100 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col overflow-hidden"
            >
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="w-full h-32 sm:h-36 object-cover" loading="lazy" />
              ) : (
                <div className="w-full h-32 sm:h-36 bg-gradient-to-sky-200 from-sky-100 to-sky-200 flex items-center justify-center">
                  <span className="text-4xl opacity-40">📰</span>
                </div>
              )}
              <div className="p-3 sm:p-4 flex flex-col flex-1">
                <span className="text-xs text-sky-700 font-semibold mb-2">{item.source}</span>
                <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-2 line-clamp-3">
                  {item.title}
                </h3>
                {item.contentSnippet && (
                  <p className="text-xs text-gray-500 line-clamp-2 mt-auto">{item.contentSnippet}</p>
                )}
                <span className="text-xs text-gray-400 mt-2">{item.pubDate}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
