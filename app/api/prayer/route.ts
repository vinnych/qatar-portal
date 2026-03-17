import { NextRequest, NextResponse } from "next/server";
import { getPrayerTimes, getPrayerTimesByCoords } from "@/lib/prayer";
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
  try {
    const times = lat && lng
      ? await getPrayerTimesByCoords(parseFloat(lat), parseFloat(lng))
      : await getPrayerTimes(city, country);
    return NextResponse.json(times);
  } catch (err) {
    console.error("[api/prayer] error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Failed to fetch prayer times" }, { status: 500 });
  }
}
