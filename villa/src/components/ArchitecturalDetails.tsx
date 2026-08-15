import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { property } from '../data/property';

export function ArchitecturalDetails() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.arch-img').forEach((el, i) => {
        gsap.fromTo(
          el,
          { yPercent: 12 * (i % 2 === 0 ? 1 : -1) },
          {
            yPercent: -12 * (i % 2 === 0 ? 1 : -1),
            ease: 'none',
            scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
          },
        );
        gsap.fromTo(
          el.querySelector('.arch-inner'),
          { clipPath: 'inset(30% 20% 30% 20%)', scale: 1.2 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            ease: 'power2.out',
            duration: 1.4,
            scrollTrigger: { trigger: el, start: 'top 80%' },
          },
        );
      });

      gsap.from('.arch-text > *', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 55%' },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        background: 'var(--ivory-2)',
        padding: 'clamp(90px, 12vw, 160px) 0',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 4fr)',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'start',
          }}
          className="arch-grid"
        >
          <div className="arch-text" style={{ position: 'sticky', top: '120px' }}>
            <div className="eyebrow">05 — Architectural Details</div>
            <h2
              style={{
                fontSize: 'clamp(36px, 5vw, 72px)',
                fontStyle: 'italic',
                lineHeight: 1.05,
                marginTop: '24px',
                color: 'var(--charcoal)',
              }}
            >
              Warm timber, worn stone, quiet light.
            </h2>
            <p
              style={{
                marginTop: '24px',
                color: 'var(--muted)',
                lineHeight: 1.7,
                maxWidth: '46ch',
              }}
            >
              The property is composed as a series of connected rooms — each
              opening onto the garden. Materials are natural: teak, lime, cane,
              linen. Everything softens with time.
            </p>
            <div style={{ marginTop: '40px', borderTop: '1px solid var(--line)', paddingTop: '20px' }}>
              <div className="eyebrow">Materials</div>
              <div
                style={{
                  marginTop: '10px',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '20px',
                  fontStyle: 'italic',
                  color: 'var(--charcoal-2)',
                  lineHeight: 1.5,
                }}
              >
                Teak · Lime plaster · Cane · Linen · Terracotta
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[property.images.living2, property.images.living3, property.images.living4].map((src, i) => (
              <div
                key={src}
                className="arch-img"
                style={{
                  width: i === 1 ? '72%' : '100%',
                  marginLeft: i === 1 ? 'auto' : 0,
                  aspectRatio: i === 1 ? '4/5' : '4/3',
                  overflow: 'hidden',
                  willChange: 'transform',
                }}
              >
                <div className="arch-inner" style={{ width: '100%', height: '100%', willChange: 'transform, clip-path' }}>
                  <img src={src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .arch-grid { grid-template-columns: 1fr !important; }
          .arch-text { position: static !important; }
        }
      `}</style>
    </section>
  );
}
