const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const postsRoutes = require('./routes/posts')

const app = express();


mongoose.connect('mongodb+srv://ncool:dTipHt2vUys9c6h6@mongodbserver.f3hhs7v.mongodb.net/mean_course')
.then(() => {
    console.log("Connected to MongoDB!")
})
.catch(() => {
    console.log("Could not connect to MongoDB!")
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => { //Allows access from any origin server
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
})

app.use('/api/posts',postsRoutes);

module.exports = app;

