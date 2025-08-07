import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search as SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  readTime: number;
}

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();

  const categories = [
    { id: 'all', label: t('blog.categories.all') },
    { id: 'seo', label: t('blog.categories.seo') },
    { id: 'design', label: t('blog.categories.design') },
    { id: 'marketing', label: t('blog.categories.marketing') },
    { id: 'ia', label: t('blog.categories.ia') },
    { id: 'conseils', label: t('blog.categories.conseils') }
  ];

  const articles: Article[] = [
    {
      id: 1,
      title: "Publier 5x plus avec l’IA sans perdre votre brand voice",
      excerpt: "Méthode en 3 étapes pour générer des posts, les valider et les publier automatiquement.",
      content: "Article complet sur l’IA + gouvernance marque...",
      author: "Marie Dupont",
      date: "2025-01-15",
      category: "ia",
      tags: ["IA", "Social", "Brand Voice"],
      image: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?w=500&h=300&fit=crop",
      readTime: 6
    },
    {
      id: 2,
      title: "Brancher votre blog au social: du SEO à la vidéo courte",
      excerpt: "Réutilisez vos articles pour créer scripts TikTok/Reels et planifiez en un clic.",
      content: "Article complet repurposing article → vidéo courte...",
      author: "Thomas Martin",
      date: "2025-01-12",
      category: "marketing",
      tags: ["Repurposing", "Vidéos courtes", "Automatisation"],
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?w=500&h=300&fit=crop",
      readTime: 7
    },
    {
      id: 3,
      title: "SEO automatisé: briefs IA, rédaction, et maillage",
      excerpt: "Structure H1–H3, métadonnées et maillage interne générés, validation humaine obligatoire.",
      content: "Article complet sur SEO automatisé...",
      author: "Sophie Laurent",
      date: "2025-01-10",
      category: "seo",
      tags: ["SEO", "Automation", "Content"],
      image: "https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?w=500&h=300&fit=crop",
      readTime: 8
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const q = searchTerm.toLowerCase();
    const matchesSearch = article.title.toLowerCase().includes(q) ||
                         article.excerpt.toLowerCase().includes(q) ||
                         article.tags.some(tag => tag.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles[0];

  return (
    <>
      <Helmet>
        <title>{t('blog.title')} - WebFitYou</title>
        <meta name="description" content={t('blog.subtitle')} />
      </Helmet>

      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('blog.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('blog.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedCategory === 'all' && !searchTerm && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12 text-white">
                  <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                    {t('blog.featured')}
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-blue-100 mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-blue-100 text-sm mb-6">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {featuredArticle.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(featuredArticle.date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <Link
                    to={`/blog/${featuredArticle.id}`}
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors group"
                  >
                    {t('blog.readArticle')}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="relative">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 text-lg">
                {t('blog.noResults')}
              </p>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredArticles.slice(selectedCategory === 'all' && !searchTerm ? 1 : 0).map((article, index) => (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(article.date).toLocaleDateString('fr-FR')}
                      </div>
                      <div>
                        {article.readTime} {t('blog.readTime')}
                      </div>
                    </div>

                    <Link
                      to={`/blog/${article.id}`}
                      className="inline-flex items-center text-blue-600 font-medium hover:underline group-hover:translate-x-1 transition-transform"
                    >
                      {t('blog.readMore')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('blog.newsletter.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {t('blog.newsletter.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder={t('blog.newsletter.placeholder')}
                className="flex-1 px-6 py-4 bg-white text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                {t('blog.newsletter.subscribe')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Blog;
