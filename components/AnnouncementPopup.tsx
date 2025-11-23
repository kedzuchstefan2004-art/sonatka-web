'use client';

import { useState, useEffect } from 'react';
import { X, Megaphone } from 'lucide-react';
import type { Announcement } from '@/lib/types';

interface AnnouncementPopupProps {
  announcements: Announcement[];
}

export default function AnnouncementPopup({ announcements }: AnnouncementPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Zobraz popup iba ak existujú aktuality a ešte neboli videné
  useEffect(() => {
    if (announcements.length > 0) {
      // Skontroluj či sme už videli túto aktualitu
      const lastSeenId = localStorage.getItem('lastSeenAnnouncementId');
      const currentAnnouncementId = announcements[0]?.id;
      
      // Ak je nová aktualita, zobraz popup
      if (lastSeenId !== currentAnnouncementId) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [announcements]);

  const handleClose = () => {
    setIsOpen(false);
    // Zapamätaj si ID poslednej vidnej aktuality
    if (announcements.length > 0) {
      localStorage.setItem('lastSeenAnnouncementId', announcements[currentIndex]?.id || '');
    }
  };

  if (announcements.length === 0) {
    return null;
  }

  const currentAnnouncement = announcements[currentIndex];

  const nextAnnouncement = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const prevAnnouncement = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  return (
    <>
      {isOpen && (
        <>
          {/* Blurred background */}
          <div className="fixed inset-0 backdrop-blur-sm z-30" onClick={handleClose}></div>
          
          {/* Announcement Modal - Center */}
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-w-md w-full">
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">OZNAM</h2>
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-amber-500 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {currentAnnouncement.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(currentAnnouncement.date).toLocaleDateString('sk-SK', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {currentAnnouncement.content}
                </p>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  {announcements.length > 1 && (
                    <>
                      <button
                        onClick={prevAnnouncement}
                        className="px-3 py-1 text-sm text-amber-600 hover:bg-amber-50 rounded transition-colors font-medium"
                      >
                        ← Predchádzajúca
                      </button>
                      <span className="text-xs text-gray-500">
                        {currentIndex + 1} / {announcements.length}
                      </span>
                      <button
                        onClick={nextAnnouncement}
                        className="px-3 py-1 text-sm text-amber-600 hover:bg-amber-50 rounded transition-colors font-medium"
                      >
                        Ďalšia →
                      </button>
                    </>
                  )}
                </div>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                >
                  Zatvoriť
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
