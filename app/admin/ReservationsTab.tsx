'use client';

import { Check, X, Mail, Phone, Calendar, Clock, Users } from 'lucide-react';
import type { Reservation } from '@/lib/types';

interface ReservationsTabProps {
  reservations: Reservation[];
  onUpdate: (reservations: Reservation[]) => void;
  onSave: () => void;
  saving: boolean;
}

export default function ReservationsTab({ reservations, onUpdate, onSave, saving }: ReservationsTabProps) {
  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    const updated = reservations.map(r => 
      r.id === id ? { ...r, status } : r
    );
    onUpdate(updated);

    // Send email notification
    const reservation = reservations.find(r => r.id === id);
    if (reservation) {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          reservation: { ...reservation, status }, 
          type: status 
        })
      });
    }
  };

  const pendingReservations = reservations.filter(r => r.status === 'pending');
  const processedReservations = reservations.filter(r => r.status !== 'pending');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Rezervácie</h2>
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 disabled:opacity-50"
        >
          {saving ? 'Ukladám...' : 'Uložiť zmeny'}
        </button>
      </div>

      {/* Pending Reservations */}
      {pendingReservations.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              {pendingReservations.length}
            </span>
            Čakajúce na schválenie
          </h3>
          <div className="space-y-4">
            {pendingReservations.map((reservation) => (
              <ReservationCard 
                key={reservation.id} 
                reservation={reservation} 
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </div>
      )}

      {/* Processed Reservations */}
      {processedReservations.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Spracované rezervácie
          </h3>
          <div className="space-y-4">
            {processedReservations.map((reservation) => (
              <ReservationCard 
                key={reservation.id} 
                reservation={reservation} 
                onStatusChange={handleStatusChange}
                readonly
              />
            ))}
          </div>
        </div>
      )}

      {reservations.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Zatiaľ žiadne rezervácie
        </div>
      )}
    </div>
  );
}

function ReservationCard({ 
  reservation, 
  onStatusChange, 
  readonly = false 
}: { 
  reservation: Reservation; 
  onStatusChange: (id: string, status: 'approved' | 'rejected') => void;
  readonly?: boolean;
}) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    pending: 'Čaká na schválenie',
    approved: 'Schválená',
    rejected: 'Zamietnutá'
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{reservation.name}</h4>
          <p className="text-sm text-gray-500">
            Vytvorené: {new Date(reservation.createdAt).toLocaleString('sk-SK')}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[reservation.status]}`}>
          {statusLabels[reservation.status]}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Mail className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{reservation.email}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Phone className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{reservation.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{new Date(reservation.date).toLocaleDateString('sk-SK')}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{reservation.timeFrom} - {reservation.timeTo}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Users className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{reservation.numberOfPeople} osôb</span>
        </div>
        <div className="text-sm text-gray-700">
          <span className="font-medium">Príležitosť:</span> {reservation.occasion}
        </div>
      </div>

      {reservation.message && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Správa:</span> {reservation.message}
          </p>
        </div>
      )}

      {!readonly && reservation.status === 'pending' && (
        <div className="flex gap-3">
          <button
            onClick={() => onStatusChange(reservation.id, 'approved')}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Check className="h-4 w-4" />
            Schváliť
          </button>
          <button
            onClick={() => onStatusChange(reservation.id, 'rejected')}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <X className="h-4 w-4" />
            Zamietnuť
          </button>
        </div>
      )}
    </div>
  );
}
