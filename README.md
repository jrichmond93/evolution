# Evolution Explorer

> React + TypeScript + Vite + Bootstrap + Auth0

## Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the dev server**
   ```bash
   npm run dev
   ```
3. **Open** [http://localhost:5173](http://localhost:5173)

## Build for Production

```bash
npm run build
```

## Environment Variables
- Copy `.env.example` to `.env` and fill in:
  - `VITE_API_BASE` (your API URL)
  - `VITE_AUTH0_DOMAIN`, `VITE_AUTH0_CLIENT_ID`, `VITE_AUTH0_AUDIENCE` (from Auth0 dashboard)
- **Never commit `.env` to git.**

## Authentication
- Auth0 social login is enabled.
- If not logged in, API calls use `user_id: notauthenticated`.
- Login/logout in the main navigation.

## Deployment
- Deploy to [Vercel](https://vercel.com/):
  1. Push code to your repo
  2. Connect repo in Vercel dashboard
  3. Set environment variables in Vercel project settings
  4. Deploy

---

- Uses React Router for navigation
- Session IDs are generated per animal exploration
- Bootstrap for UI styling
# Trigger build - Wed, Nov 19, 2025  2:02:25 PM
