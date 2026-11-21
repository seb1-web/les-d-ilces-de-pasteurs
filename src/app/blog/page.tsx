import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Snowflake } from 'lucide-react';
import { business } from '@/lib/business';
import JournalGallery from './JournalGallery';
import './blog.css';

export const metadata: Metadata = {
  title: 'Actualités de la boulangerie',
  description: 'Les créations et l’ambiance des Délices de Pasteur en images. Retrouvez aussi les nouvelles de la boutique sur sa page Facebook.',
};

export default function BlogPage() {
  return (
    <>
      <section className="page-intro journal-intro">
        <div className="wrap">
          <p className="eyebrow">Au fil des saisons</p>
          <h1>La vie de la boulangerie.</h1>
          <div className="journal-intro-bottom">
            <p>Des créations du quotidien aux douceurs des fêtes, un aperçu de notre boutique du boulevard Pasteur.</p>
            <a className="text-link" href={business.facebookUrl} target="_blank" rel="noopener noreferrer">Suivre nos actualités <ArrowUpRight size={19} aria-hidden="true" /></a>
          </div>
        </div>
      </section>
      <section className="journal-season" aria-labelledby="journal-christmas-title">
        <div className="wrap journal-season-grid">
          <div className="journal-season-copy">
            <Snowflake size={30} strokeWidth={1.25} aria-hidden="true" />
            <h2 className="section-heading" id="journal-christmas-title">Noël s’invite<br />à la boutique.</h2>
            <p>Les décorations sont de sortie. Retrouvez l’atmosphère des fêtes dans les photographies de la boulangerie.</p>
            <p>Pour connaître les créations disponibles ou préparer une commande de fête, contactez notre équipe.</p>
            <Link className="button button-primary" href="/contact">Contacter la boutique <ArrowUpRight size={19} aria-hidden="true" /></Link>
          </div>
          <div className="journal-season-photo">
            <img src="/Images/optimized/Noel4.webp" alt="Bûches, pains d’épices et cadeaux disposés près du sapin de Noël de la boulangerie" width="900" height="1600" />
          </div>
        </div>
      </section>
      <section className="journal-gallery" aria-labelledby="journal-gallery-title">
        <div className="wrap">
          <div className="journal-section-head">
            <h2 className="section-heading" id="journal-gallery-title">La maison en images.</h2>
            <p>Les photographies de notre boutique.</p>
          </div>
          <JournalGallery />
        </div>
      </section>
      <section className="journal-follow" aria-labelledby="journal-follow-title">
        <div className="wrap journal-follow-inner">
          <div>
            <p className="eyebrow">Les nouvelles de la boutique</p>
            <h2 className="section-heading" id="journal-follow-title">Rendez-vous sur Facebook.</h2>
            <p>Pour retrouver nos dernières publications, les nouveautés et les informations de la boulangerie.</p>
          </div>
          <a className="button button-secondary" href={business.facebookUrl} target="_blank" rel="noopener noreferrer">Voir les publications <ArrowUpRight size={19} aria-hidden="true" /></a>
        </div>
      </section>
    </>
  );
}
