import { useState } from 'react';

interface Props {
  src?: string;
  alt: string;
  className?: string;
  eager?: boolean;
}

/** Lazy image that falls back to a warm gradient if the file is missing or blocked. */
export default function SmartImg({
  src,
  alt,
  className = '',
  eager = false,
}: Props) {
  const [bad, setBad] = useState(false);
  if (!src || bad) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-gradient-to-br from-charcoal via-[#2b2620] to-bronze/60 ${className}`}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setBad(true)}
      className={className}
    />
  );
}
