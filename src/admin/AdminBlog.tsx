import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, BookOpen } from 'lucide-react';
import { blogPosts } from '../data/blog';

export default function AdminBlog() {
  const [notification, setNotification] = useState('');

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.75rem', marginBottom: '0.35rem' }}>
            Blog Management
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Write, edit, and publish community articles
          </p>
        </div>
        <button
          onClick={() => showNotification('⚠️ Backend not connected. Supabase integration is required to create blog posts.')}
          className="btn btn-primary btn-sm"
        >
          <Plus size={14} /> New Article
        </button>
      </div>

      {blogPosts.length === 0 ? (
        <div className="empty-state">
          <BookOpen size={32} style={{ marginBottom: '1rem', color: 'var(--gray-500)' }} />
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>No articles yet</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--gray-500)', maxWidth: '400px' }}>
            Click "New Article" to write your first blog post. Articles can be saved as drafts or published immediately. Requires Supabase backend integration.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {blogPosts.map((post) => (
            <div
              key={post.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                background: 'var(--white)',
                border: '2px solid var(--ink)',
                boxShadow: '3px 3px 0 var(--ink)',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem' }}>
                  {post.title}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--gray-500)', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                  <span>{post.author}</span>
                  <span
                    style={{
                      padding: '0.1rem 0.35rem',
                      background: post.status === 'published' ? 'var(--mint)' : 'var(--yellow)',
                      fontSize: '0.6rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    {post.status}
                  </span>
                  <span>{post.category}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                <button
                  onClick={() => showNotification('⚠️ Backend not connected.')}
                  title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                  style={{
                    background: 'var(--mint)', color: 'var(--ink)', border: '2px solid var(--ink)',
                    padding: '0.35rem', cursor: 'pointer', display: 'flex', alignItems: 'center',
                  }}
                >
                  {post.status === 'published' ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button
                  onClick={() => showNotification('⚠️ Backend not connected.')}
                  title="Edit"
                  style={{
                    background: 'var(--blue)', color: 'var(--white)', border: '2px solid var(--ink)',
                    padding: '0.35rem', cursor: 'pointer', display: 'flex', alignItems: 'center',
                  }}
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => showNotification('⚠️ Backend not connected.')}
                  title="Delete"
                  style={{
                    background: 'var(--coral)', color: 'var(--ink)', border: '2px solid var(--ink)',
                    padding: '0.35rem', cursor: 'pointer', display: 'flex', alignItems: 'center',
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {notification && <div className="neo-toast">{notification}</div>}
    </div>
  );
}

