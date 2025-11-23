import { Phone, Mail, MapPin, Clock, Utensils } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 mt-0">
      {/* Decorative top */}
      <div className="h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-amber-600 mb-6 flex items-center justify-center md:justify-start gap-3">
              <MapPin className="h-6 w-6 text-amber-600" />
              Kontakt
            </h3>
            <div className="space-y-3 text-base text-gray-700">
              <p className="font-medium">Radničné námestie 4</p>
              <p className="font-medium">052 01 Spišská Nová Ves</p>
              <a href="tel:+421534411182" className="text-amber-600 hover:text-amber-700 transition-colors block font-semibold">
                +421-53-44 111 82
              </a>
              <a href="mailto:sonatka@sonatka.sk" className="text-amber-600 hover:text-amber-700 transition-colors block font-semibold">
                sonatka@sonatka.sk
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-amber-600 mb-6 flex items-center justify-center gap-3">
              <Clock className="h-6 w-6 text-amber-600" />
              Otváracie hodiny
            </h3>
            <div className="space-y-3 text-base text-gray-700">
              <p><span className="text-amber-700 font-bold">Po - Pia:</span> 10:00 - 16:00</p>
              <p><span className="text-amber-700 font-bold">Sobota:</span> 10:00 - 18:00</p>
              <p><span className="text-orange-600 font-bold">Nedeľa:</span> Zatvorené</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold text-amber-600 mb-6">Navigácia</h3>
            <div className="space-y-3 text-base">
              <Link href="/" className="text-gray-700 hover:text-amber-600 transition-colors block font-medium">
                Domov
              </Link>
              <Link href="/stala-ponuka" className="text-gray-700 hover:text-amber-600 transition-colors block font-medium">
                Stála ponuka
              </Link>
              <Link href="/rezervacia" className="text-gray-700 hover:text-amber-600 transition-colors block font-medium">
                Rezervácia
              </Link>
              <Link href="/kontakt" className="text-gray-700 hover:text-amber-600 transition-colors block font-medium">
                Kontakt
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-400 pt-8 text-center text-base text-gray-600">
          <p>&copy; {new Date().getFullYear()} Reštaurácia Sonáta. Všetky práva vyhradené.</p>
        </div>
      </div>
    </footer>
  );
}
