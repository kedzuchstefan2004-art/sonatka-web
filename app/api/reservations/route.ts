import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import type { Reservation } from '@/lib/types';

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from('reservations')
      .select('*');

    if (error) {
      console.error('Error loading reservations from DB:', error);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // If it's an array, it's an update from admin
    if (Array.isArray(body)) {
      const { error } = await supabaseServer
        .from('reservations')
        .delete()
        .neq('id', '');

      if (!error) {
        await supabaseServer
          .from('reservations')
          .insert(body);
      }

      return NextResponse.json({ success: true });
    }
    
    // Otherwise, it's a new reservation
    const newReservation: Reservation = {
      ...body,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    const { error } = await supabaseServer
      .from('reservations')
      .insert([newReservation]);

    if (error) {
      console.error('Error saving reservation:', error);
      return NextResponse.json({ error: 'Failed to save reservation' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, reservation: newReservation });
  } catch (error) {
    console.error('Error saving reservation:', error);
    return NextResponse.json({ error: 'Failed to save reservation' }, { status: 500 });
  }
}
