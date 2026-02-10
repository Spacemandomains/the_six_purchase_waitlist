# the_six_purchase_waitlist
SaaS providing Founders with their complete C Suite as AI agents

https://thesixpurchase.netlify.app/

Here’s a clean, production-ready **README.md** you can drop straight into the repo.

You can copy/paste this as-is.

---

# The Six — Early Access (Purchase + Waitlist)

**The Six** is an AI C-Suite built in public for day-one founders.
This repository powers the **early purchase page** and **waitlist intake system**, including:

* A public landing page
* Stripe purchase link for founding access
* A waitlist form backed by Google Sheets
* A Netlify serverless function that securely proxies submissions

This repo is intentionally minimal, fast to deploy, and transparent.

---

## What This Repo Does

* ✅ Displays the **Early Access / Founding Purchase** page
* ✅ Collects emails for the **waitlist**
* ✅ Sends submissions through a **Netlify Function**
* ✅ Stores data in **Google Sheets** via **Google Apps Script**
* ✅ Works with **GitHub → Netlify** continuous deployment

---

## Architecture Overview

```
Browser (HTML)
   ↓
Netlify Function (/.netlify/functions/waitlist)
   ↓
Google Apps Script Web App
   ↓
Google Sheet (Waitlist + Purchases)
```

### Why this setup?

* Keeps your Apps Script URL private
* Avoids CORS issues
* No backend server required
* Easy to audit and maintain

---

## Folder Structure

```
/
├─ index.html                 # Landing page (purchase + waitlist)
├─ netlify.toml               # Netlify configuration
└─ netlify/
   └─ functions/
      └─ waitlist.js          # Serverless function
```

---

## Google Sheet Structure

Your Google Sheet **must** have these columns (in this order):

| Timestamp | Email | Source | Amount | Stripe Session ID | Notes |

The Apps Script will automatically append rows.

---

## Google Apps Script Setup

1. Create a Google Sheet
2. Open **Extensions → Apps Script**
3. Paste your `doPost(e)` handler
4. Deploy as **Web App** with:

   * **Execute as:** Me
   * **Who has access:** Anyone
5. Copy the Web App URL

This script receives JSON like:

```json
{
  "email": "founder@example.com",
  "source": "WAITLIST",
  "amount": "",
  "stripe_session_id": "",
  "notes": ""
}
```

---

## Netlify Function (`waitlist.js`)

The Netlify function:

* Accepts POST requests from the browser
* Validates the email
* Forwards the payload to Google Apps Script
* Returns a clean JSON response to the frontend

This prevents exposing your Apps Script endpoint publicly.

---

## Deployment Instructions

### 1. Push to GitHub

This repo is designed for GitHub-first deployment.

### 2. Connect to Netlify

* New site from Git
* Select this repo
* No build command needed
* Publish directory: `.`

Your `netlify.toml`:

```toml
[build]
  publish = "."
  functions = "netlify/functions"
```

### 3. Deploy

Netlify will auto-deploy on every push.

---

## Environment & Security Notes

* No secrets are stored in the frontend
* Google Apps Script handles spreadsheet permissions
* Stripe checkout runs in Stripe-hosted pages
* Netlify Functions isolate backend logic

---

## Customization

You can easily:

* Change pricing
* Swap Stripe links
* Add purchase metadata (amount, session ID)
* Extend the sheet for analytics
* Add email confirmations later

---

## Philosophy

This project is built **in public**.

No pitch deck.
No fake traction.
No pre-sold narrative.

Just shipping, collecting signal, and letting reality guide the product.

---

## License

MIT — use it, fork it, remix it.

---

If you want, next we can:

* Add purchase webhook tracking
* Separate waitlist vs paid users automatically
* Add referral tracking
* Add email confirmations
* Turn this into a reusable SaaS starter

Just say the word.

