'use client';

import { Plus, Trash2, Save, ToggleLeft, ToggleRight } from 'lucide-react';
import type { Announcement } from '@/lib/types';

interface AnnouncementsTabProps {
  announcements: Announcement[];
  onUpdate: (announcements: Announcement[]) => void;
  onSave: () => void;
  saving: boolean;
}

export default function AnnouncementsTab({ announcements, onUpdate, onSave, saving }: AnnouncementsTabProps) {
  const addAnnouncement = () => {
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      active: true
    };
    onUpdate([...announcements, newAnnouncement]);
  };

  const removeAnnouncement = (id: string) => {
    onUpdate(announcements.filter(a => a.id !== id));
  };

  const updateAnnouncement = (id: string, field: keyof Announcement, value: any) => {
    onUpdate(announcements.map(a =>
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const toggleActive = (id: string) => {
    onUpdate(announcements.map(a =>
      a.id === id ? { ...a, active: !a.active } : a
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Aktuality a oznamy</h2>
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          {saving ? 'Ukladám...' : 'Uložiť'}
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 mr-4">
                <input
                  type="text"
                  value={announcement.title}
                  onChange={(e) => updateAnnouncement(announcement.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-semibold text-gray-900 placeholder:text-gray-400"
                  placeholder="Nadpis aktuality"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleActive(announcement.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    announcement.active 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                  title={announcement.active ? 'Aktívne' : 'Neaktívne'}
                >
                  {announcement.active ? (
                    <ToggleRight className="h-6 w-6" />
                  ) : (
                    <ToggleLeft className="h-6 w-6" />
                  )}
                </button>
                <button
                  onClick={() => removeAnnouncement(announcement.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dátum
              </label>
              <input
                type="date"
                value={announcement.date}
                onChange={(e) => updateAnnouncement(announcement.id, 'date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Obsah
              </label>
              <textarea
                value={announcement.content}
                onChange={(e) => updateAnnouncement(announcement.id, 'content', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-900 placeholder:text-gray-400"
                placeholder="Text aktuality..."
              />
            </div>

            <div className="mt-2 text-sm">
              <span className={`inline-block px-2 py-1 rounded ${
                announcement.active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {announcement.active ? 'Zobrazuje sa na webe' : 'Skryté'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addAnnouncement}
        className="mt-4 flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
      >
        <Plus className="h-5 w-5" />
        Pridať aktualitu
      </button>
    </div>
  );
}
