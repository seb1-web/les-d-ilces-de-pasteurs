'use client';

import { useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';

const photographs = [
  { id: 'Noel1', width: 900, height: 1600, category: 'christmas', alt: 'Éclairs et petites bûches dans la vitrine décorée pour Noël', keywords: 'noël pâtisseries chocolat vanille framboise bûche vitrine décorations' },
  { id: 'Noel2', width: 900, height: 1600, category: 'christmas', alt: 'Trophée de la boulangerie entouré de pains d’épices et de décorations de Noël', keywords: 'noël trophée prix pain épices flocon décoration' },
  { id: 'Noel3', width: 900, height: 1600, category: 'christmas', alt: 'Guirlandes de Noël, confiseries et pains d’épices dans la boutique', keywords: 'noël guirlandes confiseries pain épices boutique décoration' },
  { id: '15', width: 1800, height: 2700, category: 'counter', alt: 'Croissants, pains au chocolat et pains aux raisins au comptoir', keywords: 'viennoiseries croissant pain chocolat raisins comptoir' },
  { id: '26', width: 1800, height: 1596, category: 'counter', alt: 'Assortiment de pâtisseries, éclairs et tartes aux fruits dans la vitrine', keywords: 'pâtisseries éclair tarte fruits fraises framboises citron chocolat vitrine comptoir' },
];
const categories = [
  { id: 'all', label: 'Toutes les photos' },
  { id: 'christmas', label: 'Noël' },
  { id: 'counter', label: 'Au comptoir' },
];
const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr').trim();

export default function JournalGallery() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const search = normalize(query);
  const filtered = photographs.filter((photo) => (category === 'all' || photo.category === category) && normalize(`${photo.alt} ${photo.keywords}`).includes(search));
  const reset = () => { setCategory('all'); setQuery(''); };

  return (
    <>
      <div className="journal-filters">
        <div className="journal-filter-buttons" role="group" aria-label="Filtrer les photos par thème">
          {categories.map((item) => (
            <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>
              {item.label}<span aria-hidden="true">{photographs.filter((photo) => item.id === 'all' || photo.category === item.id).length}</span>
            </button>
          ))}
        </div>
        <div className="journal-search">
          <label htmlFor="journal-search">Rechercher une photo</label>
          <div>
            <Search size={18} aria-hidden="true" />
            <input id="journal-search" type="search" placeholder="Noël, croissant, pâtisserie…" value={query} onChange={(event) => setQuery(event.target.value)} />
            {query && <button type="button" aria-label="Effacer la recherche" onClick={() => setQuery('')}><X size={18} aria-hidden="true" /></button>}
          </div>
        </div>
      </div>
      <p className="journal-results-count" role="status">{filtered.length} photo{filtered.length > 1 ? 's' : ''}</p>
      {filtered.length ? (
        <div className="journal-photo-grid">
          {filtered.map((photo) => (
            <a key={photo.id} className="journal-photo" href={`/Images/optimized/${photo.id}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`Agrandir : ${photo.alt} (nouvel onglet)`}>
              <img src={`/Images/optimized/${photo.id}.webp`} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" />
              <span className="journal-photo-open" aria-hidden="true"><ArrowUpRight size={20} /></span>
            </a>
          ))}
        </div>
      ) : (
        <div className="journal-empty">
          <h3>Aucune photo trouvée</h3>
          <p>Essayez un autre mot ou affichez toute la galerie.</p>
          <button className="button button-secondary" type="button" onClick={reset}>Réinitialiser les filtres</button>
        </div>
      )}
    </>
  );
}
