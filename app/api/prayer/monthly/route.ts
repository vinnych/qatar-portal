import { NextRequest, NextResponse } from "next/server";
import { getMonthlyPrayerTimes } from "@/lib/prayer";

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get("city") || "Doha";
  const country = req.nextUrl.searchParams.get("country") || "Qatar";
  const now = new Date();
  const year = parseInt(req.nextUrl.searchParams.get("year") || String(now.getFullYear()));
  const month = parseInt(req.nextUrl.searchParams.get("month") || String(now.getMonth() + 1));
  if (isNaN(year) || isNaN(month) || year < 1900 || year > 2100 || month < 1 || month > 12) {
    return NextResponse.json({ error: "Invalid year or month" }, { status: 400 });
  }
  try {
    const calendar = await getMonthlyPrayerTimes(year, month, city, country);
    return NextResponse.json(calendar);
  } catch {
    return NextResponse.json({ error: "Failed to fetch monthly prayer times" }, { status: 500 });
  }
}
