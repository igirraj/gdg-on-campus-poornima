import { Shield, Users, AlertCircle } from 'lucide-react';

const roles = [
  { name: 'Super Admin', description: 'Complete administrative access to all features and settings.', color: 'var(--coral)' },
  { name: 'Organiser', description: 'Manage team, events, gallery, blog, and contact messages.', color: 'var(--blue)' },
  { name: 'Technical Lead', description: 'Manage events and blog posts.', color: 'var(--yellow)' },
  { name: 'Media Lead', description: 'Manage gallery images and blog posts.', color: 'var(--mint)' },
  { name: 'Community Coordinator', description: 'View events, team, and contact messages.', color: 'var(--pastel-green)' },
  { name: 'Production Lead', description: 'Manage gallery and event media.', color: 'var(--pastel-yellow)' },
];

export default function AdminSettings() {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.75rem', marginBottom: '0.35rem' }}>
          Settings
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Admin configuration and role management
        </p>
      </div>

      {/* Roles & Permissions */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={18} /> Roles &amp; Permissions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {roles.map((role) => (
            <div
              key={role.name}
              style={{
                background: 'var(--white)',
                border: '2px solid var(--ink)',
                boxShadow: '3px 3px 0 var(--ink)',
                padding: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    width: '0.75rem',
                    height: '0.75rem',
                    background: role.color,
                    border: '1.5px solid var(--ink)',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem' }}>
                  {role.name}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--gray-700)', lineHeight: 1.5 }}>
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* User Management notice */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={18} /> User Management
        </h2>
        <div className="empty-state" style={{ padding: '2rem' }}>
          <AlertCircle size={24} style={{ marginBottom: '0.75rem', color: 'var(--gray-500)' }} />
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Backend Required</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', maxWidth: '400px' }}>
            User management requires Supabase authentication integration. Once connected, you can invite users, assign roles, and manage permissions from this panel.
          </p>
        </div>
      </div>

      {/* Integration Status */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '1rem' }}>
          Integration Status
        </h2>
        <div
          style={{
            background: 'var(--white)',
            border: '2px solid var(--ink)',
            boxShadow: '3px 3px 0 var(--ink)',
          }}
        >
          {[
            { label: 'Supabase Auth', status: 'Not Connected', color: 'var(--coral)' },
            { label: 'Supabase Database', status: 'Not Connected', color: 'var(--coral)' },
            { label: 'Supabase Storage', status: 'Not Connected', color: 'var(--coral)' },
            { label: 'Frontend UI', status: 'Ready', color: 'var(--mint)' },
          ].map((item, i) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1.25rem',
                borderBottom: i < 3 ? '1px solid var(--gray-200)' : 'none',
              }}
            >
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.88rem' }}>
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '0.2rem 0.5rem',
                  background: item.color,
                  color: item.color === 'var(--coral)' ? 'var(--white)' : 'var(--ink)',
                  border: '1.5px solid var(--ink)',
                }}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

