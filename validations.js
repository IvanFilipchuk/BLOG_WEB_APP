import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Incorrect mail format').isEmail(),
  body('password', 'The password must be at least 5 characters long').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Incorrect mail format').isEmail(),
  body('password', 'The password must be at least 5 characters long').isLength({ min: 5 }),
  body('fullName', 'Enter a name').isLength({ min: 3 }),
  body('avatarUrl', 'Invalid avatar link').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Enter the title of the article').isLength({ min: 3 }).isString(),
  body('text', 'Enter the text of the article').isLength({ min: 3 }).isString(),
  body('tags', 'Invalid tag format').optional().isString(),
  body('imageUrl', 'Invalid image link').optional().isString(),
];