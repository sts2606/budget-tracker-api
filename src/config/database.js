import { MongoClient } from 'mongodb';

let client;
let database;

async function _connectToDatabase() {
  if (database) {
    return database;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      'MONGODB_URI environment variable is not defined. Please check your .env file and ensure it contains a valid MongoDB connection string.',
    );
  }

  try {
    client = new MongoClient(uri, {
      appName: 'budjet_tracker',
    });

    await client.connect();

    database = client.db('budjet_tracker');

    console.log(`Connected to database: ${database.databaseName}`);

    return database;
  } catch (error) {
    throw error;
  }
}

let connect$;

export async function connectToDatabase() {
  connect$ ??= _connectToDatabase();
  return await connect$;
}

export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    console.log('Database connection closed');
  }
}

export function getCollection(collectionName) {
  if (!database) {
    throw new Error('Database not connected.');
  }

  return database.collection(collectionName);
}
