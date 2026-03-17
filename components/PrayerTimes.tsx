import { getPrayerTimes } from "@/lib/prayer";
import SkyScene from "./SkyScene";

const PRAYER_ICONS: Record<string, string> = {
  Fajr: "🌙",
  Sunrise: "🌅",
  Dhuhr: "☀️",
  Asr: "🌤️",
  Maghrib: "🌇",
  Isha: "🌃",
};

export default async function PrayerTimes() {
  let times;
  try {
    times = await getPrayerTimes();
  } catch {
    return (
      <div className="bg-rose-900 rounded-2xl shadow-md p-6">
        <p className="text-rose-200">Could not load prayer times.</p>
      </div>
    );
  }

  if (!times) {
    return (
      <div className="bg-rose-900 rounded-2xl shadow-md p-6">
        <p className="text-rose-200">Could not load prayer times.</p>
      </div>
    );
  }

  const prayerNames = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
  const prayers = prayerNames.map((name) => ({
    name,
    time: times[name as keyof typeof times] as string,
    icon: PRAYER_ICONS[name],
  }));

  // Use Doha time (UTC+3) so the sky scene reflects the correct local hour
  const currentHour = Number(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Qatar", hour: "numeric", hour12: false })
  );

  return (
    <a href="/prayer" className="block hover:opacity-95 transition-opacity">
      <SkyScene prayers={prayers} date={times.date} currentHour={currentHour} />
    </a>
  );
}
