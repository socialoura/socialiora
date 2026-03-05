'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Mail } from 'lucide-react';
import posthog from 'posthog-js';
import { type Language } from '@/i18n/config';

interface PaymentSuccessProps {
  params: { lang: string };
}

export default function PaymentSuccessPage({ params }: PaymentSuccessProps) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');
  const lang = params.lang as Language;

  useEffect(() => {
    posthog.capture('payment_success_page_viewed', { order_id: orderId });
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="rounded-full bg-emerald-500/20 p-6">
            <CheckCircle2 className="w-20 h-20 text-emerald-400" />
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Paiement confirmé !
          </h1>
          <p className="text-xl text-gray-400">
            Votre commande a été enregistrée avec succès
          </p>
          
          {orderId && (
            <div className="inline-block bg-gray-900/50 border border-gray-800 rounded-xl px-6 py-3">
              <p className="text-sm text-gray-500 mb-1">Numéro de commande</p>
              <p className="text-lg font-mono font-bold text-white">#{orderId}</p>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid gap-4 mb-12">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-pink-500/20 p-3 flex-shrink-0">
                <Mail className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Confirmation par email
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Vous allez recevoir un email de confirmation avec tous les détails de votre commande dans quelques instants.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-purple-500/20 p-3 flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Livraison en cours
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Votre commande est en cours de traitement. La livraison commencera sous peu et sera complétée dans les délais annoncés.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40"
          >
            <span>Retour à l&apos;accueil</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Support */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Une question ? Contactez notre support à{' '}
            <a href="mailto:support@socialoura.com" className="text-pink-400 hover:text-pink-300 underline">
              support@socialoura.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
