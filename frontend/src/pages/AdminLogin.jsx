import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const inputStyle = { width: '100%', padding: '1rem 1.2rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', color: '#fdf8f0', fontFamily: 'Jost,sans-serif', fontSize: '0.95rem', outline: 'none', marginBottom: '1.25rem', transition: 'border 0.3s' };

export default function AdminLogin() {
  const { login, admin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  if (admin) { navigate('/admin'); return null; }

  const handleLogin = async () => {
    if (!form.email || !form.password) return toast.error('Enter credentials');
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back, Admin!');
      navigate('/admin');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0e0600', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />
      
      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', animation: 'fadeUp 0.8s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: 'Cormorant Garamond,serif', color: '#c9a84c', fontSize: '1.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Adam's</div>
            <div style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)' }}>Restaurant & JuiceBar</div>
          </Link>
          <div style={{ width: '40px', height: '1px', background: '#c9a84c', margin: '1.5rem auto' }} />
          <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(253,248,240,0.4)' }}>Admin Panel</p>
        </div>

        <div style={{ border: '1px solid rgba(201,168,76,0.15)', padding: '2.5rem', background: 'rgba(14,6,0,0.8)', backdropFilter: 'blur(12px)' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1.8rem', fontWeight: 300, color: '#fdf8f0', marginBottom: '2rem', textAlign: 'center' }}>Sign In</h2>
          
          <label style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a84c', display: 'block', marginBottom: '0.5rem' }}>Email</label>
          <input type="email" placeholder="admin@adamsrestaurant.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={inputStyle} onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
          
          <label style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a84c', display: 'block', marginBottom: '0.5rem' }}>Password</label>
          <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{ ...inputStyle, marginBottom: '2rem' }} onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
          
          <button onClick={handleLogin} disabled={loading}
            style={{ width: '100%', padding: '1rem', background: '#c9a84c', border: 'none', color: '#0e0600', fontFamily: 'Jost,sans-serif', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer', opacity: loading ? 0.7 : 1, transition: 'all 0.3s' }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/" style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.75rem', color: 'rgba(201,168,76,0.5)', textDecoration: 'none', letterSpacing: '0.1em' }}>← Back to Website</Link>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.7rem', color: 'rgba(253,248,240,0.2)' }}>Default: admin@adamsrestaurant.com / Admin@2018</p>
        </div>
      </div>

      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
