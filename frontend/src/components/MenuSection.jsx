import { motion } from 'framer-motion';
import { SectionTitle } from './AboutSection';

const DEFAULT_MENU = [
  { name: "Signature Jollof Rice", description: "Slow-cooked in our secret tomato blend, served with fried plantain", price: "₦4,500", category: "Mains" },
  { name: "Fresh Passion Juice", description: "Cold-pressed with ginger, mint & a hint of lemon", price: "₦1,800", category: "Juices" },
  { name: "Pepper Soup", description: "Aromatic spiced broth with tender goat meat & utazi leaves", price: "₦3,200", category: "Starters" },
  { name: "Grilled Tilapia", description: "Charcoal-grilled with spiced herb butter & garden salad", price: "₦6,000", category: "Mains" },
  { name: "Chin-Chin Delight", description: "House-made crunchy snack with coconut & cinnamon", price: "₦1,200", category: "Snacks" },
  { name: "Chapman Cocktail", description: "Classic Nigerian cocktail with Angostura & bitters", price: "₦2,200", category: "Drinks" },
];

export default function MenuSection({ content }) {
  const items = (content && content.length > 0) ? content : DEFAULT_MENU;

  return (
    <section id="menu" style={{ background: 'var(--dark)', padding: '8rem 2rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, var(--gold), transparent)' }} />
      
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionTitle label="Taste the Experience" title="Menu Highlights" />
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="menu-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0' }}
        >
          {items.map((item, i) => (
            <div key={i} style={{ padding: '2.5rem', borderBottom: '1px solid rgba(201,168,76,0.1)', borderRight: i % 2 === 0 ? '1px solid rgba(201,168,76,0.1)' : 'none', transition: 'background 0.3s', cursor: 'default' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 400, color: 'var(--cream)', lineHeight: 1.2, flex: 1 }}>{item.name}</h3>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--gold)', marginLeft: '1rem', whiteSpace: 'nowrap' }}>{item.price}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 300, color: 'rgba(253,248,240,0.55)', lineHeight: 1.6, marginBottom: '0.75rem' }}>{item.description}</p>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-dark)', background: 'rgba(201,168,76,0.1)', padding: '0.25rem 0.75rem' }}>{item.category}</span>
            </div>
          ))}
          </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: '3rem', padding: '1.5rem', border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(201,168,76,0.03)' }}
        >
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontStyle: 'italic', color: 'var(--gold-light)' }}>
            Full menu available at the restaurant. Seasonal specials updated daily.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
