import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Target, Zap, Heart, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t('about.values.human.title'),
      description: t('about.values.human.description')
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: t('about.values.transparency.title'),
      description: t('about.values.transparency.description')
    }
  ];

  const team = [
    {
      name: "Marie Dupont",
      role: "Fondatrice & CEO",
      bio: "15 ans d'expérience dans le marketing digital. Passionnée par l'innovation et l'entrepreneuriat.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=300&h=300&fit=crop&crop=face",
      specialties: ["Stratégie", "SEO", "Growth Hacking"]
    },
    {
      name: "Thomas Martin",
      role: "CTO & Développeur Lead",
      bio: "Expert en développement web et IA. Créateur des automatisations qui font la différence.",
      image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?w=300&h=300&fit=crop&crop=face",
      specialties: ["React", "Node.js", "Intelligence Artificielle"]
    },
    {
      name: "Sophie Laurent",
      role: "Directrice Creative",
      bio: "Designeuse UX/UI avec 10 ans d'expérience. Elle donne vie à vos idées avec créativité.",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=300&h=300&fit=crop&crop=face",
      specialties: ["UX/UI Design", "Branding", "Design System"]
    },
    {
      name: "Pierre Moreau",
      role: "Consultant Senior",
      bio: "Spécialiste en stratégie digitale. Il accompagne nos clients dans leur transformation.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=300&h=300&fit=crop&crop=face",
      specialties: ["Conseil", "Formation", "Analyse"]
    }
  ];

  const technologies = [
    { name: "React.js", description: "Framework frontend moderne" },
    { name: "GPT-4", description: "Intelligence artificielle avancée" },
    { name: "Supabase", description: "Backend-as-a-Service scalable" },
    { name: "N8N", description: "Automatisations workflow" },
    { name: "Tailwind CSS", description: "Framework CSS utility-first" },
    { name: "Stripe", description: "Plateforme de paiement sécurisée" }
  ];

  const stats = [
    { number: "500+", label: t('about.stats.sites'), description: t('about.stats.since') },
    { number: "98%", label: t('about.stats.satisfaction'), description: t('about.stats.rate') },
    { number: "3 ans", label: t('about.stats.experience'), description: t('about.stats.aiExperience') },
    { number: "7j", label: t('about.stats.delivery'), description: t('about.stats.speed') }
  ];

  return (
    <>
      <Helmet>
        <title>{t('nav.about')} - WebFitYou</title>
        <meta name="description" content={t('about.subtitle')} />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Notre Mission
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg">
                  Chez WebFitYou, nous croyons que chaque entrepreneur mérite d'avoir 
                  une présence digitale professionnelle, sans les complications techniques 
                  et les coûts prohibitifs des agences traditionnelles.
                </p>
                <p>
                  Notre approche unique combine le meilleur de deux mondes : la puissance 
                  de l'intelligence artificielle GPT-4 pour l'optimisation SEO automatisée 
                  et l'expertise humaine pour un accompagnement personnalisé.
                </p>
                <p>
                  Nous automatisons ce qui peut l'être pour vous faire gagner du temps 
                  et de l'argent, tout en gardant l'humain au cœur de notre relation 
                  avec vous.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?w=600&h=400&fit=crop"
                alt="Équipe WebFitYou au travail"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-8 -left-8 bg-blue-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-blue-100">Sites créés</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('about.values.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('about.values.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-xl mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('about.team.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('about.team.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-blue-600 font-medium mb-3">
                  {member.role}
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('about.technologies.title')}
            </h2>
            <p className="text-xl text-blue-100">
              {t('about.technologies.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                <div className="font-semibold mb-2">
                  {tech.name}
                </div>
                <div className="text-sm text-blue-100">
                  {tech.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('about.ctaTitle')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('about.ctaSubtitle')}
            </p>
            {t('about.mission.content', { returnObjects: true }).map((paragraph: string, index: number) => (
              <p key={index} className={index === 0 ? "text-lg" : ""}>
                {paragraph}
              </p>
            ))}
            <a className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors mb-4">
              {t('about.ctaButton')}
            </a>
            <p className="text-gray-600">
              {t('about.ctaPricing')}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
