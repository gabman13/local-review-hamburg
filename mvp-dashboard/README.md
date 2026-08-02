# SterneWerk MVP Dashboard

This is a browser-only demo dashboard for the review collection system.

It runs with plain HTML, CSS, and vanilla JavaScript. There is no backend, account system, database, framework, or build step.

## What It Shows

- Review request tracking
- Review conversion metrics
- Follow-up status
- Competitor review gap
- Message templates
- CSV export
- Browser-local storage
- Review-source URL detection for Google Maps, Trustpilot, TripAdvisor, Yelp, and Facebook
- Clear server-connection requirements and partial-dataset warnings

## Review Imports

The review-source screen is intentionally an integration-ready interface, not a scraper. This GitHub Pages demo has no secure backend, so it cannot call provider APIs or store credentials.

- Google Maps URLs can be stored as a potential **partial** Places API source.
- Full Google review history requires a verified business owner to connect Google Business Profile through OAuth.
- Trustpilot, TripAdvisor, and Yelp require server-side credentials or partner access.
- Facebook review import is detected but not supported in this MVP.

See [`../review-integration-feasibility.md`](../review-integration-feasibility.md) for the provider matrix, recommended database model, and backend implementation order. `.env.example` contains server-side variable names only; never publish real credentials in this static app.

## How To Open

Open `mvp-dashboard/index.html` directly in a browser.

## How To Use In A Sales Meeting

1. Show the competitor gap.
2. Show the QR card preview and explain the customer flow.
3. Add a fake customer request live.
4. Mark a review as received.
5. Export the tracker CSV.
6. Show the WhatsApp and follow-up templates.

The point is to prove that this is a simple system the business can start using immediately.

## How To Customize

Edit `app.js` to change:

- sample business name
- competitor review counts
- message templates
- starter tracker rows

Edit `index.html` for the displayed review link and business profile text.
