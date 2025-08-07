import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Zap, Target, Users, ArrowRight } from 'lucide-react';
import Hero from '../components/home/Hero';
import TestimonialsSlider from '../components/home/TestimonialsSlider';
import MiniAuditForm from '../components/home/MiniAuditForm';

const Home: React.FC = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('benefits.express.title'),
      description: t('benefits.express.description')
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: t('benefits.seo.title'),
      description: t('benefits.seo.description')
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('benefits.support.title'),
      description: t('benefits.support.description')
    }
  ];

  const stats = [
    { number: '30+', label: t('hero.stats.sites') },
    { number: '98%', label: t('hero.stats.satisfaction') },
    { number: '3x', label: t('hero.stats.traffic') },
    { number: '24/7', label: t('hero.stats.support') }
  ];

  return (
    <>
      <Helmet>
        <title>WebFitYou — IA Contenus &amp; Site automatisé</title>
        <meta
          name="description"
          content="Générez posts, visuels et vidéos courtes avec l’IA. Planification multi-plateformes et intégration directe à votre site web. Personnalisation par marque."
        />
      </Helmet>

      <Hero />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('benefits.title')}
            </h2>
            <p className="text-xl text-gray-600">{t('benefits.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-2xl"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-xl mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-xl text-gray-600">{t('testimonials.subtitle')}</p>
          </motion.div>

          <TestimonialsSlider />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-8">{t('cta.subtitle')}</p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors group"
            >
              {t('cta.button')}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <MiniAuditForm />
        </div>
      </section>
    </>
  );
};

export default Home;

