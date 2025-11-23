import { NextResponse } from 'next/server';
import { put, get } from '@vercel/blob';
import type { Reservation } from '@/lib/types';

const BLOB_KEY = 'data/reservations.json';

export async function GET() {
  try {
    const blob = await get(BLOB_KEY);
    if (!blob) {
      throw new Error('Blob not found');
    }
    const data: Reservation[] = JSON.parse(await blob.text());
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
      await put(BLOB_KEY, JSON.stringify(body, null, 2), {
        access: 'private',
        contentType: 'application/json',
      });
      return NextResponse.json({ success: true });
    }
    
    // Otherwise, it's a new reservation
    const blob = await get(BLOB_KEY);
    let reservations: Reservation[] = [];
    if (blob) {
      reservations = JSON.parse(await blob.text());
    }
    
    const newReservation: Reservation = {
      ...body,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    reservations.push(newReservation);
    await put(BLOB_KEY, JSON.stringify(reservations, null, 2), {
      access: 'private',
      contentType: 'application/json',
    });
    
    console.log('New reservation:', newReservation);
    
    return NextResponse.json({ success: true, reservation: newReservation });
  } catch (error) {
    console.error('Error saving reservation:', error);
    return NextResponse.json({ error: 'Failed to save reservation' }, { status: 500 });
  }
}
