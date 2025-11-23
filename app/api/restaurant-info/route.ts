import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { RestaurantInfo } from '@/lib/types';

const dataPath = path.join(process.cwd(), 'data', 'restaurant-info.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataPath, 'utf8');
    const data: RestaurantInfo = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading restaurant info:', error);
    // Return default info if file not found
    const defaultInfo: RestaurantInfo = {
      name: 'Reštaurácia Sonáta',
      address: 'Radničné námestie 4',
      city: '052 01 Spišská Nová Ves',
      phone: ['+421-53-44 111 82'],
      email: 'sonatka@sonatka.sk',
      openingHours: {
        'Pondelok - Piatok': '10:00 - 16:00',
        'Sobota': '10:00 - 18:00',
        'Nedeľa': 'Zatvorené'
      },
      capacity: {
        restaurant: 60,
        smokingLounge: 12,
        terrace: 24
      }
    };
    return NextResponse.json(defaultInfo);
  }
}
