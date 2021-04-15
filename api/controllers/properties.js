const Property = require('../models/property');
const { validationResult } = require('express-validator/check');
const Host = require('../models/host');
const path = require('path');
const fs = require('fs');
exports.getProperties =async (req,res,next) => {

    try {
    const properties = await Property.find();
    res.status(200).json({
        message : 'Fetched Succesfully',
        properties:properties
    })
   }catch (err) {
    if(! err.statusCode) {
        err.statusCode = 500
    }
     next(err);
   }
   
}
exports.getProperty =async (req,res,next) => {
    const propertyId = req.params.propertyId;
    try {
    const property =await Property.findById(propertyId);
    res.status(200).json({
        message : 'Fetched Successfully',
        property : property
    })
   }   catch (err) {
    if(! err.statusCode) {
        err.statusCode = 500
    }
     next(err);
   }

}

exports.getMyProperties = async (req,res,next) => {
    try {
    const properties = await Property.find({host:req.userId});
    res.status(200).json({
     message : 'Fetched Succesfully',
     properties:properties
    })
    } catch (err) {
     if(! err.statusCode) {
         err.statusCode = 500
     }
      next(err);
    }
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
        return next(error);
    }

    const imageUrl = req.file.path.replace(/\\/g ,"/");
    const property = new Property({
        title : req.body.title,
        imageUrl : imageUrl,
        description : req.body.description,
        price : req.body.price,
        location : req.body.location,
        host:req.userId
    });
   try {
   await property.save();
   const host = await Host.findById(req.userId);
   host.properties.push(property);
   await host.save();
   res.status(200).json({
       message : 'Added Property'
   }) 
   }

   catch (err) {
    if(! err.statusCode) {
        err.statusCode = 500
    }
     next(err);
   }
}

exports.getSearchProperty = async (req,res,next) => {
    const location = req.params.location;
    const searchProperties = [];
    try {
    const properties = await Property.find();
    for (let i=0;i < properties.length;i++ ) {
       if (properties[i].location.includes(location)) {
           searchProperties.push(properties[i])
       }
    }
    res.status(200).json({
        message : 'Fetched Succesfully',
        properties:searchProperties
    })
   } catch (err) {
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
  