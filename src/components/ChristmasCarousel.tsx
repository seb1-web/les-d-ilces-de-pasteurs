'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
const photos = [
  { src: '/Images/optimized/Noel3.webp', alt: 'Sapin, guirlandes et décorations de Noël dans la boulangerie' },
  { src: '/Images/optimized/Noel4.webp', alt: 'Pains et cadeaux de Noël présentés dans la boutique' },
  { src: '/Images/optimized/Noel1.webp', alt: 'Éclairs et pâtisseries dans la vitrine décorée pour Noël' },
  { src: '/Images/optimized/Noel2.webp', alt: 'Décorations de Noël et diplôme de la boulangerie' },
];
export default function ChristmasCarousel() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  const start = useRef<number | null>(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => { setReduced(media.matches); if (media.matches) setPlaying(false); };
    change(); media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setInterval(() => setIndex(i => (i + 1) % photos.length), 4500);
    return () => window.clearInterval(timer);
  }, [playing, reduced]);
  const go = (i: number) => { setIndex((i + photos.length) % photos.length); setPlaying(false); };
  return <div className="christmas-gallery" role="region" aria-roledescription="carrousel" aria-label="Photos de Noël" onMouseEnter={() => setPlaying(false)} onFocusCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setPlaying(false); }}>
    <div className="christmas-photo" onTouchStart={e => { start.current = e.touches[0].clientX; }} onTouchEnd={e => { if (start.current !== null && Math.abs(e.changedTouches[0].clientX - start.current) > 50) go(index + (e.changedTouches[0].clientX < start.current ? 1 : -1)); start.current = null; }}>
      {photos.map((photo, i) => <img key={photo.src} src={photo.src} alt={photo.alt} width="1000" height="1000" loading="lazy" hidden={i !== index} data-source="client" data-subject="Décorations de Noël" />)}
    </div>
    <div className="gallery-controls"><div className="gallery-count" aria-live={playing ? 'off' : 'polite'}><span>0{index + 1}</span><span className="count-rule" /><span>0{photos.length}</span></div><div className="gallery-buttons">
      {!reduced && <button className="icon-button" type="button" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Mettre le diaporama en pause' : 'Lancer le diaporama'}>{playing ? <Pause size={18} /> : <Play size={18} />}</button>}
      <button className="icon-button" type="button" onClick={() => go(index - 1)} aria-label="Photo de Noël précédente"><ArrowLeft size={21} /></button>
      <button className="icon-button" type="button" onClick={() => go(index + 1)} aria-label="Photo de Noël suivante"><ArrowRight size={21} /></button>
    </div></div>
    <div className="gallery-thumbnails">{photos.map((photo, i) => <button type="button" key={photo.src} aria-label={`Afficher la photo de Noël ${i + 1}`} aria-pressed={i === index} onClick={() => go(i)}><img src={photo.src} alt="" width="100" height="75" loading="lazy" /></button>)}</div>
  </div>;
}
