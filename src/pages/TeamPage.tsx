import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Globe, Copy, CheckCheck, Users, ChevronDown } from 'lucide-react';
import { getCurrentTeam, getPreviousTeamsByChapter, getTeamByCategory, teamCategories, previousChapters } from '../data/team';
import type { TeamMember } from '../data/team';
import { socialLinks } from '../data/social';

/* ---------------------------------------------------------------
   Copyable community card
   --------------------------------------------------------------- */
function CommunityCard() {
  const [copied, setCopied] = useState(false);
  const cardText = `I'm part of the GDG on Campus Poornima University builder community! 🚀\nJoin us: ${socialLinks.community}\n#GDGOnCampus`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cardText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div
      className="neo-card-yellow"
      style={{
        padding: '1.85rem',
        border: '3px solid var(--ink)',
        boxShadow: '8px 8px 0 var(--ink)',
        maxWidth: '380px',
        background: 'var(--yellow)',
      }}
      aria-label="Community member card"
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: '0.85rem',
        }}
      >
        Builder card · copy &amp; share
      </div>
      <div
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: '1.1rem',
          lineHeight: 1.35,
          marginBottom: '0.75rem',
        }}
      >
        I’m part of the GDG on Campus Poornima University builder community! 🚀
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: 'var(--gray-700)',
          marginBottom: '1.35rem',
          wordBreak: 'break-all',
        }}
      >
        {socialLinks.community}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          fontWeight: 700,
          color: 'var(--blue)',
          marginTop: '-1rem',
          marginBottom: '1.35rem',
        }}
      >
        #GDGOnCampus
      </div>
      <button
        id="copy-card-btn"
        onClick={handleCopy}
        className="btn btn-ink btn-sm"
        aria-label="Copy builder card text to clipboard"
      >
        {copied ? (
          <>
            <CheckCheck size={14} /> Copied!
          </>
        ) : (
          <>
            <Copy size={14} /> Copy Card
          </>
        )}
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------
   Chapter dropdown — choose which previous chapter to view
   --------------------------------------------------------------- */
function ChapterDropdown({
  chapters,
  value,
  onChange,
}: {
  chapters: { chapter: { id: string; label: string }; members: TeamMember[] }[];
  value: string;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const selected = chapters.find((c) => c.chapter.id === value) ?? chapters[0];

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  if (!selected) return null;

  return (
    <div ref={wrapRef} style={{ position: 'relative', display: 'inline-block', marginBottom: '1.75rem' }}>
      <style>{`
        .chapter-select-btn:hover { background: var(--yellow-soft); }
        .chapter-option:hover { background: var(--yellow-soft); }
        .chapter-option:focus-visible { outline: 2px solid var(--blue); outline-offset: -2px; }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--gray-500)',
          }}
        >
          Viewing
        </span>
        <button
          type="button"
          className="filter-pill filter-pill-active chapter-select-btn"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label="Choose which chapter to view"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem' }}
        >
          {selected.chapter.label}
          <ChevronDown
            size={15}
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.18s ease',
            }}
          />
        </button>
      </div>

      {open && (
        <div
          role="listbox"
          aria-label="Chapters"
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.55rem)',
            left: 0,
            zIndex: 40,
            minWidth: '280px',
            maxWidth: 'calc(100vw - 3rem)',
            background: 'var(--white)',
            border: '2px solid var(--ink)',
            boxShadow: '6px 6px 0 var(--ink)',
            padding: '0.4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          {chapters.map(({ chapter, members }) => {
            const isActive = chapter.id === selected.chapter.id;
            return (
              <button
                key={chapter.id}
                type="button"
                role="option"
                aria-selected={isActive}
                className="chapter-option"
                onClick={() => {
                  onChange(chapter.id);
                  setOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  width: '100%',
                  padding: '0.65rem 0.8rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  border: isActive ? '2px solid var(--ink)' : '2px solid transparent',
                  background: isActive ? 'var(--yellow)' : 'transparent',
                  color: 'var(--ink)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}
              >
                <span>{chapter.label}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.66rem',
                    fontWeight: 400,
                    color: 'var(--gray-500)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {members.length} member{members.length !== 1 ? 's' : ''}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   Category chip styles — one accent per category
   --------------------------------------------------------------- */
const categoryStyles: Record<string, { bg: string; fg: string }> = {
  Organiser: { bg: 'var(--blue)', fg: '#FFFFFF' },
  'Technical Lead': { bg: 'var(--coral)', fg: 'var(--ink)' },
  'Media Lead': { bg: 'var(--yellow)', fg: 'var(--ink)' },
  'Community Coordinator': { bg: 'var(--mint)', fg: 'var(--ink)' },
  'Production Lead': { bg: 'var(--yellow)', fg: 'var(--ink)' },
  'Operations Lead': { bg: 'var(--gray-100)', fg: 'var(--ink)' },
  'Training Lead': { bg: 'var(--mint)', fg: 'var(--ink)' },
  'Marketing Lead': { bg: 'var(--coral)', fg: 'var(--ink)' },
  'Content Lead': { bg: 'var(--blue)', fg: '#FFFFFF' },
};

const defaultCategoryStyle = { bg: 'var(--gray-100)', fg: 'var(--ink)' };

/* ---------------------------------------------------------------
   Member card
   --------------------------------------------------------------- */
function TeamMemberCard({ member }: { member: TeamMember }) {
  const cat = categoryStyles[member.category] || defaultCategoryStyle;

  return (
    <article
      className="neo-card"
      style={{
        padding: '1.6rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.15rem',
        height: '100%',
      }}
      aria-label={`Team member: ${member.name}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
        {member.imageUrl ? (
          <img
            src={member.imageUrl}
            alt={`${member.name} profile photo`}
            style={{
              width: '4.25rem',
              height: '4.25rem',
              border: '2.5px solid var(--ink)',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            aria-hidden="true"
            style={{
              width: '4.25rem',
              height: '4.25rem',
              background: member.avatarColor || 'var(--blue)',
              border: '2.5px solid var(--ink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '1.3rem',
              color: '#FFFFFF',
              flexShrink: 0,
            }}
          >
            {member.initials}
          </div>
        )}

        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{member.name}</h3>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.66rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--gray-500)',
              marginBottom: '0.5rem',
            }}
          >
            {member.role}
          </div>
          <span
            className="tag"
            style={{ background: cat.bg, color: cat.fg, fontSize: '0.6rem' }}
          >
            {member.category}
          </span>
        </div>
      </div>

      {member.bio && <p style={{ fontSize: '0.9rem' }}>{member.bio}</p>}

      {member.social && Object.values(member.social).some(Boolean) && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {member.social.linkedin && (
            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary">
              LinkedIn
            </a>
          )}
          {member.social.github && (
            <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary">
              GitHub
            </a>
          )}
          {member.social.instagram && (
            <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary">
              Instagram
            </a>
          )}
        </div>
      )}

      {member.profileUrl && (
        <a
          href={member.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-sm"
          style={{ alignSelf: 'flex-start', marginTop: 'auto' }}
          aria-label={`View ${member.name}'s community profile`}
        >
          <ExternalLink size={13} /> Community Profile
        </a>
      )}
    </article>
  );
}

/* ---------------------------------------------------------------
   Page
   --------------------------------------------------------------- */
export default function TeamPage() {
  const [view, setView] = useState<'current' | 'previous'>('current');
  const [selectedChapterId, setSelectedChapterId] = useState(previousChapters[0]?.id ?? '');
  const currentMembers = getCurrentTeam();
  const groupedByCategory = getTeamByCategory(currentMembers);
  const orderedCategories = teamCategories.filter((cat) => groupedByCategory[cat]);
  const chapters = getPreviousTeamsByChapter();
  const previousCount = chapters.reduce((n, c) => n + c.members.length, 0);
  const selectedChapter =
    chapters.find((c) => c.chapter.id === selectedChapterId) ?? chapters[0];

  return (
    <>
      {/* Header */}
      <section className="page-header">
        <div className="section-container">
          <div
            className="team-header"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '3rem',
              alignItems: 'start',
            }}
          >
            <div>
              <div className="section-label">The People</div>
              <h1 className="page-title">
                Meet the <span className="hl">team</span>
              </h1>
              <p className="page-lede">
                Run by students who are passionate about building a real developer community —
                these are the people making it happen.
              </p>
            </div>
            <a
              href={socialLinks.community}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ flexShrink: 0 }}
            >
              <Globe size={15} /> Community Page
            </a>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setView('current')}
              aria-pressed={view === 'current'}
              className={`filter-pill ${view === 'current' ? 'filter-pill-active' : ''}`}
            >
              Current Team ({currentMembers.length})
            </button>
            <button
              onClick={() => setView('previous')}
              aria-pressed={view === 'previous'}
              className={`filter-pill ${view === 'previous' ? 'filter-pill-active' : ''}`}
            >
              Previous Team ({previousCount})
            </button>
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="section">
        <div className="section-container">
          {view === 'current' ? (
            currentMembers.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon" aria-hidden="true">
                  <Users size={22} />
                </span>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                  No team members yet
                </h3>
                <p style={{ fontSize: '0.92rem', maxWidth: '420px' }}>
                  Team members appear here once added through the admin panel.
                </p>
              </div>
            ) : (
              orderedCategories.map((category) => {
                const cat = categoryStyles[category] || defaultCategoryStyle;

                return (
                  <div key={category} style={{ marginBottom: '3.25rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1.5rem',
                      }}
                    >
                      <span
                        className="tag"
                        style={{ background: cat.bg, color: cat.fg, fontSize: '0.7rem', padding: '0.3rem 0.8rem' }}
                      >
                        {category}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: 'var(--gray-500)',
                        }}
                      >
                        {groupedByCategory[category].length} member
                        {groupedByCategory[category].length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="card-grid">
                      {groupedByCategory[category].map((member) => (
                        <TeamMemberCard key={member.id} member={member} />
                      ))}
                    </div>
                  </div>
                );
              })
            )
          ) : (
            /* Previous chapters — pick one from the dropdown */
            <div>
              <ChapterDropdown
                chapters={chapters}
                value={selectedChapterId}
                onChange={setSelectedChapterId}
              />
              {selectedChapter && (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <span
                      className="tag"
                      style={{
                        background: 'var(--ink)',
                        color: 'var(--white)',
                        fontSize: '0.7rem',
                        padding: '0.3rem 0.8rem',
                      }}
                    >
                      {selectedChapter.chapter.label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--gray-500)',
                      }}
                    >
                      {selectedChapter.members.length} member
                      {selectedChapter.members.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  {selectedChapter.members.length === 0 ? (
                    <div
                      style={{
                        border: '2px dashed var(--ink)',
                        padding: '1.6rem 1.5rem',
                        textAlign: 'center',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        color: 'var(--gray-500)',
                      }}
                    >
                      The roster for {selectedChapter.chapter.label} hasn’t been published yet — check back soon.
                    </div>
                  ) : (
                    <div className="card-grid">
                      {selectedChapter.members.map((member) => (
                        <TeamMemberCard key={member.id} member={member} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Share the community */}
      <section className="section grid-on-white">
        <div className="section-container">
          <div
            className="builder-card-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            <div>
              <div className="section-label">Community Card</div>
              <h2 style={{ marginBottom: '0.75rem' }}>Share the community</h2>
              <p style={{ maxWidth: '460px' }}>
                Copy the builder card to your clipboard and pass it on — LinkedIn, WhatsApp, or the
                next person you meet at Poornima.
              </p>
            </div>
            <CommunityCard />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark">
        <div className="section-container" style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--yellow)',
              marginBottom: '0.75rem',
            }}
          >
            Get Involved
          </div>
          <h2 style={{ marginBottom: '1rem' }}>Want to join the team?</h2>
          <p style={{ maxWidth: '520px', margin: '0 auto 2.25rem' }}>
            GDG on Campus is built by students, for students. If you care about technology, design,
            operations, or media — connect with us.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={socialLinks.community}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              <Globe size={16} /> Join the Community
            </a>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
            >
              Connect on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
