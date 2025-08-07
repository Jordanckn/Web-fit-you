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
    { number: "30+", label: t('hero.stats.sites') },
    { number: "98%", label: t('hero.stats.satisfaction') },
    { number: "3x", label: t('hero.stats.traffic') },
    { number: "24/7", label: t('hero.stats.support') }
  ];

  return (
    <>
      <Helmet>
        <title>WebFitYou — IA Contenus & Site automatisé</title>
        <meta name="description" content="Générez posts, visuels et vidéos courtes avec l’IA. Planification multi-plateformes et intégration directe à votre site web. Personnalisation par marque." />
      </Helmet>

      <Hero />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text<boltAction type="file" filePath="src/pages/Services.tsx">import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Search, 
  Palette, 
  Users, 
  BarChart3, 
  Zap,
  CheckCircle,
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: t('services.social.title'),
      description: t('services.social.description'),
      features: t('services.social.features', { returnObjects: true }),
      color: "orange"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: t('services.branding.title'),
      description: t('services.branding.description'),
      features: t('services.branding.features', { returnObjects: true }),
      color: "purple"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('services.website.title'),
      description: t('services.website.description'),
      features: t('services.website.features', { returnObjects: true }),
      color: "blue"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: t('services.seo.title'),
      description: t('services.seo.description'),
      features: t('services.seo.features', { returnObjects: true }),
      color: "teal"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('services.support.title'),
      description: t('services.support.description'),
      features: t('services.support.features', { returnObjects: true }),
      color: "green"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('services.automation.title'),
      description: t('services.automation.description'),
      features: t('services.automation.features', { returnObjects: true }),
      color: "indigo"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-500' },
      teal: { bg: 'bg-teal-100', text: 'text-teal-600', border: 'border-teal-500' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-500' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-500' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-500' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-500' }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <>
      <Helmet>
        <title>{t('services.title')} - WebFitYou</title>
        <meta name="description" content={t('services.subtitle')} />
      </Helmet>

      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('services.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const colors = getColorClasses(service.color);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.bg} ${colors.text} rounded-xl mb-6 group-hover:scale-110 transition-transform`}>
                      {service.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contact"
                      className={`inline-flex items-center text-sm font-medium ${colors.text} hover:underline group-hover:translate-x-1 transition-transform`}
                    >
                      {t('services.learnMore')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
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
              {t('services.process.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('services.process.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: t('services.process.steps.audit.title'), description: t('services.process.steps.audit.description') },
              { step: "02", title: t('services.process.steps.creation.title'), description: t('services.process.steps.creation.description') },
              { step: "03", title: t('services.process.steps.optimization.title'), description: t('services.process.steps.optimization.description') },
              { step: "04", title: t('services.process.steps.followup.title'), description: t('services.process.steps.followup.description') }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
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
              {t('services.ctaTitle')}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {t('services.ctaSubtitle')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors group"
            >
              {t('services.ctaButton')}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
