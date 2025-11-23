import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { PermanentMenuItem } from '@/lib/types';

const dataPath = path.join(process.cwd(), 'data', 'permanent-menu.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataPath, 'utf8');
    const data: PermanentMenuItem[] = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading permanent menu:', error);
    // Return empty array if file not found
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const data: PermanentMenuItem[] = await request.json();
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save permanent menu' }, { status: 500 });
  }
}
