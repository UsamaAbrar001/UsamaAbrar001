import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

export default function AdminDashboard() {
  const [view, setView] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: '', excerpt: '', content: '', published: false });
  const [coverFile, setCoverFile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/admin'); return; }
    api.get('/auth/me').catch(() => {
      localStorage.removeItem('token');
      navigate('/admin');
    });
    loadPosts();
    loadMessages();
  }, [navigate]);

  const loadPosts = async () => {
    try {
      const res = await api.get('/blog');
      setPosts(res.data);
    } catch {}
  };
  const loadMessages = async () => {
    try {
      const res = await api.get('/contact');
      setMessages(res.data);
    } catch {}
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  const handleEdit = (post) => {
    setEditing(post.id);
    setForm({ title: post.title, excerpt: post.excerpt || '', content: post.content, published: post.published });
    setCoverFile(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    await api.delete(`/blog/${id}`);
    loadPosts();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('excerpt', form.excerpt);
    fd.append('content', form.content);
    fd.append('published', form.published);
    if (coverFile) fd.append('cover', coverFile);

    try {
      if (editing) {
        await api.put(`/blog/${editing}`, fd);
      } else {
        await api.post('/blog', fd);
      }
      setEditing(null);
      setForm({ title: '', excerpt: '', content: '', published: false });
      setCoverFile(null);
      loadPosts();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to save');
    }
  };

  return (
    <div className="min-h-screen bg-dark px-6 py-10">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link to="/" className="font-mono text-xs text-accent hover:text-white transition-colors">
              &larr; View Site
            </Link>
            <h1 className="text-2xl font-bold text-white tracking-[-0.03em] mt-2">Dashboard</h1>
          </div>
          <button onClick={logout} className="text-xs text-white/40 hover:text-white transition-colors font-mono">
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-10">
          {['posts', 'new', 'messages'].map((v) => (
            <button
              key={v}
              onClick={() => { setView(v); setEditing(null); setForm({ title: '', excerpt: '', content: '', published: false }); setCoverFile(null); }}
              className={`px-4 py-2 text-xs font-mono tracking-[0.08em] uppercase transition-colors ${
                view === v ? 'bg-accent text-white' : 'text-white/40 border border-white/10 hover:text-white'
              }`}
            >
              {v === 'posts' ? `Posts (${posts.length})` : v === 'new' ? '+ New Post' : `Messages (${messages.length})`}
            </button>
          ))}
        </div>

        {view === 'posts' && (
          <div className="flex flex-col gap-3">
            {posts.length === 0 && <p className="text-white/20 text-sm">No posts yet.</p>}
            {posts.map((post) => (
              <div key={post.id} className="border border-white/10 p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{post.title}</h3>
                  <span className="text-xs text-white/30 font-mono">
                    {post.published ? 'Published' : 'Draft'} · {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(post)} className="text-xs text-accent hover:text-white transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="text-xs text-red-400 hover:text-red-300 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {(view === 'new' || (view === 'posts' && editing)) && (
          <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-[600px]">
            <h2 className="text-lg font-bold text-white">{editing ? 'Edit Post' : 'New Post'}</h2>

            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 font-body focus:outline-none focus:border-accent/50"
            />
            <textarea
              placeholder="Excerpt (short summary)"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={2}
              className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 font-body focus:outline-none focus:border-accent/50 resize-none"
            />
            <textarea
              placeholder="Content (HTML supported)"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={12}
              required
              className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 font-body focus:outline-none focus:border-accent/50 resize-none font-mono"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files[0])}
              className="text-xs text-white/30 file:mr-3 file:py-2 file:px-4 file:border-0 file:text-xs file:bg-white/10 file:text-white hover:file:bg-white/15"
            />
            <label className="flex items-center gap-2 text-sm text-white/50">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="accent-accent"
              />
              Publish
            </label>

            <div className="flex gap-3">
              <button type="submit" className="bg-accent text-white text-sm font-bold px-6 py-2.5 hover:opacity-90 transition-all">
                {editing ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={() => { setEditing(null); setView('posts'); setForm({ title: '', excerpt: '', content: '', published: false }); setCoverFile(null); }}
                className="text-xs text-white/40 hover:text-white transition-colors">
                Cancel
              </button>
            </div>
          </form>
        )}

        {view === 'messages' && (
          <div className="flex flex-col gap-3">
            {messages.length === 0 && <p className="text-white/20 text-sm">No messages yet.</p>}
            {messages.map((msg) => (
              <div key={msg.id} className={`border ${msg.is_read ? 'border-white/5' : 'border-accent/30'} p-4`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-sm font-bold text-white">{msg.name}</span>
                    <span className="text-xs text-white/30 ml-3">{msg.email}</span>
                  </div>
                  <span className="text-xs text-white/20 font-mono">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                {msg.subject && <p className="text-xs text-white/40 mb-1">{msg.subject}</p>}
                <p className="text-sm text-white/50 leading-relaxed">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
