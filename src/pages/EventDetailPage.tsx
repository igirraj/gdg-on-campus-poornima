import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Tag,
  MapPin,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Clock,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import { getEventBySlug, getRelatedEvents } from '../data/events';
import { useBookmarks } from '../hooks/useBookmarks';
import { EventCard } from '../components/EventCard';

const categoryTagClass: Record<string, string> = {
  Workshop: 'tag tag-blue',
  Hackathon: 'tag tag-coral',
  Orientation: 'tag tag-yellow',
  'Info Session': 'tag tag-mint',
};

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--gray-500)',
          marginBottom: '0.25rem',
        }}
      >
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.95rem' }}>
        {children}
      </div>
    </div>
  );
}

export default function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const event = slug ? getEventBySlug(slug) : undefined;
  const { isBookmarked, toggle } = useBookmarks();

  if (!event) {
    return (
      <div style={{ padding: '5rem 0', textAlign: 'center' }}>
        <div className="section-container">
          <div
            style={{
              fontSize: '5rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              color: 'var(--gray-200)',
              lineHeight: 1,
              marginBottom: '1rem',
            }}
            aria-hidden="true"
          >
            404
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Event not found</h1>
          <p style={{ marginBottom: '2rem' }}>
            This event doesn’t match anything in our records — it may have been moved.
          </p>
          <Link to="/events" className="btn btn-primary">
            <ArrowLeft size={16} /> Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const relatedEvents = getRelatedEvents(event.slug, 2);
  const isPast = event.status === 'past';
  const tagClass = categoryTagClass[event.category] || 'tag';

  return (
    <>
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <div className="section-container">
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{event.title}</li>
          </ol>
        </div>
      </nav>

      {/* Header */}
      <section className="page-header" style={{ paddingTop: '3.5rem' }}>
        <div className="section-container">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '2rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <span className={tagClass}>
                  <Tag size={10} aria-hidden="true" />
                  {event.category}
                </span>
                <span className={`badge ${isPast ? 'badge-past' : 'badge-upcoming'}`}>
                  <Clock size={10} aria-hidden="true" />
                  {isPast ? 'Past event' : 'Upcoming'}
                </span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(1.8rem, 4.2vw, 3rem)',
                  letterSpacing: '-0.035em',
                  lineHeight: 1.08,
                  marginBottom: '1.5rem',
                  maxWidth: '740px',
                }}
              >
                {event.title}
              </h1>

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <span className="meta-item">
                  <Calendar size={14} style={{ color: 'var(--blue)' }} aria-hidden="true" />
                  {event.dateLabel}
                </span>
                {event.location && (
                  <span className="meta-item">
                    <MapPin size={14} style={{ color: 'var(--coral)' }} aria-hidden="true" />
                    {event.location}
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexShrink: 0 }}>
              <button
                onClick={() => toggle(event.id)}
                aria-label={isBookmarked(event.id) ? 'Remove bookmark' : 'Bookmark this event'}
                aria-pressed={isBookmarked(event.id)}
                className="btn btn-secondary"
              >
                {isBookmarked(event.id) ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
                {isBookmarked(event.id) ? 'Saved' : 'Save Event'}
              </button>

              {event.sourceUrl && (
                <a
                  href={event.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <ExternalLink size={13} /> GDG on Campus Listing
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="section-container">
          <div
            className="detail-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 320px',
              gap: '3rem',
              alignItems: 'start',
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>About this event</h2>
              <div style={{ fontSize: '0.97rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                {event.fullDescription.split('\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: '1.1rem' }}>
                    {para}
                  </p>
                ))}
              </div>

              {event.technologies.length > 0 && (
                <div style={{ marginBottom: '2.25rem' }}>
                  <h3 className="sub-head">Technologies</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {event.technologies.map((tech) => (
                      <span key={tech} className="tag tag-blue">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {event.tags.length > 0 && (
                <div>
                  <h3 className="sub-head">Topics</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {event.tags.map((tag) => (
                      <span key={tag} className="tag tag-yellow">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside>
              <div className="neo-card" style={{ padding: '1.6rem', marginBottom: '1.4rem' }}>
                <h3 className="sub-head" style={{ marginTop: 0 }}>
                  Event details
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <DetailRow label="Date">{event.dateLabel}</DetailRow>
                  <DetailRow label="Category">{event.category}</DetailRow>
                  {event.location && <DetailRow label="Location">{event.location}</DetailRow>}
                  <DetailRow label="Status">
                    <span className={`badge ${isPast ? 'badge-past' : 'badge-upcoming'}`}>
                      {isPast ? 'Past event' : 'Upcoming'}
                    </span>
                  </DetailRow>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {!isPast && event.registrationUrl && (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-block"
                  >
                    Register Now <ArrowRight size={15} />
                  </a>
                )}
                {isPast && (
                  <Link to="/events" className="btn btn-secondary btn-block">
                    Explore More Events <ArrowRight size={15} />
                  </Link>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related */}
      {relatedEvents.length > 0 && (
        <section className="section grid-on-white">
          <div className="section-container">
            <div className="section-head">
              <div>
                <div className="section-label">More events</div>
                <h2 style={{ fontSize: '1.6rem' }}>Related events</h2>
              </div>
            </div>
            <div className="card-grid">
              {relatedEvents.map((evt) => (
                <EventCard
                  key={evt.id}
                  event={evt}
                  isBookmarked={isBookmarked(evt.id)}
                  onToggleBookmark={toggle}
                />
              ))}
            </div>
            <div style={{ marginTop: '2rem' }}>
              <Link to="/events" className="btn btn-secondary btn-sm">
                <ArrowLeft size={13} /> Back to Events
              </Link>
            </div>
          </div>
        </section>
      )}

      <style>{`
        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          color: var(--gray-700);
        }
        .sub-head {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--gray-500);
          margin-bottom: 0.85rem;
        }
      `}</style>
    </>
  );
}
