const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const controllers = require('../controllers/controllers');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const imagesDir = path.join(__dirname, '../images');
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }
        cb(null, imagesDir);
    },
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const fileFilter = (req, file, cb) => {
    if (['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file format'), false);
    }
};

const upload = multer({ storage, fileFilter });

router.post('/create', controllers.createUser);
router.post('/check', controllers.checkUser);
router.post('/login', controllers.loginUser);
router.put('/edit', controllers.editUser);
router.delete('/delete', controllers.deleteUser);
router.get('/getAll', controllers.getAllUsers);
router.post('/uploadImage', upload.single('image'), controllers.uploadImage);
router.get('/images', controllers.getImages);
router.post('/job/create', controllers.createJob);
router.get('/get/jobs', controllers.getJobs);
module.exports = router;