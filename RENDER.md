# Hosting this app on Render

This repository contains the existing Centrisys dashboard, including its logo,
UI, API, and built-in analysis. No redesign or database substitution is required.
It does not contain credentials or a copy of the current database.

## 1. Create the database first

In the Render dashboard select **New → Postgres**. Choose a region that you will
also use for the web service. Review the plan's current price, retention, and
expiration limits before creating it.

Keep connection URLs private. The external URL is for the one-time transfer from
outside Render. The internal URL is for the Render web service.

## 2. Transfer the existing preview database

Before the first web-service startup, copy the existing development database's
schema AND data into the new, empty Render database. Use a PostgreSQL dump and
restore, including sequences, with ownership and grant restoration disabled.
Check table row counts after the transfer.

Do not commit the dump or connection URLs to GitHub. Do not overwrite an existing
nonempty database. Do not use the inaccessible old production database as the
source.

The app seeds built-in content when the competitors table is empty, but it does
not create tables at startup. Seeding is not a substitute for copying the
preview's current data. Do not start the web service until the transfer is verified.

## 3. Create the web service

Select **New → Web Service**, connect GitHub, and choose this repository.

| Setting | Value |
| --- | --- |
| Branch | `main` |
| Runtime | Node |
| Root directory | Leave blank |
| Build command | `npm ci --include=dev && npm run build` |
| Start command | `npm start` |
| Health check path | `/api/competitors` |

Use the same region as the database. Review the selected service plan before
creating it.

Set environment variables in Render, not in repository files:

- `NODE_ENV`: `production`
- `NODE_VERSION`: `22` (use the latest Node 22 patch release)
- `DATABASE_URL`: the new Render database's **internal** connection URL

Render supplies `PORT`; the server already reads it and binds to `0.0.0.0`.
Do not use the local Replit/Helium URL on Render.

## 4. Verify

After deployment succeeds, open the Render URL. Confirm the dashboard and
competitor details match the preview and that `/api/competitors` returns data.
Render logs should report that existing competitors were found, not that an
empty database was seeded.

For local development: install dependencies with `npm ci`, provide a local
`DATABASE_URL` securely, and run `npm run dev`. `npm run check` checks types.

## Privacy

The repository includes built-in competitive analysis in the server seed files.
The application currently has no sign-in gate. Anyone who can reach a public
Render deployment can read the dashboard and its API.

## References

- https://render.com/docs/deploy-node-express-app
- https://render.com/docs/postgresql-creating-connecting
