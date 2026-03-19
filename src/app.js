import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import router from './routes/index.js';
import { logger } from './middleware/logger.js';
import { errorHandleMiddleware } from './middleware/errorHandleMiddleware.js';
import { errors as celebrateErrors } from 'celebrate';
// import { bodyParser as appLvlMiddlewareBodyParser } from './middleware/bodyParser.js';

const PORT = process.env.PORT;

const app = express();

app.set('view engine', 'pug');
app.set('views', './src/views');

app.use(logger);
// app.use(appLvlMiddlewareBodyParser); //App level custom middleware
// app.use(express.json()); //App level built-in middleware
app.use(bodyParser.json()); //App level third party middleware

app.use(router);

app.use(celebrateErrors());

app.use(errorHandleMiddleware);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
