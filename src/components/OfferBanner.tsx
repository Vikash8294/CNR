import { useState } from 'react';
import { X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import type { OpenLead } from '../types/config';

export default function OfferBanner({ onOpenLead }: { onOpenLead: OpenLead }) {
  const { offers } = siteConfig;
  const [hidden, setHidden] = useState(false);
  if (!offers.enabled || hidden) return null;

  return (
    <div className="relative z-50 bg-bronze text-charcoal">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-10 py-2 text-center text-xs sm:text-sm">
        <button
          type="button"
          onClick={() => onOpenLead({ offer: offers.badgeText })}
          className="min-h-[36px] text-left hover:underline sm:text-center"
        >
          <span className="mr-2 rounded-sm bg-charcoal px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-bronze">
            {offers.badgeText}
          </span>
          {offers.bannerText}
          <span className="ml-2 font-medium underline">{offers.ctaText}</span>
        </button>
      </div>
      <button
        type="button"
        aria-label="Dismiss offer banner"
        onClick={() => setHidden(true)}
        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center hover:opacity-70"
      >
        <X size={16} />
      </button>
    </div>
  );
}
