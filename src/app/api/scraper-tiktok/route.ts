import { NextResponse } from 'next/server';

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';

// ─── Types ───
interface TiktokScraperResponse {
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
    isVideo: boolean;
  }>;
}

// ─── In-memory cache (ENABLED for performance) ───
interface CacheEntry {
  data: TiktokScraperResponse;
  timestamp: number;
}

const CACHE_TTL_MS = 3 * 60 * 1000; // 3 minutes for faster refresh
const profileCache = new Map<string, CacheEntry>();

function getCached(username: string): TiktokScraperResponse | null {
  const entry = profileCache.get(username.toLowerCase());
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    profileCache.delete(username.toLowerCase());
    return null;
  }
  return entry.data;
}

function setCache(username: string, data: TiktokScraperResponse) {
  profileCache.set(username.toLowerCase(), { data, timestamp: Date.now() });
  if (profileCache.size > 100) { // Reduced cache size for memory efficiency
    const oldest = Array.from(profileCache.entries()).sort((a, b) => a[1].timestamp - b[1].timestamp);
    for (let i = 0; i < 25; i++) profileCache.delete(oldest[i][0]);
  }
}

// ─── RapidAPI fetch ───
// Try tiktok-scraper7 instead of tiktok-scraper2
const RAPIDAPI_HOST = 'tiktok-scraper7.p.rapidapi.com';
const FETCH_TIMEOUT_MS = 6000; // Reduced from 10s to 6s for faster response

async function fetchTiktokProfile(username: string): Promise<Response> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) throw new Error('RAPIDAPI_KEY not configured');

  console.log('[scraper-tiktok] API Key présente:', apiKey ? `${apiKey.substring(0, 10)}...` : 'MANQUANTE');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  const url = `https://${RAPIDAPI_HOST}/user/info?unique_id=${encodeURIComponent(username)}`;
  console.log('[scraper-tiktok] Requête URL:', url);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': RAPIDAPI_HOST,
        'x-rapidapi-key': apiKey,
      },
      signal: controller.signal,
      cache: 'no-store',
    });
    console.log('[scraper-tiktok] Status HTTP:', res.status);
    console.log('[scraper-tiktok] Headers réponse:', Object.fromEntries(res.headers.entries()));
    return res;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchTiktokPosts(username: string): Promise<Response> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) throw new Error('RAPIDAPI_KEY not configured');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  // Use tiktok-scraper7 for videos endpoint (same as profile)
  const VIDEOS_HOST = 'tiktok-scraper7.p.rapidapi.com';

  try {
    const res = await fetch(
      `https://${VIDEOS_HOST}/user/posts?unique_id=${encodeURIComponent(username)}&count=12`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': VIDEOS_HOST,
          'x-rapidapi-key': apiKey,
        },
        signal: controller.signal,
        cache: 'no-store',
      }
    );
    console.log('[scraper-tiktok] Posts API status:', res.status);
    return res;
  } finally {
    clearTimeout(timeout);
  }
}

// ─── Map TikTok API response → TiktokScraperResponse ───
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTiktokData(profileData: any, postsData: any, cleanUsername: string): TiktokScraperResponse {
  // tiktok-scraper7 returns: { code: 0, msg: "success", data: { user: {...}, stats: {...} } }
  const dataNode = profileData?.data || profileData;
  const userNode = dataNode?.user;
  const statsNode = dataNode?.stats;

  console.log('[scraper-tiktok] Parsing - userNode présent:', !!userNode);
  console.log('[scraper-tiktok] Parsing - statsNode présent:', !!statsNode);

  if (!userNode) {
    console.error('[scraper-tiktok] Structure reçue:', Object.keys(profileData || {}));
    throw new Error("Impossible de trouver les données de l'utilisateur dans la réponse. Structure reçue: " + JSON.stringify(Object.keys(profileData || {})));
  }

  const username = userNode?.uniqueId ?? cleanUsername;
  const fullName = userNode?.nickname ?? cleanUsername;

  // Avatar: prioritize avatarMedium as specified
  const avatarUrl =
    userNode?.avatarMedium ??
    userNode?.avatarLarger ??
    userNode?.avatarThumb ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanUsername)}&background=random&size=200`;

  const followersCount = statsNode?.followerCount ?? 0;
  
  console.log('[scraper-tiktok] Parsed user:', username, 'followers:', followersCount);

  // Posts/videos from tiktok-scraper7 structure
  // tiktok-scraper7 returns: { code: 0, msg: "success", data: { videos: [...] } }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const videosData = postsData?.data?.videos || postsData?.posts || [];
  const postsArray = Array.isArray(videosData) ? videosData : [];
  console.log('[scraper-tiktok] Found', postsArray.length, 'posts');
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = postsArray.slice(0, 12).map((item: any) => {
    // tiktok-scraper7 structure: { aweme_id, video_id, title, cover, ... }
    const id = item?.aweme_id || item?.video_id || String(Math.random());
    const link = `https://www.tiktok.com/@${cleanUsername}/video/${item?.video_id || id}`;
    
    const imageUrl = item?.cover || item?.ai_dynamic_cover || item?.image || '';
    const caption = (item?.title || item?.desc || '').slice(0, 100);
    const likesCount = item?.digg_count || item?.digg || 0;
    const commentsCount = item?.comment_count || item?.comment || 0;
    const shortCode = link;

    return {
      id,
      shortCode,
      imageUrl,
      caption,
      likesCount: Number(likesCount) || 0,
      commentsCount: Number(commentsCount) || 0,
      isVideo: true,
    };
  });

  return { username, fullName, avatarUrl, followersCount, posts };
}

// ─── Main handler ───
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username || typeof username !== 'string') {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const cleanUsername = username.replace('@', '').trim().toLowerCase();

    // 1. Check cache first for instant response
    const cached = getCached(cleanUsername);
    if (cached) {
      console.log('[scraper-tiktok] Cache hit for:', cleanUsername);
      return NextResponse.json(cached);
    }

    console.log('[scraper-tiktok] Fetching fresh data for:', cleanUsername);

    try {
      // 2. Fetch profile (required)
      const profileRes = await fetchTiktokProfile(cleanUsername);
      if (!profileRes.ok) {
        const errText = await profileRes.text().catch(() => '');
        console.error(`[scraper-tiktok] Profile API ${profileRes.status}:`, errText.slice(0, 300));
        return NextResponse.json(
          { error: 'Profile not found', details: `HTTP ${profileRes.status}` },
          { status: profileRes.status === 404 ? 404 : 502 }
        );
      }
      const profileData = await profileRes.json();
      console.log('[scraper-tiktok] Full profile response:', JSON.stringify(profileData, null, 2));

      // Extract secUid and userId - tiktok-scraper7 uses data.user structure
      const dataNode = profileData?.data || profileData;
      const userNode = dataNode?.user;
      
      if (!userNode) {
        throw new Error("Impossible de trouver les données de l'utilisateur dans la réponse");
      }

      const userId = userNode?.id ?? '';
      const secUid = userNode?.secUid ?? '';

      console.log('[scraper-tiktok] Extracted userId:', userId);
      console.log('[scraper-tiktok] Extracted secUid:', secUid ? `${secUid.substring(0, 20)}...` : 'MISSING');

      // 3. Fetch posts (best effort - don't fail if posts unavailable)
      let postsData = {};
      if (userNode?.uniqueId) {
        try {
          console.log('[scraper-tiktok] Fetching posts for user...');
          const postsRes = await fetchTiktokPosts(userNode.uniqueId);
          console.log('[scraper-tiktok] Posts API status:', postsRes.status);
          
          if (postsRes.ok) {
            postsData = await postsRes.json();
            console.log('[scraper-tiktok] Posts response keys:', Object.keys(postsData));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            console.log('[scraper-tiktok] Posts array length:', (postsData as any)?.posts?.length ?? 0);
            console.log('[scraper-tiktok] Full posts response:', JSON.stringify(postsData).substring(0, 1000));
          } else {
            const errorText = await postsRes.text();
            console.warn(`[scraper-tiktok] Posts API ${postsRes.status}:`, errorText.substring(0, 200));
          }
        } catch (postsErr) {
          console.warn('[scraper-tiktok] Posts fetch failed:', postsErr);
        }
      } else {
        console.warn('[scraper-tiktok] Missing secUid or userId, skipping posts fetch');
      }

      // 4. Combine and cache
      const response = mapTiktokData(profileData, postsData, cleanUsername);
      setCache(cleanUsername, response);

      console.log('[scraper-tiktok] Returning fresh data for:', cleanUsername);

      return NextResponse.json(response);
    } catch (fetchError: unknown) {
      if (fetchError instanceof DOMException && fetchError.name === 'AbortError') {
        console.error('[scraper-tiktok] Timeout for:', cleanUsername);
        return NextResponse.json({ error: 'Request timed out' }, { status: 504 });
      }
      const msg = fetchError instanceof Error ? fetchError.message : String(fetchError);
      console.error('[scraper-tiktok] Fetch error:', msg);
      return NextResponse.json({ error: 'Failed to fetch', details: msg }, { status: 500 });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[scraper-tiktok] Outer error:', msg);
    return NextResponse.json({ error: 'Failed to fetch', details: msg }, { status: 500 });
  }
}
