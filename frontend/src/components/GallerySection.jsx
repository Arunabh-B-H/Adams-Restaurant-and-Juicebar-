import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../api';
import { SectionTitle } from './AboutSection';

const BASE_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.replace('/api', '') : '';

const DEFAULT_GALLERY = [
  { _id: '1', title: 'Main Dining Hall', category: 'ambience', imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800' },
  { _id: '2', title: 'Signature Jollof Rice', category: 'food', imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800' },
  { _id: '3', title: 'Fresh Juice Bar', category: 'drinks', imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800' },
  { _id: '4', title: 'Outdoor Terrace', category: 'ambience', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800' },
  { _id: '5', title: 'Grilled Delights', category: 'food', imageUrl: 'https://images.unsplash.com/photo-1544025162-d76538aa31f2?w=800' },
  { _id: '6', title: 'Tropical Blends', category: 'drinks', imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800' },
  { _id: '7', title: 'Private Dining', category: 'ambience', imageUrl: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800' },
  { _id: '8', title: 'Dessert Selection', category: 'food', imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800' },
];

export default function GallerySection() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/gallery').then(res => setItems(res.data.length > 0 ? res.data : DEFAULT_GALLERY)).catch(() => setItems(DEFAULT_GALLERY)).finally(() => setLoading(false));
  }, []);

  const categories = ['all', 'food', 'drinks', 'ambience', 'events'];
  const filtered = filter === 'all' ? items : items.filter(i => i.category === filter);

  const imgSrc = (url) => url?.startsWith('/uploads') ? `${BASE_URL}${url}` : url;

  return (
    <section id="gallery" style={{ background: 'var(--dark2)', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionTitle label="Visual Journey" title="Gallery" />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="gallery-filters"
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}
        >
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              padding: '0.5rem 1.5rem', border: filter === cat ? '1px solid var(--gold)' : '1px solid rgba(201,168,76,0.3)',
              background: filter === cat ? 'var(--gold)' : 'transparent', color: filter === cat ? 'var(--dark)' : 'rgba(201,168,76,0.8)',
              fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'capitalize',
              cursor: 'pointer', transition: 'all 0.3s'
            }}>
              {cat}
            </button>
          ))}
        </motion.div>

        {loading ? <div style={{ textAlign: 'center', color: 'var(--gold)', padding: '4rem', fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>Loading gallery…</div> : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ columns: 'auto 300px', gap: '1rem' }}
          >
            {filtered.map(item => (
              <div key={item._id} onClick={() => setSelected(item)} style={{ marginBottom: '1rem', breakInside: 'avoid', cursor: 'pointer', position: 'relative', overflow: 'hidden', group: true }}>
                <img src={imgSrc(item.imageUrl)} alt={item.title} style={{ width: '100%', display: 'block', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; e.target.nextSibling.style.opacity = '1'; }}
                  onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.nextSibling.style.opacity = '0'; }}
                  onError={e => e.target.src = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400'} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,6,0,0.85) 0%, transparent 60%)', opacity: 0, transition: 'opacity 0.4s', display: 'flex', alignItems: 'flex-end', padding: '1.5rem', pointerEvents: 'none' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--cream)', marginBottom: '0.25rem' }}>{item.title}</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>{item.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '900px', width: '100%', position: 'relative' }}>
            <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: '-2rem', right: 0, background: 'none', border: 'none', color: 'var(--gold)', fontSize: '1.5rem', cursor: 'pointer', fontFamily: 'var(--font-serif)' }}>✕</button>
            <img src={imgSrc(selected.imageUrl)} alt={selected.title} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }} />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--cream)' }}>{selected.title}</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginTop: '0.25rem' }}>{selected.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
