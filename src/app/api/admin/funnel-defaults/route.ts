import { NextRequest, NextResponse } from 'next/server';
import { getFunnelDefaults, setFunnelDefaults, initDatabase } from '@/lib/db';

// Initialize database on module load
initDatabase().catch(console.error);

// Default tier indices (0 = no selection, 1+ = tier index)
const DEFAULT_FUNNEL_DEFAULTS = {
  followers: 1,
  likes: 1,
  views: 0,
  'story-views': 0,
};

const isDBConfigured = () => {
  return !!(process.env.DB_HOST || process.env.DATABASE_URL);
};

// In-memory fallback for development
let memoryStore: Record<string, number> | null = null;

function verifyToken(token: string | null): boolean {
  if (!token) return false;
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    if (decoded.exp && decoded.exp > Date.now()) {
      return decoded.role === 'admin';
    }
    return false;
  } catch {
    return false;
  }
}

// Admin GET
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '') || null;
    if (!verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (isDBConfigured()) {
      try {
        const data = await getFunnelDefaults();
        if (data) return NextResponse.json(data);
      } catch (error) {
        console.error('DB error:', error);
        if (memoryStore) return NextResponse.json(memoryStore);
      }
    } else if (memoryStore) {
      return NextResponse.json(memoryStore);
    }

    return NextResponse.json(DEFAULT_FUNNEL_DEFAULTS);
  } catch (error) {
    console.error('Error in admin funnel-defaults GET:', error);
    return NextResponse.json(DEFAULT_FUNNEL_DEFAULTS);
  }
}

// Admin PUT
export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '') || null;
    if (!verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    if (isDBConfigured()) {
      try {
        await setFunnelDefaults(body);
      } catch (error) {
        console.error('DB error, using memory:', error);
        memoryStore = body;
      }
    } else {
      memoryStore = body;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in admin funnel-defaults PUT:', error);
    return NextResponse.json({ error: 'Failed to save funnel defaults' }, { status: 500 });
  }
}
