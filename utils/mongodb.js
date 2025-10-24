import mongoose from 'mongoose';

// Ensure MONGODB_URI is read from the environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Throw an error if the URI is not defined
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Cache the connection to reuse it across hot-reloads and function calls
// This is necessary for Next.js and Vercel environments.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  // If a connection is already established, return it immediately
  if (cached.conn) {
    console.log('Using existing MongoDB connection.');
    return cached.conn;
  }

  // If there is no existing promise, start a new connection attempt
  if (!cached.promise) {
    const options = {
      // bufferCommands: false is often recommended but optional in newer versions
      bufferCommands: false,
    };

    // Store the connection promise
    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => mongoose);
  }

  // Wait for the connection promise to resolve
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    // Reset the promise on connection failure
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default connectToDatabase;