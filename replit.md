# replit.md

## Overview

This is a Brazilian Winter Olympics tracker for Milano Cortina 2026. It's a full-stack web application that displays Brazilian athletes competing in the Winter Olympics, their event schedules, results, and medal achievements. The app highlights the historic first gold medal won by Lucas Pinheiro Braathen in Alpine Skiing. The content is in Brazilian Portuguese.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Overall Structure

The project follows a monorepo pattern with three main directories:
- **`client/`** — React frontend (SPA)
- **`server/`** — Express backend (API server)
- **`shared/`** — Shared types, schemas, and route definitions used by both client and server

### Frontend Architecture

- **Framework**: React with TypeScript, bundled by Vite
- **Routing**: `wouter` (lightweight client-side router)
- **State Management / Data Fetching**: `@tanstack/react-query` for server state
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives with Tailwind CSS
- **Animations**: `framer-motion` for scroll-triggered animations and transitions
- **Styling**: Tailwind CSS with CSS custom properties for theming (Brazilian flag colors: green, yellow, blue combined with winter tones)
- **Icons**: `lucide-react`
- **Date Formatting**: `date-fns` with Portuguese locale (`ptBR`)
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

The frontend has a single-page layout with three main sections:
1. **Hero** — Full-screen hero with winter sports background
2. **Athletes** — Grid of athlete cards with medal highlights
3. **Timeline** — Chronological event timeline with results

### Backend Architecture

- **Framework**: Express 5 on Node.js with TypeScript (run via `tsx`)
- **API Pattern**: RESTful JSON API under `/api/` prefix
- **Route Definitions**: Shared route contracts in `shared/routes.ts` define paths, methods, and response schemas — used by both server routes and client fetch hooks
- **Data Seeding**: On server startup, if the database is empty, seed data for athletes and events is automatically inserted (in `server/routes.ts`)
- **Dev Server**: Vite dev server middleware is attached in development mode for HMR
- **Production**: Client is built to `dist/public/`, server is bundled with esbuild to `dist/index.cjs`

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/athletes` | Returns all athletes with their nested events |
| GET | `/api/athletes/:id` | Returns a single athlete with events |
| GET | `/api/events` | Returns all events (flat list) |

### Database

- **Database**: PostgreSQL (required via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-Zod validation
- **Schema** (`shared/schema.ts`):
  - `athletes` table: `id` (serial PK), `name`, `sport`, `bio`, `imageUrl`
  - `events` table: `id` (serial PK), `athleteId` (FK), `eventName`, `date`, `time`, `result`, `medal`
  - One-to-many relation: each athlete has many events
- **Migrations**: Managed via `drizzle-kit push` (`npm run db:push`)
- **Storage Layer**: `server/storage.ts` provides a `DatabaseStorage` class implementing `IStorage` interface for all DB operations

### Build Process

- **Dev**: `npm run dev` — runs server with tsx, Vite middleware for HMR
- **Build**: `npm run build` — Vite builds client to `dist/public/`, esbuild bundles server to `dist/index.cjs`
- **Start**: `npm start` — runs the production bundle

## External Dependencies

- **PostgreSQL**: Required. Connection string provided via `DATABASE_URL` environment variable. Uses `pg` (node-postgres) driver with `connect-pg-simple` for session store capability.
- **Google Fonts**: Loaded externally for typography (Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **Unsplash**: Hero background image loaded from Unsplash CDN
- **Replit Plugins** (dev only): `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` — only active in development on Replit