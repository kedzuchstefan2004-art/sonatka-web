'use client';

import { useEffect, useState } from 'react';
import MenuCard from '@/components/MenuCard';
import ImageCarousel from '@/components/ImageCarousel';
import ScrollToTop from '@/components/ScrollToTop';
import AnnouncementPopup from '@/components/AnnouncementPopup';
import { Calendar, Clock, PartyPopper, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import type { DailyMenu, Announcement } from '@/lib/types';

export default function HomeContent() {
  const [dailyMenu, setDailyMenu] = useState<DailyMenu | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, announcementsRes] = await Promise.all([
          fetch('/api/daily-menu'),
          fetch('/api/announcements')
        ]);

        if (menuRes.ok) {
          const menuData = await menuRes.json();
          setDailyMenu(menuData);
        }

        if (announcementsRes.ok) {
          const announcementsData = await announcementsRes.json();
          setAnnouncements(announcementsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !dailyMenu) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <section className="relative text-white py-64 overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                Vitajte v Reštaurácii Sonáta
              </h1>
              <p className="text-xl md:text-2xl text-amber-100 mb-8">
                Tradícia a kvalita v srdci Spišskej Novej Vsi
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const menuDate = new Date(dailyMenu.date);
  const formattedDate = menuDate.toLocaleDateString('sk-SK', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const groupedItems = dailyMenu.items.reduce((acc, item) => {
    const category = item.category || 'Ostatné';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof dailyMenu.items>);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Hero Section with Background */}
        <section className="relative text-white py-64 overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                Vitajte v Reštaurácii Sonáta
              </h1>
              <p className="text-xl md:text-2xl text-amber-100 mb-8">
                Tradícia a kvalita v srdci Spišskej Novej Vsi
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/rezervacia"
                  className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-3 rounded-lg hover:bg-amber-50 transition-colors font-semibold shadow-lg"
                >
                  <PartyPopper className="h-5 w-5" />
                  Rezervovať oslavu
                </Link>
                <Link
                  href="/stala-ponuka"
                  className="inline-flex items-center gap-2 bg-amber-800 text-white px-8 py-3 rounded-lg hover:bg-amber-900 transition-colors font-semibold shadow-lg"
                >
                  Stála ponuka
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Announcement Popup */}
        <AnnouncementPopup announcements={announcements} />

        {/* Transition Section - Prechod z hero na menu */}
        <div className="h-24 bg-gradient-to-b from-black/30 via-black/10 to-transparent"></div>

        {/* Main Content Section - Denné menu */}
        <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Denné menu nadpis - Hore */}
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-gray-900 mb-4">Denné menu</h2>
                <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-8 text-lg font-semibold text-gray-700">
                  <div className="flex items-center gap-2 justify-center">
                    <Calendar className="h-5 w-5 text-amber-600" />
                    <span className="capitalize">{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <Clock className="h-5 w-5 text-amber-600" />
                    <span>{dailyMenu.servingTime}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center text-2xl font-bold text-amber-600">
                    <span>{dailyMenu.price.toFixed(2)} €</span>
                  </div>
                </div>
              </div>

              {/* Menu Cards Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Polievky Section */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-3xl font-bold text-gray-900">🍲 Polievky</h3>
                    <div className="flex-1 h-1 bg-gradient-to-r from-amber-500 to-transparent rounded"></div>
                  </div>
                  <div className="space-y-4">
                    {groupedItems['Polievka']?.map((item) => (
                      <div key={item.id} className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow border-l-4 border-amber-500">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h4>
                        {item.description && (
                          <p className="text-gray-600 text-sm mb-3 italic">{item.description}</p>
                        )}
                        {item.allergens && item.allergens.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {item.allergens.map((allergen) => (
                              <span key={allergen} className="inline-block bg-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded">
                                {allergen}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hlavné jedlá Section */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-3xl font-bold text-gray-900">🍽️ Hlavné jedlá</h3>
                    <div className="flex-1 h-1 bg-gradient-to-r from-amber-500 to-transparent rounded"></div>
                  </div>
                  <div className="space-y-4">
                    {groupedItems['Hlavné jedlo']?.map((item) => (
                      <div key={item.id} className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow border-l-4 border-amber-500">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h4>
                        {item.description && (
                          <p className="text-gray-600 text-sm mb-3 italic">{item.description}</p>
                        )}
                        {item.allergens && item.allergens.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {item.allergens.map((allergen) => (
                              <span key={allergen} className="inline-block bg-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded">
                                {allergen}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section - Nad O nás */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <ImageIcon className="h-8 w-8 text-amber-600" />
                Galéria
              </h2>
            </div>
            <ImageCarousel />
          </div>
        </section>

        {/* About Section - Pod galériou */}
        <section className="bg-gradient-to-b from-gray-100 via-gray-100 to-gray-200 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Decorative top element */}
              <div className="flex justify-center mb-8">
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
              </div>
              
              <div className="text-center">
                <h2 className="text-5xl font-bold text-gray-900 mb-8">O reštaurácii Sonáta</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8 text-justify">
                  Reštaurácia Sonáta sa nachádza v historickej budove Reduty v srdci Spišskej Novej Vsi. S viac ako 30-ročnou tradíciou ponúkame autentickú slovenskú kuchyňu v príjemnom prostredí. Naša kuchyňa je známa svojou kvalitou, čerstvými ingredienciami a tradičnými receptúrami, ktoré sú pripravované s láskou a starostlivosťou.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  Ponúkame denné menu, stálu ponuku jedál a možnosť rezervácie pre skupiny a oslavy. Naša kapacita umožňuje usporiadať rôzne podujatia v príjemnom a kultúrnom prostredí. Tešíme sa na vašu návštevu!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ScrollToTop />
    </>
  );
}
