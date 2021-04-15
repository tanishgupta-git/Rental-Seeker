const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const fileStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images/properties/');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + "-" + file.originalname)
    }
});

const fileFilter = (req,file,cb) => {
    if (file.mimetype === 'image/png' ||file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    cb(null,true);
    }else{
        cb(null,false);
    }
}

const { body } = require('express-validator/check');
const propertyController = require('../controllers/properties');
const isAuth = require('../middleware/isAuth');
const isHost = require('../middleware/isHost');

router.get('/',propertyController.getProperties);
router.get('/property/:propertyId',propertyController.getProperty);
router.get('/search/:location',propertyController.getSearchProperty);
router.get('/myproperties',isAuth,isHost,propertyController.getMyProperties);
router.post('/add-property',multer({ storage : fileStorage,fileFilter:fileFilter}).single('image')
 ,isAuth,isHost,[
    body('title').trim().isLength({min:5,max:50}),
    body('location').trim().isLength({min:5,max:50}),
    body('description').trim().isLength({min:20,max:500})
],propertyController.addProperty);
module.exports = router;