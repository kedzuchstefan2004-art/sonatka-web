'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Calendar, Clock, Users, PartyPopper, Send } from 'lucide-react';

export default function Rezervacia() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeFrom: '',
    timeTo: '',
    numberOfPeople: 10,
    occasion: 'Oslava narodenín',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Create reservation
      const reservationRes = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!reservationRes.ok) {
        throw new Error('Failed to create reservation');
      }

      const { reservation } = await reservationRes.json();

      // Send email notification
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservation, type: 'new' })
      });

      setSubmitted(true);
    } catch (err) {
      setError('Nastala chyba pri odosielaní rezervácie. Skúste to prosím znova.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfPeople' ? parseInt(value) : value
    }));
  };

  if (submitted) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
          <section className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-lg shadow-xl p-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PartyPopper className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Rezervácia odoslaná!
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Ďakujeme za Vašu rezerváciu. Čoskoro Vás budeme kontaktovať s potvrdením.
                </p>
                <p className="text-gray-600 mb-8">
                  Potvrdenie rezervácie Vám príde na email <strong>{formData.email}</strong>
                </p>
                <a
                  href="/"
                  className="inline-block bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  Späť na hlavnú stránku
                </a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Rezervácia oslavy
              </h1>
              <p className="text-xl text-amber-100">
                Oslávte svoju špeciálnu udalosť v príjemnom prostredí našej reštaurácie
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Rezervačný formulár
                </h2>
                <p className="text-gray-600">
                  Vyplňte prosím všetky údaje. Po odoslaní Vám príde potvrdenie na email.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meno a priezvisko *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                      placeholder="Ján Novák"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                      placeholder="jan.novak@email.sk"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefón *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                    placeholder="+421 900 000 000"
                  />
                </div>

                {/* Event Details */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-amber-600" />
                    Detaily podujatia
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dátum *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Users className="inline h-4 w-4 mr-1" />
                        Počet osôb *
                      </label>
                      <input
                        type="number"
                        name="numberOfPeople"
                        value={formData.numberOfPeople}
                        onChange={handleChange}
                        required
                        min="10"
                        max="100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                      />
                    </div>
                  </div>


                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <PartyPopper className="inline h-4 w-4 mr-1" />
                      Typ oslavy *
                    </label>
                    <select
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                    >
                      <option value="Oslava narodenín">Oslava narodenín</option>
                      <option value="Svadba">Svadba</option>
                      <option value="Firemná akcia">Firemná akcia</option>
                      <option value="Krstiny">Krstiny</option>
                      <option value="Výročie">Výročie</option>
                      <option value="Iná oslava">Iná oslava</option>
                    </select>
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dodatočná správa *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                    placeholder="Napíšte prosím:&#10;- Čas podujatia (od - do)&#10;- Alergény hostí (ak sú)&#10;- Špeciálne požiadavky&#10;- Iné poznámky"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    ⚠️ Nezabudnite uviesť čas podujatia a prípadné alergény!
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg"
                  >
                    <Send className="h-5 w-5" />
                    {submitting ? 'Odosielam...' : 'Odoslať rezerváciu'}
                  </button>
                </div>
              </form>
            </div>

            {/* Info Box */}
            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Dôležité informácie</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Minimálny počet osôb pre rezerváciu oslavy je 10</li>
                <li>• Kapacita reštaurácie je 60 osôb, fajčiarsky salónik 12 osôb, terasa 24 osôb</li>
                <li>• Po odoslaní rezervácie Vás budeme kontaktovať do 24 hodín</li>
                <li>• Pre urgentné rezervácie nás kontaktujte telefonicky: +421-53-44 111 82</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
