import { Project } from '../models/Project.js';

const initialProjects = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
  },
  {
    id: '4',
    title: 'Microservices E-Commerce Core',
    subtitle: 'Distributed Microservices Architecture',
    category: 'Backend Architecture',
    description: 'E-commerce microservices with API Gateway, Eureka Service Discovery, Config Server, and Docker deployment.',
    longDescription: 'Decoupled services for Product Catalog, Order Management, Payment Processing, and Notification service using Spring Cloud and RabbitMQ.',
    tags: ['Spring Cloud', 'Docker', 'RabbitMQ', 'MongoDB', 'REST API'],
    githubUrl: 'https://github.com/Kashyap-jyoti',
    liveUrl: 'https://github.com/Kashyap-jyoti',
    featured: false,
    stars: 29,
    forks: 5
  }
];

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    if (projects && projects.length > 0) {
      return res.json({ success: true, count: projects.length, data: projects });
    }
    // Fallback if DB empty or not connected
    return res.json({ success: true, count: initialProjects.length, data: initialProjects });
  } catch (error) {
    return res.json({ success: true, count: initialProjects.length, data: initialProjects });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      return res.json({ success: true, data: project });
    }
    const found = initialProjects.find(p => p.id === req.params.id);
    return res.json({ success: true, data: found || initialProjects[0] });
  } catch (error) {
    const found = initialProjects.find(p => p.id === req.params.id);
    return res.json({ success: true, data: found || initialProjects[0] });
  }
};
