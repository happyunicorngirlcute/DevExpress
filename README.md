# Hello. I will clarify, this project had around 20-25 commits, but I accidentally force pushed a commit, which deleted all the others, I still could get the newest commit

# DevExpress

**The Hub for Every Dev Event You Can't Miss.**

DevExpress is a tech event discovery and booking platform. Browse conferences, hackathons, meetups, and workshops — then book your spot in one click.

## Features

- Browse featured tech events on the landing page
- View detailed event pages with agenda, organizer info, tags, and venue details
- Book tickets for events
- Similar event recommendations
- Cloudinary-powered image upload for event management
- MongoDB-backed event storage with Mongoose ODM

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Database | MongoDB via Mongoose |
| Media | Cloudinary |
| Language | TypeScript |

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB instance (local or Atlas)
- Cloudinary account (for image uploads)

### Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=mongodb://localhost:27017/devexpress
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Install & Run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Seed the Database

Populate with real tech conferences (GitHub Universe, React Conf, Google I/O, etc.):

```bash
pnpm seed
```

## Project Structure

```
├── app/
│   ├── api/events/       # Event CRUD API routes
│   ├── events/[slug]/    # Event detail pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout with navbar & effects
│   └── page.tsx          # Landing page
├── components/           # Reusable UI components
├── database/             # Mongoose models (Event, Booking)
├── lib/                  # Utilities & MongoDB connection
├── public/               # Static assets & icons
└── scripts/              # Database seed scripts
```

# PS

This was created while following a youtube tutorial, it was my first NextJs Project, It is fully made by hand by me, except the populating seeds, and the database schemas, which I used AI
