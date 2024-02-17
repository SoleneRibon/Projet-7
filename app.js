const express = require('express');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
const path = require('path');


const app= express();


const uri = "mongodb+srv://ribonsolene:K9B5kdkIAXuUqZxL@cluster0.v54zz9g.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri)
.then(() => console.log("mongoose succesfully connected!"))
.catch(error => console.log(error))


// intercepte tte les requetes qui ont un content type JSON et nous met le contenu dans l'objet requete dans req.body
app.use(express.json());

//CORS= autorisation 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
 });
app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;