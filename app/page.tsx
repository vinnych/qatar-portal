import { Suspense } from "react";
import PrayerTimes from "@/components/PrayerTimes";
import NewsFeed from "@/components/NewsFeed";
import JobList from "@/components/JobList";
import { getPrayerTimes } from "@/lib/prayer";
import { safeJsonLd } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doha Prayer Times Today — Qatar News & Jobs | Qatar Portal",
  description: "Accurate Doha prayer times for today including Fajr, Dhuhr, Asr, Maghrib and Isha. Plus latest Qatar news and job listings.",
};

export default async function Home() {
  let prayerJsonLd = null;
  try {
    const times = await getPrayerTimes();
    prayerJsonLd = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": `Doha Prayer Times — ${times.date}`,
      "location": { "@type": "Place", "name": "Doha, Qatar", "address": "Doha, Qatar" },
      "description": `Fajr: ${times.Fajr}, Dhuhr: ${times.Dhuhr}, Asr: ${times.Asr}, Maghrib: ${times.Maghrib}, Isha: ${times.Isha}`,
    };
  } catch { /* ignore */ }

  return (
    <div className="space-y-10">
      {prayerJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: safeJsonLd(prayerJsonLd)}} />
      )}
      {/* Prayer Times */}
      <section>
        <Suspense fallback={<div className="bg-white rounded-2xl p-6 animate-pulse h-32" />}>
          <PrayerTimes />
        </Suspense>
      </section>

      {/* News + Jobs side by side on large screens */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* News — takes 2/3 */}
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-sky-900"><span aria-hidden="true">📰</span> Latest News</h2>
            <a href="/news" className="text-sm text-sky-700 hover:underline">View all →</a>
          </div>
          <Suspense fallback={<div className="grid gap-4 sm:grid-cols-2"><div className="bg-white rounded-xl h-32 animate-pulse" /><div className="bg-white rounded-xl h-32 animate-pulse" /></div>}>
            <NewsFeed limit={6} />
          </Suspense>
        </section>

        {/* Jobs — takes 1/3 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-emerald-900"><span aria-hidden="true">💼</span> Jobs in Qatar</h2>
            <a href="/jobs" className="text-sm text-emerald-700 hover:underline">View all →</a>
          </div>
          <Suspense fallback={<div className="space-y-3"><div className="bg-white rounded-xl h-16 animate-pulse" /><div className="bg-white rounded-xl h-16 animate-pulse" /></div>}>
            <JobList limit={5} />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
