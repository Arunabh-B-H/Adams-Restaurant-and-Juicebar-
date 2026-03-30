export default function Footer() {
  return (
    <footer style={{ background: '#060300', borderTop: '1px solid rgba(201,168,76,0.1)', padding: '4rem 2rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)', fontSize: '1.6rem', fontWeight: 600, marginBottom: '0.5rem' }}>Adam's</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '1rem' }}>Restaurant & JuiceBar</div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 300, color: 'rgba(253,248,240,0.45)', lineHeight: 1.8 }}>Fine dining and fresh juices crafted with love. Serving our community since 2018.</p>
          </div>
          
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Quick Links</p>
            {['#about', '#founder', '#gallery', '#menu', '#reviews', '#contact'].map(href => (
              <a key={href} href={href} style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 300, color: 'rgba(253,248,240,0.45)', textDecoration: 'none', marginBottom: '0.6rem', textTransform: 'capitalize', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'rgba(253,248,240,0.45)'}>
                {href.replace('#', '')}
              </a>
            ))}
          </div>

          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Contact</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 300, color: 'rgba(253,248,240,0.45)', lineHeight: 1.8 }}>12 Victoria Island Boulevard<br />Lagos, Nigeria<br /><br />+234 801 234 5678<br />hello@adamsrestaurant.com</p>
          </div>

          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Opening Hours</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 300, color: 'rgba(253,248,240,0.45)', lineHeight: 2 }}>Monday – Friday<br />8:00 AM – 10:00 PM<br /><br />Saturday – Sunday<br />9:00 AM – 11:00 PM</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(201,168,76,0.08)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'rgba(253,248,240,0.25)' }}>© 2018–{new Date().getFullYear()} Adam's Restaurant & JuiceBar. All rights reserved.</p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'rgba(253,248,240,0.25)' }}>Crafted with passion ✦</p>
        </div>
      </div>
    </footer>
  );
}
