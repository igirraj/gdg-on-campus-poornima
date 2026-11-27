import { Mail } from 'lucide-react';

export default function AdminContacts() {
  // No fake messages — this is a placeholder for Supabase integration
  const messages: never[] = [];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.75rem', marginBottom: '0.35rem' }}>
          Contact Messages
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          View and manage submitted contact form messages
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="empty-state">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '5rem',
              height: '5rem',
              background: 'var(--mint)',
              border: '3px solid var(--ink)',
              boxShadow: '5px 5px 0 var(--ink)',
              marginBottom: '1.5rem',
            }}
          >
            <Mail size={32} />
          </div>
          <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>No messages yet</h3>
          <p style={{ fontSize: '0.9rem', maxWidth: '400px', marginBottom: '0.5rem' }}>
            Contact form submissions will appear here once the Supabase backend is connected.
            Currently, the contact form operates in demo mode only.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--gray-500)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Requires Supabase integration
          </p>
        </div>
      ) : null}
    </div>
  );
}

