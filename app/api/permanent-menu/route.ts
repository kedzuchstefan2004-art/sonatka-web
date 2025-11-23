import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';
import type { PermanentMenuItem } from '@/lib/types';

const BLOB_KEY = 'permanent-menu.json';

export async function GET() {
  try {
    const { blobs } = await list({ prefix: BLOB_KEY });
    if (blobs.length === 0) {
      throw new Error('Blob not found');
    }
    const response = await fetch(blobs[0].url);
    const data: PermanentMenuItem[] = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading permanent menu:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const data: PermanentMenuItem[] = await request.json();
    await put(BLOB_KEY, JSON.stringify(data, null, 2), {
      access: 'public',
      contentType: 'application/json',
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving permanent menu:', error);
    return NextResponse.json({ error: 'Failed to save permanent menu' }, { status: 500 });
  }
}
