import { Home, Shirt, UtensilsCrossed } from 'lucide-react';
import type { OpenEstimate } from '../config/estimatorConfig';
import type { CalcType } from '../config/estimatorConfig';

const CARDS: {
  type: CalcType;
  title: string;
  text: string;
  Icon: typeof Home;
}[] = [
  {
    type: 'home',
    title: 'Full Home',
    text: 'Get an approximate cost for your whole home interior.',
    Icon: Home,
  },
  {
    type: 'kitchen',
    title: 'Kitchen',
    text: 'Pick a layout and size to see a cost range.',
    Icon: UtensilsCrossed,
  },
  {
    type: 'wardrobe',
    title: 'Wardrobe',
    text: 'Enter the size and type to see a cost range.',
    Icon: Shirt,
  },
];

export default function EstimateSection({
  onOpenEstimate,
}: {
  onOpenEstimate: OpenEstimate;
}) {
  return (
    <section
      id="estimate"
      className="bg-charcoal px-5 py-20 text-white lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-4xl lg:text-5xl">
          Estimate Your Interior Cost
        </h2>
        <p className="mt-3 max-w-xl font-light text-white/70">
          Answer a few questions and see an approximate range for your space.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CARDS.map(({ type, title, text, Icon }) => (
            <article
              key={type}
              className="flex flex-col bg-white p-8 text-charcoal"
            >
              <span className="flex h-14 w-14 items-center justify-center bg-alabaster text-bronze">
                <Icon size={26} />
              </span>
              <h3 className="mt-5 font-serif text-3xl">{title}</h3>
              <p className="mt-2 flex-1 font-light text-charcoal/70">{text}</p>
              <button
                type="button"
                onClick={() => onOpenEstimate(type)}
                className="mt-6 min-h-[48px] self-start bg-charcoal px-8 text-sm font-medium uppercase tracking-[0.14em] text-white transition hover:bg-bronze hover:text-charcoal"
              >
                Calculate
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
