import express from 'express';
import mongoose from 'mongoose';
import { registerValidator, loginValidator, postCreateValidator } from './validations.js';
import chcekAuth from './utils/chcekAuth.js';

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose
.connect('mongodb+srv://ivanfilipchukp:lR6dldV0WctmVhIi@cluster0.cw2dupb.mongodb.net/')
.then(()=>console.log('DB OK'))
.catch((err) => console.log('DB error', err))

const app = express();

app.use(express.json());

app.post('/auth/login', loginValidator, UserController.login);
app.post('/auth/register', registerValidator, UserController.register);
app.get('/auth/me', chcekAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
//app.post('/posts', PostController.create);
// app.delete('/posts', PostController.remove);
// app.patch('/posts', PostController.update);

app.post('/posts', chcekAuth, postCreateValidator, PostController.create);


app.listen(4444, (err) => {
    if (err){
        return console.log(err);
    }
    console.log('Server OK')

});