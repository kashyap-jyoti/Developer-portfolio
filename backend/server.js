import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import skillRoutes from './routes/skillRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/skills', skillRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    server: 'Jyoti Kashyap MERN Backend',
    timestamp: new Date()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('🚀 MERN Stack Portfolio Express Server is running smoothly!');
});

app.listen(PORT, () => {
  console.log(`⚡ [Server Running]: http://localhost:${PORT}`);
});
