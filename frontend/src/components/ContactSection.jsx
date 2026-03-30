import { useState } from 'react';
import API from '../api';
import { SectionTitle } from './AboutSection';
import toast from 'react-hot-toast';

const inputStyle = { width: '100%', padding: '0.9rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--cream)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', outline: 'none', transition: 'border 0.3s', marginBottom: '1rem' };

export default function ContactSection({ content }) {
  const c = content || {};
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) return toast.error('Please fill all required fields');
    setSubmitting(true);
    try {
      await API.post('/enquiries', form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      toast.success('Your enquiry has been sent!');
    } catch { toast.error('Failed to send. Please try again.'); } finally { setSubmitting(false); }
  };

  return (
    <section id="contact" style={{ background: 'var(--dark)', padding: '8rem 2rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, var(--gold), transparent)' }} />
      
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <SectionTitle label="Get In Touch" title="Enquiries & Reservations" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem' }}>
          {/* Contact Info */}
          <div>
            <div style={{ marginBottom: '3rem' }}>
              {[
                { icon: '📍', label: 'Address', val: c.address || '12 Victoria Island Blvd, Lagos, Nigeria' },
                { icon: '📞', label: 'Phone', val: c.phone || '+234 801 234 5678' },
                { icon: '✉️', label: 'Email', val: c.email || 'hello@adamsrestaurant.com' },
                { icon: '🕐', label: 'Hours', val: c.hours || 'Mon–Fri: 8am–10pm | Sat–Sun: 9am–11pm' },
              ].map(info => (
                <div key={info.label} style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
                  <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{info.icon}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.4rem' }}>{info.label}</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 300, color: 'rgba(253,248,240,0.75)', lineHeight: 1.6 }}>{info.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '2rem', border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(201,168,76,0.03)' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--gold-light)', lineHeight: 1.7 }}>
                "We welcome every guest as family. Whether it's a quiet dinner for two or a grand celebration — we're here to make it extraordinary."
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginTop: '1rem' }}>— Chef Adam</p>
            </div>
          </div>

          {/* Enquiry Form */}
          <div>
            {success ? (
              <div style={{ textAlign: 'center', padding: '4rem', border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.04)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--gold)', marginBottom: '1rem' }}>Thank You!</h3>
                <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(253,248,240,0.7)', marginBottom: '2rem' }}>We've received your enquiry and will respond within 24 hours.</p>
                <button onClick={() => setSuccess(false)} style={{ padding: '0.9rem 2rem', background: 'var(--gold)', border: 'none', color: 'var(--dark)', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}>Send Another</button>
              </div>
            ) : (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                  <input placeholder="Full Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
                  <input placeholder="Email Address *" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
                </div>
                <input placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
                <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}>
                  <option value="" style={{ background: '#1a0e04' }}>Select Subject *</option>
                  <option value="Reservation" style={{ background: '#1a0e04' }}>Table Reservation</option>
                  <option value="Event Booking" style={{ background: '#1a0e04' }}>Private Event Booking</option>
                  <option value="Catering" style={{ background: '#1a0e04' }}>Catering Services</option>
                  <option value="General Enquiry" style={{ background: '#1a0e04' }}>General Enquiry</option>
                  <option value="Feedback" style={{ background: '#1a0e04' }}>Feedback</option>
                </select>
                <textarea placeholder="Your Message *" value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={5}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
                <button onClick={handleSubmit} disabled={submitting}
                  style={{ width: '100%', padding: '1rem', background: 'var(--gold)', border: 'none', color: 'var(--dark)', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer', opacity: submitting ? 0.7 : 1, transition: 'opacity 0.3s' }}>
                  {submitting ? 'Sending…' : 'Send Enquiry'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
