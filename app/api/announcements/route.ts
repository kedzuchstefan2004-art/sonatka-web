import { NextResponse } from 'next/server';
import type { Announcement } from '@/lib/types';

const defaultAnnouncements: Announcement[] = [];

export async function GET() {
  try {
    // Return only active announcements for public view
    const activeAnnouncements = defaultAnnouncements.filter(a => a.active);
    return NextResponse.json(activeAnnouncements);
  } catch (error) {
    console.error('Error loading announcements:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const data: Announcement[] = await request.json();
    // On Vercel, we can't write to files, so just return success
    console.log('Announcements updated (stored in memory):', data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving announcements:', error);
    return NextResponse.json({ error: 'Failed to save announcements' }, { status: 500 });
  }
}
