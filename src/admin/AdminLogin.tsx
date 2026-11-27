import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertCircle, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    // Placeholder — replace with Supabase auth
    // This does NOT create a fake auth system. It only demonstrates the UI flow.
    // Backend integration is required for real authentication.
    await new Promise((r) => setTimeout(r, 800));

    setIsLoading(false);
    setError(
      'Authentication backend is not yet connected. Supabase integration is required to enable admin login. Contact the development team to configure authentication.'
    );
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ink)',
        padding: '2rem',
        position: 'relative',
      }}
    >
      {/* Google color stripe */}
      <div
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', display: 'flex' }}
        aria-hidden="true"
      >
        {['#4285F4', '#EA4335', '#F9AB00', '#34A853'].map((c) => (
          <div key={c} style={{ flex: 1, background: c }} />
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Back link */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#888',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            textDecoration: 'none',
            marginBottom: '2rem',
          }}
        >
          <ArrowLeft size={14} /> Back to website
        </Link>

        <div
          style={{
            background: 'var(--white)',
            border: '3px solid var(--ink)',
            boxShadow: '8px 8px 0 var(--yellow)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '2rem 2rem 1.5rem',
              borderBottom: '2px solid var(--ink)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '3.5rem',
                height: '3.5rem',
                background: 'var(--yellow)',
                border: '3px solid var(--ink)',
                boxShadow: '3px 3px 0 var(--ink)',
                marginBottom: '1rem',
              }}
            >
              <Shield size={24} />
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '1.5rem',
                marginBottom: '0.5rem',
              }}
            >
              Admin Dashboard
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--gray-500)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              GDG on Campus · Poornima University
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
            {error && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  background: 'var(--coral-light)',
                  border: '2px solid var(--coral)',
                  padding: '0.85rem',
                  marginBottom: '1.5rem',
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '0.1rem', color: 'var(--coral)' }} />
                <p style={{ fontSize: '0.82rem', lineHeight: 1.5, color: 'var(--ink)' }}>{error}</p>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label htmlFor="admin-email" className="neo-label">
                  Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="neo-input"
                  placeholder="organizer@poornima.edu.in"
                  autoComplete="email"
                  autoFocus
                />
              </div>
              <div>
                <label htmlFor="admin-password" className="neo-label">
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="neo-input"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-ink btn-lg"
                disabled={isLoading}
                style={{ width: '100%', justifyContent: 'center', opacity: isLoading ? 0.7 : 1 }}
              >
                {isLoading ? 'Authenticating...' : 'Sign In →'}
              </button>
            </div>
          </form>

          {/* Footer note */}
          <div
            style={{
              padding: '1rem 2rem',
              borderTop: '2px solid var(--gray-200)',
              background: 'var(--gray-50)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--gray-500)',
                textAlign: 'center',
                lineHeight: 1.5,
              }}
            >
              Access restricted to authorised GDG on Campus organisers.
              <br />
              Requires Supabase backend configuration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

