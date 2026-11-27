import { type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import {
  ArrowRight,
  Globe,
  BookOpen,
  Users,
  Lightbulb,
  Target,
  Hammer,
  Trophy,
  GraduationCap,
  Mic,
  Sparkles,
  Flame,
  Smartphone,
  Layers,
  Cloud,
  Code2,
  MessageCircle,
  Camera,
} from 'lucide-react';
import { socialLinks } from '../data/social';
import { Carousel } from '../components/Carousel';

function AboutHero() {
  return (
    <section className="page-header" style={{ paddingTop: '4.5rem', paddingBottom: '3.5rem' }}>
      <div className="section-container">
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '3.5rem',
            alignItems: 'start',
          }}
        >
          <div>
            <div className="section-label">About Us</div>
            <h1 className="page-title" style={{ maxWidth: '16ch' }}>
              We learn by <span className="hl">building</span>, not by watching.
            </h1>
            <p className="page-lede" style={{ marginBottom: '2rem' }}>
              GDG on Campus Poornima University is a student-run developer community in Jaipur —
              part of Google Developer Groups on Campus. All disciplines, all skill levels,
              one rule: bring something to build.
            </p>
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <a
                href="https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ink"
              >
                <Globe size={15} /> Official Community Page
              </a>
              <Link to="/events" className="btn btn-secondary">
                Our Events <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Mission panel */}
          <div
            className="neo-card-ink"
            style={{
              padding: '2.25rem',
              border: '3px solid var(--ink)',
              boxShadow: '8px 8px 0 var(--yellow)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--yellow)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: '1.15rem',
              }}
            >
              Our Mission
            </div>
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.2rem',
                fontWeight: 600,
                lineHeight: 1.55,
                color: 'var(--white)',
              }}
            >
              An inclusive space where students of every skill level{' '}
              <span style={{ color: 'var(--yellow)' }}>learn by doing</span>, build with community,
              and turn ideas into real impact.
            </p>
            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '2px solid rgba(255,255,255,0.15)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              Google Developer Groups on Campus · Poornima University
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhoWeAre() {
  const pillars = [
    { label: 'Community', icon: <Users size={18} />, bg: 'var(--blue)', fg: '#FFFFFF' },
    { label: 'Learning', icon: <BookOpen size={18} />, bg: 'var(--yellow)', fg: 'var(--ink)' },
    { label: 'Building', icon: <Target size={18} />, bg: 'var(--coral)', fg: 'var(--ink)' },
    { label: 'Impact', icon: <Lightbulb size={18} />, bg: 'var(--mint)', fg: 'var(--ink)' },
  ];

  return (
    <section className="section" aria-label="Who we are">
      <div className="section-container">
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3.5rem',
            alignItems: 'center',
          }}
        >
          <div>
            <div className="section-label">Identity</div>
            <h2 style={{ marginBottom: '1.25rem' }}>Who we are</h2>
            <p style={{ marginBottom: '1rem' }}>
              We’re a chapter of Google Developer Groups on Campus — a Google program that supports
              student developer communities at universities worldwide.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              At Poornima University we bring together students from every discipline who share a
              passion for technology — whether they’re writing their first line of code or shipping
              their tenth app.
            </p>
            <p>
              We host workshops, info sessions, and hackathons across Google’s ecosystem: Gemini AI,
              Firebase, Android, Flutter, Google Cloud, and the web.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}
          >
            {pillars.map((item) => (
              <div
                key={item.label}
                className="neo-card"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                }}
              >
                <span
                  style={{
                    width: '2.75rem',
                    height: '2.75rem',
                    background: item.bg,
                    color: item.fg,
                    border: '2px solid var(--ink)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  const values = [
    {
      title: 'Learn by Doing',
      description:
        'The best way to master technology is to use it. Our events are hands-on — you write code, break things, and fix them.',
      accent: 'var(--yellow)',
    },
    {
      title: 'Build with Community',
      description:
        'Great software is rarely built alone. Find teammates, review each other’s work, and grow — regardless of skill level.',
      accent: 'var(--coral)',
    },
    {
      title: 'Turn Ideas into Impact',
      description:
        'Every line of code can solve a real problem. Through programs like the Google Solution Challenge, we build things that matter.',
      accent: 'var(--mint)',
    },
  ];

  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`section section-dark anim-slide${inView ? ' is-inview' : ''}`}
      aria-label="Our values"
    >
      <div className="section-container">
        <div className="section-head">
          <div>
            <div className="section-label on-dark">Our Values</div>
            <h2>What drives us</h2>
            <p>Three habits shape everything we run — from the first workshop of the semester to the final demo day.</p>
          </div>
        </div>

        <Carousel>
          {values.map((val, i) => (
            <div
              key={val.title}
              className="panel-dark"
              style={{ '--accent': val.accent, display: 'flex', flexDirection: 'column', gap: '0.85rem' } as CSSProperties}
            >
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
              <h3 style={{ fontSize: '1.2rem', color: val.accent }}>{val.title}</h3>
              <p style={{ fontSize: '0.92rem' }}>{val.description}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

function WhatWeDo() {
  const activities = [
    {
      title: 'Workshops',
      description: 'Build something real in an evening — Android, Flutter, Firebase, Gemini AI.',
      icon: <Hammer size={18} />,
      bg: 'var(--blue)',
      fg: '#FFFFFF',
    },
    {
      title: 'Hackathons',
      description: 'Weekend sprints and the Google Solution Challenge, in teams of your choosing.',
      icon: <Trophy size={18} />,
      bg: 'var(--coral)',
      fg: 'var(--ink)',
    },
    {
      title: 'Study Jams',
      description: 'Guided codelabs with mentors — finish with certs, not just notes.',
      icon: <GraduationCap size={18} />,
      bg: 'var(--yellow)',
      fg: 'var(--ink)',
    },
    {
      title: 'Tech Talks',
      description: 'Demos, deep-dives, and lessons from projects our members actually shipped.',
      icon: <Mic size={18} />,
      bg: 'var(--mint)',
      fg: 'var(--ink)',
    },
  ];

  return (
    <section className="section" aria-label="What we do">
      <div className="section-container">
        <div
          className="about-grid about-grid--flip"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3.5rem',
            alignItems: 'center',
          }}
        >
          {/* Text column — sits right on desktop (order), leads in DOM for
              screen readers and the stacked mobile layout */}
          <div style={{ order: 2 }}>
            <div className="section-label">Our Activities</div>
            <h2 style={{ marginBottom: '1.25rem' }}>What we do</h2>
            <p style={{ marginBottom: '1rem' }}>
              Through the semester we run hands-on workshops where you build something real in a
              single evening — Android, Flutter, Firebase, Gemini AI, and the web — plus guided
              study jams that walk you through Google’s technologies step by step.
            </p>
            <p style={{ marginBottom: '1.75rem' }}>
              For bigger ambitions there are weekend hackathons and the Google Solution Challenge,
              where small teams turn an idea into a working prototype. Between events, short tech
              talks and demo days let members share what they built, what broke, and how they fixed
              it.
            </p>
            <Link to="/events" className="btn btn-secondary">
              See upcoming events <ArrowRight size={15} />
            </Link>
          </div>

          {/* Boxes — left column on desktop, mirroring “Who we are” */}
          <div
            style={{
              order: 1,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}
          >
            {activities.map((item) => (
              <div
                key={item.title}
                className="neo-card"
                style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}
              >
                <span
                  style={{
                    width: '2.75rem',
                    height: '2.75rem',
                    background: item.bg,
                    color: item.fg,
                    border: '2px solid var(--ink)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                  }}
                >
                  {item.title}
                </span>
                <span style={{ fontSize: '0.86rem', lineHeight: 1.55, color: 'var(--gray-700)' }}>
                  {item.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowToJoin() {
  const steps = [
    {
      title: 'Find your level',
      description: 'Hello world or production apps — there’s a place for you here.',
    },
    {
      title: 'Attend an event',
      description: 'Show up to a workshop or orientation. No hoops, just come and start.',
    },
    {
      title: 'Join the channels',
      description: 'WhatsApp and Instagram — that’s where dates land first.',
    },
    {
      title: 'Build & contribute',
      description: 'Join a hackathon, mentor newer members, or help organize the next event.',
    },
  ];

  return (
    <section className="section grid-on-white" aria-label="How to get involved">
      <div className="section-container">
        <div className="section-head">
          <div>
            <div className="section-label">Getting Started</div>
            <h2>How to get involved</h2>
          </div>
          <a
            href="https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Join the Community <Globe size={15} />
          </a>
        </div>

        <div className="card-grid card-grid-4">
          {steps.map((s, i) => (
            <div key={s.title} className="neo-card" style={{ padding: '1.75rem', position: 'relative' }}>
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  background: ['var(--yellow)', 'var(--blue)', 'var(--coral)', 'var(--mint)'][i],
                  color: i === 1 ? '#FFFFFF' : 'var(--ink)',
                  border: '2px solid var(--ink)',
                  boxShadow: '3px 3px 0 var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  marginBottom: '1.15rem',
                }}
                aria-hidden="true"
              >
                {i + 1}
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{s.title}</h3>
              <p style={{ fontSize: '0.9rem' }}>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeCover() {
  const techs = [
    {
      name: 'Gemini AI',
      blurb: 'Prompts to agents — build with Google’s models.',
      icon: <Sparkles size={18} />,
      bg: 'var(--blue)',
      fg: '#FFFFFF',
    },
    {
      name: 'Firebase',
      blurb: 'Auth, data, and hosting — a working app in one evening.',
      icon: <Flame size={18} />,
      bg: 'var(--yellow)',
      fg: 'var(--ink)',
    },
    {
      name: 'Android',
      blurb: 'Native apps for the platform in every pocket.',
      icon: <Smartphone size={18} />,
      bg: 'var(--mint)',
      fg: 'var(--ink)',
    },
    {
      name: 'Flutter',
      blurb: 'One codebase, beautiful apps on every screen.',
      icon: <Layers size={18} />,
      bg: 'var(--coral)',
      fg: 'var(--ink)',
    },
    {
      name: 'Google Cloud',
      blurb: 'Deploy, scale, and automate on GCP.',
      icon: <Cloud size={18} />,
      bg: 'var(--blue)',
      fg: '#FFFFFF',
    },
    {
      name: 'The Web',
      blurb: 'Modern HTML, JS, and performance that scores.',
      icon: <Code2 size={18} />,
      bg: 'var(--yellow)',
      fg: 'var(--ink)',
    },
  ];

  return (
    <section className="section" aria-label="What we cover">
      <div className="section-container">
        <div className="section-head">
          <div>
            <div className="section-label">Technology</div>
            <h2>What we cover</h2>
            <p>Google’s ecosystem — taught hands-on, one build at a time.</p>
          </div>
        </div>

        <div className="card-grid">
          {techs.map((t) => (
            <div
              key={t.name}
              className="neo-card"
              style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}
            >
              <span
                style={{
                  width: '2.75rem',
                  height: '2.75rem',
                  background: t.bg,
                  color: t.fg,
                  border: '2px solid var(--ink)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-hidden="true"
              >
                {t.icon}
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem' }}>
                {t.name}
              </span>
              <span style={{ fontSize: '0.86rem', lineHeight: 1.55, color: 'var(--gray-700)' }}>{t.blurb}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: 'Who can join?',
      a: 'Any student at Poornima University — every branch, every year. If you’re curious about technology, you belong here.',
    },
    {
      q: 'I’ve never coded. Is this for me?',
      a: 'Yes. Sessions start from hello world and go up from there — nobody is expected to know everything on day one.',
    },
    {
      q: 'Does it cost anything?',
      a: 'No. Every workshop, study jam, and hackathon is free for members.',
    },
    {
      q: 'When and where do you meet?',
      a: 'On campus through the semester — rooms and timings are announced before every event on WhatsApp.',
    },
    {
      q: 'How do I hear about events first?',
      a: 'Join the WhatsApp group and follow @gdg.poornima on Instagram — dates land there first.',
    },
    {
      q: 'Can I help run things or give a talk?',
      a: 'Please do. Pitch a session, mentor a study jam, or join the core team — talk to any organizer or ping us on the channels.',
    },
  ];

  return (
    <section className="section" aria-label="Frequently asked questions">
      <div className="section-container">
        <div className="section-head">
          <div>
            <div className="section-label">FAQ</div>
            <h2>Questions, answered</h2>
            <p>The things everyone asks in the group chat first.</p>
          </div>
        </div>

        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>
                {f.q}
                <span className="faq-toggle" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinCTA() {
  const channels = [
    { label: 'WhatsApp', href: socialLinks.whatsapp, icon: <MessageCircle size={15} /> },
    { label: 'Instagram', href: socialLinks.instagram, icon: <Camera size={15} /> },
  ];

  return (
    <section
      className="section"
      style={{ background: 'var(--yellow)', borderBottom: 'none', padding: '3rem 0' }}
      aria-label="Join us"
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
          <div style={{ maxWidth: '36rem' }}>
            <div className="section-label" style={{ color: 'var(--ink)', marginBottom: '0.5rem' }}>
              Join the community
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)',
                letterSpacing: '-0.02em',
                marginBottom: '0.4rem',
              }}
            >
              Bring a laptop. Leave with something shipped.
            </h2>
            <p style={{ color: 'rgba(30,30,30,0.72)', fontSize: '0.92rem' }}>
              Free and open to every student — no experience needed. Say hi in the group chat and
              come build with us. <strong style={{ color: 'var(--ink)' }}>#GDGOnCampus</strong>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href={socialLinks.community}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ink"
            >
              <Globe size={15} /> Join the Community
            </a>
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                {c.icon} {c.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <WhatWeCover />
      <Values />
      <WhatWeDo />
      <HowToJoin />
      <FAQ />
      <JoinCTA />
    </>
  );
}
