import { NextResponse } from "next/server";
import { getNews } from "@/lib/rss";

export async function GET() {
  try {
    const news = await getNews();
    return NextResponse.json(news);
  } catch {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
