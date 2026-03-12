import { Redis } from "@upstash/redis";

// Returns null if env vars are not set (local dev without Redis)
function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return Redis.fromEnv();
}

export const redis = getRedis();

export const KV_TTL = 60 * 60 * 24 * 7; // 7 days in seconds
