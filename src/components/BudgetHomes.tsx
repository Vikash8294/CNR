// import { ArrowRight } from 'lucide-react';
// import { siteConfig } from '../config/siteConfig';
// import SmartImg from './SmartImg';
// import type { OpenLead } from '../types/config';
// import type { OpenEstimate } from '../config/estimatorConfig';

// interface Props {
//   onOpenLead: OpenLead;
//   onOpenEstimate: OpenEstimate;
// }

// export default function BudgetHomes({ onOpenLead, onOpenEstimate }: Props) {
//   const { budgetHomes } = siteConfig;
//   if (!budgetHomes.enabled || !budgetHomes.items.length) return null;

//   return (
//     <section id="budget" className="bg-alabaster px-5 py-20 lg:px-8 lg:py-28">
//       <div className="mx-auto max-w-7xl">
//         <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
//           <div>
//             <h2 className="font-serif text-4xl text-charcoal lg:text-5xl">
//               {budgetHomes.title}
//             </h2>
//             <p className="mt-3 max-w-xl font-light text-charcoal/70">
//               {budgetHomes.subtitle}
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={() => onOpenLead()}
//             className="min-h-[48px] self-start bg-charcoal px-7 text-sm font-medium uppercase tracking-[0.14em] text-white transition hover:bg-bronze hover:text-charcoal sm:self-auto"
//           >
//             Get Free Quote
//           </button>
//         </div>

//         <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           {budgetHomes.items.map((it) => (
//             <button
//               key={it.title}
//               type="button"
//               onClick={() =>
//                 it.action === 'lead'
//                   ? onOpenLead({
//                       requirement: it.requirement,
//                       offer: `${it.title} - starting at ${it.startingAt}`,
//                     })
//                   : onOpenEstimate(it.action)
//               }
//               aria-label={`${it.title}, starting at ${it.startingAt}. Get an estimate`}
//               className="group relative aspect-[3/5] overflow-hidden bg-charcoal text-left"
//             >
//               <SmartImg
//                 src={it.image}
//                 alt=""
//                 className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
//               />
//               <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/20" />
//               <span className="absolute left-4 top-4 bg-charcoal/85 px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-white">
//                 Starting at {it.startingAt}
//               </span>
//               <span className="absolute bottom-5 left-5 font-serif text-3xl text-white">
//                 {it.title}
//               </span>
//               <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-charcoal transition group-hover:bg-bronze">
//                 <ArrowRight size={20} />
//               </span>
//             </button>
//           ))}
//         </div>

//         <p className="mt-6 text-xs font-light text-charcoal/60">
//           {budgetHomes.note}
//         </p>
//       </div>
//     </section>
//   );
// }

import { ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import SmartImg from './SmartImg';
import type { OpenLead } from '../types/config';
import type { OpenEstimate } from '../config/estimatorConfig';

interface Props {
  onOpenLead: OpenLead;
  onOpenEstimate: OpenEstimate;
}

export default function BudgetHomes({ onOpenLead, onOpenEstimate }: Props) {
  const { budgetHomes } = siteConfig;
  if (!budgetHomes.enabled || !budgetHomes.items.length) return null;

  return (
    <section id="budget" className="bg-alabaster px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-4xl text-charcoal lg:text-5xl">
              {budgetHomes.title}
            </h2>
            <p className="mt-3 max-w-xl font-light text-charcoal/70">
              {budgetHomes.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenLead()}
            className="min-h-[48px] self-start bg-charcoal px-7 text-sm font-medium uppercase tracking-[0.14em] text-white transition hover:bg-bronze hover:text-charcoal sm:self-auto"
          >
            Get Free Quote
          </button>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {budgetHomes.items.map((it) => (
            <button
              key={it.title}
              type="button"
              onClick={() =>
                it.action === 'lead'
                  ? onOpenLead({
                      requirement: it.requirement,
                      offer: `${it.title} - starting at ${it.startingAt}`,
                    })
                  : onOpenEstimate(
                      it.action,
                      it.bhk ? { bhk: it.bhk } : undefined
                    )
              }
              aria-label={`${it.title}, starting at ${it.startingAt}. Get an estimate`}
              className="group relative aspect-[3/5] overflow-hidden bg-charcoal text-left"
            >
              <SmartImg
                src={it.image}
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/20" />
              <span className="absolute left-4 top-4 bg-charcoal/85 px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-white">
                Starting at {it.startingAt}
              </span>
              <span className="absolute bottom-5 left-5 font-serif text-3xl text-white">
                {it.title}
              </span>
              <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-charcoal transition group-hover:bg-bronze">
                <ArrowRight size={20} />
              </span>
            </button>
          ))}
        </div>

        <p className="mt-6 text-xs font-light text-charcoal/60">
          {budgetHomes.note}
        </p>
      </div>
    </section>
  );
}
