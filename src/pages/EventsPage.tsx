import { useState, useMemo } from 'react';
import { Search, X, ExternalLink, Bookmark, Filter } from 'lucide-react';
import { events } from '../data/events';
import { EventCard } from '../components/EventCard';
import { useBookmarks } from '../hooks/useBookmarks';

const categories = ['All', 'Workshop', 'Hackathon', 'Orientation', 'Info Session'];
const statusOptions = ['All', 'Past', 'Upcoming'];

function GroupHeading({ label, tone }: { label: string; tone: 'upcoming' | 'past' }) {
  return (
    <h2
      style={{
        fontSize: '1.15rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
      }}
    >
      <span
        className="tag"
        style={{
          background: tone === 'upcoming' ? 'var(--yellow)' : 'var(--gray-100)',
          fontSize: '0.62rem',
        }}
      >
        {label}
      </span>
      Events
    </h2>
  );
}

export default function EventsPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showBookmarked, setShowBookmarked] = useState(false);
  const { isBookmarked, toggle, bookmarked } = useBookmarks();

  const filtered = useMemo(() => {
    return events.filter((event) => {
      const matchQuery =
        query === '' ||
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
        event.category.toLowerCase().includes(query.toLowerCase());

      const matchCategory =
        selectedCategory === 'All' || event.category === selectedCategory;

      const matchStatus =
        selectedStatus === 'All' ||
        (selectedStatus === 'Past' && event.status === 'past') ||
        (selectedStatus === 'Upcoming' && event.status === 'upcoming');

      const matchBookmark = !showBookmarked || isBookmarked(event.id);

      return matchQuery && matchCategory && matchStatus && matchBookmark;
    });
  }, [query, selectedCategory, selectedStatus, showBookmarked, bookmarked]);

  const hasFilters =
    query !== '' ||
    selectedCategory !== 'All' ||
    selectedStatus !== 'All' ||
    showBookmarked;

  const resetFilters = () => {
    setQuery('');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setShowBookmarked(false);
  };

  const upcomingFiltered = filtered.filter((e) => e.status === 'upcoming');
  const pastFiltered = filtered.filter((e) => e.status === 'past');

  return (
    <>
      {/* Header + filters */}
      <section className="page-header">
        <div className="section-container">
          <div className="section-label">Events</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <div>
              <h1 className="page-title">
                Community <span className="hl">events</span>
              </h1>
              <p className="page-lede">
                Workshops, hackathons, and sessions hosted at Poornima University. Browse what’s
                already happened — and what’s coming next.
              </p>
            </div>
            <a
              href="https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ flexShrink: 0 }}
            >
              Official Listing <ExternalLink size={14} />
            </a>
          </div>

          {/* Filters */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              alignItems: 'center',
              paddingTop: '1.5rem',
              borderTop: '2px solid var(--ink)',
            }}
          >
            <div style={{ position: 'relative', minWidth: '220px', maxWidth: '320px', flex: '1' }}>
              <Search
                size={15}
                style={{
                  position: 'absolute',
                  left: '0.9rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--gray-500)',
                  pointerEvents: 'none',
                }}
                aria-hidden="true"
              />
              <input
                id="event-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events..."
                className="neo-input"
                style={{ paddingLeft: '2.4rem', height: '2.75rem' }}
                aria-label="Search events by title or tag"
              />
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="filter-legend">
                <Filter size={11} aria-hidden="true" /> Type
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={selectedCategory === cat}
                  className={`filter-pill ${selectedCategory === cat ? 'filter-pill-active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="filter-legend">Status</span>
              {statusOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedStatus(s)}
                  aria-pressed={selectedStatus === s}
                  className={`filter-pill ${selectedStatus === s ? 'filter-pill-active' : ''}`}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowBookmarked(!showBookmarked)}
              aria-pressed={showBookmarked}
              className={`filter-pill ${showBookmarked ? 'filter-pill-active' : ''}`}
              style={{ marginLeft: 'auto' }}
            >
              <Bookmark size={12} />
              Saved ({bookmarked.length})
            </button>

            {hasFilters && (
              <button onClick={resetFilters} className="btn btn-sm btn-ghost">
                <X size={12} /> Reset
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section">
        <div className="section-container">
          {(selectedStatus === 'All' || selectedStatus === 'Upcoming') && (
            <div style={{ marginBottom: '3rem' }}>
              <GroupHeading label="Upcoming" tone="upcoming" />
              {upcomingFiltered.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon" aria-hidden="true">
                    <Bookmark size={22} />
                  </span>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1.15rem' }}>
                    Nothing on the calendar yet
                  </h3>
                  <p style={{ fontSize: '0.92rem', maxWidth: '420px' }}>
                    Follow us on{' '}
                    <a
                      href="https://instagram.com/gdg.poornima"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--blue)', fontWeight: 600 }}
                    >
                      Instagram
                    </a>{' '}
                    to hear about events first.
                  </p>
                </div>
              ) : (
                <div className="card-grid">
                  {upcomingFiltered.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isBookmarked={isBookmarked(event.id)}
                      onToggleBookmark={toggle}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {(selectedStatus === 'All' || selectedStatus === 'Past') && (
            <div>
              <GroupHeading label="Past" tone="past" />
              {pastFiltered.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon" aria-hidden="true">
                    <Search size={22} />
                  </span>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1.15rem' }}>
                    No events match your filters
                  </h3>
                  <p style={{ fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                    Try adjusting your search or clearing the filters.
                  </p>
                  {hasFilters && (
                    <button onClick={resetFilters} className="btn btn-primary btn-sm">
                      <X size={13} /> Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="card-grid">
                  {pastFiltered.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isBookmarked={isBookmarked(event.id)}
                      onToggleBookmark={toggle}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">
                <X size={22} />
              </span>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.15rem' }}>No events found</h3>
              <p style={{ fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                Nothing matches your current search and filters.
              </p>
              <button onClick={resetFilters} className="btn btn-primary">
                <X size={14} /> Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .filter-legend {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-mono);
          font-size: 0.66rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--gray-500);
          margin-right: 0.15rem;
        }
      `}</style>
    </>
  );
}
