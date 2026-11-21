import Link from 'next/link';
import { ArrowRight, ArrowUpRight, MapPin, Phone, TreePine, Award, Wheat } from 'lucide-react';
import ChristmasCarousel from '@/components/ChristmasCarousel';
import PhotoMoment from '@/components/PhotoMoment';
import { business, hours } from '@/lib/business';

const creations = [
  { name: 'Les pains', detail: 'Le levain, le temps, la croûte.', image: '11', alt: 'Pains de campagne et pains au levain dans la boutique', category: 'bread' },
  { name: 'Les viennoiseries', detail: 'Les petits plaisirs du matin.', image: '7', alt: 'Croissant doré au beurre', category: 'viennoiseries' },
  { name: 'Les pâtisseries', detail: 'Une douceur, à chaque envie.', image: '12', alt: 'Tartelette aux framboises fraîches', category: 'pastry' },
  { name: 'La pause déjeuner', detail: 'Du fait maison, même à midi.', image: '29', alt: 'Sandwichs préparés dans la boulangerie', category: 'sandwiches' },
];

export default function HomePage() {
  return <>
    <section className="home-hero" aria-labelledby="home-title" data-enter>
      <div className="hero-photograph"><img src="/Images/optimized/16.webp" alt="Le comptoir des Délices de Pasteur, ses pains et ses viennoiseries" width="1800" height="1200" fetchPriority="high" data-source="client" data-subject="Comptoir de la boulangerie" /></div>
      <div className="wrap hero-copy">
        <div><p className="eyebrow">Les Délices de Pasteur</p><h1 id="home-title">Votre boulangerie<br />au cœur de Paris 15e.</h1></div>
        <div className="hero-introduction"><p>Pains au levain, feuilletages dorés et pâtisseries maison. Le rendez-vous gourmand du boulevard Pasteur.</p><Link href="/menu" className="button button-primary">Voir la carte <ArrowUpRight size={20} aria-hidden="true" /></Link></div>
      </div>
    </section>

    <section id="adresses" className="home-visit section-space" aria-labelledby="visit-title">
      <div className="wrap">
        <div className="section-heading"><div><p className="eyebrow">La boutique</p><h2 id="visit-title">Votre adresse de quartier.</h2></div><Link className="text-link" href="/contact">Préparer ma visite <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        <div className="visit-grid">
          <div className="visit-copy"><MapPin size={24} strokeWidth={1.4} aria-hidden="true" /><address>{business.address}<br />Paris, 15e arrondissement</address><p>Du pain pour la table, un croissant en chemin, un gâteau à partager. Lionel, Estelle et leur équipe vous accueillent en boutique.</p><dl className="opening-hours">{hours.map(row => <div key={row.days}><dt>{row.days}</dt><dd>{row.time}</dd></div>)}</dl><a href={business.phoneHref} className="text-link"><Phone size={17} aria-hidden="true" /> {business.phone}</a></div>
          <figure className="visit-photo"><img src="/Images/optimized/20.webp" alt="La façade et l’entrée de la boulangerie, boulevard Pasteur" width="1200" height="1500" loading="lazy" data-source="client" data-subject="Façade de la boutique" /></figure>
        </div>
      </div>
    </section>

    <section id="creations" className="home-creations section-space" aria-labelledby="creations-title">
      <div className="wrap"><div className="section-heading"><div><p className="eyebrow">Du fournil à la vitrine</p><h2 id="creations-title">À chaque moment, son délice.</h2></div><Link className="text-link" href="/menu">Toute la carte <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        <div className="creations-grid">{creations.map((item, i) => <Link key={item.category} href={`/menu?category=${item.category}`} className="creation-card"><div className="creation-photo"><img src={`/Images/optimized/${item.image}.webp`} alt={item.alt} width="700" height="900" loading="lazy" data-source="client" data-subject={item.name} /></div><div className="creation-info"><span className="creation-index">0{i + 1}</span><div><h3>{item.name}</h3><p>{item.detail}</p></div><ArrowUpRight size={21} strokeWidth={1.4} aria-hidden="true" /></div></Link>)}</div>
      </div>
    </section>

    <section id="noel" className="home-christmas section-space" aria-labelledby="christmas-title"><div className="wrap christmas-grid">
      <div className="christmas-copy"><TreePine size={34} strokeWidth={1.2} aria-hidden="true" /><p className="eyebrow">Les fêtes à la maison</p><h2 id="christmas-title">Un air de Noël<br />chez Pasteur.</h2><p>Le sapin est installé, les guirlandes habillent la boutique. Retrouvez nos créations et les petits détails qui font la magie des fêtes.</p><p>Pour vos envies de fin d’année, échangeons directement en boutique ou par téléphone.</p><a href={business.phoneHref} className="button button-light">Appeler la boutique <ArrowUpRight size={18} aria-hidden="true" /></a><span className="christmas-signature">Joyeuses fêtes</span></div>
      <ChristmasCarousel />
    </div></section>

    <section id="histoire" className="home-story section-space" aria-labelledby="story-title"><div className="wrap">
      <div className="section-heading"><div><p className="eyebrow">Une histoire de rencontre</p><h2 id="story-title">Lionel, Estelle.<br />Et le goût du métier.</h2></div></div>
      <div className="story-grid"><div className="story-copy"><p className="story-lead">Une maison portée par deux artisans et toute une équipe.</p><p>Lionel et Estelle se sont rencontrés en travaillant en boulangerie. Lui au fournil, compagnon du devoir. Elle en boutique, au contact des clients. De cette rencontre sont nés Les Délices de Pasteur.</p><p>Aujourd’hui, ils travaillent chaque jour aux côtés de leur équipe : plus de vingt variétés de pains, du levain naturel, des farines sélectionnées et un pain du mois.</p><div className="award-note"><Award size={30} strokeWidth={1.3} aria-hidden="true" /><div><strong>La Petite Meule, récompensée.</strong><p>2e prix au concours du Meilleur Pain Bio d’Île-de-France 2023.</p></div></div><Link className="text-link" href="/blog">Voir la vie de la maison <ArrowUpRight size={18} aria-hidden="true" /></Link></div><PhotoMoment className="story-photo"><img src="/Images/optimized/34.webp" alt="L’équipe des Délices de Pasteur réunie devant la boutique" width="1200" height="1400" loading="lazy" data-source="client" data-subject="L’équipe de la boulangerie" /></PhotoMoment></div>
    </div></section>

    <section className="home-journal section-space" aria-labelledby="journal-title"><div className="wrap"><div className="section-heading"><div><p className="eyebrow">Les nouvelles du boulevard</p><h2 id="journal-title">La maison, au quotidien.</h2></div><a className="text-link" href={business.facebookUrl} target="_blank" rel="noopener noreferrer">Nous suivre sur Facebook <ArrowUpRight size={18} aria-hidden="true" /></a></div><div className="daily-photos">{[{ id: '17', alt: 'Les pains aux graines dans la boutique' }, { id: '19', alt: 'Assortiment de pâtisseries maison' }, { id: '33', alt: 'Accueil derrière le comptoir de la boulangerie' }].map(photo => <a key={photo.id} href={business.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label={`${photo.alt} — retrouver la boutique sur Facebook`}><img src={`/Images/optimized/${photo.id}.webp`} alt={photo.alt} width="800" height="800" loading="lazy" data-source="client" data-subject={photo.alt} /><span className="photo-link-icon"><ArrowUpRight size={21} aria-hidden="true" /></span></a>)}</div><div className="journal-bottom"><Wheat size={22} strokeWidth={1.3} aria-hidden="true" /><p>Nos créations, notre équipe, notre boutique. Tout simplement.</p><Link href="/blog" className="text-link">Ouvrir le journal <ArrowRight size={18} aria-hidden="true" /></Link></div></div></section>
  </>;
}
