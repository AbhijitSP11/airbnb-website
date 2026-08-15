import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { property } from '../data/property';
import { getLenis } from '../hooks/useLenis';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jump = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -20, duration: 1.6 });
    else (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 'var(--nav-height)',
          backdropFilter: scrolled ? 'blur(14px) saturate(130%)' : 'none',
          background: scrolled ? 'rgba(245, 239, 228, 0.82)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--line-soft)' : '1px solid transparent',
          color: scrolled ? 'var(--charcoal)' : 'var(--ivory)',
          transition: 'background 500ms var(--ease-out), color 500ms var(--ease-out), border-color 500ms',
        }}
      >
        <div
          className="container"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
          }}
        >
          <button
            onClick={() => jump('#top')}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '22px',
              fontStyle: 'italic',
              letterSpacing: '0.02em',
            }}
          >
            {property.name}
          </button>

          <nav
            style={{
              display: 'flex',
              gap: '38px',
              alignItems: 'center',
              fontSize: '12px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
            className="nav-links"
          >
            {property.nav.map((item) => (
              <button
                key={item.href}
                onClick={() => jump(item.href)}
                style={{ opacity: 0.85 }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => jump('#enquire')}
            className="nav-enquire"
            style={{
              fontSize: '11px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontWeight: 500,
              padding: '10px 22px',
              border: `1px solid ${scrolled ? 'var(--charcoal)' : 'rgba(245,239,228,0.65)'}`,
              borderRadius: '999px',
              transition: 'background 300ms, color 300ms, border-color 300ms',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = scrolled ? 'var(--charcoal)' : 'var(--ivory)';
              e.currentTarget.style.color = scrolled ? 'var(--ivory)' : 'var(--charcoal)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'inherit';
            }}
          >
            Enquire
          </button>

          <button
            className="nav-toggle"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            style={{
              display: 'none',
              width: '36px',
              height: '36px',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ width: '22px', height: '1px', background: 'currentColor' }} />
            <span style={{ width: '22px', height: '1px', background: 'currentColor' }} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: 'var(--ivory)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '28px',
        }}
      >
        {property.nav.map((item) => (
          <button
            key={item.href}
            onClick={() => jump(item.href)}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '32px',
              fontStyle: 'italic',
              color: 'var(--charcoal)',
            }}
          >
            {item.label}
          </button>
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 860px) {
          .nav-links, .nav-enquire { display: none !important; }
          .nav-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
