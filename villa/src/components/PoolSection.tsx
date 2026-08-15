import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { property } from '../data/property';
import { CinematicVideo } from './CinematicVideo';

export function PoolSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const media = root.querySelector('.pool-media') as HTMLElement;
      gsap.fromTo(
        media,
        { xPercent: -6, scale: 1.1 },
        {
          xPercent: 6,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        },
      );

      gsap.from('.pool-text > *', {
        y: 30,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 60%' },
      });

      gsap.from('.pool-meta', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 40%' },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pool"
      ref={ref}
      style={{
        position: 'relative',
        background: 'var(--ivory)',
        padding: 'clamp(90px, 12vw, 160px) 0',
      }}
    >
      <div className="container">
        <div className="pool-text" style={{ maxWidth: '640px', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
          <div className="eyebrow">02 — The Private Garden</div>
          <h2
            style={{
              fontSize: 'clamp(40px, 6vw, 88px)',
              fontStyle: 'italic',
              lineHeight: 1.02,
              marginTop: '24px',
              color: 'var(--charcoal)',
            }}
          >
            Pool, garden, and the long horizon.
          </h2>
        </div>

        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
          <div className="pool-media" style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
            <CinematicVideo
              src={property.videos.beach}
              poster={property.images.beach2}
              className="cover-video"
            />
          </div>
        </div>

        <div
          className="pool-meta"
          style={{
            marginTop: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '32px',
            borderTop: '1px solid var(--line)',
            paddingTop: '32px',
          }}
        >
          {['Private pool', 'Tropical garden', 'Outdoor living', 'Sea breeze'].map((label) => (
            <div key={label}>
              <div className="eyebrow" style={{ marginBottom: '8px' }}>
                Feature
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '22px',
                  fontStyle: 'italic',
                  color: 'var(--charcoal)',
                }}
              >
                {label}
              </div>
            </div>
          ))}
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
