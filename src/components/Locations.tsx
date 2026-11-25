import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import type { OpenLead } from '../types/config';

export default function Locations({ onOpenLead }: { onOpenLead: OpenLead }) {
  const { locations, projects } = siteConfig;
  const [i, setI] = useState(0);
  if (!locations.enabled || !locations.cities.length) return null;

  const city = locations.cities[i];
  const local = projects.filter((p) =>
    city.name.toLowerCase().includes(p.city.toLowerCase())
  );

  return (
    <section
      id="locations"
      className="bg-charcoal px-5 py-20 text-white lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-4xl lg:text-5xl">
          {locations.headline}
        </h2>
        <p className="mt-3 max-w-xl font-light text-white/70">
          {locations.subheadline}
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr]">
          <div
            role="tablist"
            aria-label="Cities"
            className="flex gap-2 overflow-x-auto lg:flex-col"
          >
            {locations.cities.map((c, idx) => (
              <button
                key={c.name}
                role="tab"
                aria-selected={idx === i}
                type="button"
                onClick={() => setI(idx)}
                className={`min-h-[56px] shrink-0 border px-5 py-3 text-left transition ${
                  idx === i
                    ? 'border-bronze bg-bronze text-charcoal'
                    : 'border-white/20 hover:border-bronze'
                }`}
              >
                <span className="block font-serif text-lg">{c.name}</span>
                <span
                  className={`block text-xs ${
                    idx === i ? 'text-charcoal/80' : 'text-white/60'
                  }`}
                >
                  {c.state}
                </span>
              </button>
            ))}
          </div>

          <div className="border border-white/15 p-8" role="tabpanel">
            <p className="flex items-center gap-2 text-sm text-bronze">
              <MapPin size={16} /> {city.status}
            </p>
            <h3 className="mt-3 font-serif text-3xl">{city.name}</h3>
            <p className="mt-4 max-w-2xl font-light leading-relaxed text-white/80">
              {city.details}
            </p>

            {local.length > 0 && (
              <div className="mt-8">
                <p className="text-sm text-white/60">Completed projects here</p>
                <ul className="mt-3 space-y-2">
                  {local.map((p) => (
                    <li
                      key={p.id}
                      className="border-l-2 border-bronze pl-3 text-sm"
                    >
                      {p.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="button"
              onClick={() =>
                onOpenLead({ city: city.name.replace(/ \(Headquarters\)/, '') })
              }
              className="mt-10 min-h-[48px] bg-bronze px-7 text-sm font-medium uppercase tracking-[0.14em] text-charcoal transition hover:bg-white"
            >
              Enquire for this location
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
