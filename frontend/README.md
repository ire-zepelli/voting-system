# Voting System Frontend

This frontend is a React and Vite client for the PSITS voting system. It handles student login, registration, ballot submission, results viewing, and party list pages while talking to the backend API.

## Setup
1. Install dependencies:
	```sh
	npm install
	```
2. Copy `.env.example` to `.env` and point `VITE_API_URL` to the backend server.
3. Start the development server:
	```sh
	npm run dev
	```

## Environment Variable

```env
VITE_API_URL=http://localhost:5000
```

## Notes
- The frontend expects the backend API to provide `/api/auth`, `/api/candidates`, `/api/votes`, and `/api/results`.
- Candidate images are served from `frontend/public` and matched with the candidate records seeded in the backend SQL file.
