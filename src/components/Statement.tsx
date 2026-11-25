import { siteConfig } from '../config/siteConfig';
import SmartImg from './SmartImg';

/** Centered tagline, thin divider and a three-image row (inspired by the reference site). */
export default function Statement() {
  const { statement, projects } = siteConfig;
  const featured = statement.featuredProjectIds
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section id="statement" className="bg-white px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="mx-auto max-w-4xl text-center font-sans text-2xl font-light leading-snug tracking-wide text-charcoal/90 sm:text-3xl lg:text-4xl">
          {statement.text}
        </h2>
        <hr className="mt-12 border-charcoal/30" />
        {featured.length > 0 && (
          <div className="mt-14 grid gap-6 sm:grid-cols-3 lg:gap-12">
            {featured.map((p) => (
              <figure key={p.id} className="group overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden">
                  <SmartImg
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="mt-3 font-serif text-lg text-charcoal">
                  {p.title}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
