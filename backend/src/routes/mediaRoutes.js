import { Router } from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeAlbumRole } from '../middleware/authorizeAlbumRole.js';
import { ROLES } from '../models/AlbumMember.js';
import { Media } from '../models/Media.js';
import { Like } from '../models/Like.js';
import { Comment } from '../models/Comment.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
router.use(authenticate);

router.post('/:albumId/upload', authorizeAlbumRole(ROLES.CONTRIBUTOR), upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Missing file' });
  }

  const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  const resourceType = req.file.mimetype.startsWith('video') ? 'video' : 'image';

  const uploaded = await cloudinary.uploader.upload(fileBase64, {
    folder: `pixokin/${req.params.albumId}`,
    resource_type: resourceType,
    transformation: resourceType === 'image' ? [{ quality: 'auto', fetch_format: 'auto' }] : undefined
  });

  const media = await Media.create({
    album: req.params.albumId,
    uploader: req.user._id,
    type: resourceType === 'image' ? 'photo' : 'video',
    url: uploaded.secure_url,
    thumbnailUrl: uploaded.secure_url,
    publicId: uploaded.public_id,
    caption: req.body.caption
  });

  return res.status(201).json(media);
});

router.get('/:albumId', authorizeAlbumRole(ROLES.VIEWER), async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 20);
  const skip = (page - 1) * limit;

  const media = await Media.find({ album: req.params.albumId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('uploader', 'name avatarUrl');

  return res.json(media);
});

router.post('/:mediaId/likes', async (req, res) => {
  await Like.findOneAndUpdate(
    { media: req.params.mediaId, user: req.user._id },
    { media: req.params.mediaId, user: req.user._id },
    { upsert: true }
  );
  return res.status(201).json({ message: 'Liked' });
});

router.post('/:mediaId/comments', async (req, res) => {
  const comment = await Comment.create({ media: req.params.mediaId, user: req.user._id, text: req.body.text });
  return res.status(201).json(comment);
});

export default router;
