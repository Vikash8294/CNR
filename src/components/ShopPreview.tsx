import { Bell, MessageCircle } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import SmartImg from './SmartImg';
import type { OpenLead } from '../types/config';

export default function ShopPreview({ onOpenLead }: { onOpenLead: OpenLead }) {
  const { shopPreview, contact } = siteConfig;
  if (!shopPreview.enabled || !shopPreview.items.length) return null;

  const wa = (name: string) =>
    `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
      `Hi, I'm interested in: ${name}`
    )}`;

  return (
    <section id="shop" className="bg-alabaster px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <span className="inline-block rounded-full border border-bronze px-3 py-1 text-xs text-bronze">
          {shopPreview.badge}
        </span>
        <h2 className="mt-4 font-serif text-4xl text-charcoal lg:text-5xl">
          {shopPreview.title}
        </h2>
        <p className="mt-3 max-w-xl font-light text-charcoal/70">
          {shopPreview.subtitle}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {shopPreview.items.map((it) => (
            <article key={it.name} className="border border-line bg-white">
              <div className="relative aspect-[4/3] overflow-hidden">
                <SmartImg
                  src={it.image}
                  alt={it.name}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 bg-white/95 px-2 py-1 text-xs text-charcoal">
                  {it.tag}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs text-bronze">{it.category}</p>
                <h3 className="mt-1 font-serif text-xl text-charcoal">
                  {it.name}
                </h3>
                <div className="mt-5 flex flex-col gap-2">
                  <a
                    href={wa(it.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] items-center justify-center gap-2 bg-charcoal text-sm text-white transition hover:bg-bronze hover:text-charcoal"
                  >
                    <MessageCircle size={16} /> Enquire on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenLead({
                        requirement: 'Custom Furniture',
                        offer: `Shop launch alert: ${it.name}`,
                      })
                    }
                    className="flex min-h-[44px] items-center justify-center gap-2 border border-charcoal text-sm text-charcoal transition hover:bg-charcoal hover:text-white"
                  >
                    <Bell size={16} /> Notify Me at Launch
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
