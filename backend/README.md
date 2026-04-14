# Voting System Backend

This is the backend API for the Voting System project. It is built with Node.js, Express, and connects to a Supabase-hosted PostgreSQL database.

## Prerequisites
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- Access to the Supabase project (for database credentials)

## Setup
1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd voting-system/backend
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Configure environment variables**
   - Copy `.env.example` to `.env`:
     ```sh
     cp .env.example .env
     ```
   - Fill in `DB_PASSWORD` with your Supabase database password. (Ask the project owner if you do not have it.)
   - If you rotate the password in Supabase, update `.env` accordingly.

   **Example .env:**
   ```env
   PORT=5000
   DB_HOST=aws-1-ap-southeast-1.pooler.supabase.com
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=postgres.ifabxduzqquvfbqqespt
   DB_PASSWORD=YOUR_SUPABASE_DB_PASSWORD
   ```

## Running the Server
- For development (with auto-reload):
  ```sh
  npm run dev
  ```
- For production:
  ```sh
  npm start
  ```

The server will start on the port specified in `.env` (default: 5000).

## API Endpoints
- `GET /` — Basic status and available endpoints
- `GET /api/test` — Test endpoint
- `GET /api/health/db` — Database connection health check

## Supabase Database
- This backend connects directly to the Supabase PostgreSQL database using the credentials in `.env`.
- If you need access to the Supabase project, contact the project owner.

## Security Notes
- **Never commit your real `.env` file or database password to version control.**
- If a password is exposed, rotate it in Supabase and update `.env`.

## Project Structure
- `src/` — Source code (Express app, database module, routes)
- `.env.example` — Template for required environment variables

## Questions?
If you have issues or need credentials, contact the project owner or lead developer.
