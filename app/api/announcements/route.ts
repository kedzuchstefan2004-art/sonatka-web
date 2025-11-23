import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import type { Announcement } from '@/lib/types';

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from('announcements')
      .select('*')
      .eq('active', true);

    if (error) {
      console.error('Error loading announcements from DB:', error);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const data: Announcement[] = await request.json();

    const { error } = await supabaseServer
      .from('announcements')
      .delete()
      .neq('id', '');

    if (!error) {
      await supabaseServer
        .from('announcements')
        .insert(data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving announcements:', error);
    return NextResponse.json({ error: 'Failed to save announcements' }, { status: 500 });
  }
}
