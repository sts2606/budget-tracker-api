import passport from 'passport';
import LocalStrategy from 'passport-local';
import { getCollection } from './database.js';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async function (email, password, done) {
      const users = getCollection('users');

      try {
        const user = await users.findOne({ email });

        const isMatched = bcrypt.compareSync(password, user.password);

        if (!user || !isMatched) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  const users = getCollection('users');

  try {
    const user = await users.findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
