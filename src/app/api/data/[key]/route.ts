import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";

// Keys that are allowed to be read/written via this API
const ALLOWED_KEYS = [
  "somadeiras_sellers",
  "somadeiras_products",
  "somadeiras_leads",
  "somadeiras_tiles",
  "somadeiras_categories",
  "somadeiras_blog_posts",
  "somadeiras_settings",
  "somadeiras_flash_deals",
  "somadeiras_banner_slides",
  "somadeiras_menu_items",
  "somadeiras_coupons",
  "somadeiras_banner_zones",
  "somadeiras_active_popup",
  "somadeiras_heatmap",
  "somadeiras_clicks_heatmap",
  "somadeiras_forro_products",
  "somadeiras_next_seller_index",
];

// GET /api/data/[key] - Read data from Redis
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;

    if (!ALLOWED_KEYS.includes(key)) {
      return NextResponse.json({ error: "Key not allowed" }, { status: 403 });
    }

    const data = await redis.get(key);
    return NextResponse.json({ data: data ?? null });
  } catch (error) {
    console.error("[KV GET] Error:", error);
    return NextResponse.json({ data: null, error: "Redis error" }, { status: 500 });
  }
}

// POST /api/data/[key] - Write data to Redis
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;

    if (!ALLOWED_KEYS.includes(key)) {
      return NextResponse.json({ error: "Key not allowed" }, { status: 403 });
    }

    const body = await request.json();
    await redis.set(key, JSON.stringify(body.data));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[KV POST] Error:", error);
    return NextResponse.json({ success: false, error: "Redis error" }, { status: 500 });
  }
}

// GET /api/data/bulk - Read all keys at once
export async function PUT(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    
    if (key === "_bulk") {
      // Fetch all allowed keys in parallel
      const results: Record<string, unknown> = {};
      const pipeline = redis.pipeline();
      
      for (const k of ALLOWED_KEYS) {
        pipeline.get(k);
      }
      
      const values = await pipeline.exec();
      
      ALLOWED_KEYS.forEach((k, i) => {
        const val = values[i];
        if (val !== null && val !== undefined) {
          results[k] = typeof val === "string" ? JSON.parse(val) : val;
        }
      });
      
      return NextResponse.json({ data: results });
    }
    
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    console.error("[KV BULK] Error:", error);
    return NextResponse.json({ data: {}, error: "Redis error" }, { status: 500 });
  }
}
