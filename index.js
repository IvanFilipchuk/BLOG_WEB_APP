import e from 'express';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';


mongoose
.connect('mongodb+srv://ivanfilipchukp:lR6dldV0WctmVhIi@cluster0.cw2dupb.mongodb.net/')
.then(()=>console.log('DB OK'))
.catch((err) => console.log('DB error', err))


const app = express();

app.get('/', (req, res) =>  {
    res.send('Hello Ivan');
});

app.use(express.json());

app.post('/auth/login',(req, res)=>{
    console.log(req.body);
    const token = jwt.sign({
        name: req.body.name,
        lastname:req.body.lastname,
    },
    'hs256',
);

    res.json({
        success: true,
        token,
    });
});

app.listen(4444, (err) => {
    if (err){
        return console.log(err);
    }
    console.log('Server OK')

});