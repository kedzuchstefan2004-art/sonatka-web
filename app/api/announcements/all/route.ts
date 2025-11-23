import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import type { Announcement } from '@/lib/types';

// This endpoint returns ALL announcements (for admin panel)
export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from('announcements')
      .select('*');

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
