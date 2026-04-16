import { Schema, model } from 'mongoose';
import { validate } from 'uuid';

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      validate: {
        validator: (value) => value !== 'John Doe',
        message: 'The name "John Doe" is not allowed.',
      },
    },
    email: {
      type: String,
      required: [true, 'The email is required'],
      unique: [true, 'The email must be unique'],
      match: /^\S+@\S+\.\S+$/,
    },
    limit: {
      type: Number,
      required: true,
      min: [10, 'The limit is too short'],
    },
    currency: { type: String, required: true, enum: ['USD', 'EUR', 'GBP'] },
    password: { type: String, required: true, minlength: 8 },
    skills: {
      frontend: [{ type: String }],
      backend: [{ type: String }],
    },
  },
  { timestamps: true },
);

const User = model('User', userSchema);

export default User;
