import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  category: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String },
  tags: [{ type: String }],
  githubUrl: { type: String },
  liveUrl: { type: String },
  featured: { type: Boolean, default: false },
  stars: { type: Number, default: 0 },
  forks: { type: Number, default: 0 }
});

export const Project = mongoose.model('Project', projectSchema);
