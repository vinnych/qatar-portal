import { getPrayerTimes, getMonthlyPrayerTimes } from "@/lib/prayer";
import PrayerSelector from "@/components/PrayerSelector";
import type { Metadata } from "next";

const SITE_URL = "https://qatar-portal.vercel.app";

export const metadata: Metadata = {
  title: "Prayer Times for Muslim Countries — Doha, Mecca, Dubai & More | Qatar Portal",
  description:
    "Accurate Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha prayer times for Doha and 35+ Muslim cities worldwide — today and full monthly calendar.",
  alternates: { canonical: `${SITE_URL}/prayer` },
  keywords: [
    "Doha prayer times",
    "Qatar prayer times today",
    "Fajr time Doha",
    "Isha time Qatar",
    "prayer times 2025 Qatar",
    "salah times Doha",
    "Mecca prayer times",
    "Dubai prayer times",
    "Muslim prayer times",
  ],
};

export default async function PrayerPage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  let today = null;
  let calendar: Awaited<ReturnType<typeof getMonthlyPrayerTimes>> = [];

  try {
    [today, calendar] = await Promise.all([
      getPrayerTimes(),
      getMonthlyPrayerTimes(year, month),
    ]);
  } catch {
    /* show error state below */
  }

  const jsonLd = today
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: `Doha Prayer Times — ${today.date}`,
        location: {
          "@type": "Place",
          name: "Doha, Qatar",
          address: { "@type": "PostalAddress", addressLocality: "Doha", addressCountry: "QA" },
        },
        description: `Fajr: ${today.Fajr}, Dhuhr: ${today.Dhuhr}, Asr: ${today.Asr}, Maghrib: ${today.Maghrib}, Isha: ${today.Isha}`,
        startDate: new Date().toISOString().split("T")[0],
      }
    : null;

  if (!today) {
    return <p className="text-red-500">Could not load prayer times. Please try again later.</p>;
  }

  return (
    <div>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <PrayerSelector defaultTimes={today} defaultCalendar={calendar} />
    </div>
  );
}
