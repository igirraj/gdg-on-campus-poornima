import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react';
import { getBlogBySlug } from '../data/blog';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogBySlug(slug) : undefined;

  if (!post) {
    return (
      <div style={{ padding: '5rem 0', textAlign: 'center' }}>
        <div className="section-container">
          <div
            style={{
              fontSize: '5rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              color: 'var(--gray-200)',
              lineHeight: 1,
              marginBottom: '1rem',
            }}
            aria-hidden="true"
          >
            404
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Article not found</h1>
          <p style={{ marginBottom: '2rem' }}>This article doesn’t exist or has been removed.</p>
          <Link to="/blog" className="btn btn-primary">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <div className="section-container">
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{post.title}</li>
          </ol>
        </div>
      </nav>

      {/* Article */}
      <article className="section grid-on-white" style={{ borderBottom: 'none' }}>
        <div className="section-container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span className="tag tag-blue">
              <Tag size={9} aria-hidden="true" />
              {post.category}
            </span>
            {post.readTime && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--gray-500)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                <Clock size={12} aria-hidden="true" />
                {post.readTime} min read
              </span>
            )}
          </div>

          <h1 style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', marginBottom: '1.5rem' }}>
            {post.title}
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
              marginBottom: '2rem',
              paddingBottom: '1.75rem',
              borderBottom: '2px solid var(--ink)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={16} color="var(--gray-500)" aria-hidden="true" />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.92rem' }}>
                {post.author}
              </span>
            </span>
            {post.publishedAt && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--gray-500)',
                }}
              >
                <Calendar size={13} aria-hidden="true" />
                {post.publishedAt}
              </span>
            )}
          </div>

          {post.coverImage && (
            <div
              style={{
                marginBottom: '2.5rem',
                border: '3px solid var(--ink)',
                boxShadow: '8px 8px 0 var(--ink)',
                overflow: 'hidden',
              }}
            >
              <img src={post.coverImage} alt="" style={{ width: '100%', display: 'block' }} />
            </div>
          )}

          <div style={{ fontSize: '1.02rem', lineHeight: 1.8 }}>
            {post.content.split('\n').map((para, i) => (
              <p key={i} style={{ marginBottom: '1.25rem', color: 'var(--gray-700)' }}>
                {para}
              </p>
            ))}
          </div>

          {post.tags.length > 0 && (
            <div
              style={{
                marginTop: '2rem',
                paddingTop: '2rem',
                borderTop: '2px solid var(--ink)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.4rem',
              }}
            >
              {post.tags.map((tag) => (
                <span key={tag} className="tag tag-yellow">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div style={{ marginTop: '2.5rem' }}>
            <Link to="/blog" className="btn btn-secondary btn-sm">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
