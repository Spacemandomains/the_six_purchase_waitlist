# The Six — Early Access

## Project Overview

A static landing page for "The Six" — an AI C-Suite platform for day-one founders. The page displays a founding purchase/waitlist intake form backed by a Google Apps Script spreadsheet.

## Architecture

- **Frontend**: Single `index.html` — Tailwind CSS (CDN), vanilla JS
- **Backend**: `server.js` — Node.js HTTP server serving static files and proxying the waitlist function
- **Serverless function**: `netlify/functions/waitlist.js` — validates emails and forwards submissions to Google Apps Script

## Key Files

- `index.html` — Landing page (purchase + waitlist form)
- `server.js` — Node.js server (port 5000, host 0.0.0.0)
- `netlify/functions/waitlist.js` — Waitlist handler (proxies to Google Apps Script)
- `netlify.toml` — Original Netlify configuration (kept for reference)

## Running Locally

The workflow `Start application` runs `node server.js` on port 5000.

## Deployment

Configured for autoscale deployment running `node server.js`.

## External Dependencies

- Google Apps Script Web App (URL hardcoded in `netlify/functions/waitlist.js`)
- Stripe (external purchase link in `index.html`)
- Tailwind CSS CDN, Google Fonts CDN
