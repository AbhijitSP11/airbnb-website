import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { property } from '../data/property';

gsap.registerPlugin(ScrollTrigger);

type Post = {
  user: string;
  handle: string;
  avatar: string;
  location: string;
  image: string;
  caption: string;
  likes: string;
  time: string;
};

const posts: Post[] = [
  {
    user: 'Anaïs Laurent',
    handle: 'anais.travels',
    avatar: '#c9a382',
    location: property.location,
    image: property.images.pool1,
    caption:
      'A week of slow mornings and the sound of the sea. Casa Serena is exactly what a quiet vacation should feel like.',
    likes: '2,148',
    time: '3d',
  },
  {
    user: 'Rohan Mehta',
    handle: 'rohanmehta',
    avatar: '#8a6b4a',
    location: 'Goa · India',
    image: property.images.beach1,
    caption:
      'Woke up to this. Sixteen years of travel and I have never stayed anywhere as considered as this villa.',
    likes: '4,392',
    time: '5d',
  },
  {
    user: 'Sophie & James',
    handle: 'sophiethenjames',
    avatar: '#a08066',
    location: 'Anniversary trip',
    image: property.images.living2,
    caption:
      'Every corner is a little painting. Long lunches at the pavilion, evenings by the pool. We are already planning to return.',
    likes: '1,884',
    time: '1w',
  },
  {
    user: 'Marina Duarte',
    handle: 'marinaduarte',
    avatar: '#b58a5f',
    location: property.location,
    image: property.images.bed2,
    caption:
      'The kind of bedroom you never want to leave. Linen sheets, cane shutters, and a garden at the door.',
    likes: '3,027',
    time: '2w',
  },
];

function Avatar({ color, name }: { color: string; name: string }) {
  const initials = name
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('');
  return (
    <div
      style={{
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${color}, #6b5238)`,
        color: 'var(--ivory)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        fontWeight: 500,
        letterSpacing: '0.04em',
        border: '2px solid var(--ivory)',
        boxShadow: '0 0 0 1.5px rgba(184, 99, 42, 0.55)',
      }}
    >
      {initials}
    </div>
  );
}

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('.ig-head > *', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 70%' },
      });

      gsap.from('.ig-card', {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ig-grid', start: 'top 75%' },
      });

      root.querySelectorAll<HTMLElement>('.ig-photo').forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.15, yPercent: 6 },
          {
            scale: 1,
            yPercent: -6,
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

  return (
    <section
      id="testimonials"
      ref={ref}
      style={{
        background: 'var(--ivory-2)',
        padding: 'clamp(90px, 12vw, 140px) 0',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div
          className="ig-head"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: 'clamp(48px, 6vw, 80px)',
          }}
        >
          <div>
            <div className="eyebrow">Guest Diaries</div>
            <h2
              style={{
                fontSize: 'clamp(36px, 5vw, 72px)',
                fontStyle: 'italic',
                lineHeight: 1.05,
                marginTop: '20px',
                color: 'var(--charcoal)',
                maxWidth: '18ch',
              }}
            >
              Postcards from happy visitors.
            </h2>
          </div>
          <div className="eyebrow" style={{ color: 'var(--muted)' }}>
            #casaserena · {posts.length} recent
          </div>
        </div>

        <div
          className="ig-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(20px, 2vw, 32px)',
            alignItems: 'start',
          }}
        >
          {posts.map((p) => (
            <IGPost key={p.handle} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IGPost({ post }: { post: Post }) {
  return (
    <article
      className="ig-card"
      style={{
        background: 'var(--ivory)',
        border: '1px solid var(--line-soft)',
        borderRadius: '14px',
        overflow: 'hidden',
        fontFamily: 'var(--font-sans)',
        color: 'var(--charcoal)',
        boxShadow: '0 4px 24px rgba(28, 26, 23, 0.04)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 16px',
        }}
      >
        <Avatar color={post.avatar} name={post.user} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.01em' }}>
            {post.handle}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '1px' }}>
            {post.location}
          </div>
        </div>
        <MoreHorizontal size={18} style={{ color: 'var(--muted)' }} />
      </header>

      {/* Photo */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          background: '#111',
        }}
      >
        <img
          className="ig-photo"
          src={post.image}
          alt=""
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '12px 16px 4px',
        }}
      >
        <IconButton>
          <Heart size={20} />
        </IconButton>
        <IconButton>
          <MessageCircle size={20} />
        </IconButton>
        <IconButton>
          <Send size={20} />
        </IconButton>
        <div style={{ flex: 1 }} />
        <IconButton>
          <Bookmark size={20} />
        </IconButton>
      </div>

      {/* Likes + Caption */}
      <div style={{ padding: '4px 16px 18px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600 }}>{post.likes} likes</div>
        <p style={{ marginTop: '8px', fontSize: '13.5px', lineHeight: 1.55, color: 'var(--charcoal-2)' }}>
          <span style={{ fontWeight: 600, marginRight: '6px' }}>{post.handle}</span>
          {post.caption}
        </p>
        <div
          style={{
            marginTop: '10px',
            fontSize: '11px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          {post.time} ago
        </div>
      </div>
    </article>
  );
}

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      data-cursor=""
      style={{
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--charcoal)',
        transition: 'transform 200ms, color 200ms',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.12)';
        e.currentTarget.style.color = 'var(--orange)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.color = 'var(--charcoal)';
      }}
    >
      {children}
    </button>
  );
}
