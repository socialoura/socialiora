'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import posthog from 'posthog-js';
import { ArrowRight, Instagram } from 'lucide-react';

export default function FunnelLandingPage({ params }: { params: { lang: string } }) {
  const router = useRouter();
  const lang = params.lang || 'fr';

  useEffect(() => {
    posthog.capture('landing_funnel_viewed');
  }, []);

  const handleCta = () => {
    posthog.capture('landing_funnel_cta_clicked');
    router.push(`/${lang}/instagram`);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl w-full">
        {/* Instagram Icon */}
        <div className="mb-10 sm:mb-14">
          <Instagram className="w-24 h-24 sm:w-32 sm:h-32 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4 sm:mb-6">
          Boostez votre profil{' '}
          <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Instagram
          </span>{' '}
          dès maintenant
        </h1>


        {/* CTA */}
        <button
          onClick={handleCta}
          className="group relative w-full sm:w-auto overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 px-10 sm:px-14 py-4 sm:py-5 text-lg sm:text-xl font-black text-white shadow-2xl shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 uppercase tracking-wider flex items-center justify-center gap-3"
        >
          <span className="relative z-10">Démarrer</span>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>

      </div>
    </div>
  );
}
