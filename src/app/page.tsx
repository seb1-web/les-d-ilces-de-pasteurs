'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import boulangerie2 from "../assets/img/boulangerie2.png";
const MotionImage = motion.img;
import {
  Menu,
  X,
  Star,
  Award,
  Heart,
  Users,
  ShoppingCart,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Phone,
  Mail,
  Clock,
  ChefHat,
  Wheat,
  Leaf,
  Shield
} from 'lucide-react';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bakery-beige)]">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
            <div className="flex items-center">
                  <Link href="/" className="block">
                    <motion.img
                      src={boulangerie2.src}
                      alt="Les Délices de Pasteur"
                      className="h-[150px] w-auto object-contain cursor-pointer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                  </Link>
                </div>
                </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#creations" className="text-[var(--bakery-dark)] hover:text-[var(--bakery-brown)] transition-colors">
                Créations
              </a>
              <Link href="/menu" className="text-[var(--bakery-dark)] hover:text-[var(--bakery-brown)] transition-colors">
                Menu
              </Link>
              <a href="#histoire" className="text-[var(--bakery-dark)] hover:text-[var(--bakery-brown)] transition-colors">
                Histoire
              </a>
              {/* <Link href="/blog" className="text-[var(--bakery-dark)] hover:text-[var(--bakery-brown)] transition-colors">
                Blog
              </Link> */}
              <Link href="/contact" className="text-[var(--bakery-dark)] hover:text-[var(--bakery-brown)] transition-colors">
                Contact
              </Link>
            </nav>

            {/* CTA Button 
            <div className="hidden lg:block">
              <Button
                className="bg-[var(--bakery-brown)] hover:bg-[var(--bakery-cream)] text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
              >
                <a href="https://www.facebook.com/lesdelicesdepasteur/?locale=fr_FR">Commander</a>
              </Button>
            </div>*/}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-[var(--bakery-dark)]" />
              ) : (
                <Menu className="h-6 w-6 text-[var(--bakery-dark)]" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
              <nav className="py-4 px-4 space-y-4">
                <a href="#creations" className="block text-[var(--bakery-dark)] hover:text-[var(--bakery-brown)]">
                  Créations
                </a>
                <Link href="/menu" className="block text-[var(--bakery-dark)] hover:text-[var(--bakery-brown)]">
                  Menu
                </Link>
                <a href="#histoire" className="block text-[var(--bakery-dark)] hover:text-[var(--bakery-brown)]">
                  Histoire
                </a>
                {/* <Link href="/blog" className="block text-[var(--bakery-dark)] hover:text-[var(--bakery-brown)]">
                  Blog
                </Link> */}
                <Link href="/contact" className="block text-[var(--bakery-dark)] hover:text-[var(--bakery-brown)]">
                  Contact
                </Link>
                {/*<Button className="w-full bg-[var(--bakery-brown)] hover:bg-[var(--bakery-cream)] text-white">
                  Commander
                </Button> */}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url("/Images/32.jpg")`,
        }}
      />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[var(--bakery-brown)]/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl script-font mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              Artisan Boulanger Pâtissier
            </motion.h1>
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <MotionImage
                src={boulangerie2.src}   // ✅ string
                alt="Les Délices de Pasteur"
                className="mx-auto max-h-80 w-auto object-contain invert drop-shadow"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product Showcase */}
      <section id="creations" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl serif-font font-bold text-[var(--bakery-dark)] mb-4">
              Notre Savoir-Faire Artisanal
            </h2>
            <div className="w-24 h-1 bg-[var(--bakery-brown)] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="scale-hover overflow-hidden h-full">
                <div className="relative h-64">
                  <img
                    src="/Images/26.jpg"
                    alt="Tarte aux fraises"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[var(--bakery-dark)] mb-2">
                    Pâtisseries Artisanales
                  </h3>
                  <p className="text-gray-600">
                    Des créations uniques réalisées chaque jour avec passion et savoir-faire traditionnel.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="scale-hover overflow-hidden h-full">
                <div className="relative h-64">
                  <img
                    src="https://ext.same-assets.com/620863710/4008851700.jpeg"
                    alt="Pain artisanal"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[var(--bakery-dark)] mb-2">
                    Pains Traditionnels
                  </h3>
                  <p className="text-gray-600">
                    Pains au levain naturel, fabriqués selon des méthodes ancestrales pour un goût authentique.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="scale-hover overflow-hidden h-full">
                <div className="relative h-64">
                  <img
                    src="/Images/15.jpg"
                    alt="Viennoiseries"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[var(--bakery-dark)] mb-2">
                    Viennoiseries
                  </h3>
                  <p className="text-gray-600">
                    Croissants, pains au chocolat et brioches dorées, préparés avec du beurre de qualité.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 lg:py-24 bg-[var(--bakery-beige)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div
                className="w-16 h-16 bg-[var(--bakery-brown)] rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <ChefHat className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold text-[var(--bakery-dark)] mb-2">
                Authentique
              </h3>
              <p className="text-gray-600">
                Méthode de fabrication ancestrale grâce à la maîtrise du levain naturel dans chacune des recettes.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div
                className="w-16 h-16 bg-[var(--bakery-brown)] rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Award className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold text-[var(--bakery-dark)] mb-2">
                Excellence
              </h3>
              <p className="text-gray-600">
                Des recettes garanties par le savoir-faire de Lionel ODIC et son équipe. Fraîcheur garantie.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div
                className="w-16 h-16 bg-[var(--bakery-brown)] rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Users className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold text-[var(--bakery-dark)] mb-2">
                Accessible À Tous
              </h3>
              <p className="text-gray-600">
                Venez savourer nos délicieuses créations directement sur place et profitez d’une expérience gustative unique.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div
                className="w-16 h-16 bg-[var(--bakery-brown)] rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Leaf className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold text-[var(--bakery-dark)] mb-2">
                Engagé
              </h3>
              <p className="text-gray-600">
                Contrôlé et certifié fabriquant de produits bio depuis 2018. Adhérent au "manger local".
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section id="histoire" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-up">
              <h2 className="text-3xl lg:text-4xl serif-font font-bold text-[var(--bakery-dark)] mb-6">
                Une boulangerie née d’une rencontre et d’un vrai savoir-faire
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Lionel et Estelle se sont connus en travaillant ensemble en boulangerie il y a plus de quinze ans. Lui, compagnon du devoir et maître du fournil. 
                L’autre, responsable de boutique, gestion, vente et relation client. Leur entente et leur confiance les ont poussés à ouvrir leur propre boulangerie sur le boulevard Pasteur, 
                après une première expérience compliquée avec des investisseurs.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Aujourd’hui, ils travaillent dans leur boutique au quotidien, aux côtés de leur équipe. Leur signature : plus de vingt pains faits maison, du levain naturel,
                des farines sélectionnées, une Petite Meule primée, un pain du mois et une vraie exigence sur la qualité sans faire flamber les prix. Leur force, c’est l’engagement,
                le goût, la proximité et le sérieux sans prétention.
                Ici, on ne fait pas du pain pour remplir les vitrines, mais pour faire plaisir aux gens.
              </p>
              <Button
                variant="outline"
                className="border-[var(--bakery-brown)] text-[var(--bakery-brown)] hover:bg-[var(--bakery-brown)] hover:text-white"
              >
                En Savoir Plus
              </Button>
            </div>
            <div className="relative">
              <img
                src="/Images/34.jpg"
                alt="Histoire de la boulangerie"
                className="w-full rounded-lg shadow-lg scale-hover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="adresses" className="py-16 lg:py-24 bg-[var(--bakery-beige)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl lg:text-4xl serif-font font-bold text-[var(--bakery-dark)] mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Notre Boulangerie
            </motion.h2>
            <div className="w-24 h-1 bg-[var(--bakery-brown)] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-600 mb-8">
                Notre boulangerie est née d’une rencontre et d’un vrai savoir-faire artisanal. Tous nos pains et créations sont 100 % faits maison,
                avec des ingrédients de qualité et des méthodes traditionnelles. Plus de vingt variétés de pains, dont notre Petite Meule primée, 
                allient goût, rigueur et accessibilité. Ici, le fait maison et la proximité avec nos clients sont au cœur de tout ce que nous faisons.
              </p>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="h-6 w-6 text-[var(--bakery-brown)] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[var(--bakery-dark)] mb-1">Les delices de Pasteur</h4>
                    <p className="text-gray-600">37, Bd Pasteur 75015 Paris</p>
                    <p className="text-sm text-[var(--bakery-brown)]"> • Métro Lercourbe</p>
                  </div>
                </motion.div>

                
              </div>

              
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/Images/10.jpg"
                  alt="Boulangerie Mouffetard"
                  className="w-full h-48 object-cover rounded-lg shadow-lg scale-hover"
                />
                <img
                  src="/Images/25.jpg"
                  alt="Boulangerie Blanqui"
                  className="w-full h-48 object-cover rounded-lg shadow-lg scale-hover mt-8"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Customer Reviews */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl serif-font font-bold text-[var(--bakery-dark)] mb-4">
              Vos Avis
            </h2>
            <div className="w-24 h-1 bg-[var(--bakery-brown)] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="scale-hover">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="mr-3">
                    <AvatarFallback>BP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Bib Paris</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Très belle découverte à l'occasion d'un rdv dans le quartier Mouffetard, les pâtisseries sont raffinées..."
                </p>
              </CardContent>
            </Card>

            <Card className="scale-hover">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="mr-3">
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Armand Nac</p>
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Une bonne boulangerie, le personnel sympathique et avenant, la nourriture est un peu cher mais de bonne qualité..."
                </p>
              </CardContent>
            </Card>

            <Card className="scale-hover">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="mr-3">
                    <AvatarFallback>LB</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Laurent Bee</p>
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Des pains et des viennoiseries succulents, des pâtisseries, des salades et des salés délicieux..."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 lg:py-24 bg-[var(--bakery-beige)] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://ext.same-assets.com/620863710/4008851700.jpeg')`
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg float-animation">
                <Wheat className="h-16 w-16 text-[var(--bakery-brown)]" />
              </div>
              <div className="w-40 h-40 bg-[var(--bakery-brown)] rounded-full flex items-center justify-center shadow-lg">
                <div className="text-center text-white">
                  <Award className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-sm font-semibold">2eme Prix</p>
                  <p className="text-xs">Meilleur Pain Bio</p>
                </div>
              </div>
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg float-animation">
                <Wheat className="h-16 w-16 text-[var(--bakery-brown)]" />
              </div>
            </div>
            <h3 className="text-2xl lg:text-3xl serif-font font-bold text-[var(--bakery-dark)] mb-4">
              Récompenses & Distinctions
            </h3>
            <p className="text-lg text-gray-600">
              2eme prix au Concours du Meilleur Pain Bio d'Ile de France 2023
            </p>
          </div>
        </div>
      </section>

      {/* Facebook Feed Section */}
<section className="py-16 lg:py-24 bg-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <motion.h2
        className="text-3xl lg:text-4xl serif-font font-bold text-[var(--bakery-dark)] mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Suivez-nous sur Facebook
      </motion.h2>

      <div className="w-24 h-1 bg-[var(--bakery-brown)] mx-auto mb-6"></div>
      <p className="text-lg text-gray-600 mb-8">
        Découvrez nos dernières publications et l’ambiance de notre boulangerie !
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <a
  href="https://www.facebook.com/lesdelicesdepasteur/?locale=fr_FR"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button
    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
  >
    <Facebook className="mr-2 h-5 w-5" />
    @lesdelicesdepasteur
  </Button>
</a>
      </motion.div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {[
        '/Images/17.jpg',
        '/Images/21.jpg',
        '/Images/27.jpg',
        '/Images/29.jpg',
        '/Images/19.jpg',
        '/Images/33.jpg'
      ].map((image, index) => (
        <motion.div
          key={index}
          className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={image}
            alt={`Facebook post ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span className="text-sm">{[127, 89, 156, 203, 94, 175][index]}</span>
                </div>
                <Facebook className="h-5 w-5" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-[var(--bakery-dark)] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl serif-font font-bold mb-4">Les Delices de Pasteur</h3>
              <p className="text-gray-300 mb-4">
                Artisan boulanger pâtissier depuis 2009
              </p>
              <div className="flex space-x-4">
                
                <Facebook className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Adresse</h4>
              <div className="space-y-2 text-gray-300">
                
                <a
                  href="https://share.google/T4oqxcSeblsS93gCU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start hover:text-white transition-colors cursor-pointer"
                >
                  <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  37, Bd Pasteur <br />75015 Paris
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  01 43 06 37 53
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Horaires</h4>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Lun-Sam: 6h30-20h
                </p>
                <p className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Jeu: Ferme
                </p>
                <p className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Dim: 7h-19h
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-700" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 mb-4 md:mb-0">
              © 2024 Boulangerie Les Delices de Pasteur. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-gray-300">
              <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
              <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
