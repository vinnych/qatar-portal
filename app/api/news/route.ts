import { NextResponse } from "next/server";
import { getNews } from "@/lib/rss";

export async function GET() {
  try {
    const news = await getNews();
    return NextResponse.json(news);
  } catch (err) {
    console.error("[api/news] error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
