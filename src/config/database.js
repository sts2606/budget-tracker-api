import mongoose from 'mongoose';

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  if (!uri || !dbName) {
    throw new Error(
      'MONGODB_URI environment variable is not defined. Please check your .env file and ensure it contains a valid MongoDB connection string.',
    );
  }

  try {
    await mongoose.connect(uri, {
      dbName: dbName,
      appName: dbName,
      autoIndex: false, // Вимкнення автоматичного створення індексів
      maxPoolSize: 10, // Обмеження кількості сокетів
      socketTimeoutMS: 45000, // Час на закриття сокетів через неактивність
      family: 4, // Використання IPv4
    });

    console.log('Connected to MongoDB using Mongoose');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function closeDatabaseConnection() {
  mongoose.connection.close();
}
