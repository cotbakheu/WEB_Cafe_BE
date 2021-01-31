const multer = require('multer');
const path = require('path');
const { failed } = require('../response')

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage: multerStorage,
    limits: {fieldSize: 1 * 1000000 },
    fileFilter: (req, file, cb)=>{
        const ext = (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(`${Date.now()}${path.extname(file.originalname)}`);
        if (ext) {
            cb(null, true)
        } else {
            cb({code: 'Wrong image extension'}, false)
        }
    }
});

const singleUpload = (req, res, next) => {
    const single = upload.single('image');
    single(req, res, (err) => {
        if (err){
            failed(res, err.code);
        }else {
            next();
        }
    })
} 

module.exports = singleUpload