import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white tracking-[-0.03em] mb-2">Admin Login</h1>
        <p className="text-white/30 text-sm mb-8">Sign in to manage your portfolio</p>

        {error && <p className="text-red-400 text-xs mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 font-body focus:outline-none focus:border-accent/50 transition-colors mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 font-body focus:outline-none focus:border-accent/50 transition-colors mb-6"
        />
        <button
          type="submit"
          className="w-full bg-accent text-white text-sm font-bold py-3 tracking-[0.02em] hover:opacity-90 transition-all"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
