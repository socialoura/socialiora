'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight, Mail, Shield, X, Loader2 } from 'lucide-react';
import useUpsellStore from '@/store/useUpsellStore';

export default function CheckoutSummary() {
  const {
    selectedService,
    quantity,
    price,
    selectedPostIds,
    username,
    email,
    setEmail,
    acceptedTerms,
    setAcceptedTerms,
    isCheckoutOpen,
    setIsCheckoutOpen,
  } = useUpsellStore();

  const [isProcessing, setIsProcessing] = useState(false);

  const serviceLabel = selectedService === 'followers' ? 'abonnés' : selectedService === 'likes' ? 'likes' : 'vues';
  const isDistributable = selectedService === 'likes' || selectedService === 'views';
  const canProceed = isDistributable ? selectedPostIds.length > 0 : true;
  const oldPrice = (price * 1.3).toFixed(2);

  const handlePay = async () => {
    if (!email || !acceptedTerms) return;
    setIsProcessing(true);
    // Placeholder for payment integration
    await new Promise((r) => setTimeout(r, 2000));
    setIsProcessing(false);
    alert('Paiement simulé avec succès ! Intégrez ici votre PaymentModal Stripe.');
  };

  if (!selectedService) return null;

  return (
    <>
      {/* Sticky bottom bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
      >
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-fuchsia-100 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-fuchsia-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {quantity.toLocaleString()} {serviceLabel}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 line-through">{oldPrice} €</span>
                <span className="text-sm font-bold text-fuchsia-600">{price.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            disabled={!canProceed}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold rounded-xl shadow-lg shadow-fuchsia-500/25 hover:shadow-xl disabled:shadow-none transition-all disabled:cursor-not-allowed"
          >
            Continuer
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {!canProceed && isDistributable && (
          <div className="max-w-2xl mx-auto px-4 pb-3">
            <p className="text-xs text-amber-600 text-center">
              Sélectionnez au moins une publication pour continuer
            </p>
          </div>
        )}
      </motion.div>

      {/* Checkout overlay */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsCheckoutOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 z-10"
            >
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              <h3 className="text-xl font-bold text-gray-900 mb-1">Finaliser la commande</h3>
              <p className="text-sm text-gray-500 mb-6">
                {quantity.toLocaleString()} {serviceLabel} pour @{username}
              </p>

              {/* Order summary */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    {quantity.toLocaleString()} {serviceLabel}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">{price.toFixed(2)} €</span>
                </div>
                {isDistributable && selectedPostIds.length > 0 && (
                  <p className="text-xs text-gray-400">
                    Répartis sur {selectedPostIds.length} publication{selectedPostIds.length > 1 ? 's' : ''}
                  </p>
                )}
                <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-900">Total</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 line-through">{oldPrice} €</span>
                    <span className="text-lg font-bold text-fuchsia-600">{price.toFixed(2)} €</span>
                  </div>
                </div>
              </div>

              {/* Email input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Adresse e-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40 focus:border-fuchsia-500 transition-all"
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 text-fuchsia-600 focus:ring-fuchsia-500 border-gray-300 rounded"
                  />
                  <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                    J&apos;accepte les{' '}
                    <a href="#" className="text-fuchsia-600 hover:underline font-medium">
                      conditions générales de vente
                    </a>{' '}
                    et la{' '}
                    <a href="#" className="text-fuchsia-600 hover:underline font-medium">
                      politique de confidentialité
                    </a>
                    .
                  </span>
                </label>
              </div>

              {/* Pay button */}
              <button
                onClick={handlePay}
                disabled={!email || !acceptedTerms || isProcessing}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold rounded-xl shadow-lg shadow-fuchsia-500/25 hover:shadow-xl disabled:shadow-none transition-all disabled:cursor-not-allowed text-lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Traitement...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Payer {price.toFixed(2)} €
                  </>
                )}
              </button>

              {/* Trust */}
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Paiement sécurisé
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  SSL sécurisé
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Service garanti
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
