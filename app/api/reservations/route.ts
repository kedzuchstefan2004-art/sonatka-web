import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Reservation } from '@/lib/types';

const dataPath = path.join(process.cwd(), 'data', 'reservations.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataPath, 'utf8');
    const data: Reservation[] = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading reservations:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // If it's an array, it's an update from admin
    if (Array.isArray(body)) {
      await fs.writeFile(dataPath, JSON.stringify(body, null, 2), 'utf8');
      return NextResponse.json({ success: true });
    }
    
    // Otherwise, it's a new reservation
    const fileContents = await fs.readFile(dataPath, 'utf8');
    const reservations: Reservation[] = JSON.parse(fileContents);
    
    const newReservation: Reservation = {
      ...body,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    reservations.push(newReservation);
    await fs.writeFile(dataPath, JSON.stringify(reservations, null, 2), 'utf8');
    
    // Here you would send email notification
    // For now, we'll just log it
    console.log('New reservation:', newReservation);
    
    return NextResponse.json({ success: true, reservation: newReservation });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save reservation' }, { status: 500 });
  }
}
