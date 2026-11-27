export interface Event {
  id: string;
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  category: string;
  tags: string[];
  shortDescription: string;
  fullDescription: string;
  location?: string;
  status: 'past' | 'upcoming';
  sourceUrl?: string;
  registrationUrl?: string;
  technologies: string[];
  coverColor: string;
}

// Verified events from: https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/
export const events: Event[] = [
  {
    id: 'solution-challenge-2026',
    slug: 'google-solution-challenge-kickoff-workshop-2026',
    title: 'Google Solution Challenge Kick-off and Workshop',
    date: '2026-03-18',
    dateLabel: '18 March 2026',
    category: 'Workshop',
    tags: ['Solution Challenge', 'Google', 'AI', 'Problem Solving'],
    shortDescription:
      'An official kick-off session for the Google Solution Challenge 2026 — guiding students through ideation, team formation, and submission guidelines.',
    fullDescription:
      "The Google Solution Challenge Kick-off and Workshop is a pivotal session for students looking to participate in one of Google's most impactful global programs. This event walked participants through the challenge structure, eligibility criteria, and the process of identifying real-world problems that technology can solve. Attendees gained practical guidance on team formation, project scoping, and how to leverage Google technologies like Gemini AI, Firebase, and Google Cloud to build meaningful solutions. Community organizers shared insights from previous editions and answered questions to help teams get started on the right foot.",
    location: 'Poornima University, Jaipur',
    status: 'past',
    sourceUrl: 'https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/',
    technologies: ['Gemini AI', 'Firebase', 'Google Cloud', 'Android', 'Flutter'],
    coverColor: '#4285F4',
  },
  {
    id: 'build-with-ai-workshop-2026',
    slug: 'build-with-ai-workshop-lets-hack-it-2026',
    title: "Build with AI Workshop: Let's Hack It!",
    date: '2026-01-22',
    dateLabel: '22 January 2026',
    category: 'Workshop',
    tags: ['AI', 'Gemini', 'Hackathon', 'Machine Learning'],
    shortDescription:
      'A hands-on AI hacking session exploring Gemini APIs and Google AI tools — where participants built functional AI-powered prototypes in a single session.',
    fullDescription:
      '"Build with AI Workshop: Lets Hack It!" was a high-energy, hands-on session where students explored the frontier of artificial intelligence through building. Participants worked with the Gemini API to create text, image, and multimodal AI applications. The workshop covered prompt engineering fundamentals, integrating AI into web and mobile apps, and understanding the responsible use of generative AI. Teams competed in a mini-hackathon format, presenting their AI-powered prototypes at the end of the session. This event was designed to be beginner-friendly while still being challenging enough for experienced developers.',
    location: 'Poornima University, Jaipur',
    status: 'past',
    sourceUrl: 'https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/',
    technologies: ['Gemini API', 'Google AI Studio', 'Python', 'JavaScript', 'Vertex AI'],
    coverColor: '#FF7DAF',
  },
  {
    id: 'gdg-india-hackathon-briefing-2025',
    slug: 'gdg-india-hackathon-briefing-session-2025',
    title: 'GDG India Hackathon Briefing Session',
    date: '2025-12-24',
    dateLabel: '24 December 2025',
    category: 'Info Session',
    tags: ['Hackathon', 'GDG India', 'Competition', 'Networking'],
    shortDescription:
      'A dedicated briefing for the GDG India Hackathon — covering rules, team registration, problem statements, and tips from past participants.',
    fullDescription:
      'The GDG India Hackathon Briefing Session prepared Poornima University students to compete in the national-level GDG India Hackathon. Community organizers broke down the competition format, eligibility requirements, and team composition rules. The session featured an open Q&A with students who had previously participated in similar events, offering real-world advice on time management, rapid prototyping, and presenting to judges. Attendees left with a clear understanding of how to register, what problem domains to explore, and which Google technologies to consider for their solutions.',
    location: 'Poornima University, Jaipur',
    status: 'past',
    sourceUrl: 'https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/',
    technologies: ['Google Cloud', 'Firebase', 'Gemini', 'Android', 'Web'],
    coverColor: '#CCF6C5',
  },
  {
    id: 'orientation-2025-26',
    slug: 'step-into-a-world-of-innovation-orientation-2025-26',
    title: 'Step into a World of Innovation – Orientation 2025–26',
    date: '2025-10-06',
    dateLabel: '6 October 2025',
    category: 'Orientation',
    tags: ['Orientation', 'Community', 'Welcome', 'Introduction'],
    shortDescription:
      'The official orientation for the 2025–26 chapter year — welcoming new members, introducing the leadership team, and setting the tone for the year ahead.',
    fullDescription:
      "The 'Step into a World of Innovation – Orientation 2025-26' event marked the beginning of a new chapter year for GDG on Campus Poornima University. New students discovered how the community works, what kinds of events and workshops to expect, and how they could get involved — from attending sessions to organizing events themselves. The organizers introduced the leadership team, explained the community's connection to the global Google Developer Groups on Campus program, and outlined the roadmap for the year. It was an energetic session filled with demos, introductions, and an open invitation for every student to find their place in the community.",
    location: 'Poornima University, Jaipur',
    status: 'past',
    sourceUrl: 'https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/',
    technologies: ['Android', 'Web', 'Cloud', 'AI', 'Firebase'],
    coverColor: '#F9AB00',
  },
];

export const getEventBySlug = (slug: string): Event | undefined =>
  events.find((e) => e.slug === slug);

export const getRelatedEvents = (currentSlug: string, limit = 2): Event[] =>
  events.filter((e) => e.slug !== currentSlug).slice(0, limit);
