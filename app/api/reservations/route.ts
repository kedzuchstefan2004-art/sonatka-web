import { NextResponse } from 'next/server';
import type { Reservation } from '@/lib/types';

let reservations: Reservation[] = [];

export async function GET() {
  try {
    return NextResponse.json(reservations);
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
      reservations = body;
      console.log('Reservations updated (stored in memory):', body);
      return NextResponse.json({ success: true });
    }
    
    // Otherwise, it's a new reservation
    const newReservation: Reservation = {
      ...body,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    reservations.push(newReservation);
    console.log('New reservation:', newReservation);
    
    return NextResponse.json({ success: true, reservation: newReservation });
  } catch (error) {
    console.error('Error saving reservation:', error);
    return NextResponse.json({ error: 'Failed to save reservation' }, { status: 500 });
  }
}
