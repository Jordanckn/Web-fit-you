import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface FormData {
  website: string;
  business: string;
  goals: string[];
  budget: string;
}

const MiniAuditForm: React.FC = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    website: '',
    business: '',
    goals: [],
    budget: ''
  });

  const steps = [
    {
      title: t('audit.steps.website.title'),
      question: t('audit.steps.website.question'),
      type: "input",
      key: "website",
      placeholder: t('audit.steps.website.placeholder')
    },
    {
      title: t('audit.steps.business.title'),
      question: t('audit.steps.business.question'),
      type: "select",
      key: "business",
      options: [
        { value: 'ecommerce', label: t('audit.steps.business.options.ecommerce'), price: 0 },
        { value: 'services', label: t('audit.steps.business.options.services'), price: 0 },
        { value: 'restaurant', label: t('audit.steps.business.options.restaurant'), price: 0 },
        { value: 'health', label: t('audit.steps.business.options.health'), price: 0 },
        { value: 'realestate', label: t('audit.steps.business.options.realestate'), price: 0 },
        { value: 'craft', label: t('audit.steps.business.options.craft'), price: 0 },
        { value: 'coaching', label: t('audit.steps.business.options.coaching'), price: 0 },
        { value: 'other', label: t('audit.steps.business.options.other'), price: 0 }
      ]
    },
    {
      title: t('audit.steps.goals.title'),
      question: t('audit.steps.goals.question'),
      type: "checkbox",
      key: "goals",
      options: [
        { value: 'visibility', label: t('audit.steps.goals.options.visibility'), price: 0 },
        { value: 'leads', label: t('audit.steps.goals.options.leads'), price: 0 },
        { value: 'sales', label: t('audit.steps.goals.options.sales'), price: 0 },
        { value: 'image', label: t('audit.steps.goals.options.image'), price: 0 },
        { value: 'automation', label: t('audit.steps.goals.options.automation'), price: 0 }
      ]
    },
    {
      title: t('audit.steps.budget.title'),
      question: t('audit.steps.budget.question'),
      type: "select",
      key: "budget",
      options: [
        { value: 'low', label: t('audit.steps.budget.options.low'), price: 0 },
        { value: 'medium', label: t('audit.steps.budget.options.medium'), price: 0 },
        { value: 'high', label: t('audit.steps.budget.options.high'), price: 0 },
        { value: 'premium', label: t('audit.steps.budget.options.premium'), price: 0 },
        { value: 'enterprise', label: t('audit.steps.budget.options.enterprise'), price: 0 }
      ]
    }
  ];

  const handleInputChange = (key: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      console.log('Form submitted:', formData);
      alert(t('audit.thanks'));
    }
  };

  const canProceed = () => {
    const step = steps[currentStep];
    const value = formData[step.key as keyof FormData];
    
    if (step.key === 'website') return true; // Optional field
    if (step.type === 'checkbox') return Array.isArray(value) && value.length > 0;
    return value !== '';
  };

  const renderStep = () => {
    const step = steps[currentStep];
    const value = formData[step.key as keyof FormData];

    switch (step.type) {
      case 'input':
        return (
          <input
            type="text"
            value={value as string}
            onChange={(e) => handleInputChange(step.key, e.target.value)}
            placeholder={step.placeholder}
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
          />
        );

      case 'select':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {step.options?.map((option) => (
              <button
                key={option.value}
                onClick={() => handleInputChange(step.key, option.value)}
                className={`p-4 text-left border-2 rounded-xl transition-colors ${
                  value === option.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="grid grid-cols-1 gap-3">
            {step.options?.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  const currentGoals = value as string[] || [];
                  const newGoals = currentGoals.includes(option.value)
                    ? currentGoals.filter(goal => goal !== option.value)
                    : [...currentGoals, option.value];
                  handleInputChange(step.key, newGoals);
                }}
                className={`p-4 text-left border-2 rounded-xl transition-colors flex items-center ${
                  (value as string[])?.includes(option.value)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CheckCircle className={`w-5 h-5 mr-3 ${
                  (value as string[])?.includes(option.value) ? 'text-blue-500' : 'text-gray-300'
                }`} />
                {option.label}
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Étape {currentStep + 1} sur {steps.length}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step Content */}
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

        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center group"
        >
          {currentStep === steps.length - 1 ? t('audit.getAudit') : t('audit.continue')}
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};

export default MiniAuditForm;
