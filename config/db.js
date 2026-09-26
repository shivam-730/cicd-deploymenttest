const { MongoClient } = require('mongodb');

let db;

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    db = client.db();
    console.log('MongoDB Connected successfully');
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

module.exports = { connectDB, getDB };
