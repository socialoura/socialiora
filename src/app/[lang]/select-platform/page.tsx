'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { type Language } from '@/i18n/config';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

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

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative isolate h-screen bg-black font-sans overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-cyan-900/30" />
        
        {/* Animated Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-cyan-600/20 rounded-full blur-3xl"
        />
        
        {/* Mouse Follower */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-50"
          style={{
            background: `radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(6, 182, 212, 0.2) 50%, transparent 70%)`,
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
            transition: 'all 0.3s ease-out'
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center px-4">
        
        {/* Header - Title Only */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative inline-block"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 tracking-tight px-4">
              {content.title}
            </h1>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl blur-3xl -z-10"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Platform Cards - Optimized for Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full max-w-6xl px-4">
          
          {/* TikTok Card */}
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            onClick={() => handlePlatformSelect('tiktok')}
            className="group relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative bg-black/40 backdrop-blur-2xl border border-cyan-500/30 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 lg:p-12 transition-all duration-500 hover:border-cyan-400/60">
              
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background: [
                    "linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.2))",
                    "linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.2), rgba(236, 72, 153, 0.2))",
                    "linear-gradient(to right, rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.2))",
                    "linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.2))"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Content */}
              <div className="relative text-center">
                {/* TikTok Logo */}
                <motion.div
                  className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto mb-4 sm:mb-6 flex items-center justify-center relative"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                  <Image
                    src="/tiktok.webp"
                    alt="TikTok"
                    width={128}
                    height={128}
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                  />
                </motion.div>
                
                {/* Platform Name */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-white"
                >
                  TikTok
                </motion.h3>
              </div>
            </div>
          </motion.div>

          {/* Instagram Card */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            onClick={() => handlePlatformSelect('instagram')}
            className="group relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative bg-black/40 backdrop-blur-2xl border border-purple-500/30 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 lg:p-12 transition-all duration-500 hover:border-purple-400/60">
              
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background: [
                    "linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2), rgba(251, 146, 60, 0.2))",
                    "linear-gradient(to right, rgba(251, 146, 60, 0.2), rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))",
                    "linear-gradient(to right, rgba(236, 72, 153, 0.2), rgba(251, 146, 60, 0.2), rgba(168, 85, 247, 0.2))",
                    "linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2), rgba(251, 146, 60, 0.2))"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Content */}
              <div className="relative text-center">
                {/* Instagram Logo */}
                <motion.div
                  className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto mb-4 sm:mb-6 flex items-center justify-center relative"
                  whileHover={{ rotate: -360, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                  <Image
                    src="/instagram.webp"
                    alt="Instagram"
                    width={128}
                    height={128}
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                  />
                </motion.div>
                
                {/* Platform Name */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-white"
                >
                  Instagram
                </motion.h3>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trustpilot Badge - Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-6 text-center"
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
