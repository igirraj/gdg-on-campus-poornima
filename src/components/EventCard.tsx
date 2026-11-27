import { Link } from 'react-router-dom';
import { Calendar, Tag, Bookmark, BookmarkCheck, ArrowRight } from 'lucide-react';
import type { Event } from '../data/events';

interface EventCardProps {
  event: Event;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

// One solid accent per category — black text on light, white on blue
const categoryConfig: Record<string, { bg: string; text: string }> = {
  Workshop: { bg: 'var(--blue)', text: '#FFFFFF' },
  Hackathon: { bg: 'var(--coral)', text: 'var(--ink)' },
  Orientation: { bg: 'var(--yellow)', text: 'var(--ink)' },
  'Info Session': { bg: 'var(--mint)', text: 'var(--ink)' },
};

export function EventCard({ event, isBookmarked, onToggleBookmark }: EventCardProps) {
  const cfg = categoryConfig[event.category] || { bg: 'var(--gray-100)', text: 'var(--ink)' };
  const isPast = event.status === 'past';

  return (
    <article
      className="neo-card"
      style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
      aria-label={`Event: ${event.title}`}
    >
      {/* Accent header */}
      <div
        style={{
          background: cfg.bg,
          color: cfg.text,
          padding: '0.6rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          borderBottom: '3px solid var(--ink)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          <Tag size={11} aria-hidden="true" />
          {event.category}
        </span>

        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
          <span
            className="badge"
            style={{
              background: 'transparent',
              borderColor: 'currentColor',
              color: 'inherit',
              fontSize: '0.58rem',
            }}
          >
            {isPast ? 'Past' : 'Upcoming'}
          </span>
          <button
            id={`bookmark-${event.id}`}
            onClick={() => onToggleBookmark(event.id)}
            aria-label={isBookmarked ? `Remove bookmark for ${event.title}` : `Bookmark ${event.title}`}
            aria-pressed={isBookmarked}
            style={{
              background: isBookmarked ? 'var(--yellow)' : 'transparent',
              color: isBookmarked ? 'var(--ink)' : 'inherit',
              border: '2px solid currentColor',
              padding: '0.15rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isBookmarked ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
          </button>
        </span>
      </div>

      <div
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: '0.7rem',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '1.1rem',
            lineHeight: 1.25,
          }}
        >
          {event.title}
        </h3>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.74rem',
            color: 'var(--gray-500)',
          }}
        >
          <Calendar size={13} aria-hidden="true" />
          {event.dateLabel}
        </div>

        <p
          style={{
            fontSize: '0.88rem',
            lineHeight: 1.6,
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {event.shortDescription}
        </p>

        {event.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {event.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag" style={{ fontSize: '0.6rem', padding: '0.15rem 0.45rem' }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          to={`/events/${event.slug}`}
          className="btn btn-ink btn-sm btn-block"
          style={{ marginTop: 'auto' }}
          aria-label={`View details for ${event.title}`}
        >
          View Details <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}
