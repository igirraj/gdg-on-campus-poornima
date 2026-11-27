import { useState } from 'react';
import { Globe, MessageCircle, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { socialLinks } from '../data/social';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Your name is required.';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!data.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.subject.trim()) {
    errors.subject = 'Subject is required.';
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required.';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return errors;
}

const channels = [
  {
    label: 'Instagram',
    handle: '@gdg.poornima',
    href: socialLinks.instagram,
    icon: MessageSquare,
    bg: 'var(--yellow)',
    description: 'Announcements & community moments',
  },
  {
    label: 'LinkedIn',
    handle: 'gdg-poornima',
    href: socialLinks.linkedin,
    icon: Globe,
    bg: 'var(--blue)',
    fg: '#FFFFFF',
    description: 'Professional updates & recaps',
  },
  {
    label: 'WhatsApp',
    handle: 'Community group',
    href: socialLinks.whatsapp,
    icon: MessageCircle,
    bg: 'var(--mint)',
    description: 'The active student chat',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstError = Object.keys(validationErrors)[0];
      document.getElementById(`field-${firstError}`)?.focus();
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  /* ------------------------------------------------------------
     Success state
     ------------------------------------------------------------ */
  if (submitted) {
    return (
      <div
        className="grid-on-white"
        style={{
          padding: '6rem 0',
          textAlign: 'center',
          minHeight: '60vh',
          borderBottom: '3px solid var(--ink)',
        }}
      >
        <div className="section-container">
          <span
            className="empty-icon"
            style={{ width: '5rem', height: '5rem', background: 'var(--mint)' }}
            aria-hidden="true"
          >
            <CheckCircle2 size={36} />
          </span>
          <h1 style={{ marginBottom: '1rem' }}>Message received!</h1>
          <p style={{ fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
            Thanks for reaching out, <strong style={{ color: 'var(--ink)' }}>{formData.name}</strong>.
          </p>

          <div
            className="neo-card-yellow"
            style={{
              background: 'var(--yellow)',
              border: '3px solid var(--ink)',
              boxShadow: '6px 6px 0 var(--ink)',
              padding: '1.35rem',
              maxWidth: '500px',
              margin: '0 auto 2rem',
              textAlign: 'left',
            }}
          >
            <p style={{ fontSize: '0.9rem', color: 'var(--ink)' }}>
              <strong>Note:</strong> this form is a demo — no backend is connected, so nothing is
              sent or stored. For the fastest reply, reach out through a channel below.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageCircle size={16} /> WhatsApp Community
            </a>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
              }}
              className="btn btn-secondary"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------
     Page
     ------------------------------------------------------------ */
  return (
    <>
      <section className="page-header">
        <div className="section-container">
          <div className="section-label">Get in Touch</div>
          <h1 className="page-title">
            Let’s <span className="hl">connect</span>
          </h1>
          <p className="page-lede">
            Question about an event, want to collaborate, or just curious about getting involved?
            Fill out the form or reach us through any community channel.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <div
            className="contact-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 360px',
              gap: '3.5rem',
              alignItems: 'start',
            }}
          >
            {/* Form */}
            <div>
              <h2 style={{ fontSize: '1.35rem', marginBottom: '1.5rem' }}>Send a message</h2>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  background: 'var(--yellow-soft)',
                  border: '2px solid var(--ink)',
                  boxShadow: '4px 4px 0 var(--ink)',
                  padding: '1rem 1.15rem',
                  marginBottom: '2rem',
                }}
                role="note"
                aria-label="Form demo notice"
              >
                <AlertCircle size={17} style={{ flexShrink: 0, marginTop: '0.15rem' }} aria-hidden="true" />
                <p style={{ fontSize: '0.86rem', color: 'var(--ink)' }}>
                  <strong>Demo form:</strong> no backend is connected, so nothing is sent or stored.
                  For the fastest response, use our community channels.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                  <div>
                    <label htmlFor="field-name" className="neo-label">
                      Full Name <span aria-label="required" style={{ color: 'var(--red)' }}>*</span>
                    </label>
                    <input
                      id="field-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`neo-input ${errors.name ? 'error' : ''}`}
                      placeholder="Your full name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'error-name' : undefined}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p id="error-name" role="alert" className="form-error">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="field-email" className="neo-label">
                      Email Address <span aria-label="required" style={{ color: 'var(--red)' }}>*</span>
                    </label>
                    <input
                      id="field-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`neo-input ${errors.email ? 'error' : ''}`}
                      placeholder="you@example.com"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p id="error-email" role="alert" className="form-error">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="field-subject" className="neo-label">
                      Subject <span aria-label="required" style={{ color: 'var(--red)' }}>*</span>
                    </label>
                    <select
                      id="field-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`neo-input ${errors.subject ? 'error' : ''}`}
                      aria-required="true"
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? 'error-subject' : undefined}
                    >
                      <option value="">Select a topic...</option>
                      <option value="Event Inquiry">Event Inquiry</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Getting Involved">Getting Involved</option>
                      <option value="Technical Question">Technical Question</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && (
                      <p id="error-subject" role="alert" className="form-error">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="field-message" className="neo-label">
                      Message <span aria-label="required" style={{ color: 'var(--red)' }}>*</span>
                    </label>
                    <textarea
                      id="field-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`neo-input ${errors.message ? 'error' : ''}`}
                      placeholder="Tell us what's on your mind..."
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'error-message' : undefined}
                      style={{ resize: 'vertical', fontFamily: 'var(--font-body)' }}
                    />
                    {errors.message && (
                      <p id="error-message" role="alert" className="form-error">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    id="submit-contact-form"
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting}
                    style={{ alignSelf: 'flex-start' }}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message →'}
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <aside>
              <h2 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>Community channels</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                The fastest way to reach us — join a channel and hear about events before anyone
                else. Tag your posts with{' '}
                <span style={{ color: 'var(--blue)', fontWeight: 700 }}>#GDGOnCampus</span>.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {channels.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                    }}
                    aria-label={`Join ${channel.label} — ${channel.description}`}
                  >
                    <span
                      style={{
                        width: '2.75rem',
                        height: '2.75rem',
                        background: channel.bg,
                        color: channel.fg || 'var(--ink)',
                        border: '2px solid var(--ink)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      <channel.icon size={16} />
                    </span>
                    <span style={{ minWidth: 0 }}>
                      <span
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 700,
                          fontSize: '0.92rem',
                        }}
                      >
                        {channel.label}
                      </span>
                      <span
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: 'var(--gray-500)',
                          marginTop: '0.15rem',
                        }}
                      >
                        {channel.description}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
