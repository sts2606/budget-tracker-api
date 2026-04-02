import { celebrate, Joi, Segments } from 'celebrate';

const userCreateSchema = Joi.object({
  name: Joi.string().required().min(2),
  email: Joi.string().required().email(),
  limit: Joi.number().required().integer().positive(),
  currency: Joi.string().required().min(2),
  password: Joi.string().required().min(8),
});

const userEditSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  limit: Joi.number().integer().positive(),
  currency: Joi.string().min(2),
  password: Joi.string().min(8),
  skills: Joi.object({
    frontend: Joi.array().items(Joi.string()),
    backend: Joi.array().items(Joi.string()),
  }).optional(),
});

export const validateUsersPost = celebrate({
  [Segments.BODY]: userCreateSchema,
});

export const validateUsersPut = celebrate({
  [Segments.BODY]: userEditSchema,
});

export const validateUsersPutParams = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().uuid().optional(),
    email: Joi.string().email().optional(),
  }),
});
