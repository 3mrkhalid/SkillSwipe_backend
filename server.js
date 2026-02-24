import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './config/dbConn.js';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import router from './routes/root.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import globalErrorHandler from './middleware/globalErrorHandler.js';
import { initSocket } from './socket/index.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/messageRoutes.js';

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/', router);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use(globalErrorHandler);

const server = http.createServer(app);
const io = new Server(server, { cors: corsOptions });


initSocket(io);


app.set("io", io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));