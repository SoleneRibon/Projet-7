const mongoose = require('mongoose');


const userSchema = mongoose.Schema({

    email : { type: String, required: true, unique: true}, 
    password : { type: String, required: true}, // mot de passe haché de l’utilisateur

});    

module.exports = mongoose.model('User', userSchema);
    
    
