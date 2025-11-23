import { NextResponse } from 'next/server';
import { put, get } from '@vercel/blob';
import type { Announcement } from '@/lib/types';

const BLOB_KEY = 'data/announcements.json';

export async function GET() {
  try {
    const blob = await get(BLOB_KEY);
    if (!blob) {
      throw new Error('Blob not found');
    }
    const data: Announcement[] = JSON.parse(await blob.text());
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
      access: 'private',
      contentType: 'application/json',
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving announcements:', error);
    return NextResponse.json({ error: 'Failed to save announcements' }, { status: 500 });
  }
}
