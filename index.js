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

app.post('/auth/login', async(req, res)=>{
    try{
        const user = await UserModel.findOne({email: req.body.email});

        if(!user){
            return res.status(404).json({
                message: 'User is not found',
            });
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
       
        if(!isValidPass){
            return res.status(404).json({
                message: 'Login or password is incorrect',
            });
        }

        const token = jwt.sign({
            _id: user._id,
        },
        'secure123',
        {
            expiresIn: '30d'
    
        },
        );
        const {passwordHash, ...userData} = user._doc; 
        res.json({
            ...userData,
            token,
        });


    }catch(err){
        console.log(err);
        res.status(500).json({
        message: 'Failed authentication!',
    });
    }
});

app.post('/auth/register', registerValidator, async (req, res) =>{
   try{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatarUrl: req.body.avatar,
        passwordHash: hash,

    });

    const user = await doc.save();

    const token = jwt.sign({
        _id: user._id,
    },
    'secure123',
    {
        expiresIn: '30d'

    },
);
    const {passwordHash, ...userData} = user._doc; 
    res.json({
        ...userData,
        token,
    });

   }catch(err){
    console.log(err);
    res.status(500).json({
        message: 'Failed registration!',
    });
   }
});

app.listen(4444, (err) => {
    if (err){
        return console.log(err);
    }
    console.log('Server OK')

});