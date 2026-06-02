import mongoose from 'mongoose';

/**
 * Global variable to cache the Mongoose connection.
 * This prevents creating multiple connections during hot reloads in development.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global object to include the mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Initializes the connection cache if it doesn't exist.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes a connection to MongoDB or returns the cached connection.
 * 
 * @returns {Promise<typeof mongoose>} The Mongoose connection instance.
 * @throws {Error} If the connection fails.
 */
async function connectToDatabase(): Promise<typeof mongoose> {
  // Return cached connection if available
  if (cached!.conn) {
    return cached!.conn;
  }

  // Create a new connection promise if not already connecting
  if (!cached!.promise) {
    const options = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(MONGODB_URI!, options).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    // Wait for the connection promise to resolve
    cached!.conn = await cached!.promise;
  } catch (error) {
    // Reset the promise on failure so subsequent calls can retry
    cached!.promise = null;
    throw error;
  }

  return cached!.conn;
}

export default connectToDatabase;
