'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X, TreePine, Phone } from 'lucide-react';
import { business } from '@/lib/business';

const links = [{ href: '/menu', label: 'La carte' }, { href: '/#histoire', label: 'La maison' }, { href: '/#noel', label: 'Noël à la boutique' }, { href: '/contact', label: 'Nous trouver' }];
export default function SiteHeader() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const setOpen = (value: boolean) => setMenuPath(value ? pathname : null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuPath(null); trigger.current?.focus(); }
      if (event.key === 'Tab') {
        const items = [trigger.current, ...Array.from(panel.current?.querySelectorAll<HTMLElement>('a,button') ?? [])].filter(Boolean) as HTMLElement[];
        const current = items.indexOf(document.activeElement as HTMLElement);
        if (event.shiftKey && current === 0) { event.preventDefault(); items.at(-1)?.focus(); }
        else if (!event.shiftKey && current === items.length - 1) { event.preventDefault(); items[0]?.focus(); }
      }
    };
    const wide = window.matchMedia('(min-width: 1024px)');
    const resize = () => { if (wide.matches) setMenuPath(null); };
    wide.addEventListener('change', resize);
    document.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = old; document.removeEventListener('keydown', keydown); wide.removeEventListener('change', resize); };
  }, [open]);
  function close() { setOpen(false); trigger.current?.focus(); }
  return <header className="site-header">
    <a className="skip-link" href="#main-content">Aller au contenu</a>
    <div className="season-note"><TreePine size={14} aria-hidden="true" /><span>La maison se pare de Noël</span><span className="season-location">37 boulevard Pasteur · Paris 15e</span></div>
    <div className="wrap header-row">
      <Link href="/" className="brand" aria-label="Les Délices de Pasteur, accueil" onClick={() => setOpen(false)}><img src="/Images/optimized/logo_V2_Noel.webp" width="700" height="250" alt="Les Délices de Pasteur" /></Link>
      <nav className="desktop-nav" aria-label="Navigation principale">{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>{link.label}</Link>)}</nav>
      <a href={business.phoneHref} className="header-call"><Phone size={16} aria-hidden="true" /><span>Appeler la boutique</span><ArrowUpRight size={16} aria-hidden="true" /></a>
      <button ref={trigger} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    <div id="mobile-navigation" ref={panel} className="mobile-navigation" hidden={!open}>
      <nav aria-label="Navigation mobile">{links.map((link, i) => <Link key={link.href} href={link.href} onClick={close}><span className="nav-number">0{i + 1}</span>{link.label}<ArrowUpRight size={22} aria-hidden="true" /></Link>)}</nav>
      <div className="mobile-nav-contact"><p>{business.address}<br />{business.postalCode} {business.city}</p><a className="button button-primary" href={business.phoneHref} onClick={close}>Appeler la boutique <Phone size={18} aria-hidden="true" /></a></div>
    </div>
  </header>;
}
