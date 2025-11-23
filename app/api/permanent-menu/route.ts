import { NextResponse } from 'next/server';
import { put, get } from '@vercel/blob';
import type { PermanentMenuItem } from '@/lib/types';

const BLOB_KEY = 'data/permanent-menu.json';

export async function GET() {
  try {
    const blob = await get(BLOB_KEY);
    if (!blob) {
      throw new Error('Blob not found');
    }
    const data: PermanentMenuItem[] = JSON.parse(await blob.text());
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
      access: 'private',
      contentType: 'application/json',
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving permanent menu:', error);
    return NextResponse.json({ error: 'Failed to save permanent menu' }, { status: 500 });
  }
}
