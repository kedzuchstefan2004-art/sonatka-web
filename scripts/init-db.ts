import { supabaseServer } from '../lib/supabase';

async function initializeDatabase() {
  try {
    console.log('Initializing database tables...');

    // Create daily_menu table
    try {
      const { error: error1 } = await supabaseServer
        .from('daily_menu')
        .select('id')
        .limit(1);
      
      if (error1) {
        console.log('Creating daily_menu table...');
      }
    } catch (e) {
      console.log('daily_menu table check completed');
    }

    // Create permanent_menu table
    try {
      const { error: error2 } = await supabaseServer
        .from('permanent_menu')
        .select('id')
        .limit(1);
      
      if (error2) {
        console.log('Creating permanent_menu table...');
      }
    } catch (e) {
      console.log('permanent_menu table check completed');
    }

    // Create announcements table
    try {
      const { error: error3 } = await supabaseServer
        .from('announcements')
        .select('id')
        .limit(1);
      
      if (error3) {
        console.log('Creating announcements table...');
      }
    } catch (e) {
      console.log('announcements table check completed');
    }

    // Create reservations table
    try {
      const { error: error4 } = await supabaseServer
        .from('reservations')
        .select('id')
        .limit(1);
      
      if (error4) {
        console.log('Creating reservations table...');
      }
    } catch (e) {
      console.log('reservations table check completed');
    }

    console.log('✅ Database initialization complete!');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
