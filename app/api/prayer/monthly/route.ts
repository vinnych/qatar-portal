import { NextRequest, NextResponse } from "next/server";
import { getMonthlyPrayerTimes, getMonthlyPrayerTimesByCoords } from "@/lib/prayer";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function GET(req: NextRequest) {
  const allowed = await checkRateLimit(getClientIp(req));
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": "60" } });
  }
  const lat = req.nextUrl.searchParams.get("lat");
  const lng = req.nextUrl.searchParams.get("lng");
  const city = req.nextUrl.searchParams.get("city") || "Doha";
  const country = req.nextUrl.searchParams.get("country") || "Qatar";
  const now = new Date();
  const year = parseInt(req.nextUrl.searchParams.get("year") || String(now.getFullYear()));
  const month = parseInt(req.nextUrl.searchParams.get("month") || String(now.getMonth() + 1));
  if (isNaN(year) || isNaN(month) || year < 1900 || year > 2100 || month < 1 || month > 12) {
    return NextResponse.json({ error: "Invalid year or month" }, { status: 400 });
  }
  try {
    const calendar = lat && lng
      ? await getMonthlyPrayerTimesByCoords(year, month, parseFloat(lat), parseFloat(lng))
      : await getMonthlyPrayerTimes(year, month, city, country);
    return NextResponse.json(calendar);
  } catch (err) {
    console.error("[api/prayer/monthly] error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Failed to fetch monthly prayer times" }, { status: 500 });
  }
}
