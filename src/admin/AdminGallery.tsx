import { useState } from 'react';
import { Upload, Trash2, Image } from 'lucide-react';
import { galleryImages, galleryCategories } from '../data/gallery';

export default function AdminGallery() {
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
            Gallery Management
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Upload and manage community photos
          </p>
        </div>
        <button
          onClick={() => showNotification('⚠️ Backend not connected. Supabase integration is required to upload images.')}
          className="btn btn-primary btn-sm"
        >
          <Upload size={14} /> Upload Photos
        </button>
      </div>

      {/* Upload zone */}
      <div
        style={{
          border: '3px dashed var(--gray-300)',
          padding: '3rem 2rem',
          textAlign: 'center',
          marginBottom: '2rem',
          background: 'var(--white)',
          cursor: 'pointer',
        }}
        onClick={() => showNotification('⚠️ Backend not connected. Supabase storage integration is required for file uploads.')}
      >
        <Upload size={40} style={{ color: 'var(--gray-300)', marginBottom: '1rem' }} />
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>
          Drop images here or click to upload
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gray-500)' }}>
          Supports JPG, PNG, WebP · Max 5MB per image
        </p>
        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
          {galleryCategories.filter((c) => c !== 'All').map((cat) => (
            <span
              key={cat}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                padding: '0.15rem 0.4rem',
                background: 'var(--gray-100)',
                border: '1px solid var(--gray-300)',
                color: 'var(--gray-700)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Gallery grid */}
      {galleryImages.length === 0 ? (
        <div className="empty-state">
          <Image size={32} style={{ marginBottom: '1rem', color: 'var(--gray-500)' }} />
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>No images uploaded</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--gray-500)' }}>
            Upload images using the area above. Requires Supabase storage integration.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {galleryImages.map((img) => (
            <div
              key={img.id}
              style={{
                border: '2px solid var(--ink)',
                boxShadow: '3px 3px 0 var(--ink)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img src={img.src} alt={img.alt} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid var(--ink)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gray-500)' }}>{img.category}</span>
                <button
                  onClick={() => showNotification('⚠️ Backend not connected.')}
                  style={{
                    background: 'var(--coral)', border: '1px solid var(--ink)', padding: '0.2rem',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Trash2 size={12} />
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

