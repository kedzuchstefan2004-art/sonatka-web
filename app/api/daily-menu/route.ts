import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';
import type { DailyMenu } from '@/lib/types';

const BLOB_KEY = 'daily-menu.json';

export async function GET() {
  try {
    const { blobs } = await list({ prefix: BLOB_KEY });
    if (blobs.length === 0) {
      throw new Error('Blob not found');
    }
    const response = await fetch(blobs[0].url);
    const data: DailyMenu = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading daily menu:', error);
    // Return default menu if blob not found
    const defaultMenu: DailyMenu = {
      date: new Date().toISOString().split('T')[0],
      price: 7.50,
      servingTime: '11:00 - 14:00',
      items: []
    };
    return NextResponse.json(defaultMenu);
  }
}

export async function POST(request: Request) {
  try {
    const data: DailyMenu = await request.json();
    await put(BLOB_KEY, JSON.stringify(data, null, 2), {
      access: 'public',
      contentType: 'application/json',
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving daily menu:', error);
    return NextResponse.json({ error: 'Failed to save daily menu' }, { status: 500 });
  }
}
