import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import { business } from '@/lib/business';
import MenuExplorer from './MenuExplorer';
import './menu.css';

export const metadata: Metadata = {
  title: 'Notre carte',
  description: 'Pains, viennoiseries, pâtisseries, sandwichs et boissons des Délices de Pasteur. Consultez la carte et les prix de notre boulangerie à Paris 15e.',
};

export default function MenuPage() {
  return (
    <>
      <section className="page-intro menu-intro" aria-labelledby="menu-title">
        <div className="wrap menu-intro-grid">
          <div className="menu-intro-copy">
            <p className="eyebrow">Les Délices de Pasteur · Paris 15e</p>
            <h1 id="menu-title">Notre carte</h1>
            <p className="menu-lead">Du premier croissant au dessert à partager.</p>
            <p className="menu-intro-detail">Pains au levain, viennoiseries, pâtisseries et pause déjeuner. Retrouvez vos envies du jour, puis passez nous voir en boutique.</p>
            <a href={business.phoneHref} className="text-link">
              Commander par téléphone <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="menu-intro-photo">
            <img src="/Images/optimized/15.webp" alt="Viennoiseries des Délices de Pasteur" width="800" height="600" fetchPriority="high" />
          </div>
        </div>
      </section>
      <Suspense fallback={<div className="wrap menu-loading" role="status">Chargement de la carte…</div>}>
        <MenuExplorer />
      </Suspense>
      <section className="menu-visit" aria-labelledby="menu-visit-title">
        <div className="wrap menu-visit-grid">
          <div>
            <p className="eyebrow">À votre écoute</p>
            <h2 id="menu-visit-title">Une commande, une question ?</h2>
            <p>Pour connaître les disponibilités, préparer une commande ou vous renseigner sur les allergènes, appelez directement la boutique.</p>
          </div>
          <a href={business.phoneHref} className="button button-primary"><Phone size={18} aria-hidden="true" /> {business.phone}</a>
        </div>
      </section>
    </>
  );
}
