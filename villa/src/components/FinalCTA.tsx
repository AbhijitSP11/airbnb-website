import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { property } from '../data/property';
import { CinematicVideo } from './CinematicVideo';

export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.final-media',
        { scale: 1.15 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
        },
      );
      gsap.from('.final-copy > *', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 55%' },
      });
      gsap.to('.final-veil', {
        opacity: 0.6,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="enquire"
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#000',
        color: 'var(--ivory)',
      }}
    >
      <div className="final-media" style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
        <CinematicVideo
          src={property.videos.final}
          poster={property.images.beach1}
          className="cover-video"
        />
      </div>
      <div
        className="final-veil"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.48) 100%)',
          opacity: 0.4,
        }}
      />

      <div
        className="container final-copy"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '120px clamp(20px, 5vw, 56px)',
        }}
      >
        <div className="eyebrow" style={{ color: 'rgba(245,239,228,0.75)' }}>
          10 — Reserve
        </div>
        <h2
          style={{
            fontSize: 'clamp(48px, 9vw, 140px)',
            fontStyle: 'italic',
            lineHeight: 0.98,
            marginTop: '32px',
            maxWidth: '15ch',
            letterSpacing: '-0.01em',
          }}
        >
          Leave the ordinary behind.
        </h2>
        <p
          style={{
            marginTop: '32px',
            maxWidth: '48ch',
            color: 'rgba(245,239,228,0.8)',
            lineHeight: 1.7,
            fontSize: '17px',
          }}
        >
          Enquire about seasonal availability, private chef arrangements, and
          long-stay rates for {property.name}.
        </p>

        <a
          href={property.bookingUrl}
          data-cursor="Explore"
          style={{
            marginTop: '48px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            padding: '20px 32px',
            border: '1px solid rgba(245,239,228,0.5)',
            borderRadius: '999px',
            fontSize: '12px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            fontWeight: 500,
            color: 'var(--ivory)',
            transition: 'background 400ms, color 400ms, border-color 400ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--ivory)';
            e.currentTarget.style.color = 'var(--charcoal)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--ivory)';
          }}
        >
          <span>Plan your stay</span>
          <ArrowUpRight size={18} />
        </a>

        <div
          style={{
            marginTop: '60px',
            display: 'flex',
            gap: '40px',
            flexWrap: 'wrap',
            paddingTop: '28px',
            borderTop: '1px solid rgba(245,239,228,0.2)',
            width: '100%',
            maxWidth: '640px',
          }}
        >
          <div>
            <div className="eyebrow" style={{ color: 'rgba(245,239,228,0.6)' }}>Enquiries</div>
            <div style={{ marginTop: '8px', fontFamily: 'var(--font-serif)', fontSize: '20px', fontStyle: 'italic' }}>
              {property.contactEmail}
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ color: 'rgba(245,239,228,0.6)' }}>Location</div>
            <div style={{ marginTop: '8px', fontFamily: 'var(--font-serif)', fontSize: '20px', fontStyle: 'italic' }}>
              {property.location}
            </div>
          </div>
        </div>
      </div>

      <style>{`.cover-video { width: 100%; height: 100%; object-fit: cover; }`}</style>
    </section>
  );
}
