import React, { useEffect, useRef, useState } from 'react';

type Props = {
  images?: string[];
  interval?: number; // ms
};

export default function ChristmasCarousel({
  images = ['/Images/Noel1.jpg', '/Images/Noel2.jpg', '/Images/Noel3.jpg', '/Images/Noel4.jpg', ],
  interval = 4500,
}: Props) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [images.length, interval]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) prev();
      else next();
    }
    touchStartX.current = null;
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div
        className="overflow-hidden relative rounded-lg"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="min-w-full relative h-80 sm:h-[36rem] lg:h-[44rem] flex items-center justify-center bg-black/5 overflow-hidden">
              {/* background fill (blur + dim) */}
              <img
                src={src}
                alt={`Noël ${i + 1} background`}
                className="absolute inset-0 w-full h-full object-cover filter blur-sm brightness-75"
              />

              {/* centered full image (no crop) - larger */}
              <img
                src={src}
                alt={`Noël ${i + 1}`}
                className="relative w-auto max-h-[92%] max-w-[95%] object-contain z-10"
              />
            </div>
          ))}
        </div>

        {/* Prev / Next */}
        <button
          aria-label="Précédent"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 text-[var(--bakery-dark)] rounded-full p-2 shadow hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          aria-label="Suivant"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 text-[var(--bakery-dark)] rounded-full p-2 shadow hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Aller à la diapositive ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === index ? 'bg-[var(--bakery-brown)]' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
