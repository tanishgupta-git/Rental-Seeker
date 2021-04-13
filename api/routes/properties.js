const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');
const propertyController = require('../controllers/properties');
const isAuth = require('../middleware/isAuth');
const isHost = require('../middleware/isHost');

router.get('/',propertyController.getProperties);
router.get('/property/:propertyId',propertyController.getProperty);
router.get('/search/:location',propertyController.getSearchProperty);
router.get('/myproperties',isAuth,isHost,propertyController.getMyProperties);
router.post('/add-property',isAuth,isHost,[
    body('title').trim().isLength({min:5,max:50}),
    body('location').trim().isLength({min:5,max:50}),
    body('description').trim().isLength({min:20,max:500})
],propertyController.addProperty);
module.exports = router;