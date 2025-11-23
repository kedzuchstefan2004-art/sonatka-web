import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { DailyMenu } from '@/lib/types';

const dataPath = path.join(process.cwd(), 'data', 'daily-menu.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataPath, 'utf8');
    const data: DailyMenu = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading daily menu:', error);
    // Return default menu if file not found
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
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save daily menu' }, { status: 500 });
  }
}
