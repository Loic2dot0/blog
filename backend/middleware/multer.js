const multer = require('multer');
const path = require('path');

const storageAvatar = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/avatars');
    },
    filename: (req, file, cb) => {
        const name = Date.now() + '_' + Math.floor(Math.random()*10000);
        const extension = path.extname(file.originalname);
        cb(null, name + extension);
    }
});

module.exports = multer({storage: storageAvatar}).single('avatar');