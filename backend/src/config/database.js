import mongoose from 'mongoose';

export const connectDatabase = async (mongoUri) => {
  if (!mongoUri) {
    throw new Error('Missing MONGODB_URI');
  }

  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');
};
