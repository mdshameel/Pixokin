diff --git a/README.md b/README.md
index 9fb84c3837671783c133cb15d44cdb8570ffe2c7..355cf24dc49472bfc2357c72e5f3d7eeaf659b39 100644
--- a/README.md
+++ b/README.md
@@ -1,2 +1,75 @@
-# Pixokin
-PIXOKIN is a collaborative media storage app where users can create or join shared albums to upload and manage photos and videos together. With a single account, users can participate in multiple albums with friends, family, or teams, featuring secure storage, clean UI, and easy sharing.
+# PIXOKIN
+
+PIXOKIN is a modern collaborative media storage app where users create and join shared albums for photos and videos.
+
+## Architecture
+
+- `mobile/`: React Native (Expo) client with modern minimal UI, bottom tabs, floating upload action, and core screens.
+- `backend/`: Node.js + Express API with MongoDB models, JWT auth, role-based album access, media likes/comments, and Cloudinary upload support.
+
+## Core Features Implemented
+
+### User system
+- Email/password signup and login with JWT issuance.
+- User profile with storage quota and upload/joined album statistics.
+
+### Albums + Members
+- Create albums with cover image and owner.
+- Join albums by invite code.
+- Member roles: `Admin`, `Contributor`, `Viewer`.
+- Admin member management endpoints (change role/remove).
+
+### Media
+- Upload photos/videos via multipart endpoint.
+- Cloudinary-backed media storage with image optimization transformation.
+- Media metadata stored: uploader, upload date, caption, media type.
+- Likes and comments APIs.
+- Paginated media list for lazy loading/infinite scroll UX.
+
+### Mobile UX
+- Screens:
+  1. Login/Signup
+  2. Home (albums)
+  3. Album media grid + preview modal
+  4. Upload
+  5. Member management
+  6. Profile
+- Rounded cards, modern spacing, icon-driven UI, and smooth modal transitions.
+- Floating action upload button and bottom navigation.
+
+## Data Models
+
+- `User`
+- `Album`
+- `AlbumMember`
+- `Media`
+- `Comment`
+- `Like`
+
+## Backend setup
+
+```bash
+cd backend
+cp .env.example .env
+npm install
+npm run dev
+```
+
+## Mobile setup
+
+```bash
+cd mobile
+npm install
+npm run start
+```
+
+> For device testing, update `mobile/src/services/api.js` to use your machine LAN IP instead of `localhost`.
+
+## Security + Performance
+
+- JWT authentication middleware.
+- Role-based album authorization middleware.
+- Pagination for media loading.
+- Cloudinary image compression/transformation hook.
+- Thumbnail-ready field in media model for generated previews.
+
