import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import LeadForm from './LeadForm';
import type { LeadPrefill } from '../types/config';

interface Props {
  open: boolean;
  prefill: LeadPrefill;
  onClose: () => void;
  onSubmitted: () => void;
}

export default function LeadModal({
  open,
  prefill,
  onClose,
  onSubmitted,
}: Props) {
  const { leadModal } = siteConfig;
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector<HTMLElement>('input')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose();
      if (e.key !== 'Tab' || !panel.current) return;
      const els = panel.current.querySelectorAll<HTMLElement>(
        'button, a[href], input, select, textarea'
      );
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus?.();
    };
  }, [open, onClose]);

  if (!open || !leadModal.enabled) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-title"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto bg-alabaster p-6 shadow-2xl sm:p-9"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center text-charcoal hover:text-bronze"
        >
          <X size={22} />
        </button>
        <h2 id="lead-title" className="pr-8 font-serif text-3xl text-charcoal">
          {leadModal.title}
        </h2>
        <p className="mt-2 mb-6 font-light text-charcoal/70">
          {leadModal.subtitle}
        </p>
        <LeadForm
          key={JSON.stringify(prefill)}
          prefill={prefill}
          onDone={onSubmitted}
          idPrefix="modal"
        />
      </div>
    </div>
  );
}
