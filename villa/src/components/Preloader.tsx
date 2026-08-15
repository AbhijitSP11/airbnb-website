import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { property } from '../data/property';

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let start: number | null = null;
    const DURATION = 1600;
    let raf = 0;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / DURATION);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => setDone(true), 200);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] } }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--ivory)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '40px',
          }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
            style={{ textAlign: 'center' }}
          >
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontStyle: 'italic', color: 'var(--charcoal)' }}>
              {property.name}
            </h1>
            <div className="eyebrow" style={{ marginTop: '18px' }}>
              Loading experience
            </div>
          </motion.div>

          <div
            style={{
              width: 'min(280px, 60vw)',
              height: '1px',
              background: 'var(--line-soft)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress * 100}%`,
                height: '100%',
                background: 'var(--charcoal)',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
