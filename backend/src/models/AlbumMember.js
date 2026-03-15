import mongoose from 'mongoose';

export const ROLES = {
  ADMIN: 'Admin',
  CONTRIBUTOR: 'Contributor',
  VIEWER: 'Viewer'
};

const albumMemberSchema = new mongoose.Schema(
  {
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.CONTRIBUTOR }
  },
  { timestamps: true }
);

albumMemberSchema.index({ album: 1, user: 1 }, { unique: true });

export const AlbumMember = mongoose.model('AlbumMember', albumMemberSchema);
