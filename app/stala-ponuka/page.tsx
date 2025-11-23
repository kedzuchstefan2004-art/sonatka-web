'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MenuCard from '@/components/MenuCard';
import ScrollToTop from '@/components/ScrollToTop';
import type { PermanentMenuItem } from '@/lib/types';

export default function StalaPonuka() {
  const [menu, setMenu] = useState<PermanentMenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/api/permanent-menu');
        if (res.ok) {
          const data = await res.json();
          setMenu(data);
        }
      } catch (error) {
        console.error('Error fetching permanent menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Group items by category
  const groupedItems = menu.reduce((acc, item) => {
    const category = item.category || 'Ostatné';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, PermanentMenuItem[]>);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Stála ponuka jedál
              </h1>
              <p className="text-xl text-amber-100">
                Naša kompletná ponuka jedál dostupná kedykoľvek
              </p>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category} className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-amber-500">
                  {category}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {items.map((item) => (
                    <MenuCard key={item.id} item={item} showPrice={true} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Allergen Info */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Zoznam alergénov</h3>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-800">
                  <div><span className="font-bold text-amber-700">1.</span> Obilniny obsahujúce lepok</div>
                  <div><span className="font-bold text-amber-700">2.</span> Kôrovce a výrobky z nich</div>
                  <div><span className="font-bold text-amber-700">3.</span> Vajcia a výrobky z nich</div>
                  <div><span className="font-bold text-amber-700">4.</span> Ryby a výrobky z nich</div>
                  <div><span className="font-bold text-amber-700">5.</span> Arašidy a výrobky z nich</div>
                  <div><span className="font-bold text-amber-700">6.</span> Sójové zrná a výrobky z nich</div>
                  <div><span className="font-bold text-amber-700">7.</span> Mlieko a výrobky z neho</div>
                  <div><span className="font-bold text-amber-700">8.</span> Orechy</div>
                  <div><span className="font-bold text-amber-700">9.</span> Zeler a výrobky z neho</div>
                  <div><span className="font-bold text-amber-700">10.</span> Horčica a výrobky z nej</div>
                  <div><span className="font-bold text-amber-700">11.</span> Sezamové semená a výrobky z nich</div>
                  <div><span className="font-bold text-amber-700">12.</span> Oxid siričitý a siričitany</div>
                  <div><span className="font-bold text-amber-700">13.</span> Vlčí bôb a výrobky z neho</div>
                  <div><span className="font-bold text-amber-700">14.</span> Mäkkýše a výrobky z nich</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
