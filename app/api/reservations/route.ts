import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';
import type { Reservation } from '@/lib/types';

const BLOB_KEY = 'reservations.json';

export async function GET() {
  try {
    const { blobs } = await list({ prefix: BLOB_KEY });
    if (blobs.length === 0) {
      throw new Error('Blob not found');
    }
    const response = await fetch(blobs[0].url);
    const data: Reservation[] = await response.json();
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
        access: 'public',
        contentType: 'application/json',
      });
      return NextResponse.json({ success: true });
    }
    
    // Otherwise, it's a new reservation
    let reservations: Reservation[] = [];
    try {
      const { blobs } = await list({ prefix: BLOB_KEY });
      if (blobs.length > 0) {
        const response = await fetch(blobs[0].url);
        reservations = await response.json();
      }
    } catch (e) {
      console.error('Error reading existing reservations:', e);
    }
    
    const newReservation: Reservation = {
      ...body,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    reservations.push(newReservation);
    await put(BLOB_KEY, JSON.stringify(reservations, null, 2), {
      access: 'public',
      contentType: 'application/json',
    });
    
    console.log('New reservation:', newReservation);
    
    return NextResponse.json({ success: true, reservation: newReservation });
  } catch (error) {
    console.error('Error saving reservation:', error);
    return NextResponse.json({ error: 'Failed to save reservation' }, { status: 500 });
  }
}
