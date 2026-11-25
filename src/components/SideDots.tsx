import { useEffect, useState } from 'react';

const IDS = [
  'home',
  'offerings',
  'design',
  'projects',
  'locations',
  'shop',
  'contact',
];

/** Right-edge dot navigation, like the reference site. Desktop only. */
export default function SideDots() {
  const [ids, setIds] = useState<string[]>([]);
  const [current, setCurrent] = useState('home');

  useEffect(() => {
    const found = IDS.filter((id) => document.getElementById(id));
    setIds(found);
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    found.forEach((id) => obs.observe(document.getElementById(id)!));
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-4 xl:flex"
    >
      {ids.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={`Go to ${id}`}
          aria-current={current === id}
          className={`h-3 w-3 rounded-full border border-bronze transition ${
            current === id ? 'bg-bronze' : 'bg-white/80 hover:bg-bronze/60'
          }`}
        />
      ))}
    </nav>
  );
}
