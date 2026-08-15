import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    document.documentElement.classList.add('has-custom-cursor');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) setVisible(true);
    };

    const raf = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      handle = requestAnimationFrame(raf);
    };
    let handle = requestAnimationFrame(raf);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const cursorLabel = t.closest<HTMLElement>('[data-cursor]');
      setLabel(cursorLabel?.dataset.cursor ?? '');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      cancelAnimationFrame(handle);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [visible]);

  const active = !!label;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--charcoal)',
          pointerEvents: 'none',
          zIndex: 300,
          opacity: visible ? (active ? 0 : 1) : 0,
          transition: 'opacity 200ms',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: active ? '72px' : '32px',
          height: active ? '72px' : '32px',
          borderRadius: '50%',
          border: '1px solid var(--ivory)',
          background: active ? 'rgba(28,26,23,0.85)' : 'transparent',
          color: 'var(--ivory)',
          pointerEvents: 'none',
          zIndex: 300,
          opacity: visible ? 1 : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '9px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          transition: 'width 260ms var(--ease-out), height 260ms var(--ease-out), background 260ms, opacity 200ms',
          mixBlendMode: active ? 'normal' : 'difference',
        }}
      >
        {label}
      </div>
    </>
  );
}
