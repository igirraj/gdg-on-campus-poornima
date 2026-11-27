import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';

interface CommandItem {
  label: string;
  description: string;
  to: string;
  shortcut?: string;
}

const commands: CommandItem[] = [
  { label: 'Go to Home', description: 'Back to the homepage', to: '/', shortcut: 'H' },
  { label: 'About the Community', description: 'Learn who we are', to: '/about', shortcut: 'A' },
  { label: 'Browse Events', description: 'Discover our workshops and hackathons', to: '/events', shortcut: 'E' },
  { label: 'Meet the Team', description: 'Our community organizers', to: '/team', shortcut: 'T' },
  { label: 'Community Gallery', description: 'Photos and memories from our events', to: '/gallery', shortcut: 'G' },
  { label: 'Community Blog', description: 'Articles and insights from the community', to: '/blog', shortcut: 'B' },
  { label: 'Contact Us', description: 'Get in touch with the community', to: '/contact', shortcut: 'C' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase())
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setSelected(0);
  }, []);

  const goTo = useCallback(
    (to: string) => {
      navigate(to);
      close();
    },
    [navigate, close]
  );

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === 'Enter' && filtered[selected]) {
        goTo(filtered[selected].to);
      }
    };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [open, filtered, selected, goTo]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      onClick={close}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        background: 'rgba(23,23,23,0.7)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '10vh',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          margin: '0 1rem',
          background: 'var(--white)',
          border: '2.5px solid var(--ink)',
          boxShadow: '6px 6px 0 var(--ink)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.85rem 1.25rem',
            borderBottom: '1.5px solid var(--gray-200)',
            background: 'var(--white)',
          }}
        >
          <Search size={18} style={{ color: 'var(--blue)' }} />
          <input
            autoFocus
            type="text"
            placeholder="Type a page or command to navigate..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.95rem',
              color: 'var(--ink)',
              outline: 'none',
            }}
            aria-label="Command search"
          />
          <button
            onClick={close}
            aria-label="Close command palette"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: 'var(--gray-500)' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div role="listbox" aria-label="Navigation options">
          {filtered.length === 0 ? (
            <div
              style={{
                padding: '2rem',
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--gray-500)',
              }}
            >
              No pages found for "{query}"
            </div>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.to}
                role="option"
                aria-selected={i === selected}
                onClick={() => goTo(cmd.to)}
                onMouseEnter={() => setSelected(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0.875rem 1rem',
                  background: i === selected ? 'var(--ink)' : 'transparent',
                  color: i === selected ? 'var(--white)' : 'var(--ink)',
                  border: 'none',
                  borderBottom: '1px solid var(--gray-200)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.1s ease',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                    }}
                  >
                    {cmd.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.78rem',
                      color: i === selected ? '#ccc' : 'var(--gray-500)',
                    }}
                  >
                    {cmd.description}
                  </div>
                </div>
                <ArrowRight size={16} style={{ flexShrink: 0 }} />
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            padding: '0.6rem 1rem',
            borderTop: '2px solid var(--ink)',
            background: 'var(--gray-100)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--gray-500)',
          }}
        >
          <span>↑↓ navigate</span>
          <span>↵ go</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
