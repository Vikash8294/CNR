import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import SmartImg from './SmartImg';
import type { OpenLead } from '../types/config';

export default function Hero({ onOpenLead }: { onOpenLead: OpenLead }) {
  const { hero, brand } = siteConfig;
  const slides =
    hero.slides && hero.slides.length ? hero.slides : [hero.backgroundImage];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section
      id="home"
      className="relative -mt-20 flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal text-white"
    >
      {slides.map((src, i) => (
        <div
          key={src + i}
          className={`absolute inset-0 transition-opacity duration-[1600ms] ${
            i === idx ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={i !== idx}
        >
          <SmartImg
            src={src}
            alt="CNR Interio project"
            eager={i === 0}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/55" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-40 lg:px-8">
        <h1 className="max-w-3xl font-serif text-4xl font-medium leading-[1.1] sm:text-5xl lg:text-7xl">
          {hero.headline}
        </h1>
        <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/85 sm:text-lg">
          {hero.subheadline}
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => onOpenLead()}
            className="min-h-[48px] rounded-sm bg-bronze px-7 text-sm font-medium uppercase tracking-[0.15em] text-charcoal transition hover:bg-white"
          >
            {hero.primaryCta}
          </button>
          <a
            href="#projects"
            className="flex min-h-[48px] items-center justify-center rounded-sm border border-white/70 px-7 text-sm font-light uppercase tracking-[0.15em] transition hover:border-bronze hover:text-bronze"
          >
            {hero.secondaryCta}
          </a>
        </div>

        <dl className="mt-14 grid grid-cols-1 gap-6 border-t border-white/25 pt-6 sm:grid-cols-3">
          {brand.stats.map((s) => (
            <div key={s.label}>
              <dt className="text-xs font-light tracking-wide text-white/70">
                {s.label}
              </dt>
              <dd className="mt-1 font-serif text-3xl text-bronze">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#statement"
        aria-label="Scroll down"
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-white/80 hover:text-bronze lg:block"
      >
        <ChevronDown size={34} strokeWidth={1.2} />
      </a>
    </section>
  );
}
