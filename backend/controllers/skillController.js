import { Skill } from '../models/Skill.js';

const initialSkills = [
  { name: 'Core Java 21', category: 'Core Backend', proficiency: 95, icon: 'coffee' },
  { name: 'Data Structures & Algorithms', category: 'Core Backend', proficiency: 92, icon: 'code' },
  { name: 'Spring Boot 3 & Microservices', category: 'Core Backend', proficiency: 88, icon: 'cpu' },
  { name: 'React 18 & Hooks', category: 'Frontend & MERN', proficiency: 90, icon: 'layers' },
  { name: 'Node.js & Express.js', category: 'Frontend & MERN', proficiency: 88, icon: 'server' },
  { name: 'MongoDB & Mongoose', category: 'Database & Cloud', proficiency: 85, icon: 'database' },
  { name: 'PostgreSQL & SQL', category: 'Database & Cloud', proficiency: 86, icon: 'database' },
  { name: 'Kafka & Redis', category: 'Database & Cloud', proficiency: 80, icon: 'zap' },
  { name: 'Git & GitHub Actions', category: 'Tools & DevOps', proficiency: 90, icon: 'git-branch' },
  { name: 'Docker & REST APIs', category: 'Tools & DevOps', proficiency: 84, icon: 'box' }
];

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    if (skills && skills.length > 0) {
      return res.json({ success: true, count: skills.length, data: skills });
    }
    return res.json({ success: true, count: initialSkills.length, data: initialSkills });
  } catch (error) {
    return res.json({ success: true, count: initialSkills.length, data: initialSkills });
  }
};
