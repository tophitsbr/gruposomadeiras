/**
 * Data Service — Centralizes all data persistence.
 * 
 * Strategy:
 * 1. On page load → fetch from Redis API (server), fall back to localStorage (cache)
 * 2. On data change → save to Redis API AND localStorage simultaneously
 * 3. localStorage acts as instant cache so the UI never waits for the server
 */

// Keys that should be synced to Redis (business-critical data)
const SYNCED_KEYS = [
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
  "somadeiras_registered_clients",
];

/**
 * Save data to both Redis (via API) and localStorage.
 * localStorage is updated immediately for instant UI response.
 * Redis is updated in the background (fire-and-forget).
 */
export function saveData(key: string, data: unknown): void {
  // 1. Always save to localStorage immediately (instant cache)
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn("[DataService] localStorage write failed:", e);
  }

  // 2. If this is a synced key, also save to Redis via API (background)
  if (SYNCED_KEYS.includes(key)) {
    fetch(`/api/data/${encodeURIComponent(key)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    }).catch((err) => {
      console.warn("[DataService] Redis write failed (will retry on next save):", err);
    });
  }
}

/**
 * Load data from Redis first (source of truth), fall back to localStorage.
 * Returns parsed data or null.
 */
export async function loadData<T = unknown>(key: string): Promise<T | null> {
  // If this is a synced key, try Redis API first
  if (SYNCED_KEYS.includes(key)) {
    try {
      const res = await fetch(`/api/data/${encodeURIComponent(key)}`, {
        method: "GET",
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data !== null && json.data !== undefined) {
          // Parse if it's a JSON string from Redis
          const parsed = typeof json.data === "string" ? JSON.parse(json.data) : json.data;
          // Update localStorage cache with server data
          try {
            localStorage.setItem(key, JSON.stringify(parsed));
          } catch (e) { /* ignore */ }
          return parsed as T;
        }
      }
    } catch (err) {
      console.warn("[DataService] Redis read failed, falling back to localStorage:", err);
    }
  }

  // Fallback to localStorage
  try {
    const local = localStorage.getItem(key);
    if (local) {
      return JSON.parse(local) as T;
    }
  } catch (e) {
    console.warn("[DataService] localStorage read failed:", e);
  }

  return null;
}

/**
 * Load ALL synced data from Redis in one bulk request.
 * Much faster than individual requests on initial page load.
 * Falls back to localStorage for any keys not found in Redis.
 */
export async function loadAllData(): Promise<Record<string, unknown>> {
  const results: Record<string, unknown> = {};

  // Try bulk fetch from Redis
  try {
    const res = await fetch(`/api/data/_bulk`, {
      method: "PUT",
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data) {
        for (const [key, value] of Object.entries(json.data)) {
          if (value !== null && value !== undefined) {
            results[key] = value;
            // Update localStorage cache
            try {
              localStorage.setItem(key, JSON.stringify(value));
            } catch (e) { /* ignore */ }
          }
        }
      }
    }
  } catch (err) {
    console.warn("[DataService] Bulk Redis read failed, using localStorage:", err);
  }

  // Fill in any missing keys from localStorage
  for (const key of SYNCED_KEYS) {
    if (!(key in results)) {
      try {
        const local = localStorage.getItem(key);
        if (local) {
          results[key] = JSON.parse(local);
        }
      } catch (e) { /* ignore */ }
    }
  }

  return results;
}

/**
 * Migrate existing localStorage data to Redis.
 * Call this once to push any existing local data to the server.
 * Only uploads keys that exist in localStorage but not in Redis.
 */
export async function migrateLocalToRedis(): Promise<void> {
  for (const key of SYNCED_KEYS) {
    try {
      const local = localStorage.getItem(key);
      if (local) {
        const data = JSON.parse(local);
        // Check if Redis already has data for this key
        const res = await fetch(`/api/data/${encodeURIComponent(key)}`, {
          method: "GET",
          cache: "no-store",
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data === null || json.data === undefined) {
            // Redis is empty for this key, upload from localStorage
            await fetch(`/api/data/${encodeURIComponent(key)}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ data }),
            });
            console.log(`[DataService] Migrated ${key} to Redis`);
          }
        }
      }
    } catch (e) {
      console.warn(`[DataService] Failed to migrate ${key}:`, e);
    }
  }
}
