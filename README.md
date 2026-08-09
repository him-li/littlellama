# Little Llama

Little Llama is a multilingual pet-adoption frontend built with Next.js App Router, React, and Material UI.

## Local development

Requirements: Node.js 20.9 or newer.

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`. Set `NEXT_PUBLIC_API_URL` in `.env.local` to the backend origin. The current Express backend must run on a different port than Next.js (for example, `3001`).

## Production

```bash
npm run build
npm start
```

The project can be deployed to any platform that supports Next.js 16. Configure `NEXT_PUBLIC_API_URL` in the deployment environment.

## Routes

- `/` and `/home`: landing, authentication, and featured pets
- `/search`: pet search
- `/pets` and `/mypets`: pet listings
- `/addpet` and `/dashboard`: admin tools
- `/pet/:id/edit`: pet editing
