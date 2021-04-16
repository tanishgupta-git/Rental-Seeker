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
        clearImage(req.file.path.replace(/\\/g ,"/"));
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

//  function for deleting the property
exports.deleteProperty = async (req,res,next) => {
    const propertyId = req.params.propertyId;
    try {
    const property = await Property.findById(propertyId);

    if (!property) {
      const error = new Error('Could not find property.');
      error.statusCode = 404;
      return next(error);
    }
    if (property.host.toString() !== req.userId) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }
    // Check logged in user
    clearImage(property.imageUrl);
    await Property.findByIdAndRemove(propertyId);

    const host = await Host.findById(req.userId);
    host.properties.pull(propertyId);
    await host.save();
    res.status(200).json({ message: 'Property Deleted Succesfully.' });
  } catch (err) {
    if(! err.statusCode) {
        err.statusCode = 500
    }
     next(err);
   }
}

// function for edit the property details
exports.editProperty = async (req,res,next) => {
    const propertyId = req.params.propertyId;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        clearImage(req.file.path.replace(/\\/g ,"/"));
        const error = new Error('Validation failed,entered data is incorrect');
        error.statusCode = 422;
        return next(error);
    }
    let imageUrl = req.body.image;
    if (req.file) {
     imageUrl = req.file.path.replace(/\\/g ,"/");
   }
    if (!imageUrl) {
        const error = new Error("No image provided");
        error.statusCode = 422;
        return next(error);
    }

  try {
   const property = await Property.findById(propertyId);
   if (!property) {
    const error = new Error('No Property found.');
    error.statusCode = 422;
    return next(error);  
   }
   if (property.host._id.toString() !== req.userId) {
    const error = new Error('Not authorized!');
    error.statusCode = 403;
    return next(error);
  }
   if (imageUrl !== property.imageUrl) {
    clearImage(property.imageUrl);
  }
   property.title = req.body.title;
   property.imageUrl = imageUrl;
   property.description = req.body.description;
   property.price = req.body.price;
   property.location = req.body.location;
   await property.save();
   res.status(200).json({message:"Property Detail Updated Successfully."}) 
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
  