import { AlbumMember, ROLES } from '../models/AlbumMember.js';

const ROLE_LEVEL = {
  [ROLES.VIEWER]: 1,
  [ROLES.CONTRIBUTOR]: 2,
  [ROLES.ADMIN]: 3
};

export const authorizeAlbumRole = (minimumRole = ROLES.VIEWER) => async (req, res, next) => {
  const membership = await AlbumMember.findOne({ album: req.params.albumId, user: req.user._id });

  if (!membership || ROLE_LEVEL[membership.role] < ROLE_LEVEL[minimumRole]) {
    return res.status(403).json({ message: 'Insufficient album permissions' });
  }

  req.membership = membership;
  return next();
};
