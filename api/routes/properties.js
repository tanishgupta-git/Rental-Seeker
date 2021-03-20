const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/properties');
router.get('/',propertyController.getProperties);
router.get('/:propertyId',propertyController.getProperty);
router.post('/add-property',propertyController.addProperty);
module.exports = router;