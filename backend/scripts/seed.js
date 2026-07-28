import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Project } from '../models/Project.js';
import { Skill } from '../models/Skill.js';

dotenv.config();

const sampleProjects = [
  {
    title: 'Enterprise Banking & Payments System',
    subtitle: 'High-Throughput Core Banking Platform',
    category: 'Java & Spring Boot',
    description: 'Scalable distributed banking backend supporting double-entry ledger transactions, JWT authentication, and Kafka event streaming.',
    longDescription: 'Engineered with Spring Boot 3, Spring Security, Apache Kafka, PostgreSQL, and Redis caching. Achieved sub-50ms transaction latency with multi-layer ACID compliance and circuit-breaker fault tolerance.',
    tags: ['Java 21', 'Spring Boot', 'Spring Security', 'Kafka', 'PostgreSQL', 'Redis'],
    githubUrl: 'https://github.com/Kashyap-jyoti/Banking-Platform',
    liveUrl: 'https://github.com/Kashyap-jyoti',
    featured: true,
    stars: 48,
    forks: 14
  },
  {
    title: 'Electra AI Portfolio Platform',
    subtitle: 'Full-Stack MERN + AI Holographic Assistant',
    category: 'MERN Stack',
    description: 'Ultra-modern portfolio web app powered by React 18, Express backend, MongoDB integration, and an embedded holographic AI guide.',
    longDescription: 'Built using React, Vite, Node.js, Express, and Mongoose. Features custom dark glassmorphic UI, GSAP micro-animations, instant command palette, and interactive chat API.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'GSAP', 'CSS Modules'],
    githubUrl: 'https://github.com/Kashyap-jyoti/Developer-portfolio',
    liveUrl: 'https://kashyap-jyoti.github.io',
    featured: true,
    stars: 62,
    forks: 19
  },
  {
    title: 'AlgoVisualizer DSA Suite',
    subtitle: 'Interactive Data Structures & Algorithm Visualizer',
    category: 'Algorithms',
    description: 'Step-by-step visual engine for Graph Traversals (Dijkstra, A*), Sorting Algorithms, Dynamic Programming, and Binary Search Trees.',
    longDescription: 'Allows computer science students to visualize state changes in memory across recursion trees, graph edges, and array swaps in real time with configurable speed controls.',
    tags: ['Java', 'React', 'DSA', 'Canvas API', 'Graph Theory'],
    githubUrl: 'https://github.com/Kashyap-jyoti/AlgoVisualizer',
    liveUrl: 'https://github.com/Kashyap-jyoti',
    featured: true,
    stars: 35,
    forks: 8
  }
];

const sampleSkills = [
  { name: 'Core Java 21', category: 'Core Backend', proficiency: 95, icon: 'coffee' },
  { name: 'Data Structures & Algorithms', category: 'Core Backend', proficiency: 92, icon: 'code' },
  { name: 'Spring Boot 3 & Microservices', category: 'Core Backend', proficiency: 88, icon: 'cpu' },
  { name: 'React 18 & Hooks', category: 'Frontend & MERN', proficiency: 90, icon: 'layers' },
  { name: 'Node.js & Express.js', category: 'Frontend & MERN', proficiency: 88, icon: 'server' },
  { name: 'MongoDB & Mongoose', category: 'Database & Cloud', proficiency: 85, icon: 'database' }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jyoti_portfolio';
    await mongoose.connect(mongoUri);
    console.log('[Seed]: Connected to MongoDB...');

    await Project.deleteMany({});
    await Skill.deleteMany({});

    await Project.insertMany(sampleProjects);
    await Skill.insertMany(sampleSkills);

    console.log('✅ [Seed Success]: Portfolio seed data successfully inserted into MongoDB!');
    process.exit(0);
  } catch (error) {
    console.error('❌ [Seed Error]:', error.message);
    process.exit(1);
  }
};

seedDB();
