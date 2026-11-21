'use client';

import { useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Search, X } from 'lucide-react';
import { menuCategories, type MenuCategoryId } from '@/data/menu';

const filters: { id: 'all' | MenuCategoryId; name: string }[] = [
  { id: 'all', name: 'Toute la carte' },
  { id: 'bread', name: 'Pains' },
  { id: 'viennoiseries', name: 'Viennoiseries' },
  { id: 'pastry', name: 'Pâtisseries' },
  { id: 'sandwiches', name: 'Pause déjeuner' },
  { id: 'drinks', name: 'Boissons' },
];

const euro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr').trim();

export default function MenuExplorer() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const categoryParam = searchParams.get('category');
  const selectedCategory = filters.find((filter) => filter.id === categoryParam)?.id ?? 'all';
  const [query, setQuery] = useState('');
  const searchInput = useRef<HTMLInputElement>(null);
  const normalizedQuery = normalize(query);
  const visibleCategories = menuCategories
    .filter((category) => selectedCategory === 'all' || category.id === selectedCategory)
    .map((category) => ({ ...category, items: category.items.filter((item) => normalize(`${item.name} ${item.description}`).includes(normalizedQuery)) }))
    .filter((category) => category.items.length > 0);
  const resultCount = visibleCategories.reduce((total, category) => total + category.items.length, 0);

  function selectCategory(category: string) {
    if (category === selectedCategory) return;
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'all') params.delete('category');
    else params.set('category', category);
    router.push(`${pathname}${params.size ? `?${params.toString()}` : ''}`, { scroll: false });
  }

  function resetFilters() {
    setQuery('');
    selectCategory('all');
    searchInput.current?.focus();
  }

  return (
    <section className="menu-catalogue" aria-label="Catalogue de la boulangerie">
      <div className="wrap">
        <div className="menu-tools">
          <div className="menu-filters" role="group" aria-label="Filtrer par catégorie">
            {filters.map((filter) => (
              <button key={filter.id} type="button" className="menu-filter" aria-pressed={selectedCategory === filter.id} aria-controls="menu-results" onClick={() => selectCategory(filter.id)}>{filter.name}</button>
            ))}
          </div>
          <div className="menu-search-field">
            <label htmlFor="menu-search">Rechercher dans la carte</label>
            <div className="menu-search-box">
              <Search size={19} aria-hidden="true" />
              <input ref={searchInput} id="menu-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pain, chocolat, tarte…" autoComplete="off" aria-controls="menu-results" />
              {query && <button type="button" className="menu-clear" aria-label="Effacer la recherche" onClick={() => { setQuery(''); searchInput.current?.focus(); }}><X size={18} aria-hidden="true" /></button>}
            </div>
          </div>
        </div>
        <div className="menu-result-line">
          <p role="status" aria-live="polite" aria-atomic="true"><strong>{resultCount}</strong> {resultCount === 1 ? 'création' : 'créations'}{normalizedQuery ? ` pour « ${query.trim()} »` : ' à découvrir'}</p>
          <p>Prix de la carte · Selon disponibilité en boutique</p>
        </div>
        <div id="menu-results" className="menu-results">
          {visibleCategories.length > 0 ? visibleCategories.map((category) => (
            <section className="menu-category" key={category.id} aria-labelledby={`category-${category.id}`}>
              <div className="menu-category-heading">
                <span className="menu-category-number" aria-hidden="true">0{menuCategories.findIndex((item) => item.id === category.id) + 1}</span>
                <h2 id={`category-${category.id}`}>{category.name}</h2>
                <p>{category.description}</p>
                <span className="menu-category-count">{category.items.length} {category.items.length === 1 ? 'création' : 'créations'}</span>
              </div>
              <ul className="menu-items">
                {category.items.map((item) => (
                  <li className="menu-item" key={item.name}>
                    <div className="menu-item-copy">
                      <h3>{item.name.trim()}</h3>
                      <p>{item.description.trim()}</p>
                      {(item.isBio || item.isSignature) && <div className="menu-badges">
                        {item.isBio && <span className="menu-badge">Bio</span>}
                        {item.isSignature && <span className="menu-badge menu-badge-signature">Signature</span>}
                      </div>}
                    </div>
                    <p className={`menu-price${item.price === 0 ? ' menu-price-unknown' : ''}`}>{item.price === 0 ? 'Prix en boutique' : euro.format(item.price)}</p>
                  </li>
                ))}
              </ul>
            </section>
          )) : (
            <div className="menu-empty">
              <Search size={32} strokeWidth={1.4} aria-hidden="true" />
              <h2>Aucune création trouvée</h2>
              <p>Essayez un autre mot ou recherchez dans toute la carte.</p>
              <button type="button" className="button button-primary" onClick={resetFilters}>Réinitialiser la recherche <ArrowRight size={18} aria-hidden="true" /></button>
            </div>
          )}
        </div>
        <p className="menu-note">Les prix sont ceux indiqués dans notre carte. Les produits de saison et leur disponibilité peuvent varier. Pour les allergènes, demandez conseil à notre équipe.</p>
      </div>
    </section>
  );
}
