'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import useUpsellStore from '@/store/useUpsellStore';
import Image from 'next/image';

export default function PostGrid() {
  const {
    posts,
    selectedPostIds,
    selectedService,
    togglePostSelection,
    calculateDistribution,
  } = useUpsellStore();

  const distribution = calculateDistribution();
  const serviceLabel = selectedService === 'likes' ? 'likes' : 'vues';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Sélectionnez vos publications
        </h3>
        <p className="text-sm text-gray-500">
          Choisissez les posts sur lesquels répartir vos {serviceLabel}
        </p>
        {selectedPostIds.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-fuchsia-600 font-medium mt-2"
          >
            {selectedPostIds.length} publication{selectedPostIds.length > 1 ? 's' : ''} sélectionnée{selectedPostIds.length > 1 ? 's' : ''}
          </motion.p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {posts.map((post, index) => {
          const isSelected = selectedPostIds.includes(post.id);
          const dist = distribution.find((d) => d.postId === post.id);

          return (
            <motion.button
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => togglePostSelection(post.id)}
              className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
                isSelected
                  ? 'ring-4 ring-fuchsia-500 ring-offset-2 ring-offset-gray-50 shadow-lg'
                  : 'ring-1 ring-gray-200 hover:ring-gray-300 hover:shadow-md'
              }`}
            >
              <Image
                src={post.imageUrl}
                alt={post.caption || `Post ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
                sizes="(max-width: 640px) 33vw, 200px"
              />

              {/* Overlay on hover / selected */}
              <div
                className={`absolute inset-0 transition-all ${
                  isSelected ? 'bg-fuchsia-600/10' : 'bg-black/0 hover:bg-black/10'
                }`}
              />

              {/* Check icon */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-fuchsia-500 flex items-center justify-center shadow-lg"
                >
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </motion.div>
              )}

              {/* Distribution pill */}
              {isSelected && dist && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-0 inset-x-0 p-1.5"
                >
                  <div className="bg-fuchsia-600/90 backdrop-blur-sm rounded-lg py-1.5 px-2 text-center">
                    <span className="text-white text-xs font-bold">
                      +{dist.amount} {serviceLabel}
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
