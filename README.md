# PIXOKIN Website (Web + API)

PIXOKIN is now a website-first collaborative media storage platform.

## This repository now includes only

- `backend/` — Express API + browser web client (`backend/public`)

## Working website features

- User signup and login (JWT)
- Create albums
- Join albums with invite code
- View albums list and select an album
- Upload photos/videos with caption
- Browse uploaded media in a responsive grid
- Session persistence in browser storage

## Tech stack

- Node.js + Express
- MongoDB (Mongoose)
- Cloudinary (media uploads)
- Vanilla HTML/CSS/JS frontend served by Express

## Run locally

### 1) Start MongoDB

Use local MongoDB or Atlas.

### 2) Configure environment

```bash
cd backend
cp .env.example .env
```

Fill values in `.env`:

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### 3) Install and run

```bash
npm install
npm run dev
```

Open website at:

- `http://localhost:4000`

## API routes

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/albums`
- `POST /api/albums`
- `POST /api/albums/join`
- `GET /api/media/:albumId`
- `POST /api/media/:albumId/upload`
- `GET /api/profile/me`

## Notes

- This repository intentionally excludes the previous Expo mobile prototype.
- Website files live in `backend/public`.
