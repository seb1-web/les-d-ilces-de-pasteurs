import Link from 'next/link';
import { ArrowUpRight, TreePine } from 'lucide-react';
import { business, hours } from '@/lib/business';
export default function ChristmasFooter() {
  return <footer className="site-footer"><div className="wrap">
    <div className="footer-invitation"><div><span className="eyebrow">Au plaisir de vous accueillir</span><h2>À bientôt, boulevard Pasteur.</h2></div><a className="button button-light" href={business.mapsUrl} target="_blank" rel="noopener noreferrer">Préparer ma visite <ArrowUpRight size={19} aria-hidden="true" /></a></div>
    <div className="footer-columns">
      <div className="footer-brand"><Link href="/" aria-label="Les Délices de Pasteur, accueil"><img src="/Images/optimized/logo_V_Noel_Photoroom.webp" width="700" height="350" alt="Les Délices de Pasteur, décor de Noël" loading="lazy" /></Link><p>Boulangerie & pâtisserie artisanales<br />Paris, 15e arrondissement</p></div>
      <div><h3>La boutique</h3><a className="footer-address" href={business.mapsUrl} target="_blank" rel="noopener noreferrer">{business.address}<br />{business.postalCode} {business.city}</a><a href={business.phoneHref}>{business.phone}</a><a href={business.facebookUrl} target="_blank" rel="noopener noreferrer">Facebook <ArrowUpRight size={14} aria-hidden="true" /></a></div>
      <div><h3>Les horaires</h3><dl className="footer-hours">{hours.map(row => <div key={row.days}><dt>{row.days}</dt><dd>{row.time}</dd></div>)}</dl><p className="hours-confirmation">Horaires à confirmer auprès de la boutique.</p></div>
      <div><h3>À découvrir</h3><Link href="/menu">Notre carte</Link><Link href="/#noel">Noël à la boutique</Link><Link href="/#histoire">L’histoire de la maison</Link><Link href="/blog">Le journal</Link><Link href="/contact">Contact & accès</Link></div>
    </div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Les Délices de Pasteur</p><p><TreePine size={16} aria-hidden="true" /> Joyeuses fêtes, de notre maison à la vôtre.</p></div>
  </div></footer>;
}
