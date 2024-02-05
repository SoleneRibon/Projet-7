const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({

    email : { type: String, required: true, unique: true}, 
    password : { type: String, required: true}, // mot de passe haché de l’utilisateur

});    
//userSchema.plugin(uniqueValidator); //empeche que plusieurs utilisateurs aient la même adresse mail
module.exports = mongoose.model('User', userSchema);
    
    
