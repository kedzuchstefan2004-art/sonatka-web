import { put } from '@vercel/blob';
import * as fs from 'fs';
import * as path from 'path';

async function initializeBlob() {
  try {
    // Read local data files
    const dailyMenuPath = path.join(process.cwd(), 'data', 'daily-menu.json');
    const permanentMenuPath = path.join(process.cwd(), 'data', 'permanent-menu.json');
    const announcementsPath = path.join(process.cwd(), 'data', 'announcements.json');
    const reservationsPath = path.join(process.cwd(), 'data', 'reservations.json');

    // Upload daily menu
    if (fs.existsSync(dailyMenuPath)) {
      const dailyMenuData = fs.readFileSync(dailyMenuPath, 'utf-8');
      await put('daily-menu.json', dailyMenuData, {
        access: 'public',
        contentType: 'application/json',
      });
      console.log('✅ Daily menu uploaded');
    }

    // Upload permanent menu
    if (fs.existsSync(permanentMenuPath)) {
      const permanentMenuData = fs.readFileSync(permanentMenuPath, 'utf-8');
      await put('permanent-menu.json', permanentMenuData, {
        access: 'public',
        contentType: 'application/json',
      });
      console.log('✅ Permanent menu uploaded');
    }

    // Upload announcements
    if (fs.existsSync(announcementsPath)) {
      const announcementsData = fs.readFileSync(announcementsPath, 'utf-8');
      await put('announcements.json', announcementsData, {
        access: 'public',
        contentType: 'application/json',
      });
      console.log('✅ Announcements uploaded');
    }

    // Upload reservations
    if (fs.existsSync(reservationsPath)) {
      const reservationsData = fs.readFileSync(reservationsPath, 'utf-8');
      await put('reservations.json', reservationsData, {
        access: 'public',
        contentType: 'application/json',
      });
      console.log('✅ Reservations uploaded');
    }

    console.log('✅ All data initialized in Vercel Blob!');
  } catch (error) {
    console.error('❌ Error initializing Blob:', error);
    process.exit(1);
  }
}

initializeBlob();
