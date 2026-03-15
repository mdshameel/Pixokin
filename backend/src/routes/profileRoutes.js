import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { AlbumMember } from '../models/AlbumMember.js';
import { Media } from '../models/Media.js';

const router = Router();
router.use(authenticate);

router.get('/me', async (req, res) => {
  const albumCount = await AlbumMember.countDocuments({ user: req.user._id });
  const uploadedCount = await Media.countDocuments({ uploader: req.user._id });

  return res.json({
    ...req.user.toObject(),
    stats: {
      joinedAlbums: albumCount,
      uploads: uploadedCount,
      quotaMb: req.user.storageQuotaMb
    }
  });
});

export default router;
