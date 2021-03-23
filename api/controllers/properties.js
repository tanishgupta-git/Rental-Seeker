const Property = require('../models/property');
const { validationResult } = require('express-validator/check');

exports.getProperties =async (req,res,next) => {
    const properties = await Property.find();
    res.status(200).json({
        message : 'Fetched Succesfully',
        properties:properties
    })
}
exports.getProperty =async (req,res,next) => {
    const propertyId = req.params.propertyId;
    const property =await Property.findById(propertyId);
    res.status(200).json({
        message : 'fetched Successfully',
        property : property
    })
}

exports.addProperty = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed,entered data is incorrect');
        error.statusCode = 422;
        return next(error);
    }
    if (!req.file) {
        const error = new Error("No image provided");
        error.statusCode = 422;
        throw error;
    }

    const imageUrl = req.file.path.replace(/\\/g ,"/");
    const property = new Property({
        title : req.body.title,
        imageUrl : imageUrl,
        description : req.body.description,
        price : req.body.price
    });
   try {
   await property.save();
   res.status(200).json({
       message : 'Added Property'
   }) }
   catch (err) {
    if(! err.statusCode) {
        err.statusCode = 500
    }
     next(err);
   }
}
// function for clear image
const clearImage = filePath => {
    filePath = path.join(__dirname,'..',filePath);
    fs.unlink(filePath,err => {
        console.log(err);
    })
  }
  