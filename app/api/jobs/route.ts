import { NextResponse } from "next/server";
import { getJobs } from "@/lib/jobs";

export async function GET() {
  try {
    const jobs = await getJobs();
    return NextResponse.json(jobs);
  } catch (err) {
    console.error("[api/jobs] error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}
