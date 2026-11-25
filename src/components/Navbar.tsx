import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import type { OpenLead } from '../types/config';

export default function Navbar({ onOpenLead }: { onOpenLead: OpenLead }) {
  const { brand, locations, shopPreview, projects } = siteConfig;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const firstLink = useRef<HTMLAnchorElement>(null);

  const links = [
    { label: 'Home', href: '#home', show: true },
    { label: 'Offerings', href: '#offerings', show: true },
    { label: 'Design Ideas', href: '#design', show: true },
    { label: 'Projects', href: '#projects', show: projects.length > 0 },
    { label: 'Locations', href: '#locations', show: locations.enabled },
    {
      label: 'Shop',
      href: '#shop',
      show: shopPreview.enabled,
      badge: 'Coming Soon',
    },
  ].filter((l) => l.show);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    firstLink.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 h-20 transition-colors duration-300 ${
        scrolled || open
          ? 'bg-charcoal/95 shadow-lg backdrop-blur'
          : 'bg-gradient-to-b from-black/70 to-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 lg:px-8"
        aria-label="Primary"
      >
        <a
          href="#home"
          className="flex items-center"
          aria-label={`${brand.name} home`}
        >
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            className="h-14 w-auto object-contain sm:h-16"
          />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-[13px] font-light uppercase tracking-[0.18em] text-white/90 transition hover:text-bronze"
              >
                {l.label}
                {l.badge && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-bronze/70 bg-charcoal/80 px-1.5 py-px text-[8px] tracking-wider text-bronze">
                    {l.badge}
                  </span>
                )}
              </a>
            </li>
          ))}
          <li className="pl-8">
            <button
              type="button"
              onClick={() => onOpenLead()}
              className="rounded-sm bg-bronze px-5 py-2.5 text-[13px] font-medium uppercase tracking-[0.15em] text-charcoal transition hover:bg-white"
            >
              Get Free Quote
            </button>
          </li>
        </ul>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-white lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-20 h-[calc(100vh-5rem)] overflow-y-auto bg-charcoal px-6 py-8 lg:hidden"
        >
          <ul className="flex flex-col">
            {links.map((l, i) => (
              <li key={l.href} className="border-b border-white/10">
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[56px] items-center justify-between text-sm font-light uppercase tracking-[0.2em] text-white"
                >
                  {l.label}
                  {l.badge && (
                    <span className="rounded-full border border-bronze/70 px-2 py-0.5 text-[9px] text-bronze">
                      {l.badge}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onOpenLead();
            }}
            className="mt-8 w-full rounded-sm bg-bronze py-4 text-sm font-medium uppercase tracking-[0.15em] text-charcoal"
          >
            Get Free Quote
          </button>
        </div>
      )}
    </header>
  );
}
