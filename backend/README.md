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
4. Start the API:
  ```sh
  npm run dev
  ```

## Environment Variables
Use either `DATABASE_URL` or the individual `DB_*` values.

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
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
- `POST /api/votes` submits a complete ballot for the logged-in voter.
- `GET /api/results` returns grouped election results.
- `GET /api/health/db` checks the database connection.

## Database Notes
- Voters are stored in `voters`.
- Candidates are stored in `candidates`.
- Submitted ballots are stored in `ballots` and `ballot_items`.
- The `cast_ballot` PostgreSQL function locks the voter row and rejects duplicate or incomplete submissions.
