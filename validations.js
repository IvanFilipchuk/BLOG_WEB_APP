import {body} from 'express-validator';

export const registerValidator = [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    body('firstName').isLength({min: 3}),
    body('lastName').isLength({min: 3}),
    body('avatar').optional().isURL(),
];


export const loginValidator = [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
  
];

export const postCreateValidator = [
    body('title').isLength({min: 5}),
    body('text').isLength({min: 3}),
    body('tags').isLength({min: 3}),
    body('imageUrl').optional().isURL(),
  
];
