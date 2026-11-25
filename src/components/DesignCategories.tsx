import { siteConfig } from '../config/siteConfig';
import SmartImg from './SmartImg';

interface Props {
  onSelectCategory: (id: string) => void;
}

export default function DesignCategories({ onSelectCategory }: Props) {
  const { designCategories } = siteConfig;
  if (!designCategories.length) return null;

  return (
    <section id="design" className="bg-white px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-4xl text-charcoal lg:text-5xl">
          Design Ideas
        </h2>
        <p className="mt-3 max-w-xl font-light text-charcoal/70">
          Pick a space to see the projects we have designed for it.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-6">
          {designCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectCategory(c.id)}
              className="group relative aspect-[4/5] overflow-hidden bg-charcoal text-left"
            >
              <SmartImg
                src={c.image}
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <span className="absolute bottom-4 left-4 right-4 font-serif text-xl text-white sm:text-2xl">
                {c.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
