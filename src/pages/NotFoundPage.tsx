import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div
      className="grid-on-white"
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        borderBottom: '3px solid var(--ink)',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '560px' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: 'var(--gray-500)',
            marginBottom: '1.5rem',
          }}
        >
          Error 404 · Page not found
        </div>

        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 'clamp(5rem, 18vw, 10rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.05em',
            marginBottom: '2rem',
          }}
          aria-hidden="true"
        >
          <span className="hl" style={{ fontSize: '0.72em', verticalAlign: 'middle' }}>
            404
          </span>
        </div>

        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>You took a wrong turn.</h1>
        <p style={{ fontSize: '1rem', marginBottom: '2rem' }}>
          The page you’re looking for doesn’t exist or has been moved. Check the URL, or head back
          to somewhere familiar.
        </p>

        <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-ink btn-lg">
            <Home size={16} /> Go Home
          </Link>
          <button onClick={() => window.history.back()} className="btn btn-secondary btn-lg">
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
