import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/auth';
import projectRoutes from './routes/projectRoutes';
import userRoutes from './routes/userRoutes';
import chatRoutes from './routes/chatRoutes';
import notificationRoutes from './routes/notificationRoutes';
import adminRoutes from './routes/adminRoutes';
import path from 'path';
import uploadRoutes from './routes/uploadRoutes';
import workspaceRoutes from './routes/workspaceRoutes';
import { errorHandler } from './middleware/errorHandler';
import { env } from './config/env';

const app = express();

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const allowedOrigins = env.CORS_ORIGIN
  ? env.CORS_ORIGIN.split(',').map(o => o.trim())
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Restrict request body size to prevent DoS via payload bloat
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));


app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/workspaces', workspaceRoutes);



app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use(errorHandler);

const PORT = Number(env.PORT) || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
