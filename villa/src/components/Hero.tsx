import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { property } from '../data/property';
import { CinematicVideo } from './CinematicVideo';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const media = root.querySelector('.hero-media') as HTMLElement | null;
      const content = root.querySelector('.hero-content') as HTMLElement | null;
      if (!media || !content) return;

      gsap.set(media, { scale: 1.08 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.1,
        },
      });

      tl.to(media, { scale: 1, y: '-8%', ease: 'none' }, 0)
        .to(content, { y: '-40%', opacity: 0, ease: 'power2.in' }, 0)
        .to('.hero-overlay', { opacity: 0.35, ease: 'none' }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '640px',
        width: '100%',
        overflow: 'hidden',
        background: '#000',
        color: 'var(--ivory)',
      }}
    >
      <div
        className="hero-media"
        style={{
          position: 'absolute',
          inset: 0,
          willChange: 'transform',
        }}
      >
        <CinematicVideo
          src={property.videos.hero}
          poster={property.images.beach1}
          eager
          className="hero-video"
        />
      </div>

      <div
        className="hero-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.35) 100%)',
          opacity: 1,
          pointerEvents: 'none',
        }}
      />

      <div
        className="hero-content"
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 clamp(20px, 5vw, 72px) clamp(60px, 10vh, 120px)',
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow"
          style={{ color: 'rgba(245,239,228,0.85)', marginBottom: '28px' }}
        >
          {property.tagline}
        </motion.div>

        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.6, delay: 2.05, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(52px, 10vw, 148px)',
            lineHeight: 0.95,
            fontStyle: 'italic',
            fontWeight: 300,
            maxWidth: '11ch',
            letterSpacing: '-0.01em',
          }}
        >
          {property.name}
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4, delay: 2.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
            borderTop: '1px solid rgba(245,239,228,0.25)',
            paddingTop: '22px',
          }}
        >
          <div className="eyebrow" style={{ color: 'rgba(245,239,228,0.85)' }}>
            {property.location}
          </div>
          <div
            style={{
              fontSize: '11px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              opacity: 0.75,
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <span>Scroll to explore</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-block' }}
            >
              ↓
            </motion.span>
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </section>
  );
}
