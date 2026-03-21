'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { type Language } from '@/i18n/config';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const platformContent = {
  en: {
    title: 'Choose Your Platform',
    subtitle: 'Start growing your social media presence today',
    instagram: {
      name: 'Instagram',
      description: 'Boost your Instagram followers, likes, and views',
      cta: 'Start Growing on Instagram'
    },
    tiktok: {
      name: 'TikTok',
      description: 'Accelerate your TikTok growth with AI-powered strategies',
      cta: 'Start Growing on TikTok'
    }
  },
  fr: {
    title: 'Choisissez votre plateforme',
    subtitle: '',
    instagram: {
      name: 'Instagram',
      description: '',
      cta: 'Démarrer sur Instagram'
    },
    tiktok: {
      name: 'TikTok',
      description: '',
      cta: 'Démarrer sur TikTok'
    }
  },
  de: {
    title: 'Wählen Sie Ihre Plattform',
    subtitle: 'Beginnen Sie heute mit dem Wachstum Ihrer Social-Media-Präsenz',
    instagram: {
      name: 'Instagram',
      description: 'Steigern Sie Ihre Instagram-Follower, Likes und Views',
      cta: 'Auf Instagram starten'
    },
    tiktok: {
      name: 'TikTok',
      description: 'Beschleunigen Sie Ihr TikTok-Wachstum mit KI-gestützten Strategien',
      cta: 'Auf TikTok starten'
    }
  },
  es: {
    title: 'Elige tu plataforma',
    subtitle: 'Comienza a hacer crecer tu presencia en redes sociales hoy',
    instagram: {
      name: 'Instagram',
      description: 'Impulsa tus seguidores, likes y vistas de Instagram',
      cta: 'Comenzar en Instagram'
    },
    tiktok: {
      name: 'TikTok',
      description: 'Acelera tu crecimiento en TikTok con estrategias impulsadas por IA',
      cta: 'Comenzar en TikTok'
    }
  }
};

export default function SelectPlatformPage() {
  const params = useParams();
  const lang = (params?.lang as Language) || 'fr';
  const content = platformContent[lang] || platformContent.fr;
  const router = useRouter();

  const handlePlatformSelect = (platform: 'instagram' | 'tiktok') => {
    if (platform === 'instagram') {
      router.push(`/${lang}/instagram`);
    } else {
      router.push(`/${lang}/tiktok`);
    }
  };

  return (
    <div className="relative isolate min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-cyan-900 font-sans">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 sm:mb-6 tracking-tight px-4">
            {content.title}
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto px-4 hidden sm:block">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl w-full px-4">
          
          {/* TikTok Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => handlePlatformSelect('tiktok')}
            className="group relative cursor-pointer"
          >
            <div className="relative bg-gradient-to-br from-cyan-600/20 to-gray-600/20 backdrop-blur-lg border border-cyan-500/30 rounded-3xl p-8 sm:p-12 hover:border-cyan-400/50 transition-all duration-300 hover:scale-[1.02]">
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-gray-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Content */}
              <div className="relative text-center">
                {/* TikTok Logo */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer animate-pulse">
                  <Image
                    src="/tiktok.webp"
                    alt="TikTok"
                    width={128}
                    height={128}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Instagram Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => handlePlatformSelect('instagram')}
            className="group relative cursor-pointer"
          >
            <div className="relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 sm:p-12 hover:border-purple-400/50 transition-all duration-300 hover:scale-[1.02]">
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Content */}
              <div className="relative text-center">
                {/* Instagram Logo */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer animate-pulse">
                  <Image
                    src="/instagram.webp"
                    alt="Instagram"
                    width={128}
                    height={128}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trustpilot Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2" aria-label="Trustpilot rating 4.8 out of 5">
            <span className="text-sm font-black text-white">4.8</span>
            <span className="h-4 w-px bg-white/20"></span>
            <span className="inline-flex items-center gap-0.5">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-[3px]" style={{backgroundColor: 'rgb(0, 182, 122)'}}>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white" aria-hidden="true">
                  <path d="M12 17.27l-5.18 3.05 1.4-5.95L3.5 9.24l6.06-.52L12 3l2.44 5.72 6.06.52-4.72 5.13 1.4 5.95z"></path>
                </svg>
              </span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-[3px]" style={{backgroundColor: 'rgb(0, 182, 122)'}}>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white" aria-hidden="true">
                  <path d="M12 17.27l-5.18 3.05 1.4-5.95L3.5 9.24l6.06-.52L12 3l2.44 5.72 6.06.52-4.72 5.13 1.4 5.95z"></path>
                </svg>
              </span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-[3px]" style={{backgroundColor: 'rgb(0, 182, 122)'}}>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white" aria-hidden="true">
                  <path d="M12 17.27l-5.18 3.05 1.4-5.95L3.5 9.24l6.06-.52L12 3l2.44 5.72 6.06.52-4.72 5.13 1.4 5.95z"></path>
                </svg>
              </span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-[3px]" style={{backgroundColor: 'rgb(0, 182, 122)'}}>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white" aria-hidden="true">
                  <path d="M12 17.27l-5.18 3.05 1.4-5.95L3.5 9.24l6.06-.52L12 3l2.44 5.72 6.06.52-4.72 5.13 1.4 5.95z"></path>
                </svg>
              </span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-[3px]" style={{backgroundColor: 'rgb(0, 182, 122)'}}>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white" aria-hidden="true">
                  <path d="M12 17.27l-5.18 3.05 1.4-5.95L3.5 9.24l6.06-.52L12 3l2.44 5.72 6.06.52-4.72 5.13 1.4 5.95z"></path>
                </svg>
              </span>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
