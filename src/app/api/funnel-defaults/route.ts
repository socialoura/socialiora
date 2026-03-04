import { NextResponse } from 'next/server';
import { getFunnelDefaults, initDatabase } from '@/lib/db';

// Initialize database on module load
initDatabase().catch(console.error);

// Default tier indices (0 = no selection, 1+ = tier index)
const DEFAULT_FUNNEL_DEFAULTS = {
  followers: 1,
  likes: 1,
  views: 0,
  'story-views': 0,
};

// Public GET - no auth required (frontend fetches this)
export async function GET() {
  try {
    const isDBConfigured = !!(process.env.DB_HOST || process.env.DATABASE_URL);

    if (isDBConfigured) {
      try {
        const data = await getFunnelDefaults();
        if (data) {
          return NextResponse.json(data);
        }
      } catch (error) {
        console.error('DB error fetching funnel defaults:', error);
      }
    }

    // Fallback to defaults
    return NextResponse.json(DEFAULT_FUNNEL_DEFAULTS);
  } catch (error) {
    console.error('Error in funnel-defaults GET:', error);
    return NextResponse.json(DEFAULT_FUNNEL_DEFAULTS);
  }
}
