'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Users, Heart, Eye, X, Sparkles } from 'lucide-react';
import useUpsellStore, { ServiceType } from '@/store/useUpsellStore';
import Image from 'next/image';

const SERVICES: { type: ServiceType; label: string; icon: React.ReactNode; description: string }[] = [
  {
    type: 'followers',
    label: 'Abonnés',
    icon: <Users className="w-6 h-6" />,
    description: 'Augmentez votre audience',
  },
  {
    type: 'likes',
    label: 'Likes',
    icon: <Heart className="w-6 h-6" />,
    description: 'Boostez votre engagement',
  },
  {
    type: 'views',
    label: 'Vues',
    icon: <Eye className="w-6 h-6" />,
    description: 'Maximisez votre visibilité',
  },
];

const QUANTITY_OPTIONS: { quantity: number; price: number; popular?: boolean }[] = [
  { quantity: 100, price: 2.49 },
  { quantity: 250, price: 4.99, popular: true },
  { quantity: 500, price: 8.99 },
  { quantity: 1000, price: 14.99 },
];

export default function ServiceSelector() {
  const {
    username,
    avatarUrl,
    fullName,
    selectedService,
    quantity,
    setSelectedService,
    setQuantity,
    setPrice,
    resetProfile,
  } = useUpsellStore();

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service);
  };

  const handleQuantitySelect = (q: number, p: number) => {
    setQuantity(q);
    setPrice(p);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Profile pill */}
      <div className="flex items-center justify-center mb-8">
        <div className="inline-flex items-center gap-3 bg-gray-100 rounded-full pl-1.5 pr-4 py-1.5">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 relative">
            <Image
              src={avatarUrl || `https://ui-avatars.com/api/?name=${username}&background=random&size=64`}
              alt={username}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <span className="text-sm font-medium text-gray-700">@{username}</span>
          {fullName && <span className="text-xs text-gray-400 hidden sm:inline">· {fullName}</span>}
          <button
            onClick={resetProfile}
            className="ml-1 p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Service tiles */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Choisissez votre service
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {SERVICES.map((service) => {
            const isSelected = selectedService === service.type;
            return (
              <motion.button
                key={service.type}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleServiceSelect(service.type)}
                className={`relative p-5 rounded-2xl border-2 transition-all text-center ${
                  isSelected
                    ? 'border-fuchsia-500 bg-fuchsia-50 shadow-lg shadow-fuchsia-500/10'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${
                    isSelected
                      ? 'bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {service.icon}
                </div>
                <p className={`font-semibold text-sm ${isSelected ? 'text-fuchsia-700' : 'text-gray-900'}`}>
                  {service.label}
                </p>
                <p className="text-xs text-gray-400 mt-1">{service.description}</p>
                {isSelected && (
                  <motion.div
                    layoutId="service-check"
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-fuchsia-500 flex items-center justify-center"
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Quantity selection */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Combien de {selectedService === 'followers' ? 'abonnés' : selectedService === 'likes' ? 'likes' : 'vues'} ?
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {QUANTITY_OPTIONS.map((opt) => {
                const isSelected = quantity === opt.quantity;
                return (
                  <motion.button
                    key={opt.quantity}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuantitySelect(opt.quantity, opt.price)}
                    className={`relative p-4 rounded-2xl border-2 transition-all text-center ${
                      isSelected
                        ? 'border-fuchsia-500 bg-fuchsia-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {opt.popular && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider bg-fuchsia-500 text-white px-2.5 py-0.5 rounded-full">
                        Populaire
                      </span>
                    )}
                    <p className={`text-2xl font-bold ${isSelected ? 'text-fuchsia-600' : 'text-gray-900'}`}>
                      {opt.quantity.toLocaleString()}
                    </p>
                    <p className={`text-sm font-semibold mt-1 ${isSelected ? 'text-fuchsia-500' : 'text-gray-500'}`}>
                      {opt.price.toFixed(2)} €
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Special offer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-5 text-white shadow-lg shadow-green-500/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm flex items-center gap-1.5">
                      <span className="bg-white/20 rounded-md px-1.5 py-0.5 text-xs">-20%</span>
                      Offre unique
                    </p>
                    <p className="text-white/80 text-xs mt-0.5">
                      +100 {selectedService === 'followers' ? 'abonnés' : selectedService === 'likes' ? 'likes' : 'vues'} pour seulement 1,99€
                    </p>
                  </div>
                </div>
                <button className="bg-white text-green-600 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-green-50 transition-colors shadow-md">
                  Ajouter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
