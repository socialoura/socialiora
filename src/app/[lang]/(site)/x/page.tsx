'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Language } from '@/i18n/config';
import { Bot, Clock, Shield, Package, Megaphone, BarChart3 } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import Image from 'next/image';
import TrustpilotBadge from '@/components/TrustpilotBadge';

import GoalSelectionModal from '@/components/GoalSelectionModal';
const PaymentModal = dynamic(() => import('@/components/PaymentModal'), { ssr: false });
const OrderSuccessModal = dynamic(() => import('@/components/OrderSuccessModal'), { ssr: false });
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), { ssr: false });
const ReviewsSection = dynamic(() => import('@/components/ReviewsSection'));
const TrustedBrands = dynamic(() => import('@/components/TrustedBrands'));
const SocialProofToast = dynamic(() => import('@/components/SocialProofToast'), { ssr: false });

interface PageProps {
  params: { lang: string };
}

interface FollowerGoal {
  followers: number;
  price: number;
  originalPrice: number;
  discount: number;
  popular?: boolean;
}

export default function TwitterPage({ params }: PageProps) {
  const lang = params.lang as Language;
  
  // State management
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<FollowerGoal | null>(null);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [showToast, setShowToast] = useState(false);

  const { currency } = useCurrency();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/@/g, '');
    setUsername(value);
  };

  const handleContinue = () => {
    if (username.trim().length > 0) {
      setIsGoalModalOpen(true);
    }
  };

  const handleGoalSelected = (goal: FollowerGoal, emailParam: string) => {
    setSelectedGoal(goal);
    setEmail(emailParam);
    setIsGoalModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = async (paymentIntentIdParam: string) => {
    setPaymentIntentId(paymentIntentIdParam);
    setIsPaymentModalOpen(false);
    setIsSuccessModalOpen(true);
    setShowToast(true);
    
    // Save order to database
    try {
      await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          platform: 'twitter',
          followers: selectedGoal?.followers || 0,
          amount: selectedGoal?.price || 0,
          paymentId: paymentIntentIdParam,
        }),
      });
    } catch (error) {
      console.error('Error saving order:', error);
    }
    
    // Hide toast after 5 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleCloseGoalModal = () => {
    setIsGoalModalOpen(false);
  };
  
  const content = {
    en: {
      hero: {
        title: 'AMPLIFY YOUR INFLUENCE ON',
        platform: 'X (TWITTER)',
        subtitle: 'Expert visibility enhancement via our proprietary partner ecosystem — engineered to broaden your exposure authentically on X.',
        badges: [
          { text: '100% Verified methodology' },
          { text: 'Secure & Confidential' },
          { text: 'Client-validated' },
        ],
        cta: 'CONTINUE',
      },
      difference: {
        title: 'What distinguishes Socialiora?',
        cards: [
          {
            title: 'Verified Outreach Exclusively',
            description: 'We elevate your profile via established partnerships and tactical alliances. Every engagement is authentic and platform-compliant.',
            icon: 'Bot'
          },
          {
            title: 'Efficiency-optimized methods',
            description: 'Concentrate on crafting compelling content while we manage visibility strategy. Our expert approach conserves countless outreach hours.',
            icon: 'Clock'
          },
          {
            title: 'Establish authority properly',
            description: 'Tactical exposure via reputable channels cultivates genuine influence and interaction with your ideal demographics on X.',
            icon: 'Shield'
          },
        ],
      },
      howItWorks: {
        title: 'How it works',
        cards: [
          {
            number: '1',
            title: 'SELECT YOUR TIER',
            description: 'Pick the visibility support level matching your objectives. Our programs deliver expert exposure via our proprietary partner ecosystem.',
            icon: 'Package'
          },
          {
            number: '2',
            title: 'WE AMPLIFY YOUR PRESENCE',
            description: 'We distribute your profile across curated platforms, influencers, and networks to connect with audiences authentically engaged in your vertical.',
            icon: 'Megaphone'
          },
          {
            number: '3',
            title: 'MEASURE PERFORMANCE',
            description: 'Observe your metrics as your profile penetrates fresh demographics and strengthens exposure on X.',
            icon: 'BarChart3'
          },
        ],
        cta: 'START NOW',
      },
      benefits: {
        title: 'Reclaim your influence today',
        items: [
          'Enhanced exposure for your content',
          'Amplified presence on X',
          'Build audience credibility via sustained visibility',
          'Connect with demographics aligned to your vertical',
          'Expert-grade secure methodology',
        ],
      },
      pricing: {
        title: 'Experience our platform with complimentary access',
        plan: {
          name: 'PREMIUM',
          price: '$39.90',
          period: 'per month',
          features: [
            '24h trial to explore all features',
            'Demographic intelligence and segmentation',
            'Content distribution advisory',
            'Expert visibility initiatives',
            'Tactical insights to maximize exposure',
          ],
          cta: 'SUBSCRIBE NOW',
        },
      },
      finalCta: {
        title: 'Beyond a platform. Your dedicated growth ally.',
        cta: 'ACTIVATE NOW',
      },
      compliance: {
        text: 'Legal Notice: Our services utilize verified audience development methodologies and exposure enhancement techniques fully aligned with platform guidelines and service agreements.',
      },
    },
    fr: {
      hero: {
        title: 'AMPLIFIEZ VOTRE INFLUENCE SUR',
        platform: 'X (TWITTER)',
        subtitle: 'Amélioration de visibilité experte via notre écosystème partenaire propriétaire — conçue pour élargir votre exposition authentiquement sur X.',
        badges: [
          { text: 'Méthodologie 100% vérifiée' },
          { text: 'Sécurisé et Confidentiel' },
          { text: 'Validé par les clients' },
        ],
        cta: 'CONTINUER',
      },
      difference: {
        title: 'Qu\'est-ce qui distingue Socialiora ?',
        cards: [
          {
            title: 'Diffusion vérifiée exclusivement',
            description: 'Nous élevons votre profil via des partenariats établis et des alliances tactiques. Chaque engagement est authentique et conforme aux plateformes.',
            icon: 'Bot'
          },
          {
            title: 'Méthodes optimisées pour l\'efficacité',
            description: 'Concentrez-vous sur la création de contenu percutant pendant que nous pilotons la stratégie de visibilité. Notre approche experte économise d\'innombrables heures de diffusion.',
            icon: 'Clock'
          },
          {
            title: 'Établissez votre autorité correctement',
            description: 'Une exposition tactique via des canaux réputés cultive une influence authentique et une interaction avec vos démographies idéales sur X.',
            icon: 'Shield'
          },
        ],
      },
      howItWorks: {
        title: 'Comment ça marche',
        cards: [
          {
            number: '1',
            title: 'SÉLECTIONNEZ VOTRE NIVEAU',
            description: 'Choisissez le niveau de support visibilité correspondant à vos objectifs. Nos programmes offrent une exposition experte via notre écosystème partenaire propriétaire.',
            icon: 'Package'
          },
          {
            number: '2',
            title: 'NOUS AMPLIFIONS VOTRE PRÉSENCE',
            description: 'Nous distribuons votre profil à travers des plateformes, influenceurs et réseaux sélectionnés pour connecter avec des audiences authentiquement engagées dans votre vertical.',
            icon: 'Megaphone'
          },
          {
            number: '3',
            title: 'MESUREZ LA PERFORMANCE',
            description: 'Observez vos métriques pendant que votre profil pénètre de nouvelles démographies et renforce l\'exposition sur X.',
            icon: 'BarChart3'
          },
        ],
        cta: 'COMMENCER MAINTENANT',
      },
      benefits: {
        title: 'Reprenez votre influence aujourd\'hui',
        items: [
          'Exposition renforcée pour votre contenu',
          'Présence amplifiée sur X',
          'Construisez la crédibilité de l\'audience via une visibilité soutenue',
          'Connectez avec des démographies alignées à votre vertical',
          'Méthodologie sécurisée de niveau expert',
        ],
      },
      pricing: {
        title: 'Expérimentez notre plateforme avec un accès gratuit',
        plan: {
          name: 'PREMIUM',
          price: '39,90€',
          period: 'par mois',
          features: [
            'Essai de 24h pour explorer toutes les fonctionnalités',
            'Intelligence démographique et segmentation',
            'Conseil en distribution de contenu',
            'Initiatives de visibilité expertes',
            'Insights tactiques pour maximiser l\'exposition',
          ],
          cta: 'S\'ABONNER MAINTENANT',
        },
      },
      finalCta: {
        title: 'Au-delà d\'une plateforme. Votre allié de croissance dédié.',
        cta: 'ACTIVER MAINTENANT',
      },
      compliance: {
        text: 'Avis légal : Nos services utilisent des méthodologies vérifiées de développement d\'audience et des techniques d\'amélioration de l\'exposition entièrement alignées avec les directives et accords de service des plateformes.',
      },
    },
    de: {
      hero: {
        title: 'STEIGERN SIE IHRE PRÄSENZ AUF',
        platform: 'X (TWITTER)',
        subtitle: 'Professionelle Marketinglösungen über unser exklusives Partnernetzwerk — entwickelt, um Ihre Reichweite authentisch auf X zu erweitern.',
        badges: [
          { text: '100% Authentischer Ansatz' },
          { text: 'Sicher & Privat' },
          { text: 'Von Kunden bestätigt' },
        ],
        cta: 'WEITER',
      },
      difference: {
        title: 'Was macht Socialiora anders?',
        cards: [
          {
            title: 'Nur authentisches Marketing',
            description: 'Wir bewerben Ihr Profil durch echte Partnerschaften und strategische Kooperationen. Jede Interaktion ist echt und konform mit den Plattformrichtlinien.',
            icon: 'Bot'
          },
          {
            title: 'Zeitsparende Lösungen',
            description: 'Konzentrieren Sie sich auf das Erstellen großartiger Tweets, während wir die Marketingstrategie übernehmen. Unser professioneller Ansatz spart Ihnen Stunden.',
            icon: 'Clock'
          },
          {
            title: 'Glaubwürdigkeit richtig aufbauen',
            description: 'Strategische Promotion über vertrauenswürdige Kanäle baut echte Autorität und Engagement mit Ihrer Zielgruppe auf X auf.',
            icon: 'Shield'
          },
        ],
      },
      howItWorks: {
        title: 'So funktioniert es',
        cards: [
          {
            number: '1',
            title: 'WÄHLEN SIE IHR PAKET',
            description: 'Wählen Sie die Marketing-Unterstützungsstufe, die zu Ihren Zielen passt. Unsere Pläne bieten professionelle Promotion über unser exklusives Partnernetzwerk.',
            icon: 'Package'
          },
          {
            number: '2',
            title: 'WIR BEWERBEN IHR PROFIL',
            description: 'Wir teilen Ihr Profil über ausgewählte Plattformen, Creator und Communities, um Menschen zu erreichen, die sich für Ihre Nische interessieren.',
            icon: 'Megaphone'
          },
          {
            number: '3',
            title: 'VERFOLGEN SIE DIE WIRKUNG',
            description: 'Überwachen Sie Ihre Ergebnisse, während Ihr Profil neue Zielgruppen erreicht und stärkere Sichtbarkeit auf X aufbaut.',
            icon: 'BarChart3'
          },
        ],
        cta: 'JETZT STARTEN',
      },
      benefits: {
        title: 'Übernehmen Sie jetzt (wieder) die Kontrolle',
        items: [
          'Größere Sichtbarkeit für Ihre Tweets',
          'Stärkere Präsenz auf X',
          'Gewinnen Sie das Vertrauen Ihres Publikums durch konsistente Präsenz',
          'Erreichen Sie mehr Menschen, die sich für Ihre Nische interessieren',
          'Professioneller und sicherer Prozess',
        ],
      },
      pricing: {
        title: 'Testen Sie unser Abo mit unserem Probenangebot',
        plan: {
          name: 'PREMIUM',
          price: '39,90€',
          period: 'pro Monat',
          features: [
            '24h Probezeit zum Entdecken aller Funktionen',
            'Zielgruppenrecherche und Targeting',
            'Content-Platzierungsberatung',
            'Professionelle Promotion',
            'Strategische Empfehlungen zur Reichweitensteigerung',
          ],
          cta: 'JETZT ABONNIEREN',
        },
      },
      finalCta: {
        title: 'Viel mehr als nur eine Lösung. Ein echter Partner für Ihren Erfolg.',
        cta: 'JETZT STARTEN',
      },
      compliance: {
        text: 'Konformitätshinweis: Alle unsere Dienstleistungen basieren auf authentischen Marketingstrategien und Sichtbarkeitslösungen in Übereinstimmung mit den Plattformrichtlinien und Nutzungsbedingungen.',
      },
    },
    es: {
      hero: {
        title: 'ELEVA TU PRESENCIA EN',
        platform: 'X (TWITTER)',
        subtitle: 'Soluciones de marketing profesionales a través de nuestra red exclusiva de socios — diseñadas para ampliar tu alcance de forma auténtica en X.',
        badges: [
          { text: 'Enfoque 100% auténtico' },
          { text: 'Seguro y privado' },
          { text: 'Aprobado por clientes' },
        ],
        cta: 'CONTINUAR',
      },
      difference: {
        title: '¿Qué hace diferente a Socialiora?',
        cards: [
          {
            title: 'Solo marketing auténtico',
            description: 'Promocionamos tu perfil a través de colaboraciones reales y asociaciones estratégicas. Cada interacción es genuina y conforme con las directrices de la plataforma.',
            icon: 'Bot'
          },
          {
            title: 'Soluciones que ahorran tiempo',
            description: 'Concéntrate en crear tweets de calidad mientras nosotros gestionamos la estrategia de marketing. Nuestro enfoque profesional te ahorra horas.',
            icon: 'Clock'
          },
          {
            title: 'Construye credibilidad de la forma correcta',
            description: 'La promoción estratégica a través de canales de confianza construye autoridad real y engagement con tu audiencia objetivo en X.',
            icon: 'Shield'
          },
        ],
      },
      howItWorks: {
        title: 'Cómo funciona',
        cards: [
          {
            number: '1',
            title: 'ELIGE TU PAQUETE',
            description: 'Selecciona el nivel de soporte de marketing que se alinee con tus objetivos. Nuestros planes ofrecen promoción profesional a través de nuestra red exclusiva de socios.',
            icon: 'Package'
          },
          {
            number: '2',
            title: 'PROMOCIONAMOS TU PERFIL',
            description: 'Compartimos tu perfil a través de plataformas, creadores y comunidades seleccionadas para llegar a personas genuinamente interesadas en tu nicho.',
            icon: 'Megaphone'
          },
          {
            number: '3',
            title: 'RASTREA EL IMPACTO',
            description: 'Monitoriza tus resultados mientras tu perfil alcanza nuevas audiencias y construye mayor visibilidad en X.',
            icon: 'BarChart3'
          },
        ],
        cta: 'EMPEZAR AHORA',
      },
      benefits: {
        title: '(Re)toma el control ahora',
        items: [
          'Mayor visibilidad para tus tweets',
          'Presencia más fuerte en X',
          'Gana la confianza de tu audiencia con exposición constante',
          'Llega a más personas interesadas en tu nicho',
          'Proceso profesional y seguro',
        ],
      },
      pricing: {
        title: 'Prueba nuestra suscripción con nuestra oferta de prueba',
        plan: {
          name: 'PREMIUM',
          price: '39,90€',
          period: 'al mes',
          features: [
            'Prueba de 24h para explorar todas las funciones',
            'Investigación y segmentación de audiencia',
            'Guía de colocación de contenido',
            'Promoción profesional',
            'Recomendaciones estratégicas para mejorar el alcance',
          ],
          cta: 'SUSCRIBIRSE AHORA',
        },
      },
      finalCta: {
        title: 'Mucho más que una simple solución. Un verdadero socio en tu éxito.',
        cta: 'EMPIEZA YA',
      },
      compliance: {
        text: 'Aviso de conformidad: Todos nuestros servicios se basan en estrategias de marketing auténticas y soluciones de visibilidad conforme a las políticas y condiciones de servicio de las plataformas.',
      },
    },
  };

  const t = content[lang];

  return (
    <div className="bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[auto] sm:min-h-[70vh] flex items-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 via-gray-950 to-gray-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-gray-600/5 to-gray-500/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        <div className="relative mx-auto max-w-5xl px-6 py-8 sm:py-20 lg:px-8 w-full">
          <div className="text-center">
            {/* Platform Badge */}
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-black mb-4 sm:mb-8 shadow-lg shadow-gray-500/30 border border-gray-700">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white md:text-6xl mb-2 sm:mb-4 leading-tight">
              {t.hero.title}
            </h1>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight md:text-6xl mb-4 sm:mb-8 leading-tight bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
              {t.hero.platform}
            </h1>
            <p className="text-sm sm:text-lg leading-relaxed text-gray-400 max-w-2xl mx-auto mb-5 sm:mb-10">
              {t.hero.subtitle}
            </p>
            
            {/* Badges */}
            <div className="hidden sm:flex flex-wrap items-center justify-center gap-3 mb-12">
              {t.hero.badges.map((badge, index) => (
                <div key={index} className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300">
                  <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {badge.text}
                </div>
              ))}
            </div>

            {/* Username Input & CTA Button */}
            <div className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-medium">
                    @
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder={lang === 'fr' ? 'nomutilisateur' : lang === 'de' ? 'Benutzername' : lang === 'es' ? 'nombreusuario' : 'username'}
                    className="w-full pl-10 pr-4 py-4 text-base bg-transparent border-0 focus:ring-0 text-white placeholder-gray-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
                  />
                </div>
                <button
                  onClick={handleContinue}
                  className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-700 via-gray-800 to-black px-8 py-4 text-base font-bold text-white shadow-lg shadow-gray-500/25 hover:shadow-xl hover:shadow-gray-400/40 hover:scale-[1.02] transition-all duration-300 uppercase tracking-wide group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t.hero.cta}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-500">
                <TrustpilotBadge />
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>{lang === 'fr' ? 'Paiement sécurisé' : lang === 'de' ? 'Sichere Zahlung' : lang === 'es' ? 'Pago seguro' : 'Secure payment'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{lang === 'fr' ? 'Résultats garantis' : lang === 'de' ? 'Garantierte Ergebnisse' : lang === 'es' ? 'Resultados garantizados' : 'Guaranteed results'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Different Section */}
      <section className="py-20 sm:py-28 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl mb-4">
              {t.difference.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gray-400 to-white mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.difference.cards.map((card, index) => {
              const IconComponent = card.icon === 'Bot' ? Bot : card.icon === 'Clock' ? Clock : Shield;
              return (
                <div
                  key={index}
                  className="group relative p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 hover:bg-gray-800/80"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-600 to-black rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-gray-500/20 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {card.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-28 bg-gray-950 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl mb-4">
              {t.howItWorks.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gray-400 to-white mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {t.howItWorks.cards.map((card, index) => {
              const IconComponent = card.icon === 'Package' ? Package : card.icon === 'Megaphone' ? Megaphone : BarChart3;
              return (
                <div key={index} className="relative group">
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-500/50 to-transparent z-0" />
                  )}
                  
                  <div className="relative p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 h-full">
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-gray-500 to-black rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-gray-500/30">
                      {index + 1}
                    </div>
                    
                    <div className="mt-4">
                      <div className="w-14 h-14 bg-gray-700/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-500/20 transition-colors">
                        <IconComponent className="w-7 h-7 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">
                        {card.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-16 text-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-700 via-gray-800 to-black px-10 py-4 text-base font-bold text-white shadow-lg shadow-gray-500/25 hover:shadow-xl hover:shadow-gray-400/40 hover:scale-[1.02] transition-all duration-300 uppercase tracking-wide group"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t.howItWorks.cta}
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-600/10 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl mb-4">
              {t.benefits.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gray-400 to-white mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side: Bento Grid Layout */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl p-6 flex items-center justify-center min-h-[160px] shadow-lg shadow-gray-500/20 hover:scale-[1.02] transition-transform">
                <p className="text-white text-lg font-bold text-center leading-relaxed">
                  {t.benefits.items[0]}
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 flex items-center justify-center min-h-[160px] border border-gray-700 hover:border-gray-500/50 transition-colors">
                <p className="text-white text-lg font-bold text-center leading-relaxed">
                  {t.benefits.items[1]}
                </p>
              </div>
              
              <div className="col-span-2 bg-gradient-to-r from-gray-700 via-gray-800 to-black rounded-2xl p-6 flex items-center justify-center min-h-[140px] shadow-lg shadow-gray-500/20 hover:scale-[1.01] transition-transform">
                <p className="text-white text-lg font-bold text-center leading-relaxed">
                  {t.benefits.items[2]}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-500 to-gray-700 rounded-2xl p-6 flex items-center justify-center min-h-[160px] shadow-lg shadow-gray-500/20 hover:scale-[1.02] transition-transform">
                <p className="text-white text-lg font-bold text-center leading-relaxed">
                  {t.benefits.items[3]}
                </p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 flex items-center justify-center min-h-[160px] shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-transform">
                <p className="text-white text-lg font-bold text-center leading-relaxed">
                  {t.benefits.items[4]}
                </p>
              </div>
            </div>
            
            {/* Right side: Image with overlay */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-gray-500 to-white rounded-3xl blur-2xl opacity-20" />
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
            {t.compliance.text}
          </p>
        </div>
      </section>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 max-w-md animate-slide-in">
          <div className="rounded-lg bg-green-600 dark:bg-green-500 p-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">
                  {lang === 'fr' ? 'Paiement Réussi !' : lang === 'de' ? 'Zahlung erfolgreich!' : lang === 'es' ? '¡Pago exitoso!' : 'Payment Successful!'}
                </p>
                <p className="text-xs text-green-50">
                  {lang === 'fr' ? 'Votre commande a été confirmée' : lang === 'de' ? 'Ihre Bestellung wurde bestätigt' : lang === 'es' ? 'Tu pedido ha sido confirmado' : 'Your order has been confirmed'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Goal Selection Modal */}
      <GoalSelectionModal
        isOpen={isGoalModalOpen}
        onClose={handleCloseGoalModal}
        onSelectGoal={handleGoalSelected}
        username={username}
        platform="twitter"
        language={lang}
      />

      {/* Payment Modal */}
      {selectedGoal && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          amount={Math.round(selectedGoal.price * 100)}
          currency={currency}
          onClose={handleClosePaymentModal}
          onSuccess={handlePaymentSuccess}
          productName={`+${selectedGoal.followers} X (Twitter) followers`}
          language={lang}
          email={email}
          orderDetails={{
            platform: 'twitter',
            followers: selectedGoal.followers,
            username: username,
          }}
        />
      )}

      {/* Order Success Modal */}
      {selectedGoal && (
        <OrderSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={handleCloseSuccessModal}
          paymentIntentId={paymentIntentId}
          productName={`+${selectedGoal.followers} X (Twitter) followers`}
          amount={Math.round(selectedGoal.price * 100)}
          currency={currency}
          username={username}
          language={lang}
        />
      )}

      {/* Trusted Brands */}
      <TrustedBrands lang={lang} />

      {/* Reviews Section */}
      <ReviewsSection lang={lang} platform="twitter" />

      {/* Chat Widget */}
      <ChatWidget lang={lang} />

      {/* Social Proof Toast */}
      <SocialProofToast lang={lang} />
    </div>
  );
}
