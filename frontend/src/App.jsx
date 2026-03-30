import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();
  if (loading) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#0e0600', color:'#c9a84c', fontSize:'1.5rem', fontFamily:'Cormorant Garamond,serif' }}>Loading…</div>;
  return admin ? children : <Navigate to="/admin/login" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" toastOptions={{ style: { background:'#1a0e04', color:'#e8c97a', border:'1px solid #c9a84c', fontFamily:'Jost,sans-serif' } }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
