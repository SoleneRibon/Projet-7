const Book = require('../models/Book');
const fs = require('fs');


exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;

  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  console.log(req.auth);

  book.save()
    .then(() => { res.status(201).json({ message: 'Livre enregistré !' }) })
    .catch(error => { res.status(400).json({ error }) })
};

exports.modifyBook = (req, res, next) => {
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: 'Non-autorisé' });
      } else {
        Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Livre modifié!' }))
          .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    })
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: 'Non-autorisé' });
      } else {
        const filename = book.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => { res.status(200).json({ message: 'Livre supprimé!' }) })
            .catch(error => res.status(401).json({ error }));
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    })
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};


exports.createRating = (req, res, next) => {
  // vérification que le user n'a pas déjà noté le livre
  Book.findOne({
    _id: req.params.id,
    "ratings.userId": req.body.userId
  })
    .then(existingRating => {
      if (existingRating) {
        return res.status(400).json({ message: 'vous avez déjà noté ce livre' });
      }

      // vérification que la notation est bien entre 1 et 5
      if (!(req.body.rating >= 0 && req.body.rating <= 5)) {
        return res.status(500).json({ message: 'La note n\'est pas comprise entre 1 et 5 ' });
      }

      // récupération du livre avec l'id 
      return Book.findOne({ _id: req.params.id });
    })
    .then(book => {
      if (!book) {
        return res.status(404).json({ message: 'Impossible de trouver le livre' });
      }

      // Ajout d'une nouvelle note au tableau
      book.ratings.push({ userId: req.body.userId, grade: req.body.rating });

      // Calcul de la moyenne des notes
      const ratings = book.ratings.map(r => r.grade);
      const averageRating = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
      console.log("test");

      // On met à jour la nouvelle valeur
      book.averageRating = parseFloat(averageRating.toFixed(2));


      // Sauvegarde du livre sur MongoDB
      return book.save();
    })
    .then(savedBook => {
      res.status(200).json(savedBook);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue.' });
    });
};

exports.getBestRating = (req, res, next) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));

}


