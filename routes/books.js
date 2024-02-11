const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config');
const booksCtrl = require('../controllers/books');

//route vers l'API POST pour book 
router.post('/', auth, multer, booksCtrl.createBook);

//mise à jour d'un element 
router.put('/:id', auth, multer, booksCtrl.modifyBook);
  
//suppression d'un element pour book
router.delete('/:id', auth, booksCtrl.deleteBook);
  
//route vers l'API GET pour book 
router.get('/', booksCtrl.getAllBooks);
  
// route vers l'API GET pour 1 item de Book 
router.get('/:id', booksCtrl.getOneBook);
 
module.exports = router;
    