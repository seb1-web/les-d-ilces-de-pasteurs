import type { Metadata, Viewport } from 'next';
import { EB_Garamond, Jost } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import ChristmasFooter from '@/components/ChristmasFooter';
import './globals.css';

const display = EB_Garamond({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });
const text = Jost({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Les Délices de Pasteur — Boulangerie artisanale à Paris 15e', template: '%s | Les Délices de Pasteur' },
  description: 'Pains au levain, viennoiseries et pâtisseries maison. Retrouvez Les Délices de Pasteur au 37 boulevard Pasteur, Paris 15e. Carte, horaires et créations de Noël.',
  openGraph: { title: 'Les Délices de Pasteur', description: 'Boulangerie et pâtisserie artisanales, boulevard Pasteur à Paris.', locale: 'fr_FR', type: 'website', images: [{ url: '/Images/optimized/16.webp', width: 1800, height: 1200 }] },
  twitter: { card: 'summary_large_image' },
  other: { 'page-type': 'place', 'site-kind': 'other', 'page-kind': 'place' },
  icons: { icon: '/icon.svg' },
};
export const viewport: Viewport = { themeColor: '#faf9f9', width: 'device-width', initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr" data-type="place" className={`${display.variable} ${text.variable}`}><body><SiteHeader /><main id="main-content" tabIndex={-1}>{children}</main><ChristmasFooter /></body></html>;
}
