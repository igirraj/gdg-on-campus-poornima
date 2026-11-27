import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Clock, Tag, User } from 'lucide-react';
import { getPublishedPosts, blogCategories } from '../data/blog';
import type { BlogPost } from '../data/blog';

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article
      className="neo-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
      aria-label={`Blog post: ${post.title}`}
    >
      {post.coverImage && (
        <div style={{ height: '170px', overflow: 'hidden', borderBottom: '3px solid var(--ink)' }}>
          <img
            src={post.coverImage}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </div>
      )}

      <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.7rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className="tag tag-blue" style={{ fontSize: '0.6rem' }}>
            <Tag size={9} aria-hidden="true" />
            {post.category}
          </span>
          {post.readTime && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.66rem',
                color: 'var(--gray-500)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              <Clock size={10} aria-hidden="true" />
              {post.readTime} min read
            </span>
          )}
        </div>

        <h3 style={{ fontSize: '1.15rem', lineHeight: 1.25 }}>{post.title}</h3>

        <p
          style={{
            fontSize: '0.9rem',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--gray-500)',
          }}
        >
          <User size={12} aria-hidden="true" />
          {post.author}
          {post.publishedAt && (
            <>
              <span aria-hidden="true">·</span>
              {post.publishedAt}
            </>
          )}
        </div>

        <Link
          to={`/blog/${post.slug}`}
          className="btn btn-ink btn-sm btn-block"
          style={{ marginTop: 'auto' }}
          aria-label={`Read: ${post.title}`}
        >
          Read Article <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const publishedPosts = getPublishedPosts();

  const filtered = useMemo(() => {
    if (selectedCategory === 'All') return publishedPosts;
    return publishedPosts.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, publishedPosts]);

  return (
    <>
      {/* Header */}
      <section className="page-header">
        <div className="section-container">
          <div className="section-label">Articles</div>
          <h1 className="page-title">
            Community <span className="hl">blog</span>
          </h1>
          <p className="page-lede" style={{ marginBottom: '2rem' }}>
            Stories, tutorials, and insights from the community — written by students, for students.
          </p>

          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`filter-pill ${selectedCategory === cat ? 'filter-pill-active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section">
        <div className="section-container">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">
                <BookOpen size={22} />
              </span>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>No articles published yet</h3>
              <p style={{ fontSize: '0.92rem', maxWidth: '420px', marginBottom: '0.75rem' }}>
                Articles appear here once organizers and contributors publish them through the admin
                dashboard.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--gray-500)',
                }}
              >
                Community stories coming soon
              </p>
            </div>
          ) : (
            <>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--gray-500)',
                  marginBottom: '1.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {filtered.length} article{filtered.length !== 1 ? 's' : ''}
                {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
              </div>
              <div className="card-grid">
                {filtered.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
