import React from 'react';

export default function ChristmasFooter() {
  return (
    <footer className="relative overflow-hidden bg-[var(--bakery-dark)] text-white py-12">
      {/* Decorative stripe (keeps base color intact) */}
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-red-600 via-yellow-400 to-green-500 opacity-80 z-0" />
      <div className="relative z-10">
        {/* Decorative garland and emojis */}
        <div className="flex justify-center gap-2 items-center mb-4">
          <div className="text-2xl animate-pulse">🎄</div>
          <div className="text-lg font-semibold uppercase tracking-wide">Joyeuses Fêtes de la part de Les Délices de Pasteur</div>
          <div className="text-2xl animate-pulse">🎁</div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl serif-font font-bold mb-4">Les Délices de Pasteur</h3>
            <p className="text-white/90 mb-4">Artisan boulanger pâtissier depuis 2009</p>
            <div className="flex space-x-3">
              <a href="#" className="text-white/90 hover:text-white">Facebook</a>
              <a href="#" className="text-white/90 hover:text-white">Instagram</a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Adresse</h4>
            <div className="space-y-2 text-white/90">
              <a
                href="https://share.google/T4oqxcSeblsS93gCU"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start hover:text-white transition-colors cursor-pointer"
              >
                <span className="mr-2">📍</span>
                37, Bd Pasteur<br />75015 Paris
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Contact</h4>
            <div className="space-y-2 text-white/90">
              <p className="flex items-center"><span className="mr-2">📞</span> 01 43 06 37 53</p>
              <p className="flex items-center"><span className="mr-2">✉️</span> contact@lesdelices.fr</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Horaires</h4>
            <div className="space-y-2 text-white/90">
              <p className="flex items-center">Lun-Sam: 6h30-20h</p>
              <p className="flex items-center">Jeu: Fermé</p>
              <p className="flex items-center">Dim: 7h-19h</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/80">
          <p className="mb-3 md:mb-0">© {new Date().getFullYear()} Boulangerie Les Délices de Pasteur. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Mentions Légales</a>
            <a href="#" className="hover:text-white">Politique de Confidentialité</a>
            <span className="hidden sm:inline">•</span>
            <span className="text-sm">🎄 Joyeuses Fêtes !</span>
          </div>
        </div>
      </div>
    </div>

      {/* Subtle snow-like dots using absolute positioned elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-10 -top-5 opacity-30 text-2xl animate-bounce">❄️</div>
        <div className="absolute right-6 top-6 opacity-20 text-xl animate-pulse">❄️</div>
        <div className="absolute left-1/2 top-10 -translate-x-1/2 opacity-20 text-2xl animate-pulse">✨</div>
      </div>
    </footer>
  );
}
