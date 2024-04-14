import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { validationResult } from 'express-validator';

import UserModel from '../Models/User.js'

export const register = async (req, res)=>{
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

};
export const login = async (req, res)=>{
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
};
export const getMe = async (req, res) =>{
    try {
        const user = await UserModel.findById(req.userId);
    
        if (!user) {
          return res.status(404).json({
            message: 'User is not found',
          });
        }
    
        const { passwordHash, ...userData } = user._doc;
    
        res.json(userData);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: 'Not access',
        });
      }
 };
