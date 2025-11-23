import { NextResponse } from 'next/server';
import type { Reservation } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const { reservation, type }: { reservation: Reservation; type: 'new' | 'approved' | 'rejected' } = await request.json();
    
    // In production, you would use a service like SendGrid, Resend, or Nodemailer
    // For now, we'll just log the email that would be sent
    
    if (type === 'new') {
      // Email to restaurant owner
      console.log('=== EMAIL TO RESTAURANT ===');
      console.log('To: sonatka@sonatka.sk');
      console.log('Subject: Nová rezervácia');
      console.log(`
Dobrý deň,

Máte novú rezerváciu:

Meno: ${reservation.name}
Email: ${reservation.email}
Telefón: ${reservation.phone}
Dátum: ${new Date(reservation.date).toLocaleDateString('sk-SK')}
Čas: ${reservation.timeFrom} - ${reservation.timeTo}
Počet osôb: ${reservation.numberOfPeople}
Príležitosť: ${reservation.occasion}
${reservation.message ? `Správa: ${reservation.message}` : ''}

Prosím, schváľte alebo zamietne túto rezerváciu v admin paneli.

S pozdravom,
Systém rezervácií
      `);
    } else if (type === 'approved') {
      // Email to customer
      console.log('=== EMAIL TO CUSTOMER ===');
      console.log(`To: ${reservation.email}`);
      console.log('Subject: Rezervácia schválená - Reštaurácia Sonáta');
      console.log(`
Dobrý deň ${reservation.name},

Vaša rezervácia bola schválená!

Detaily rezervácie:
Dátum: ${new Date(reservation.date).toLocaleDateString('sk-SK')}
Čas: ${reservation.timeFrom} - ${reservation.timeTo}
Počet osôb: ${reservation.numberOfPeople}

Tešíme sa na Vašu návštevu!

S pozdravom,
Reštaurácia Sonáta
Tel: +421-53-44 111 82
      `);
    } else if (type === 'rejected') {
      console.log('=== EMAIL TO CUSTOMER ===');
      console.log(`To: ${reservation.email}`);
      console.log('Subject: Rezervácia zamietnutá - Reštaurácia Sonáta');
      console.log(`
Dobrý deň ${reservation.name},

Bohužiaľ, Vašu rezerváciu sme museli zamietnuť z dôvodu nedostupnosti.

Prosím, kontaktujte nás telefonicky pre alternatívne termíny.

S pozdravom,
Reštaurácia Sonáta
Tel: +421-53-44 111 82
      `);
    }
    
    return NextResponse.json({ success: true, message: 'Email sent (simulated)' });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
