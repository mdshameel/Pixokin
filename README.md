diff --git a/README.md b/README.md
index 9fb84c3837671783c133cb15d44cdb8570ffe2c7..02cc0a5be436bff9aebed70de98ad2d241532750 100644
--- a/README.md
+++ b/README.md
@@ -1,2 +1,122 @@
-# Pixokin
-PIXOKIN is a collaborative media storage app where users can create or join shared albums to upload and manage photos and videos together. With a single account, users can participate in multiple albums with friends, family, or teams, featuring secure storage, clean UI, and easy sharing.
+# PIXOKIN
+
+PIXOKIN is a collaborative media storage platform for shared photo and video albums.
+
+## What this repository contains
+
+- `mobile/` — Expo React Native app (client)
+- `backend/` — Node.js + Express API (server)
+
+## Product overview
+
+PIXOKIN lets users:
+
+- Sign up and log in securely
+- Create albums and invite others
+- Join albums through invite codes
+- Upload photos and videos
+- Browse media in a gallery/grid experience
+- Like and comment on media
+- Manage members with role-based permissions
+
+## Implemented backend capabilities
+
+### Authentication
+
+- Email/password signup
+- Email/password login
+- JWT token issuance
+- Protected routes via auth middleware
+
+### Albums and membership
+
+- Create album (with owner and invite code)
+- Join album by invite code
+- List albums the current user belongs to
+- Member role model:
+  - `Admin`
+  - `Contributor`
+  - `Viewer`
+- Admin-only member role updates and removals
+
+### Media
+
+- Photo/video upload endpoint
+- Cloudinary integration for storage
+- Media metadata persisted:
+  - uploader
+  - upload timestamp
+  - caption
+  - media type
+  - URL and thumbnail URL
+- Pagination for album media listing
+- Like and comment endpoints
+
+## Implemented mobile app screens
+
+1. Login / Signup
+2. Home (albums list)
+3. Album (media grid + preview modal)
+4. Upload
+5. Member management
+6. Profile
+
+## UI/UX direction implemented
+
+- Minimal modern styling
+- Rounded cards and soft spacing
+- Bottom tab navigation
+- Floating upload button
+- Gallery-style media grid
+- Modal media preview
+- Upload progress indicator
+
+## Data models
+
+- `User`
+- `Album`
+- `AlbumMember`
+- `Media`
+- `Comment`
+- `Like`
+
+## Local setup
+
+### Backend
+
+```bash
+cd backend
+cp .env.example .env
+npm install
+npm run dev
+```
+
+### Mobile
+
+```bash
+cd mobile
+npm install
+npm run start
+```
+
+> Note: for physical-device testing, set `mobile/src/services/api.js` to your machine's LAN IP instead of `localhost`.
+
+## Environment variables (backend)
+
+Defined in `backend/.env.example`:
+
+- `PORT`
+- `MONGODB_URI`
+- `JWT_SECRET`
+- `JWT_EXPIRES_IN`
+- `CLOUDINARY_CLOUD_NAME`
+- `CLOUDINARY_API_KEY`
+- `CLOUDINARY_API_SECRET`
+
+## Security and performance notes
+
+- JWT-based authentication middleware
+- Role-based authorization middleware for album resources
+- Pagination on media listing endpoints
+- Cloudinary transformation hook for optimized image uploads
+- Thumbnail field available for generated preview assets
