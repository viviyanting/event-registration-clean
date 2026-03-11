# Event Registration Platform
A simple fullstack event registration platform built with Next.js, Prisma, and JWT authentication.


## Features
- User login with JWT authentication
- View event list
- Register for events
- Cancel event registration
- View my registered events


## Tech Stack
- Next.js (App Router)
- TypeScript
- Prisma ORM
- SQLite
- JWT Authentication


## Project Structure
app/
api/
events/
login/
my-events/
components/
prisma/
types/


## Getting Started
### 1. Clone the repository
https://github.com/viviyanting/event-registration-clean.git

### 2. Install dependencies
npm install

### 3. Setup environment variables
Create a `.env` file based on `.env.example`.
cp .env.example .env

### 4. Run database migration
npx prisma migrate dev

### 5. Start development server
npm run dev
Open http://localhost:3000

### 6. Setup Database
Run Prisma migration to create the local SQLite database:
This will generate the `dev.db` file locally.


## API Endpoints
| Method | Endpoint | Description |
|------|------|------|
| POST | /api/login | User login |
| GET | /api/events | Get event list |
| GET | /api/events/[id] | Get event detail |
| POST | /api/events/[id]/register | Register event |
| POST | /api/events/[id]/cancel | Cancel registration |
| GET | /api/my-events | Get user's registered events |


## Future Improvements
- Loading states
- Better error handling
- UI improvements
- Deploy database (PostgreSQL)

## Architecture
Client (React / Next.js)
    ↓
Next.js API Routes
    ↓
JWT Authentication
    ↓
Prisma ORM
    ↓
Database (SQLite)

## API Flow
Client → API Request → Verify JWT → Extract userId → Query Database → Response JSON





