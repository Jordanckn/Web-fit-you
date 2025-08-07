import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight } from 'lucide-react';

interface SimulatorData {
  projectType: string;
  pages: number;
  features: string[];
  timeline: string;
  support: string;
}

const PricingSimulator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslation();
  const [data, setData] = useState<SimulatorData>({
    projectType: '',
    pages: 5,
    features: [],
    timeline: '',
    support: ''
  });

  const steps = [
    {
      title: t('pricing.simulator.steps.projectType.title'),
      question: t('pricing.simulator.steps.projectType.question'),
      options: [
        { value: 'vitrine', label: t('pricing.simulator.steps.projectType.options.vitrine'), price: 0 },
        { value: 'ecommerce', label: t('pricing.simulator.steps.projectType.options.ecommerce'), price: 200 },
        { value: 'blog', label: t('pricing.simulator.steps.projectType.options.blog'), price: 100 },
        { value: 'plateforme', label: t('pricing.simulator.steps.projectType.options.plateforme'), price: 500 }
      ]
    },
    {
      title: t('pricing.simulator.steps.pages.title'),
      question: t('pricing.simulator.steps.pages.question'),
      type: 'slider',
      min: 1,
      max: 50,
      step: 1,
      pricePerUnit: 20
    },
    {
      title: t('pricing.simulator.steps.features.title'),
      question: t('pricing.simulator.steps.features.question'),
      options: [
        { value: 'seo', label: t('pricing.simulator.steps.features.options.seo'), price: 50 },
        { value: 'blog', label: t('pricing.simulator.steps.features.options.blog'), price: 100 },
        { value: 'ecommerce', label: t('pricing.simulator.steps.features.options.ecommerce'), price: 200 },
        { value: 'booking', label: t('pricing.simulator.steps.features.options.booking'), price: 150 },
        { value: 'crm', label: t('pricing.simulator.steps.features.options.crm'), price: 200 },
        { value: 'analytics', label: t('pricing.simulator.steps.features.options.analytics'), price: 75 }
      ],
      multiple: true
    },
    {
      title: t('pricing.simulator.steps.timeline.title'),
      question: t('pricing.simulator.steps.timeline.question'),
      options: [
        { value: 'express', label: t('pricing.simulator.steps.timeline.options.express'), price: 500 },
        { value: 'standard', label: t('pricing.simulator.steps.timeline.options.standard'), price: 0 },
        { value: 'confort', label: t('pricing.simulator.steps.timeline.options.confort'), price: -200 }
      ]
    },
    {
      title: t('pricing.simulator.steps.support.title'),
      question: t('pricing.simulator.steps.support.question'),
      options: [
        { value: 'email', label: t('pricing.simulator.steps.support.options.email'), price: 0 },
        { value: 'priority', label: t('pricing.simulator.steps.support.options.priority'), price: 100 },
        { value: 'dedicated', label: t('pricing.simulator.steps.support.options.dedicated'), price: 300 }
      ]
    }
  ];

  const calculatePrice = () => {
    let basePrice = 500; // Prix de base
    
    // Type de projet
    const projectOption = steps[0].options?.find(opt => opt.value === data.projectType);
    if (projectOption) basePrice += projectOption.price;
    
    // Nombre de pages (au-delà de 5 pages de base)
    if (data.pages > 5) {
      basePrice += (data.pages - 5) * 20;
    }
    
    // Fonctionnalités
    data.features.forEach(feature => {
      const featureOption = steps[2].options?.find(opt => opt.value === feature);
      if (featureOption) basePrice += featureOption.price;
    });
    
    // Timeline
    const timelineOption = steps[3].options?.find(opt => opt.value === data.timeline);
    if (timelineOption) basePrice += timelineOption.price;
    
    // Support
    const supportOption = steps[4].options?.find(opt => opt.value === data.support);
    if (supportOption) basePrice += supportOption.price;
    
    return Math.max(basePrice, 300); // Prix minimum
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (key: keyof SimulatorData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const renderStep = () => {
    const step = steps[currentStep];
    
    if (step.type === 'slider') {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-4xl font-bold text-blue-600">{data.pages}</span>
            <span className="text-gray-600 ml-2">{t('pricing.simulator.steps.pages.unit')}</span>
          </div>
          <input
            type="range"
            min={step.min}
            max={step.max}
            step={step.step}
            value={data.pages}
            onChange={(e) => updateData('pages', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{step.min} page</span>
            <span>{step.max} pages</span>
          </div>
        </div>
      );
    }

    const isMultiple = step.multiple;
    const currentValue = isMultiple ? data.features : 
      currentStep === 0 ? data.projectType :
      currentStep === 3 ? data.timeline : data.support;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {step.options?.map((option) => {
          const isSelected = isMultiple 
            ? (currentValue as string[]).includes(option.value)
            : currentValue === option.value;

          return (
            <button
              key={option.value}
              onClick={() => {
                if (isMultiple) {
                  const current = currentValue as string[];
                  const updated = isSelected
                    ? current.filter(v => v !== option.value)
                    : [...current, option.value];
                  updateData('features', updated);
                } else {
                  const key = currentStep === 0 ? 'projectType' :
                    currentStep === 3 ? 'timeline' : 'support';
                  updateData(key, option.value);
                }
              }}
              className={`p-4 text-left border-2 rounded-xl transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{option.label}</div>
                  {option.price !== 0 && (
                    <div className={`text-sm ${
                      option.price > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {option.price > 0 ? '+' : ''}{option.price}€
                    </div>
                  )}
                </div>
                {isSelected && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const currentPrice = calculatePrice();

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Progress */}
      <div className="bg-gray-50 px-8 py-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            {t('common.step')} {currentStep + 1} {t('common.of')} {steps.length}
          </span>
          <div className="text-2xl font-bold text-blue-600">
            {currentPrice}€
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {steps[currentStep].title}
          </h3>
          <p className="text-gray-600 mb-8">
            {steps[currentStep].question}
          </p>

          {renderStep()}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t('pricing.simulator.previous')}
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center group"
            >
              {t('pricing.simulator.next')}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <a
              href="/contact"
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center group"
            >
              {t('pricing.simulator.getQuote')}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingSimulator;
