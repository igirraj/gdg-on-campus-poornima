# GDG on Campus Poornima University — Website

A complete, production-quality website for **GDG on Campus Poornima University**, Jaipur, India.
Built with React, TypeScript, Vite, and Tailwind CSS v4 — featuring a bold neobrutalist design system.

🔗 **Official Community:** [gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india](https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/)

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI framework |
| TypeScript | 5 | Type safety |
| Vite | 8 | Dev server & build |
| Tailwind CSS | v4 | Utility styles |
| React Router | 7 | Client-side routing |
| Lucide React | latest | Icons |

---

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd gdg-poornima

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```

Output goes to the `dist/` folder. Preview it with:

```bash
npm run preview
```

### TypeScript Check

```bash
npx tsc --noEmit
```

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx       # Sticky responsive navigation
│   ├── Footer.tsx       # Site footer with social links
│   ├── BackToTop.tsx    # Scroll-to-top button
│   ├── CommandPalette.tsx # Easter egg — Ctrl+K palette
│   └── EventCard.tsx    # Reusable event card
│
├── data/                # Local data files (edit to add content)
│   ├── events.ts        # ← Add new events here
│   ├── team.ts          # ← Add team members here
│   ├── gallery.ts       # ← Add gallery photos here
│   ├── blog.ts          # ← Add blog posts here
│   └── social.ts        # Community links & info
│
├── hooks/
│   └── useBookmarks.ts  # LocalStorage bookmark hook
│
├── pages/               # One file per route
│   ├── HomePage.tsx     # / 
│   ├── AboutPage.tsx    # /about
│   ├── EventsPage.tsx   # /events
│   ├── EventDetailPage.tsx # /events/:slug
│   ├── TeamPage.tsx     # /team
│   ├── GalleryPage.tsx  # /gallery
│   ├── BlogPage.tsx     # /blog
│   ├── BlogDetailPage.tsx # /blog/:slug
│   ├── ContactPage.tsx  # /contact
│   └── NotFoundPage.tsx # * (404)
│
├── App.tsx              # Router configuration
├── main.tsx             # React entry point
└── index.css            # Design system & global styles
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, events preview, team preview |
| `/about` | Community story, mission, values |
| `/events` | Interactive events with search & filters |
| `/events/:slug` | Event detail page |
| `/team` | Organizer profiles & categories |
| `/gallery` | Community photo gallery |
| `/blog` | Articles & tutorials |
| `/contact` | Contact form + community channels |
| `/admin` | Admin management panel |

---

## Adding Content

### New Event

Add an object to [`src/data/events.ts`](src/data/events.ts):

```ts
{
  id: 'unique-id',
  slug: 'url-friendly-slug',
  title: 'Event Title',
  date: '2026-03-15',           // ISO 8601
  dateLabel: '15 March 2026',   // Human-readable
  category: 'Workshop',         // Workshop | Hackathon | Orientation | Info Session
  tags: ['AI', 'Firebase'],
  shortDescription: 'Brief description for cards.',
  fullDescription: 'Full event description for detail page.',
  location: 'Poornima University, Jaipur',
  status: 'upcoming',           // 'past' | 'upcoming'
  sourceUrl: 'https://...',     // Official GDG event URL
  registrationUrl: 'https://...', // Only for upcoming events
  technologies: ['Gemini', 'Firebase'],
  coverColor: '#4D65FF',        // Card accent color
}
```

### New Team Member

Add to [`src/data/team.ts`](src/data/team.ts):

```ts
{
  id: 'first-last',
  name: 'First Last',
  role: 'GDGoC Organizer',
  bio: 'Short bio.',
  profileUrl: 'https://...',
  imageUrl: undefined,          // Or URL to verified image
  initials: 'FL',
  avatarColor: '#FFE66D',
}
```

---

## Features

- ✅ **7 pages** with working React Router navigation
- ✅ **Interactive events** — search, filter by category/status, bookmark
- ✅ **LocalStorage bookmarks** — persist across sessions
- ✅ **Command palette** — Ctrl+K easter egg for keyboard navigation
- ✅ **Contact form** — with full validation and demo success state
- ✅ **Copyable community card** on Team page
- ✅ **Responsive** — mobile, tablet, desktop
- ✅ **Accessible** — semantic HTML, ARIA labels, keyboard nav, focus rings
- ✅ **Reduced motion** support
- ✅ **Back to top** button
- ✅ **404 page** for unmatched routes

---

## Design System

The site uses **Neobrutalism** — thick black borders, hard-offset shadows, and a restrained color palette:

| Token | Value | Use |
|-------|-------|-----|
| `--ink` | `#171717` | Text, borders |
| `--paper` | `#FFFDF5` | Page background |
| `--yellow` | `#FFE66D` | Primary accent |
| `--blue` | `#4D65FF` | Secondary accent |
| `--coral` | `#FF8066` | Tertiary accent |
| `--mint` | `#B9FBC0` | Success/Info |

---

## Community Links

| Platform | Link |
|----------|------|
| GDG Community | [gdg.community.dev](https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/) |
| Instagram | [@gdg.poornima](https://instagram.com/gdg.poornima) |
| LinkedIn | [gdg-poornima](https://www.linkedin.com/company/gdg-poornima/) |
| WhatsApp | [Community Group](https://chat.whatsapp.com/BUzm2aq56HJHVmyiuzGIpJ) |

---

## Notes

- **No backend** — this is a fully static frontend app
- **Contact form** is a demo — no messages are sent or stored remotely
- **Data accuracy** — all events, team members, and community info are sourced from the [official GDG community page](https://gdg.community.dev/gdg-on-campus-poornima-university-jaipur-india/)
- **No invented content** — no fake statistics, partnerships, or testimonials

---

*Built with ❤️ for the GDG on Campus Poornima University community · Not an official Google product*
