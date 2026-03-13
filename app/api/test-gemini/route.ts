import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function GET() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ status: "error", message: "GROQ_API_KEY not set" }, { status: 500 });
  }

  try {
    const groq = new Groq({ apiKey });
    const chat = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: "Say exactly: Groq is working" }],
      max_tokens: 10,
    });
    const text = chat.choices[0]?.message?.content?.trim();
    return NextResponse.json({ status: "ok", response: text });
  } catch (err) {
    return NextResponse.json({
      status: "error",
      message: err instanceof Error ? err.message : String(err),
    }, { status: 500 });
  }
}
