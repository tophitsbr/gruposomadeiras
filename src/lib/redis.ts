import { Redis } from "@upstash/redis";

// Singleton Redis client for Upstash
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export default redis;
