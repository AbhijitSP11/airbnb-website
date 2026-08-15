import { property } from '../data/property';

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--charcoal)',
        color: 'rgba(245,239,228,0.7)',
        padding: '60px 0 40px',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '22px', color: 'var(--ivory)' }}>
          {property.name}
        </div>
        <div className="eyebrow" style={{ color: 'rgba(245,239,228,0.5)' }}>
          © {new Date().getFullYear()} · {property.location}
        </div>
      </div>
    </footer>
  );
}
