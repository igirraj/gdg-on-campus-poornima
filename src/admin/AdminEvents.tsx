import { useState } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Calendar } from 'lucide-react';
import { events } from '../data/events';

export default function AdminEvents() {
  const [notification, setNotification] = useState('');

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.75rem', marginBottom: '0.35rem' }}>
            Events Management
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Create, edit, and manage community events
          </p>
        </div>
        <button
          onClick={() => showNotification('⚠️ Backend not connected. Supabase integration is required to create events.')}
          className="btn btn-primary btn-sm"
        >
          <Plus size={14} /> Create Event
        </button>
      </div>

      {/* Events list */}
      {events.length === 0 ? (
        <div className="empty-state">
          <Calendar size={32} style={{ marginBottom: '1rem', color: 'var(--gray-500)' }} />
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>No events yet</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--gray-500)' }}>
            Click "Create Event" to add your first event.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {events.map((event) => (
            <div
              key={event.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                background: 'var(--white)',
                border: '2px solid var(--ink)',
                boxShadow: '3px 3px 0 var(--ink)',
                flexWrap: 'wrap',
              }}
            >
              {/* Color indicator */}
              <div style={{ width: '0.5rem', height: '3rem', background: event.coverColor, flexShrink: 0, border: '1px solid var(--ink)' }} />

              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem' }}>
                  {event.title}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--gray-500)', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                  <span>{event.dateLabel}</span>
                  <span
                    style={{
                      padding: '0.1rem 0.35rem',
                      background: event.status === 'upcoming' ? 'var(--blue)' : 'var(--gray-200)',
                      color: event.status === 'upcoming' ? 'var(--white)' : 'var(--gray-700)',
                      fontSize: '0.6rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {event.status}
                  </span>
                  <span>{event.category}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                {event.sourceUrl && (
                  <a
                    href={event.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View source"
                    style={{
                      background: 'var(--white)', border: '2px solid var(--ink)',
                      padding: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--ink)',
                    }}
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
                <button
                  onClick={() => showNotification('⚠️ Backend not connected. Supabase integration is required to edit events.')}
                  title="Edit"
                  style={{
                    background: 'var(--blue)', color: 'var(--white)', border: '2px solid var(--ink)',
                    padding: '0.35rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => showNotification('⚠️ Backend not connected. Supabase integration is required to delete events.')}
                  title="Delete"
                  style={{
                    background: 'var(--coral)', color: 'var(--ink)', border: '2px solid var(--ink)',
                    padding: '0.35rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {notification && <div className="neo-toast">{notification}</div>}
    </div>
  );
}

