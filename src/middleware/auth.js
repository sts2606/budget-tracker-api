// import jwt from 'jsonwebtoken';
// import { getCollection } from '../config/database.js';

// const secretKey = process.env.SECRET_KEY || 'mysecretkey';

// export const auth = async (request, response, next) => {
//   const token = request.cookies['token'] || '';

//   try {
//     const user = jwt.verify(token, secretKey);

//     const usersCollection = getCollection('users');

//     const dbUser = await usersCollection.findOne({ email: user.email });

//     if (!dbUser) {
//       return response.status(401).send('Unauthorized');
//     }

//     next();
//   } catch (error) {
//     return response.status(401).send('Invalid token');
//   }
// };

export const isAuthenticated = async (request, response, next) => {
  const isAuthenticated = request.isAuthenticated();

  if (isAuthenticated) {
    return next();
  }

  return response.status(401).send('Unauthorized');
};
