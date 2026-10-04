// Fix for MongoDB Atlas ECONNREFUSED DNS SRV lookup error
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

// Establish database connection
connectDB();

const PORT = process.env.PORT || 5000;

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});

// Handle unhandled promise rejections gracefully
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});