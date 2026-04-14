# PIXOKIN (Web + API)

PIXOKIN is a collaborative media storage platform where multiple users can share albums, upload photos/videos, and collaborate with role-based access.

## Project structure

- `backend/` — Express + MongoDB API and the browser-based web client (`backend/public`).
- `mobile/` — Existing Expo mobile prototype (optional).

## What is working now

### Web app (browser)

- Signup / Login
- Create album
- Join album by invite code
- Album list with role labels
- Select album and view media grid
- Upload photo/video with caption
- Session persistence via `localStorage`

### API

- JWT auth (`/api/auth/signup`, `/api/auth/login`)
- Albums (`/api/albums`, `/api/albums/join`)
- Media upload/list (`/api/media/:albumId/upload`, `/api/media/:albumId`)
- Profile endpoint (`/api/profile/me`)

## Quick start (web)

### 1) Start MongoDB

Run a local MongoDB instance or use MongoDB Atlas.

### 2) Start backend + web

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Open: `http://localhost:4000`

## Environment variables

In `backend/.env.example`:

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

> Cloudinary values are required for media uploads.

## Notes

- The mobile app remains in `mobile/`, but the main runnable experience is now the web client served from `backend/public`.
