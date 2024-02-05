const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const booksCtrl = require('../controllers/books');

//route vers l'API POST pour book 
router.post('/', auth, booksCtrl.createBook);

//mise à jour d'un element 
router.put('/:id', auth, booksCtrl.modifyBook);
  
//suppression d'un element pour book
router.delete('/:id', auth, booksCtrl.deleteBook);
  
//route vers l'API GET pour book 
router.get('/', auth, booksCtrl.getAllBooks);
  
// route vers l'API GET pour 1 item de Book 
router.get('/:id', auth, booksCtrl.getOneBook);
 
module.exports = router;
    