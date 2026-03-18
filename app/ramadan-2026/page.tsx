import type { Metadata } from "next";
import { safeJsonLd } from "@/lib/utils";
import { getMonthlyPrayerTimes } from "@/lib/prayer";

const SITE_URL = "https://qatar-portal.vercel.app";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Ramadan 2026 in Qatar — Dates, Prayer Times & Guide",
  description: "Ramadan 2026 in Qatar: start date, Suhoor and Iftar times for Doha, fasting hours, working hours rules, and tips for expats.",
  keywords: ["Ramadan 2026 Qatar", "Ramadan Doha 2026", "Iftar time Doha 2026", "Suhoor time Qatar", "Ramadan working hours Qatar", "when is Ramadan 2026"],
  alternates: { canonical: `${SITE_URL}/ramadan-2026` },
  openGraph: {
    title: "Ramadan 2026 in Qatar — Dates, Suhoor & Iftar Times",
    description: "Ramadan 2026 Qatar: dates, prayer times, fasting hours, and expat guide for Doha.",
    url: `${SITE_URL}/ramadan-2026`,
    siteName: "Qatar Portal",
    type: "website",
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Ramadan 2026 in Qatar — Dates & Prayer Times", description: "Ramadan 2026 Qatar start date, Iftar times, fasting hours and expat tips." },
};

export default async function Ramadan2026Page() {
  // Fetch February + March prayer times (Ramadan spans Feb–Mar 2026)
  let febDays: Awaited<ReturnType<typeof getMonthlyPrayerTimes>> = [];
  let marDays: Awaited<ReturnType<typeof getMonthlyPrayerTimes>> = [];
  try {
    [febDays, marDays] = await Promise.all([
      getMonthlyPrayerTimes(2026, 2),
      getMonthlyPrayerTimes(2026, 3),
    ]);
  } catch { /* fallback to static content */ }

  // Ramadan 2026: approx 18 Feb – 19 Mar
  // PrayerDay.date is readable e.g. "18 Feb 2026"
  const ramadanDays = [
    ...febDays.filter(d => parseInt(d.date) >= 18),
    ...marDays.filter(d => parseInt(d.date) <= 19),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "When does Ramadan 2026 start in Qatar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ramadan 2026 in Qatar is expected to begin on approximately 18 February 2026, subject to moon sighting. It will last 29 or 30 days, ending around 19 March 2026.",
        },
      },
      {
        "@type": "Question",
        name: "What are the working hours during Ramadan in Qatar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "By Qatari law, working hours are reduced to 6 hours per day (or 36 hours per week) during Ramadan for Muslim employees. Non-Muslims and expatriates are also typically affected by reduced working hours in many companies.",
        },
      },
      {
        "@type": "Question",
        name: "Can non-Muslims eat in public during Ramadan in Qatar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eating, drinking, and smoking in public during daylight hours in Ramadan is prohibited in Qatar, even for non-Muslims. Most restaurants close during the day but open after Iftar. Hotels and some malls have screened areas for non-fasting individuals.",
        },
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://qatar-portal.vercel.app" }, { "@type": "ListItem", position: 2, name: "Ramadan 2026 Qatar", item: "https://qatar-portal.vercel.app/ramadan-2026" }] }) }} />

      <h1 className="text-xl font-bold text-gray-900 mb-1">Ramadan 2026 in Qatar</h1>
      <p className="text-xs text-gray-400 mb-3">Suhoor &amp; Iftar times, fasting hours, working hours rules, and tips for living in Doha during Ramadan.</p>

      {/* Key dates */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "Ramadan Starts", value: "~18 Feb 2026", icon: "🌙", color: "violet" },
          { label: "Eid Al-Fitr", value: "~20 Mar 2026", icon: "🎉", color: "emerald" },
          { label: "Fasting Hours (Doha)", value: "~13–14 hrs/day", icon: "⏳", color: "amber" },
          { label: "Reduced Work Hours", value: "6 hrs/day", icon: "🕐", color: "sky" },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className={`bg-${color}-50 border border-${color}-100 rounded-lg p-3`}>
            <p className="text-xl mb-1">{icon}</p>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
            <p className="font-bold text-gray-900 text-base">{value}</p>
          </div>
        ))}
      </div>

      {/* Suhoor & Iftar timetable */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="bg-violet-900 px-4 py-2">
          <h2 className="text-white font-bold text-base">Suhoor &amp; Iftar Times — Doha</h2>
          <p className="text-violet-200 text-xs mt-0.5">Suhoor ends at Fajr · Iftar begins at Maghrib</p>
        </div>
        {ramadanDays.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-2 font-semibold text-gray-600">Date</th>
                  <th className="text-left px-4 py-2 font-semibold text-violet-700">Suhoor (Fajr)</th>
                  <th className="text-left px-4 py-2 font-semibold text-amber-700">Iftar (Maghrib)</th>
                </tr>
              </thead>
              <tbody>
                {ramadanDays.map((d, i) => (
                  <tr key={d.date} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-4 py-2 text-gray-700">{d.date}</td>
                    <td className="px-4 py-2 text-violet-700 font-medium">{d.Fajr}</td>
                    <td className="px-4 py-2 text-amber-700 font-medium">{d.Maghrib}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-gray-500 text-center text-sm">
            <p className="font-medium mb-2">Approximate Times (Doha 2026)</p>
            <p>Suhoor (Fajr): ~4:45 AM · Iftar (Maghrib): ~6:15 PM</p>
            <p className="text-xs mt-1 text-gray-400">Exact times will appear closer to Ramadan.</p>
          </div>
        )}
      </div>

      {/* Rules & guide */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">Ramadan Rules in Qatar</h2>
        <div className="space-y-2">
          {[
            { icon: "🚫", title: "No eating/drinking in public", desc: "Eating, drinking, or smoking in public during daylight is prohibited for everyone — including non-Muslims and tourists. Fines apply." },
            { icon: "🕐", title: "Reduced working hours", desc: "Working hours are reduced by law to 6 hours/day (36 hours/week) for all employees during Ramadan." },
            { icon: "🍽️", title: "Restaurants open after Iftar", desc: "Most restaurants, food courts, and cafes are closed during the day. They open from Iftar (sunset) and many stay open until Suhoor." },
            { icon: "🎵", title: "Respectful behavior required", desc: "Loud music, dancing in public, and inappropriate dress are especially discouraged. Maintain modest dress throughout Ramadan." },
            { icon: "🏨", title: "Hotel dining available", desc: "Hotels have screened dining areas for non-fasting guests. Many malls also have enclosed food courts open during the day." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-2">
              <span className="text-lg flex-shrink-0 mt-0.5">{icon}</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{title}</p>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 mb-4">
        <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">FAQ</h2>
        <div className="space-y-3">
          {[
            { q: "When does Ramadan 2026 start in Qatar?", a: "Ramadan 2026 is expected to begin around 18 February 2026, subject to official moon sighting. The start date may shift by 1 day." },
            { q: "What are the working hours during Ramadan in Qatar?", a: "Working hours are reduced to 6 hours/day or 36 hours/week during Ramadan by Qatari Labour Law. This applies to all employees." },
            { q: "Can non-Muslims eat in public during Ramadan in Qatar?", a: "No. Eating, drinking, and smoking in public during daylight hours is prohibited for everyone during Ramadan. Hotels and some malls provide enclosed dining areas for non-fasting guests." },
          ].map(({ q, a }) => (
            <details key={q} className="group">
              <summary className="cursor-pointer text-xs font-medium text-gray-700 py-2 list-none flex justify-between items-center">
                {q}
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-xs text-gray-500 pt-1 pb-3">{a}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="flex gap-3 flex-wrap text-xs">
        <a href="/prayer" className="text-rose-700 hover:underline">→ Prayer times for Doha</a>
        <a href="/hijri-calendar" className="text-rose-700 hover:underline">→ Hijri Calendar</a>
        <a href="/qatar-public-holidays" className="text-rose-700 hover:underline">→ Public Holidays 2026</a>
      </div>
    </div>
  );
}
