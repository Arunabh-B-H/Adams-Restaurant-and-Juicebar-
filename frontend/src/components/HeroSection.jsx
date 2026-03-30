export default function HeroSection({ content }) {
  const h = content || {};
  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* Classic Ken Burns Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div style={{ width: '100%', height: '100%', backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.35)', animation: 'kenBurns 30s ease-out forwards' }} />
      </div>
      
      {/* Gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(14,6,0,0.4) 0%, transparent 40%, rgba(14,6,0,0.8) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(14,6,0,0.6) 100%)' }} />

      {/* Decorative border */}
      <div style={{ position: 'absolute', inset: '30px', border: '1px solid rgba(201,168,76,0.15)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '38px', border: '1px solid rgba(201,168,76,0.05)', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', textAlign: 'center', padding: '2rem', maxWidth: '900px', animation: 'fadeUp 1.2s ease' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem' }}>
          ✦ Est. 2018 ✦
        </p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '0.02em' }}>
          {h.heading || "Adam's Restaurant"}
          <br />
          <span style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 400 }}>&amp; JuiceBar</span>
        </h1>
        <div style={{ width: '80px', height: '1px', background: 'var(--gold)', margin: '1.5rem auto' }} />
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', fontWeight: 300, letterSpacing: '0.15em', color: 'rgba(253,248,240,0.75)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
          {h.subheading || 'Fine Dining & Fresh Juices Since 2018'}
        </p>
        {h.tagline && <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontStyle: 'italic', color: 'var(--gold-light)', marginTop: '0.5rem' }}>{h.tagline}</p>}
        
        <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="#gallery" style={{ display: 'inline-block', padding: '0.9rem 2.5rem', background: 'var(--gold)', color: 'var(--dark)', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.target.style.background = 'var(--gold-light)'; e.target.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.target.style.background = 'var(--gold)'; e.target.style.transform = 'none'; }}>
            Explore Gallery
          </a>
          <a href="#contact" style={{ display: 'inline-block', padding: '0.9rem 2.5rem', border: '1px solid var(--gold)', color: 'var(--gold)', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.target.style.background = 'rgba(201,168,76,0.1)'; e.target.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.transform = 'none'; }}>
            Make Enquiry
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', animation: 'bounce 2s infinite' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)' }}>Scroll</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(6px); } }
        @keyframes kenBurns { 0% { transform: scale(1); } 100% { transform: scale(1.15); } }
      `}</style>
    </section>
  );
}
