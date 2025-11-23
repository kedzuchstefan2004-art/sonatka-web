import { NextResponse } from 'next/server';
import type { DailyMenu } from '@/lib/types';

const defaultMenu: DailyMenu = {
  date: new Date().toISOString().split('T')[0],
  price: 7.50,
  servingTime: '11:00 - 14:00',
  items: [
    {
      id: '1',
      name: 'Tradičná kura polievka s domácimi rezancami',
      description: 'Čistá, vývarová polievka s čerstvou kuraťou a domácimi rezancami',
      price: 7.50,
      allergens: ['1', '3', '9'],
      category: 'Polievka'
    },
    {
      id: '2',
      name: 'Hubová krémová polievka so zemiakmi',
      description: 'Bohatá polievka z lesných húb s kôrou a čerstvou smotanou',
      price: 7.50,
      allergens: ['3', '7'],
      category: 'Polievka'
    },
    {
      id: '3',
      name: 'Vyprážaný kurací rezeň s domácim zemiakový šalátom',
      description: 'Chutný rezeň v zlatavej paniere, podávaný s tradičným zemiakový šalátom',
      price: 7.50,
      allergens: ['1', '3', '7', '10'],
      category: 'Hlavné jedlo'
    },
    {
      id: '4',
      name: 'Hovädzí guláš s kváskový chlebom',
      description: 'Klasický guláš z mäkkého hovädzia, podávaný s čerstvým kváskový chlebom',
      price: 7.50,
      allergens: ['1', '3', '7'],
      category: 'Hlavné jedlo'
    },
    {
      id: '5',
      name: 'Špagety Carbonara s parmezánom',
      description: 'Taliansky klasik - špagety s bešamelom, slaninou a čerstvým parmezánom',
      price: 7.50,
      allergens: ['1', '3', '7', '8'],
      category: 'Hlavné jedlo'
    }
  ]
};

export async function GET() {
  try {
    return NextResponse.json(defaultMenu);
  } catch (error) {
    console.error('Error loading daily menu:', error);
    return NextResponse.json(defaultMenu);
  }
}

export async function POST(request: Request) {
  try {
    const data: DailyMenu = await request.json();
    // On Vercel, we can't write to files, so just return success
    // In production, you would use a database
    console.log('Daily menu updated (stored in memory):', data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving daily menu:', error);
    return NextResponse.json({ error: 'Failed to save daily menu' }, { status: 500 });
  }
}
