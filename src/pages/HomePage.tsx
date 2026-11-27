import { useState, useEffect, useRef, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Code2, Users, Globe, ArrowUpRight } from 'lucide-react';
import { events } from '../data/events';
import { teamMembers } from '../data/team';
import { EventCard } from '../components/EventCard';
import { useBookmarks } from '../hooks/useBookmarks';
import { useInView } from '../hooks/useInView';
import { GDG_LOGO_DARK } from '../components/Navbar';
import { Carousel } from '../components/Carousel';

/* ---------------------------------------------------------------
   Headline verb — cycles through the brand palette
   --------------------------------------------------------------- */
const heroWords = [
  { text: 'Build', bg: 'var(--yellow)', fg: 'var(--ink)' },
  { text: 'Learn', bg: 'var(--blue)', fg: '#FFFFFF' },
  { text: 'Ship', bg: 'var(--mint)', fg: 'var(--ink)' },
  { text: 'Create', bg: 'var(--coral)', fg: 'var(--ink)' },
];

function useHeroWord() {
  const [index, setIndex] = useState(0);

  // The verb cycle is a content change, not spatial motion — it runs even
  // under prefers-reduced-motion (where the color crossfade swaps instantly).
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroWords.length), 2400);
    return () => clearInterval(id);
  }, []);

  return heroWords[index];
}

/* ---------------------------------------------------------------
   Info-card phrase — cycles through the brand palette (offset
   cadence so it never syncs up with the headline verb)
   --------------------------------------------------------------- */
const cardPhrases = [
  { text: 'Free & open to all', bg: 'var(--blue)', fg: '#FFFFFF' },
  { text: 'Beginners welcome', bg: 'var(--mint)', fg: 'var(--ink)' },
  { text: 'No fees, ever', bg: 'var(--yellow)', fg: 'var(--ink)' },
];

function useCardPhrase() {
  const [index, setIndex] = useState(0);

  // Content change, not spatial motion — runs even under reduced motion.
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % cardPhrases.length), 2900);
    return () => clearInterval(id);
  }, []);

  return cardPhrases[index];
}

/* ---------------------------------------------------------------
   Hero terminal — one clean, self-contained block
   --------------------------------------------------------------- */
const terminalLines = [
  { cmd: true, text: 'git clone gdg-poornima-community' },
  { cmd: false, text: '✓ 3 workshops, 1 hackathon cloned' },
  { cmd: true, text: 'npm run build-something-cool' },
  { cmd: false, text: '✓ shipping ideas that matter' },
  { cmd: true, text: './join --community poornima' },
  { cmd: false, text: '✓ welcome aboard 🚀' },
];

// Character offsets for the typewriter (module scope = stable refs).
const terminalStarts = terminalLines.map((_, i) =>
  terminalLines.slice(0, i).reduce((n, l) => n + l.text.length, 0)
);
const terminalTotal = terminalLines.reduce((n, l) => n + l.text.length, 0);

function Terminal() {
  const [pos, setPos] = useState(0);

  // Types the lines out one character at a time, then loops after a pause.
  // JS-driven, so it keeps running even under prefers-reduced-motion.
  useEffect(() => {
    let id: number;
    if (pos >= terminalTotal) {
      id = window.setTimeout(() => setPos(0), 2800);
    } else {
      let i = 0;
      while (i < terminalLines.length - 1 && pos >= terminalStarts[i + 1]) i++;
      const atLineStart = pos === terminalStarts[i];
      const delay =
        pos === 0 ? 700 : atLineStart && i > 0 ? 380 : terminalLines[i].cmd ? 52 : 16;
      id = window.setTimeout(() => setPos((p) => p + 1), delay);
    }
    return () => clearTimeout(id);
  }, [pos]);

  return (
    <div className="terminal hero-terminal" aria-hidden="true" style={{ position: 'relative', zIndex: 1 }}>
      <div className="terminal-bar">
        <span className="terminal-dot" style={{ background: '#EA4335' }} />
        <span className="terminal-dot" style={{ background: '#F9AB00' }} />
        <span className="terminal-dot" style={{ background: '#34A853' }} />
        <span className="terminal-title">gdg-poornima ~ zsh</span>
      </div>
      {terminalLines.map((line, i) => {
        const visible = Math.max(0, Math.min(pos - terminalStarts[i], line.text.length));
        const onLast = i === terminalLines.length - 1;
        const showCursor =
          pos >= terminalStarts[i] && (onLast || pos < terminalStarts[i] + line.text.length);
        return (
          <div key={i} className="terminal-line">
            {line.cmd ? (
              <span className="terminal-prompt">$ {line.text.slice(0, visible)}</span>
            ) : (
              <span className="terminal-output">{line.text.slice(0, visible) || '\u00A0'}</span>
            )}
            {showCursor && (
              <span className="animate-blink" style={{ color: 'var(--yellow)' }}>
                ▋
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------
   Hero
   --------------------------------------------------------------- */
function Hero() {
  const word = useHeroWord();
  const phrase = useCardPhrase();

  return (
    <section
      className="grid-on-white"
      style={{
        borderBottom: '3px solid var(--ink)',
        padding: '5rem 0 3rem',
        position: 'relative',
      }}
      aria-label="Hero"
    >
      <div className="section-container">
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) auto',
            gap: '3.5rem',
            alignItems: 'center',
          }}
        >
          <div>
            {/* Kicker */}
            <div
              className="fade-up"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                border: '2px solid var(--ink)',
                background: 'var(--paper)',
                padding: '0.32rem 0.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.66rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '2rem',
                boxShadow: '3px 3px 0 var(--ink)',
              }}
            >
              <span style={{ display: 'inline-flex', gap: '3px' }} aria-hidden="true">
                {['var(--blue)', 'var(--red)', 'var(--yellow)', 'var(--mint)'].map((c) => (
                  <span
                    key={c}
                    style={{ width: '7px', height: '7px', background: c, border: '1px solid var(--ink)' }}
                  />
                ))}
              </span>
              Jaipur, India · Est. by students
            </div>

            <img
              src={GDG_LOGO_DARK}
              alt="Google Developer Group on Campus Poornima University"
              className="fade-up"
              style={{ height: '26px', width: 'auto', marginBottom: '1.5rem', display: 'block', animationDelay: '0.05s' }}
            />

            <h1
              aria-label="Don’t just scroll. Build something."
              style={{ marginBottom: '1.5rem', letterSpacing: '-0.04em', lineHeight: 1.02 }}
            >
              <span aria-hidden="true" className="fade-up" style={{ display: 'block', animationDelay: '0.1s' }}>
                Don’t just scroll.
              </span>
              <span aria-hidden="true" className="fade-up" style={{ display: 'block', marginTop: '0.12em', animationDelay: '0.18s' }}>
                <span className="hl hl-rotate" style={{ background: word.bg, color: word.fg }}>
                  {word.text}
                </span>{' '}
                something.
                <span
                  className="star"
                  style={{ color: 'var(--blue)', fontSize: '0.55em', marginLeft: '0.2em', verticalAlign: '0.55em' }}
                >
                  ✳
                </span>
              </span>
            </h1>

            <p
              className="fade-up"
              style={{ fontSize: '1.05rem', maxWidth: '34rem', marginBottom: '2.25rem', animationDelay: '0.26s' }}
            >
              A student-run developer community at Poornima University. We learn Google tech the only
              way that sticks — <strong style={{ color: 'var(--ink)' }}>by building with it</strong>,
              together.
            </p>

            <div
              className="fade-up"
              style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', marginBottom: '2.5rem', animationDelay: '0.34s' }}
            >
              <Link to="/events" className="btn btn-ink btn-lg">
                Explore Events <ArrowRight size={16} />
              </Link>
              <a
                href="https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Join the Community <ArrowUpRight size={16} />
              </a>
            </div>

            <div
              className="fade-up"
              style={{
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap',
                paddingTop: '1.75rem',
                borderTop: '2px solid var(--ink)',
                maxWidth: '34rem',
                animationDelay: '0.42s',
              }}
            >
              {[
                { k: 'Learn', v: 'Workshops & study jams', c: 'var(--yellow)' },
                { k: 'Build', v: 'Hackathons & sprints', c: 'var(--blue)' },
                { k: 'Connect', v: 'A network that lasts', c: 'var(--mint)' },
              ].map((s) => (
                <div key={s.k}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                    }}
                  >
                    <span
                      style={{
                        width: '9px',
                        height: '9px',
                        background: s.c,
                        border: '1.5px solid var(--ink)',
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {s.k}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.66rem',
                      color: 'var(--gray-500)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginTop: '0.2rem',
                    }}
                  >
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="hero-visual" style={{ flexShrink: 0 }}>
            {/* Confetti scattered through the empty space */}
            <span className="hero-dot hero-dot-blue" aria-hidden="true" />
            <span className="hero-dot hero-dot-yellow" aria-hidden="true" />

            {/* Terminal block */}
            <div className="hero-terminal-wrap">
              <span className="hero-pill hero-pill-blue" aria-hidden="true" />
              <span className="hero-pill hero-pill-green" aria-hidden="true" />
              <Terminal />
              <span className="hero-sticker" aria-hidden="true">
                #GDGOnCampus
              </span>
            </div>

            {/* Animated info card */}
            <div className="hero-info-card">
              <span className="hero-info-strip" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <div className="hero-info-body">
                <span className="hero-info-tile" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <span className="hero-info-copy">
                  <span className="hero-info-kicker">Student-run chapter · Jaipur</span>
                  <span
                    className="hero-info-title"
                    style={{ background: phrase.bg, color: phrase.fg }}
                  >
                    {phrase.text}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical brand rail in the right margin */}
      <span className="hero-side-rail" aria-hidden="true">
        Google Developer Groups on Campus ✳ Jaipur, India
      </span>

      {/* Community stats live inside the hero */}
      <Stats />
    </section>
  );
}

/* ---------------------------------------------------------------
   Stats strip — verified community numbers
   --------------------------------------------------------------- */
const ordinal = (n: number) => `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'}`;

function CountUp({ value, format }: { value: number; format?: (n: number) => string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const rafRef = useRef(0);

  // Counts up once when scrolled into view. Like the hero's verb/card
  // cycles, this is JS-driven content motion and runs even under
  // prefers-reduced-motion (the site is intentionally lively there).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();
        const duration = 1100;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setN(Math.round(value * eased));
          if (t < 1) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  return <span ref={ref}>{format ? format(n) : n.toLocaleString('en-US')}</span>;
}

interface StatItem {
  value: number;
  label: string;
  note: string;
  color: string;
  format?: (n: number) => string;
}

function Stats() {
  const stats: StatItem[] = [
    {
      value: 2260,
      label: 'Community members',
      note: 'On the official GDG platform',
      color: 'var(--blue)',
      format: (n: number) => (n >= 2260 ? '2,260+' : n.toLocaleString('en-US')),
    },
    {
      value: 11,
      label: 'Core team members',
      note: '3 organisers lead the chapter',
      color: 'var(--red)',
    },
    {
      value: 4,
      label: 'Current chapter',
      note: 'Chapter year 2026–27',
      color: 'var(--yellow)',
      format: (n: number) => ordinal(n),
    },
    {
      value: 2,
      label: 'GDG rank',
      note: 'Among campus chapters',
      color: 'var(--mint)',
      format: (n: number) => ordinal(n),
    },
  ];

  return (
    <section className="stats-strip" aria-label="Community statistics">
      <div className="section-container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={s.label} className="stat-slot" style={{ animationDelay: `${i * 0.45}s` }}>
              <div
                className="stat-cell fade-up"
                style={{ '--stat-accent': s.color, animationDelay: `${i * 0.06}s` } as CSSProperties}
              >
                <span className="stat-value">
                  <CountUp value={s.value} format={s.format} />
                </span>
                <span className="stat-label">
                  <span className="stat-dot" aria-hidden="true" />
                  {s.label}
                </span>
                <span className="stat-caption">{s.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   Featured events
   --------------------------------------------------------------- */
function FeaturedEvents() {
  const { isBookmarked, toggle } = useBookmarks();
  const featured = events.slice(0, 3);

  return (
    <section className="section" aria-label="Featured events">
      <div className="section-container">
        <div className="section-head">
          <div>
            <div className="section-label">Events</div>
            <h2>What’s happening</h2>
            <p>Workshops, hackathons, and sessions hosted right on campus.</p>
          </div>
          <Link to="/events" className="btn btn-secondary">
            All Events <ArrowRight size={15} />
          </Link>
        </div>

        <div className="card-grid">
          {featured.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isBookmarked={isBookmarked(event.id)}
              onToggleBookmark={toggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   Programs — the single dark section
   --------------------------------------------------------------- */
function Programs() {
  const items = [
    {
      icon: <Zap size={22} />,
      title: 'Workshops & Study Jams',
      description:
        'Hands-on sessions on Gemini AI, Firebase, Flutter and more — you write the code, not just watch it.',
      accent: 'var(--yellow)',
    },
    {
      icon: <Code2 size={22} />,
      title: 'Hackathons & Sprints',
      description:
        'Time-boxed building events like the Google Solution Challenge, where ideas become working products.',
      accent: 'var(--coral)',
    },
    {
      icon: <Users size={22} />,
      title: 'Collaborative Projects',
      description:
        'Find teammates, ship side projects, and get guidance from organizers who have done it before.',
      accent: 'var(--mint)',
    },
  ];

  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`section section-dark anim-slide${inView ? ' is-inview' : ''}`}
      aria-label="Programs"
    >
      <div className="section-container">
        <div className="section-head">
          <div>
            <div className="section-label on-dark">Programs</div>
            <h2>What we run</h2>
          </div>
          <Link to="/about" className="btn btn-primary">
            Our Approach <ArrowRight size={15} />
          </Link>
        </div>

        <Carousel>
          {items.map((item, i) => (
            <div
              key={item.title}
              className="panel-dark"
              style={{ '--accent': item.accent, display: 'flex', flexDirection: 'column', gap: '0.85rem' } as CSSProperties}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    width: '2.75rem',
                    height: '2.75rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: item.accent,
                    color: 'var(--ink)',
                    border: '2px solid var(--ink)',
                  }}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
              </div>
              <h3 style={{ fontSize: '1.15rem', color: item.accent }}>{item.title}</h3>
              <p style={{ fontSize: '0.9rem' }}>{item.description}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   Team preview
   --------------------------------------------------------------- */
function TeamPreview() {
  // Devika in the centre card, flanked by the two co-organisers
  const [raghav, keshav, devika] = teamMembers;
  const preview = [raghav, devika, keshav];

  return (
    <section className="section grid-on-white" aria-label="Organizers">
      <div className="section-container">
        <div className="section-head">
          <div>
            <div className="section-label">People</div>
            <h2>Meet the organizers</h2>
            <p>The students who plan the sessions, book the rooms, and keep it all running.</p>
          </div>
          <Link to="/team" className="btn btn-secondary">
            Full Team <ArrowRight size={15} />
          </Link>
        </div>

        <div className="card-grid-sm">
          {preview.map((org) => (
            <div
              key={org.id}
              className="neo-card"
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.15rem' }}
            >
              {org.imageUrl ? (
                <img
                  src={org.imageUrl}
                  alt={org.name}
                  style={{
                    width: '3.25rem',
                    height: '3.25rem',
                    border: '2.5px solid var(--ink)',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div
                  aria-hidden="true"
                  style={{
                    width: '3.25rem',
                    height: '3.25rem',
                    background: org.avatarColor,
                    border: '2.5px solid var(--ink)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: '#FFFFFF',
                    flexShrink: 0,
                  }}
                >
                  {org.initials}
                </div>
              )}
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {org.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.64rem',
                    color: 'var(--gray-500)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginTop: '0.15rem',
                  }}
                >
                  {org.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   CTA
   --------------------------------------------------------------- */
function CTA() {
  return (
    <section
      className="section"
      style={{
        background: 'var(--yellow)',
        borderBottom: 'none',
        padding: '2.75rem 0',
      }}
      aria-label="Call to action"
    >
      <div className="section-container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: '34rem' }}>
            <div
              className="section-label"
              style={{ color: 'var(--ink)', marginBottom: '0.5rem' }}
            >
              Open to every student
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)',
                letterSpacing: '-0.02em',
                marginBottom: '0.4rem',
              }}
            >
              Your first commit starts with showing up.
            </h2>
            <p style={{ color: 'rgba(30,30,30,0.72)', fontSize: '0.92rem' }}>
              No experience required, no fees, no gatekeeping — just people who like building things.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ink"
            >
              <Globe size={15} /> Join the Community
            </a>
            <Link to="/contact" className="btn btn-secondary">
              Get in Touch <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedEvents />
      <Programs />
      <TeamPreview />
      <CTA />
    </>
  );
}
