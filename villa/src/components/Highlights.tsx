import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { property } from '../data/property';

export function Highlights() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.hl-item', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 65%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--ivory-2)',
        padding: 'clamp(90px, 12vw, 140px) 0',
      }}
    >
      <div className="container">
        <div style={{ maxWidth: '640px', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
          <div className="eyebrow">08 — The Experience</div>
          <h2
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              fontStyle: 'italic',
              lineHeight: 1.05,
              marginTop: '24px',
              color: 'var(--charcoal)',
            }}
          >
            What the property offers.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            borderTop: '1px solid var(--line)',
          }}
        >
          {property.highlights.map((h, i) => (
            <div
              key={h}
              className="hl-item"
              style={{
                padding: '32px 24px',
                borderBottom: '1px solid var(--line)',
                borderRight: i % 3 !== 2 ? '1px solid var(--line-soft)' : 'none',
                minHeight: '160px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                className="eyebrow"
                style={{ fontSize: '10px', color: 'var(--muted)' }}
              >
                0{i + 1}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(24px, 2.4vw, 32px)',
                  fontStyle: 'italic',
                  color: 'var(--charcoal)',
                  lineHeight: 1.15,
                }}
              >
                {h}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
