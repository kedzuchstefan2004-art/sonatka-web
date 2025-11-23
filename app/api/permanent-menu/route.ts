import { NextResponse } from 'next/server';
import type { PermanentMenuItem } from '@/lib/types';

const defaultMenu: PermanentMenuItem[] = [];

export async function GET() {
  try {
    return NextResponse.json(defaultMenu);
  } catch (error) {
    console.error('Error loading permanent menu:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const data: PermanentMenuItem[] = await request.json();
    // On Vercel, we can't write to files, so just return success
    console.log('Permanent menu updated (stored in memory):', data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving permanent menu:', error);
    return NextResponse.json({ error: 'Failed to save permanent menu' }, { status: 500 });
  }
}
