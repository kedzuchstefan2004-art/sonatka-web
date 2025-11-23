import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Kontakt() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Kontakt
              </h1>
              <p className="text-xl text-amber-100">
                Navštívte nás alebo nás kontaktujte
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Address */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-start gap-4 mb-4">
                  <MapPin className="h-8 w-8 text-amber-600 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Adresa</h2>
                    <p className="text-gray-700">Radničné námestie 4</p>
                    <p className="text-gray-700">052 01 Spišská Nová Ves</p>
                    <p className="text-gray-600 mt-2 text-sm">
                      Historická budova Reduty v centre mesta
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Phone className="h-8 w-8 text-amber-600 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Telefón</h2>
                    <a href="tel:+421534411182" className="text-gray-700 hover:text-amber-600 block">
                      +421-53-44 111 82
                    </a>
                    <a href="tel:+421918627699" className="text-gray-700 hover:text-amber-600 block">
                      +421 918 627 699
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-8 w-8 text-amber-600 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Email</h2>
                    <a href="mailto:sonatka@sonatka.sk" className="text-gray-700 hover:text-amber-600">
                      sonatka@sonatka.sk
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <div className="flex items-start gap-4">
                <Clock className="h-8 w-8 text-amber-600 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Otváracie hodiny</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Pondelok - Piatok</p>
                      <p className="text-gray-700">10:00 - 16:00</p>
                      <p className="text-sm text-gray-600 mt-1">Denné menu: 11:00 - 14:00</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Sobota</p>
                      <p className="text-gray-700">10:00 - 18:00</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Nedeľa</p>
                      <p className="text-gray-700">Zatvorené</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    * Otvárame už o 8:00 pre ranné posedenie pri káve
                  </p>
                </div>
              </div>
            </div>

            {/* Capacity */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Kapacita priestorov</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-amber-50 rounded-lg">
                  <div className="text-4xl font-bold text-amber-600 mb-2">60</div>
                  <p className="text-gray-700 font-medium">Reštaurácia</p>
                </div>
                <div className="text-center p-6 bg-amber-50 rounded-lg">
                  <div className="text-4xl font-bold text-amber-600 mb-2">12</div>
                  <p className="text-gray-700 font-medium">Fajčiarsky salónik</p>
                </div>
                <div className="text-center p-6 bg-amber-50 rounded-lg">
                  <div className="text-4xl font-bold text-amber-600 mb-2">24</div>
                  <p className="text-gray-700 font-medium">Letná terasa</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Kde nás nájdete</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2612.8!2d20.57195!3d48.942731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDU2JzMzLjgiTiAyMMKwMzQnMTkuMCJF!5e0!3m2!1ssk!2ssk!4v1234567890"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa - Reštaurácia Sonáta"
                />
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
