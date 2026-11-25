import { Check } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import type { OpenLead } from '../types/config';
import type { CalcType, OpenEstimate } from '../config/estimatorConfig';

const requirementFor = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('kitchen')) return 'Modular Kitchen';
  if (t.includes('commercial') || t.includes('office')) return 'Commercial';
  return 'Full Home Turnkey';
};

/** Offerings with a calculator open it; the rest open the lead form. */
const calculatorFor = (title: string): CalcType | null => {
  const t = title.toLowerCase();
  if (t.includes('kitchen')) return 'kitchen';
  if (
    t.includes('commercial') ||
    t.includes('office') ||
    t.includes('construction')
  )
    return null;
  return 'home';
};

interface Props {
  onOpenLead: OpenLead;
  onOpenEstimate: OpenEstimate;
}

export default function Offerings({ onOpenLead, onOpenEstimate }: Props) {
  const { offerings } = siteConfig;
  if (!offerings.length) return null;

  return (
    <section
      id="offerings"
      className="bg-alabaster px-5 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-4xl text-charcoal lg:text-5xl">
          Offerings &amp; Packages
        </h2>
        <p className="mt-3 max-w-xl font-light text-charcoal/70">
          Four ways to work with us, from a single kitchen to a complete home or
          workplace.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {offerings.map((o) => {
            const calc = calculatorFor(o.title);
            return (
              <article
                key={o.title}
                className="flex flex-col border border-line bg-white p-8"
              >
                <h3 className="font-serif text-2xl text-charcoal">{o.title}</h3>
                <p className="mt-3 font-light leading-relaxed text-charcoal/75">
                  {o.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {o.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-charcoal/85"
                    >
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-bronze"
                      />{' '}
                      {h}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() =>
                    calc
                      ? onOpenEstimate(calc)
                      : onOpenLead({
                          requirement: requirementFor(o.title),
                          offer: o.title,
                        })
                  }
                  className="mt-8 min-h-[46px] self-start border border-charcoal px-6 text-sm font-medium uppercase tracking-[0.14em] text-charcoal transition hover:bg-charcoal hover:text-white"
                >
                  Get Estimate
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
