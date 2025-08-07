import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, X, Star, ArrowRight, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import PricingSimulator from '../components/pricing/PricingSimulator';

const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const { t } = useTranslation();

  const plans = [
    {
      name: t('pricing.plans.solo.name'),
      price: { monthly: 29, yearly: 290 },
      description: t('pricing.plans.solo.description'),
      features: t('pricing.plans.solo.features', { returnObjects: true }),
      notIncluded: t('pricing.plans.solo.notIncluded', { returnObjects: true }),
      popular: false,
      color: "blue"
    },
    {
      name: t('pricing.plans.pro.name'),
      price: { monthly: 69, yearly: 690 },
      description: t('pricing.plans.pro.description'),
      features: t('pricing.plans.pro.features', { returnObjects: true }),
      notIncluded: t('pricing.plans.pro.notIncluded', { returnObjects: true }),
      popular: true,
      color: "teal"
    },
    {
      name: t('pricing.plans.human.name'),
      price: { monthly: 129, yearly: 1290 },
      description: t('pricing.plans.human.description'),
      features: t('pricing.plans.human.features', { returnObjects: true }),
      notIncluded: [],
      popular: false,
      color: "orange"
    }
  ];

  const getColorClasses = (color: string, popular = false) => {
    if (popular) {
      return {
        border: 'border-teal-500 ring-2 ring-teal-500',
        button: 'bg-teal-600 hover:bg-teal-700',
        badge: 'bg-teal-500'
      };
    }
    
    const colorMap = {
      blue: { border: 'border-gray-200', button: 'bg-blue-600 hover:bg-blue-700', badge: 'bg-blue-500' },
      teal: { border: 'border-gray-200', button: 'bg-teal-600 hover:bg-teal-700', badge: 'bg-teal-500' },
      orange: { border: 'border-gray-200', button: 'bg-orange-600 hover:bg-orange-700', badge: 'bg-orange-500' }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <>
      <Helmet>
        <title>{t('pricing.title')} - WebFitYou</title>
        <meta name="description" content={t('pricing.subtitle')} />
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
              {t('pricing.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('pricing.subtitle')}
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t('pricing.monthly')}
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  billingPeriod === 'yearly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t('pricing.yearly')}
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                  {t('pricing.save')}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const colors = getColorClasses(plan.color, plan.popular);
              const price = plan.price[billingPeriod];
              const savings = billingPeriod === 'yearly' ? Math.round((plan.price.monthly * 12 - plan.price.yearly) / 12) : 0;
              
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative bg-white rounded-2xl shadow-lg ${colors.border} p-8 ${
                    plan.popular ? 'transform scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 ${colors.badge} text-white text-sm font-medium rounded-full`}>
                      {t('pricing.plans.pro.popular')}
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {plan.description}
                    </p>
                    
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-gray-900">
                        {price}€
                      </span>
                      <span className="text-gray-600">
                        /{billingPeriod === 'monthly' ? t('pricing.month') : t('pricing.year')}
                      </span>
                    </div>
                    
                    {billingPeriod === 'yearly' && savings > 0 && (
                      <p className="text-sm text-green-600 font-medium">
                        {t('pricing.savingsText', { amount: savings })}
                      </p>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <X className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`w-full block text-center px-6 py-4 ${colors.button} text-white font-semibold rounded-xl transition-colors`}
                  >
                    {t('pricing.startNow')}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Simulator */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Calculator className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('pricing.simulator.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('pricing.simulator.subtitle')}
            </p>
          </motion.div>
          
          <PricingSimulator />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('pricing.faq.title')}
            </h2>
          </motion.div>

          <div className="space-y-6">
            {t('pricing.faq.questions', { returnObjects: true }).map((faq: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('pricing.ctaTitle')}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {t('pricing.ctaSubtitle')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors group"
            >
              {t('pricing.startNow')}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
