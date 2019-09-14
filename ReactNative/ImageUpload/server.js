const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Images Only!');
    }
}

// Set The Storage Engine
const storage = multer.diskStorage({
    //destination: './public/uploads/',
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
    metadata(req, file, cb) {
        cb(null, {fieldName: file.fieldname});
    },
    key(req, file, cb) {
        cb(null, Date.now().toString() + '.png');
    }
});

const limits = {
    files: 1, // allow only 1 file per request
    fileSize: 1024 * 1024, // 1 MB (max file size)
};
// Init Upload
const upload = multer({
    storage: storage,
    limits: limits,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

router.post('/', upload.single('photo'), function (req, res, next) {
    console.log("success");
    console.log(req.file);
    res.status(204).end();
});

module.exports = router;
