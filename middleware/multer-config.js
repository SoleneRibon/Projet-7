const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');



const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');


// Redimensionnement de l'image
module.exports.resizedImage = (req, res, next) => {
// on vérifie si il y a un file dans le requete sinon on passe directement à la suite
  if (!req.file) {
    return next();
  }
 

  const filePath = req.file.path;
  const fileName = req.file.filename;

  const parsedFileName = path.parse(fileName);
  const outputFileName = `compressed_${parsedFileName.name}.webp`
  const outputFilePath = path.join('images', outputFileName);

  sharp(filePath)
    //changement de la qualité pour 80%
    .webp({ quality  : 80 })
    .resize({ width: 240, height: 280 })
    .toFile(outputFilePath)
    .then(() => {
      // Remplacer le fichier original par le fichier compressé
      fs.unlink(filePath, () => {
        req.file.path = outputFilePath;
        next();
      });
    })
    .catch(err => {
      console.log(err);
      return next();
    });
};



