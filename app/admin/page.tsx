'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Save, LogOut } from 'lucide-react';
import type { DailyMenu, MenuItem, PermanentMenuItem, Reservation, Announcement } from '@/lib/types';
import AdminTabs from './AdminTabs';
import ReservationsTab from './ReservationsTab';
import AnnouncementsTab from './AnnouncementsTab';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('daily');
  const [dailyMenu, setDailyMenu] = useState<DailyMenu | null>(null);
  const [permanentMenu, setPermanentMenu] = useState<PermanentMenuItem[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    const loginTime = localStorage.getItem('adminLoginTime');
    
    if (loggedIn === 'true' && loginTime) {
      // Skontrolovať či session nie je staršia ako 24 hodín
      const now = Date.now();
      const timeDiff = now - parseInt(loginTime);
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        setIsAuthenticated(true);
        loadData();
      } else {
        // Session vypršala
        handleLogout();
      }
    } else {
      router.push('/admin/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    router.push('/admin/login');
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      const [dailyRes, permanentRes, reservationsRes, announcementsRes] = await Promise.all([
        fetch('/api/daily-menu'),
        fetch('/api/permanent-menu'),
        fetch('/api/reservations'),
        fetch('/api/announcements/all')
      ]);

      if (dailyRes.ok) setDailyMenu(await dailyRes.json());
      if (permanentRes.ok) setPermanentMenu(await permanentRes.json());
      if (reservationsRes.ok) setReservations(await reservationsRes.json());
      if (announcementsRes.ok) setAnnouncements(await announcementsRes.json());
    } catch (error) {
      showMessage('error', 'Chyba pri načítaní dát');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const saveDailyMenu = async () => {
    if (!dailyMenu) return;
    setSaving(true);
    try {
      const res = await fetch('/api/daily-menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dailyMenu)
      });
      if (res.ok) {
        showMessage('success', 'Denné menu bolo uložené');
      } else {
        showMessage('error', 'Chyba pri ukladaní');
      }
    } catch (error) {
      showMessage('error', 'Chyba pri ukladaní');
    } finally {
      setSaving(false);
    }
  };

  const savePermanentMenu = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/permanent-menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(permanentMenu)
      });
      if (res.ok) {
        showMessage('success', 'Stála ponuka bola uložená');
      } else {
        showMessage('error', 'Chyba pri ukladaní');
      }
    } catch (error) {
      showMessage('error', 'Chyba pri ukladaní');
    } finally {
      setSaving(false);
    }
  };

  const saveReservations = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservations)
      });
      if (res.ok) {
        showMessage('success', 'Rezervácie boli uložené');
      } else {
        showMessage('error', 'Chyba pri ukladaní');
      }
    } catch (error) {
      showMessage('error', 'Chyba pri ukladaní');
    } finally {
      setSaving(false);
    }
  };

  const saveAnnouncements = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(announcements)
      });
      if (res.ok) {
        showMessage('success', 'Aktuality boli uložené');
      } else {
        showMessage('error', 'Chyba pri ukladaní');
      }
    } catch (error) {
      showMessage('error', 'Chyba pri ukladaní');
    } finally {
      setSaving(false);
    }
  };

  const addDailyMenuItem = () => {
    if (!dailyMenu) return;
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: '',
      price: dailyMenu.price,
      allergens: [],
      category: 'Hlavné jedlo'
    };
    setDailyMenu({
      ...dailyMenu,
      items: [...dailyMenu.items, newItem]
    });
  };

  const removeDailyMenuItem = (id: string) => {
    if (!dailyMenu) return;
    setDailyMenu({
      ...dailyMenu,
      items: dailyMenu.items.filter(item => item.id !== id)
    });
  };

  const updateDailyMenuItem = (id: string, field: keyof MenuItem, value: any) => {
    if (!dailyMenu) return;
    setDailyMenu({
      ...dailyMenu,
      items: dailyMenu.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  const addPermanentMenuItem = () => {
    const newItem: PermanentMenuItem = {
      id: Date.now().toString(),
      name: '',
      price: 0,
      allergens: [],
      category: 'Hlavné jedlá'
    };
    setPermanentMenu([...permanentMenu, newItem]);
  };

  const removePermanentMenuItem = (id: string) => {
    setPermanentMenu(permanentMenu.filter(item => item.id !== id));
  };

  const updatePermanentMenuItem = (id: string, field: keyof PermanentMenuItem, value: any) => {
    setPermanentMenu(permanentMenu.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Načítavam...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Admin panel - Reštaurácia Sonáta</h1>
              <p className="text-xs md:text-sm text-gray-600 mt-1">Správa obsahu webovej stránky</p>
            </div>
            <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
              <a
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-3 md:px-4 py-2 text-xs md:text-sm text-amber-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors border border-amber-300 flex-1 md:flex-none justify-center"
              >
                <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="hidden md:inline">Zobraziť web</span>
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 md:px-4 py-2 text-xs md:text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-1 md:flex-none justify-center"
              >
                <LogOut className="h-4 w-4 flex-shrink-0" />
                <span className="hidden md:inline">Odhlásiť sa</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {message && (
        <div className="container mx-auto px-4 mt-4">
          <div className={`p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message.text}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 mt-6">
        <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="container mx-auto px-4 py-6">
        {activeTab === 'daily' && dailyMenu && (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Denné menu</h2>
              <button
                onClick={saveDailyMenu}
                disabled={saving}
                className="flex items-center gap-2 bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                {saving ? 'Ukladám...' : 'Uložiť'}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Dátum</label>
                <input
                  type="date"
                  value={dailyMenu.date}
                  onChange={(e) => setDailyMenu({ ...dailyMenu, date: e.target.value })}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Cena (€)</label>
                <input
                  type="number"
                  step="0.01"
                  value={dailyMenu.price}
                  onChange={(e) => setDailyMenu({ ...dailyMenu, price: parseFloat(e.target.value) })}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-900"
                />
              </div>
            </div>

            <div className="space-y-3">
              {dailyMenu.items.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="grid md:grid-cols-2 gap-3 mb-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Názov jedla</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateDailyMenuItem(item.id, 'name', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-900"
                        placeholder="Napr. Kuracia polievka"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Kategória</label>
                      <select
                        value={item.category || ''}
                        onChange={(e) => updateDailyMenuItem(item.id, 'category', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-900"
                      >
                        <option value="Polievka">Polievka</option>
                        <option value="Hlavné jedlo">Hlavné jedlo</option>
                        <option value="Dezert">Dezert</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Alergény (čísla oddelené čiarkou)
                      </label>
                      <input
                        type="text"
                        value={item.allergens?.join(', ') || ''}
                        onChange={(e) => updateDailyMenuItem(
                          item.id,
                          'allergens',
                          e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        )}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-900"
                        placeholder="Napr. 1, 3, 7"
                      />
                    </div>
                    <button
                      onClick={() => removeDailyMenuItem(item.id)}
                      className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addDailyMenuItem}
              className="mt-3 flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium text-sm"
            >
              <Plus className="h-5 w-5" />
              Pridať jedlo
            </button>
          </div>
        )}

        {activeTab === 'permanent' && (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Stála ponuka</h2>
              <button
                onClick={savePermanentMenu}
                disabled={saving}
                className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 disabled:opacity-50 text-sm"
              >
                <Save className="h-5 w-5" />
                {saving ? 'Ukladám...' : 'Uložiť'}
              </button>
            </div>

            <div className="space-y-3">
              {permanentMenu.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="grid md:grid-cols-3 gap-3 mb-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Názov jedla</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updatePermanentMenuItem(item.id, 'name', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Kategória</label>
                      <select
                        value={item.category}
                        onChange={(e) => updatePermanentMenuItem(item.id, 'category', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-900"
                      >
                        <option value="Polievky">Polievky</option>
                        <option value="Hlavné jedlá">Hlavné jedlá</option>
                        <option value="Cestoviny">Cestoviny</option>
                        <option value="Ryby">Ryby</option>
                        <option value="Dezerty">Dezerty</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Cena (€)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => updatePermanentMenuItem(item.id, 'price', parseFloat(e.target.value))}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-900"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Alergény (čísla oddelené čiarkou)
                      </label>
                      <input
                        type="text"
                        value={item.allergens?.join(', ') || ''}
                        onChange={(e) => updatePermanentMenuItem(
                          item.id,
                          'allergens',
                          e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        )}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-900"
                        placeholder="Napr. 1, 3, 7"
                      />
                    </div>
                    <button
                      onClick={() => removePermanentMenuItem(item.id)}
                      className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addPermanentMenuItem}
              className="mt-3 flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium text-sm"
            >
              <Plus className="h-5 w-5" />
              Pridať jedlo
            </button>
          </div>
        )}

        {activeTab === 'reservations' && (
          <ReservationsTab
            reservations={reservations}
            onUpdate={setReservations}
            onSave={saveReservations}
            saving={saving}
          />
        )}

        {activeTab === 'announcements' && (
          <AnnouncementsTab
            announcements={announcements}
            onUpdate={setAnnouncements}
            onSave={saveAnnouncements}
            saving={saving}
          />
        )}
      </div>
    </div>
  );
}
