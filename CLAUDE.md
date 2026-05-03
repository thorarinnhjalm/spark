# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```

No test suite exists yet.

## Architecture

**Spark** is a Next.js 16 + Firebase + Gemini AI educational platform teaching AI fluency to children aged 10–14. The product centers on 12 missions structured around a "4D AI Fluency Framework" (Delegation, Description, Discernment, Diligence).

### Routing

All routes live under `src/app/[lang]/` — every page is locale-prefixed (`/is/` or `/en/`). The middleware at `src/middleware.ts` handles locale detection and redirects root to the default locale. Key routes:

- `/[lang]/` — landing page
- `/[lang]/login` — parent auth (email/password via Firebase)
- `/[lang]/join` — child onboarding via invite code
- `/[lang]/dashboard` — parent overview; `/[lang]/dashboard/[childId]` for per-child view
- `/[lang]/missions` — mission list; `/[lang]/missions/[id]` — mission runner
- `/api/chat` — server-side Gemini API proxy

### Data Layer

No ORM — direct Firebase SDK calls. Helper functions live in `src/lib/db.ts`. Firestore collections:
- `parents` — uid, email, inviteCode (SPARK-XXXX format), plan, maxChildren
- `children` — uid, parentUid, displayName, age, xp, rank
- `mission_progress` — per-child progress with 30-day TTL (GDPR-K compliance)
- `concepts_learned` — concept completion tracking

Firestore security rules are in `firestore.rules`.

### AI Integration

`src/app/api/chat/route.ts` proxies requests to Gemini (`gemini-3.1-flash`). The model is mission-scoped: each mission in `src/lib/missionsData.ts` carries its own system prompt. Safety filters are set to `BLOCK_LOW_AND_ABOVE` for all harm categories. The `GEMINI_API_KEY` env var is server-side only; all `NEXT_PUBLIC_FIREBASE_*` vars are public.

### i18n

Dictionary JSON files at `src/dictionaries/is.json` and `en.json`. Server-side loading via `getDictionary(lang)`. Client components access translations through `useDictionary()` from `src/components/DictionaryProvider.tsx`. Icelandic (`is`) is the primary language.

### Auth Flow

Firebase email/password auth managed by `src/context/AuthContext.tsx` (`useAuth()` hook). Two-role system: parents create accounts, generate invite codes, then children join using those codes. Children never authenticate with Firebase directly — they use the parent's invite code flow.

### Styling

Tailwind v4 with a custom Material Design 3 color system defined as CSS variables in `src/app/globals.css`. Font is Plus Jakarta Sans. UI uses glassmorphism (backdrop blur, semi-transparent cards). No component library — all custom components in `src/components/`.

### Deployment

Hosted on Vercel. No CI/CD workflows configured.
