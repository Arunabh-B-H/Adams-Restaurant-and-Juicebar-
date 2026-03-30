import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../api';
import { SectionTitle } from './AboutSection';
import toast from 'react-hot-toast';

const StarRating = ({ value, onChange, readonly }) => (
  <div style={{ display: 'flex', gap: '0.25rem' }}>
    {[1,2,3,4,5].map(s => (
      <span key={s} onClick={() => !readonly && onChange && onChange(s)}
        style={{ fontSize: '1.25rem', cursor: readonly ? 'default' : 'pointer', color: s <= value ? 'var(--gold)' : 'rgba(201,168,76,0.25)', transition: 'color 0.2s' }}>★</span>
    ))}
  </div>
);

const inputStyle = { width: '100%', padding: '0.9rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--cream)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', outline: 'none', transition: 'border 0.3s' };

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', rating: 5, comment: '' });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchReviews = () => { API.get('/reviews').then(r => setReviews(r.data)).finally(() => setLoading(false)); };
  useEffect(() => { fetchReviews(); }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.comment) return toast.error('Please fill all fields');
    setSubmitting(true);
    try {
      if (editing) {
        await API.put(`/reviews/${editing}`, form);
        toast.success('Review updated!');
        setEditing(null);
      } else {
        await API.post('/reviews', form);
        toast.success('Thank you for your review!');
      }
      setForm({ name: '', email: '', rating: 5, comment: '' });
      setShowForm(false);
      fetchReviews();
    } catch { toast.error('Something went wrong'); } finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    await API.delete(`/reviews/${id}`);
    toast.success('Review deleted');
    fetchReviews();
  };

  const handleEdit = (r) => {
    setEditing(r._id);
    setForm({ name: r.name, email: r.email, rating: r.rating, comment: r.comment });
    setShowForm(true);
    window.scrollTo({ top: document.getElementById('reviews').offsetTop, behavior: 'smooth' });
  };

  return (
    <section id="reviews" style={{ background: 'var(--dark2)', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionTitle label="Guest Experiences" title="Reviews" />

        {/* Add Review button */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <button onClick={() => { setShowForm(!showForm); setEditing(null); setForm({ name: '', email: '', rating: 5, comment: '' }); }}
            style={{ padding: '0.9rem 2.5rem', background: showForm ? 'transparent' : 'var(--gold)', border: '1px solid var(--gold)', color: showForm ? 'var(--gold)' : 'var(--dark)', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s' }}>
            {showForm ? '✕ Cancel' : '+ Write a Review'}
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.15)', padding: '2.5rem', marginBottom: '3rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--gold)', marginBottom: '1.5rem' }}>
              {editing ? 'Edit Review' : 'Share Your Experience'}
            </h3>
            <div className="review-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <input placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} />
              <input placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '0.5rem' }}>Rating</label>
              <StarRating value={form.rating} onChange={r => setForm({...form, rating: r})} />
            </div>
            <textarea placeholder="Tell us about your experience…" value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} rows={4}
              style={{ ...inputStyle, resize: 'vertical', marginBottom: '1rem' }} />
            <button onClick={handleSubmit} disabled={submitting}
              style={{ padding: '0.9rem 2.5rem', background: 'var(--gold)', border: 'none', color: 'var(--dark)', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', opacity: submitting ? 0.7 : 1 }}>
              {submitting ? 'Submitting…' : editing ? 'Update Review' : 'Submit Review'}
            </button>
          </div>
        )}

        {/* Reviews list */}
        {loading ? <div style={{ textAlign: 'center', color: 'var(--gold)', fontFamily: 'var(--font-serif)', fontSize: '1.5rem', padding: '3rem' }}>Loading reviews…</div> :
          reviews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', border: '1px solid rgba(201,168,76,0.1)' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontStyle: 'italic', color: 'rgba(253,248,240,0.4)' }}>Be the first to share your experience.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="reviews-grid" style={{ display: 'grid', gap: '1.5rem' }}
            >
              {reviews.map(r => (
                <div key={r._id} style={{ border: '1px solid rgba(201,168,76,0.12)', padding: '2rem', background: 'rgba(201,168,76,0.02)', transition: 'border-color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.12)'}>
                  <div className="review-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--cream)', marginBottom: '0.25rem' }}>{r.name}</h4>
                      <StarRating value={r.rating} readonly />
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'rgba(253,248,240,0.35)', letterSpacing: '0.05em' }}>{new Date(r.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })}</span>
                      <button onClick={() => handleEdit(r)} style={{ background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', padding: '0.3rem 0.75rem', fontFamily: 'var(--font-sans)', fontSize: '0.7rem', cursor: 'pointer', letterSpacing: '0.1em' }}>Edit</button>
                      <button onClick={() => handleDelete(r._id)} style={{ background: 'none', border: '1px solid rgba(255,100,100,0.3)', color: 'rgba(255,120,120,0.8)', padding: '0.3rem 0.75rem', fontFamily: 'var(--font-sans)', fontSize: '0.7rem', cursor: 'pointer', letterSpacing: '0.1em' }}>Delete</button>
                    </div>
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 300, color: 'rgba(253,248,240,0.7)', lineHeight: 1.8 }}>{r.comment}</p>
                  
                  {r.adminReply && (
                    <div style={{ marginTop: '1.5rem', padding: '1rem 1.5rem', background: 'rgba(201,168,76,0.06)', borderLeft: '2px solid var(--gold)' }}>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>Adam's Response</p>
                      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', fontStyle: 'italic', color: 'rgba(253,248,240,0.65)', lineHeight: 1.7 }}>{r.adminReply}</p>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
      </div>
    </section>
  );
}
