export const property = {
  name: 'Casa Serena',
  tagline: 'A Private Tropical Villa',
  location: 'Goa · India',
  coords: '15.5° N · 73.7° E',
  bookingUrl: '#enquire',
  contactEmail: 'stay@casaserena.example',

  heroVideo: '/videos/pool-exterior.mp4',

  images: {
    beach1: '/images/beach-1.jpg',
    beach2: '/images/beach-2.jpg',
    bed1: '/images/bed-1.jpg',
    bed2: '/images/bed-2.jpg',
    bed3: '/images/bed-3.jpg',
    dining1: '/images/dining-1.jpg',
    dining2: '/images/dining-2.jpg',
    living1: '/images/living-room-1.jpg',
    living2: '/images/living-room-2.jpg',
    living3: '/images/living-room-3.jpg',
    living4: '/images/living-room-4.jpg',
    exterior1: '/images/exterior-1.jpg',
    pool1: '/images/pool-1.jpg',
  },

  videos: {
    hero: '/videos/pool-exterior.mp4',
    beach: '/videos/beach-reveal.mp4',
    pool: '/videos/pool-exterior.mp4',
    poolReveal: '/videos/pool-reveal.mp4',
    entrance: '/videos/pool-to-entrance.mp4',
    living: '/videos/living-room-entry.mp4',
    bedroom: '/videos/bedroom-tour.mp4',
    dining: '/videos/dining-reveal.mp4',
    final: '/videos/final-beach.mp4',
  },

  nav: [
    { label: 'Explore', href: '#arrival' },
    { label: 'Spaces', href: '#living' },
    { label: 'Rooms', href: '#bedrooms' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#enquire' },
  ],

  highlights: [
    'Beachfront',
    'Private Pool',
    'Tropical Garden',
    'Multi-Room Living',
    'Dining Pavilion',
    'Outdoor Lounge',
  ],
};

export type Property = typeof property;

export const gallery = [
  { src: property.images.beach1, alt: 'Beachfront view' },
  { src: property.images.exterior1, alt: 'Villa exterior' },
  { src: property.images.pool1, alt: 'Private pool' },
  { src: property.images.living1, alt: 'Living room' },
  { src: property.images.living2, alt: 'Living room detail' },
  { src: property.images.living3, alt: 'Living room afternoon' },
  { src: property.images.living4, alt: 'Common area' },
  { src: property.images.dining1, alt: 'Dining pavilion' },
  { src: property.images.dining2, alt: 'Dining detail' },
  { src: property.images.bed1, alt: 'Master bedroom' },
  { src: property.images.bed2, alt: 'Second bedroom' },
  { src: property.images.bed3, alt: 'Bedroom detail' },
  { src: property.images.beach2, alt: 'Beach path' },
];
