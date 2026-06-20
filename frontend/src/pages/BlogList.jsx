import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/blog?published=true')
      .then((res) => setPosts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-[900px] mx-auto px-6 py-20">
        <Link to="/" className="font-mono text-xs text-accent hover:text-white transition-colors mb-8 inline-block">
          &larr; Back to Portfolio
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-[-0.04em] mb-4">Blog</h1>
        <p className="text-white/40 mb-12">Insights on maintenance engineering, reliability, and industrial systems.</p>

        {loading ? (
          <div className="text-white/30 text-sm">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-white/20 text-sm border border-white/10 p-8 text-center">
            No posts yet. Check back soon.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="border border-white/10 p-6 hover:border-accent/40 transition-colors group"
              >
                {post.cover_image && (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-48 object-cover mb-4 grayscale contrast-[1.06]"
                  />
                )}
                <h2 className="text-xl font-bold text-white group-hover:text-accent transition-colors tracking-[-0.02em]">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-sm text-white/40 mt-2 leading-relaxed">{post.excerpt}</p>
                )}
                <span className="text-xs text-white/20 font-mono mt-3 inline-block">
                  {new Date(post.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
