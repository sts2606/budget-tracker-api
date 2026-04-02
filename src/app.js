import express from 'express';
import 'dotenv/config';
import router from './routes/index.js';
import { logger } from './middleware/logger.js';
import { errorHandleMiddleware } from './middleware/errorHandleMiddleware.js';
import { errors as celebrateErrors } from 'celebrate';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {
  connectToDatabase,
  closeDatabaseConnection,
} from './config/database.js';
import passport from './config/passport.js';
import session from 'express-session';

const PORT = process.env.PORT;

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'mysecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', './src/views');

app.use(logger);
app.use(express.json());

app.use(express.static(join(__dirname, 'public')));

app.use(router);

app.use(celebrateErrors());

app.use(errorHandleMiddleware);

const startServer = async () => {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit the process with an error code
  }

  app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
};

process.on('SIGINT', async () => {
  console.log('Received SIGINT. Shutting down gracefully...');
  await closeDatabaseConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM. Shutting down gracefully...');
  await closeDatabaseConnection();
  process.exit(0);
});

startServer();
