const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const dns = require('dns');
dns.setServers(['1.1.1.1','1.0.0.1']); 
// Load env vars
dotenv.config();

const app = express();

// Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount routers
app.use('/api/users', userRoutes);

// Basic error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 8080;

// Start server after DB connection is established
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
