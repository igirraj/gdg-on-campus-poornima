import { useState, useMemo } from 'react';
import { Image, X, ZoomIn } from 'lucide-react';
import { galleryImages, galleryCategories } from '../data/gallery';

function ImageModal({
  image,
  onClose,
}: {
  image: (typeof galleryImages)[0];
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        background: 'rgba(30,30,30,0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close image preview"
        className="btn btn-sm"
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          padding: '0.5rem',
        }}
      >
        <X size={18} />
      </button>
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '85vh' }}>
        <img
          src={image.src}
          alt={image.alt}
          style={{
            maxWidth: '100%',
            maxHeight: '78vh',
            objectFit: 'contain',
            border: '3px solid var(--white)',
            boxShadow: '8px 8px 0 rgba(255,255,255,0.25)',
          }}
        />
        {image.caption && (
          <p
            style={{
              marginTop: '1rem',
              color: 'var(--white)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              textAlign: 'center',
            }}
          >
            {image.caption}
          </p>
        )}
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null);

  const filtered = useMemo(() => {
    if (selectedCategory === 'All') return galleryImages;
    return galleryImages.filter((img) => img.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      {/* Header */}
      <section className="page-header">
        <div className="section-container">
          <div className="section-label">Moments</div>
          <h1 className="page-title">
            Community <span className="hl">gallery</span>
          </h1>
          <p className="page-lede" style={{ marginBottom: '2rem' }}>
            Snapshots from our workshops, hackathons, and orientations — every picture captures the
            energy of building together.
          </p>

          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {galleryCategories.map((cat) => (
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
                <Image size={22} />
              </span>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>No photos uploaded yet</h3>
              <p style={{ fontSize: '0.92rem', maxWidth: '420px', marginBottom: '0.75rem' }}>
                Gallery photos appear here once organizers upload them through the admin dashboard.
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
                Event photos coming soon
              </p>
            </div>
          ) : (
            <div className="gallery-masonry">
              {filtered.map((image) => (
                <button
                  key={image.id}
                  className="gallery-tile"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View: ${image.alt}`}
                >
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <span className="gallery-overlay" aria-hidden="true">
                    <ZoomIn size={26} color="white" />
                  </span>
                  {image.caption && <span className="gallery-caption">{image.caption}</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
}
