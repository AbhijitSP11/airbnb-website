import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { property } from '../data/property';

gsap.registerPlugin(ScrollTrigger);

const rooms = [
  {
    n: '01',
    title: 'Master bedroom',
    body: 'Quiet mornings. Soft light through cane shutters. Natural textures throughout.',
    img: property.images.bed1,
  },
  {
    n: '02',
    title: 'A second space',
    body: 'Designed for slow living. Muted tones, low furniture, the sound of the garden.',
    img: property.images.bed2,
  },
  {
    n: '03',
    title: 'Restful detail',
    body: 'Linen, lime, timber — small compositions repeated across every room.',
    img: property.images.bed3,
  },
];

export function Bedrooms() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const isMobile = window.matchMedia('(max-width: 860px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || reduced) return;

    const ctx = gsap.context(() => {
      const track = root.querySelector('.beds-track') as HTMLElement;
      if (!track) return;

      const getDistance = () => track.scrollWidth - window.innerWidth + 80;

      const horizontalTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${getDistance() + window.innerHeight * 0.4}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Ken Burns per image, driven by horizontal container animation
      root.querySelectorAll<HTMLElement>('.bed-img').forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.22, xPercent: 10 },
          {
            scale: 1,
            xPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement as HTMLElement,
              containerAnimation: horizontalTween,
              start: 'left right',
              end: 'right left',
              scrub: 1.1,
            },
          },
        );
      });

      // Staggered per-card copy reveal as each enters the viewport horizontally
      root.querySelectorAll<HTMLElement>('.bed-card').forEach((card) => {
        const copy = card.querySelectorAll('.bed-copy > *');
        gsap.fromTo(
          copy,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power3.out',
            duration: 0.8,
            stagger: 0.08,
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: 'left 80%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      // Rail index label
      const rail = root.querySelector('.beds-rail-count') as HTMLElement | null;
      if (rail) {
        root.querySelectorAll<HTMLElement>('.bed-card').forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            containerAnimation: horizontalTween,
            start: 'left 60%',
            end: 'right 40%',
            onEnter: () => (rail.textContent = String(i + 1).padStart(2, '0')),
            onEnterBack: () => (rail.textContent = String(i + 1).padStart(2, '0')),
          });
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="bedrooms"
      ref={ref}
      style={{
        position: 'relative',
        background: 'var(--charcoal)',
        color: 'var(--ivory)',
        overflow: 'hidden',
        height: '100vh',
        minHeight: '640px',
      }}
    >
      {/* Fixed left rail */}
      <div
        className="beds-rail container"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 32%) 1fr',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      >
        <div style={{ paddingRight: '32px' }}>
          <div className="eyebrow" style={{ color: 'rgba(245,239,228,0.7)' }}>
            06 — Rooms
          </div>
          <h2
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              fontStyle: 'italic',
              lineHeight: 1.02,
              marginTop: '20px',
              maxWidth: '14ch',
            }}
          >
            A quiet series of rooms.
          </h2>
          <div
            style={{
              marginTop: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              color: 'rgba(245,239,228,0.55)',
              fontFamily: 'var(--font-serif)',
              fontSize: '20px',
              fontStyle: 'italic',
            }}
          >
            <span className="beds-rail-count" style={{ color: 'var(--ivory)' }}>01</span>
            <span style={{ width: '40px', height: '1px', background: 'rgba(245,239,228,0.35)' }} />
            <span>{String(rooms.length).padStart(2, '0')}</span>
          </div>
          <div className="eyebrow" style={{ marginTop: '28px', color: 'rgba(245,239,228,0.55)' }}>
            Scroll to travel
          </div>
        </div>
      </div>

      {/* Horizontal track */}
      <div
        className="beds-viewport"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="beds-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(24px, 3vw, 48px)',
            paddingLeft: 'clamp(32%, 34vw, 480px)',
            paddingRight: '10vw',
            willChange: 'transform',
          }}
        >
          {rooms.map((r) => (
            <article
              key={r.n}
              className="bed-card"
              style={{
                flex: '0 0 auto',
                width: 'clamp(320px, 34vw, 560px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div
                data-cursor="View"
                style={{
                  width: '100%',
                  height: 'min(62vh, 640px)',
                  overflow: 'hidden',
                  background: '#111',
                  position: 'relative',
                }}
              >
                <img
                  className="bed-img"
                  src={r.img}
                  alt={r.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    willChange: 'transform',
                  }}
                />
              </div>
              <div className="bed-copy" style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '32px',
                    fontStyle: 'italic',
                    color: 'rgba(245,239,228,0.5)',
                    lineHeight: 1,
                  }}
                >
                  {r.n}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: 'clamp(22px, 1.8vw, 28px)',
                      fontStyle: 'italic',
                    }}
                  >
                    {r.title}
                  </h3>
                  <p
                    style={{
                      marginTop: '8px',
                      maxWidth: '32ch',
                      color: 'rgba(245,239,228,0.72)',
                      lineHeight: 1.55,
                      fontSize: '14px',
                    }}
                  >
                    {r.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #bedrooms {
            height: auto !important;
            padding: 80px 0 !important;
          }
          .beds-rail {
            position: relative !important;
            height: auto !important;
            grid-template-columns: 1fr !important;
            padding-bottom: 40px !important;
          }
          .beds-viewport {
            position: relative !important;
            inset: auto !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory;
          }
          .beds-track {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .bed-card {
            width: 78vw !important;
            scroll-snap-align: start;
          }
          .bed-card > div:first-child {
            height: 90vw !important;
            max-height: 480px !important;
          }
        }
      `}</style>
    </section>
  );
}

