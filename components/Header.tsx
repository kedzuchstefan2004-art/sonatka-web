'use client';

import Link from 'next/link';
import { Menu, X, Utensils } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-gray-50 sticky top-0 z-50 transition-shadow duration-300 border-b border-gray-200 ${
      isScrolled ? 'shadow-lg' : 'shadow-md'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Utensils className="h-8 w-8 text-amber-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reštaurácia Sonáta</h1>
              <p className="text-sm text-gray-600">Spišská Nová Ves</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Domov
            </Link>
            <Link href="/stala-ponuka" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Stála ponuka
            </Link>
            <Link href="/galeria" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Galéria
            </Link>
            <Link href="/rezervacia" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Rezervácia
            </Link>
            <Link href="/kontakt" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Kontakt
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6 text-gray-900" /> : <Menu className="h-6 w-6 text-gray-900" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Domov
            </Link>
            <Link
              href="/stala-ponuka"
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Stála ponuka
            </Link>
            <Link
              href="/galeria"
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Galéria
            </Link>
            <Link
              href="/rezervacia"
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Rezervácia
            </Link>
            <Link
              href="/kontakt"
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Kontakt
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
