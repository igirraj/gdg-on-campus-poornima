export type TeamCategory =
  | 'Organiser'
  | 'Technical Lead'
  | 'Media Lead'
  | 'Community Coordinator'
  | 'Production Lead'
  | 'Operations Lead'
  | 'Training Lead'
  | 'Marketing Lead'
  | 'Content Lead';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: TeamCategory;
  bio?: string;
  profileUrl?: string;
  imageUrl?: string;
  initials: string;
  avatarColor: string;
  social?: {
    linkedin?: string;
    instagram?: string;
    github?: string;
    twitter?: string;
  };
  isCurrent: boolean;
  /** Previous-team only: the chapter this member belonged to (e.g. '2025-26') */
  chapter?: string;
}

export const teamCategories: TeamCategory[] = [
  'Organiser',
  'Technical Lead',
  'Media Lead',
  'Community Coordinator',
  'Production Lead',
  'Operations Lead',
  'Training Lead',
  'Marketing Lead',
  'Content Lead',
];

// Verified organizer data from: https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/
export const teamMembers: TeamMember[] = [
  {
    id: 'raghav-arora',
    name: 'Raghav Arora',
    role: 'GDG on Campus Organizer',
    category: 'Organiser',
    bio: 'Leading the GDG on Campus chapter at Poornima University, passionate about building a thriving developer community where students can learn, build, and grow together.',
    profileUrl: 'https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/',
    imageUrl: '/assets/organizers/raghav-arora.jpg',
    initials: 'RA',
    avatarColor: '#4285F4',
    isCurrent: true,
  },
  {
    id: 'keshav-verma',
    name: 'Keshav Verma',
    role: 'GDG on Campus Organizer',
    category: 'Organiser',
    bio: 'Co-organizer at GDG on Campus Poornima University, focused on delivering impactful workshops, hackathons, and learning experiences for students.',
    profileUrl: 'https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/',
    imageUrl: '/assets/organizers/keshav-verma.jpg',
    initials: 'KV',
    avatarColor: '#EA4335',
    isCurrent: true,
  },
  {
    id: 'devika-kanoongo',
    name: 'Devika Kanoongo',
    role: 'GDG on Campus Organizer',
    category: 'Organiser',
    bio: 'Organizer at GDG on Campus Poornima University, committed to creating inclusive, hands-on events that inspire students to explore technology and build real-world solutions.',
    profileUrl: 'https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/',
    imageUrl: '/assets/organizers/devika-kanoongo.jpg',
    initials: 'DK',
    avatarColor: '#34A853',
    isCurrent: true,
  },
];

export const getTeamByCategory = (members: TeamMember[]): Record<string, TeamMember[]> => {
  const grouped: Record<string, TeamMember[]> = {};
  for (const member of members) {
    if (!grouped[member.category]) {
      grouped[member.category] = [];
    }
    grouped[member.category].push(member);
  }
  return grouped;
};

export const getCurrentTeam = (): TeamMember[] =>
  teamMembers.filter((m) => m.isCurrent);

export const getPreviousTeam = (): TeamMember[] =>
  teamMembers.filter((m) => !m.isCurrent);

// Previous chapter rosters — newest first. Members join a chapter via `chapter: '2025-26'`.
export const previousChapters: { id: string; label: string }[] = [
  { id: '2025-26', label: 'Chapter 2025–26' },
  { id: '2024-25', label: 'Chapter 2024–25' },
  { id: '2023-24', label: 'Chapter 2023–24' },
];

export const getPreviousTeamsByChapter = (): {
  chapter: { id: string; label: string };
  members: TeamMember[];
}[] =>
  previousChapters.map((chapter) => ({
    chapter,
    members: teamMembers.filter((m) => !m.isCurrent && m.chapter === chapter.id),
  }));
