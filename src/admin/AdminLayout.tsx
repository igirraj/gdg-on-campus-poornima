import { useState } from 'react';
import { Outlet, NavLink, Link, Navigate, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Image,
  BookOpen,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from 'lucide-react';

const sidebarLinks = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/team', label: 'Team', icon: Users },
  { to: '/admin/events', label: 'Events', icon: Calendar },
  { to: '/admin/gallery', label: 'Gallery', icon: Image },
  { to: '/admin/blog', label: 'Blog', icon: BookOpen },
  { to: '/admin/contacts', label: 'Messages', icon: MessageSquare },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Check auth - placeholder for Supabase integration
  const isAuthenticated = sessionStorage.getItem('gdg-admin-auth') === 'true';

  if (!isAuthenticated) {
    // Redirect to login. <Navigate> is the correct way to do this during
    // render — calling navigate() here caused render-phase side effects.
    return <Navigate to="/admin/login" replace />;
  }

  const currentRole = sessionStorage.getItem('gdg-admin-role') || 'Organiser';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F0F0F0' }}>
      {/* Sidebar */}
      <aside
        className="admin-sidebar"
        style={{
          width: '260px',
          background: 'var(--ink)',
          color: 'var(--white)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          position: 'fixed',
          top: 0,
          left: sidebarOpen ? 0 : '-260px',
          bottom: 0,
          zIndex: 200,
          transition: 'left 0.2s ease',
        }}
      >
        {/* Brand */}
        <div
          style={{
            padding: '1.25rem 1.25rem',
            borderBottom: '1px solid #333',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              width: '2.25rem',
              height: '2.25rem',
              background: 'var(--yellow)',
              border: '2px solid var(--yellow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Shield size={16} color="#1E1E1E" />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.9rem',
              }}
            >
              GDG on Campus Admin
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Poornima University
            </div>
          </div>
        </div>

        {/* Role badge */}
        <div style={{ padding: '0.75rem 1.25rem' }}>
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '0.2rem 0.5rem',
              background: 'var(--blue)',
              color: 'var(--white)',
              border: '1px solid var(--blue)',
            }}
          >
            {currentRole}
          </span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0.5rem 0' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
            {sidebarLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={() => setSidebarOpen(false)}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.65rem 1.25rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    color: isActive ? 'var(--yellow)' : '#aaa',
                    background: isActive ? 'rgba(255,214,0,0.08)' : 'transparent',
                    borderLeft: isActive ? '3px solid var(--yellow)' : '3px solid transparent',
                    textDecoration: 'none',
                    transition: 'all 0.1s ease',
                  })}
                >
                  <link.icon size={17} />
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #333' }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#888',
              textDecoration: 'none',
              marginBottom: '0.5rem',
            }}
          >
            ← Back to Website
          </Link>
          <button
            onClick={() => {
              sessionStorage.removeItem('gdg-admin-auth');
              sessionStorage.removeItem('gdg-admin-role');
              navigate('/admin/login');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              color: '#888',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 199,
          }}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
        className="admin-main"
      >
        {/* Top bar */}
        <header
          style={{
            background: 'var(--white)',
            borderBottom: '3px solid var(--ink)',
            padding: '0 1.5rem',
            height: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="admin-menu-toggle"
            aria-label="Toggle sidebar"
            style={{
              background: 'none',
              border: '2px solid var(--ink)',
              padding: '0.3rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--gray-500)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Admin Dashboard
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '2rem 1.5rem', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .admin-sidebar { left: 0 !important; position: sticky !important; top: 0; height: 100vh; }
          .admin-menu-toggle { display: none !important; }
        }
      `}</style>
    </div>
  );
}

