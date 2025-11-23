import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Announcement } from '@/lib/types';

const dataPath = path.join(process.cwd(), 'data', 'announcements.json');

// This endpoint returns ALL announcements (for admin panel)
export async function GET() {
  try {
    const fileContents = await fs.readFile(dataPath, 'utf8');
    const data: Announcement[] = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading announcements:', error);
    // Return empty array if file not found
    return NextResponse.json([]);
  }
}
