import { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { gallery } from '../data/property';

gsap.registerPlugin(ScrollTrigger);

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = gridRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('.gal-img').forEach((img, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        gsap.fromTo(
          img,
          { scale: 1.2, yPercent: 8 * dir },
          {
            scale: 1,
            yPercent: -8 * dir,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement as HTMLElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length)),
    [],
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? null : (i + 1) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, prev, next]);

  return (
    <section
      id="gallery"
      style={{
        background: 'var(--ivory)',
        padding: 'clamp(90px, 12vw, 140px) 0',
      }}
    >
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
          <div>
            <div className="eyebrow">09 — Cinematic Gallery</div>
            <h2
              style={{
                fontSize: 'clamp(36px, 5vw, 72px)',
                fontStyle: 'italic',
                lineHeight: 1.05,
                marginTop: '24px',
                color: 'var(--charcoal)',
              }}
            >
              A closer look.
            </h2>
          </div>
          <div className="eyebrow" style={{ color: 'var(--muted)' }}>
            {gallery.length} images
          </div>
        </div>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '16px',
          }}
        >
          {gallery.map((g, i) => {
            const layouts = [
              { gc: 'span 6', ar: '4/3' },
              { gc: 'span 6', ar: '4/3' },
              { gc: 'span 4', ar: '3/4' },
              { gc: 'span 8', ar: '4/3' },
              { gc: 'span 5', ar: '4/3' },
              { gc: 'span 7', ar: '4/3' },
              { gc: 'span 6', ar: '4/3' },
              { gc: 'span 6', ar: '4/3' },
              { gc: 'span 4', ar: '3/4' },
              { gc: 'span 4', ar: '3/4' },
              { gc: 'span 4', ar: '3/4' },
              { gc: 'span 6', ar: '4/3' },
              { gc: 'span 6', ar: '4/3' },
            ];
            const L = layouts[i % layouts.length];
            return (
              <button
                key={g.src}
                data-cursor="View"
                onClick={() => setOpen(i)}
                className="gal-cell"
                style={{
                  gridColumn: L.gc,
                  aspectRatio: L.ar,
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#111',
                }}
              >
                <img
                  className="gal-img"
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    willChange: 'transform',
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15,13,11,0.94)',
              zIndex: 250,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4vh 4vw',
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); close(); }}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '999px',
                border: '1px solid rgba(245,239,228,0.3)',
                color: 'var(--ivory)',
              }}
            >
              <X size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
              style={{
                position: 'absolute',
                left: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--ivory)',
                opacity: 0.7,
              }}
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
              style={{
                position: 'absolute',
                right: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--ivory)',
                opacity: 0.7,
              }}
            >
              <ChevronRight size={28} />
            </button>

            <motion.img
              key={open}
              src={gallery[open].src}
              alt={gallery[open].alt}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '92vw',
                maxHeight: '90vh',
                objectFit: 'contain',
                boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              }}
            />
            <div
              className="eyebrow"
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(245,239,228,0.6)',
              }}
            >
              {String(open + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 720px) {
          .gal-cell { grid-column: span 12 !important; }
        }
      `}</style>
    </section>
  );
}
