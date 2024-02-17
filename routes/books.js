const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const booksCtrl = require('../controllers/books');

//route vers l'API GET pour book 
router.get('/', booksCtrl.getAllBooks);

// route vers l'API GET pour avoir les 3 meilleurs livres
router.get('/bestrating', booksCtrl.getBestRating);

// route vers l'API GET pour 1 item de Book 
router.get('/:id', booksCtrl.getOneBook);

//route vers l'API POST pour book 
router.post('/', auth, multer, multer.resizedImage, booksCtrl.createBook);

// route vers l'API POST pour les ratings
router.post('/:id/rating', booksCtrl.createRating);

//mise à jour d'un element 
router.put('/:id', auth, multer, multer.resizedImage, booksCtrl.modifyBook);
  
//suppression d'un element pour book
router.delete('/:id', auth, booksCtrl.deleteBook);
  

  

module.exports = router;



 

    