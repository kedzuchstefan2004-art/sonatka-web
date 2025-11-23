import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import type { PermanentMenuItem } from '@/lib/types';

const defaultMenu: PermanentMenuItem[] = [
  // Polievky
  { id: '1', name: 'Slepačí vývar s mäsom a rezancami', price: 2.60, allergens: ['1', '3', '9'], category: 'Polievky' },
  { id: '2', name: 'Cesnačka so syrom', price: 2.60, allergens: ['1', '7', '9'], category: 'Polievky' },
  { id: '3', name: 'Paradajkový krém so syrom', price: 3.40, allergens: ['1', '7'], category: 'Polievky' },
  { id: '4', name: 'Dračí dych - pikantná čínska polievka s hubami shitake a krabími tyčinkami', price: 5.10, allergens: ['3', '4'], category: 'Polievky' },
  { id: '5', name: 'Tekvicový krém Hokkaido s mandľovými lupeňmi', price: 4.30, allergens: ['8'], category: 'Polievky' },
  
  // Predjedlá
  { id: '6', name: 'Kačacia pečeň na cibuľke s jabĺčkami v zemiakovej lokši', price: 5.10, allergens: ['1'], category: 'Predjedlá' },
  { id: '7', name: 'Mozzarella prekladaná rajčinami, bazalkou a sušenou šunkou prosciutto', price: 5.20, allergens: ['7'], category: 'Predjedlá' },
  { id: '8', name: 'Gratinovaný mäsový toast', price: 5.90, allergens: ['1', '3', '7'], category: 'Predjedlá' },
  
  // Ryby
  { id: '9', name: 'Losos s pomarančom a bylinkovým maslom', price: 13.80, allergens: ['1', '7', '4'], category: 'Ryby' },
  { id: '10', name: 'Grilovaný losos v bylinkovej kruste', price: 13.20, allergens: ['1', '7', '4'], category: 'Ryby' },
  
  // Kačka
  { id: '11', name: 'Medové kačacie prsia s grilovanou hruškou', price: 16.10, allergens: ['1'], category: 'Kačka' },
  { id: '12', name: 'Pečené kačacie prsia na hríboch a slaninke', price: 16.50, allergens: ['1'], category: 'Kačka' },
  { id: '13', name: 'Pečené kačacie stehno s medom, červená kapusta, žemľový knedlík', price: 18.60, allergens: ['1', '3', '7'], category: 'Kačka' },
  { id: '14', name: 'Plátky pečených kačacích pŕs na grilovanej zelenine', price: 13.40, allergens: ['7'], category: 'Kačka' },
  
  // Kuracie
  { id: '15', name: 'Kurací steak s bylinkovým maslom', price: 7.70, allergens: ['1', '7'], category: 'Kuracie' },
  { id: '16', name: 'Kuracie rezne vyprážané', price: 7.70, allergens: ['1', '3', '7'], category: 'Kuracie' },
  { id: '17', name: 'Plátky pečených kuracích pŕs, krémové hríbikové rizoto s parmezánom', price: 9.90, allergens: ['1', '7'], category: 'Kuracie' },
  
  // Bravčové
  { id: '18', name: 'Bravčová panenka v bylinkovom obale', price: 12.20, allergens: ['1'], category: 'Bravčové' },
  { id: '19', name: 'Pníčky z bravčovej panenky v šípkovej omáčke', price: 12.70, allergens: ['1'], category: 'Bravčové' },
  { id: '20', name: 'Medailóniky z bravčovej panenky so zeleninou na pare', price: 13.90, allergens: [], category: 'Bravčové' },
  { id: '21', name: 'Pikantná pochúťka z bravčového mäsa', price: 9.40, allergens: ['1', '7', '8'], category: 'Bravčové' },
  
  // Hovädzie
  { id: '22', name: 'Steak na spôsob divokého západu', price: 25.90, allergens: [], category: 'Hovädzie' },
  { id: '23', name: 'Hovädzie soté Stroganov', price: 19.40, allergens: ['1', '7'], category: 'Hovädzie' },
  
  // Špecialitky
  { id: '24', name: 'Levočská pochúťka - mini zemiakové placky prekladané plátkami z kuracích pŕs, bravčového karé a hovädzej sviečkovice', price: 12.20, allergens: ['1', '3'], category: 'Špecialitky' },
  { id: '25', name: 'Soté NIVA - soté z kuracieho mäsa v smotanovej omáčke so šampiňónmi a syrom niva', price: 12.20, allergens: ['1', '3', '7'], category: 'Špecialitky' },
  { id: '26', name: 'Mix grill - grilované plátky kuracích pŕs, bravčového karé a hovädzej sviečkovice', price: 14.60, allergens: ['1'], category: 'Špecialitky' },
  
  // Cestoviny
  { id: '27', name: 'Bryndzové pirohy so slaninkou a smotanou', price: 6.50, allergens: ['1', '3', '7'], category: 'Cestoviny' },
  { id: '28', name: 'Penne s bazalkovým pestom, kuracím mäsom, sušenými rajčinami a parmezánom', price: 9.00, allergens: ['1', '3', '7'], category: 'Cestoviny' },
  { id: '29', name: 'Bolonské tagliatelle s bravčovým mäsom, paradajkami a parmezánom', price: 11.00, allergens: ['1', '3', '7'], category: 'Cestoviny' },
  { id: '30', name: 'Penne s cesnakom a maslom, kurací steak s bylinkami a bazalkou', price: 10.00, allergens: ['1', '3', '7'], category: 'Cestoviny' },
  
  // Šaláty
  { id: '31', name: 'Zeleninový šalát s kuracím mäsom, jogurtovým dresingom, cesnaková bageta', price: 9.40, allergens: ['1', '7'], category: 'Šaláty' },
  { id: '32', name: 'Šopský šalát so syrom Fetaky, cesnaková bageta', price: 8.50, allergens: ['1', '7'], category: 'Šaláty' },
  { id: '33', name: 'Ľadový šalát s tuniakom, rukolou, paradajkami a dresingom, cesnaková bageta', price: 8.80, allergens: ['1', '7', '4'], category: 'Šaláty' },
  { id: '34', name: 'Zeleninový šalát s vyprážanými kuracími stripsami a dresingom, cesnaková bageta', price: 11.00, allergens: ['1', '3', '7'], category: 'Šaláty' },
  
  // Dezerty
  { id: '35', name: 'Palacinky so zmrzlinou a ovocím', price: 6.60, allergens: ['1', '3', '7', '8'], category: 'Dezerty' },
  { id: '36', name: 'Palacinky s jahodami a šľahačkou', price: 5.30, allergens: ['1', '3', '7'], category: 'Dezerty' },
  { id: '37', name: 'Ovocné knedle so strúhankou a maslom', price: 5.50, allergens: ['1', '3', '7'], category: 'Dezerty' },
  
  // Prílohy
  { id: '38', name: 'Zemiakové hranolčeky', price: 2.60, allergens: [], category: 'Prílohy' },
  { id: '39', name: 'Zemiakové krokety', price: 3.00, allergens: [], category: 'Prílohy' },
  { id: '40', name: 'Zemiakové mesiačiky so šupkou', price: 3.00, allergens: [], category: 'Prílohy' },
  { id: '41', name: 'Varené zemiaky', price: 2.20, allergens: ['7'], category: 'Prílohy' },
  { id: '42', name: 'Opekané zemiaky', price: 2.20, allergens: [], category: 'Prílohy' },
  { id: '43', name: 'Zemiaková lokša', price: 2.60, allergens: ['1'], category: 'Prílohy' },
  { id: '44', name: 'Dusená ryža', price: 2.20, allergens: [], category: 'Prílohy' },
  { id: '45', name: 'Zemiaková kaša', price: 2.60, allergens: ['7'], category: 'Prílohy' },
  { id: '46', name: 'Karlovarský žemľový knedlík', price: 3.90, allergens: ['1', '3', '7'], category: 'Prílohy' },
  
  // Omáčky
  { id: '47', name: 'Horčicovo-smotanová so zeleným korením', price: 2.60, allergens: ['1', '7', '10'], category: 'Omáčky' },
  { id: '48', name: 'Brusnicová', price: 3.80, allergens: ['1'], category: 'Omáčky' },
  { id: '49', name: 'Smotanovo-bylinková', price: 2.60, allergens: ['1', '7'], category: 'Omáčky' },
  { id: '50', name: 'Hríbiková', price: 4.20, allergens: ['1'], category: 'Omáčky' }
];

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from('permanent_menu')
      .select('*');

    if (error) {
      console.error('Error loading permanent menu from DB:', error);
      return NextResponse.json(defaultMenu);
    }

    return NextResponse.json(data || defaultMenu);
  } catch (error) {
    console.error('Error fetching permanent menu:', error);
    return NextResponse.json(defaultMenu);
  }
}

export async function POST(request: Request) {
  try {
    const data: PermanentMenuItem[] = await request.json();

    const { error } = await supabaseServer
      .from('permanent_menu')
      .delete()
      .neq('id', '');

    if (!error) {
      await supabaseServer
        .from('permanent_menu')
        .insert(data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving permanent menu:', error);
    return NextResponse.json({ error: 'Failed to save permanent menu' }, { status: 500 });
  }
}
