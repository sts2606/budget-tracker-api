import bcrypt from 'bcrypt';
import passport from 'passport';

import { getCollection } from '../config/database.js';

export const authRegisterHandler = async (request, response) => {
  const { email, password, ...rest } = request.body;

  const userCollection = getCollection('users');

  const query = { email: email };
  const dbUser = await userCollection.findOne(query);

  if (dbUser) {
    return response.status(409).send('User with such email already exist');
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  const newUserData = { email, password: hashPassword, ...rest };

  await userCollection.insertOne(newUserData);

  const newUser = await userCollection.findOne(query, {
    projection: { password: 0 },
  });

  request.login(newUser, (err) => {
    if (err) {
      console.error('Login error:', err);
      return response.status(500).send('Internal Server Error');
    }

    return response
      .status(201)
      .send({ message: 'New user has been created', user: newUser });
  });
};

export const authLoginHandler = (request, response) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err);
      return response.status(500).send('Internal Server Error');
    }

    if (!user) {
      return response.status(401).send(info.message || 'Unauthorized');
    }

    request.login(user, (err) => {
      if (err) {
        console.error('Login error:', err);
        return response.status(500).send('Internal Server Error');
      }

      return response.status(200).send({
        message: 'User has been logged in',
        user: { ...user, password: undefined },
      });
    });
  })(request, response);
};

export const authLogoutHandler = (request, response) => {
  request.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return response.status(500).send('Internal Server Error');
    }

    return response.status(200).send({ message: 'User has been logged out' });
  });
};
