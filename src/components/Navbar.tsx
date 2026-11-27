import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/team', label: 'Team' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

// Official GDG logo from the GDG community CDN
const GDG_LOGO_DARK =
  'https://res.cloudinary.com/startup-grind/image/upload/dpr_2.0,fl_sanitize/v1/gcs/platform-data-goog/contentbuilder/GDG-Lockup-1Line-Black_vMWBFT9.svg';

export { GDG_LOGO_DARK };

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="section-container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '3.9rem',
            gap: '1rem',
          }}
        >
          {/* Brand */}
          <Link
            to="/"
            aria-label="GDG on Campus Poornima University — Home"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.2rem',
              flexShrink: 0,
            }}
          >
            <img
              src={GDG_LOGO_DARK}
              alt="Google Developer Group on Campus Poornima University"
              style={{ height: '24px', width: 'auto', display: 'block' }}
              loading="eager"
            />
            <span
              className="chapter-label"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                paddingLeft: '54.2px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.56rem',
                  color: 'var(--gray-500)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  lineHeight: 1.2,
                  display: 'block',
                }}
              >
                on Campus
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  color: 'var(--ink)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  display: 'block',
                }}
              >
                Poornima University
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul
            role="list"
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.15rem',
              listStyle: 'none',
            }}
          >
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li style={{ marginLeft: '0.6rem' }}>
              <a
                href="https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-join"
              >
                Join Community <ArrowUpRight size={13} />
              </a>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="mobile-menu-btn"
            style={{
              background: 'transparent',
              color: 'var(--gdg-gray)',
              border: 'none',
              padding: '0.45rem',
              cursor: 'pointer',
              boxShadow: 'none',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            role="menu"
            style={{
              borderTop: '1px solid rgba(30, 30, 30, 0.12)',
              background: 'var(--white)',
              padding: '0.75rem 0 1.25rem',
            }}
          >
            <ul
              role="list"
              style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}
            >
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    role="menuitem"
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                    style={{ padding: '0.65rem 0.85rem', fontSize: '0.88rem' }}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '0.85rem' }}>
              <a
                href="https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-join"
                style={{ width: '100%' }}
              >
                Join the Community <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
