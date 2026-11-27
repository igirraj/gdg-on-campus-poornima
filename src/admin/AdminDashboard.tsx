import { Users, Calendar, Image, BookOpen, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { teamMembers } from '../data/team';
import { events } from '../data/events';
import { galleryImages } from '../data/gallery';
import { blogPosts } from '../data/blog';

export default function AdminDashboard() {
  const stats = [
    { label: 'Team Members', value: teamMembers.length, icon: Users, color: 'var(--blue)', to: '/admin/team' },
    { label: 'Events', value: events.length, icon: Calendar, color: 'var(--yellow)', to: '/admin/events' },
    { label: 'Gallery Images', value: galleryImages.length, icon: Image, color: 'var(--mint)', to: '/admin/gallery' },
    { label: 'Blog Posts', value: blogPosts.length, icon: BookOpen, color: 'var(--coral)', to: '/admin/blog' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: '1.75rem',
            marginBottom: '0.5rem',
          }}
        >
          Dashboard Overview
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          GDG on Campus Poornima University · Admin Panel
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.to}
            style={{ textDecoration: 'none', color: 'var(--ink)' }}
          >
            <div
              className="neo-card"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  background: stat.color,
                  border: '2px solid var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color === 'var(--yellow)' || stat.color === 'var(--mint)' ? 'var(--ink)' : 'var(--white)',
                }}
              >
                <stat.icon size={18} />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '2rem',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--gray-500)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {stat.label}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '2rem' }}>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '1.15rem',
            marginBottom: '1rem',
          }}
        >
          Quick Actions
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Link to="/admin/team" className="btn btn-primary btn-sm">
            <Users size={14} /> Manage Team
          </Link>
          <Link to="/admin/events" className="btn btn-secondary btn-sm">
            <Calendar size={14} /> Manage Events
          </Link>
          <Link to="/admin/gallery" className="btn btn-secondary btn-sm">
            <Image size={14} /> Upload Photos
          </Link>
          <Link to="/admin/blog" className="btn btn-secondary btn-sm">
            <BookOpen size={14} /> Write Article
          </Link>
          <Link to="/admin/contacts" className="btn btn-secondary btn-sm">
            <MessageSquare size={14} /> View Messages
          </Link>
        </div>
      </div>

      {/* Backend notice */}
      <div
        style={{
          background: 'var(--yellow)',
          border: '2px solid var(--ink)',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.25rem',
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          ⚠️
        </div>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.9rem',
              marginBottom: '0.35rem',
            }}
          >
            Backend Integration Required
          </p>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
            This admin dashboard is frontend-ready. All CRUD operations require Supabase backend integration to persist data. Contact the development team to complete the setup.
          </p>
        </div>
      </div>
    </div>
  );
}

