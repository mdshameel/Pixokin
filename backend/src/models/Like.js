import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
  {
    media: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

likeSchema.index({ media: 1, user: 1 }, { unique: true });

export const Like = mongoose.model('Like', likeSchema);
