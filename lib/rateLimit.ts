import { redis } from "@/lib/redis";

/**
 * Simple Redis-based rate limiter (sliding window per minute).
 * Returns true if the request is allowed, false if rate limit exceeded.
 * Gracefully allows all requests if Redis is unavailable (local dev / Redis down).
 */
export async function checkRateLimit(
  ip: string,
  limit = 30
): Promise<boolean> {
  if (!redis) return true; // no Redis → allow all (local dev)

  const minute = Math.floor(Date.now() / 60000);
  const key = `ratelimit:${ip}:${minute}`;

  try {
    const count = await redis.incr(key);
    if (count === 1) {
      // First request in this window — set TTL of 90s (generous buffer)
      await redis.expire(key, 90);
    }
    return count <= limit;
  } catch {
    return true; // Redis error → allow request
  }
}

/**
 * Extract the real client IP from Next.js request headers.
 */
export function getClientIp(request: Request): string {
  // Prefer single-IP headers set by Vercel/Cloudflare (cannot be spoofed by client)
  const realIp = request.headers.get("x-real-ip") || request.headers.get("cf-connecting-ip");
  if (realIp) return realIp.trim();
  // x-forwarded-for: client, proxy1, proxy2 — take the first (original client IP)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ips = forwarded.split(",").map((ip) => ip.trim()).filter(Boolean);
    return ips[0] ?? "unknown";
  }
  return "unknown";
}
