import { useEffect, useMemo, useState } from 'react';
import { MapPin, Play, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import SmartImg from './SmartImg';
import VideoFacade from './VideoFacade';

interface Item {
  id: string;
  title: string;
  type: string;
  category?: string;
  city?: string;
  materials?: string;
  image?: string;
  youtubeId?: string;
}

type Tab =
  | 'All'
  | 'Completed Sites'
  | '3D Visualizations'
  | 'Video Walkthroughs';

interface Props {
  category: string | null;
  onClearCategory: () => void;
}

export default function ProjectGallery({ category, onClearCategory }: Props) {
  const { projects, videos, designCategories } = siteConfig;
  const [tab, setTab] = useState<Tab>('All');
  const [active, setActive] = useState<Item | null>(null);

  const all: Item[] = useMemo(
    () => [
      ...projects,
      ...videos.map((v) => ({
        id: v.id,
        title: v.title,
        type: 'Video Walkthrough',
        city: v.city,
        image: v.image,
        youtubeId: v.youtubeId,
      })),
    ],
    [projects, videos]
  );

  const tabs: Tab[] = ['All', 'Completed Sites', '3D Visualizations'];
  if (all.some((i) => i.youtubeId)) tabs.push('Video Walkthroughs');

  const visible = all.filter((i) => {
    if (category && i.category !== category) return false;
    if (tab === 'Completed Sites') return i.type === 'Completed Site';
    if (tab === '3D Visualizations') return i.type === '3D Visualization';
    if (tab === 'Video Walkthroughs') return Boolean(i.youtubeId);
    return true;
  });

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  if (!all.length) return null;
  const catTitle = designCategories.find((c) => c.id === category)?.title;

  return (
    <section id="projects" className="bg-alabaster px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-4xl text-charcoal lg:text-5xl">
          Successful Projects
        </h2>

        <div
          className="mt-8 flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Project filters"
        >
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              type="button"
              onClick={() => setTab(t)}
              className={`min-h-[44px] border px-5 text-sm transition ${
                tab === t
                  ? 'border-charcoal bg-charcoal text-white'
                  : 'border-line bg-white text-charcoal hover:border-bronze'
              }`}
            >
              {t}
            </button>
          ))}
          {catTitle && (
            <button
              type="button"
              onClick={onClearCategory}
              className="ml-auto flex min-h-[44px] items-center gap-2 border border-bronze px-4 text-sm text-charcoal"
            >
              {catTitle} <X size={14} aria-hidden />{' '}
              <span className="sr-only">Clear filter</span>
            </button>
          )}
        </div>

        {visible.length === 0 ? (
          <p className="mt-12 font-light text-charcoal/70">
            No projects match this filter yet. Try another tab.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <article key={p.id} className="border border-line bg-white">
                <button
                  type="button"
                  onClick={() => setActive(p)}
                  className="group relative block aspect-[4/3] w-full overflow-hidden bg-charcoal"
                  aria-label={`Open ${p.title}`}
                >
                  <SmartImg
                    src={
                      p.image ||
                      (p.youtubeId
                        ? `https://i.ytimg.com/vi/${p.youtubeId}/hqdefault.jpg`
                        : undefined)
                    }
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  {p.youtubeId && (
                    <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bronze text-charcoal">
                      <Play size={22} fill="currentColor" />
                    </span>
                  )}
                </button>
                <div className="p-5">
                  <p className="text-xs font-light tracking-wide text-bronze">
                    {p.type}
                  </p>
                  <h3 className="mt-1 font-serif text-xl text-charcoal">
                    {p.title}
                  </h3>
                  {p.city && (
                    <p className="mt-2 flex items-center gap-1 text-sm text-charcoal/70">
                      <MapPin size={14} /> {p.city}
                    </p>
                  )}
                  {p.materials && (
                    <p className="mt-2 text-sm font-light text-charcoal/70">
                      {p.materials}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close preview"
              onClick={() => setActive(null)}
              className="absolute -top-12 right-0 flex h-11 w-11 items-center justify-center text-white"
            >
              <X size={28} />
            </button>
            {active.youtubeId ? (
              <VideoFacade
                youtubeId={active.youtubeId}
                title={active.title}
                poster={active.image}
              />
            ) : (
              <SmartImg
                src={active.image}
                alt={active.title}
                className="max-h-[80vh] w-full object-contain"
              />
            )}
            <p className="mt-3 font-serif text-xl text-white">{active.title}</p>
            {active.materials && (
              <p className="text-sm font-light text-white/70">
                {active.materials}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
