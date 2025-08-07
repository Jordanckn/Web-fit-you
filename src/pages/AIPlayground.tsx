import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  PenLine,
  Image as ImageIcon,
  Linkedin,
  Instagram,
  Facebook,
  Send,
  Lock,
  AlertCircle,
  RefreshCw,
  MessageSquare,
  Copy,
  Download,
  Mail
} from 'lucide-react';

// NOTE IMPORTANTE (environnement WebContainer):
// - Pas de backend réel ici. Le flux OTP et l'envoi d'email sont simulés côté client.
// - En production, déplacer OTP, sessions, et proxy IA côté serveur (voir docs/ia-playground).

type TabKey = 'linkedin' | 'instagram' | 'facebook' | 'image';

interface LeadInfo {
  name: string;
  email: string;
  company?: string;
  sector?: string;
  goal?: string;
  consent: boolean;
}

const defaultLead: LeadInfo = { name: '', email: '', company: '', sector: '', goal: '', consent: false };

const tabs: { key: TabKey; label: string; icon: React.ReactNode; gradient: string; desc: string }[] = [
  { key: 'linkedin', label: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, gradient: 'from-blue-500 to-indigo-600', desc: 'Mini-article 150–250 mots, 3 hashtags, CTA' },
  { key: 'instagram', label: 'Instagram', icon: <Instagram className="w-5 h-5" />, gradient: 'from-pink-500 to-yellow-500', desc: 'Légende 100–150 mots, emojis, 5–8 hashtags' },
  { key: 'facebook', label: 'Facebook', icon: <Facebook className="w-5 h-5" />, gradient: 'from-blue-600 to-cyan-500', desc: 'Post 80–140 mots, ton convivial, CTA local' },
  { key: 'image', label: 'Images', icon: <ImageIcon className="w-5 h-5" />, gradient: 'from-teal-500 to-emerald-500', desc: '3 concepts + prompt image détaillé' },
];

const aiDark = "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900";

type Message = { role: 'user' | 'assistant' | 'system'; content: string };

const AIPlayground: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabKey>('linkedin');
  const [lead, setLead] = useState<LeadInfo>(defaultLead);
  const [formStep, setFormStep] = useState<'lead' | 'code' | 'granted'>('lead');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [attempts, setAttempts] = useState(3);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [brief, setBrief] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [ideas, setIdeas] = useState<any[]>([]);
  const [chosenIdea, setChosenIdea] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [credits, setCredits] = useState(3);

  const platformDesc = useMemo(() => tabs.find(t => t.key === activeTab)?.desc ?? '', [activeTab]);

  const cooldownActive = lockedUntil ? Date.now() < lockedUntil : false;
  const cooldownRemaining = cooldownActive ? Math.ceil((lockedUntil! - Date.now()) / 1000) : 0;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!lead.consent) {
      setErrorMsg('Veuillez consentir au traitement de vos données.');
      return;
    }
    // Simule envoi à admin
    console.log('Lead envoyé à admin: webfityou@gmail.com =>', lead);
    // Génère OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setFormStep('code');
    console.log('OTP (démo) envoyé à', lead.email, 'code:', code);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldownActive) {
      setErrorMsg(`Session bloquée. Réessayez dans ${cooldownRemaining}s.`);
      return;
    }
    if (otp === generatedOtp) {
      setFormStep('granted');
      setAttempts(3);
      setLockedUntil(null);
      setErrorMsg('');
    } else {
      const left = attempts - 1;
      setAttempts(left);
      if (left <= 0) {
        const lock = Date.now() + 15 * 60 * 1000; // 15 min
        setLockedUntil(lock);
        setErrorMsg('Nombre d’essais dépassé. Session bloquée 15 minutes.');
        setAttempts(3);
      } else {
        setErrorMsg(`Code incorrect. Il vous reste ${left} essai(s).`);
      }
    }
  };

  const openChat = () => {
    if (formStep !== 'granted') return;
    setShowChat(true);
    setMessages([]);
    setIdeas([]);
    setChosenIdea(null);
  };

  // Simulations IA côté client (remplacer par appels proxy serveur)
  const simulateIdeas = () => {
    setLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      const fake = [
        { id: 'a1', title: 'Moderniser votre présence locale', angle: 'Mettre en avant la preuve sociale', value: 'Attirer plus de prospects', cta: 'Découvrir nos offres' },
        { id: 'a2', title: 'Automatiser sans perdre l’authenticité', angle: 'Montrer les bénéfices concrets', value: 'Gagner du temps', cta: 'Prendre rendez-vous' },
        { id: 'a3', title: 'Transformer vos articles en posts performants', angle: 'Cadence X5', value: 'Plus d’engagement', cta: 'Voir des exemples' }
      ];
      setIdeas(fake);
      setMessages([{ role: 'assistant', content: 'Voici 3 idées proposées. Choisissez-en une ou régénérez.' }]);
      setLoading(false);
    }, 900);
  };

  const simulateFinal = () => {
    setLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      const base = `Contenu final prêt à publier pour ${activeTab} sur le thème: "${brief}".`;
      setMessages(prev => [...prev, { role: 'assistant', content: base + '\n\nHashtags: #IA #MarketingDigital #Automation' }]);
      setLoading(false);
      setCredits(c => Math.max(0, c - 1));
    }, 900);
  };

  const copyToClipboard = async () => {
    const txt = messages.map(m => (m.role === 'assistant' ? m.content : '')).join('\n\n').trim();
    if (!txt) return;
    await navigator.clipboard.writeText(txt);
  };

  const downloadText = (asMd = false) => {
    const txt = messages.map(m => `${m.role === 'user' ? 'Utilisateur' : 'IA'}: ${m.content}`).join('\n\n');
    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = asMd ? 'contenu.md' : 'contenu.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const mailContent = () => {
    const subject = encodeURIComponent('Contenu généré');
    const body = encodeURIComponent(messages.map(m => `${m.role === 'user' ? 'Utilisateur' : 'IA'}: ${m.content}`).join('\n\n'));
    window.location.href = `mailto:${lead.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <Helmet>
        <title>Testez nos IA — WebFitYou</title>
        <meta name="description" content="Générez des idées et contenus prêts à publier: LinkedIn, Instagram, Facebook et prompts d’images. Accès par inscription + OTP (3 essais)." />
      </Helmet>

      <section className={`pt-20 pb-10 ${aiDark} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold">
              <Sparkles className="w-4 h-4" /> Playground IA
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mt-4">Testez nos IA</h1>
            <p className="text-slate-300 mt-3 max-w-2xl mx-auto">
              LinkedIn, Instagram, Facebook et images — 3 idées puis contenu final prêt à publier. Accès après validation OTP (3 essais).
            </p>
            <button
              onClick={() => setFormStep('lead')}
              className="mt-6 inline-flex items-center px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold"
            >
              Se connecter / S’inscrire
            </button>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-2 justify-center">
            {tabs.map((tab) => (
              <div key={tab.key} className={`p-0.5 rounded-xl bg-gradient-to-r ${tab.gradient}`}>
                <button
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.key ? 'bg-white text-gray-900 shadow' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <PenLine className="w-5 h-5 text-blue-600" /> Thème / brief
                </h3>
                <p className="text-sm text-gray-600 mb-4">{platformDesc}</p>
                <textarea
                  rows={6}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder='Ex: "contenu pour mon site de serrurier"'
                />
                <button
                  onClick={openChat}
                  disabled={formStep !== 'granted' || credits <= 0}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:bg-gray-300"
                >
                  <MessageSquare className="w-4 h-4" />
                  Générer pour {tabs.find(t => t.key === activeTab)?.label}
                </button>

                <div className="mt-4 text-xs text-gray-600 flex items-start gap-2">
                  <Lock className="w-4 h-4 text-gray-400 mt-0.5" />
                  {formStep !== 'granted'
                    ? 'Accès restreint: inscription + code OTP (3 essais).'
                    : `Crédits restants: ${credits}/3`}
                </div>

                {errorMsg && (
                  <div className="mt-3 text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errorMsg}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              {formStep === 'lead' && (
                <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Accédez au générateur</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Renseignez vos informations. Un code vous sera envoyé par email. Nous recevrons aussi votre demande à webfityou@gmail.com.
                  </p>
                  <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      required
                      placeholder="Nom complet"
                      className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      value={lead.name}
                      onChange={(e) => setLead({ ...lead, name: e.target.value })}
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email"
                      className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      value={lead.email}
                      onChange={(e) => setLead({ ...lead, email: e.target.value })}
                    />
                    <input
                      placeholder="Entreprise"
                      className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      value={lead.company}
                      onChange={(e) => setLead({ ...lead, company: e.target.value })}
                    />
                    <input
                      placeholder="Secteur (ex: artisanat, services B2B)"
                      className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      value={lead.sector}
                      onChange={(e) => setLead({ ...lead, sector: e.target.value })}
                    />
                    <input
                      placeholder="Objectif marketing (ex: générer des leads)"
                      className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
                      value={lead.goal}
                      onChange={(e) => setLead({ ...lead, goal: e.target.value })}
                    />
                    <label className="md:col-span-2 text-sm text-gray-600 flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={lead.consent}
                        onChange={(e) => setLead({ ...lead, consent: e.target.checked })}
                        className="mt-1"
                        aria-describedby="rgpd-desc"
                      />
                      <span id="rgpd-desc">
                        J’accepte le traitement de mes données pour la démonstration. Voir la{' '}
                        <a href="/politique-confidentialite" className="text-blue-600 underline">Politique de confidentialité</a>.
                      </span>
                    </label>
                    <button type="submit" className="md:col-span-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                      Recevoir le code
                    </button>
                  </form>
                </div>
              )}

              {formStep === 'code' && (
                <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Validation par code</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Saisissez le code à 6 chiffres envoyé à votre email. Tentatives restantes: {attempts}. {lockedUntil && cooldownActive && `(bloqué ${cooldownRemaining}s)`}
                  </p>
                  <form onSubmit={handleVerify} className="flex gap-3 items-center">
                    <input
                      required
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="••••••"
                      className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none tracking-widest"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                      aria-invalid={!!errorMsg}
                      aria-describedby="otp-error"
                    />
                    <button type="submit" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition">
                      Valider
                    </button>
                  </form>
                  {errorMsg && <div id="otp-error" className="mt-3 text-sm text-red-600 flex items-center gap-2"><AlertCircle className="w-4 h-4" />{errorMsg}</div>}
                </div>
              )}

              {formStep === 'granted' && (
                <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Prêt à générer</h3>
                  <p className="text-sm text-gray-600">Sélectionnez un onglet et ouvrez le chat pour générer des idées et un contenu final.</p>
                </div>
              )}
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aperçu et conseils</h3>
                <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                  <li>Rédigez un brief clair (secteur, objectif, audience).</li>
                  <li>Vous obtiendrez 3 idées, puis un contenu prêt à publier.</li>
                  <li>Limite: 3 générations complètes par session.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowChat(false)} />
          <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-indigo-600 to-teal-600 text-white">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span className="font-semibold">Générateur — {tabs.find(t => t.key === activeTab)?.label}</span>
              </div>
              <button onClick={() => setShowChat(false)} aria-label="Fermer" className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20">
                Fermer
              </button>
            </div>

            <div className="p-5">
              {/* Step 1: enter brief */}
              {messages.length === 0 && ideas.length === 0 && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-700">
                    Indiquez votre thème/brief. L’IA proposera 3 idées adaptées à la plateforme.
                  </p>
                  <textarea
                    rows={5}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder='Ex: "contenu pour mon site de serrurier"'
                  />
                  <div className="flex items-center gap-3">
                    <button
                      disabled={loading || !brief.trim()}
                      onClick={simulateIdeas}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-300"
                    >
                      {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      Proposer 3 idées
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: ideas */}
              {ideas.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Idées proposées</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {ideas.map((idea) => (
                      <div key={idea.id} className={`p-4 border rounded-xl ${chosenIdea?.id === idea.id ? 'border-blue-600' : 'border-gray-200'}`}>
                        <h5 className="font-semibold text-gray-900">{idea.title}</h5>
                        <p className="text-sm text-gray-600 mt-1">{idea.angle}</p>
                        <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Valeur:</span> {idea.value}</p>
                        <p className="text-sm text-gray-600 mt-1"><span className="font-medium">CTA:</span> {idea.cta}</p>
                        <button
                          onClick={() => setChosenIdea(idea)}
                          className="mt-3 w-full px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
                        >
                          Choisir
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={simulateIdeas}
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 disabled:opacity-50"
                    >
                      {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                      Régénérer des idées
                    </button>
                    <button
                      onClick={simulateFinal}
                      disabled={!chosenIdea || loading || credits <= 0}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:bg-gray-300"
                    >
                      {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      Générer le contenu final
                    </button>
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.length > 0 && (
                <div className="mt-6">
                  <div className="space-y-3 max-h-80 overflow-auto border rounded-xl p-4">
                    {messages.map((m, idx) => (
                      <div key={idx} className={`p-3 rounded-lg ${m.role === 'assistant' ? 'bg-blue-50 text-gray-900' : 'bg-gray-50 text-gray-800'}`}>
                        <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                          {m.role === 'assistant' ? 'IA' : m.role === 'user' ? 'Utilisateur' : 'Système'}
                        </div>
                        <div className="whitespace-pre-wrap text-sm">{m.content}</div>
                      </div>
                    ))}
                    {loading && (
                      <div className="p-3 rounded-lg bg-gray-50 text-gray-800 flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" /> Génération en cours…
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <button onClick={copyToClipboard} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                      <Copy className="w-4 h-4" /> Copier
                    </button>
                    <button onClick={() => downloadText(false)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                      <Download className="w-4 h-4" /> Télécharger .txt
                    </button>
                    <button onClick={() => downloadText(true)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                      <Download className="w-4 h-4" /> Télécharger .md
                    </button>
                    <button onClick={mailContent} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                      <Mail className="w-4 h-4" /> Envoyer par email
                    </button>
                    <div className="ml-auto text-sm text-gray-600">Crédits restants: {credits}/3</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIPlayground;
