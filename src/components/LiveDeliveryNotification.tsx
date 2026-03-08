'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface Notification {
  id: number;
  quantity: number;
  service: string;
  timeAgo: string;
}

const notifications: Notification[] = [
  { id: 1, quantity: 100, service: 'abonnés', timeAgo: '20 min' },
  { id: 2, quantity: 250, service: 'likes', timeAgo: '35 min' },
  { id: 3, quantity: 500, service: 'vues', timeAgo: '1h' },
  { id: 4, quantity: 1000, service: 'abonnés', timeAgo: '2h' },
  { id: 5, quantity: 100, service: 'likes', timeAgo: '3h' },
];

interface LiveDeliveryNotificationProps {
  variant?: 'instagram' | 'tiktok';
  translations: {
    delivered: string;
    ago: string;
    services: Record<string, string>;
  };
}

export default function LiveDeliveryNotification({ variant = 'instagram', translations }: LiveDeliveryNotificationProps) {
  const [currentNotification, setCurrentNotification] = useState<Notification>(notifications[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      setCurrentNotification(randomNotification);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const borderClass = variant === 'instagram'
    ? 'border-pink-500/20'
    : 'border-cyan-500/20';

  const accentColor = variant === 'instagram' ? 'text-pink-400' : 'text-cyan-400';

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm animate-fade-in">
      <div className={`relative overflow-hidden rounded-xl bg-gray-900/95 border ${borderClass} px-4 py-3 shadow-lg`}>
        <div className="flex items-center gap-3">
          {/* Live indicator */}
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
          </span>

          {/* Content */}
          <div className="flex items-center justify-between w-full text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">
                {currentNotification.quantity} {translations.services[currentNotification.service] || currentNotification.service}
              </span>
              <span className="text-gray-300">{translations.delivered}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="rounded-full w-5 h-5 p-[3px] bg-white/10">
                <Check className={`w-full h-full ${accentColor}`} strokeWidth={4} />
              </div>
              <span className="text-xs text-gray-400 hidden sm:inline">{translations.ago} {currentNotification.timeAgo}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
