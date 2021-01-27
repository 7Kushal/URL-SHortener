const express = require("express");

const mongoose = require('mongoose');

const Shorturl = require('./models/shorturl');

mongoose.connect('mongodb://localhost:27017/urlshortener',{
useNewUrlParser:true,useUnifiedTopology:true
})
const app = express();
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs')

app.get('/',async (req,res)=>{
    const shorturl = await Shorturl.find();
    res.render('index',{shorturl:shorturl})
})

app.post('/shorturl',async (req,res)=>{
    await Shorturl.create({full:req.body.fullurl})
    res.redirect('/')
})

app.get('/:shorturl', async (req,res)=>{
    const short = await Shorturl.findOne({short:req.params.shorturl});
    if(short==null)return res.statusCode(404);
    short.Clicks++;
    short.save()
    res.redirect(short.full)
})
app.listen(process.env.PORT||3000);