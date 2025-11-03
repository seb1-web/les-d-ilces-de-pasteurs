'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, User, ChefHat, BookOpen, Search } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { id: 'all', name: 'Tous les articles', count: 12 },
  { id: 'recipes', name: 'Recettes', count: 5 },
  { id: 'news', name: 'Actualités', count: 4 },
  { id: 'tips', name: 'Conseils', count: 3 }
];

const blogPosts = [
  {
    id: 1,
    title: 'Comment faire un croissant parfait : nos secrets d\'artisan',
    slug: 'croissant-parfait-secrets-artisan',
    excerpt: 'Découvrez les techniques traditionnelles et les astuces de nos boulangers pour réussir un croissant feuilleté et doré à la perfection.',
    content: 'Le croissant, symbole de la viennoiserie française...',
    category: 'recipes',
    author: 'Anthony Bosson',
    date: '2024-01-15',
    readTime: 8,
    image: 'https://ext.same-assets.com/620863710/3820420499.jpeg',
    featured: true
  },
  {
    id: 2,
    title: 'L\'Essentiel remporte le prix de la meilleure boulangerie 2024',
    slug: 'prix-meilleure-boulangerie-2024',
    excerpt: 'Une reconnaissance qui couronne des années de passion et d\'engagement pour la qualité artisanale.',
    content: 'Nous sommes fiers d\'annoncer que L\'Essentiel a été élue...',
    category: 'news',
    author: 'Nadine Bosson',
    date: '2024-01-10',
    readTime: 5,
    image: 'https://ext.same-assets.com/620863710/2999065446.png',
    featured: false
  },
  {
    id: 3,
    title: 'Les bienfaits du pain au levain naturel',
    slug: 'bienfaits-pain-levain-naturel',
    excerpt: 'Pourquoi choisir le pain au levain ? Découvrez ses avantages nutritionnels et gustatifs.',
    content: 'Le pain au levain naturel présente de nombreux avantages...',
    category: 'tips',
    author: 'Antoine Dubois',
    date: '2024-01-08',
    readTime: 6,
    image: 'https://ext.same-assets.com/620863710/4008851700.jpeg',
    featured: false
  },
  {
    id: 4,
    title: 'Recette de notre célèbre tarte aux fraises',
    slug: 'recette-tarte-aux-fraises',
    excerpt: 'Apprenez à réaliser notre tarte aux fraises signature avec cette recette détaillée.',
    content: 'Ingrédients pour la pâte sablée...',
    category: 'recipes',
    author: 'Marie Laurent',
    date: '2024-01-05',
    readTime: 12,
    image: 'https://ext.same-assets.com/620863710/2543253154.png',
    featured: true
  },
  {
    id: 5,
    title: 'Nouveau : notre gamme de viennoiseries bio',
    slug: 'nouvelle-gamme-viennoiseries-bio',
    excerpt: 'Découvrez nos nouvelles créations 100% bio, préparées avec des ingrédients sélectionnés.',
    content: 'Soucieux de proposer des produits respectueux de l\'environnement...',
    category: 'news',
    author: 'Anthony Bosson',
    date: '2024-01-03',
    readTime: 4,
    image: 'https://ext.same-assets.com/620863710/19363088.jpeg',
    featured: false
  },
  {
    id: 6,
    title: 'Comment conserver votre pain plus longtemps',
    slug: 'conserver-pain-plus-longtemps',
    excerpt: 'Nos conseils d\'experts pour préserver la fraîcheur et le goût de votre pain artisanal.',
    content: 'La conservation du pain est un art...',
    category: 'tips',
    author: 'Pierre Martin',
    date: '2024-01-01',
    readTime: 7,
    image: 'https://ext.same-assets.com/620863710/4008851700.jpeg',
    featured: false
  }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts
    .filter(post => selectedCategory === 'all' || post.category === selectedCategory)
    .filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'recipes':
        return <ChefHat className="h-4 w-4" />;
      case 'news':
        return <BookOpen className="h-4 w-4" />;
      case 'tips':
        return <User className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'recipes':
        return 'bg-green-500';
      case 'news':
        return 'bg-blue-500';
      case 'tips':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

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
            <h1 className="text-2xl serif-font font-bold text-[var(--bakery-dark)]">Blog</h1>
            <div></div>
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
            Notre Blog
          </motion.h1>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Recettes, actualités et conseils d'experts de nos artisans boulangers-pâtissiers
          </motion.p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--bakery-brown)]"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id
                      ? 'bg-[var(--bakery-brown)] text-white'
                      : 'border-[var(--bakery-brown)] text-[var(--bakery-brown)] hover:bg-[var(--bakery-brown)] hover:text-white'
                  } transition-all duration-200`}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-3xl serif-font font-bold text-[var(--bakery-dark)] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Articles à la Une
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group h-full">
                    <div className="relative h-64">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={`${getCategoryColor(post.category)} text-white flex items-center gap-1`}>
                          {getCategoryIcon(post.category)}
                          {categories.find(c => c.id === post.category)?.name}
                        </Badge>
                      </div>
                      <Badge className="absolute top-4 right-4 bg-[var(--bakery-cream)] text-[var(--bakery-dark)]">
                        À la Une
                      </Badge>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-[var(--bakery-dark)] mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(post.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime} min
                          </div>
                        </div>
                      </div>

                      <Button
                        className="bg-[var(--bakery-brown)] hover:bg-[var(--bakery-cream)] text-white transition-all duration-200 hover:scale-105"
                      >
                        Lire l'article
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {regularPosts.length > 0 && (
            <>
              <motion.h2
                className="text-3xl serif-font font-bold text-[var(--bakery-dark)] mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {featuredPosts.length > 0 ? 'Autres Articles' : 'Tous nos Articles'}
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group h-full">
                      <div className="relative h-48">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={`${getCategoryColor(post.category)} text-white flex items-center gap-1`}>
                            {getCategoryIcon(post.category)}
                            {categories.find(c => c.id === post.category)?.name}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-[var(--bakery-dark)] mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(post.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.readTime} min
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[var(--bakery-brown)] text-[var(--bakery-brown)] hover:bg-[var(--bakery-brown)] hover:text-white transition-all duration-200 hover:scale-105"
                        >
                          Lire l'article
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[var(--bakery-dark)] mb-2">
                Aucun article trouvé
              </h3>
              <p className="text-gray-600">
                Essayez de modifier vos critères de recherche ou de filtrage.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-[var(--bakery-brown)] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl lg:text-4xl serif-font font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Restez Informé
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Inscrivez-vous à notre newsletter pour recevoir nos dernières recettes et actualités
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <input
              type="email"
              placeholder="Votre email..."
              className="flex-1 px-4 py-3 rounded-lg text-[var(--bakery-dark)] focus:outline-none"
            />
            <Button className="bg-white text-[var(--bakery-brown)] hover:bg-gray-100 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
              S'inscrire
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
