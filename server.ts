import dotenv from 'dotenv';
dotenv.config(); // Move this to the top before other imports that might use env vars

import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dbconnect from './config/db';
import routes from './routes';

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: any; // You can replace 'any' with a more specific type
    }
  }
}

const PORT = process.env.PORT! || "5000";
const HOST = process.env.HOST || "localhost";
const app = express();

// 1. Parse JSON bodies
app.use(express.json());

// 2. CORS configuration - apply before routes
app.use(cors({
  origin: '*', // For production: specify allowed domains 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

// 3. Authentication middleware
const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  // Skip authentication for non-protected routes (optional)
  if (req.path === '/api/user/login' || req.path === '/api/user/register') {
    return next();
  }
  
  // Check for token in Authorization header OR query parameter
  const tokenHeader = req.header('Authorization');
  const tokenQuery = req.query.token;
  
  let token: string | undefined;
  
  if (tokenHeader) {
    // Extract token from "Bearer TOKEN" format
    token = tokenHeader.replace('Bearer ', '');
  } else if (typeof tokenQuery === 'string') {
    // Use token from query parameter
    token = tokenQuery;
  }
  
  if (!token) {
    res.status(401).json({ message: 'No authentication token provided' });
    return;
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};

// 4. Apply middleware to routes that need authentication
// This is important - use the middleware!
app.use('/api/turno', authMiddleware);
app.use('/api/service/protected', authMiddleware); // If applicable

// 5. Register all routes
app.use('/api', routes);

// 6. Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to database
dbconnect();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

// Export for testing or importing in other files
export { app, authMiddleware };