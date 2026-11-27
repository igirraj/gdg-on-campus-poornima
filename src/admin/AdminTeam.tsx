import { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowLeftRight, Users, X, Save } from 'lucide-react';
import { teamMembers, teamCategories } from '../data/team';
import type { TeamMember, TeamCategory } from '../data/team';

interface TeamFormData {
  name: string;
  role: string;
  category: TeamCategory;
  bio: string;
  imageUrl: string;
  profileUrl: string;
  linkedin: string;
  instagram: string;
  github: string;
  isCurrent: boolean;
}

const emptyForm: TeamFormData = {
  name: '',
  role: '',
  category: 'Organiser',
  bio: '',
  imageUrl: '',
  profileUrl: '',
  linkedin: '',
  instagram: '',
  github: '',
  isCurrent: true,
};

function TeamForm({
  initial,
  onSave,
  onCancel,
  title,
}: {
  initial: TeamFormData;
  onSave: (data: TeamFormData) => void;
  onCancel: () => void;
  title: string;
}) {
  const [form, setForm] = useState<TeamFormData>(initial);

  const update = (field: keyof TeamFormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      style={{
        background: 'var(--white)',
        border: '3px solid var(--ink)',
        boxShadow: '6px 6px 0 var(--ink)',
        padding: '2rem',
        marginBottom: '2rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem' }}>{title}</h3>
        <button onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
          <X size={20} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="admin-form-grid">
        <div>
          <label className="neo-label">Full Name *</label>
          <input className="neo-input" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="John Doe" />
        </div>
        <div>
          <label className="neo-label">Role Title *</label>
          <input className="neo-input" value={form.role} onChange={(e) => update('role', e.target.value)} placeholder="GDG on Campus Organizer" />
        </div>
        <div>
          <label className="neo-label">Category *</label>
          <select className="neo-input" value={form.category} onChange={(e) => update('category', e.target.value)}>
            {teamCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="neo-label">Profile Photo URL</label>
          <input className="neo-input" value={form.imageUrl} onChange={(e) => update('imageUrl', e.target.value)} placeholder="/assets/organizers/name.jpg" />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label className="neo-label">Bio</label>
          <textarea
            className="neo-input"
            value={form.bio}
            onChange={(e) => update('bio', e.target.value)}
            rows={3}
            placeholder="Short biography..."
            style={{ resize: 'vertical', fontFamily: 'var(--font-body)' }}
          />
        </div>
        <div>
          <label className="neo-label">Community Profile URL</label>
          <input className="neo-input" value={form.profileUrl} onChange={(e) => update('profileUrl', e.target.value)} placeholder="https://..." />
        </div>
        <div>
          <label className="neo-label">LinkedIn URL</label>
          <input className="neo-input" value={form.linkedin} onChange={(e) => update('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." />
        </div>
        <div>
          <label className="neo-label">GitHub URL</label>
          <input className="neo-input" value={form.github} onChange={(e) => update('github', e.target.value)} placeholder="https://github.com/..." />
        </div>
        <div>
          <label className="neo-label">Instagram URL</label>
          <input className="neo-input" value={form.instagram} onChange={(e) => update('instagram', e.target.value)} placeholder="https://instagram.com/..." />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
        <button
          onClick={() => onSave(form)}
          className="btn btn-ink btn-sm"
          disabled={!form.name.trim() || !form.role.trim()}
          style={{ opacity: !form.name.trim() || !form.role.trim() ? 0.5 : 1 }}
        >
          <Save size={14} /> Save Member
        </button>
        <button onClick={onCancel} className="btn btn-secondary btn-sm">
          Cancel
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default function AdminTeam() {
  const [view, setView] = useState<'current' | 'previous'>('current');
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [notification, setNotification] = useState('');

  const members = teamMembers.filter((m) => (view === 'current' ? m.isCurrent : !m.isCurrent));

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleSave = (_data: TeamFormData) => {
    // Backend integration required — show notification
    showNotification('⚠️ Backend not connected. Supabase integration is required to save team member data.');
    setShowForm(false);
    setEditingMember(null);
  };

  const handleDelete = (member: TeamMember) => {
    if (confirm(`Remove ${member.name} from the team?`)) {
      showNotification('⚠️ Backend not connected. Supabase integration is required to delete team members.');
    }
  };

  const handleToggleStatus = (member: TeamMember) => {
    const action = member.isCurrent ? 'move to previous team' : 'restore to current team';
    if (confirm(`${member.name}: ${action}?`)) {
      showNotification(`⚠️ Backend not connected. Supabase integration is required to ${action}.`);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.75rem', marginBottom: '0.35rem' }}>
            Team Management
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Add, edit, and manage team members
          </p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingMember(null); }} className="btn btn-primary btn-sm">
          <Plus size={14} /> Add Member
        </button>
      </div>

      {/* Current / Previous toggle */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setView('current')}
          className="btn btn-sm"
          style={{
            background: view === 'current' ? 'var(--ink)' : 'var(--white)',
            color: view === 'current' ? 'var(--white)' : 'var(--ink)',
            border: '2px solid var(--ink)',
            boxShadow: view === 'current' ? '2px 2px 0 var(--yellow)' : 'none',
          }}
        >
          Current Team ({teamMembers.filter((m) => m.isCurrent).length})
        </button>
        <button
          onClick={() => setView('previous')}
          className="btn btn-sm"
          style={{
            background: view === 'previous' ? 'var(--ink)' : 'var(--white)',
            color: view === 'previous' ? 'var(--white)' : 'var(--ink)',
            border: '2px solid var(--ink)',
            boxShadow: view === 'previous' ? '2px 2px 0 var(--yellow)' : 'none',
          }}
        >
          Previous Team ({teamMembers.filter((m) => !m.isCurrent).length})
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <TeamForm
          initial={
            editingMember
              ? {
                  name: editingMember.name,
                  role: editingMember.role,
                  category: editingMember.category,
                  bio: editingMember.bio || '',
                  imageUrl: editingMember.imageUrl || '',
                  profileUrl: editingMember.profileUrl || '',
                  linkedin: editingMember.social?.linkedin || '',
                  instagram: editingMember.social?.instagram || '',
                  github: editingMember.social?.github || '',
                  isCurrent: editingMember.isCurrent,
                }
              : emptyForm
          }
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingMember(null); }}
          title={editingMember ? `Edit: ${editingMember.name}` : 'Add New Team Member'}
        />
      )}

      {/* Members list */}
      {members.length === 0 ? (
        <div className="empty-state">
          <Users size={32} style={{ marginBottom: '1rem', color: 'var(--gray-500)' }} />
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>
            No {view === 'previous' ? 'previous' : 'current'} team members
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--gray-500)' }}>
            {view === 'current' ? 'Click "Add Member" to add your first team member.' : 'Members moved from the current team will appear here.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {members.map((member) => (
            <div
              key={member.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                background: 'var(--white)',
                border: '2px solid var(--ink)',
                boxShadow: '3px 3px 0 var(--ink)',
              }}
            >
              {/* Avatar */}
              {member.imageUrl ? (
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  style={{ width: '3rem', height: '3rem', borderRadius: '50%', border: '2px solid var(--ink)', objectFit: 'cover', flexShrink: 0 }}
                />
              ) : (
                <div
                  style={{
                    width: '3rem', height: '3rem', borderRadius: '50%', background: member.avatarColor,
                    border: '2px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.9rem',
                    color: 'var(--white)', flexShrink: 0,
                  }}
                >
                  {member.initials}
                </div>
              )}

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem' }}>
                  {member.name}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--gray-500)' }}>
                  {member.role} · {member.category}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                <button
                  onClick={() => { setEditingMember(member); setShowForm(true); }}
                  title="Edit"
                  style={{
                    background: 'var(--blue)', color: 'var(--white)', border: '2px solid var(--ink)',
                    padding: '0.35rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleToggleStatus(member)}
                  title={member.isCurrent ? 'Move to previous team' : 'Restore to current team'}
                  style={{
                    background: 'var(--yellow)', color: 'var(--ink)', border: '2px solid var(--ink)',
                    padding: '0.35rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <ArrowLeftRight size={14} />
                </button>
                <button
                  onClick={() => handleDelete(member)}
                  title="Remove"
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

      {/* Toast notification */}
      {notification && <div className="neo-toast">{notification}</div>}
    </div>
  );
}

