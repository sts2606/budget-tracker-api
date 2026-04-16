import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import User from '../schemas/users.js';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email });

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
  try {
    const user = await User.findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
