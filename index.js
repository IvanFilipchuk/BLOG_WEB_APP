import e from 'express';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import { registerValidator } from './validations/auth.js';
import UserModel from './Models/User.js'

mongoose
.connect('mongodb+srv://ivanfilipchukp:lR6dldV0WctmVhIi@cluster0.cw2dupb.mongodb.net/')
.then(()=>console.log('DB OK'))
.catch((err) => console.log('DB error', err))


const app = express();

app.use(express.json());

app.post('/auth/register', registerValidator, async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatarUrl: req.body.avatar,
        passwordHash,

    });

    const user = await doc.save();
    res.json(user);
});

app.listen(4444, (err) => {
    if (err){
        return console.log(err);
    }
    console.log('Server OK')

});