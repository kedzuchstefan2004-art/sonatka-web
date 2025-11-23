import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';
import type { Announcement } from '@/lib/types';

const BLOB_KEY = 'announcements.json';

export async function GET() {
  try {
    const { blobs } = await list({ prefix: BLOB_KEY });
    if (blobs.length === 0) {
      throw new Error('Blob not found');
    }
    const response = await fetch(blobs[0].url);
    const data: Announcement[] = await response.json();
    // Return only active announcements for public view
    const activeAnnouncements = data.filter(a => a.active);
    return NextResponse.json(activeAnnouncements);
  } catch (error) {
    console.error('Error loading announcements:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const data: Announcement[] = await request.json();
    await put(BLOB_KEY, JSON.stringify(data, null, 2), {
      access: 'public',
      contentType: 'application/json',
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving announcements:', error);
    return NextResponse.json({ error: 'Failed to save announcements' }, { status: 500 });
  }
}
