import { NextResponse } from 'next/server';
import { put, get } from '@vercel/blob';
import type { DailyMenu } from '@/lib/types';

const BLOB_KEY = 'data/daily-menu.json';

export async function GET() {
  try {
    const blob = await get(BLOB_KEY);
    if (!blob) {
      throw new Error('Blob not found');
    }
    const data: DailyMenu = JSON.parse(await blob.text());
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
      access: 'private',
      contentType: 'application/json',
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving daily menu:', error);
    return NextResponse.json({ error: 'Failed to save daily menu' }, { status: 500 });
  }
}
