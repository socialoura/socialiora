import { NextRequest, NextResponse } from 'next/server';
import { ApifyClient } from 'apify-client';

const MOCK_POSTS = [
  { id: '1', shortCode: 'abc1', imageUrl: 'https://picsum.photos/seed/ig1/400/400', caption: 'Post 1', likesCount: 234, commentsCount: 12 },
  { id: '2', shortCode: 'abc2', imageUrl: 'https://picsum.photos/seed/ig2/400/400', caption: 'Post 2', likesCount: 567, commentsCount: 34 },
  { id: '3', shortCode: 'abc3', imageUrl: 'https://picsum.photos/seed/ig3/400/400', caption: 'Post 3', likesCount: 890, commentsCount: 56 },
  { id: '4', shortCode: 'abc4', imageUrl: 'https://picsum.photos/seed/ig4/400/400', caption: 'Post 4', likesCount: 123, commentsCount: 8 },
  { id: '5', shortCode: 'abc5', imageUrl: 'https://picsum.photos/seed/ig5/400/400', caption: 'Post 5', likesCount: 456, commentsCount: 23 },
  { id: '6', shortCode: 'abc6', imageUrl: 'https://picsum.photos/seed/ig6/400/400', caption: 'Post 6', likesCount: 789, commentsCount: 45 },
  { id: '7', shortCode: 'abc7', imageUrl: 'https://picsum.photos/seed/ig7/400/400', caption: 'Post 7', likesCount: 321, commentsCount: 19 },
  { id: '8', shortCode: 'abc8', imageUrl: 'https://picsum.photos/seed/ig8/400/400', caption: 'Post 8', likesCount: 654, commentsCount: 37 },
  { id: '9', shortCode: 'abc9', imageUrl: 'https://picsum.photos/seed/ig9/400/400', caption: 'Post 9', likesCount: 987, commentsCount: 61 },
  { id: '10', shortCode: 'abc10', imageUrl: 'https://picsum.photos/seed/ig10/400/400', caption: 'Post 10', likesCount: 210, commentsCount: 15 },
  { id: '11', shortCode: 'abc11', imageUrl: 'https://picsum.photos/seed/ig11/400/400', caption: 'Post 11', likesCount: 543, commentsCount: 29 },
  { id: '12', shortCode: 'abc12', imageUrl: 'https://picsum.photos/seed/ig12/400/400', caption: 'Post 12', likesCount: 876, commentsCount: 52 },
];

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    if (!username || typeof username !== 'string') {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const cleanUsername = username.replace('@', '').trim();

    const apiToken = process.env.APIFY_API_TOKEN;

    // If no API token, return mock data for development
    if (!apiToken) {
      console.log('[scraper] No APIFY_API_TOKEN found, returning mock data');
      return NextResponse.json({
        username: cleanUsername,
        fullName: cleanUsername,
        avatarUrl: `https://ui-avatars.com/api/?name=${cleanUsername}&background=random&size=200`,
        followersCount: 12500,
        posts: MOCK_POSTS,
      });
    }

    const client = new ApifyClient({ token: apiToken });

    // Run the Instagram Profile Scraper
    const run = await client.actor('apify/instagram-profile-scraper').call({
      usernames: [cleanUsername],
      resultsLimit: 12,
    });

    // Fetch results from the dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const profile = items[0] as Record<string, unknown>;

    // Extract posts from the profile data
    const latestPosts = ((profile.latestPosts as Array<Record<string, unknown>>) || []).slice(0, 12).map((post, index) => ({
      id: (post.id as string) || String(index),
      shortCode: (post.shortCode as string) || '',
      imageUrl: (post.displayUrl as string) || (post.url as string) || '',
      caption: ((post.caption as string) || '').slice(0, 100),
      likesCount: (post.likesCount as number) || 0,
      commentsCount: (post.commentsCount as number) || 0,
    }));

    return NextResponse.json({
      username: (profile.username as string) || cleanUsername,
      fullName: (profile.fullName as string) || cleanUsername,
      avatarUrl: (profile.profilePicUrl as string) || (profile.profilePicUrlHD as string) || '',
      followersCount: (profile.followersCount as number) || 0,
      posts: latestPosts.length > 0 ? latestPosts : MOCK_POSTS,
    });
  } catch (error) {
    console.error('[scraper] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Instagram profile' },
      { status: 500 }
    );
  }
}
