import { getNews } from "@/lib/rss";

export default async function NewsFeed({ limit = 6 }: { limit?: number }) {
  let news;
  try {
    news = await getNews(limit);
  } catch {
    return <p className="text-red-500">Could not load news.</p>;
  }

  if (news.length === 0) {
    return <p className="text-gray-400">No news available right now.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {news.map((item) => (
        <a
          key={item.link}
          href={`/news/${item.slug}`}
          className="bg-sky-50 rounded-xl border border-sky-100 shadow-sm p-4 hover:shadow-md hover:border-sky-300 transition-all flex flex-col"
        >
          <span className="text-xs text-sky-700 font-semibold mb-2">{item.source}</span>
          <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-2 line-clamp-3">
            {item.title}
          </h3>
          {item.contentSnippet && (
            <p className="text-xs text-gray-500 line-clamp-2 mt-auto">{item.contentSnippet}</p>
          )}
          <span className="text-xs text-gray-400 mt-2">{item.pubDate}</span>
        </a>
      ))}
    </div>
  );
}
