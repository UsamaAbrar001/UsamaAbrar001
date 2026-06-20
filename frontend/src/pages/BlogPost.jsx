import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/blog/${slug}`)
      .then((res) => setPost(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <span className="text-white/30 text-sm">Loading...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center flex-col gap-4">
        <span className="text-white/40">Post not found</span>
        <Link to="/blog" className="text-accent font-mono text-xs hover:text-white transition-colors">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <article className="max-w-[720px] mx-auto px-6 py-20">
        <Link to="/blog" className="font-mono text-xs text-accent hover:text-white transition-colors mb-8 inline-block">
          &larr; Back to Blog
        </Link>

        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover mb-8 grayscale contrast-[1.06]"
          />
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.04em] leading-tight mb-4">
          {post.title}
        </h1>

        <span className="text-xs text-white/20 font-mono block mb-8">
          {new Date(post.created_at).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'long', year: 'numeric',
          })}
        </span>

        <div
          className="prose prose-invert prose-sm max-w-none text-white/70 leading-relaxed
            prose-headings:text-white prose-headings:font-bold prose-headings:tracking-[-0.02em]
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white/90
            prose-code:text-accent prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
            prose-blockquote:border-accent prose-blockquote:text-white/50
            prose-img:grayscale prose-img:contrast-[1.06]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
