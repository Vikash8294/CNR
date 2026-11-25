import { useState } from 'react';
import { Play } from 'lucide-react';
import SmartImg from './SmartImg';

interface Props {
  youtubeId: string;
  title: string;
  poster?: string;
  autoPlay?: boolean;
}

/** Shows a thumbnail; the YouTube iframe is only created after the visitor clicks play. */
export default function VideoFacade({
  youtubeId,
  title,
  poster,
  autoPlay = false,
}: Props) {
  const [active, setActive] = useState(autoPlay);
  const thumb = poster || `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

  if (active) {
    return (
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Play video: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden bg-charcoal"
    >
      <SmartImg
        src={thumb}
        alt={title}
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-0 bg-black/30 transition group-hover:bg-black/15" />
      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bronze text-charcoal">
        <Play size={26} fill="currentColor" />
      </span>
    </button>
  );
}
