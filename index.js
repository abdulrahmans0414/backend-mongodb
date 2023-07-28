import express from 'express';
import ejs from 'ejs';
import path from 'path';
import mongoose from 'mongoose';
import {config} from 'dotenv'
config();

// mongoose connection settings
mongoose.connect(process.env.MONGO_URI,{
    dbName: "backend",
})
.then(()=>console.log("mongodb connected"))
.catch((e)=>console.log(e));

// mongooe connection ke baad sabse pahle schema banayenge
const messageSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
});

// schema ke baad model banate hain model is nothing but collection
const Mess = mongoose.model("Message", messageSchema);
// is Mess ka ues karke document actual me create kar sakta hu


const app = express();


// settings for view engine
app.set('view engine', 'ejs');

// satisfy data 
// middleware sittings
app.use(express.static(path.join(path.resolve(),'public')));
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.render('index',{ name:"Abdul Rahman"});
    // res.sendFile("index.html");
})

app.get('/success', (req, res) => {
    res.render('success',)
})

app.post('/contact', async (req, res) => {
const {name, email, password} = req.body

  await Mess.create({
    name,
    email,
    password,
});
    res.redirect('/success');
})

// user save information
app.get('/users',(req, res)=>{
    res.json({
        users
    })
})


app.listen(process.env.PORT,()=>{
    console.log(`listening on http://localhost:${process.env.PORT}`);
})
