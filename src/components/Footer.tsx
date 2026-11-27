import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Globe, MessageSquare, ArrowUpRight, Shield } from 'lucide-react';
import { socialLinks } from '../data/social';

const GDG_LOGO_LIGHT =
  'https://res.cloudinary.com/startup-grind/image/upload/dpr_2.0,fl_sanitize/v1/gcs/platform-data-goog/contentbuilder/GDG-Lockup-1Line-White_YJOeW4C.png';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/team', label: 'Team' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const socials = [
  { label: 'Instagram', href: socialLinks.instagram, icon: MessageSquare },
  { label: 'LinkedIn', href: socialLinks.linkedin, icon: Globe },
  { label: 'WhatsApp', href: socialLinks.whatsapp, icon: MessageCircle },
];

const linkStyle: CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  color: 'rgba(255,255,255,0.72)',
  transition: 'color 0.13s ease',
};

export function Footer() {
  return (
    <footer className="section-dark" role="contentinfo" style={{ borderTop: 'none' }}>
      {/* Google 4-color stripe — the one brand flourish we keep */}
      <div style={{ height: '4px', display: 'flex' }} aria-hidden="true">
        {['#4285F4', '#EA4335', '#F9AB00', '#34A853'].map((c) => (
          <div key={c} style={{ flex: 1, background: c }} />
        ))}
      </div>

      <div className="section-container" style={{ paddingTop: '3.5rem', paddingBottom: '2rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {/* Brand */}
          <div>
            <img
              src={GDG_LOGO_LIGHT}
              alt="Google Developer Group on Campus Poornima University"
              style={{ height: '24px', width: 'auto', marginBottom: '0.85rem', display: 'block' }}
              loading="lazy"
            />
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.95rem',
                color: 'var(--white)',
                marginBottom: '0.75rem',
              }}
            >
              on Campus · Poornima University
            </div>
            <p style={{ fontSize: '0.88rem', maxWidth: '300px', color: 'rgba(255,255,255,0.62)' }}>
              A student-run developer community in Jaipur, part of Google Developer Groups on Campus.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '1.25rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: 'var(--yellow)',
                border: '2px solid rgba(255,255,255,0.2)',
                padding: '0.3rem 0.65rem',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  background: 'var(--mint)',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              #GDGOnCampus
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="footer-heading">Pages</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} style={linkStyle} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="footer-heading">Community</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              <li>
                <a
                  href={socialLinks.community}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                  className="footer-link"
                >
                  GDG on Campus Community Page <ArrowUpRight size={12} />
                </a>
              </li>
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                    className="footer-link"
                  >
                    <s.icon size={14} /> {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h3 className="footer-heading">Developer</h3>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.62)', marginBottom: '1rem' }}>
              Press <kbd style={{ background: '#262626', borderColor: '#444', color: '#eee' }}>Ctrl</kbd>{' '}
              <kbd style={{ background: '#262626', borderColor: '#444', color: '#eee' }}>K</kbd> anywhere
              to open the command palette.
            </p>
            <Link
              to="/admin/login"
              className="footer-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              <Shield size={12} /> Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '2px solid rgba(255,255,255,0.14)' }}>
        <div
          className="section-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.1rem 1.5rem',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>
            © {new Date().getFullYear()} GDG on Campus Poornima University
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>
            Built by the community · Not an official Google product
          </p>
        </div>
      </div>

      <style>{`
        .footer-heading {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--yellow);
          margin-bottom: 1rem;
        }
        .footer-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }
        .footer-link:hover { color: var(--yellow) !important; }
      `}</style>
    </footer>
  );
}
