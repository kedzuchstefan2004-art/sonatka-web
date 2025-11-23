import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Announcement } from '@/lib/types';

const dataPath = path.join(process.cwd(), 'data', 'announcements.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataPath, 'utf8');
    const data: Announcement[] = JSON.parse(fileContents);
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
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save announcements' }, { status: 500 });
  }
}
