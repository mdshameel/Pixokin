import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    coverImageUrl: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    inviteCode: { type: String, required: true, unique: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

export const Album = mongoose.model('Album', albumSchema);
