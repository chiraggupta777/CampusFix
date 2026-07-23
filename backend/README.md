# CampusFix Backend

Express + MongoDB backend for the CampusFix MERN application.

## Setup

1. Copy `.env.example` to `.env` and fill in your values:

   ```bash
   cp .env.example .env
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Scripts

| Script  | Description                          |
|---------|--------------------------------------|
| `dev`   | Start server with nodemon (hot reload) |
| `start` | Start server in production mode      |

## Environment Variables

| Variable   | Description                        |
|------------|------------------------------------|
| `PORT`     | Server port (default: 5000)        |
| `MONGO_URI`| MongoDB Atlas connection string    |

## API

- `GET /` — Health check. Returns `{ "message": "CampusFix Backend Running" }`.
