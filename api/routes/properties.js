const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/properties');
router.get('/',propertyController.getProperties);

module.exports = router;