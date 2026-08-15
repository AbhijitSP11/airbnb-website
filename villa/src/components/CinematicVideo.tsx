import { useEffect, useRef } from 'react';

type Props = {
  src: string;
  poster?: string;
  className?: string;
  eager?: boolean;
  loop?: boolean;
};

export function CinematicVideo({ src, poster, className, eager, loop = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (eager) {
      el.play().catch(() => {});
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      playsInline
      loop={loop}
      preload={eager ? 'auto' : 'metadata'}
      autoPlay={eager}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
