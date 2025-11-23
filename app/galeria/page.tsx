import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';
import ScrollToTop from '@/components/ScrollToTop';
import { Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function Galeria() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Galéria
              </h1>
              <p className="text-xl text-amber-100">
                Všetky fotografie z reštaurácie Sonáta
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                <ImageIcon className="h-8 w-8 text-amber-600" />
                Všetky fotky
              </h2>
              <p className="text-gray-600">
                Pozrite si všetky fotografie z našej reštaurácie. Kliknite na obrázok pre zväčšenie.
              </p>
            </div>
            <ImageGallery />
          </div>
        </section>

        {/* Back Link */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold"
            >
              ← Späť na hlavnú stránku
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
