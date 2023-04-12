const multer = require('multer');
const path = require('path');

const MIME_TYPES_IMAGES = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MIME_TYPES_VIDEOS = ['video/mp4', 'video/ogg', 'video/webm'];

const fileFilter = (req, file, cb) => {
    if(MIME_TYPES_IMAGES.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(new Error('File types not allowed'), false);
    }
}

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

module.exports = multer({fileFilter, storage: storageAvatar}).single('avatar');