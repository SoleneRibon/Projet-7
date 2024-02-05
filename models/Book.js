const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: { type: String, required: true}, // titre du livre

    /*
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     //userId : a vérifier id par mongoDB !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     */
    
    author : { type: String, required: true}, //auteur du livre
    imageUrl : { type: String, required: true}, //illustration/couverture du livre
    year: { type: Number, required: true}, //année de publication du livre
    genre: { type: String, required: true}, //genre du livre

    ratings : [
    {
         userId : { type: String}, //identifiant MongoDB unique de l'utilisateur qui a noté le livre
         grade : { type: Number}, //note donnée à un livre
    }],
     
    averageRating : { type: Number}, //note moyenne du livre
    
    
});

module.exports = mongoose.model('Book', bookSchema);