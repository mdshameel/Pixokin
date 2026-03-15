import { Router } from 'express';
import { Album } from '../models/Album.js';
import { AlbumMember, ROLES } from '../models/AlbumMember.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeAlbumRole } from '../middleware/authorizeAlbumRole.js';
import { generateInviteCode } from '../utils/invite.js';

const router = Router();
router.use(authenticate);

router.post('/', async (req, res) => {
  const { name, coverImageUrl } = req.body;
  const album = await Album.create({
    name,
    coverImageUrl,
    owner: req.user._id,
    inviteCode: generateInviteCode(),
    members: [req.user._id]
  });

  await AlbumMember.create({ album: album._id, user: req.user._id, role: ROLES.ADMIN });

  return res.status(201).json(album);
});

router.post('/join', async (req, res) => {
  const { inviteCode } = req.body;
  const album = await Album.findOne({ inviteCode });
  if (!album) {
    return res.status(404).json({ message: 'Album not found' });
  }

  await AlbumMember.findOneAndUpdate(
    { album: album._id, user: req.user._id },
    { role: ROLES.CONTRIBUTOR },
    { upsert: true }
  );
  await Album.findByIdAndUpdate(album._id, { $addToSet: { members: req.user._id } });

  return res.json({ message: 'Joined album', albumId: album._id });
});

router.get('/', async (req, res) => {
  const memberships = await AlbumMember.find({ user: req.user._id }).populate('album');
  return res.json(memberships.map(({ album, role }) => ({ ...album.toObject(), role })));
});

router.get('/:albumId/members', authorizeAlbumRole(ROLES.VIEWER), async (req, res) => {
  const members = await AlbumMember.find({ album: req.params.albumId }).populate('user', 'name email avatarUrl');
  return res.json(members);
});

router.patch('/:albumId/members/:userId', authorizeAlbumRole(ROLES.ADMIN), async (req, res) => {
  const { role } = req.body;
  const updated = await AlbumMember.findOneAndUpdate(
    { album: req.params.albumId, user: req.params.userId },
    { role },
    { new: true }
  );
  return res.json(updated);
});

router.delete('/:albumId/members/:userId', authorizeAlbumRole(ROLES.ADMIN), async (req, res) => {
  await AlbumMember.findOneAndDelete({ album: req.params.albumId, user: req.params.userId });
  await Album.findByIdAndUpdate(req.params.albumId, { $pull: { members: req.params.userId } });
  return res.status(204).send();
});

export default router;
