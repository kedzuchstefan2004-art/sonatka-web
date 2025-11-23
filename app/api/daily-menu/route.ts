import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import type { DailyMenu } from '@/lib/types';

const defaultMenu: DailyMenu = {
  date: new Date().toISOString().split('T')[0],
  price: 7.50,
  servingTime: '11:00 - 14:00',
  items: []
};

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from('daily_menu')
      .select('*')
      .single();

    if (error) {
      console.error('Error loading daily menu from DB:', error);
      return NextResponse.json(defaultMenu);
    }

    if (!data) {
      return NextResponse.json(defaultMenu);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching daily menu:', error);
    return NextResponse.json(defaultMenu);
  }
}

export async function POST(request: Request) {
  try {
    const data: DailyMenu = await request.json();

    const { error } = await supabaseServer
      .from('daily_menu')
      .upsert([data], { onConflict: 'id' });

    if (error) {
      console.error('Error saving daily menu:', error);
      return NextResponse.json({ error: 'Failed to save daily menu' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST daily menu:', error);
    return NextResponse.json({ error: 'Failed to save daily menu' }, { status: 500 });
  }
}
