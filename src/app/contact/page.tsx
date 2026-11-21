import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Clock3, MapPin, Phone } from 'lucide-react';
import { business, hours } from '@/lib/business';
import ContactMap from './ContactMap';
import './contact.css';

export const metadata: Metadata = {
  title: 'Contact & horaires',
  description: 'Retrouvez Les Délices de Pasteur au 37 boulevard Pasteur, Paris 15e. Adresse, horaires, téléphone et itinéraire pour préparer votre visite.',
};

export default function ContactPage() {
  return (
    <>
      <section className="page-intro contact-intro">
        <div className="wrap">
          <p className="eyebrow">La boulangerie · Paris 15e</p>
          <div className="contact-intro-grid">
            <h1>On se retrouve<br />boulevard Pasteur.</h1>
            <div className="contact-intro-note">
              <p>Une baguette pour la maison, une pause gourmande ou un gâteau à partager. Passez nous voir.</p>
              <a className="text-link" href={business.mapsUrl} target="_blank" rel="noopener noreferrer">Préparer mon itinéraire <ArrowUpRight size={19} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-visit" aria-labelledby="contact-address-title">
        <div className="wrap contact-visit-grid">
          <div className="contact-address-panel">
            <div className="contact-section-label"><MapPin size={19} aria-hidden="true" /><h2 id="contact-address-title">Notre adresse</h2></div>
            <address className="contact-address">{business.address}<br />{business.postalCode} {business.city}</address>
            <p className="contact-address-description">Les Délices de Pasteur, votre boulangerie-pâtisserie de quartier.</p>
            <a className="button button-primary" href={business.mapsUrl} target="_blank" rel="noopener noreferrer">Venir à la boulangerie <ArrowUpRight size={19} aria-hidden="true" /></a>
            <div className="contact-phone-block">
              <span><Phone size={18} aria-hidden="true" /> Pour nous joindre</span>
              <a href={business.phoneHref}>{business.phone}</a>
              <p>Pour une commande spéciale, appelez directement la boutique.</p>
            </div>
          </div>
          <ContactMap />
        </div>
      </section>
      <section className="contact-details" aria-labelledby="contact-hours-title">
        <div className="wrap contact-details-grid">
          <div>
            <div className="contact-section-label"><Clock3 size={19} aria-hidden="true" /><span>Préparer votre visite</span></div>
            <h2 className="section-heading" id="contact-hours-title">Les horaires<br />de la boutique.</h2>
            <p className="contact-hours-note">Pour les horaires des jours fériés, appelez la boutique.</p>
          </div>
          <dl className="contact-hours">
            {hours.map(({ days, time }) => (<div key={days}><dt>{days}</dt><dd>{time}</dd></div>))}
          </dl>
        </div>
      </section>
      <section className="contact-faq" aria-labelledby="contact-questions-title">
        <div className="wrap contact-details-grid">
          <div>
            <p className="eyebrow">Quelques informations utiles</p>
            <h2 className="section-heading" id="contact-questions-title">Avant de passer.</h2>
          </div>
          <div className="contact-answers">
            <div>
              <h3>Une commande pour une occasion ?</h3>
              <p>Pour un gâteau, un assortiment ou une demande particulière, échangez avec l’équipe par téléphone ou directement en boutique.</p>
              <a className="text-link" href={business.phoneHref}>Appeler la boutique <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
            <div>
              <h3>Une question sur les ingrédients ?</h3>
              <p>Notre équipe vous renseignera sur la composition des produits et les allergènes avant votre achat.</p>
              <Link className="text-link" href="/menu">Consulter la carte <ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>
            <div>
              <h3>Les nouveautés de la boulangerie ?</h3>
              <p>Retrouvez les publications de la boutique et nos créations du moment sur notre page Facebook.</p>
              <a className="text-link" href={business.facebookUrl} target="_blank" rel="noopener noreferrer">Voir notre page Facebook <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
