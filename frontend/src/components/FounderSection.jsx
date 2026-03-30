import { SectionTitle } from './AboutSection';

export default function FounderSection({ content }) {
  const f = content || {};
  return (
    <section id="founder" style={{ background: 'var(--dark)', padding: '8rem 2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative large text */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'var(--font-serif)', fontSize: 'clamp(8rem, 20vw, 18rem)', fontWeight: 700, color: 'rgba(201,168,76,0.03)', letterSpacing: '-0.05em', pointerEvents: 'none', whiteSpace: 'nowrap', userSelect: 'none' }}>ADAM'S</div>
      
      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <SectionTitle label="Meet the Visionary" title="Our Founder" />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center' }}>
          {/* Photo */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '-15px', right: '15px', bottom: '15px', border: '1px solid rgba(201,168,76,0.3)' }} />
            <img 
              src={f.imageUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600'} 
              alt={f.name || 'Founder'}
              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block', filter: 'sepia(10%) contrast(1.05)', position: 'relative' }}
            />
            <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: 'var(--gold)', color: 'var(--dark)', padding: '1rem 1.5rem', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
              <div style={{ fontSize: '1.8rem', lineHeight: 1 }}>Since</div>
              <div style={{ fontSize: '2.5rem', lineHeight: 1, fontStyle: 'italic' }}>2018</div>
            </div>
          </div>
          
          {/* Bio */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.1, marginBottom: '0.5rem' }}>
              {f.name || 'Adam Okonkwo'}
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '2rem' }}>
              {f.title || 'Founder & Executive Chef'}
            </p>
            
            <div style={{ width: '40px', height: '1px', background: 'var(--gold)', marginBottom: '2rem' }} />
            
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.9, color: 'rgba(253,248,240,0.75)', marginBottom: '2.5rem' }}>
              {f.bio || "Chef Adam brings over 15 years of culinary expertise from kitchens across West Africa and Europe. His philosophy is simple: great food starts with great ingredients and genuine love for the craft."}
            </p>
            
            {f.quote && (
              <div style={{ position: 'relative', padding: '2rem', background: 'rgba(201,168,76,0.05)', borderLeft: '3px solid var(--gold)' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'var(--gold)', lineHeight: 0.5, position: 'absolute', top: '1.5rem', left: '1rem', opacity: 0.5 }}>"</div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--gold-light)', lineHeight: 1.7, paddingLeft: '1rem' }}>
                  {f.quote}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
