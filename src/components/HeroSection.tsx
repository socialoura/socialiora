'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Instagram, Music, Twitter, ArrowRight, Sparkles } from 'lucide-react';
import UserSearchInput from './UserSearchInput';

interface HeroSectionProps {
  lang: string;
}

type Platform = 'instagram' | 'tiktok' | 'twitter';

export default function HeroSection({ lang }: HeroSectionProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('instagram');

  const content = {
    en: {
      title: 'Supercharge Your',
      titleHighlight: 'Digital Presence',
      subtitle: 'Gain authentic followers, genuine likes, and real engagement within minutes. Zero bots. Zero fakes. Pure impact.',
      trustLine: 'Chosen by 50,000+ Influencers',
      platforms: {
        instagram: 'Instagram',
        tiktok: 'TikTok',
        twitter: 'Twitter',
      },
      cta: 'Boost My Profile',
      startingAt: 'Plans from $2.99',
    },
    fr: {
      title: 'Décuplez Votre',
      titleHighlight: 'Visibilité Digitale',
      subtitle: 'Obtenez des abonnés authentiques, des likes réels et un engagement concret en quelques minutes. Zéro bot. Zéro faux profil. Que du concret.',
      trustLine: 'Adopté par 50 000+ Influenceurs',
      platforms: {
        instagram: 'Instagram',
        tiktok: 'TikTok',
        twitter: 'Twitter',
      },
      cta: 'Lancer Mon Boost',
      startingAt: 'Dès 2,99€',
    },
    de: {
      title: 'Vervielfachen Sie Ihre',
      titleHighlight: 'Digitale Reichweite',
      subtitle: 'Gewinnen Sie echte Follower, authentische Likes und reales Engagement in Minuten. Null Bots. Null Fakes. Nur Wirkung.',
      trustLine: 'Gewählt von 50.000+ Influencern',
      platforms: {
        instagram: 'Instagram',
        tiktok: 'TikTok',
        twitter: 'Twitter',
      },
      cta: 'Profil boosten',
      startingAt: 'Bereits ab 2,99€',
    },
  };

  const t = content[lang as keyof typeof content] || content.en;

  const platforms = [
    {
      id: 'instagram' as Platform,
      name: t.platforms.instagram,
      icon: Instagram,
      gradient: 'from-purple-500 via-pink-500 to-orange-400',
      href: `/${lang}/i`,
    },
    {
      id: 'tiktok' as Platform,
      name: t.platforms.tiktok,
      icon: Music,
      gradient: 'from-black to-gray-800',
      href: `/${lang}/t`,
    },
    {
      id: 'twitter' as Platform,
      name: t.platforms.twitter,
      icon: Twitter,
      gradient: 'from-blue-400 to-blue-600',
      href: `/${lang}/x`,
    },
  ];

  const selectedPlatformData = platforms.find(p => p.id === selectedPlatform);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-bl from-gray-100 via-white to-violet-50">
      {/* Floating Emojis Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-20 blur-sm animate-float">🚀</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 blur-sm animate-float-delayed">❤️</div>
        <div className="absolute bottom-32 left-1/4 text-7xl opacity-20 blur-sm animate-float">🔥</div>
        <div className="absolute top-1/3 right-1/4 text-5xl opacity-20 blur-sm animate-float-delayed">⭐</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-20 blur-sm animate-float">💎</div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-300/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 py-24 lg:px-10">
        <div className="text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-5 py-2.5 mb-10 shadow-lg">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold text-gray-700">{t.trustLine}</span>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center text-xs text-white font-bold"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-gray-900 mb-5 leading-none tracking-tighter">
            {t.title}
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-14 leading-relaxed">
            {t.subtitle}
          </p>

          {/* Platform Switcher */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-3 mb-8">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatform === platform.id;
                return (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`group relative px-7 py-5 rounded-xl font-bold text-lg transition-all duration-300 ${
                      isSelected
                        ? 'bg-gray-900 text-white shadow-2xl scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-xl'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6" />
                      <span>{platform.name}</span>
                    </div>
                    {isSelected && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="bg-white rounded-2xl shadow-2xl p-10 border border-gray-200">
              <UserSearchInput
                platform={selectedPlatform}
                onUserConfirmed={() => {
                  window.location.href = selectedPlatformData?.href || `/${lang}/i`;
                }}
                placeholder="Enter your username"
                className="w-full"
              />
              <p className="text-sm text-gray-500 mt-4 text-center">
                {t.startingAt} • No password required • Instant delivery
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href={selectedPlatformData?.href || `/${lang}/i`}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-pink-600 text-white px-12 py-5 rounded-xl font-bold text-xl shadow-2xl hover:shadow-violet-500/50 hover:scale-105 transition-all duration-300 group"
          >
            <span>{t.cta}</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
