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

    // On formate le format de la date afin de la personaliser
    const formattedDate = new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month:'2-digit',
      day: '2-digit',
    })

    // On supprime et remplace les séparateurs par défaut '/' par '_' afin d'éviter un problème de caractère pour Windows
    const dateNoSeparator = formattedDate.replace(/\//g, '_');

    const finalFileName = `${name}_${dateNoSeparator}.${extension}`;

    callback(null, finalFileName);

  }
});

module.exports = multer({storage: storage}).single('image');


// Redimensionnement de l'image
module.exports.resizedImage = (req, res, next) => {
 

  const filePath = req.file.path;
  const fileName = req.file.filename;

  const parsedFileName = path.parse(fileName);
  const outputFileName = `compressed_${parsedFileName.name}.webp`
  const outputFilePath = path.join('images', outputFileName);

  sharp(filePath)
    .webp({ quality  : 80 })
    .resize({ width: 240, height: 280 })
    .toFile(outputFilePath)
    .then(() => {
      // Remplacer le fichier original par le fichier redimensionné
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



