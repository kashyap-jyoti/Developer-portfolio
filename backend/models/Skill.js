import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // 'Core Java', 'Backend & APIs', 'Frontend & UI', 'Database & DevOps'
  proficiency: { type: Number, required: true },
  icon: { type: String }
});

export const Skill = mongoose.model('Skill', skillSchema);
