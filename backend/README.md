# Voting System Backend

This backend provides student registration, login, ballot submission, and results for the PSITS voting system. It connects directly to your Supabase PostgreSQL database, so the project stays split into only two apps: frontend and backend.

## Setup
1. Install dependencies:
  ```sh
  npm install
  ```
2. Copy `.env.example` to `.env` and fill in the database values plus a strong `AUTH_TOKEN_SECRET`.
3. Run the SQL file in the Supabase SQL editor:
  ```text
  backend/database/supabase_setup.sql
  ```
  If your database already has the earlier abstention-based ballot logic, run this migration too:
  ```text
  backend/database/add_abstentions.sql
  ```
4. Start the API:
  ```sh
  npm run dev
  ```

## Deployment
For cloud deployment, do not commit a `.env` file. Set the backend environment variables in your hosting provider instead.

For Vercel or similar platforms, configure these server-side secrets:
- `DATABASE_URL` or the individual `DB_*` values
- `AUTH_TOKEN_SECRET`
- `FRONTEND_URL`
- `FRONTEND_URL_REGEX` if you want to allow preview domains such as Vercel branch deployments

Example preview-domain regex:
```env
FRONTEND_URL_REGEX=^https://.*your-frontend-project.*\.vercel\.app$
```
//
## Environment Variables
Use either `DATABASE_URL` or the individual `DB_*` values.

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
FRONTEND_URL_REGEX=
AUTH_TOKEN_SECRET=replace-with-a-long-random-secret
DATABASE_URL=
DB_HOST=
DB_PORT=5432
DB_NAME=postgres
DB_USER=
DB_PASSWORD=
```

## Main Endpoints
- `POST /api/auth/register` creates a voter account using an 8-digit student ID and password.
- `POST /api/auth/login` authenticates a voter.
- `GET /api/auth/me` returns the current voter session.
- `GET /api/candidates` returns the ballot candidates.
- `POST /api/votes` submits only the selected candidate IDs for the logged-in voter.
- `GET /api/results` returns grouped election results.
- `GET /api/health/db` checks the database connection.

`FRONTEND_URL` accepts a comma-separated allowlist. `FRONTEND_URL_REGEX` accepts comma-separated regular expressions for dynamic preview URLs.

## Database Notes
- Voters are stored in `voters`.
- Candidates are stored in `candidates`.
- Submitted ballots are stored in `ballots` and `ballot_items`.
- `ballot_items` stores only the positions where a candidate was selected.
- The `cast_ballot` PostgreSQL function locks the voter row and rejects duplicate or invalid submissions.
