import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { property } from '../data/property';
import { CinematicVideo } from './CinematicVideo';
import { getLenis } from '../hooks/useLenis';

const spaces = [
  { id: '#living', label: 'Living' },
  { id: '#dining', label: 'Dining' },
  { id: '#bedrooms', label: 'Bedrooms' },
  { id: '#pool', label: 'Pool' },
];

export function LivingRoom() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.living-media',
        { scale: 1.12, xPercent: -3 },
        {
          scale: 1.02,
          xPercent: 3,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
        },
      );

      gsap.from('.living-copy > *', {
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

  const jump = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -20, duration: 1.6 });
    else (el as HTMLElement).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="living"
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
          className="living-copy"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            gap: '48px',
            alignItems: 'end',
            marginBottom: 'clamp(48px, 6vw, 80px)',
          }}
        >
          <div>
            <div className="eyebrow">04 — Interior</div>
            <h2
              style={{
                fontSize: 'clamp(40px, 6vw, 88px)',
                fontStyle: 'italic',
                lineHeight: 1.02,
                marginTop: '24px',
                color: 'var(--charcoal)',
              }}
            >
              The living room, slow-paced.
            </h2>
          </div>
          <p style={{ maxWidth: '42ch', color: 'var(--muted)', lineHeight: 1.7, fontSize: '16px' }}>
            Warm ivory walls, hand-worn timber, and long afternoons that pool
            into the room through arches open to the garden.
          </p>
        </div>

        <div style={{ position: 'relative', width: '100%', aspectRatio: '21/9', overflow: 'hidden' }}>
          <div className="living-media" style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
            <CinematicVideo
              src={property.videos.living}
              poster={property.images.living2}
              className="cover-video"
            />
          </div>

          <div
            style={{
              position: 'absolute',
              left: '24px',
              bottom: '24px',
              display: 'flex',
              gap: '4px',
              flexWrap: 'wrap',
              background: 'rgba(28,26,23,0.55)',
              backdropFilter: 'blur(8px)',
              padding: '10px',
              borderRadius: '999px',
            }}
          >
            {spaces.map((s) => (
              <button
                key={s.id}
                onClick={() => jump(s.id)}
                data-cursor="Go"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: 'var(--ivory)',
                  padding: '10px 18px',
                  borderRadius: '999px',
                  transition: 'background 250ms',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(245,239,228,0.15)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .cover-video { width: 100%; height: 100%; object-fit: cover; }
        @media (max-width: 760px) {
          .living-copy { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
