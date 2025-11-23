import { supabaseServer } from '../lib/supabase';

async function initializeDatabase() {
  try {
    console.log('Initializing database tables...');

    // Create daily_menu table
    await supabaseServer.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS daily_menu (
          id TEXT PRIMARY KEY DEFAULT 'daily',
          date TEXT,
          price DECIMAL,
          servingTime TEXT,
          items JSONB
        );
      `
    }).catch(() => {
      // Table might already exist
      console.log('daily_menu table already exists or created');
    });

    // Create permanent_menu table
    await supabaseServer.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS permanent_menu (
          id TEXT PRIMARY KEY,
          name TEXT,
          price DECIMAL,
          allergens TEXT[],
          category TEXT
        );
      `
    }).catch(() => {
      console.log('permanent_menu table already exists or created');
    });

    // Create announcements table
    await supabaseServer.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS announcements (
          id TEXT PRIMARY KEY,
          title TEXT,
          message TEXT,
          active BOOLEAN,
          createdAt TEXT
        );
      `
    }).catch(() => {
      console.log('announcements table already exists or created');
    });

    // Create reservations table
    await supabaseServer.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS reservations (
          id TEXT PRIMARY KEY,
          name TEXT,
          email TEXT,
          phone TEXT,
          date TEXT,
          timeFrom TEXT,
          timeTo TEXT,
          numberOfPeople INTEGER,
          occasion TEXT,
          message TEXT,
          status TEXT,
          createdAt TEXT
        );
      `
    }).catch(() => {
      console.log('reservations table already exists or created');
    });

    console.log('✅ Database initialization complete!');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
