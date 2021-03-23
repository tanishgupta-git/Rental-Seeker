const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');
const propertyController = require('../controllers/properties');

router.get('/',propertyController.getProperties);
router.get('/:propertyId',propertyController.getProperty);
router.post('/add-property',[
    body('title').trim().isLength({min:5,max:50}),
    body('description').trim().isLength({min:20,max:500})
],propertyController.addProperty);
module.exports = router;