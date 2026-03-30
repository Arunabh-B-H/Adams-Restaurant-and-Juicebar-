const SectionTitle = ({ label, title, light }) => (
  <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 400, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>✦ {label} ✦</p>
    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, color: light ? 'var(--dark)' : 'var(--cream)', letterSpacing: '0.02em' }}>{title}</h2>
    <div style={{ width: '60px', height: '1px', background: 'var(--gold)', margin: '1rem auto 0' }} />
  </div>
);

export { SectionTitle };

export default function AboutSection({ content }) {
  const a = content || {};
  return (
    <section id="about" style={{ background: 'var(--dark2)', padding: '8rem 2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      
      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <SectionTitle label="Our Story" title={a.title || "A Legacy of Flavor"} />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontStyle: 'italic', lineHeight: 1.8, color: 'var(--gold-light)', marginBottom: '1.5rem' }}>
              {a.body || "Founded in 2018, Adam's Restaurant & JuiceBar was born from a passion for authentic flavors and wholesome living."}
            </p>
            {a.vision && (
              <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1.5rem', marginTop: '2rem' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 300, letterSpacing: '0.05em', color: 'rgba(253,248,240,0.7)', lineHeight: 1.7 }}>
                  <strong style={{ color: 'var(--gold)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.7rem' }}>Our Vision</strong>
                  {a.vision}
                </p>
              </div>
            )}
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { num: '2018', label: 'Est. Year' },
              { num: '5000+', label: 'Happy Guests' },
              { num: '80+', label: 'Menu Items' },
              { num: '30+', label: 'Fresh Juices' },
            ].map(s => (
              <div key={s.label} style={{ border: '1px solid rgba(201,168,76,0.2)', padding: '2rem 1rem', textAlign: 'center', background: 'rgba(201,168,76,0.03)' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--gold)', marginBottom: '0.25rem' }}>{s.num}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(253,248,240,0.5)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
