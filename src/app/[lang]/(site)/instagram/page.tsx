'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import posthog from 'posthog-js';
import useUpsellStore from '@/store/useUpsellStore';
import ProfileSearchInput from '@/components/upsell/ProfileSearchInput';
import ServiceSelector from '@/components/upsell/ServiceSelector';
import PostGrid from '@/components/upsell/PostGrid';
import CheckoutSummary from '@/components/upsell/CheckoutSummary';
import { getStripe } from '@/components/StripeProvider';
import { type Language } from '@/i18n/config';
import { getUpsellTranslations } from '@/i18n/upsell';
import { useAdsParams } from '@/hooks/useAdsParams';
import { Bot, Clock, Shield, Package, Megaphone, BarChart3 } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const ReviewsSection = dynamic(() => import('@/components/ReviewsSection'));
const TrustedBrands = dynamic(() => import('@/components/TrustedBrands'));

const stepVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function UpsellPage() {
  const params = useParams();
  const lang = (params?.lang as Language) || 'fr';
  const t = getUpsellTranslations(lang);
  const { currentStep } = useUpsellStore();
  useAdsParams();

  // Étape 0: Track tunnel page view on mount
  useEffect(() => {
    posthog.capture('instagram_tunnel_page_viewed');
  }, []);

  // Scroll to top on every step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Preload Stripe SDK when user reaches step 3 (payment) to save memory on earlier steps
  useEffect(() => {
    if (currentStep >= 3) {
      getStripe();
    }
  }, [currentStep]);

  const steps = [
    { id: 0, title: t.steps.profile },
    { id: 1, title: t.steps.services },
    { id: 2, title: t.steps.posts },
    { id: 3, title: t.steps.payment },
  ];

  return (
    <div className="relative isolate min-h-full bg-gray-950 font-sans selection:bg-pink-500/30">
      {/* Lightweight Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-gray-950 to-pink-900/10" />
      </div>

      {/* Progress Header */}
      <header className="sticky top-0 z-40 bg-gray-950/95 sm:bg-gray-950/80 sm:backdrop-blur-xl border-b border-gray-800/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-center">
          <div className="hidden sm:flex items-center gap-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20' 
                    : 'bg-gray-800 text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.id + 1
                  )}
                </div>
                <span className={`text-sm font-medium ${currentStep >= step.id ? 'text-white' : 'text-gray-500'}`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-px ${currentStep > step.id ? 'bg-pink-500/50' : 'bg-gray-800'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Progress */}
          <div className="flex sm:hidden items-center justify-between w-full">
            <span className="text-sm font-medium text-white">{steps[currentStep]?.title}</span>
            <span className="text-xs font-medium text-gray-500">{t.stepOf.replace('{current}', String(currentStep + 1))}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-20 min-h-[calc(100vh-64px)] flex flex-col">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div key="step-0" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.15 }} className="flex-1 flex flex-col">
              <ProfileSearchInput lang={lang} />
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div key="step-1" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.15 }} className="flex-1 flex flex-col">
              <ServiceSelector lang={lang} />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div key="step-2" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.15 }} className="flex-1 flex flex-col">
              <PostGrid lang={lang} />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div key="step-3" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.15 }} className="flex-1 flex flex-col">
              <CheckoutSummary lang={lang} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Marketing sections - only visible on step 0 (profile search) */}
      {currentStep === 0 && (
        <MarketingSections lang={lang} />
      )}
    </div>
  );
}

/* ───────── Marketing content translations ───────── */
const marketingContent = {
  en: {
    difference: {
      title: 'Why buy Instagram followers with AI',
      cards: [
        { title: 'Precise AI targeting', description: 'Our artificial intelligence analyzes your niche and content to connect you with real Instagram users interested in your topics. No bots, only authentic accounts.', icon: 'Bot' as const },
        { title: 'Natural progressive delivery', description: 'Followers arrive gradually to mimic organic growth. Our AI system adjusts the pace to guarantee the total security of your account.', icon: 'Clock' as const },
        { title: '100% Secure and compliant', description: 'No password required. Our follower acquisition method is fully compliant with Instagram rules. Your account stays 100% protected.', icon: 'Shield' as const },
      ],
    },
    howItWorks: {
      title: 'Buy your Instagram followers in 3 steps',
      cards: [
        { number: '1', title: 'ENTER YOUR INSTAGRAM USERNAME', description: 'Simply enter your Instagram username. No password needed, no login required. Just your public username.', icon: 'Package' as const },
        { number: '2', title: 'CHOOSE YOUR FOLLOWER PACK', description: 'Select the number of followers you want to buy. From 100 to 100K+ real followers, AI-targeted based on your content.', icon: 'Megaphone' as const },
        { number: '3', title: 'RECEIVE YOUR FOLLOWERS', description: 'Followers start arriving within minutes. Our AI delivers them progressively for natural and secure growth.', icon: 'BarChart3' as const },
      ],
      cta: 'BUY NOW',
    },
    benefits: {
      title: 'Why buy Instagram followers',
      items: [
        'More followers = more visibility on the Explore page',
        'Social proof attracts even more organic followers',
        'Brands collaborate with high-audience accounts',
        'Boost the Instagram algorithm with more subscribers',
        '100% secure purchase, guaranteed delivery, real followers',
      ],
    },
    compliance: {
      text: 'Transparency: Socialiora allows you to buy real Instagram followers via AI technology that targets authentic users interested in your content. We never sell bots or fake accounts. Our acquisition method is designed to comply with Instagram rules and guarantee the security of your account. The followers you buy are real active users.',
    },
  },
  fr: {
    difference: {
      title: 'Pourquoi acheter des followers Instagram avec l\'IA',
      cards: [
        { title: 'Ciblage IA précis', description: 'Notre intelligence artificielle analyse votre niche et votre contenu pour vous connecter avec de vrais utilisateurs Instagram intéressés par votre thématique. Pas de bots, que des comptes authentiques.', icon: 'Bot' as const },
        { title: 'Livraison progressive naturelle', description: 'Les followers arrivent progressivement pour imiter une croissance organique. Notre système IA ajuste le rythme pour garantir la sécurité totale de votre compte.', icon: 'Clock' as const },
        { title: '100% Sécurisé et conforme', description: 'Aucun mot de passe requis. Notre méthode d\'acquisition de followers est entièrement conforme aux règles Instagram. Votre compte reste protégé à 100%.', icon: 'Shield' as const },
      ],
    },
    howItWorks: {
      title: 'Achetez vos followers Instagram en 3 étapes',
      cards: [
        { number: '1', title: 'ENTREZ VOTRE PSEUDO INSTAGRAM', description: 'Indiquez simplement votre nom d\'utilisateur Instagram. Aucun mot de passe nécessaire, aucune connexion requise. Juste votre pseudo public.', icon: 'Package' as const },
        { number: '2', title: 'CHOISISSEZ VOTRE PACK DE FOLLOWERS', description: 'Sélectionnez le nombre de followers que vous souhaitez acheter. De 100 à 100K+ followers réels, ciblés par IA selon votre contenu.', icon: 'Megaphone' as const },
        { number: '3', title: 'RECEVEZ VOS FOLLOWERS', description: 'Les followers commencent à arriver en quelques minutes. Notre IA les livre progressivement pour une croissance naturelle et sécurisée.', icon: 'BarChart3' as const },
      ],
      cta: 'ACHETER MAINTENANT',
    },
    benefits: {
      title: 'Pourquoi acheter des followers Instagram',
      items: [
        'Plus de followers = plus de visibilité sur la page Explorer',
        'La preuve sociale attire encore plus de followers organiques',
        'Les marques collaborent avec les comptes à forte audience',
        'Boostez l\'algorithme Instagram avec plus d\'abonnés',
        'Achat 100% sécurisé, livraison garantie, followers réels',
      ],
    },
    compliance: {
      text: 'Transparence : Socialiora vous permet d\'acheter des followers Instagram réels via une technologie d\'IA qui cible des utilisateurs authentiques intéressés par votre contenu. Nous ne vendons jamais de bots ou faux comptes. Notre méthode d\'acquisition est conçue pour respecter les règles Instagram et garantir la sécurité de votre compte. Les followers que vous achetez sont de vrais utilisateurs actifs.',
    },
  },
  de: {
    difference: {
      title: 'Warum Instagram-Follower mit KI kaufen',
      cards: [
        { title: 'Präzises KI-Targeting', description: 'Unsere künstliche Intelligenz analysiert Ihre Nische und Ihren Content, um Sie mit echten Instagram-Nutzern zu verbinden, die an Ihren Themen interessiert sind. Keine Bots, nur authentische Konten.', icon: 'Bot' as const },
        { title: 'Natürliche progressive Lieferung', description: 'Follower kommen schrittweise an, um organisches Wachstum zu imitieren. Unser KI-System passt das Tempo an, um die totale Sicherheit Ihres Kontos zu garantieren.', icon: 'Clock' as const },
        { title: '100% Sicher und konform', description: 'Kein Passwort erforderlich. Unsere Methode zur Follower-Akquise ist vollständig konform mit den Instagram-Regeln. Ihr Konto bleibt zu 100% geschützt.', icon: 'Shield' as const },
      ],
    },
    howItWorks: {
      title: 'Kaufen Sie Ihre Instagram-Follower in 3 Schritten',
      cards: [
        { number: '1', title: 'GEBEN SIE IHREN INSTAGRAM-NAMEN EIN', description: 'Geben Sie einfach Ihren Instagram-Benutzernamen ein. Kein Passwort nötig, keine Anmeldung erforderlich. Nur Ihr öffentlicher Benutzername.', icon: 'Package' as const },
        { number: '2', title: 'WÄHLEN SIE IHR FOLLOWER-PAKET', description: 'Wählen Sie die Anzahl der Follower, die Sie kaufen möchten. Von 100 bis 100K+ echte Follower, KI-gesteuert nach Ihrem Content.', icon: 'Megaphone' as const },
        { number: '3', title: 'ERHALTEN SIE IHRE FOLLOWER', description: 'Follower beginnen innerhalb von Minuten anzukommen. Unsere KI liefert sie progressiv für natürliches und sicheres Wachstum.', icon: 'BarChart3' as const },
      ],
      cta: 'JETZT KAUFEN',
    },
    benefits: {
      title: 'Warum Instagram-Follower kaufen',
      items: [
        'Mehr Follower = mehr Sichtbarkeit auf der Entdecken-Seite',
        'Social Proof zieht noch mehr organische Follower an',
        'Marken arbeiten mit Accounts mit hoher Reichweite zusammen',
        'Boosten Sie den Instagram-Algorithmus mit mehr Abonnenten',
        '100% sicherer Kauf, garantierte Lieferung, echte Follower',
      ],
    },
    compliance: {
      text: 'Transparenz: Socialiora ermöglicht es Ihnen, echte Instagram-Follower über eine KI-Technologie zu kaufen, die authentische Nutzer anspricht, die an Ihren Inhalten interessiert sind. Wir verkaufen niemals Bots oder Fake-Accounts. Unsere Akquisemethode ist darauf ausgelegt, die Instagram-Regeln zu respektieren und die Sicherheit Ihres Kontos zu garantieren.',
    },
  },
  es: {
    difference: {
      title: 'Por qué comprar seguidores de Instagram con IA',
      cards: [
        { title: 'Segmentación IA precisa', description: 'Nuestra inteligencia artificial analiza tu nicho y contenido para conectarte con usuarios reales de Instagram interesados en tu temática. Sin bots, solo cuentas auténticas.', icon: 'Bot' as const },
        { title: 'Entrega progresiva natural', description: 'Los seguidores llegan progresivamente para imitar un crecimiento orgánico. Nuestro sistema IA ajusta el ritmo para garantizar la seguridad total de tu cuenta.', icon: 'Clock' as const },
        { title: '100% Seguro y conforme', description: 'No se requiere contraseña. Nuestro método de adquisición de seguidores es totalmente conforme con las reglas de Instagram. Tu cuenta permanece protegida al 100%.', icon: 'Shield' as const },
      ],
    },
    howItWorks: {
      title: 'Compra tus seguidores de Instagram en 3 pasos',
      cards: [
        { number: '1', title: 'INGRESA TU NOMBRE DE INSTAGRAM', description: 'Simplemente indica tu nombre de usuario de Instagram. Sin contraseña necesaria, sin inicio de sesión requerido. Solo tu nombre de usuario público.', icon: 'Package' as const },
        { number: '2', title: 'ELIGE TU PACK DE SEGUIDORES', description: 'Selecciona el número de seguidores que deseas comprar. De 100 a 100K+ seguidores reales, dirigidos por IA según tu contenido.', icon: 'Megaphone' as const },
        { number: '3', title: 'RECIBE TUS SEGUIDORES', description: 'Los seguidores comienzan a llegar en minutos. Nuestra IA los entrega progresivamente para un crecimiento natural y seguro.', icon: 'BarChart3' as const },
      ],
      cta: 'COMPRAR AHORA',
    },
    benefits: {
      title: 'Por qué comprar seguidores de Instagram',
      items: [
        'Más seguidores = más visibilidad en la página Explorar',
        'La prueba social atrae aún más seguidores orgánicos',
        'Las marcas colaboran con cuentas de gran audiencia',
        'Impulsa el algoritmo de Instagram con más suscriptores',
        'Compra 100% segura, entrega garantizada, seguidores reales',
      ],
    },
    compliance: {
      text: 'Transparencia: Socialiora te permite comprar seguidores reales de Instagram a través de una tecnología de IA que se dirige a usuarios auténticos interesados en tu contenido. Nunca vendemos bots ni cuentas falsas. Nuestro método de adquisición está diseñado para respetar las reglas de Instagram y garantizar la seguridad de tu cuenta.',
    },
  },
};

/* ───────── Marketing Sections Component ───────── */
function MarketingSections({ lang }: { lang: Language }) {
  const mc = marketingContent[lang] || marketingContent.en;

  return (
    <>
      {/* What Makes Different Section */}
      <section className="py-20 sm:py-28 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl mb-4">
              {mc.difference.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-pink-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mc.difference.cards.map((card, index) => {
              const IconComponent = card.icon === 'Bot' ? Bot : card.icon === 'Clock' ? Clock : Shield;
              return (
                <div
                  key={index}
                  className="group relative p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 hover:bg-gray-800/80"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-28 bg-gray-950 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl mb-4">
              {mc.howItWorks.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-pink-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {mc.howItWorks.cards.map((card, index) => {
              const IconComponent = card.icon === 'Package' ? Package : card.icon === 'Megaphone' ? Megaphone : BarChart3;
              return (
                <div key={index} className="relative group">
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-pink-500/50 to-transparent z-0" />
                  )}

                  <div className="relative p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 h-full">
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-yellow-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-pink-500/30">
                      {index + 1}
                    </div>

                    <div className="mt-4">
                      <div className="w-14 h-14 bg-gray-700/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-500/20 transition-colors">
                        <IconComponent className="w-7 h-7 text-pink-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">{card.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="relative overflow-hidden rounded-xl bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 px-10 py-4 text-base font-bold text-white shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40 hover:scale-[1.02] transition-all duration-300 uppercase tracking-wide group"
            >
              <span className="relative z-10 flex items-center gap-2">
                {mc.howItWorks.cta}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-28 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-gray-900" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl mb-4">
              {mc.benefits.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-pink-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side: Bento Grid Layout */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 flex items-center justify-center min-h-[160px] shadow-lg shadow-yellow-500/20 hover:scale-[1.02] transition-transform">
                <p className="text-white text-lg font-bold text-center leading-relaxed">{mc.benefits.items[0]}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 flex items-center justify-center min-h-[160px] border border-gray-700 hover:border-pink-500/50 transition-colors">
                <p className="text-white text-lg font-bold text-center leading-relaxed">{mc.benefits.items[1]}</p>
              </div>
              <div className="col-span-2 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 rounded-2xl p-6 flex items-center justify-center min-h-[140px] shadow-lg shadow-pink-500/20 hover:scale-[1.01] transition-transform">
                <p className="text-white text-lg font-bold text-center leading-relaxed">{mc.benefits.items[2]}</p>
              </div>
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 flex items-center justify-center min-h-[160px] shadow-lg shadow-pink-500/20 hover:scale-[1.02] transition-transform">
                <p className="text-white text-lg font-bold text-center leading-relaxed">{mc.benefits.items[3]}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 flex items-center justify-center min-h-[160px] shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-transform">
                <p className="text-white text-lg font-bold text-center leading-relaxed">{mc.benefits.items[4]}</p>
              </div>
            </div>

            {/* Right side: Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500 to-pink-500 rounded-3xl blur-2xl opacity-20" />
              <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-gray-700">
                <Image
                  src="/img/creator-lifestyle-hero.webp"
                  alt="Woman using phone"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Disclaimer */}
      <section className="py-12 bg-gray-950 border-t border-gray-800">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="text-xs text-center text-gray-500 leading-relaxed">
            {mc.compliance.text}
          </p>
        </div>
      </section>

      {/* Trusted Brands */}
      <TrustedBrands lang={lang} />

      {/* Reviews Section */}
      <ReviewsSection lang={lang} platform="instagram" />
    </>
  );
}
