const express = require('express');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');

const app= express();


const uri = "mongodb+srv://ribonsolene:K9B5kdkIAXuUqZxL@cluster0.v54zz9g.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri)
.then(() => console.log("mongoose succesfully connected!"))
.catch(error => console.log(error))
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
/*const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);*/


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

module.exports = app;