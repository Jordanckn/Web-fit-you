import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, MessageCircle, FlaskConical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageToggle from './LanguageToggle';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/services', label: t('nav.services') },
    { path: '/realisations', label: t('nav.portfolio') },
    { path: '/tarifs', label: t('nav.pricing') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/a-propos', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
    { path: '/playground-ia', label: 'Playground IA', icon: <FlaskConical size={16} className="text-teal-600" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`} aria-label="Navigation principale">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center" aria-hidden="true">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-bold text-gray-900">WebFitYou</span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <LanguageToggle />
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 flex items-center gap-1 ${
                    location.pathname === item.path
                      ? 'text-blue-600'
                      : 'text-gray-700'
                  }`}
                >
                  {item.icon ? item.icon : null}
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                {t('nav.freeQuote')}
              </Link>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="px-4 py-2 space-y-1">
                <div className="px-3 py-2">
                  <LanguageToggle />
                </div>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className="block w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-blue-700 transition-colors"
                >
                  {t('nav.freeQuote')}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-16">
        {children}
      </main>

      <motion.a
        href="https://wa.me/33123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="WhatsApp"
      >
        <MessageCircle size={24} />
      </motion.a>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <span className="text-xl font-bold">WebFitYou</span>
              </div>
              <p className="text-gray-400 text-sm">
                {t('footer.tagline')}
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{t('footer.services.title')}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {t('footer.services.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{t('footer.company.title')}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/a-propos" className="hover:text-white transition-colors">{t('nav.about')}</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">{t('nav.blog')}</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{t('footer.contact.title')}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a className="hover:text-white" href="mailto:webfityou@gmail.com">webfityou@gmail.com</a></li>
                <li>+33 1 23 45 67 89</li>
                <li>Paris, France</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
