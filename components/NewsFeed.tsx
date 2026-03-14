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
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {news.map((item) => (
        <a
          key={item.link}
          href={`/news/${item.slug}`}
          className="bg-sky-50 rounded-xl border border-sky-100 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col overflow-hidden"
        >
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-32 sm:h-36 object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-32 sm:h-36 bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center">
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
  );
}
