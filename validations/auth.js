import {body} from 'express-validator';

export const registerValidator = [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    body('firstName').isLength({min: 3}),
    body('lastName').isLength({min: 3}),
    body('avatar').optional().isURL(),
];
