import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { property } from '../data/property';
import { CinematicVideo } from './CinematicVideo';

export function PropertyEntry() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const v1 = root.querySelector('.entry-v1') as HTMLElement;
      const v2 = root.querySelector('.entry-v2') as HTMLElement;
      gsap.set(v2, { opacity: 0, scale: 1.1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=180%',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(v1, { scale: 1.15, ease: 'none' }, 0)
        .to(v1, { opacity: 0, ease: 'power2.inOut' }, 0.55)
        .to(v2, { opacity: 1, ease: 'power2.inOut' }, 0.4)
        .to(v2, { scale: 1, ease: 'none' }, 0.4)
        .fromTo(
          '.entry-text',
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power3.out' },
          0.7,
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#000',
        color: 'var(--ivory)',
      }}
    >
      <div className="entry-v1" style={{ position: 'absolute', inset: 0, willChange: 'transform, opacity' }}>
        <CinematicVideo
          src={property.videos.entrance}
          poster={property.images.dining1}
          className="cover-video"
        />
      </div>
      <div className="entry-v2" style={{ position: 'absolute', inset: 0, willChange: 'transform, opacity' }}>
        <CinematicVideo
          src={property.videos.living}
          poster={property.images.living1}
          className="cover-video"
        />
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.42) 100%)',
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: 'clamp(60px, 10vh, 120px)',
        }}
      >
        <div className="entry-text" style={{ maxWidth: '620px' }}>
          <div className="eyebrow" style={{ color: 'rgba(245,239,228,0.75)' }}>
            03 — Enter the Property
          </div>
          <h2
            style={{
              fontSize: 'clamp(40px, 7vw, 96px)',
              fontStyle: 'italic',
              lineHeight: 1,
              marginTop: '28px',
            }}
          >
            Cross the threshold.
          </h2>
          <p style={{ marginTop: '28px', maxWidth: '48ch', color: 'rgba(245,239,228,0.82)', lineHeight: 1.7 }}>
            From the pool, the architecture opens quietly — a passage of light
            and shadow that draws you inside without ceremony.
          </p>
        </div>
      </div>

      <style>{`
        .cover-video { width: 100%; height: 100%; object-fit: cover; }
      `}</style>
    </section>
  );
}
