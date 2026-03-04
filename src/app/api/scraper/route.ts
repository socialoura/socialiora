import { NextResponse } from 'next/server';

// ─── In-memory cache (2-hour TTL) ───
interface CacheEntry {
  data: ScraperResponse;
  timestamp: number;
}

interface ScraperResponse {
  username: string;
  fullName: string;
  avatarUrl: string;
  followersCount: number;
  posts: Array<{
    id: string;
    shortCode: string;
    imageUrl: string;
    caption: string;
    likesCount: number;
    commentsCount: number;
  }>;
}

const CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours
const profileCache = new Map<string, CacheEntry>();

function getCached(username: string): ScraperResponse | null {
  const entry = profileCache.get(username.toLowerCase());
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    profileCache.delete(username.toLowerCase());
    return null;
  }
  return entry.data;
}

function setCache(username: string, data: ScraperResponse) {
  profileCache.set(username.toLowerCase(), { data, timestamp: Date.now() });
  // Evict old entries if cache grows too large (max 200)
  if (profileCache.size > 200) {
    const oldest = Array.from(profileCache.entries()).sort((a, b) => a[1].timestamp - b[1].timestamp);
    for (let i = 0; i < 50; i++) profileCache.delete(oldest[i][0]);
  }
}

// ─── Image encoding ───
async function fetchAndEncodeImage(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const base64 = buffer.toString('base64');
    return `data:${contentType};base64,${base64}`;
  } catch {
    return `https://ui-avatars.com/api/?name=User&background=random&size=200`;
  }
}

// ─── Main handler ───
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username || typeof username !== 'string') {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const cleanUsername = username.replace('@', '').trim();

    // ── Check cache first ──
    const cached = getCached(cleanUsername);
    if (cached) {
      console.log('[scraper] Cache HIT for:', cleanUsername);
      return NextResponse.json(cached);
    }
    console.log('[scraper] Cache MISS for:', cleanUsername);

    const apiToken = process.env.APIFY_API_TOKEN;
    if (!apiToken) {
      return NextResponse.json(
        { error: 'API configuration error - APIFY_API_TOKEN missing' },
        { status: 500 }
      );
    }

    try {
      const apifyUrl = `https://api.apify.com/v2/acts/apify~instagram-profile-scraper/run-sync-get-dataset-items?token=${apiToken}`;
      
      const apifyResponse = await fetch(apifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usernames: [cleanUsername],
          resultsLimit: 12,
        }),
      });

      if (!apifyResponse.ok) {
        const errorText = await apifyResponse.text();
        throw new Error(`Apify API returned ${apifyResponse.status}: ${errorText}`);
      }

      const data = await apifyResponse.json();

      if (!Array.isArray(data) || data.length === 0) {
        return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
      }

      const profile = data[0] as Record<string, unknown>;
      const latestPostsRaw = profile.latestPosts as Array<Record<string, unknown>> | undefined;

      // Extract posts (max 12)
      const latestPosts = (latestPostsRaw || []).slice(0, 12).map((post, index) => ({
        id: (post.id as string) || String(index),
        shortCode: (post.shortCode as string) || '',
        imageUrl: (post.displayUrl as string) || (post.videoUrl as string) || (post.url as string) || '',
        caption: ((post.caption as string) || '').slice(0, 100),
        likesCount: (post.likesCount as number) || 0,
        commentsCount: (post.commentsCount as number) || 0,
      }));

      const avatarUrl = (profile.profilePicUrlHD as string) || (profile.profilePicUrl as string) || '';

      // Encode all images to Base64 in parallel
      const [avatarBase64, ...postsBase64] = await Promise.all([
        fetchAndEncodeImage(avatarUrl),
        ...latestPosts.map(post => fetchAndEncodeImage(post.imageUrl))
      ]);

      const postsWithBase64 = latestPosts.map((post, index) => ({
        ...post,
        imageUrl: postsBase64[index],
      }));

      const response: ScraperResponse = {
        username: (profile.username as string) || cleanUsername,
        fullName: (profile.fullName as string) || cleanUsername,
        avatarUrl: avatarBase64,
        followersCount: (profile.followersCount as number) || 0,
        posts: postsWithBase64,
      };

      // ── Store in cache ──
      setCache(cleanUsername, response);
      console.log('[scraper] Cached result for:', cleanUsername);
      
      return NextResponse.json(response);
    } catch (apifyError: unknown) {
      console.error('[scraper] Apify error:', apifyError instanceof Error ? apifyError.message : String(apifyError));
      const errorDetails = apifyError instanceof Error ? apifyError.message : String(apifyError);
      return NextResponse.json({ error: 'Failed to fetch', details: errorDetails }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error('[scraper] Outer error:', error instanceof Error ? error.message : String(error));
    const errorDetails = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: 'Failed to fetch', details: errorDetails }, { status: 500 });
  }
}
