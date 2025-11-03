'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { id: 'all', name: 'Menu Complet' },
  { id: 'bread', name: 'Pains' },
  { id: 'viennoiseries', name: 'Viennoiseries' },
  { id: 'pastry', name: 'Pâtisseries' },
  { id: 'sandwiches', name: 'Sandwichs & Salades' },
  { id: 'drinks', name: 'Boissons' }
];

const menuCategories = [
  {
    id: 'bread',
    name: 'Nos Pains',
    description: 'Pains artisanaux au levain naturel, cuits au four.',
    items: [
      { name: 'Pain de Meule Bio', description: 'Pain levain longuement fermenté, farine bio locale', price: 3.80, isBio: true, isSignature: true },
      { name: 'Baguette Tradition', description: 'Croûte croustillante, mie alvéolée et goût de noisette', price: 1.20, isBio: false, isSignature: false },
      { name: 'Tradition', description: 'Recette classique à fermentation lente, saveur équilibrée', price: 1.30, isBio: false, isSignature: false },
      { name: 'Baguette', description: 'Baguette fraîche du matin, légère et croustillante', price: 1.10, isBio: false, isSignature: false },
      { name: 'Tradition graines', description: 'Baguette aux graines toastées pour plus de croquant', price: 1.60, isBio: false, isSignature: false },
      { name: 'Pain Complet aux Graines', description: 'Riche en fibres, mélange de graines et farine complète', price: 4.20, isBio: true, isSignature: false },
      { name: 'Pain de Seigle', description: 'Mie dense et parfumée, arômes rustiques de seigle', price: 3.90, isBio: false, isSignature: false },
      { name: 'Pain aux noix', description: 'Pain gourmand aux éclats de noix, parfait avec du fromage', price: 3.50, isBio: false, isSignature: false },
      { name: 'Complet', description: 'Pain complet moelleux, idéal pour le petit-déjeuner', price: 3.50, isBio: false, isSignature: false },
      { name: 'Céréales', description: 'Pain aux céréales variées, goût naturellement toasté', price: 3.50, isBio: false, isSignature: false },
      { name: 'Firano', description: 'Pain spécial à la mie aérienne et croûte dorée', price: 3.50, isBio: false, isSignature: false },
      { name: "L'Artik", description: 'Spécialité artisanale au goût rustique et aromatique', price: 3.50, isBio: false, isSignature: false },
      { name: 'Petit épeautre', description: 'Pain au petit épeautre, saveur douce et légèrement noisettée', price: 4.50, isBio: false, isSignature: false },
      { name: 'Grande Meule', description: 'Gros pain de meule, croûte épaisse et mie parfumée', price: 6.00, isBio: false, isSignature: false },
      { name: 'Petite Meule', description: 'Version individuelle de la meule, parfait pour la maison', price: 3.50, isBio: false, isSignature: false },
      { name: 'Tourte de seigle', description: 'Tourte rustique au seigle, arômes profonds et acidulés', price: 3.50, isBio: false, isSignature: false },
      { name: 'Pain de mie', description: 'Pain moelleux et fin, idéal pour toasts et sandwichs', price: 2.50, isBio: false, isSignature: false },
      { name: 'Pain courges - cranberry', description: 'Pain sucré-salé aux courges et cranberries séchées', price: 3.50, isBio: false, isSignature: false },
      { name: 'Rouge de Bordeaux', description: 'Pain de caractère inspiré des traditions bordelaises', price: 3.50, isBio: false, isSignature: false },
      { name: 'Pain du mois', description: 'Pain spécial saisonnier, change selon l’atelier', price: 3.50, isBio: false, isSignature: false },
      { name: "L'ardéchois", description: 'Spécialité de la région Ardèche, arômes typiques', price: 0.00, isBio: false, isSignature: false },
      { name: 'Petit campagne', description: 'Petit pain campagne, mie rustique et saveur douce', price: 2.50, isBio: false, isSignature: false },
      { name: 'Grand campagne', description: 'Pain campagne familial, croûte épaisse et mie fondante', price: 4.00, isBio: false, isSignature: false },
      { name: 'Flûte', description: 'Pain long et fin, texture légère avec belle croûte', price: 3.00, isBio: false, isSignature: false },
      { name: 'Pavé', description: 'Petit pain rond, mie dense parfaite pour sandwiches', price: 4.00, isBio: false, isSignature: false }
    ]
  },
  {
    id: 'viennoiseries',
    name: 'Viennoiseries',
    description: 'Feuilletages dorés préparés chaque matin avec du beurre AOP',
    items: [
      
      { name: 'Croissant au beurre (à l\'unité)', description: 'Croissant individuel, feuilletage croustillant et fondant', price: 1.30, isBio: true, isSignature: true },
      { name: 'Pain au Chocolat', description: 'Feuilleté garni de deux barres de chocolat', price: 1.30, isBio: true, isSignature: false },
      { name: 'Pain au chocolat (à l\'unité)', description: 'Version classique, fondant au cœur chocolaté', price: 1.40, isBio: false, isSignature: false },
      { name: 'Pain au chocolat aux amandes', description: 'Pain au chocolat garni d\'amandes grillées', price: 2.50, isBio: false, isSignature: false },
      { name: 'Pain aux raisins', description: 'Pâtisserie moelleuse aux raisins et crème pâtissière', price: 2.00, isBio: false, isSignature: false },
      { name: 'Croissant aux amandes', description: 'Croissant fourré crème d’amande et amandes effilées', price: 2.50, isBio: false, isSignature: false },
      { name: 'Croissant fourré', description: 'Croissant garni d\'une crème gourmande (selon garniture)', price: 2.50, isBio: false, isSignature: false },
      { name: 'Viennoise chocolat noir', description: 'Viennoiserie moelleuse nappée de chocolat noir', price: 2.00, isBio: false, isSignature: false },
      { name: 'Viennoise chocolat blanc', description: 'Viennoise riche au nappage chocolat blanc', price: 3.00, isBio: false, isSignature: false },
      { name: 'Viennoise chocolat nature', description: 'Classique viennoise nature, moelleuse et légère', price: 1.50, isBio: false, isSignature: false },
      { name: 'Brioche Flavie', description: 'Brioche généreuse aux œufs plein air et miel', price: 2.80, isBio: true, isSignature: true },
      { name: 'Petite brioche nature', description: 'Mini brioche tendre, idéale au petit-déjeuner', price: 1.50, isBio: false, isSignature: false },
      { name: 'Petite brioche chocolat', description: 'Mini brioche enrichie de pépites chocolat', price: 1.60, isBio: false, isSignature: false },
      { name: 'Petite brioche praliné', description: 'Mini brioche parfumée au praliné croustillant', price: 1.60, isBio: false, isSignature: false },
      { name: 'Roulé cannelle', description: 'Roulé moelleux à la cannelle, glaçage sucré', price: 2.30, isBio: false, isSignature: false },
      { name: 'Torsade cannelle', description: 'Torsade feuilletée parfumée à la cannelle', price: 3.00, isBio: false, isSignature: false },
      { name: 'Mini viennoiserie (à l\'unité)', description: 'Mini viennoiserie variée, portion dégustation', price: 0.70, isBio: false, isSignature: false },
      { name: 'Mini viennoiseries (lot 10)', description: 'Assortiment de 10 minis viennoiseries', price: 6.00, isBio: false, isSignature: false },
      { name: 'Feuilleté d\'Halloween', description: 'Feuilleté festif décoré, gourmandise de saison', price: 2.50, isBio: false, isSignature: false }
    ]
  },
  {
    id: 'pastry',
    name: 'Pâtisseries',
    description: 'Créations artisanales réalisées par nos chefs pâtissiers',
    items: [
      { name: 'Moelleux au chocolat', description: 'Gâteau fondant au cœur coulant chocolat', price: 3.20, isBio: false, isSignature: false },
      { name: 'Brownie', description: 'Carré chocolat intense, texture fondante et croquante', price: 3.50, isBio: false, isSignature: false },
      { name: 'Cannelé', description: 'Canelé bordelais caramelisé, intérieur moelleux', price: 2.20, isBio: false, isSignature: false },
      { name: 'Tigre au Nutella', description: 'Pâtisserie marbrée avec généreuse couche de Nutella', price: 3.50, isBio: false, isSignature: false },
      { name: 'Financier nature', description: 'Petit gâteau aux amandes, texture fondante', price: 3.00, isBio: false, isSignature: false },
      { name: 'Financier pistache', description: 'Financier parfumé à la pistache, finition craquante', price: 3.00, isBio: false, isSignature: false },
      { name: 'Financier chocolat', description: 'Financier au chocolat, cœur gourmand', price: 3.00, isBio: false, isSignature: false },
      { name: 'Financier framboise', description: 'Financier garni de framboise acidulée', price: 3.00, isBio: false, isSignature: false },
      { name: 'Palmier', description: 'Feuilleté caramélisé en forme de coeur, très croustillant', price: 3.00, isBio: false, isSignature: false },
      { name: 'Cookie', description: 'Cookie généreux aux pépites, texture moelleuse', price: 3.00, isBio: false, isSignature: false },
      { name: 'Madeleine (à l\'unité)', description: 'Madeleine moelleuse au goût de beurre et citron', price: 0.80, isBio: false, isSignature: false },
      { name: 'Madeleine (sachet 4)', description: 'Lot de 4 madeleines fraîches', price: 4.00, isBio: false, isSignature: false },
      { name: 'Crêpe nature', description: 'Crêpe fine et légère, idéale nature', price: 1.40, isBio: false, isSignature: false },
      { name: 'Crêpe sucre', description: 'Crêpe classique saupoudrée de sucre', price: 1.40, isBio: false, isSignature: false },
      { name: 'Crêpe Nutella', description: 'Crêpe garnie généreusement de Nutella', price: 3.00, isBio: false, isSignature: false },
      { name: 'Sablé chocolat caramel', description: 'Sablé rond garni d’un caramel au chocolat', price: 3.80, isBio: false, isSignature: false },
      { name: 'Chouchous (sachet)', description: 'Arachides caramélisées, sachet prêt à croquer', price: 5.00, isBio: false, isSignature: false },
      { name: 'Tarte aux Fraises', description: 'Sablé breton, crème pâtissière et fraises fraîches', price: 4.50, isBio: false, isSignature: true },
      { name: 'Mille-Feuille', description: 'Feuilletage croustillant et crème pâtissière onctueuse', price: 4.50, isBio: false, isSignature: true },
      { name: 'Tarte fine', description: 'Tartelette fine aux fruits de saison', price: 3.80, isBio: false, isSignature: false },
      { name: 'Tarte aux figues', description: 'Tarte gourmande aux figues caramélisées', price: 5.50, isBio: false, isSignature: false },
      { name: 'Tarte Normande', description: 'Tarte aux pommes à la crème, recette traditionnelle', price: 3.80, isBio: false, isSignature: false },
      { name: 'Tarte poire chocolat', description: 'Alliance poire juteuse et ganache chocolat', price: 3.80, isBio: false, isSignature: false },
      { name: 'Part de tarte aux pommes', description: 'Part généreuse de tarte aux pommes maison', price: 3.80, isBio: false, isSignature: false },
      { name: 'Far Breton', description: 'Gâteau breton aux pruneaux, texture fondante', price: 3.80, isBio: false, isSignature: false },
      { name: 'Fraisier (part)', description: 'Part de fraisier frais, crème légère et fraises', price: 6.00, isBio: false, isSignature: false },
      { name: 'Paris-Brest (part)', description: 'Choux garni d’une crème pralinée onctueuse', price: 6.00, isBio: false, isSignature: false },
      { name: 'Éclair chocolat / café', description: 'Pâte à choux garnie de crème chocolat ou café', price: 3.50, isBio: false, isSignature: false },
      { name: 'Éclair vanille', description: 'Éclair classique fourré d’une crème vanille onctueuse', price: 3.70, isBio: false, isSignature: false },
      { name: 'Tiramisu café / fruits rouges', description: 'Dessert crémeux aux biscuits imbibés et mascarpone', price: 3.70, isBio: false, isSignature: false },
      { name: 'Panna cotta', description: 'Crème cuite italienne, texture douce et légère', price: 3.70, isBio: false, isSignature: false },
      { name: 'Mousse au chocolat', description: 'Mousse aérienne au chocolat pur', price: 3.70, isBio: false, isSignature: false },
      { name: 'Yaourt', description: 'Yaourt frais nature ou aromatisé selon arrivage', price: 2.80, isBio: false, isSignature: false },
      { name: 'Tarte gianduja noisette', description: 'Tarte gourmande au gianduja et noisettes torréfiées', price: 5.50, isBio: false, isSignature: false },
      { name: 'Tarte pistache', description: 'Tarte onctueuse parfumée à la pistache', price: 5.50, isBio: false, isSignature: false },
      { name: 'Tarte citron', description: 'Tarte acidulée au citron et meringue légère', price: 4.50, isBio: false, isSignature: false },
      { name: 'Tarte framboise', description: 'Tarte fruitée aux framboises fraîches', price: 5.50, isBio: false, isSignature: false },
      { name: 'Clafoutis', description: 'Clafoutis aux fruits de saison, texture fondante', price: 4.20, isBio: false, isSignature: false },
      { name: 'Carré pistache', description: 'Carré pâtissier riche en pistache et ganache', price: 5.50, isBio: false, isSignature: false },
      { name: 'Entremet vanille caramel (4pers)', description: 'Entremet élégant vanille-caramel, format partage', price: 25.00, isBio: false, isSignature: false }
    ]
  },
  {
    id: 'sandwiches',
    name: 'Sandwichs & Salades',
    description: 'Préparations fraîches sur pain maison, produits de saison',
    items: [
      { name: 'Jambon beurre', description: 'Classique jambon-beurre sur pain croustillant', price: 4.00, isBio: false, isSignature: false },
      { name: 'Jambon fromage', description: 'Sandwich chaud ou froid avec jambon et fromage', price: 4.50, isBio: false, isSignature: false },
      { name: 'Jambon de Bayonne - Beurre', description: 'Jambon ibérique affiné, servi avec beurre demi-sel', price: 4.80, isBio: true, isSignature: false },
      { name: 'Saumon Fumé - Avocat', description: 'Saumon fumé, avocat et citron sur pain nordique', price: 6.20, isBio: false, isSignature: false },
      { name: 'Sandwich saumon', description: 'Saumon frais ou fumé avec salade croquante', price: 5.40, isBio: false, isSignature: false },
      { name: 'Sandwich pesto chèvre', description: 'Pesto frais, chèvre crémeux et tomates confites', price: 5.40, isBio: false, isSignature: false },
      { name: 'Sandwich Végane', description: 'Légumes grillés, houmous et herbes fraîches', price: 5.50, isBio: false, isSignature: false },
      { name: 'Wrap', description: 'Galette garnie de crudités et sauce maison', price: 5.50, isBio: false, isSignature: false },
      { name: 'Bagel poulet', description: 'Bagel toasté garni de poulet rôti et salade', price: 5.50, isBio: false, isSignature: false },
      { name: 'Panini pesto mozzarella', description: 'Panini chaud mozzarella fondue et pesto frais', price: 5.00, isBio: false, isSignature: false },
      { name: 'Panini 3 fromages pesto', description: 'Panini généreux aux trois fromages et pesto', price: 5.50, isBio: false, isSignature: false },
      { name: 'Panini bacon reblochon', description: 'Panini gourmand bacon croustillant et reblochon fondu', price: 5.50, isBio: false, isSignature: false },
      { name: 'Panini poulet curry', description: 'Panini épicé au poulet et sauce curry maison', price: 5.50, isBio: false, isSignature: false },
      { name: 'Panini poulet cheddar', description: 'Panini au poulet grillé et cheddar fondant', price: 5.50, isBio: false, isSignature: false },
      { name: 'Mini sandwich', description: 'Petite bouchée sandwich, parfait pour apéro', price: 3.00, isBio: false, isSignature: false },
      { name: 'Sandwich rosette', description: 'Charcuterie rosette, cornichons et beurre', price: 4.50, isBio: false, isSignature: false },
      { name: 'Poulet crudités', description: 'Poulet grillé et légumes croquants, sauce légère', price: 5.00, isBio: false, isSignature: false },
      { name: 'Jambon crudités', description: 'Tranches de jambon et assortiment de crudités', price: 5.00, isBio: false, isSignature: false },
      { name: 'Thon crudités', description: 'Salade de thon généreuse et légumes frais', price: 5.00, isBio: false, isSignature: false },
      { name: 'Concombre fromage frais', description: 'Concombre croquant et fromage frais citronné', price: 5.40, isBio: false, isSignature: false },
      { name: 'L\'Italien', description: 'Charcuteries italiennes, mozzarella et pesto', price: 5.40, isBio: false, isSignature: false },
      { name: 'Pastrami', description: 'Pastrami fumé, moutarde douce et pickles', price: 5.50, isBio: false, isSignature: false },
      { name: 'Salade composée', description: 'Salade généreuse composée selon saison et arrivage', price: 7.50, isBio: false, isSignature: false },
      { name: 'Quiche', description: 'Quiche maison aux légumes ou classique lorraine', price: 4.00, isBio: false, isSignature: false },
      { name: 'Pizza (snack)', description: 'Part de pizza maison, garniture simple et fraîche', price: 4.00, isBio: false, isSignature: false }
    ]
  },
  {
    id: 'drinks',
    name: 'Boissons Chaudes',
    description: 'Sélection de cafés et thés premium',
    items: [
      { name: 'Café Expresso', description: 'Expresso corsé, torréfaction maison', price: 1.90, isBio: true, isSignature: false },
      { name: 'Cappuccino', description: 'Expresso onctueux surmonté d\'une mousse de lait', price: 3.50, isBio: true, isSignature: false },
      { name: 'Thé ', description: 'Thé  aromatisé à la saveur de votre choix', price: 2.90, isBio: true, isSignature: false },
      { name: 'Chocolat chaud ', description: 'chocolat preparer avec douceur ', price: 3.50, isBio: true, isSignature: false },
      { name: 'Cafe creme ', description: 'Cafe avec de la creme', price: 2.90, isBio: true, isSignature: false },
      { name: 'Cafe allonge ', description: 'un cafe plus long pour plus d\'energie', price: 1.90, isBio: true, isSignature: false }
    ]
  }
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCategories = selectedCategory === 'all'
    ? menuCategories
    : menuCategories.filter(category => category.id === selectedCategory);

  return (
    <div className="min-h-screen bg-[var(--bakery-beige)]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center text-[var(--bakery-dark)] hover:text-[var(--bakery-brown)] transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour à l'accueil
            </Link>
            <h1 className="text-2xl serif-font font-bold text-[var(--bakery-dark)]">Notre Menu</h1>
            
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-[var(--bakery-brown)] to-[var(--bakery-cream)] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl lg:text-6xl serif-font font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nos Créations Artisanales
          </motion.h1>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Découvrez notre sélection de pains, pâtisseries et viennoiseries préparés chaque jour avec passion
          </motion.p>
        </div>
      </section>

      {/* Filters & Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id
                      ? 'bg-[var(--bakery-brown)] text-white'
                      : 'border-[var(--bakery-brown)] text-[var(--bakery-brown)] hover:bg-[var(--bakery-brown)] hover:text-white'
                  } transition-all duration-200 px-6 py-2`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Style Menu */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="mb-16 last:mb-0"
            >
              {/* Category Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl serif-font font-bold text-[var(--bakery-dark)] mb-4">
                  {category.name}
                </h2>
                <div className="w-24 h-1 bg-[var(--bakery-brown)] mx-auto mb-4"></div>
                <p className="text-lg text-gray-600 italic max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              {/* Menu Items */}
              <div className="space-y-6">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                    className="group"
                  >
                    <div className="flex justify-between items-start gap-4 p-6 rounded-lg hover:bg-[var(--bakery-beige)] transition-colors duration-300">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-[var(--bakery-dark)] group-hover:text-[var(--bakery-brown)] transition-colors">
                            {item.name}
                          </h3>
                          <div className="flex gap-2">
                            {item.isBio && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                                BIO
                              </Badge>
                            )}
                            {item.isSignature && (
                              <Badge className="bg-[var(--bakery-brown)] text-white text-xs">
                                ⭐ Signature
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Price with decorative dots */}
                      <div className="flex items-center gap-2 min-w-0 flex-shrink-0">
                        <div className="hidden sm:block flex-1 border-b border-dotted border-gray-300 mx-3"></div>
                        <span className="text-2xl font-bold text-[var(--bakery-brown)] serif-font">
                          {item.price.toFixed(2)}€
                        </span>
                      </div>
                    </div>

                    {/* Subtle separator line */}
                    {itemIndex < category.items.length - 1 && (
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-6"></div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Decorative element between categories */}
              {categoryIndex < filteredCategories.length - 1 && (
                <div className="flex items-center justify-center mt-16">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-px bg-[var(--bakery-brown)]"></div>
                    <div className="w-2 h-2 bg-[var(--bakery-brown)] rounded-full"></div>
                    <div className="w-12 h-px bg-[var(--bakery-brown)]"></div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
