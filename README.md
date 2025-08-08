# Paw-Paw Ceramics

## Getting started

- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`

## Do not commit secrets

- Never commit `.env` files with secrets. Only client-safe envs using the `VITE_` prefix belong in your local `.env` (publishable keys only).
- Keep `sk_...` Stripe secret keys and any other secrets in your hosting provider env settings (Vercel/Netlify), not in this repo.

## Git hygiene

This repo is set up to ignore `node_modules`, build output, and local env files.

- Verify before first commit:
  - `git status` shows only source files, not `node_modules/` or `dist/`
  - If needed, clear cache: `git rm -r --cached . && git add .`

## Deploying to GitHub Pages

- If deploying to a project page (username.github.io/repo-name), set Vite base:
  - Edit `vite.config.js` → `export default defineConfig({ base: '/repo-name/', plugins: [react()] })`
- Push built files to `gh-pages` branch or use a GitHub Action.

## Payments (current setup)

- Checkout uses an email-first flow. After you receive an order email, reply with a Venmo link for payment, then ship.
- Optional quick links: set your handles in `src/shared/payments.js` to show PayPal/Cash App/Venmo buttons.
- Card payments via Stripe can be enabled later with a serverless endpoint and a publishable key.
