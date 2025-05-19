import dotenv from 'dotenv';
import dbconnect from './config/db';
import routes from './routes';

dotenv.config();

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT! || "5000";
const HOST = process.env.HOST || "localhost";
const app= express();

app.use(express.json());

app.use(cors(
  {
    origin: "*", 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add OPTIONS for preflight
    allowedHeaders: ['Content-Type', 'Authorization'], // Added Authorization
    credentials: true // Allow credentials
  }
));

app.use('/api', routes);

dbconnect();

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});