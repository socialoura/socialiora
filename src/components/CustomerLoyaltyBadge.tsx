'use client';

import { Sparkles, UserCheck } from 'lucide-react';

interface CustomerLoyaltyBadgeProps {
  customerOrderNumber: number;
  customerTotalOrders: number;
}

export default function CustomerLoyaltyBadge({ customerOrderNumber, customerTotalOrders }: CustomerLoyaltyBadgeProps) {
  if (customerTotalOrders <= 1) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
        <Sparkles className="w-3 h-3" />
        Nouveau client
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
      <UserCheck className="w-3 h-3" />
      Client régulier ({customerOrderNumber}{customerOrderNumber === 1 ? 'ère' : 'ème'} commande)
    </span>
  );
}
