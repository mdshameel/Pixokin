import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['photo', 'video'], required: true },
    url: { type: String, required: true },
    thumbnailUrl: { type: String },
    publicId: { type: String, required: true },
    caption: { type: String, trim: true }
  },
  { timestamps: true }
);

mediaSchema.index({ album: 1, createdAt: -1 });

export const Media = mongoose.model('Media', mediaSchema);
