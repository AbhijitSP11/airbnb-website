import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { property } from '../data/property';
import { CinematicVideo } from './CinematicVideo';

export function DiningSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dining-media',
        { scale: 1.1 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
        },
      );
      gsap.from('.dining-text > *', {
        y: 30,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 55%' },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="dining"
      ref={ref}
      style={{
        position: 'relative',
        background: 'var(--ivory)',
        padding: 'clamp(90px, 12vw, 160px) 0',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 4fr) minmax(0, 5fr)',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'center',
          }}
          className="dining-grid"
        >
          <div className="dining-text">
            <div className="eyebrow">07 — Common Areas</div>
            <h2
              style={{
                fontSize: 'clamp(36px, 5vw, 76px)',
                fontStyle: 'italic',
                lineHeight: 1.05,
                marginTop: '24px',
                color: 'var(--charcoal)',
              }}
            >
              The dining pavilion.
            </h2>
            <p
              style={{
                marginTop: '24px',
                color: 'var(--muted)',
                lineHeight: 1.7,
                maxWidth: '44ch',
              }}
            >
              A long table under a slow-turning fan, open on three sides to the
              garden. Meals slide into the afternoon.
            </p>
            <div
              style={{
                marginTop: '40px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px 32px',
                borderTop: '1px solid var(--line)',
                paddingTop: '24px',
              }}
            >
              {[
                ['Seats', 'up to 10'],
                ['Style', 'Open pavilion'],
                ['Setting', 'Garden facing'],
                ['Kitchen', 'Adjacent'],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="eyebrow" style={{ fontSize: '10px' }}>
                    {k}
                  </div>
                  <div
                    style={{
                      marginTop: '4px',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '18px',
                      fontStyle: 'italic',
                      color: 'var(--charcoal)',
                    }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
            <div className="dining-media" style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
              <CinematicVideo
                src={property.videos.dining}
                poster={property.images.dining2}
                className="cover-video"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cover-video { width: 100%; height: 100%; object-fit: cover; }
        @media (max-width: 860px) {
          .dining-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
