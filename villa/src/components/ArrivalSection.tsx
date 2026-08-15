import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { property } from '../data/property';
import { CinematicVideo } from './CinematicVideo';

export function ArrivalSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const media = root.querySelector('.arrival-media') as HTMLElement;
      const text = root.querySelectorAll('.arrival-text > *');
      gsap.set(media, { scale: 1.14, yPercent: 6 });
      gsap.set(text, { y: 40, opacity: 0 });

      gsap.to(media, {
        scale: 1,
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.to(text, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: root,
          start: 'top 65%',
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="arrival"
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '110vh',
        width: '100%',
        overflow: 'hidden',
        background: 'var(--charcoal)',
        color: 'var(--ivory)',
      }}
    >
      <div className="arrival-media" style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
        <CinematicVideo
          src={property.videos.beach}
          poster={property.images.beach2}
          className="cover-video"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0) 100%)' }} />
      </div>

      <div
        className="container arrival-text"
        style={{
          position: 'relative',
          minHeight: '110vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '820px',
          padding: '160px clamp(20px, 5vw, 56px)',
        }}
      >
        <div className="eyebrow" style={{ color: 'rgba(245,239,228,0.75)' }}>
          01 — The Arrival
        </div>
        <h2
          style={{
            fontSize: 'clamp(44px, 8vw, 108px)',
            fontStyle: 'italic',
            lineHeight: 0.98,
            marginTop: '32px',
            maxWidth: '14ch',
          }}
        >
          Where the ocean meets home.
        </h2>
        <p
          style={{
            marginTop: '32px',
            fontSize: 'clamp(15px, 1.3vw, 18px)',
            lineHeight: 1.7,
            maxWidth: '52ch',
            color: 'rgba(245,239,228,0.82)',
          }}
        >
          A quiet path through tropical greenery opens directly onto the
          Arabian Sea. The first breath of the property is salt air, warm
          light, and the low sound of the surf.
        </p>
        <div
          style={{
            marginTop: '48px',
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
            fontSize: '11px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(245,239,228,0.7)',
          }}
        >
          <span>{property.coords}</span>
          <span style={{ width: '48px', height: '1px', background: 'rgba(245,239,228,0.35)' }} />
          <span>{property.location}</span>
        </div>
      </div>

      <style>{`
        .cover-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </section>
  );
}
